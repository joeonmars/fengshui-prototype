goog.provide('feng.views.sections.Home');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('feng.events');
goog.require('feng.views.sections.Section');
goog.require('feng.models.achievements.Achievements');
goog.require('feng.controllers.SectionController');
goog.require('feng.views.book.Book');


/**
 * @constructor
 */
feng.views.sections.Home = function(){

	var domElement = goog.dom.getElement('home');
  goog.base(this, domElement);

  this.assetKeys = [this.id, 'accessories', 'global'];
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

	// init modules reply on fengshui data
	var globalAssets = e.target.model.getAsset('global');
	var fsData = globalAssets['fengshui-data'];
	var tipsData = fsData['tips'];

	var achievements = feng.models.achievements.Achievements.getInstance();
	achievements.init( tipsData );

	var sectionController = feng.controllers.SectionController.getInstance();
	sectionController.init();

	var book = feng.views.book.Book.getInstance();

	feng.pubsub.publish( feng.PubSub.Topic.MAIN_LOAD_COMPLETE, globalAssets );
};


feng.views.sections.Home.prototype.onLoadAnimationComplete = function(e){

	goog.base(this, 'onLoadAnimationComplete', e);
	
	var navigationController = feng.controllers.NavigationController.getInstance();
	navigationController.setToken('studio');
};