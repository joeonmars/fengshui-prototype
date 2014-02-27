goog.provide('feng.controllers.controls.PathControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.utils.Randomizer');
goog.require('feng.utils.MultiLinearInterpolator');

/**
 * @constructor
 */
feng.controllers.controls.PathControls = function(camera, domElement, view3d){

  goog.base(this, camera, domElement, view3d);

  this._collidables = goog.array.filter(this._scene.children, function(child) {
  	return (child.userData['collidable'] === true);
  });

  this._startRotation = 0;

	this._targetRotationX = 0;
	this._targetRotationY = 0;

	this._maxRotationX = goog.math.toRadians(45);
	this._minRotationX = goog.math.toRadians(-45);
};
goog.inherits(feng.controllers.controls.PathControls, feng.controllers.controls.Controls);


feng.controllers.controls.PathControls.prototype.update = function () {

	goog.base(this, 'update');

	var elapsed = this._clock.getElapsedTime();
};


feng.controllers.controls.PathControls.prototype.start = function ( toPosition, toRotation, toFov ) {

	var pathfinder = feng.controllers.view3d.PathfindingController.getInstance();

	var start = this.getPosition();
	var end = toPosition;
	var coordinates = pathfinder.findPath( start, end, this._collidables, this._scene );

	if(!coordinates) {
		this.onSplineComplete();
		return;
	}

	this._startRotation = this.getRotation();

	var randomColor = "#" + Math.random().toString(16).slice(2, 8);
	var spline = this._view3d.createSpline(coordinates, randomColor);
	var splineLength = spline.getLength();
	var duration = Math.max(1, splineLength / 80);

	var prop = {
    t: 0,
    spline: spline
  };

  var tweener = TweenMax.to(prop, duration, {
    t: 1,
    ease: Sine.easeInOut,
    onUpdate: this.onSplineStep,
    onUpdateParams: [prop],
    onUpdateScope: this,
    onComplete: this.onSplineComplete,
    onCompleteScope: this
  });
};


feng.controllers.controls.PathControls.prototype.onSplineStep = function ( prop ) {

  var t = prop.t;
  var spline = prop.spline;
  var splinePosition = spline.getPointAt( t );

  this.setPosition( splinePosition.x, this.getPosition().y, splinePosition.z );
/*
  var p = spline.getPointAt( Math.min(1, t + 0.001) );

  var q = feng.utils.ThreeUtils.getQuaternionByLookAt(splinePosition, p, new THREE.Vector3(0,1,0));
  var r = new THREE.Euler(0, 0, 0, 'YXZ');
  r.setFromQuaternion(q, 'YXZ');

	this.getObject().rotation.y = r.y;*/
};


feng.controllers.controls.PathControls.prototype.onSplineComplete = function () {

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.views.View3D.Mode.BROWSE
	});
};