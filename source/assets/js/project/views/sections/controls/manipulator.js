goog.provide('feng.views.sections.controls.Manipulator');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('feng.events');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.Manipulator = function(domElement, eventMediator){

  goog.base(this, domElement);

  this._moveButton = goog.dom.getElementByClass('move', this.domElement);
  this._rotateButton = goog.dom.getElementByClass('rotate', this.domElement);
  this._closeButton = goog.dom.getElementByClass('close', this.domElement);

  this._eventMediator = eventMediator;

  this.hide();
};
goog.inherits(feng.views.sections.controls.Manipulator, feng.views.sections.controls.Controls);


feng.views.sections.controls.Manipulator.prototype.activate = function(){

	goog.base(this, 'activate');

  this._eventHandler.listen(this._moveButton, 'click', this.onClick, false, this);
  this._eventHandler.listen(this._rotateButton, 'click', this.onClick, false, this);
  this._eventHandler.listen(this._closeButton, 'click', this.onClick, false, this);
};


feng.views.sections.controls.Manipulator.prototype.deactivate = function(){

	goog.base(this, 'deactivate');

  this._eventHandler.removeAll();
};


feng.views.sections.controls.Manipulator.prototype.update = function(x, y){

 	var domSize = goog.style.getSize(this.domElement);
	var domX = x - domSize.width / 2;
	var domY = y - domSize.height / 2;
	goog.style.setPosition(this.domElement, domX, domY);
};


feng.views.sections.controls.Manipulator.prototype.onClick = function(e){

 	switch(e.currentTarget) {
 		case this._moveButton:

 			break;

 		case this._rotateButton:

 			break;

 		case this._closeButton:

 			break;
 	}
};