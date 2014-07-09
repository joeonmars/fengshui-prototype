goog.provide('feng.views.sections.home.Screen');

goog.require('goog.dom');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');


/**
 * @constructor
 */
feng.views.sections.home.Screen = function(domElement){

	goog.base( this );

  this.domElement = domElement;

  this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.views.sections.home.Screen, goog.events.EventTarget);


feng.views.sections.home.Screen.prototype.activate = function() {


};


feng.views.sections.home.Screen.prototype.deactivate = function() {

	
};


feng.views.sections.home.Screen.prototype.show = function() {

	TweenMax.set(this.domElement, {
		'display': 'block'
	});
};


feng.views.sections.home.Screen.prototype.hide = function() {

	TweenMax.set(this.domElement, {
		'display': 'none'
	});
};


feng.views.sections.home.Screen.prototype.animateIn = function() {

	this.show();
};


feng.views.sections.home.Screen.prototype.animateOut = function() {

	this.deactivate();
};