goog.provide('feng.views.View3DHud');

goog.require('feng.views.sections.controls.ObjectBox');
goog.require('feng.views.sections.controls.ObjectSelector');
goog.require('feng.views.View3DCaption');
goog.require('feng.views.sections.captions.AdviceCaption');
goog.require('feng.views.sections.captions.ChangeColorCaption');
goog.require('feng.views.sections.captions.ChangeObjectCaption');
goog.require('feng.views.sections.captions.ChangePictureCaption');


/**
 * @constructor
 */
feng.views.View3DHud = function( view3d ){

  goog.base(this);

  this._cameraController = view3d.cameraController;
  this._viewSize = view3d.viewSize;

  this.domElement = view3d.uiElement;
  this._captionContainerEl = goog.dom.getElementByClass('captions', view3d.uiElement);

  // create hud elements
  var objectBoxEl = goog.dom.getElementByClass('objectBox', this.domElement);
  this.objectBox = new feng.views.sections.controls.ObjectBox( objectBoxEl, this._cameraController, this._viewSize );

  var objectSelectorEl = goog.dom.getElementByClass('objectSelector', this.domElement);
  var renderEl = view3d.domElement;
  this.objectSelector = new feng.views.sections.controls.ObjectSelector( objectSelectorEl, renderEl );

  this._captions = {};
};
goog.inherits(feng.views.View3DHud, goog.events.EventTarget);


feng.views.View3DHud.prototype.getCaption = function( object, controls, type ) {

	var key = goog.getUid(object) + '-' + type;

	if(this._captions[key]) {
		return this._captions[key];
	}

  var captionClass;

  switch(type) {
    case 'advice':
    captionClass = feng.views.sections.captions.AdviceCaption;
    break;

    case 'change_color':
    captionClass = feng.views.sections.captions.ChangeColorCaption;
    break;

    case 'change_object':
    captionClass = feng.views.sections.captions.ChangeObjectCaption;
    break;

    case 'change_picture':
    captionClass = feng.views.sections.captions.ChangePictureCaption;
    break;
  }

	var caption = new captionClass( object, this._cameraController, this._viewSize, controls, this );
	this._captions[ key ] = caption;

	goog.dom.appendChild( this._captionContainerEl, caption.domElement );

	return caption;
};