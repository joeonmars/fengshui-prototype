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
  	
  };

  goog.base(this, object, cameraController, renderSize, controls, hud);

  var topEl = goog.dom.getElementByClass('top', this.domElement);
  var rightEl = goog.dom.getElementByClass('right', this.domElement);
  this._topBlock = this._wrapLayout.addBlock( topEl, feng.fx.WrapLayout.Alignment.TOP );
  this._rightBlock = this._wrapLayout.addBlock( rightEl, feng.fx.WrapLayout.Alignment.RIGHT );
};
goog.inherits(feng.views.sections.captions.ChangeObjectCaption, feng.views.sections.captions.Caption);


feng.views.sections.captions.ChangeObjectCaption.prototype.show = function() {

  goog.base(this, 'show');

  this._object.startInteraction();
};


feng.views.sections.captions.ChangeObjectCaption.prototype.hide = function() {

  goog.base(this, 'hide');

  this._object.stopInteraction();
};


feng.views.sections.captions.ChangeObjectCaption.prototype.onResize = function(e) {

  goog.base(this, 'onResize', e);

  this._wrapLayout.updateBlockSize( this._rightBlock );
  this._wrapLayout.updateBlockSize( this._topBlock );
};