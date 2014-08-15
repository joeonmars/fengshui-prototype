goog.provide('feng.views.sections.controls.ZoomSlider');

goog.require('goog.dom');
goog.require('goog.math');
goog.require('goog.events.MouseWheelHandler');
goog.require('feng.events');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.ZoomSlider = function(domElement, mousewheelElement){
	
  goog.base(this, domElement);

  this._mouseWheelHandler = new goog.events.MouseWheelHandler( mousewheelElement );

  this._fovRange = {
  	min: 5,
  	max: 20
  };

  this._zoomSteps = 10;
  this._zoomStep = this._zoomSteps / 2; // mid of min and max

  this._fov = this.calculateFov();
  this._currentFov = this._fov;
};
goog.inherits(feng.views.sections.controls.ZoomSlider, feng.views.sections.controls.Controls);


feng.views.sections.controls.ZoomSlider.prototype.getCurrentFov = function(){

	return this._currentFov;
};


feng.views.sections.controls.ZoomSlider.prototype.calculateFov = function(){

	return goog.math.lerp(this._fovRange.min, this._fovRange.max, this._zoomStep/this._zoomSteps);
};


feng.views.sections.controls.ZoomSlider.prototype.activate = function(){

	goog.base(this, 'activate');

	this._eventHandler.listen(this._mouseWheelHandler, goog.events.MouseWheelHandler.EventType.MOUSEWHEEL, this.onMouseWheel, false, this);
};


feng.views.sections.controls.ZoomSlider.prototype.show = function(){

	goog.base(this, 'show');

	goog.fx.anim.registerAnimation(this);
};


feng.views.sections.controls.ZoomSlider.prototype.hide = function(){

	goog.base(this, 'hide');

	goog.fx.anim.unregisterAnimation(this);
};


feng.views.sections.controls.ZoomSlider.prototype.onMouseWheel = function(e){

	this._zoomStep = (e.deltaY > 0) ? (this._zoomStep + 1) : (this._zoomStep - 1);
	this._zoomStep = Math.max(0, Math.min(this._zoomStep, this._zoomSteps));

	this._fov = this.calculateFov();
};


feng.views.sections.controls.ZoomSlider.prototype.onAnimationFrame = function(now){

	this._currentFov += (this._fov - this._currentFov) * .1;
};