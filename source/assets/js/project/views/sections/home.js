goog.provide('feng.views.sections.Home');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('feng.events');
goog.require('feng.views.sections.Section');


/**
 * @constructor
 */
feng.views.sections.Home = function(){

	var domElement = goog.dom.getElement('home');
  goog.base(this, domElement);
};
goog.inherits(feng.views.sections.Home, feng.views.sections.Section);


feng.views.sections.Home.prototype.init = function(){

	goog.base(this, 'init');
};


feng.views.sections.Home.prototype.activate = function(){

	goog.base(this, 'activate');
};


feng.views.sections.Home.prototype.onAnimatedIn = function(e){

	goog.base(this, 'onAnimatedIn', e);
};


feng.views.sections.Home.prototype.onLoadStart = function(e){


};


feng.views.sections.Home.prototype.onLoadProgress = function(e){

	goog.base(this, 'onLoadProgress', e);

	var fillDom = goog.dom.query('.fill', this._preloaderDom)[0];
	goog.style.setStyle( fillDom, 'width', e.progress * 100 + '%' );
};


feng.views.sections.Home.prototype.onLoadComplete = function(e){

};


feng.views.sections.Home.prototype.onPreloaderComplete = function(e){

	goog.base(this, 'onPreloaderComplete', e);
	
	var navigationController = feng.controllers.NavigationController.getInstance();
	navigationController.setToken('studio');
};