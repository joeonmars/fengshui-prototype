goog.provide('feng.controllers.controls.TransitionControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');


/**
 * @constructor
 */
feng.controllers.controls.TransitionControls = function(camera, domElement, view3d){

  goog.base(this, camera, domElement, view3d);

  this._tweener = null;
};
goog.inherits(feng.controllers.controls.TransitionControls, feng.controllers.controls.Controls);


feng.controllers.controls.TransitionControls.prototype.update = function () {

	goog.base(this, 'update');

	var elapsed = this._clock.getElapsedTime();
};


feng.controllers.controls.TransitionControls.prototype.start = function ( toPosition, toRotation, toFov, lookAt, nextMode ) {

	var prop = {
		val: 0
	};

	var fromPosition = this.getPosition();
	var fromRotation = this.getRotation();
	var fromFov = this.getFov();

	this._tweener = TweenMax.to(prop, 1, {
		val: 1,
		ease: Quad.easeInOut,
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
				type: feng.events.EventType.CHANGE,
				mode: nextMode
			});
		},
		onCompleteScope: this
	});
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