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

  goog.object.forEach(this._itemEls, function(itemEl) {
    goog.dom.classlist.enable( itemEl, 'loading', false );
    this._eventHandler.listen(itemEl, 'click', this.onClickItem, false, this);
  }, this);

  this._eventHandler.listen( this._object, feng.events.EventType.LOAD, this.onLoadStart, false, this );
  this._eventHandler.listen( this._object, feng.events.EventType.LOAD_COMPLETE, this.onLoadComplete, false, this );
};


feng.views.sections.captions.ChangeObjectCaption.prototype.hide = function() {

  goog.base(this, 'hide');

  this._object.stopInteraction();
};


feng.views.sections.captions.ChangeObjectCaption.prototype.onClickItem = function(e) {

  if(this._objectId) {
    goog.dom.classlist.enable( this._itemEls[this._objectId], 'active', false );
    goog.dom.classlist.enable( this._infoEls[this._objectId], 'active', false );
  }

  this._objectId = e.currentTarget.getAttribute('data-object');

  goog.dom.classlist.enable( this._itemEls[this._objectId], 'active', true );
  goog.dom.classlist.enable( this._infoEls[this._objectId], 'active', true );

  this.scrollBar.resize();
  
  this._object.change( this._objectId );

  feng.soundController.playSfx('click');
};


feng.views.sections.captions.ChangeObjectCaption.prototype.onLoadStart = function(e) {

  goog.dom.classlist.enable( this._itemEls[e.id], 'loading', true );
};


feng.views.sections.captions.ChangeObjectCaption.prototype.onLoadComplete = function(e) {

  goog.dom.classlist.enable( this._itemEls[e.id], 'loading', false );
};