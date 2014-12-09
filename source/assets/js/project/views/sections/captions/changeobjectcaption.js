goog.provide('feng.views.sections.captions.ChangeObjectCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.sections.captions.Caption');


/**
 * @constructor
 */
feng.views.sections.captions.ChangeObjectCaption = function( object, renderController, renderSize, controls, hud ){

  this._template = feng.templates.captions.ChangeObjectCaption;
  console.log(object.tip)
  this._templateData = {
    tip: object.tip,
    position: 'right'
  };

  goog.base(this, object, renderController, renderSize, controls, hud);

  this._objectId = null;

  this._itemEls = feng.utils.Utils.createDomCollectionByAttributes( goog.dom.query('.item-button', this.domElement), 'data-object' );
  this._infoEls = feng.utils.Utils.createDomCollectionByAttributes( goog.dom.query('.info li', this.domElement), 'data-object' );
};
goog.inherits(feng.views.sections.captions.ChangeObjectCaption, feng.views.sections.captions.Caption);


feng.views.sections.captions.ChangeObjectCaption.prototype.show = function() {

  goog.base(this, 'show');

  goog.object.forEach(this._itemEls, function(objectEl) {
    this._eventHandler.listen(objectEl, 'click', this.onClickObject, false, this);
  }, this);
};


feng.views.sections.captions.ChangeObjectCaption.prototype.hide = function() {

  goog.base(this, 'hide');

  this._object.stopInteraction();
};


feng.views.sections.captions.ChangeObjectCaption.prototype.onClickObject = function(e) {

  if(this._objectId) {
    goog.dom.classes.enable( this._itemEls[this._objectId], 'active', false );
    goog.dom.classes.enable( this._infoEls[this._objectId], 'active', false );
  }

  this._objectId = e.currentTarget.getAttribute('data-object');

  goog.dom.classes.enable( this._itemEls[this._objectId], 'active', true );
  goog.dom.classes.enable( this._infoEls[this._objectId], 'active', true );

  this.scrollBar.resize();
  
  this._object.change( this._objectId );

  feng.soundController.playSfx('click');
};