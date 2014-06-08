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
  this._eventMediator = this._view3d.eventMediator;
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

	// dispatch mediator event
	this.dispatchEvent({
		type: feng.events.EventType.UPDATE,
		mode: nextMode
	});
};


feng.controllers.controls.TransitionControls.prototype.enable = function( enable ) {

	goog.base(this, 'enable', enable);

	if(this._isEnabled) {

		this._eventMediator.listen(this, feng.events.EventType.UPDATE);

	}else  {

		this._eventMediator.unlisten(this, feng.events.EventType.UPDATE);
	}
};