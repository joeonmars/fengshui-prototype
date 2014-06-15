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

  this._closeButtonEl = goog.dom.getElementByClass('close', this.domElement);
  this._confirmButtonEl = goog.dom.getElementByClass('confirm', this.domElement);
};
goog.inherits(feng.views.View3DCaption, goog.events.EventTarget);


feng.views.View3DCaption.prototype.show = function() {

  goog.style.showElement( this.domElement, true );

  this._eventHandler.listen( this._closeButtonEl, 'click', this.onClick, false, this );
  this._eventHandler.listen( this._confirmButtonEl, 'click', this.onClick, false, this );
  this._eventHandler.listen( window, 'resize', this.onResize, false, this );

  this.onResize();

  goog.fx.anim.registerAnimation( this );
};


feng.views.View3DCaption.prototype.hide = function() {

  goog.style.showElement( this.domElement, false );

  this._eventHandler.removeAll();

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


feng.views.View3DCaption.prototype.onClick = function( e ) {

  switch(e.currentTarget) {
    case this._closeButtonEl:
    this.dispatchEvent({
      type: feng.events.EventType.CLOSE
    });
    break;

    case this._confirmButtonEl:
    this._object.tip.unlock();
    break;
  }
};


feng.views.View3DCaption.prototype.onResize = function( e ) {

  var confirmButtonSize = goog.style.getSize(this._confirmButtonEl);
  var x = (this._renderSize.width - confirmButtonSize.width) / 2;
  var y = this._renderSize.height - confirmButtonSize.height - 55;

  goog.style.setPosition(this._confirmButtonEl, x, y);
};