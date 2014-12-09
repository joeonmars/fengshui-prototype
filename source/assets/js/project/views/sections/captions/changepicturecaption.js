goog.provide('feng.views.sections.captions.ChangePictureCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.sections.captions.Caption');


/**
 * @constructor
 */
feng.views.sections.captions.ChangePictureCaption = function( object, renderController, renderSize, controls, hud ){

  this._template = feng.templates.captions.ChangePictureCaption;
  
  this._templateData = {
    tip: object.tip,
    position: 'right'
  };

  goog.base(this, object, renderController, renderSize, controls, hud);

  this._pictureId = null;

  this._itemEls = feng.utils.Utils.createDomCollectionByAttributes( goog.dom.query('.item-button', this.domElement), 'data-picture' );
  this._infoEls = feng.utils.Utils.createDomCollectionByAttributes( goog.dom.query('.info li', this.domElement), 'data-picture' );
};
goog.inherits(feng.views.sections.captions.ChangePictureCaption, feng.views.sections.captions.Caption);


feng.views.sections.captions.ChangePictureCaption.prototype.show = function() {

  goog.base(this, 'show');

  goog.object.forEach(this._itemEls, function(itemEl) {
    this._eventHandler.listen(itemEl, 'click', this.onClickItem, false, this);
  }, this);
};


feng.views.sections.captions.ChangePictureCaption.prototype.hide = function() {

  goog.base(this, 'hide');

  this._object.stopInteraction();
};


feng.views.sections.captions.ChangePictureCaption.prototype.onClickItem = function(e) {

  if(this._pictureId) {
    goog.dom.classes.enable( this._itemEls[this._pictureId], 'active', false );
    goog.dom.classes.enable( this._infoEls[this._pictureId], 'active', false );
  }

  this._pictureId = e.currentTarget.getAttribute("data-picture");

  goog.dom.classes.enable( this._itemEls[this._pictureId], 'active', true );
  goog.dom.classes.enable( this._infoEls[this._pictureId], 'active', true );

  this.scrollBar.resize();
  
  this._object.setPicture( this._pictureId );

  this._object.nextPicture();

  feng.soundController.playSfx('click');
};