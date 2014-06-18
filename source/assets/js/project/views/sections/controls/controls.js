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
  this._camera = null;
  this._viewSize = null;
  this._renderEl = null;

  this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.views.sections.controls.Controls, goog.events.EventTarget);


feng.views.sections.controls.Controls.prototype.setView3D = function( view3d ){

	this._view3d = view3d;
  this._cameraController = view3d.cameraController;
  this._camera = view3d.cameraController.activeCamera;
  this._viewSize = view3d.viewSize;
  this._renderEl = view3d.domElement;
};


feng.views.sections.controls.Controls.prototype.activate = function(){

	this._eventHandler.listen(window, 'resize', this.onResize, false, this);

	this.onResize();
};


feng.views.sections.controls.Controls.prototype.deactivate = function(){

  this._eventHandler.removeAll();
};


feng.views.sections.controls.Controls.prototype.show = function(){

  goog.style.showElement(this.domElement, true);

  this.onResize();
};


feng.views.sections.controls.Controls.prototype.hide = function(){

  goog.style.showElement(this.domElement, false);
};


feng.views.sections.controls.Controls.prototype.onResize = function(e){

};