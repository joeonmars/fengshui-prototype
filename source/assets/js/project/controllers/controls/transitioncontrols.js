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
	
	var dur = goog.math.clamp( 1, 2, goog.math.lerp( 1, 2, fromPosition.distanceTo( toPosition ) / 100 ));

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
		skybox.addToScene();

		TweenMax.fromTo(skybox, dur, {
			opacity: 1
		}, {
			opacity: 0,
			'onUpdate': skybox.updateOpacity,
			'onUpdateScope': skybox,
			'onComplete': skybox.removeFromScene,
			'onCompleteScope': skybox
		});

		TweenMax.fromTo(designPlane, dur, {
			opacity: 0
		}, {
			opacity: 1,
			'onUpdate': designPlane.updateOpacity,
			'onUpdateScope': designPlane
		});

	}else {

		if(!skybox.isInScene()) {

			skybox.addToScene();

			var halfDur = dur/2;

			TweenMax.fromTo(skybox, halfDur, {
				opacity: 0
			}, {
				opacity: 1,
				'delay': halfDur,
				'onUpdate': skybox.updateOpacity,
				'onUpdateScope': skybox
			});

			TweenMax.fromTo(designPlane, dur, {
				opacity: 1
			}, {
				opacity: 0,
				'onUpdate': designPlane.updateOpacity,
				'onUpdateScope': designPlane,
				'onComplete': designPlane.removeFromScene,
				'onCompleteScope': designPlane
			});
		}
	}

	// toggle sound loops
	if(nextMode === feng.controllers.view3d.ModeController.Mode.CLOSE_UP) {

		feng.soundController.stopMix( this._view3d.sectionId, 1 );
		feng.soundController.fadeLoop( 'closeup', 0, 1, 2, false );

	}else {

		feng.soundController.playMix( this._view3d.sectionId, 6 );
		feng.soundController.fadeLoop( 'closeup', null, 0, 3, true, true );
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

	var ev = {
		type: feng.events.EventType.CHANGE,
		mode: prop.nextMode
	};

	this.dispatchEvent( ev );
};