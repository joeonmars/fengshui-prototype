goog.provide('feng.views.View3DCaption');

goog.require('feng.fx.WrapLayout');


/**
 * @constructor
 */
feng.views.View3DCaption = function( object, cameraController, renderSize ){

  goog.base(this);

  this._object = object;
  this._cameraController = cameraController;
  this._renderSize = renderSize;
  this._wrapLayout = new feng.fx.WrapLayout;

  this.allowUpdate = true;

  this.domElement = goog.dom.createDom('div', 'captionView');

  this._template = this._template || null;
  this._templateData = this._templateData || null;

  // render HTML template
  soy.renderElement(this.domElement, this._template, this._templateData);
};
goog.inherits(feng.views.View3DCaption, goog.events.EventTarget);


feng.views.View3DCaption.prototype.show = function() {

  goog.style.showElement( this.domElement, true );

  goog.fx.anim.registerAnimation( this );
};


feng.views.View3DCaption.prototype.hide = function() {

  goog.style.showElement( this.domElement, false );

  goog.fx.anim.unregisterAnimation( this );
};


feng.views.View3DCaption.prototype.update = function() {

  var object3d = this._object.object3d;
  var camera = this._cameraController.activeCamera;

  this._wrapLayout.update( object3d, camera, this._renderSize );
};


feng.views.View3DCaption.prototype.onAnimationFrame = function( now ) {

  if(!this.allowUpdate) return;

  this.update();
};