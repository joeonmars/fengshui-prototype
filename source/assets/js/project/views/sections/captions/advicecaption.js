goog.provide('feng.views.sections.captions.AdviceCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.sections.captions.Caption');


/**
 * @constructor
 */
feng.views.sections.captions.AdviceCaption = function( object, cameraController, renderSize, controls, hud ){

  this._template = feng.templates.captions.AdviceCaption;

  this._templateData = {
  	tip: object.tip
  };

  goog.base(this, object, cameraController, renderSize, controls, hud);
};
goog.inherits(feng.views.sections.captions.AdviceCaption, feng.views.sections.captions.Caption);


feng.views.sections.captions.AdviceCaption.prototype.show = function() {

  goog.base(this, 'show');
};


feng.views.sections.captions.AdviceCaption.prototype.hide = function() {

  goog.base(this, 'hide');
};