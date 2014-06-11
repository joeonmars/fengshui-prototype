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
  this._wrapLayout.addBlock( leftEl, feng.fx.WrapLayout.Alignment.LEFT, new goog.math.Size(200, 430) );
  this._wrapLayout.addBlock( rightEl, feng.fx.WrapLayout.Alignment.RIGHT, new goog.math.Size(400, 430) );
};
goog.inherits(feng.views.sections.captions.ChangeColorCaption, feng.views.View3DCaption);


feng.views.sections.captions.ChangeColorCaption.prototype.show = function() {

  goog.base(this, 'show');
};


feng.views.sections.captions.ChangeColorCaption.prototype.hide = function() {

  goog.base(this, 'hide');
};