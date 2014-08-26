goog.provide('feng.views.sections.captions.ChangeColorCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.sections.captions.Caption');
goog.require('feng.views.sections.controls.ColorSelector');


/**
 * @constructor
 */
feng.views.sections.captions.ChangeColorCaption = function( object, cameraController, renderSize, controls, hud ){

  this._template = feng.templates.captions.ChangeColorCaption;
  
  this._templateData = {
  	colors: object.colors,
    tip: object.tip
  };

  goog.base(this, object, cameraController, renderSize, controls, hud);

  var rightEl = goog.dom.getElementByClass('right', this.domElement);
  this._rightBlock = this._wrapLayout.addBlock( rightEl, feng.fx.WrapLayout.Alignment.RIGHT );

  var bottomEl = goog.dom.getElementByClass('bottom', this.domElement);
  this._bottomBlock = this._wrapLayout.addBlock( bottomEl, feng.fx.WrapLayout.Alignment.BOTTOM );

  var colorSelectorEl = goog.dom.getElementByClass('colorSelector', this.domElement);
  this._colorSelector = new feng.views.sections.controls.ColorSelector( colorSelectorEl, object );
};
goog.inherits(feng.views.sections.captions.ChangeColorCaption, feng.views.sections.captions.Caption);


feng.views.sections.captions.ChangeColorCaption.prototype.show = function() {

  goog.base(this, 'show');

  this._colorSelector.activate();

  this._controls.shiftCameraToRight();
};


feng.views.sections.captions.ChangeColorCaption.prototype.hide = function() {

  goog.base(this, 'hide');

  this._colorSelector.deactivate();
};


feng.views.sections.captions.ChangeColorCaption.prototype.close = function() {

  this._controls.shiftCamera( 0 );

  goog.Timer.callOnce(this.doClose, 600, this);
};


feng.views.sections.captions.ChangeColorCaption.prototype.onResize = function(e) {

  goog.base(this, 'onResize', e);

  this._wrapLayout.updateBlockSize( this._rightBlock );
  this._wrapLayout.updateBlockSize( this._bottomBlock );
};