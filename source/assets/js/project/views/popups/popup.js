goog.provide('feng.views.popups.Popup');

goog.require('goog.async.Delay');
goog.require('goog.dom');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');


/**
 * @constructor
 */
feng.views.popups.Popup = function(domElement){

	goog.base( this );

  this.domElement = domElement;

  this._isShown = false;

  this._eventHandler = new goog.events.EventHandler(this);

  this._defaultAnimateInDelay = 0;

  this._animateInDelay = new goog.async.Delay( this.doAnimateIn, this._defaultAnimateInDelay, this );

  this._onAnimatedInDelay = new goog.async.Delay( this.onAnimatedIn, 1000, this );

  this._onAnimatedOutDelay = new goog.async.Delay( this.onAnimatedOut, 250, this );
};
goog.inherits(feng.views.popups.Popup, goog.events.EventTarget);


feng.views.popups.Popup.prototype.activate = function() {

};


feng.views.popups.Popup.prototype.deactivate = function() {

	this._eventHandler.removeAll();

	this._onAnimatedInDelay.stop();
	this._onAnimatedOutDelay.stop();
};


feng.views.popups.Popup.prototype.toggle = function() {

	if(!this._isShown) this.animateIn();
	else this.animateOut();
};


feng.views.popups.Popup.prototype.animateIn = function( delay ) {

	var delay = goog.isNumber(delay) ? delay : this._defaultAnimateInDelay;
	this._animateInDelay.start( delay );

	this.dispatchEvent( feng.events.EventType.ANIMATE_IN );
};


feng.views.popups.Popup.prototype.doAnimateIn = function() {

	this._isShown = true;

	goog.dom.classlist.add( this.domElement, 'shown' );

	this._animateInDelay.stop();
	this._onAnimatedOutDelay.stop();

	this._onAnimatedInDelay.start();
};


feng.views.popups.Popup.prototype.animateOut = function() {

	this.deactivate();

	goog.dom.classlist.remove( this.domElement, 'shown' );

	feng.soundController.playSfx('close');

	this.dispatchEvent( feng.events.EventType.ANIMATE_OUT );

	this._animateInDelay.stop();
	this._onAnimatedInDelay.stop();

	this._onAnimatedOutDelay.start();
};


feng.views.popups.Popup.prototype.onAnimatedIn = function() {

	this.activate();
};


feng.views.popups.Popup.prototype.onAnimatedOut = function() {

	this._isShown = false;

	this.dispatchEvent( feng.events.EventType.CLOSE );
};