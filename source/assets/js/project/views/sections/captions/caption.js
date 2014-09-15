goog.provide('feng.views.sections.captions.Caption');

goog.require('goog.events.EventHandler');
goog.require('feng.fx.WrapLayout');


/**
 * @constructor
 */
feng.views.sections.captions.Caption = function( object, cameraController, renderSize, controls, hud ){

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

  this._hasUnlockReady = false;
};
goog.inherits(feng.views.sections.captions.Caption, goog.events.EventTarget);


feng.views.sections.captions.Caption.prototype.show = function() {

  goog.style.showElement( this.domElement, true );

  if(this._closeButton) {
    this._eventHandler.listen( this._closeButton, 'click', this.onClick, false, this );
  }

  if(this._changeButton) {
    this._eventHandler.listen( this._changeButton, 'click', this.onClick, false, this );
  }
  
  // listen for unlock ready event from view3d object
  if( this._object.isUnlocked() ) {

    this.onUnlock();

  }else if( this._object.wasUnlockReady() ) {

    this.onUnlockReady();

  }else {

    this._eventHandler.listen( this._object, feng.events.EventType.UNLOCK_READY, this.onUnlockReady, false, this );
    this._eventHandler.listen( this._object, feng.events.EventType.UNLOCK, this.onUnlock, false, this );
  }

  this._eventHandler.listen( window, 'resize', this.onResize, false, this );

  this.onResize();

  goog.fx.anim.registerAnimation( this );
};


feng.views.sections.captions.Caption.prototype.hide = function() {

  goog.style.showElement( this.domElement, false );

  this._eventHandler.removeAll();

  goog.fx.anim.unregisterAnimation( this );
};


feng.views.sections.captions.Caption.prototype.close = function() {

  this.doClose();
};


feng.views.sections.captions.Caption.prototype.doClose = function() {

  this.dispatchEvent({
    type: feng.events.EventType.CLOSE
  });
};


feng.views.sections.captions.Caption.prototype.unlock = function() {

  // trigger tip object to unlock
  this._object.unlock();
};



feng.views.sections.captions.Caption.prototype.update = function() {

  var object3d = this._object.object3d;
  var camera = this._cameraController.activeCamera;

  this._wrapLayout.update( object3d, camera, this._renderSize );
};


feng.views.sections.captions.Caption.prototype.onAnimationFrame = function( now ) {

  if(!this.allowUpdate) return;

  this.update();
};


feng.views.sections.captions.Caption.prototype.onClick = function( e ) {

  switch(e.currentTarget) {
    case this._closeButton:
    this.close();
    break;

    case this._changeButton:
    this._object.tip.unlock();
    break;

    /* WIP
    case this._unlockButton:
    this.unlock();
    break;
    */
  }
};


feng.views.sections.captions.Caption.prototype.onUnlock = function( e ) {

  // handle caption UI change
};


feng.views.sections.captions.Caption.prototype.onUnlockReady = function( e ) {

  // handle caption UI change
};


feng.views.sections.captions.Caption.prototype.onResize = function( e ) {

  
};