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
};
goog.inherits(feng.views.sections.captions.ArrangeClosetCaption, feng.views.sections.captions.Caption);


feng.views.sections.captions.ArrangeClosetCaption.prototype.show = function() {

  goog.base(this, 'show');
};


feng.views.sections.captions.ArrangeClosetCaption.prototype.hide = function() {

  goog.base(this, 'hide');
};