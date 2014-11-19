goog.provide('feng.views.sections.controls.ZoomSlider');

goog.require('goog.dom');
goog.require('goog.math');
goog.require('goog.events.MouseWheelHandler');
goog.require('feng.events');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.ZoomSlider = function(domElement, mousewheelElement, onUpdateCallback){
	
  goog.base(this, domElement);

  this.fovRange = {
  	min: 10,
  	max: 30
  };

  this._zoomSteps = 10;
  this._zoomStep = this._zoomSteps / 2; // mid of min and max

  this._fov = this.calculateFov();
  this._currentFov = this._fov;

  this._mouseWheelHandler = new goog.events.MouseWheelHandler( mousewheelElement );

  this._onUpdateCallback = onUpdateCallback || goog.nullFunction;
};
goog.inherits(feng.views.sections.controls.ZoomSlider, feng.views.sections.controls.Controls);


feng.views.sections.controls.ZoomSlider.prototype.getCurrentFov = function(){

	return this._currentFov;
};


feng.views.sections.controls.ZoomSlider.prototype.calculateFov = function( zoomRatio ){

	this._zoomStep = goog.isNumber(zoomRatio) ? Math.round(goog.math.lerp(0, this._zoomSteps, zoomRatio)) : this._zoomStep;

	this._fov = goog.math.lerp(this.fovRange.min, this.fovRange.max, this._zoomStep/this._zoomSteps);
	
	return this._fov;
};


feng.views.sections.controls.ZoomSlider.prototype.reset = function( zoomRatio ){

	this._fov = this.calculateFov( zoomRatio );
	this._currentFov = this._fov;
};


feng.views.sections.controls.ZoomSlider.prototype.activate = function(){

  var shouldActivate = goog.base(this, 'activate');

  if(!shouldActivate) return;
  
	this._eventHandler.listen(this._mouseWheelHandler, goog.events.MouseWheelHandler.EventType.MOUSEWHEEL, this.onMouseWheel, false, this);
};


feng.views.sections.controls.ZoomSlider.prototype.onMouseWheel = function(e){

	this._zoomStep = (e.deltaY > 0) ? (this._zoomStep + 1) : (this._zoomStep - 1);
	this._zoomStep = Math.max(0, Math.min(this._zoomStep, this._zoomSteps));

	this._fov = this.calculateFov();

	goog.fx.anim.registerAnimation(this);
};


feng.views.sections.controls.ZoomSlider.prototype.onAnimationFrame = function(now){

	this._currentFov += (this._fov - this._currentFov) * .1;

	this._onUpdateCallback( this.getCurrentFov() );

	if( goog.math.nearlyEquals(this._currentFov, this._fov, 0.01) ) {
		goog.fx.anim.unregisterAnimation(this);
	}
};