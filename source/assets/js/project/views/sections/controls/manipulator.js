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
  this._buttons[classname] = button;

  return button;
};


feng.views.sections.controls.Manipulator.prototype.activate = function( interactions ){
  
	goog.base(this, 'activate');

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
 		case this._buttons['move']:

      this.dispatchEvent({
        type: feng.events.EventType.CHANGE,
        move: true,
        clientX: e.clientX,
        clientY: e.clientY
      });
 			break;

 		case this._buttons['rotate']:

      this.dispatchEvent({
        type: feng.events.EventType.CHANGE,
        rotate: true
      });
 			break;

    case this._buttons['enter']:

      break;

 		case this._buttons['close']:

      this.dispatchEvent({
        type: feng.events.EventType.CLOSE
      });
 			break;
 	}
};