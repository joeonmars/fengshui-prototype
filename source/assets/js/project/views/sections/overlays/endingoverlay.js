goog.provide('feng.views.sections.overlays.EndingOverlay');

goog.require('goog.dom');
goog.require('goog.style');
goog.require('feng.views.Overlay');
goog.require('feng.views.popups.Popup');
goog.require('feng.models.Preload');
goog.require('feng.utils.Utils');


/**
 * @constructor
 */
feng.views.sections.overlays.EndingOverlay = function(domElement){

	var canHalt = true;

  goog.base(this, domElement, canHalt);

  var popupEl = goog.dom.getElementByClass('popup', this.domElement);
  this._popup = new feng.views.popups.Popup( popupEl );

  this._stayButton = goog.dom.getElementByClass('stay', popupEl);
  this._nextButton = goog.dom.getElementByClass('next', popupEl);

	this._sectionId = null;
  this._shownOnce = {};

  this._character = '';

  this._enterKeyId = null;
	this._escKeyId = null;
	this._onClickNext = goog.bind( this.onClickNext, this );
	this._onClickStay = goog.bind( this.onClickStay, this );

  this._preload = feng.models.Preload.getInstance();
};
goog.inherits(feng.views.sections.overlays.EndingOverlay, feng.views.Overlay);
goog.addSingletonGetter(feng.views.sections.overlays.EndingOverlay);


feng.views.sections.overlays.EndingOverlay.prototype.activate = function(){

	goog.base(this, 'activate');

	this._eventHandler.listenOnce( this._stayButton, 'click', this.onClickStay, false, this );
	this._eventHandler.listenOnce( this._nextButton, 'click', this.onClickNext, false, this );
	this._eventHandler.listenOnce( this._popup, feng.events.EventType.ANIMATE_OUT, this.animateOut, false, this );

	this._enterKeyId = feng.keyboardController.bind( this._onClickNext, feng.keyboardController.key.ENTER, true );
	this._escKeyId = feng.keyboardController.bind( this._onClickStay, feng.keyboardController.key.ESC, true );
};


feng.views.sections.overlays.EndingOverlay.prototype.deactivate = function(){

	goog.base(this, 'deactivate');

	feng.keyboardController.unbind( this._enterKeyId );
	feng.keyboardController.unbind( this._escKeyId );
};


feng.views.sections.overlays.EndingOverlay.prototype.updateContent = function( sectionId ){

	this._sectionId = sectionId;

	var copy = this._preload.getAsset('global.fengshui-data')['dialog']['ending'][sectionId];

	var character = copy['character'];
	var title = copy['title'];
	var paragraph = copy['paragraph'];

	var titleEl = goog.dom.query('h1', this.domElement)[0];
	var paragraphEl = goog.dom.query('p', this.domElement)[0];
	var characterEl = goog.dom.getElementByClass('character', this.domElement);

	titleEl.innerHTML = title;
	paragraphEl.innerHTML = paragraph;

	goog.dom.classlist.addRemove( characterEl, this._character, character );
	this._character = character;
};


feng.views.sections.overlays.EndingOverlay.prototype.animateIn = function(){

	if( !this._shownOnce[this._sectionId] ) {

		this._shownOnce[this._sectionId] = true;

	}else {

		return false;
	}

	goog.base(this, 'animateIn');

	TweenMax.fromTo(this.domElement, .8, {
		'opacity': 0
	}, {
		'opacity': 1,
		'ease': Strong.easeInOut
	});

	this._popup.animateIn();
};


feng.views.sections.overlays.EndingOverlay.prototype.animateOut = function(){

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


feng.views.sections.overlays.EndingOverlay.prototype.onClickStay = function(e){

	this._popup.animateOut();
};


feng.views.sections.overlays.EndingOverlay.prototype.onClickNext = function(e){

	this._popup.animateOut();
};


feng.views.sections.overlays.EndingOverlay.prototype.onResize = function(e){

	goog.base(this, 'onResize', e);

	goog.style.setSize(this.domElement, feng.viewportSize);

	feng.utils.Utils.centerAlign( this._popup.domElement, feng.viewportSize );
};