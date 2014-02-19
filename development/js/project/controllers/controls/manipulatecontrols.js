goog.provide('fengshui.controllers.controls.ManipulateControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('fengshui.controllers.controls.Controls');


/**
 * @constructor
 */
fengshui.controllers.controls.ManipulateControls = function(camera, domElement, view3d){

  goog.base(this, camera, domElement, view3d);

};
goog.inherits(fengshui.controllers.controls.ManipulateControls, fengshui.controllers.controls.Controls);


fengshui.controllers.controls.ManipulateControls.prototype.update = function () {

	goog.base(this, 'update');

	var elapsed = this._clock.getElapsedTime();
};


fengshui.controllers.controls.ManipulateControls.prototype.onClick = function ( e ) {

	goog.base(this, 'onClick', e);

	this.dispatchEvent({
		type: fengshui.events.EventType.CHANGE,
		mode: fengshui.views.View3D.Mode.BROWSE
	});
};


fengshui.controllers.controls.ManipulateControls.prototype.onMouseDown = function ( e ) {

	goog.base(this, 'onMouseDown', e);

};


fengshui.controllers.controls.ManipulateControls.prototype.onMouseMove = function ( e ) {

	goog.base(this, 'onMouseMove', e);

};


fengshui.controllers.controls.ManipulateControls.getCameraSettings = function( position, rotation, fov ) {

	var maxDistance = Math.max(Math.abs(position.x), Math.abs(position.y), Math.abs(position.z));

	var settings = {
		position: new THREE.Vector3( position.x/Math.abs(position.x) * maxDistance, position.y/Math.abs(position.y) * maxDistance, position.z/Math.abs(position.z) * maxDistance),
		rotation: new THREE.Euler(goog.math.toRadians(-45), rotation.y, 0),
		fov: 60
	};

	return settings;
};