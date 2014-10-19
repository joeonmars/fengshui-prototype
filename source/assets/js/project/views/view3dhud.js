goog.provide('feng.views.View3DHud');

goog.require('feng.views.sections.controls.ObjectSelector');
goog.require('feng.views.sections.controls.DropButton');
goog.require('feng.views.sections.controls.Compass');
goog.require('feng.views.sections.controls.Book');
goog.require('feng.views.sections.controls.Reminder');
goog.require('feng.views.sections.controls.HomeButton');
goog.require('feng.views.sections.controls.ProgressBar');
goog.require('feng.views.sections.controls.Tooltips');
goog.require('feng.views.sections.captions.Caption');
goog.require('feng.views.sections.captions.ChangeColorCaption');
goog.require('feng.views.sections.captions.ChangeObjectCaption');
goog.require('feng.views.sections.captions.ChangePictureCaption');
goog.require('feng.views.sections.captions.DropFruitsCaption');
goog.require('feng.views.sections.overlays.TutorialOverlay');
goog.require('feng.views.sections.overlays.OpeningOverlay');
goog.require('feng.views.sections.overlays.EndingOverlay');
goog.require('feng.views.sections.overlays.FinaleOverlay');
goog.require('feng.views.sections.overlays.LoaderOverlay');


/**
 * @constructor
 */
feng.views.View3DHud = function( hudEl, view3dController, tips, episode ){

  goog.base(this);

  this.domElement = hudEl;

  this._view3d = null;
  this._view3dController = view3dController;

  this._episode = episode;

  // create a captions collection
  this._captions = {};

  // create overlays
  this._overlaysEl = goog.dom.getElementByClass('overlays', this.domElement);

  var tutorialOverlayEl = goog.dom.getElementByClass('tutorial-overlay', this._overlaysEl);
  this.tutorialOverlay = new feng.views.sections.overlays.TutorialOverlay( tutorialOverlayEl );

  var openingOverlayEl = goog.dom.getElementByClass('opening-overlay', this._overlaysEl);
  this.openingOverlay = new feng.views.sections.overlays.OpeningOverlay( openingOverlayEl );

  var endingOverlayEl = goog.dom.getElementByClass('ending-overlay', this._overlaysEl);
  this.endingOverlay = new feng.views.sections.overlays.EndingOverlay( endingOverlayEl );

  var finaleOverlayEl = goog.dom.getElementByClass('finale-overlay', this._overlaysEl);
  this.finaleOverlay = new feng.views.sections.overlays.FinaleOverlay( finaleOverlayEl );

  var loaderOverlayEl = goog.dom.getElementByClass('loader-overlay', this._overlaysEl);
  this.loaderOverlay = new feng.views.sections.overlays.LoaderOverlay( loaderOverlayEl );

  // create controls
  this._controlsEl = goog.dom.getElementByClass('controls', this.domElement);

  var homeButtonEl = goog.dom.getElementByClass('home-button', this._controlsEl);
  this.homeButton = new feng.views.sections.controls.HomeButton( homeButtonEl );
  this.homeButton.setParentEventTarget( this );

  var compassEl = goog.dom.getElementByClass('compass', this._controlsEl);
  this.compass = new feng.views.sections.controls.Compass( compassEl );
  this.compass.setParentEventTarget( this );

  var bookEl = goog.dom.getElementByClass('book', this._controlsEl);
  this.book = new feng.views.sections.controls.Book( bookEl );
  this.book.setParentEventTarget( this );
  
  var reminderEl = goog.dom.getElementByClass('reminder', this._controlsEl);
  this.reminder = new feng.views.sections.controls.Reminder( reminderEl, tips );
  this.reminder.setParentEventTarget( this );

  var progressBarEl = goog.dom.getElementByClass('progressBar', this._controlsEl);
  this.progressBar = new feng.views.sections.controls.ProgressBar( progressBarEl, tips );
  this.progressBar.setParentEventTarget( this );

  var objectSelectorEl = goog.dom.getElementByClass('objectSelector', this._controlsEl);
  this.objectSelector = new feng.views.sections.controls.ObjectSelector( objectSelectorEl );

  var dropButtonEl = goog.dom.getElementByClass('dropButton', this._controlsEl);
  this.dropButton = new feng.views.sections.controls.DropButton( dropButtonEl );

  // captions
  this._captionsEl = goog.dom.getElementByClass('captions', this.domElement);

  // tooltips
  this._tooltipsEl = goog.dom.getElementByClass('tooltips', this.domElement);
  this.tooltips = new feng.views.sections.controls.Tooltips( this._tooltipsEl );
};
goog.inherits(feng.views.View3DHud, goog.events.EventTarget);


feng.views.View3DHud.prototype.init = function() {

  this.reminder.init();
};


feng.views.View3DHud.prototype.setView3D = function( view3d ) {

  if(this._view3d) {
    this._view3d.modeController.unlisten( feng.events.EventType.CHANGE, this.onModeChange, false, this );
  }

  this._view3d = view3d;

  this._view3d.modeController.listen( feng.events.EventType.CHANGE, this.onModeChange, false, this );

  this.compass.setView3D( view3d );
  this.book.setView3D( view3d );
  this.reminder.setView3D( view3d );
  this.progressBar.setView3D( view3d );
  this.objectSelector.setView3D( view3d );
  this.dropButton.setView3D( view3d );
  this.tooltips.setView3D( view3d );
};


feng.views.View3DHud.prototype.pause = function( shouldPause ) {

  goog.dom.classes.enable( this._captionsEl, 'paused', shouldPause );
  goog.dom.classes.enable( this._tooltipsEl, 'paused', shouldPause );
  goog.dom.classes.enable( this._controlsEl, 'paused', shouldPause );

  goog.dom.classes.enable( this._controlsEl, 'hidden', shouldPause );

  feng.mainOptions.showHelpButton( !shouldPause );
};


feng.views.View3DHud.prototype.activate = function() {

  this._view3dController.listen(feng.events.EventType.SHOW, this.onShowView3D, false, this);
  this._view3dController.listen(feng.events.EventType.ANIMATED_IN, this.onAnimatedInView3D, false, this);

  feng.tutorial.listen(feng.events.EventType.ANIMATE_IN, this.tutorialOverlay.animateIn, false, this.tutorialOverlay);
  feng.tutorial.listen(feng.events.EventType.ANIMATE_OUT, this.tutorialOverlay.animateOut, false, this.tutorialOverlay);

  this._episode.listen(feng.events.EventType.START, this.loaderOverlay.onLoadStart, false, this.loaderOverlay);
  this._episode.listen(feng.events.EventType.PROGRESS, this.loaderOverlay.onLoadProgress, false, this.loaderOverlay);
  this._episode.listen(feng.events.EventType.COMPLETE, this.loaderOverlay.onLoadComplete, false, this.loaderOverlay);

  this.openingOverlay.listen(feng.events.EventType.ANIMATE_IN, this.onOpeningOverlayAnimateIn, false, this);
  this.openingOverlay.listen(feng.events.EventType.ANIMATE_OUT, this.onOpeningOverlayAnimateOut, false, this);

  this.tutorialOverlay.activate();

  this.activateControls();
};


feng.views.View3DHud.prototype.deactivate = function() {

  this._view3d.modeController.removeAllListeners();
  this._view3dController.removeAllListeners();
  feng.tutorial.removeAllListeners();
  this._episode.removeAllListeners();
  this.openingOverlay.removeAllListeners();

  this.dropButton.deactivate();
  this.tooltips.deactivate();
  this.tutorialOverlay.deactivate();

  this.deactivateControls();
};


feng.views.View3DHud.prototype.activateControls = function() {

  this.homeButton.activate();
  this.compass.activate();
  this.book.activate();
  this.reminder.activate();
  this.progressBar.activate();

  feng.mainOptions.showHelpButton( true );
};


feng.views.View3DHud.prototype.deactivateControls = function() {

  this.homeButton.deactivate();
  this.compass.deactivate();
  this.book.deactivate();
  this.reminder.deactivate();
  this.progressBar.deactivate();

  feng.mainOptions.showHelpButton( false );
};


feng.views.View3DHud.prototype.getCaption = function( object, controls, type ) {

	var key = goog.getUid(object) + '-' + type;

	if(this._captions[key]) {
		return this._captions[key];
	}

  var captionClass = feng.views.sections.captions.Caption;;

  // get the caption if specified by object
  switch(object.captionClass) {
    case 'changecolor':
    captionClass = feng.views.sections.captions.ChangeColorCaption;
    break;

    case 'dropfruits':
    captionClass = feng.views.sections.captions.DropFruitsCaption;
    break;

    default:
    break;
  }
  
  var cameraController = this._view3d.cameraController;
  var viewSize = this._view3d.viewSize;

	var caption = new captionClass( object, cameraController, viewSize, controls, this );
	this._captions[ key ] = caption;

	goog.dom.appendChild( this._captionsEl, caption.domElement );

	return caption;
};


feng.views.View3DHud.prototype.showControls = function( shouldShow ) {

  goog.dom.classes.enable( this._controlsEl, 'hidden', !shouldShow );
};


feng.views.View3DHud.prototype.onModeChange = function( e ) {

  var mode = e.nextMode || e.mode;
  var shouldShowControls = true;

  switch(mode) {

    case feng.controllers.view3d.ModeController.Mode.ENTRY:
    case feng.controllers.view3d.ModeController.Mode.CLOSE_UP:
    case null:
    shouldShowControls = false;
    break;
  }

  if(e.gateway) {
    shouldShowControls = false;
  }

  feng.mainOptions.showHelpButton( shouldShowControls );

  this.showControls( shouldShowControls );
};


feng.views.View3DHud.prototype.onShowView3D = function( e ) {

  var view3d = e.target;

  this.setView3D( view3d );
};


feng.views.View3DHud.prototype.onAnimatedInView3D = function( e ) {
 
  var view3d = e.target;
  var viewId = view3d.id;
  var sectionId = view3d.sectionId;
 
  this.openingOverlay.updateContent( sectionId, viewId );
  this.openingOverlay.animateIn();
};


feng.views.View3DHud.prototype.onOpeningOverlayAnimateIn = function( e ) {
 
  this.deactivateControls();
  this.showControls( false );
};


feng.views.View3DHud.prototype.onOpeningOverlayAnimateOut = function( e ) {
 
  this.activateControls();
  this.showControls( true );
};