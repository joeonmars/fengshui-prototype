goog.provide('feng.views.sections.Home');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('feng.events');
goog.require('feng.views.Preloader');
goog.require('feng.views.sections.Section');


/**
 * @constructor
 */
feng.views.sections.Home = function(){

	var domElement = goog.dom.getElement('home');
  goog.base(this, domElement);

  this._preloaderDom = goog.dom.query('.preloader', this.domElement)[0];
  this._preloader = new feng.views.Preloader( this._preloaderDom );
  this._preloader.setParentEventTarget(this);
};
goog.inherits(feng.views.sections.Home, feng.views.sections.Section);


feng.views.sections.Home.prototype.init = function(){

	goog.base(this, 'init');
};


feng.views.sections.Home.prototype.activate = function(){

	goog.base(this, 'activate');

	this._eventHandler.listen(this, feng.events.EventType.START, this.onLoadStart, false, this);
	this._eventHandler.listen(this, feng.events.EventType.PROGRESS, this.onLoadProgress, false, this);
	this._eventHandler.listen(this, feng.events.EventType.LOAD_COMPLETE, this.onLoadComplete, false, this);
	this._eventHandler.listen(this, feng.events.EventType.COMPLETE, this.onPreloaderComplete, false, this);
};


feng.views.sections.Home.prototype.onAnimatedIn = function(e){

	goog.base(this, 'onAnimatedIn', e);

	var shouldLoad = this._preloader.load( ['home', 'avatar'] );
	if(!shouldLoad) {

	}
};


feng.views.sections.Home.prototype.onLoadStart = function(e){


};


feng.views.sections.Home.prototype.onLoadProgress = function(e){

	//console.log(e.progress);
	var fillDom = goog.dom.query('.fill', this._preloaderDom)[0];
	goog.style.setStyle( fillDom, 'width', e.progress * 100 + '%' );
};


feng.views.sections.Home.prototype.onLoadComplete = function(e){

};


feng.views.sections.Home.prototype.onPreloaderComplete = function(e){

	this._eventHandler.unlisten(this, feng.events.EventType.START, this.onLoadStart, false, this);
	this._eventHandler.unlisten(this, feng.events.EventType.PROGRESS, this.onLoadProgress, false, this);
	this._eventHandler.unlisten(this, feng.events.EventType.LOAD_COMPLETE, this.onLoadComplete, false, this);
	this._eventHandler.unlisten(this, feng.events.EventType.COMPLETE, this.onLoadComplete, false, this);

	var navigationController = feng.controllers.NavigationController.getInstance();
	navigationController.setToken('studio');
};