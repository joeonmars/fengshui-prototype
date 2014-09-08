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
};
goog.inherits(feng.controllers.controls.TransitionControls, feng.controllers.controls.Controls);


feng.controllers.controls.TransitionControls.prototype.start = function ( toPosition, toRotation, toFov, e, nextMode ) {

	var fromPosition = this.getPosition();
	var fromRotation = this.getRotation();
	var fromFov = this.getFov();

	var prop = {
		positionX: fromPosition.x,
		positionY: fromPosition.y,
		positionZ: fromPosition.z,
		rotationX: fromRotation.x,
		rotationY: fromRotation.y,
		rotationZ: fromRotation.z,
		fov: fromFov
	};

	this._tweener = new TimelineMax({
		onComplete: function() {

			var ev = {
				type: feng.events.EventType.CHANGE,
				mode: nextMode
			};

			this.dispatchEvent(ev);
		},
		onCompleteScope: this
	});

	var dur = goog.math.clamp( 1, 2, goog.math.lerp( 1, 2, fromPosition.distanceTo( toPosition )/1000 ));

	var positionTweener = TweenMax.to(prop, dur, {
		positionX: toPosition.x,
		positionY: toPosition.y,
		positionZ: toPosition.z,
		ease: Quad.easeInOut,
		onUpdate: function() {

			this.setPosition( prop.positionX, prop.positionY, prop.positionZ );
		},
		onUpdateScope: this
	});

	var rotationTweener = TweenMax.to(prop, dur, {
		rotationX: toRotation.x,
		rotationY: toRotation.y,
		rotationZ: toRotation.z,
		ease: Quad.easeInOut,
		onUpdate: function() {

			var rx = prop.rotationX;
			var ry = prop.rotationY;
			var rz = prop.rotationZ;

			this.setRotation( rx, ry, rz );
		},
		onUpdateScope: this
	});
	
	var fovTweener = TweenMax.to(prop, dur, {
		fov: toFov,
		ease: Quad.easeInOut,
		onUpdate: function() {

			this.setFov( prop.fov );
		},
		onUpdateScope: this
	});

	this._tweener.add([positionTweener, rotationTweener, fovTweener], 0, 'start');

	// toggle ground plane
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

	}else {

		TweenMax.fromTo(designPlane.object3d.material, 1, {
			opacity: 1
		}, {
			opacity: 0,
			onComplete: function() {
				designPlane.removeFromScene();
				skybox.addToScene();
			}
		});
	}

	// toggle sound loops
	if(nextMode === feng.controllers.view3d.ModeController.Mode.CLOSE_UP) {

		feng.soundController.stopMix( this._view3d.sectionId );
		feng.soundController.fadeLoop( 'closeup', 0, 1, 4, false );console.log('play close up');

	}else {

		feng.soundController.playMix( this._view3d.sectionId );
		feng.soundController.fadeLoop( 'closeup', 1, 0, 4, true );console.log('stop close up');
	}

	//
	this.dispatchEvent({
		type: feng.events.EventType.UPDATE,
		mode: nextMode
	});
};