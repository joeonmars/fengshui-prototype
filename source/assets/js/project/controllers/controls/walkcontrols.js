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

	this._tweener = new TimelineMax();
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


feng.controllers.controls.WalkControls.prototype.start = function ( ev ) {

	var fromPosition = ev.fromPosition;
	var toPosition = ev.toPosition;
	var nextMode = ev.nextMode;

	var viewDistance = (ev.viewDistance >= 0) ? ev.viewDistance : 50;
	var gateway = ev.gateway;
	var stairs = ev.stairs;

	if(gateway) {
		this._gateway = gateway;
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
	var speed = 1.000 * 100 * (gateway ? 2 : 1);
	var duration = distance / (speed / 2);

	var footstepLength = 20;
	var footsteps = Math.floor(distance / footstepLength);

	var uProp = {
		u: 0,
		footstep: 0
	};

	var tProp = {
		t: 0,
		fromTarget: ev.fromTarget,
		toTarget: ev.toTarget
	};

  var uTweener = TweenMax.to(uProp, duration, {
    u: distanceT,
    footstep: Math.PI * footsteps,
    'ease': Sine.easeInOut,
    'onUpdate': this.onPathUProgress,
    'onUpdateParams': [uProp],
    'onUpdateScope': this,
    'onComplete': this.onPathComplete,
    'onCompleteParams': [gateway, stairs, nextMode],
    'onCompleteScope': this
  });

  var tTweener = TweenMax.to(tProp, duration, {
    t: 1,
    'ease': Quad.easeInOut,
    'onUpdate': this.onPathTProgress,
    'onUpdateParams': [tProp],
    'onUpdateScope': this
  });

  this._tweener.clear();
  this._tweener.add( [uTweener, tTweener], '+=0', 'start' );
};


feng.controllers.controls.WalkControls.prototype.onPathUProgress = function ( prop ) {

  var u = prop.u;
  var pathTrack = this._pathTrack;
  var pathCamera = pathTrack.getCameraAt( u );
  var cameraPosition = pathCamera.position;

  var footstepHeight = Math.sin(prop.footstep) * .5;
  var defaultHeight = feng.controllers.controls.Controls.Default.STANCE_HEIGHT;
  var cameraY = defaultHeight + footstepHeight;

  this.setPosition( cameraPosition.x, cameraY, cameraPosition.z );
};


feng.controllers.controls.WalkControls.prototype.onPathTProgress = function ( prop ) {

  var t = prop.t;

  // calculate rotation looking at tweening target
  if(prop.fromTarget && prop.toTarget) {

  	var position = prop.fromTarget.clone().lerp( prop.toTarget, t );

  	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt( this.getPosition(), position );
	this._cameraRotation.setFromQuaternion( quaternion );

	this.setRotation( this._cameraRotation.x, this._cameraRotation.y );
  }
};


feng.controllers.controls.WalkControls.prototype.onPathComplete = function ( gateway, stairs, nextMode ) {

	if(gateway) {

		gateway.open();
		gateway.listenOnce( feng.events.EventType.PAUSE, this.onGatewayPause, false, this );
		gateway.listenOnce( feng.events.EventType.COMPLETE, this.onGatewayOpenComplete, false, this );
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


feng.controllers.controls.WalkControls.prototype.onGatewayPause = function ( e ) {

	var gateway = e.target;
	var viewId = gateway.viewId;

	// start to load the go-to view3d of this episode
	this._view3d.episode.load( viewId );

	// listen to episode load complete event to resume after load
	this._eventHandler.listenOnce( this._view3d.episode, feng.events.EventType.COMPLETE, function() {

		// resume gateway
		gateway.resume();
		
		// disable mouse events after pause
		this._eventHandler.removeAll();

	}, false, this);
};


feng.controllers.controls.WalkControls.prototype.onGatewayOpenComplete = function ( e ) {

	var gateway = e.target;

	this._view3d.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		sectionId: this._view3d.sectionId,
		viewId: gateway.viewId,
		gatewayId: gateway.gatewayId
	});
};