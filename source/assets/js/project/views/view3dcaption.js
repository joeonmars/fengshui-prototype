goog.provide('feng.views.View3DCaption');

goog.require('goog.soy');
goog.require('feng.fx.WrapLayout');
goog.require('feng.templates.captions');


/**
 * @constructor
 */
feng.views.View3DCaption = function( object, type, cameraController, renderSize ){

  goog.base(this);

  this._object = object;
  this._cameraController = cameraController;
  this._renderSize = renderSize;
  this._wrapLayout = new feng.fx.WrapLayout;

  this.allowUpdate = true;

  var types = feng.views.View3DCaption.Type;
  var alignment = feng.fx.WrapLayout.Alignment;

  this.domElement = goog.dom.createDom('div', 'captionView');

  // make template data
  var templateData = {
    type: type
  };
  
  switch(type) {
    case types.CHANGE_COLOR:
    break;

    case types.CHANGE_OBJECT:
    break;

    case types.CHANGE_PICTURE:
    templateData.pictures = this._object.pictures
    break;

    case types.ADVICE:
    break;
  }

  // render HTML template
  soy.renderElement(this.domElement, feng.templates.captions.Caption, templateData);

  // make wrap layout
  switch(type) {
    case types.CHANGE_COLOR:
    var leftEl = goog.dom.getElementByClass('left', this.domElement);
    var rightEl = goog.dom.getElementByClass('right', this.domElement);
    this._wrapLayout.addBlock( leftEl, alignment.LEFT, new goog.math.Size(200, 400) );
    this._wrapLayout.addBlock( rightEl, alignment.RIGHT, new goog.math.Size(400, 400) );
    break;

    case types.CHANGE_OBJECT:
    var topEl = goog.dom.getElementByClass('top', this.domElement);
    var rightEl = goog.dom.getElementByClass('right', this.domElement);
    this._wrapLayout.addBlock( topEl, alignment.TOP, new goog.math.Size(800, 60) );
    this._wrapLayout.addBlock( rightEl, alignment.RIGHT, new goog.math.Size(400, 400) );
    break;

    case types.CHANGE_PICTURE:
    var rightEl = goog.dom.getElementByClass('right', this.domElement);
    this._wrapLayout.addBlock( rightEl, alignment.RIGHT, new goog.math.Size(400, 400) );
    break;

    case types.ADVICE:
    var rightEl = goog.dom.getElementByClass('right', this.domElement);
    this._wrapLayout.addBlock( rightEl, alignment.RIGHT, new goog.math.Size(400, 400) );
    break;
  }
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


feng.views.View3DCaption.Type = {
  CHANGE_COLOR: 'change_color',
  CHANGE_PICTURE: 'change_picture',
  CHANGE_OBJECT: 'change_object',
  ADVICE: 'advice'
};