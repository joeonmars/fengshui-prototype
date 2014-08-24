goog.provide('feng.views.sections.captions.FruitsCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.View3DCaption');


/**
 * @constructor
 */
feng.views.sections.captions.FruitsCaption = function( object, cameraController, renderSize, controls, hud ){

  this._template = feng.templates.captions.FruitsCaption;
  
  this._templateData = {
    tip: object.tip
  };

  goog.base(this, object, cameraController, renderSize, controls, hud);

  var rightEl = goog.dom.getElementByClass('right', this.domElement);
  this._rightBlock = this._wrapLayout.addBlock( rightEl, feng.fx.WrapLayout.Alignment.RIGHT );
};
goog.inherits(feng.views.sections.captions.FruitsCaption, feng.views.View3DCaption);


feng.views.sections.captions.FruitsCaption.prototype.show = function() {

  goog.base(this, 'show');

  //this._controls.shiftCameraToRight();
};


feng.views.sections.captions.FruitsCaption.prototype.hide = function() {

  goog.base(this, 'hide');

};


feng.views.sections.captions.FruitsCaption.prototype.close = function() {

  //this._controls.shiftCamera( 0 );

  //goog.Timer.callOnce(this.doClose, 600, this);
};


feng.views.sections.captions.FruitsCaption.prototype.onResize = function(e) {

  goog.base(this, 'onResize', e);

  this._wrapLayout.updateBlockSize( this._rightBlock );
};