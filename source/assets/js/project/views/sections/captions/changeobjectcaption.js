goog.provide('feng.views.sections.captions.ChangeObjectCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.View3DCaption');


/**
 * @constructor
 */
feng.views.sections.captions.ChangeObjectCaption = function( object, cameraController, renderSize, controls, hud ){

  this._template = feng.templates.captions.ChangeColorCaption;

  this._templateData = {
  	
  };

  goog.base(this, object, cameraController, renderSize, controls, hud);

  var topEl = goog.dom.getElementByClass('top', this.domElement);
  var rightEl = goog.dom.getElementByClass('right', this.domElement);
  this._wrapLayout.addBlock( topEl, feng.fx.WrapLayout.Alignment.TOP, new goog.math.Size(800, 60) );
  this._wrapLayout.addBlock( rightEl, feng.fx.WrapLayout.Alignment.RIGHT, new goog.math.Size(400, 430) );
};
goog.inherits(feng.views.sections.captions.ChangeObjectCaption, feng.views.View3DCaption);


feng.views.sections.captions.ChangeObjectCaption.prototype.show = function() {

  goog.base(this, 'show');
};


feng.views.sections.captions.ChangeObjectCaption.prototype.hide = function() {

  goog.base(this, 'hide');
};