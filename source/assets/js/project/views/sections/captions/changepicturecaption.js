goog.provide('feng.views.sections.captions.ChangePictureCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.sections.captions.Caption');
goog.require('feng.views.sections.controls.PictureSelector');


/**
 * @constructor
 */
feng.views.sections.captions.ChangePictureCaption = function( object, cameraController, renderSize, controls, hud ){

  this._template = feng.templates.captions.ChangePictureCaption;

  this._templateData = {
    pictures: object.pictures,
    tip: object.tip
  };

  goog.base(this, object, cameraController, renderSize, controls, hud);
  
  var rightEl = goog.dom.getElementByClass('right', this.domElement);

  var bottomEl = goog.dom.getElementByClass('bottom', this.domElement);

  var pictureSelectorEl = goog.dom.getElementByClass('pictureSelector', this.domElement);
  this._pictureSelector = new feng.views.sections.controls.PictureSelector( pictureSelectorEl, object );
};
goog.inherits(feng.views.sections.captions.ChangePictureCaption, feng.views.sections.captions.Caption);


feng.views.sections.captions.ChangePictureCaption.prototype.show = function() {

  goog.base(this, 'show');

  this._pictureSelector.activate();
};


feng.views.sections.captions.ChangePictureCaption.prototype.hide = function() {

  goog.base(this, 'hide');

  this._pictureSelector.deactivate();
};