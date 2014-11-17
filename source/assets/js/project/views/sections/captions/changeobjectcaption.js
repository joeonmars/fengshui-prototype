goog.provide('feng.views.sections.captions.ChangeObjectCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.sections.captions.Caption');


/**
 * @constructor
 */
feng.views.sections.captions.ChangeObjectCaption = function( object, cameraController, renderSize, controls, hud ){

  this._template = feng.templates.captions.ChangeObjectCaption;
  
  this._templateData = {
    objects: object.objects,
    tip: object.tip,
    position: 'right'
  };

  goog.base(this, object, cameraController, renderSize, controls, hud);

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

  var objectId = e.currentTarget.getAttribute("data-object");

  this._object.change( objectId );
};