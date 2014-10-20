goog.provide('feng.controllers.controls.TransitionControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');


/**
 * @constructor
 */
feng.controllers.controls.TransitionControls = function(camera, view3d, domElement){

  goog.base(this, camera, view3d, domElement);

  this._tweener = null;

  this._cameraPosition = new THREE.Vector3(0 ,0, 0);
  this._cameraRotation = new THREE.Euler(0, 0, 0, 'YXZ');
};
goog.inherits(feng.controllers.controls.TransitionControls, feng.controllers.controls.Controls);


feng.controllers.controls.TransitionControls.prototype.start = function ( ev ) {

	var fromPosition = ev.fromPosition || this.getPosition();
	var toPosition = ev.toPosition;

	var prop = {
		t: 0,
		fromPosition: fromPosition,
		toPosition: toPosition,
		fromFov: ev.fromFov || this.getFov(),
		toFov: ev.toFov || this.getFov(),
		fromTarget: ev.fromTarget || this.getTarget(),
		toTarget: ev.toTarget,
		nextMode: ev.nextMode
	};

	var dur = goog.math.clamp( 1, 2, goog.math.lerp( 1, 2, fromPosition.distanceTo( toPosition ) / 1000 ));

	this._tweener = TweenMax.to( prop, dur, {
		t: 1,
		'ease': Sine.easeInOut,
		'onUpdate': this.onTransitionUpdate,
		'onUpdateParams': [prop],
		'onUpdateScope': this,
		'onComplete': this.onTransitionComplete,
		'onCompleteParams': [prop],
		'onCompleteScope': this
	});

	// toggle ground plane
	var nextMode = ev.nextMode;
	var designPlane = this._view3d.designPlane;
	var skybox = this._view3d.skybox;

	if(nextMode === feng.controllers.view3d.ModeController.Mode.DESIGN) {

		designPlane.addToScene();
		skybox.removeFromScene();

		TweenMax.fromTo(designPlane.object3d.material, 1, {
			opacity: 0
		}, {
			opacity: 1
		});
	}

	// toggle sound loops
	if(nextMode === feng.controllers.view3d.ModeController.Mode.CLOSE_UP) {

		feng.soundController.stopMix( this._view3d.sectionId );
		feng.soundController.fadeLoop( 'closeup', 0, 1, 4, false );

	}else {

		feng.soundController.playMix( this._view3d.sectionId );
		feng.soundController.fadeLoop( 'closeup', null, 0, 4, true );
	}

	//
	this.dispatchEvent({
		type: feng.events.EventType.UPDATE,
		mode: nextMode
	});
};


feng.controllers.controls.TransitionControls.prototype.pause = function ( pause ) {

	var shouldPause = goog.base(this, 'pause', pause);

	if(shouldPause) {

		this._tweener.pause();

	}else {

		this._tweener.resume();
	}
};


feng.controllers.controls.TransitionControls.prototype.onTransitionUpdate = function ( prop ) {

	var t = prop.t;

	var fromPosition = prop.fromPosition;
	var toPosition = prop.toPosition;
	this._cameraPosition = this._cameraPosition.copy( fromPosition ).lerp( toPosition, t );
	this.setPosition( this._cameraPosition );

	var fromTarget = prop.fromTarget;
	var toTarget = prop.toTarget;

	var targetPosition = fromTarget.clone().lerp( toTarget, t );

  	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt( this._cameraPosition, targetPosition );
	this._cameraRotation.setFromQuaternion( quaternion );

	this.setRotation( this._cameraRotation.x, this._cameraRotation.y );

	var fov = goog.math.lerp( prop.fromFov, prop.toFov, t );
	this.setFov( fov );
};


feng.controllers.controls.TransitionControls.prototype.onTransitionComplete = function ( prop ) {

	var nextMode = prop.nextMode;

	// toggle ground plane
	var designPlane = this._view3d.designPlane;
	var skybox = this._view3d.skybox;

	if(nextMode !== feng.controllers.view3d.ModeController.Mode.DESIGN) {

		TweenMax.fromTo(designPlane.object3d.material, 1, {
			opacity: 1
		}, {
			opacity: 0,
			'onComplete': function() {
				designPlane.removeFromScene();
				skybox.addToScene();
			}
		});
	}

	//
	var ev = {
		type: feng.events.EventType.CHANGE,
		mode: nextMode
	};

	this.dispatchEvent( ev );
};