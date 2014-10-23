goog.provide('feng.views.sections.captions.ChangePictureCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.sections.captions.Caption');


/**
 * @constructor
 */
feng.views.sections.captions.ChangePictureCaption = function( object, cameraController, renderSize, controls, hud ){

  this._template = feng.templates.captions.ChangePictureCaption;
  
  this._templateData = {
    pictures: object.pictures,
    tip: object.tip,
    position: 'right'
  };

  goog.base(this, object, cameraController, renderSize, controls, hud);

  this._pictureEls = goog.dom.getElementsByClass('picture', this.domElement);
};
goog.inherits(feng.views.sections.captions.ChangePictureCaption, feng.views.sections.captions.Caption);


feng.views.sections.captions.ChangePictureCaption.prototype.show = function() {

  goog.base(this, 'show');

  goog.array.forEach(this._pictureEls, function(pictureEl) {
    this._eventHandler.listen(pictureEl, 'click', this.onClickPicture, false, this);
  }, this);

  this._object.startInteraction();
};


feng.views.sections.captions.ChangePictureCaption.prototype.hide = function() {

  goog.base(this, 'hide');

  this._object.stopInteraction();
};


feng.views.sections.captions.ChangePictureCaption.prototype.onClickPicture = function(e) {

  var pictureId = e.currentTarget.getAttribute("data-picture");

  this._object.setPicture( pictureId );
};