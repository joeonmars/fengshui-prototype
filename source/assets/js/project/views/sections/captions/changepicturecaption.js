goog.provide('feng.views.sections.captions.ChangePictureCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.View3DCaption');
goog.require('feng.views.sections.controls.PictureSelector');


/**
 * @constructor
 */
feng.views.sections.captions.ChangePictureCaption = function( object, cameraController, renderSize ){

  this._template = feng.templates.captions.ChangePictureCaption;

  this._templateData = {
    pictures: object.pictures
  };

  goog.base(this, object, cameraController, renderSize);

  var rightEl = goog.dom.getElementByClass('right', this.domElement);
  this._wrapLayout.addBlock( rightEl, feng.fx.WrapLayout.Alignment.RIGHT, new goog.math.Size(400, 400) );

  var pictureSelectorEl = goog.dom.getElementByClass('pictureSelector', this.domElement);
  this._pictureSelector = new feng.views.sections.controls.PictureSelector( pictureSelectorEl, object.pictures );
};
goog.inherits(feng.views.sections.captions.ChangePictureCaption, feng.views.View3DCaption);


feng.views.sections.captions.ChangePictureCaption.prototype.show = function() {

  goog.base(this, 'show');

  this._pictureSelector.activate();
};


feng.views.sections.captions.ChangePictureCaption.prototype.hide = function() {

  goog.base(this, 'hide');

  this._pictureSelector.deactivate();
};