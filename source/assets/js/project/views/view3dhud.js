goog.provide('feng.views.View3DHud');

goog.require('goog.events.EventHandler');
goog.require('feng.views.sections.controls.ObjectBox');
goog.require('feng.views.sections.controls.ObjectSelector');
goog.require('feng.views.View3DCaption');
goog.require('feng.views.sections.controls.EpisodeButton');
goog.require('feng.views.sections.controls.Compass');
goog.require('feng.views.sections.controls.Book');
goog.require('feng.views.sections.controls.Reminder');
goog.require('feng.views.sections.controls.ProgressBar');
goog.require('feng.views.sections.captions.AdviceCaption');
goog.require('feng.views.sections.captions.ChangeColorCaption');
goog.require('feng.views.sections.captions.ChangeObjectCaption');
goog.require('feng.views.sections.captions.ChangePictureCaption');
goog.require('feng.views.sections.overlays.EpisodeSelectionOverlay');


/**
 * @constructor
 */
feng.views.View3DHud = function( hudEl, view3dController, tips ){

  goog.base(this);

  this.domElement = hudEl;
  this._captionContainerEl = goog.dom.getElementByClass('captions', this.domElement);

  this._view3d = null;
  this._view3dController = view3dController;

  this._eventHandler = new goog.events.EventHandler(this);

  // create a captions collection
  this._captions = {};

  // create overlays
  var episodeSelectionOverlayEl = goog.dom.getElementByClass('episode-selection-overlay', this.domElement);
  this.episodeSelectionOverlay = new feng.views.sections.overlays.EpisodeSelectionOverlay( episodeSelectionOverlayEl );

  // create controls
  var episodeButtonEl = goog.dom.getElementByClass('episode-button', this.domElement);
  this.episodeButton = new feng.views.sections.controls.EpisodeButton( episodeButtonEl, this.episodeSelectionOverlay );

  var compassEl = goog.dom.getElementByClass('compass', this.domElement);
  this.compass = new feng.views.sections.controls.Compass( compassEl );
  this.compass.setParentEventTarget( this );

  var bookEl = goog.dom.getElementByClass('book', this.domElement);
  this.book = new feng.views.sections.controls.Book( bookEl );
  this.book.setParentEventTarget( this );

  var reminderEl = goog.dom.getElementByClass('reminder', this.domElement);
  this.reminder = new feng.views.sections.controls.Reminder( reminderEl, tips );
  this.reminder.setParentEventTarget( this );

  var progressBarEl = goog.dom.getElementByClass('progressBar', this.domElement);
  this.progressBar = new feng.views.sections.controls.ProgressBar( progressBarEl, tips );
  this.progressBar.setParentEventTarget( this );

  var objectBoxEl = goog.dom.getElementByClass('objectBox', this.domElement);
  this.objectBox = new feng.views.sections.controls.ObjectBox( objectBoxEl );

  var objectSelectorEl = goog.dom.getElementByClass('objectSelector', this.domElement);
  this.objectSelector = new feng.views.sections.controls.ObjectSelector( objectSelectorEl );
};
goog.inherits(feng.views.View3DHud, goog.events.EventTarget);


feng.views.View3DHud.prototype.setView3D = function( view3d ) {

  this._view3d = view3d;

  this.episodeButton.setView3D( view3d );
  this.compass.setView3D( view3d );
  this.book.setView3D( view3d );
  this.reminder.setView3D( view3d );
  this.progressBar.setView3D( view3d );
  this.objectBox.setView3D( view3d );
  this.objectSelector.setView3D( view3d );

  this._eventHandler.listen(this._view3d.modeController, feng.events.EventType.UPDATE, this.onUpdateView3D, false, this);
};


feng.views.View3DHud.prototype.activate = function() {

  this._eventHandler.listen(this._view3dController, feng.events.EventType.SHOW, this.onShowView3D, false, this);

  this.episodeButton.activate();
  this.compass.activate();
  this.book.activate();
  this.reminder.activate();
  this.progressBar.activate();
};


feng.views.View3DHud.prototype.deactivate = function() {

  this._eventHandler.removeAll();

  this.episodeButton.deactivate();
  this.compass.deactivate();
  this.book.deactivate();
  this.reminder.deactivate();
  this.progressBar.deactivate();
};


feng.views.View3DHud.prototype.show = function() {

  goog.style.showElement(this.domElement, true);
};


feng.views.View3DHud.prototype.hide = function() {

  goog.style.showElement(this.domElement, false);
};


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
  
  var cameraController = this._view3d.cameraController;
  var viewSize = this._view3d.viewSize;

	var caption = new captionClass( object, cameraController, viewSize, controls, this );
	this._captions[ key ] = caption;

	goog.dom.appendChild( this._captionContainerEl, caption.domElement );

	return caption;
};


feng.views.View3DHud.prototype.onShowView3D = function( e ) {

  var view3d = e.target;

  this.setView3D( view3d );
};


feng.views.View3DHud.prototype.onUpdateView3D = function( e ) {

  this.compass.setRotation( e.rotationY );
};