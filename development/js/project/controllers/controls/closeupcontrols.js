goog.provide('fengshui.controllers.controls.CloseUpControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('fengshui.controllers.controls.Controls');
goog.require('fengshui.utils.Randomizer');
goog.require('fengshui.utils.MultiLinearInterpolator');

/**
 * @constructor
 */
fengshui.controllers.controls.CloseUpControls = function(camera, domElement, view3d){

  goog.base(this, camera, domElement, view3d);

};
goog.inherits(fengshui.controllers.controls.CloseUpControls, fengshui.controllers.controls.Controls);


fengshui.controllers.controls.CloseUpControls.prototype.update = function () {

	goog.base(this, 'update');

	var elapsed = this._clock.getElapsedTime();
};


fengshui.controllers.controls.CloseUpControls.prototype.start = function () {

	
};


fengshui.controllers.controls.CloseUpControls.prototype.onClick = function ( e ) {

	goog.base(this, 'onClick', e);

	return;
};


fengshui.controllers.controls.CloseUpControls.prototype.onMouseDown = function ( e ) {

	goog.base(this, 'onMouseDown', e);

};


fengshui.controllers.controls.CloseUpControls.prototype.onMouseMove = function ( e ) {

	goog.base(this, 'onMouseMove', e);

};