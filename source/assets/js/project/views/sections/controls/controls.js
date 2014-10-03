goog.provide('feng.views.sections.controls.Controls');

goog.require('goog.style');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');


/**
 * @constructor
 */
feng.views.sections.controls.Controls = function(domElement){

  goog.base(this);

  this.domElement = domElement;

  this._view3d = null;
  this._cameraController = null;
  this._viewSize = null;
  this._renderEl = null;

  this._isActivated = false;

  this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.views.sections.controls.Controls, goog.events.EventTarget);


feng.views.sections.controls.Controls.prototype.init = function(){
  
};


feng.views.sections.controls.Controls.prototype.setView3D = function( view3d ){

  if(this._view3d) {
    this._view3d.modeController.unlisten( feng.events.EventType.CHANGE, this.onModeChange, false, this );
  }

	this._view3d = view3d;
  this._cameraController = view3d.cameraController;
  this._viewSize = view3d.viewSize;
  this._renderEl = view3d.domElement;

  this._view3d.modeController.listen( feng.events.EventType.CHANGE, this.onModeChange, false, this );
};


feng.views.sections.controls.Controls.prototype.activate = function(){

  if(this._isActivated) return false;
  else this._isActivated = true;

	this._eventHandler.listen(window, 'resize', this.onResize, false, this);

	this.onResize();

  return true;
};


feng.views.sections.controls.Controls.prototype.deactivate = function(){

  if(!this._isActivated) return false;
  else this._isActivated = false;
  
  this._eventHandler.removeAll();

  return true;
};


feng.views.sections.controls.Controls.prototype.show = function(){

  goog.style.showElement(this.domElement, true);

  this.onResize();
};


feng.views.sections.controls.Controls.prototype.hide = function(){

  goog.style.showElement(this.domElement, false);
};


feng.views.sections.controls.Controls.prototype.onModeChange = function(e){

};


feng.views.sections.controls.Controls.prototype.onResize = function(e){

};