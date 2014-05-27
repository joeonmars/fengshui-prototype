goog.provide('feng.controllers.controls.WalkControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.fx.PathTrack');
goog.require('feng.utils.ThreeUtils');

/**
 * @constructor
 */
feng.controllers.controls.WalkControls = function(camera, view3d, domElement){

  goog.base(this, camera, view3d, domElement);

	this._tweener = null;
	this._pathTrack = null;

	this._cameraRotation = new THREE.Euler(0, 0, 0, 'YXZ');
};
goog.inherits(feng.controllers.controls.WalkControls, feng.controllers.controls.Controls);


feng.controllers.controls.WalkControls.prototype.start = function ( fromPosition, toPosition, intersectPosition, gateway, nextMode ) {

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
	var duration = distance * 2 / (1.564 * 100);

	var footstepLength = 20;
	var footsteps = Math.floor(distance / footstepLength);

	var fromRotation = this.getRotation().clone();

	var prop = {
    u: 0,
    footstep: 0,
    toPosition: intersectPosition,
    fromRotation: fromRotation
  };

  this._tweener = TweenMax.to(prop, duration, {
    u: distanceT,
    footstep: Math.PI * footsteps,
    ease: Linear.easeNone,
    onUpdate: this.onPathProgress,
    onUpdateParams: [prop],
    onUpdateScope: this,
    onComplete: this.onPathComplete,
    onCompleteParams: [gateway, nextMode],
    onCompleteScope: this
  });
};


feng.controllers.controls.WalkControls.prototype.onPathProgress = function ( prop ) {

  var u = prop.u;
  var pathTrack = this._pathTrack;
  var pathCamera = pathTrack.getCameraAt( u );
  var cameraPosition = pathCamera.position;

  var footstepHeight = Math.sin(prop.footstep) * .5;
  var defaultHeight = feng.controllers.controls.Controls.Default.STANCE_HEIGHT;
  var cameraY = defaultHeight + footstepHeight;

  this.setPosition( cameraPosition.x, cameraY, cameraPosition.z );

  // calculate rotation looking at intersect
	var toPosition = prop.toPosition;
	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt( this.getPosition(), toPosition );
	this._cameraRotation.setFromQuaternion( quaternion );

	var fromRotation = prop.fromRotation;
	fromRotation = feng.utils.ThreeUtils.getShortestRotation(this._cameraRotation, fromRotation);

	var intepolatedCameraX = goog.math.lerp( fromRotation.x, this._cameraRotation.x, u );
	var intepolatedCameraY = goog.math.lerp( fromRotation.y, this._cameraRotation.y, u );

  this.setRotation( intepolatedCameraX, intepolatedCameraY );
};


feng.controllers.controls.WalkControls.prototype.onPathComplete = function ( gateway, nextMode ) {

	if(gateway) {
		// if event has gateway object, animate the gateway and fade out view3d
		gateway.enter();

		this._view3d.dispatchEvent({
			type: feng.events.EventType.CHANGE,
			sectionId: this._view3d.sectionId,
			viewId: gateway.viewId,
			gatewayId: gateway.gatewayId
		});
	}

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: nextMode
	});
};