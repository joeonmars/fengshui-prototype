goog.provide('feng.views.View3DHud');

goog.require('feng.views.sections.controls.ObjectSelector');
goog.require('feng.views.sections.controls.DropButton');
goog.require('feng.views.sections.controls.Compass');
goog.require('feng.views.sections.controls.Book');
goog.require('feng.views.sections.controls.Reminder');
goog.require('feng.views.sections.controls.ProgressBar');
goog.require('feng.views.sections.controls.Tooltips');
goog.require('feng.views.sections.captions.AdviceCaption');
goog.require('feng.views.sections.captions.ChangeColorCaption');
goog.require('feng.views.sections.captions.ChangeObjectCaption');
goog.require('feng.views.sections.captions.ChangePictureCaption');
goog.require('feng.views.sections.captions.FruitsCaption');
goog.require('feng.views.sections.captions.ArrangeClosetCaption');
goog.require('feng.views.sections.overlays.TutorialOverlay');
goog.require('feng.views.sections.overlays.OpeningOverlay');
goog.require('feng.views.sections.overlays.EndingOverlay');
goog.require('feng.views.sections.overlays.FinaleOverlay');


/**
 * @constructor
 */
feng.views.View3DHud = function( hudEl, view3dController, tips ){

  goog.base(this);

  this.domElement = hudEl;
  this._captionContainerEl = goog.dom.getElementByClass('captions', this.domElement);

  this._view3d = null;
  this._view3dController = view3dController;

  // create a captions collection
  this._captions = {};

  // create overlays
  var tutorialOverlayEl = goog.dom.getElementByClass('tutorial-overlay', this.domElement);
  this.tutorialOverlay = new feng.views.sections.overlays.TutorialOverlay( tutorialOverlayEl );

  var openingOverlayEl = goog.dom.getElementByClass('opening-overlay', this.domElement);
  this.openingOverlay = new feng.views.sections.overlays.OpeningOverlay( openingOverlayEl );

  var endingOverlayEl = goog.dom.getElementByClass('ending-overlay', this.domElement);
  this.endingOverlay = new feng.views.sections.overlays.EndingOverlay( endingOverlayEl );

  var finaleOverlayEl = goog.dom.getElementByClass('finale-overlay', this.domElement);
  this.finaleOverlay = new feng.views.sections.overlays.FinaleOverlay( finaleOverlayEl );

  // create controls
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

  var objectSelectorEl = goog.dom.getElementByClass('objectSelector', this.domElement);
  this.objectSelector = new feng.views.sections.controls.ObjectSelector( objectSelectorEl );

  var dropButtonEl = goog.dom.getElementByClass('dropButton', this.domElement);
  this.dropButton = new feng.views.sections.controls.DropButton( dropButtonEl );

  // create design captions
  var tooltipsEl = goog.dom.getElementByClass('tooltips', this.domElement);
  this.tooltips = new feng.views.sections.controls.Tooltips( tooltipsEl );
};
goog.inherits(feng.views.View3DHud, goog.events.EventTarget);


feng.views.View3DHud.prototype.init = function() {

  this.reminder.init();
};


feng.views.View3DHud.prototype.setView3D = function( view3d ) {

  this._view3d = view3d;

  this.compass.setView3D( view3d );
  this.book.setView3D( view3d );
  this.reminder.setView3D( view3d );
  this.progressBar.setView3D( view3d );
  this.objectSelector.setView3D( view3d );
  this.dropButton.setView3D( view3d );
  this.tooltips.setView3D( view3d );

  this._view3d.modeController.listen(feng.events.EventType.UPDATE, this.onUpdateView3D, false, this);
};


feng.views.View3DHud.prototype.activate = function() {

  if(this._view3d) {
    this._view3d.modeController.listen(feng.events.EventType.UPDATE, this.onUpdateView3D, false, this);
  }

  this._view3dController.listen(feng.events.EventType.SHOW, this.onShowView3D, false, this);
  this._view3dController.listen(feng.events.EventType.ANIMATED_IN, this.onAnimatedInView3D, false, this);

  feng.tutorial.listen(feng.events.EventType.ANIMATE_IN, this.tutorialOverlay.animateIn, false, this.tutorialOverlay);
  feng.tutorial.listen(feng.events.EventType.ANIMATE_OUT, this.tutorialOverlay.animateOut, false, this.tutorialOverlay);

  this.compass.activate();
  this.book.activate();
  this.reminder.activate();
  this.progressBar.activate();
  this.tutorialOverlay.activate();
};


feng.views.View3DHud.prototype.deactivate = function() {

  if(this._view3d) {
    this._view3d.modeController.unlisten(feng.events.EventType.UPDATE, this.onUpdateView3D, false, this);
  }

  this._view3dController.unlisten(feng.events.EventType.SHOW, this.onShowView3D, false, this);
  this._view3dController.unlisten(feng.events.EventType.ANIMATED_IN, this.onAnimatedInView3D, false, this);

  feng.tutorial.unlisten(feng.events.EventType.ANIMATE_IN, this.tutorialOverlay.animateIn, false, this.tutorialOverlay);
  feng.tutorial.unlisten(feng.events.EventType.ANIMATE_OUT, this.tutorialOverlay.animateOut, false, this.tutorialOverlay);

  this.compass.deactivate();
  this.book.deactivate();
  this.reminder.deactivate();
  this.progressBar.deactivate();
  this.dropButton.deactivate();
  this.tooltips.deactivate();
  this.tutorialOverlay.deactivate();
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
  var interaction = feng.views.view3dobject.InteractiveObject.Interaction;

  // get the caption if specified by object
  switch(object.captionClass) {
    case 'fruits':
    captionClass = feng.views.sections.captions.FruitsCaption;
    break;

    case 'arrangecloset':
    captionClass = feng.views.sections.captions.ArrangeClosetCaption;
    break;

    default:
    break;
  }

  // get the caption by its interaction type
  if(!captionClass) {

    switch(type) {
      case interaction.ADVICE:
      captionClass = feng.views.sections.captions.AdviceCaption;
      break;

      case interaction.DROP:
      captionClass = feng.views.sections.captions.ChangeColorCaption;
      break;

      case interaction.CHANGE_COLOR:
      captionClass = feng.views.sections.captions.ChangeColorCaption;
      break;

      case interaction.CHANGE_OBJECT:
      captionClass = feng.views.sections.captions.ChangeObjectCaption;
      break;

      case interaction.CHANGE_PICTURE:
      captionClass = feng.views.sections.captions.ChangePictureCaption;
      break;
    }
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


feng.views.View3DHud.prototype.onAnimatedInView3D = function( e ) {

  var view3d = e.target;
  var viewId = view3d.id;
  var sectionId = view3d.sectionId;

  this.openingOverlay.updateContent( sectionId, viewId );
  this.openingOverlay.animateIn();
};


feng.views.View3DHud.prototype.onUpdateView3D = function( e ) {

  this.compass.setRotation( e.rotationY );
};