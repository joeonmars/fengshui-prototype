goog.provide('feng.views.sections.Home');

goog.require('goog.dom');
goog.require('goog.events.EventTarget');
goog.require('feng.events');
goog.require('feng.views.sections.Section');
goog.require('feng.models.achievements.Achievements');
goog.require('feng.controllers.SectionController');
goog.require('feng.views.book.Book');
goog.require('feng.views.sections.home.PreloadScreen');
goog.require('feng.views.sections.home.IntroScreen');
goog.require('feng.views.sections.home.EpisodeScreen');


/**
 * @constructor
 */
feng.views.sections.Home = function(){

	var domElement = goog.dom.getElement('home');
  goog.base(this, domElement);

  this.assetKeys = [this.id, 'accessories', 'global'];

  var preloadScreenEl = goog.dom.getElement('main-preloader');
  this._preloadScreen = new feng.views.sections.home.PreloadScreen( preloadScreenEl );

  var introEl = goog.dom.getElement('main-intro');
  this._introScreen = new feng.views.sections.home.IntroScreen( introEl );
  this._introScreen.hide();

  var episodeScreenEl = goog.dom.getElement('main-episode-selection');
  this._episodeScreen = new feng.views.sections.home.EpisodeScreen( episodeScreenEl );
  this._episodeScreen.hide();
};
goog.inherits(feng.views.sections.Home, feng.views.sections.Section);


feng.views.sections.Home.prototype.init = function(){

	goog.base(this, 'init');
};


feng.views.sections.Home.prototype.activate = function(){

	goog.base(this, 'activate');

	this._eventHandler.listen( this._preloadScreen, feng.events.EventType.CLOSE, this.onScreenClose, false, this );
	this._eventHandler.listen( this._introScreen, feng.events.EventType.CLOSE, this.onScreenClose, false, this );
	this._eventHandler.listen( this._episodeScreen, feng.events.EventType.CLOSE, this.onScreenClose, false, this );
};


feng.views.sections.Home.prototype.onAnimatedIn = function(e){

	goog.base(this, 'onAnimatedIn', e);
};


feng.views.sections.Home.prototype.onScreenClose = function(e){

	switch( e.target ) {
		case this._preloadScreen:

		break;

		case this._introScreen:
		this._introScreen.animateOut();
		this._episodeScreen.animateIn();
		break;

		case this._episodeScreen:

		break;
	}
};


feng.views.sections.Home.prototype.onLoadStart = function(e){


};


feng.views.sections.Home.prototype.onLoadProgress = function(e){

	goog.base(this, 'onLoadProgress', e);

	this._preloadScreen.setProgress( e.progress );
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

	this._introScreen.animateIn();
	this._preloadScreen.animateOut();

	//var navigationController = feng.controllers.NavigationController.getInstance();
	//navigationController.setToken('studio');
};