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

  this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.views.sections.controls.Controls, goog.events.EventTarget);


feng.views.sections.controls.Controls.prototype.activate = function(){


};


feng.views.sections.controls.Controls.prototype.deactivate = function(){

  this._eventHandler.removeAll();
};


feng.views.sections.controls.Controls.prototype.show = function(){

  goog.style.showElement(this.domElement, true);
};


feng.views.sections.controls.Controls.prototype.hide = function(){

  goog.style.showElement(this.domElement, false);
};