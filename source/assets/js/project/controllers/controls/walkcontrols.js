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

	this._gateway = null;
};
goog.inherits(feng.controllers.controls.WalkControls, feng.controllers.controls.Controls);


feng.controllers.controls.WalkControls.prototype.enable = function( enable ) {

	var shouldEnable = goog.base(this, 'enable', enable);

	if(shouldEnable) {


	}else  {

		if(this._gateway) {
			this._gateway.close();
			this._gateway = null;
		}
	}	
};


feng.controllers.controls.WalkControls.prototype.pause = function ( pause ) {

	var shouldPause = goog.base(this, 'pause', pause);

	if(shouldPause) {

		this._tweener.pause();

	}else {

		this._tweener.resume();
	}
};


feng.controllers.controls.WalkControls.prototype.start = function ( fromPosition, toPosition, ev, nextMode ) {

	var viewDistance = (ev.viewDistance >= 0) ? ev.viewDistance : 50;
	var gateway = ev.gateway;
	var stairs = ev.stairs;

	if(gateway) {
		this._gateway = gateway;
		this._gateway.open();
	}

	//
	var pathfinder = feng.pathfinder;

	var matrixId = this._view3d.getMatrixId();
	var start = fromPosition;
	var end = toPosition;
	
	var coordinates = pathfinder.findPath( matrixId, start, end );
	
	if(!coordinates) {

		this.onPathComplete( gateway, nextMode );
		return;
	}
	
	// create path track
	if(this._pathTrack) {
		this._scene.remove( this._pathTrack );
	}

	this._pathTrack = new feng.fx.PathTrack( coordinates, 0 );
	this._scene.add( this._pathTrack );

	var length = this._pathTrack.spline.getLength();
	var distance = length - viewDistance;
	var distanceT = Math.max(0, distance / length);
	
	// adult walking speed is 1.564 meter per second
	var speed = 1.564 * 100 * (gateway ? 2 : 1);
	var duration = distance / (speed / 2);

	var footstepLength = 20;
	var footsteps = Math.floor(distance / footstepLength);

	var fromRotation = this.getRotation().clone();

	var prop = {
		u: 0,
		footstep: 0,
		toPosition: toPosition,
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
    onCompleteParams: [gateway, stairs, nextMode],
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


feng.controllers.controls.WalkControls.prototype.onPathComplete = function ( gateway, stairs, nextMode ) {

	if(gateway) {
		// if event has gateway object, fade out view3d
		this._view3d.dispatchEvent({
			type: feng.events.EventType.CHANGE,
			sectionId: this._view3d.sectionId,
			viewId: gateway.viewId,
			gatewayId: gateway.gatewayId
		});
	}

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: nextMode,
		stairs: stairs
	});
};


feng.controllers.controls.WalkControls.prototype.onMouseDown = function ( e ) {

	goog.base(this, 'onMouseDown', e);

	this._tweener.kill();

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.controllers.view3d.ModeController.Mode.BROWSE,
		eventToTrigger: e
	});
};