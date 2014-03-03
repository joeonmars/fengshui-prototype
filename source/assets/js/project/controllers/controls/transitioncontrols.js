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


feng.controllers.controls.TransitionControls.prototype.update = function () {

	goog.base(this, 'update');

	var elapsed = this._clock.getElapsedTime();
};


feng.controllers.controls.TransitionControls.prototype.start = function ( toPosition, toRotation, toFov, lastModeEvent ) {

	var prop = {
		positionVal: 0,
		rotationVal: 0,
		fovVal: 0
	};

	var fromPosition = this.getPosition();
	var fromRotation = this.getRotation();
	var fromFov = this.getFov();

	this._tweener = new TimelineMax({
		onComplete: function() {
			var ev = {
				type: feng.events.EventType.CHANGE,
				mode: lastModeEvent.mode,
				object: lastModeEvent.object
			};

			this.dispatchEvent(ev);
		},
		onCompleteScope: this
	});

	var positionTweener = TweenMax.to(prop, 2, {
		positionVal: 1,
		ease: Quad.easeInOut,
		onUpdate: function() {

			var positionX = goog.math.lerp(fromPosition.x, toPosition.x, prop.positionVal);
			var positionY = goog.math.lerp(fromPosition.y, toPosition.y, prop.positionVal);
			var positionZ = goog.math.lerp(fromPosition.z, toPosition.z, prop.positionVal);

			this.setPosition( positionX, positionY, positionZ );
		},
		onUpdateScope: this
	});

	var rotationTweener = TweenMax.to(prop, 2, {
		rotationVal: 1,
		ease: Quad.easeInOut,
		onUpdate: function() {

			var rotationX = goog.math.lerp(fromRotation.x, toRotation.x, prop.rotationVal);
			var rotationY = goog.math.lerp(fromRotation.y, toRotation.y, prop.rotationVal);

			this.setRotation( rotationX, rotationY );
		},
		onUpdateScope: this
	});

	var fovTweener = TweenMax.to(prop, 1, {
		fovVal: 1,
		ease: Quad.easeInOut,
		onUpdate: function() {

			var fov = goog.math.lerp(fromFov, toFov, prop.fovVal);

			this.setFov( fov );
		},
		onUpdateScope: this
	});

	this._tweener.add([positionTweener, rotationTweener, fovTweener], 0, 'start');
};


feng.controllers.controls.TransitionControls.prototype.onClick = function ( e ) {

	goog.base(this, 'onClick', e);

};


feng.controllers.controls.TransitionControls.prototype.onMouseDown = function ( e ) {

	goog.base(this, 'onMouseDown', e);

};


feng.controllers.controls.TransitionControls.prototype.onMouseMove = function ( e ) {

	goog.base(this, 'onMouseMove', e);

};