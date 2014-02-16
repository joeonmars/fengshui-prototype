goog.provide('fengshui.controllers.controls.PathControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('fengshui.controllers.controls.Controls');
goog.require('fengshui.utils.Randomizer');
goog.require('fengshui.utils.MultiLinearInterpolator');

/**
 * @constructor
 */
fengshui.controllers.controls.PathControls = function(camera, domElement, view3d){

  goog.base(this, camera, domElement, view3d);

  this._collidables = goog.array.filter(this._scene.children, function(child) {
  	return (child.userData['collidable'] === true);
  });

  this._startRotation = 0;

	this._targetRotationX = 0;
	this._targetRotationY = 0;

	this._maxRotationX = goog.math.toRadians(45);
	this._minRotationX = goog.math.toRadians(-45);

	var randomXNumbers = fengshui.utils.Randomizer.getRandomNumbers(6, 10, true);
	goog.array.forEach(randomXNumbers, function(number, index) {
		if(index % 2 === 0) randomXNumbers[index] *= -1;
	});

	var randomYNumbers = fengshui.utils.Randomizer.getRandomNumbers(1, 10, true);
	goog.array.forEach(randomYNumbers, function(number, index) {
		if(index % 2 === 0) randomYNumbers[index] *= -1;
	});

	this._randomXInterpolator = new fengshui.utils.MultiLinearInterpolator(randomXNumbers, 8000);
	this._randomYInterpolator = new fengshui.utils.MultiLinearInterpolator(randomYNumbers, 10000);
};
goog.inherits(fengshui.controllers.controls.PathControls, fengshui.controllers.controls.Controls);


fengshui.controllers.controls.PathControls.prototype.update = function ( elapsed ) {

	if ( !this._isEnabled ) return;
	
	return;
	
	var PI_2 = Math.PI / 2;

	this._yawObject.rotation.y += (this._targetRotationY - this._yawObject.rotation.y) * .1;
	this._pitchObject.rotation.x += (this._targetRotationX - this._pitchObject.rotation.x) * .1;
	this._pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, this._pitchObject.rotation.x ) );

	// random rotating motion
	this._randomXInterpolator.update( elapsed * 1000 );
	this._randomYInterpolator.update( elapsed * 1000 );

	var cameraRotateX = this._randomXInterpolator.getValue() * .04;
	var cameraRotateY = this._randomYInterpolator.getValue() * .04;
	this._camera.rotation.x = cameraRotateX;
	this._camera.rotation.y = cameraRotateY;
};


fengshui.controllers.controls.PathControls.prototype.start = function ( toPosition, toRotation, toFov ) {

	var pathfinder = fengshui.controllers.view3d.PathfindingController.getInstance();

	var start = this.getPosition();
	var end = toPosition;
	var coordinates = pathfinder.findPath( start, end, this._collidables, this._scene );

	if(!coordinates) {
		this.onSplineComplete();
		return;
	}

	this._startRotation = this.getRotation();

	var spline = this._view3d.createSpline(coordinates, 0xff00f0);
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


fengshui.controllers.controls.PathControls.prototype.onSplineStep = function ( prop ) {

  var t = prop.t;
  var spline = prop.spline;
  var splinePosition = spline.getPointAt( t );

  this.setPosition( splinePosition.x, this.getPosition().y, splinePosition.z );

  //var rad = goog.math.toRadians( 10 );
  /*
  var p = spline.getPointAt( Math.min(1, t + 0.001) );
  p.y = this.getObject().position.y;

	this.getObject().lookAt( p );
	this.getObject().rotation.x = 0;
	this.getObject().rotation.z = 0;
	*/
	//this.getObject().rotation.y = goog.math.toRadians( 10 );
};


fengshui.controllers.controls.PathControls.prototype.onSplineComplete = function () {

	this.dispatchEvent({
		type: fengshui.events.EventType.CHANGE,
		mode: fengshui.views.View3D.Mode.BROWSE,
		fromPosition: this.getPosition(),
		toPosition: null,
		fromRotation: this.getRotation(),
		toRotation: null,
		fromPov: this.getPov(),
		toPov: null
	});
};