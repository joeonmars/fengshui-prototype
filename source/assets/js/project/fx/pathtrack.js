goog.provide('feng.fx.PathTrack');

goog.require('feng.utils.Randomizer');

/**
 * @constructor
 * Based on http://mrdoob.github.io/three.js/examples/webgl_geometry_extrude_splines.html
 */
feng.fx.PathTrack = function(controlPoints, offset, isClosed, color){

  goog.base(this);

  this.controlPoints = null;
  this.isClosed = false;
  this.spline = null;

  this.tubeGeometry = null;
  this.segments = null;

  this._material = new THREE.MeshBasicMaterial({
		opacity: 0.4,
		transparent: true,
		wireframe: true
  });

  // a dummy camera for calculating the position/rotation on spline
  this._pathCamera = new THREE.PerspectiveCamera();
  this._binormal = new THREE.Vector3();
  this._normal = new THREE.Vector3();
  this._up = new THREE.Vector3(0, 1, 0);
  this._offset = 0;

  this._debugObject = new THREE.Object3D();
  this.add( this._debugObject );

  this.create( controlPoints, offset, isClosed, color );
};
goog.inherits(feng.fx.PathTrack, THREE.Object3D);


feng.fx.PathTrack.prototype.create = function(controlPoints, offset, isClosed, color){

  this.controlPoints = controlPoints;
  this.isClosed = isClosed;
  this.spline = !this.isClosed ? new THREE.SplineCurve3(controlPoints) : new THREE.ClosedSplineCurve3(controlPoints);

  this._material.color = color || '#000000';

  this._offset = goog.isNumber(offset) ? offset : -15;

  this.updateTrack();
};


feng.fx.PathTrack.prototype.getControlMeshes = function(){

	var meshes = [];

	goog.array.forEach(this._debugObject.children, function(child) {
		if(child.geometry instanceof THREE.BoxGeometry) {
			meshes.push(child);
		}
	});

	return meshes;
};


feng.fx.PathTrack.prototype.getSpacedPoints = function(){

	return this.spline.getSpacedPoints( this.segments );
};


feng.fx.PathTrack.prototype.getEstimatedDistanceBetweenU = function(u1, u2){

	var lengths = this.spline.getLengths();
	var d1 = lengths[ Math.floor( (lengths.length - 1) * u1 ) ];
	var d2 = lengths[ Math.floor( (lengths.length - 1) * u2 ) ];
	var d = d2 - d1;

	return d;
};


feng.fx.PathTrack.prototype.getCameraAt = function(u){

	var tube = this.tubeGeometry;
	var pos = this.spline.getPointAt( u );

	// interpolation
	var segments = tube.tangents.length;
	var picku = u * segments;
	var pick = Math.floor( picku );
	var pickNext = ( pick + 1 ) % segments;

	if(picku <= segments-1) {

		var binormal = this._binormal;
		binormal.subVectors( tube.binormals[ pickNext ], tube.binormals[ pick ] );
		binormal.multiplyScalar( picku - pick ).add( tube.binormals[ pick ] );

		var dir = this.spline.getTangentAt( u );

		var normal = this._normal;
		normal.copy( binormal ).cross( dir );

		// We move on a offset on its binormal
		pos.add( normal.clone().multiplyScalar( this._offset ) );

		this._pathCamera.position.copy( pos );

		var lookAt = this.spline.getPointAt( ( u + 30 / this.spline.getLength() ) % 1 );
		lookAt.copy( pos ).add( dir );

		this._pathCamera.matrix.lookAt(pos, lookAt, this._up);
		this._pathCamera.rotation.setFromRotationMatrix( this._pathCamera.matrix, this._pathCamera.rotation.order );

		var euler = new THREE.Euler(0, 0, 0, 'YXZ').setFromQuaternion( this._pathCamera.quaternion );
		this._pathCamera.rotation = euler;
	}

	return this._pathCamera;
};


feng.fx.PathTrack.prototype.addControlPoint = function(val){

	var id;

	if(val instanceof THREE.Mesh) {
		id = val.userData.id;
	}else if(val instanceof THREE.Vector3) {
		id = goog.array.indexOf(this.controlPoints, val);
	}else if(goog.isNumber(val)) {
		id = val;
	}else {
		id = this.controlPoints.length - 1;
	}

	var startControlPoint = this.controlPoints[id];
	var endControlPoint = this.controlPoints[Math.min(this.controlPoints.length-1, id+1)];

	var newControlPoint;

	if(startControlPoint === endControlPoint) {
		newControlPoint = startControlPoint.clone().add( startControlPoint );
	}else {
		newControlPoint = startControlPoint.clone().lerp(endControlPoint, .5);
	}

	goog.array.insertAt(this.controlPoints, newControlPoint, id+1);

	this.updateTrack();

	return this.getObjectByName('cube'+(id+1));
};


feng.fx.PathTrack.prototype.removeControlPoint = function(val){

	var id;

	if(val instanceof THREE.Mesh) {
		id = val.userData.id;
	}else if(val instanceof THREE.Vector3) {
		id = goog.array.indexOf(this.controlPoints, val);
	}else if(goog.isNumber(val)) {
		id = val;
	}else {
		id = this.controlPoints.length - 1;
	}

	goog.array.removeAt(this.controlPoints, id);

	this.updateTrack();
};


feng.fx.PathTrack.prototype.updateTrack = function(){

	this.spline.updateArcLengths();

	// remove debug object children
	goog.array.forEachRight(this._debugObject.children, function(child) {
		this._debugObject.remove(child);
	}, this);

	// create new segments
	var segmentLength = 10;
	this.segments = Math.floor(this.spline.getLength() / segmentLength);

  this.tubeGeometry = new THREE.TubeGeometry(this.spline, this.segments, .5, 4, this.isClosed);
  var tubeMesh = new THREE.Mesh( this.tubeGeometry, this._material );
  this._debugObject.add(tubeMesh);

  // create cubes for dragging
  goog.array.forEach(this.controlPoints, function(coordinate, index) {
  	var geometry = new THREE.BoxGeometry(6, 6, 6);
  	var cube = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
  		transparent: true,
  		opacity: .2,
      color: feng.utils.Randomizer.getRandomNumber(index*100) * 0xffffff
    }));
    cube.name = 'cube'+index;
    cube.userData.id = index;
    cube.position = coordinate;
    this._debugObject.add(cube);
  }, this);
};