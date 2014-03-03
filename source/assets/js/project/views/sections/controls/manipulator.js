goog.provide('feng.views.sections.controls.Manipulator');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('feng.events');


/**
 * @constructor
 */
feng.views.sections.controls.Manipulator = function(domElement){
  goog.base(this);

  this.domElement = domElement;

  this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.views.sections.controls.Manipulator, goog.events.EventTarget);


feng.views.sections.controls.Manipulator.prototype.activate = function(){

  this._eventHandler.listen(this.domElement, 'mousedown', this.onClick, false, this);
};


feng.views.sections.controls.Manipulator.prototype.deactivate = function(){

  this._eventHandler.removeAll();
};


feng.views.sections.controls.Manipulator.prototype.onUpdate = function(x, y){

	var domSize = goog.style.getSize(this.domElement);
	var domX = x - domSize.width / 2;
	var domY = y - domSize.height / 2;
	goog.style.setPosition(this.domElement, domX, domY);
};


feng.views.sections.controls.Manipulator.prototype.onClick = function(e){


};