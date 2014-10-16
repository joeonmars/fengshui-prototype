goog.provide('feng.views.sections.overlays.OpeningOverlay');

goog.require('goog.dom');
goog.require('goog.style');
goog.require('feng.views.Overlay');
goog.require('feng.views.popups.Popup');
goog.require('feng.models.Preload');
goog.require('feng.utils.Utils');


/**
 * @constructor
 */
feng.views.sections.overlays.OpeningOverlay = function(domElement){

	var canHalt = true;

  goog.base(this, domElement, canHalt);

  var popupEl = goog.dom.getElementByClass('popup', this.domElement);
  this._popup = new feng.views.popups.Popup( popupEl );

  this._okButton = goog.dom.getElementByClass('ok', popupEl);

  this._character = '';

  this._sectionId = null;
  this._viewId = null;
  this._shownOnce = {};

  this._enterKeyId = null;
	this._escKeyId = null;
	this._onClickOK = goog.bind( this.onClickOK, this );

  this._preload = feng.models.Preload.getInstance();
};
goog.inherits(feng.views.sections.overlays.OpeningOverlay, feng.views.Overlay);
goog.addSingletonGetter(feng.views.sections.overlays.OpeningOverlay);


feng.views.sections.overlays.OpeningOverlay.prototype.activate = function(){

	goog.base(this, 'activate');

	this._eventHandler.listenOnce( this._okButton, 'click', this.onClickOK, false, this );
	this._eventHandler.listenOnce( this._popup, feng.events.EventType.ANIMATE_OUT, this.animateOut, false, this );

	this._enterKeyId = feng.keyboardController.bind( this._onClickOK, feng.keyboardController.key.ENTER, true );
	this._escKeyId = feng.keyboardController.bind( this._onClickOK, feng.keyboardController.key.ESC, true );
};


feng.views.sections.overlays.OpeningOverlay.prototype.deactivate = function(){

	goog.base(this, 'deactivate');

	feng.keyboardController.unbind( this._enterKeyId );
	feng.keyboardController.unbind( this._escKeyId );
};


feng.views.sections.overlays.OpeningOverlay.prototype.updateContent = function( sectionId, viewId ){

	this._sectionId = sectionId;
	this._viewId = viewId;

	var copy = this._preload.getAsset('global.fengshui-data')['dialog']['opening'][sectionId][viewId];

	var character = copy['character'];
	var title = copy['title'];
	var paragraph = copy['paragraph'];

	var titleEl = goog.dom.query('h1', this.domElement)[0];
	var paragraphEl = goog.dom.query('p', this.domElement)[0];
	var characterEl = goog.dom.getElementByClass('character', this.domElement);

	titleEl.innerHTML = title;
	paragraphEl.innerHTML = paragraph;

	goog.dom.classes.addRemove( characterEl, this._character, character );
	this._character = character;
};


feng.views.sections.overlays.OpeningOverlay.prototype.animateIn = function(){

	var shouldAnimateIn;

	if( !this._shownOnce[this._sectionId] ) {

		shouldAnimateIn = true;

	}else {

		if( this._shownOnce[this._sectionId][this._viewId] !== true ) shouldAnimateIn = true;
		else shouldAnimateIn = false;
	}

	if(!shouldAnimateIn) return false;

	goog.base(this, 'animateIn');

	TweenMax.fromTo(this.domElement, .8, {
		'opacity': 0
	}, {
		'opacity': 1,
		'ease': Strong.easeInOut
	});

	this._popup.animateIn();

	this._shownOnce[this._sectionId] = this._shownOnce[this._sectionId] || {};
	this._shownOnce[this._sectionId][this._viewId] = true;
};


feng.views.sections.overlays.OpeningOverlay.prototype.animateOut = function(){

	this.dispatchEvent( feng.events.EventType.ANIMATE_OUT );

	TweenMax.to(this.domElement, .8, {
		'delay': .25,
		'opacity': 0,
		'ease': Strong.easeInOut,
		'onComplete': this.hide,
		'onCompleteParams': [ true ],
		'onCompleteScope': this
	});
};


feng.views.sections.overlays.OpeningOverlay.prototype.onClickOK = function(e){

	this._popup.animateOut();
};


feng.views.sections.overlays.OpeningOverlay.prototype.onResize = function(e){

	goog.base(this, 'onResize', e);

	var viewportSize = goog.dom.getViewportSize();

	goog.style.setSize(this.domElement, viewportSize);

	feng.utils.Utils.centerAlign( this._popup.domElement, viewportSize );
};