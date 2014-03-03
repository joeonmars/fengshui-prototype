goog.provide('feng.controllers.controls.PathControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.utils.Randomizer');
goog.require('feng.utils.MultiLinearInterpolator');

/**
 * @constructor
 */
feng.controllers.controls.PathControls = function(camera, view3d, domElement){

  goog.base(this, camera, view3d, domElement);

  this._collidables = goog.array.filter(this._scene.children, function(child) {
  	return (child.userData['collidable'] === true);
  });

	this._targetRotationY = 0;
	this._tweener = null;
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

	var randomColor = "#" + Math.random().toString(16).slice(2, 8);
	var spline = this._view3d.createSpline(coordinates, randomColor);
	var splineLength = spline.getLength();
	var duration = Math.max(1, splineLength / 80);

	var prop = {
    t: 0,
    spline: spline
  };

  this._tweener = TweenMax.to(prop, duration, {
    t: 1,
    ease: Sine.easeInOut,
    onUpdate: this.onSplineStep,
    onUpdateParams: [prop],
    onUpdateScope: this
  });

  goog.fx.anim.registerAnimation(this);
};


feng.controllers.controls.PathControls.prototype.onSplineStep = function ( prop ) {

  var t = prop.t;
  var spline = prop.spline;
  var splinePosition = spline.getPointAt( t );

  this.setPosition( splinePosition.x, this.getPosition().y, splinePosition.z );

  if(t + 0.1 <= 1) {
	  var p = spline.getPointAt( t + 0.1 );

	  var q = feng.utils.ThreeUtils.getQuaternionByLookAt(splinePosition, p, new THREE.Vector3(0,1,0));
	  var r = new THREE.Euler(0, 0, 0, 'YXZ');
	  r.setFromQuaternion(q, 'YXZ');

	  this._targetRotationY = r.y;
  }
};


feng.controllers.controls.PathControls.prototype.onSplineComplete = function () {

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.views.View3D.Mode.BROWSE
	});
};


feng.controllers.controls.PathControls.prototype.onAnimationFrame = function (now) {

	var currentRotationY = this.getObject().rotation.y;
	this.getObject().rotation.y += (this._targetRotationY - currentRotationY) * .05;

	var thresholdDeg = 1;
	var currentDeg = THREE.Math.radToDeg( currentRotationY );
	var targetDeg = THREE.Math.radToDeg( this._targetRotationY );

	if(Math.abs(currentDeg - targetDeg) < thresholdDeg && !this._tweener.isActive()) {
		goog.fx.anim.unregisterAnimation(this);
		this.onSplineComplete();
	}
};