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
	this._startRotation = new THREE.Euler(0, 0, 0, 'YXZ');
	this._endRotation = new THREE.Euler(0, 0, 0, 'YXZ');

	this._footstepsSound = null;
};
goog.inherits(feng.controllers.controls.WalkControls, feng.controllers.controls.Controls);


feng.controllers.controls.WalkControls.prototype.pause = function ( pause ) {

	var shouldPause = goog.base(this, 'pause', pause);

	if(shouldPause && this._tweener) {

		this._tweener.pause();

	}else {

		this._tweener.resume();
	}
};


feng.controllers.controls.WalkControls.prototype.start = function ( ev ) {

	var fromPosition = ev.fromPosition;
	var toPosition = ev.toPosition;
	var nextMode = ev.nextMode;

	//
	var pathfinder = feng.pathfinder;

	var matrixId = this._view3d.getMatrixId();
	var start = fromPosition;
	var end = toPosition;
	
	var coordinates = pathfinder.findPath( matrixId, start, end );

	if(!coordinates) {
		
		var matrixData = feng.pathfinder.getMatrixData( this._view3d.getMatrixId() );
		console.log(coordinates, matrixId, start, end, feng.pathfinder.getTileByPosition(start, matrixData), feng.pathfinder.getTileByPosition(end, matrixData));
		
		this.bounceBack( nextMode );
		return;
	}

	// dispose last path track
	if(this._pathTrack) {

		if(feng.debug) {
			this._scene.remove( this._pathTrack );
		}

		this._pathTrack.dispose();
	}

	// create path track
	this._pathTrack = new feng.fx.PathTrack( coordinates, 0, false, null, feng.debug );

	if(feng.debug) {
		this._scene.add( this._pathTrack );
	}

	// calculate end rotation based on last position
	var viewDistance = 25;
	var splineLength = this._pathTrack.spline.getLength();
	var actualDistance = splineLength - viewDistance;
	var endU = actualDistance / splineLength;

	if(endU <= 0) {

		this.bounceBack( nextMode );
		return;
	}

	var actualEndPosition = this._pathTrack.spline.getPointAt( endU ).setY( feng.controllers.controls.Controls.Default.STANCE_HEIGHT );

	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt( actualEndPosition, toPosition );
	this._endRotation.setFromQuaternion( quaternion );
	this._endRotation.x = Math.max(this._endRotation.x, THREE.Math.degToRad(-40));
	
	this._startRotation.copy( ev.fromRotation );
	
	// adult walking speed is 1.564 meter per second
	var speed = 1.000 * 100;
	var duration = Math.max(1, actualDistance / (speed / 2));

	var footstepLength = 20;
	var footsteps = Math.floor(actualDistance / footstepLength);

	var prop = {
		t: 0,
		endU: endU,
		footstep: 0,
		mousewheel: ev.mousewheel
	};

  this._tweener = TweenMax.to(prop, duration, {
    t: 1,
    footstep: Math.PI * footsteps,
    'ease': Linear.easeNone,
    'onStart': this.onPathStart,
    'onStartScope': this,
    'onUpdate': this.onPathProgress,
    'onUpdateParams': [prop],
    'onUpdateScope': this,
    'onComplete': this.onPathComplete,
    'onCompleteParams': [nextMode],
    'onCompleteScope': this
  });
};


feng.controllers.controls.WalkControls.prototype.bounceBack = function ( nextMode ) {

	var prop = {
		fov: this.getFov()
	};

	TweenMax.to(prop, .3, {
		fov: 35,
		'yoyo': true,
		'repeat': 1,
		'ease': Quad.easeInOut,
		'onUpdate': function(prop) {
			this.setFov( prop.fov );
		},
		'onUpdateParams': [prop],
		'onUpdateScope': this,
		'onComplete': this.onPathComplete,
		'onCompleteParams': [nextMode],
		'onCompleteScope': this
	});
};


feng.controllers.controls.WalkControls.prototype.onPathStart = function () {

	this._footstepsSound = feng.soundController.playSfx('footsteps');
};


feng.controllers.controls.WalkControls.prototype.onPathProgress = function ( prop ) {

  var t = prop.t;
  
  var smoothT = THREE.Math.smoothstep(t, 0, 1);

  var pathTrack = this._pathTrack;

  // update position
  var pathCamera = pathTrack.getCameraAt( smoothT * prop.endU );
  var cameraPosition = pathCamera.position;

  var footstepHeight = Math.sin(prop.footstep) * .5;
  var defaultHeight = feng.controllers.controls.Controls.Default.STANCE_HEIGHT;
  var cameraY = defaultHeight + footstepHeight;

  this.setPosition( cameraPosition.x, cameraY, cameraPosition.z );

  if(!prop.mousewheel) {
  	// update rotation
  	this._cameraRotation = feng.utils.ThreeUtils.getLerpedEuler( this._startRotation, this._endRotation, smoothT, this._cameraRotation );
  	this.setRotation( this._cameraRotation.x, this._cameraRotation.y );
  }
};


feng.controllers.controls.WalkControls.prototype.onPathComplete = function ( nextMode ) {

	if(this._footstepsSound) {
		this._footstepsSound.pause();
	}

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: nextMode
	});
};


feng.controllers.controls.WalkControls.prototype.onInputDown = function ( e ) {

	goog.base(this, 'onInputDown', e);

	if(this._tweener) {
		this._tweener.kill();
	}

	if(this._footstepsSound) {
		this._footstepsSound.pause();
	}
	
	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.controllers.view3d.ModeController.Mode.BROWSE,
		eventToTrigger: e
	});
};