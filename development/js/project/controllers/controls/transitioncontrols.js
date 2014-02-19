goog.provide('fengshui.controllers.controls.TransitionControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('fengshui.controllers.controls.Controls');


/**
 * @constructor
 */
fengshui.controllers.controls.TransitionControls = function(camera, domElement, view3d){

  goog.base(this, camera, domElement, view3d);

};
goog.inherits(fengshui.controllers.controls.TransitionControls, fengshui.controllers.controls.Controls);


fengshui.controllers.controls.TransitionControls.prototype.update = function () {

	goog.base(this, 'update');

	var elapsed = this._clock.getElapsedTime();
};


fengshui.controllers.controls.TransitionControls.prototype.start = function ( toPosition, toRotation, toFov, nextMode ) {

	var prop = {
		val: 0
	};

	var fromPosition = this.getPosition();
	var fromRotation = this.getRotation();
	var fromFov = this.getFov();

	var tweener = TweenMax.to(prop, 1, {
		val: 1,
		ease: Sine.easeInOut,
		onUpdate: function() {

			var positionX = goog.math.lerp(fromPosition.x, toPosition.x, prop.val);
			var positionY = goog.math.lerp(fromPosition.y, toPosition.y, prop.val);
			var positionZ = goog.math.lerp(fromPosition.z, toPosition.z, prop.val);

			var rotationX = goog.math.lerp(fromRotation.x, toRotation.x, prop.val);
			var rotationY = goog.math.lerp(fromRotation.y, toRotation.y, prop.val);

			var fov = goog.math.lerp(fromFov, toFov, prop.val);

			this.setPosition( positionX, positionY, positionZ );
			this.setRotation( rotationX, rotationY );
			this.setFov( fov );
		},
		onUpdateScope: this,
		onComplete: function() {
			this.dispatchEvent({
				type: fengshui.events.EventType.CHANGE,
				mode: nextMode
			});
		},
		onCompleteScope: this
	});
};


fengshui.controllers.controls.TransitionControls.prototype.onClick = function ( e ) {

	goog.base(this, 'onClick', e);

	return;
};


fengshui.controllers.controls.TransitionControls.prototype.onMouseDown = function ( e ) {

	goog.base(this, 'onMouseDown', e);

};


fengshui.controllers.controls.TransitionControls.prototype.onMouseMove = function ( e ) {

	goog.base(this, 'onMouseMove', e);

};