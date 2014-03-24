goog.provide('feng.fx.PathTrack');

goog.require('feng.utils.Randomizer');

/**
 * @constructor
 */
feng.fx.PathTrack = function(controlPoints, segmentLength, offset, isClosed, color){

  goog.base(this);

  this.controlPoints = controlPoints;
  this._isClosed = isClosed;
  this.spline = !this._isClosed ? new THREE.SplineCurve3(controlPoints) : new THREE.ClosedSplineCurve3(controlPoints);

  this.tubeGeometry = null;
  this.segments = null;

  this._material = new THREE.MeshBasicMaterial({
  	color: color || '#000000',
	opacity: 0.4,
	transparent: true,
	wireframe: true
  });

  // a dummy camera for calculating the position/rotation on spline
  this._pathCamera = new THREE.PerspectiveCamera();
  this._binormal = new THREE.Vector3();
  this._normal = new THREE.Vector3();
  this._up = new THREE.Vector3(0, 1, 0);
  this._offset = goog.isNumber(offset) ? offset : -15;

  // init draw
  this.updateTrack( this.controlPoints, segmentLength );
};
goog.inherits(feng.fx.PathTrack, THREE.Object3D);


feng.fx.PathTrack.prototype.getControlMeshes = function(){

	var meshes = [];

	goog.array.forEach(this.children, function(child) {
		if(child.geometry instanceof THREE.CubeGeometry) {
			meshes.push(child);
		}
	});

	return meshes;
};


feng.fx.PathTrack.prototype.getSpacedPoints = function(){

	var tube = this.tubeGeometry;
	return tube.path.getSpacedPoints( this.segments );
};


feng.fx.PathTrack.prototype.getCameraAt = function(t){

	var tube = this.tubeGeometry;
	var pos = tube.path.getPointAt( t );

	// interpolation
	var segments = tube.tangents.length;
	var pickt = t * segments;
	var pick = Math.floor( pickt );
	var pickNext = ( pick + 1 ) % segments;

	if(pickt <= segments-1) {

		var binormal = this._binormal;
		binormal.subVectors( tube.binormals[ pickNext ], tube.binormals[ pick ] );
		binormal.multiplyScalar( pickt - pick ).add( tube.binormals[ pick ] );

		var dir = tube.path.getTangentAt( t );

		var normal = this._normal;
		normal.copy( binormal ).cross( dir );

		// We move on a offset on its binormal
		pos.add( normal.clone().multiplyScalar( this._offset ) );

		this._pathCamera.position.copy( pos );

		var lookAt = tube.path.getPointAt( ( t + 30 / tube.path.getLength() ) % 1 );
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

	// remove children
	goog.array.forEachRight(this.children, function(child) {
		this.remove(child);
	}, this);

	// create new segments
	var segmentLength = segmentLength || 10;
	this.segments = Math.floor(this.spline.getLength() / segmentLength);

  this.tubeGeometry = new THREE.TubeGeometry(this.spline, this.segments, .5, 4, this._isClosed);
  var tubeMesh = new THREE.Mesh( this.tubeGeometry, this._material );
  this.add(tubeMesh);

  // create cubes for dragging
  goog.array.forEach(this.controlPoints, function(coordinate, index) {
  	var geometry = new THREE.CubeGeometry(6, 6, 6);
  	var cube = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
  		transparent: true,
  		opacity: .2,
      color: feng.utils.Randomizer.getRandomNumber(index*100) * 0xffffff
    }));
    cube.name = 'cube'+index;
    cube.userData.id = index;
    cube.position = coordinate;
    this.add(cube);
  }, this);
};