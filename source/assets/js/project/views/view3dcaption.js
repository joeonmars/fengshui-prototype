goog.provide('feng.views.View3DCaption');

goog.require('goog.events.EventHandler');
goog.require('feng.fx.WrapLayout');


/**
 * @constructor
 */
feng.views.View3DCaption = function( object, cameraController, renderSize, controls, hud ){

  goog.base(this);

  this._object = object;
  this._cameraController = cameraController;
  this._renderSize = renderSize;
  this._controls = controls;
  this._hud = hud;
  this._wrapLayout = new feng.fx.WrapLayout;

  this.allowUpdate = true;

  this._eventHandler = new goog.events.EventHandler(this);

  this._template = this._template || null;
  this._templateData = this._templateData || null;

  // render HTML template
  this.domElement = soy.renderAsFragment(this._template, this._templateData);

  this._closeButton = goog.dom.getElementByClass('close-button', this.domElement);
  this._changeButton = goog.dom.getElementByClass('change', this.domElement);
};
goog.inherits(feng.views.View3DCaption, goog.events.EventTarget);


feng.views.View3DCaption.prototype.show = function() {

  goog.style.showElement( this.domElement, true );

  if(this._closeButton) {
    this._eventHandler.listen( this._closeButton, 'click', this.onClick, false, this ); 
  }

  if(this._changeButton) {
    this._eventHandler.listen( this._changeButton, 'click', this.onClick, false, this );  
  }
  
  this._eventHandler.listen( window, 'resize', this.onResize, false, this );

  this.onResize();

  goog.fx.anim.registerAnimation( this );
};


feng.views.View3DCaption.prototype.hide = function() {

  goog.style.showElement( this.domElement, false );

  this._eventHandler.removeAll();

  goog.fx.anim.unregisterAnimation( this );
};


feng.views.View3DCaption.prototype.close = function() {

  this.doClose();
};


feng.views.View3DCaption.prototype.doClose = function() {

  this.dispatchEvent({
    type: feng.events.EventType.CLOSE
  });
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


feng.views.View3DCaption.prototype.onClick = function( e ) {

  switch(e.currentTarget) {
    case this._closeButton:
    this.close();
    break;

    case this._changeButton:
    this._object.tip.unlock();
    break;
  }
};


feng.views.View3DCaption.prototype.onResize = function( e ) {

  
};