goog.provide('feng.fx.PathTrack');

goog.require('feng.utils.Randomizer');

/**
 * @constructor
 */
feng.fx.PathTrack = function(controlPoints, segmentLength, isClosed, color){

  goog.base(this);

  this.controlPoints = controlPoints;
  this._isClosed = closed;
  this.spline = !this._isClosed ? new THREE.SplineCurve3(controlPoints) : new THREE.ClosedSplineCurve3(controlPoints);

  this._material = new THREE.LineBasicMaterial({
  	color: color || '#000000'
  });

  // init draw
  this.updateTrack( this.controlPoints, segmentLength );
};
goog.inherits(feng.fx.PathTrack, THREE.Object3D);


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
	var divisions = Math.floor(this.spline.getLength() / segmentLength);
  var splinePoints = this.spline.getSpacedPoints(divisions);

  var lineGeometry = new THREE.Geometry();
  goog.array.forEach(splinePoints, function(splinePoint) {
  	lineGeometry.vertices.push(splinePoint);
  });

  var line = new THREE.Line(lineGeometry, this._material);
  this.add(line);

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