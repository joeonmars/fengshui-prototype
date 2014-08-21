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


feng.controllers.controls.TransitionControls.prototype.start = function ( toPosition, toRotation, toFov, nextMode ) {

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

	var dur = 1;

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

			this.setRotation( prop.rotationX, prop.rotationY, prop.rotationZ );
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

		designPlane.add();
		skybox.remove();

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
				designPlane.remove();
				skybox.add();
			}
		});
	}

	//
	this.dispatchEvent({
		type: feng.events.EventType.UPDATE,
		mode: nextMode
	});
};