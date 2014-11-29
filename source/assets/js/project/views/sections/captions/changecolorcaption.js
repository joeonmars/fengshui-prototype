goog.provide('feng.views.sections.captions.ChangeColorCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.sections.captions.Caption');


/**
 * @constructor
 */
feng.views.sections.captions.ChangeColorCaption = function( object, cameraController, renderSize, controls, hud ){

  this._template = feng.templates.captions.ChangeColorCaption;
  
  this._templateData = {
    tip: object.tip,
    position: 'right'
  };

  goog.base(this, object, cameraController, renderSize, controls, hud);

  this._colorId = null;

  this._itemEls = feng.utils.Utils.createDomCollectionByAttributes( goog.dom.query('.item-button', this.domElement), 'data-color' );
  this._infoEls = feng.utils.Utils.createDomCollectionByAttributes( goog.dom.query('.info li', this.domElement), 'data-color' );
};
goog.inherits(feng.views.sections.captions.ChangeColorCaption, feng.views.sections.captions.Caption);


feng.views.sections.captions.ChangeColorCaption.prototype.show = function() {

  goog.base(this, 'show');

  goog.object.forEach(this._itemEls, function(itemEl) {
    this._eventHandler.listen(itemEl, 'click', this.onClickItem, false, this);
  }, this);

  this._object.startInteraction();
};


feng.views.sections.captions.ChangeColorCaption.prototype.hide = function() {

  goog.base(this, 'hide');

  this._object.stopInteraction();
};


feng.views.sections.captions.ChangeColorCaption.prototype.onClickItem = function(e) {

  if(this._colorId) {
    goog.dom.classes.enable( this._itemEls[this._colorId], 'active', false );
    goog.dom.classes.enable( this._infoEls[this._colorId], 'active', false );
  }

  this._colorId = e.currentTarget.getAttribute('data-color');

  goog.dom.classes.enable( this._itemEls[this._colorId], 'active', true );
  goog.dom.classes.enable( this._infoEls[this._colorId], 'active', true );

  this.scrollBar.resize();
  
  this._object.setColorByName( this._colorId );
};