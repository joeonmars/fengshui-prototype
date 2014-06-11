goog.provide('feng.views.sections.captions.AdviceCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.View3DCaption');


/**
 * @constructor
 */
feng.views.sections.captions.AdviceCaption = function( object, cameraController, renderSize, controls, hud ){

  this._template = feng.templates.captions.ChangeColorCaption;

  this._templateData = {
  	
  };

  goog.base(this, object, cameraController, renderSize, controls, hud);

  var rightEl = goog.dom.getElementByClass('right', this.domElement);
  this._wrapLayout.addBlock( rightEl, feng.fx.WrapLayout.Alignment.RIGHT, new goog.math.Size(400, 430) );
};
goog.inherits(feng.views.sections.captions.AdviceCaption, feng.views.View3DCaption);


feng.views.sections.captions.AdviceCaption.prototype.show = function() {

  goog.base(this, 'show');
};


feng.views.sections.captions.AdviceCaption.prototype.hide = function() {

  goog.base(this, 'hide');
};