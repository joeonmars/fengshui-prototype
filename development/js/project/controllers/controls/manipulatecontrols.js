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


fengshui.controllers.controls.ManipulateControls.prototype.start = function () {


};


fengshui.controllers.controls.ManipulateControls.prototype.onClick = function ( e ) {

	goog.base(this, 'onClick', e);

	return;
};


fengshui.controllers.controls.ManipulateControls.prototype.onMouseDown = function ( e ) {

	goog.base(this, 'onMouseDown', e);

};


fengshui.controllers.controls.ManipulateControls.prototype.onMouseMove = function ( e ) {

	goog.base(this, 'onMouseMove', e);

};


fengshui.controllers.controls.ManipulateControls.DefaultCameraSettings = {
	position: new THREE.Vector3(250, 250, 250),
	rotation: new THREE.Euler(goog.math.toRadians(-45), goog.math.toRadians(45), 0),
	fov: 60
};