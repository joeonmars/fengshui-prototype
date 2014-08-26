goog.provide('feng.views.sections.controls.Manipulator');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('feng.events');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.Manipulator = function(domElement){

  goog.base(this, domElement);

  this._buttons = {};

  var interactions = feng.views.view3dobject.InteractiveObject.Interaction;
  goog.object.forEach(interactions, function(interaction) {
    this.registerButton( interaction );
  }, this);

  this.registerButton('close');

  this.hide();
};
goog.inherits(feng.views.sections.controls.Manipulator, feng.views.sections.controls.Controls);


feng.views.sections.controls.Manipulator.prototype.registerButton = function( classname ){

  var button = goog.dom.getElementByClass(classname, this.domElement);

  if(button) {
    this._buttons[classname] = button;
  }

  return button;
};


feng.views.sections.controls.Manipulator.prototype.activate = function( interactions ){
  
  var shouldActivate = goog.base(this, 'activate');

  if(!shouldActivate) return;

  // hide all buttons first
  goog.object.forEach(this._buttons, function(button) {
    goog.style.showElement(button, false);
  });

  // show and add button of interactions
  goog.array.forEach(interactions, function(interaction) {
    var button = this._buttons[interaction];
    goog.style.showElement(button, true);
    this._eventHandler.listen(button, 'click', this.onClick, false, this);
  }, this);

  // plus a close button
  var closeButton = this._buttons['close'];
  goog.style.showElement(closeButton, true);
  this._eventHandler.listen(closeButton, 'click', this.onClick, false, this);
};


feng.views.sections.controls.Manipulator.prototype.update = function(x, y){

 	var domSize = goog.style.getSize(this.domElement);
	var domX = x - domSize.width / 2;
	var domY = y - domSize.height / 2;
	goog.style.setPosition(this.domElement, domX, domY);
};


feng.views.sections.controls.Manipulator.prototype.onClick = function(e){

  var classname = goog.object.findKey(this._buttons, function(button) {
    return button === e.currentTarget;
  });

  var ev = {
    type: feng.events.EventType.CHANGE,
    interaction: classname
  };

  var interaction = feng.views.view3dobject.InteractiveObject.Interaction;

 	switch(classname) {
 		case interaction.MOVE:
      ev.clientX = e.clientX;
      ev.clientY = e.clientY;
 			break;

 		case interaction.ROTATE:
 			break;

 		case interaction.CLOSE:
 			break;
 	}

  this.dispatchEvent(ev);
};