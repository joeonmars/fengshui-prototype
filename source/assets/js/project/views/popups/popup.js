goog.provide('feng.views.popups.Popup');

goog.require('goog.dom');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');


/**
 * @constructor
 */
feng.views.popups.Popup = function(domElement){

	goog.base( this );

  this.domElement = domElement;

  this._closeButton = goog.dom.getElementByClass('close-button', this.domElement);

  this._isShown = false;

  this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.views.popups.Popup, goog.events.EventTarget);


feng.views.popups.Popup.prototype.activate = function() {

	this._eventHandler.listen(this._closeButton, 'click', this.animateOut, false, this);
	this._eventHandler.listen(document, 'click', this.onClickDocument, false, this);
};


feng.views.popups.Popup.prototype.deactivate = function() {

	this._eventHandler.removeAll();
};


feng.views.popups.Popup.prototype.toggle = function() {

	if(!this._isShown) this.animateIn();
	else this.animateOut();
};


feng.views.popups.Popup.prototype.showCloseButton = function() {

	goog.style.showElement(this._closeButton, true);
};


feng.views.popups.Popup.prototype.hideCloseButton = function() {

	goog.style.showElement(this._closeButton, false);
};


feng.views.popups.Popup.prototype.animateIn = function() {

	this._isShown = true;

	TweenMax.set(this.domElement, {
		'display': 'block',
		'opacity': 0,
		'y': 50
	});

	TweenMax.to(this.domElement, .65, {
		'opacity': 1,
		'y': 0,
		'ease': Strong.easeInOut,
		'clearProps': 'all',
		'onComplete': this.activate,
		'onCompleteScope': this
	});

	this.dispatchEvent( feng.events.EventType.ANIMATE_IN );
};


feng.views.popups.Popup.prototype.animateOut = function() {

	this.deactivate();

	TweenMax.to(this.domElement, .65, {
		'display': 'none',
		'opacity': 0,
		'y': 50,
		'ease': Strong.easeInOut,
		'onComplete': function() {
			this._isShown = false;
			this.dispatchEvent( feng.events.EventType.CLOSE );
		},
		'onCompleteScope': this
	});

	this.dispatchEvent( feng.events.EventType.ANIMATE_OUT );
};


feng.views.popups.Popup.prototype.onClickDocument = function(e) {

	
};