goog.provide('fengshui.views.sections.Home');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('fengshui.events');
goog.require('fengshui.views.Preloader');
goog.require('fengshui.views.sections.Section');


/**
 * @constructor
 */
fengshui.views.sections.Home = function(){

	var domElement = goog.dom.getElement('home');
  goog.base(this, domElement);

  this._preloaderDom = goog.dom.query('.preloader', this.domElement)[0];
  this._preloader = new fengshui.views.Preloader( this._preloaderDom );
  this._preloader.setParentEventTarget(this);

};
goog.inherits(fengshui.views.sections.Home, fengshui.views.sections.Section);


fengshui.views.sections.Home.prototype.init = function(){

	goog.base(this, 'init');
};


fengshui.views.sections.Home.prototype.activate = function(){

	goog.base(this, 'activate');

	this._eventHandler.listen(this, fengshui.events.EventType.START, this.onLoadStart, false, this);
	this._eventHandler.listen(this, fengshui.events.EventType.PROGRESS, this.onLoadProgress, false, this);
	this._eventHandler.listen(this, fengshui.events.EventType.LOAD_COMPLETE, this.onLoadComplete, false, this);
	this._eventHandler.listen(this, fengshui.events.EventType.COMPLETE, this.onPreloaderComplete, false, this);
};


fengshui.views.sections.Home.prototype.onAnimatedIn = function(e){

	goog.base(this, 'onAnimatedIn', e);

	var shouldLoad = this._preloader.load( ['home', 'avatar'] );
	if(!shouldLoad) {

	}
};


fengshui.views.sections.Home.prototype.onLoadStart = function(e){


};


fengshui.views.sections.Home.prototype.onLoadProgress = function(e){

	console.log(e.progress);
};


fengshui.views.sections.Home.prototype.onLoadComplete = function(e){

};


fengshui.views.sections.Home.prototype.onPreloaderComplete = function(e){

	this._eventHandler.unlisten(this, fengshui.events.EventType.START, this.onLoadStart, false, this);
	this._eventHandler.unlisten(this, fengshui.events.EventType.PROGRESS, this.onLoadProgress, false, this);
	this._eventHandler.unlisten(this, fengshui.events.EventType.LOAD_COMPLETE, this.onLoadComplete, false, this);
	this._eventHandler.unlisten(this, fengshui.events.EventType.COMPLETE, this.onLoadComplete, false, this);
};