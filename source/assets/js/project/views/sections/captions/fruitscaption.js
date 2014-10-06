goog.provide('feng.views.sections.captions.FruitsCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.sections.captions.Caption');


/**
 * @constructor
 */
feng.views.sections.captions.FruitsCaption = function( object, cameraController, renderSize, controls, hud ){

  this._template = feng.templates.captions.FruitsCaption;
  
  this._templateData = {
    tip: object.tip
  };

  goog.base(this, object, cameraController, renderSize, controls, hud);

  var rightEl = goog.dom.getElementByClass('right', this.domElement);
};
goog.inherits(feng.views.sections.captions.FruitsCaption, feng.views.sections.captions.Caption);


feng.views.sections.captions.FruitsCaption.prototype.show = function() {

  goog.base(this, 'show');

  this._object.startInteraction();
  //this._controls.shiftCameraToRight();
};


feng.views.sections.captions.FruitsCaption.prototype.hide = function() {

  goog.base(this, 'hide');

  this._object.stopInteraction();
};