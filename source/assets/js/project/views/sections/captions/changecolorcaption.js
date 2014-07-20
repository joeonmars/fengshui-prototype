goog.provide('feng.views.sections.captions.ChangeColorCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.View3DCaption');


/**
 * @constructor
 */
feng.views.sections.captions.ChangeColorCaption = function( object, cameraController, renderSize, controls, hud ){

  this._template = feng.templates.captions.ChangeColorCaption;

  this._templateData = {
  	
  };

  goog.base(this, object, cameraController, renderSize, controls, hud);

  var leftEl = goog.dom.getElementByClass('left', this.domElement);
  var rightEl = goog.dom.getElementByClass('right', this.domElement);
  this._leftBlock = this._wrapLayout.addBlock( leftEl, feng.fx.WrapLayout.Alignment.LEFT );
  this._rightBlock = this._wrapLayout.addBlock( rightEl, feng.fx.WrapLayout.Alignment.RIGHT );
};
goog.inherits(feng.views.sections.captions.ChangeColorCaption, feng.views.View3DCaption);


feng.views.sections.captions.ChangeColorCaption.prototype.show = function() {

  goog.base(this, 'show');
};


feng.views.sections.captions.ChangeColorCaption.prototype.hide = function() {

  goog.base(this, 'hide');
};


feng.views.sections.captions.ChangeColorCaption.prototype.onResize = function(e) {

  goog.base(this, 'onResize', e);

  this._wrapLayout.updateBlockSize( this._rightBlock );
  this._wrapLayout.updateBlockSize( this._leftBlock );
};