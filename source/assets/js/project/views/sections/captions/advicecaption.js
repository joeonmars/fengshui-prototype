goog.provide('feng.views.sections.captions.AdviceCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.View3DCaption');


/**
 * @constructor
 */
feng.views.sections.captions.AdviceCaption = function( object, cameraController, renderSize, controls, hud ){

  this._template = feng.templates.captions.AdviceCaption;

  this._templateData = {
  	
  };

  goog.base(this, object, cameraController, renderSize, controls, hud);

  var rightEl = goog.dom.getElementByClass('right', this.domElement);
  this._rightBlock = this._wrapLayout.addBlock( rightEl, feng.fx.WrapLayout.Alignment.RIGHT );
};
goog.inherits(feng.views.sections.captions.AdviceCaption, feng.views.View3DCaption);


feng.views.sections.captions.AdviceCaption.prototype.show = function() {

  goog.base(this, 'show');
};


feng.views.sections.captions.AdviceCaption.prototype.hide = function() {

  goog.base(this, 'hide');
};


feng.views.sections.captions.AdviceCaption.prototype.onResize = function(e) {

  goog.base(this, 'onResize', e);

  this._wrapLayout.updateBlockSize( this._rightBlock );
};