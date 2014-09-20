goog.provide('feng.views.sections.captions.ArrangeClosetCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.sections.captions.Caption');


/**
 * @constructor
 */
feng.views.sections.captions.ArrangeClosetCaption = function( object, cameraController, renderSize, controls, hud ){

  this._template = feng.templates.captions.ArrangeClosetCaption;

  this._templateData = {
  	tip: object.tip
  };

  goog.base(this, object, cameraController, renderSize, controls, hud);

  var leftEl = goog.dom.getElementByClass('left', this.domElement);
  this._leftBlock = this._wrapLayout.addBlock( leftEl, feng.fx.WrapLayout.Alignment.LEFT );
};
goog.inherits(feng.views.sections.captions.ArrangeClosetCaption, feng.views.sections.captions.Caption);


feng.views.sections.captions.ArrangeClosetCaption.prototype.show = function() {

  goog.base(this, 'show');
};


feng.views.sections.captions.ArrangeClosetCaption.prototype.hide = function() {

  goog.base(this, 'hide');
};


feng.views.sections.captions.ArrangeClosetCaption.prototype.onResize = function(e) {

  goog.base(this, 'onResize', e);

  this._wrapLayout.updateBlockSize( this._leftBlock );
};