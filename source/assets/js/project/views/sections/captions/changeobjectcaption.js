goog.provide('feng.views.sections.captions.ChangeObjectCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.sections.captions.Caption');


/**
 * @constructor
 */
feng.views.sections.captions.ChangeObjectCaption = function( object, cameraController, renderSize, controls, hud ){

  this._template = feng.templates.captions.ChangeObjectCaption;
  console.log(object.tip)
  this._templateData = {
    tip: object.tip,
    position: 'right'
  };

  goog.base(this, object, cameraController, renderSize, controls, hud);

  this._objectEl = null;

  this._objectEls = goog.dom.getElementsByClass('object', this.domElement);
};
goog.inherits(feng.views.sections.captions.ChangeObjectCaption, feng.views.sections.captions.Caption);


feng.views.sections.captions.ChangeObjectCaption.prototype.show = function() {

  goog.base(this, 'show');

  goog.array.forEach(this._objectEls, function(objectEl) {
    this._eventHandler.listen(objectEl, 'click', this.onClickObject, false, this);
  }, this);

  this._object.startInteraction();
};


feng.views.sections.captions.ChangeObjectCaption.prototype.hide = function() {

  goog.base(this, 'hide');

  this._object.stopInteraction();
};


feng.views.sections.captions.ChangeObjectCaption.prototype.onClickObject = function(e) {

  if(this._objectEl) {
    goog.dom.classes.enable( this._objectEl, 'active', false );
  }

  this._objectEl = e.currentTarget;

  goog.dom.classes.enable( this._objectEl, 'active', true );

  var objectId = this._objectEl.getAttribute("data-object");

  this._object.change( objectId );
};