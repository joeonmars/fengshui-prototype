goog.provide('feng.controllers.controls.PathControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.fx.PathTrack');
goog.require('feng.utils.ThreeUtils');

/**
 * @constructor
 */
feng.controllers.controls.PathControls = function(camera, view3d, domElement){

  goog.base(this, camera, view3d, domElement);

	this._targetRotationY = 0;
	this._tweener = null;
	this._pathTrack = null;
};
goog.inherits(feng.controllers.controls.PathControls, feng.controllers.controls.Controls);


feng.controllers.controls.PathControls.prototype.update = function () {

	goog.base(this, 'update');

	var elapsed = this._clock.getElapsedTime();
};


feng.controllers.controls.PathControls.prototype.start = function ( fromPosition, toPosition, intersectPosition, gateway, nextMode ) {

	var pathfinder = feng.controllers.view3d.PathfindingController.getInstance();

	var start = fromPosition;
	var end = toPosition;
	var collidableBoxes = this._view3d.getCollidableBoxes();
	var coordinates = pathfinder.findPath( start, end, collidableBoxes, this._scene );
	
	if(!coordinates) {

		this.onPathComplete( gateway, nextMode );
		return;
	}

	// create path track
	if(this._pathTrack) {
		this._scene.remove( this._pathTrack );
	}

	this._pathTrack = new feng.fx.PathTrack( coordinates, 40, 0 );
	this._scene.add( this._pathTrack );

	var length = this._pathTrack.spline.getLength();
	var distance = length - 90;
	var distanceT = Math.max(0, distance / length);
	
	// adult walking speed is 1.564 meter per second
	var duration = distance * 2 / 156.4;

	var footstepLength = 20;
	var footsteps = Math.floor(distance / footstepLength);

	// calculate rotation looking at intersect
	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt( fromPosition, intersectPosition, new THREE.Vector3(0, 1, 0) );
	var toRotation = new THREE.Euler(0, 0, 0, 'YXZ').setFromQuaternion( quaternion );
	
	var fromRotation = this.getRotation();
	var toRotation = feng.utils.ThreeUtils.getShortestRotation(fromRotation, toRotation);

	var prop = {
    positionT: 0,
    rotationT: 0,
    footstep: 0,
    fromRotation: fromRotation,
    toRotation: toRotation
  };

  this._tweener = TweenMax.to(prop, duration, {
    positionT: distanceT,
    rotationT: 1,
    footstep: Math.PI * footsteps,
    ease: Linear.easeNone,
    onUpdate: this.onPathProgress,
    onUpdateParams: [prop],
    onUpdateScope: this,
    onComplete: this.onPathComplete,
    onCompleteParams: [gateway, nextMode],
    onCompleteScope: this
  });

  goog.fx.anim.registerAnimation(this);
};


feng.controllers.controls.PathControls.prototype.onPathProgress = function ( prop ) {

  var positionT = prop.positionT;
  var pathTrack = this._pathTrack;
  var pathCamera = pathTrack.getCameraAt( positionT );
  var cameraPosition = pathCamera.position;

  var rotationT = prop.rotationT;
  var fromRotation = prop.fromRotation;
  var toRotation = prop.toRotation;
  var cameraRotationX = goog.math.lerp(fromRotation.x, toRotation.x, rotationT);
  var cameraRotationY = goog.math.lerp(fromRotation.y, toRotation.y, rotationT);
  var cameraRotationZ = goog.math.lerp(fromRotation.z, toRotation.z, rotationT);

  var footstepHeight = Math.sin(prop.footstep) * .5;
  var defaultHeight = feng.controllers.controls.Controls.Default.STANCE_HEIGHT;
  var cameraY = defaultHeight + footstepHeight;

  this.setPosition( cameraPosition.x, cameraY, cameraPosition.z );
  this.setRotation( cameraRotationX, cameraRotationY, cameraRotationZ );
};


feng.controllers.controls.PathControls.prototype.onPathComplete = function ( gateway, nextMode ) {

	if(gateway) {
		// if event has gateway object, animate the gateway and fade out view3d
		gateway.enter();

		this._view3d.dispatchEvent({
			type: feng.events.EventType.CHANGE,
			sectionId: this._view3d.sectionId,
			viewId: gateway.viewId,
			origin: gateway.origin
		});
	}

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: nextMode
	});
};