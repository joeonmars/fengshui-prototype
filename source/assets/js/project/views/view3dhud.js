goog.provide('feng.views.View3DHud');

goog.require('feng.views.sections.controls.ObjectBox');
goog.require('feng.views.sections.controls.ObjectSelector');
goog.require('feng.views.View3DCaption');


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


feng.views.View3DHud.prototype.getCaption = function( object, type ) {

	var key = goog.getUid(object) + '-' + type;

	if(this._captions[key]) {
		return this._captions[key];
	}

	var caption = new feng.views.View3DCaption( object, type, this._cameraController, this._viewSize );
	this._captions[ key ] = caption;

	goog.dom.appendChild( this._captionContainerEl, caption.domElement );

	return caption;
};