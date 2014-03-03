goog.provide('feng.controllers.controls.CloseUpControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.utils.Randomizer');
goog.require('feng.utils.MultiLinearInterpolator');

/**
 * @constructor
 */
feng.controllers.controls.CloseUpControls = function(camera, view3d, domElement){

  goog.base(this, camera, view3d, domElement);

};
goog.inherits(feng.controllers.controls.CloseUpControls, feng.controllers.controls.Controls);


feng.controllers.controls.CloseUpControls.prototype.update = function () {

	goog.base(this, 'update');

	var elapsed = this._clock.getElapsedTime();
};


feng.controllers.controls.CloseUpControls.prototype.start = function () {

	
};


feng.controllers.controls.CloseUpControls.prototype.onClick = function ( e ) {

	goog.base(this, 'onClick', e);

	return;
};


feng.controllers.controls.CloseUpControls.prototype.onMouseDown = function ( e ) {

	goog.base(this, 'onMouseDown', e);

};


feng.controllers.controls.CloseUpControls.prototype.onMouseMove = function ( e ) {

	goog.base(this, 'onMouseMove', e);

};