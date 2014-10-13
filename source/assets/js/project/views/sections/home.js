goog.provide('feng.views.sections.Home');

goog.require('goog.dom');
goog.require('goog.events.EventTarget');
goog.require('feng.events');
goog.require('feng.views.sections.Section');
goog.require('feng.models.achievements.Achievements');
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

  var preloadScreenEl = goog.dom.getElement('main-preloader');
  this._preloadScreen = new feng.views.sections.home.PreloadScreen( preloadScreenEl );

  var introEl = goog.dom.getElement('main-intro');
  this._introScreen = new feng.views.sections.home.IntroScreen( introEl );
  this._introScreen.hide();

  var episodeScreenEl = goog.dom.getElement('main-episode-selection');
  this._episodeScreen = new feng.views.sections.home.EpisodeScreen( episodeScreenEl );
  this._episodeScreen.hide();

  this._hasLoadedOnce = false;
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
	this._eventHandler.listen( this._episodeScreen, feng.events.EventType.COMPLETE, this.onEpisodeLoadComplete, false, this );
};


feng.views.sections.Home.prototype.deactivate = function(){

	goog.base(this, 'deactivate');

	this._preloadScreen.deactivate();
	this._introScreen.deactivate();
	this._episodeScreen.deactivate();
};


feng.views.sections.Home.prototype.load = function(){

	this._assetKeys = [this.id, 'accessories', 'global'];
	
	goog.base(this, 'load');
};


feng.views.sections.Home.prototype.onAnimatedIn = function(e){

	goog.base(this, 'onAnimatedIn', e);
};


feng.views.sections.Home.prototype.onScreenClose = function(e){

	switch( e.target ) {
		case this._preloadScreen:
		this._preloadScreen.animateOut();

		// for test tip
		var testTipPattern = feng.controllers.NavigationController.Token.TEST_TIP;

		if(feng.initialToken.length === 4 && goog.string.startsWith(testTipPattern.replace('#/', ''), feng.initialToken[0])) {

			var sectionId = feng.initialToken[1];
			var viewId = feng.initialToken[2];
			var tipId = feng.initialToken[3];

			var testTipToken = testTipPattern.replace('{sectionId}', sectionId).replace('{viewId}', viewId).replace('{tipId}', tipId);

			console.log('parsed test tip token: ' + testTipToken);

			this._episodeScreen.animateIn();
			feng.episodeSelection.activate();

			feng.navigationController.setToken( feng.controllers.NavigationController.Token.STUDIO );
		}
		// animate in intro
		else {

			this._introScreen.animateIn();
		}
		break;

		case this._introScreen:
		this._introScreen.animateOut();
		this._episodeScreen.animateIn();
		break;

		case this._episodeScreen:
		this._episodeScreen.animateOut();
		this._introScreen.animateIn();
		break;
	}
};


feng.views.sections.Home.prototype.onLoadStart = function(e){

	goog.base(this, 'onLoadStart', e);

	this.animateIn();
};


feng.views.sections.Home.prototype.onLoadProgress = function(e){

	goog.base(this, 'onLoadProgress', e);

	this._preloadScreen.setProgress( e.progress );
};


feng.views.sections.Home.prototype.onLoadComplete = function(e){

	goog.base(this, 'onLoadComplete', e);

	if(!this._hasLoadedOnce) {

		// init main modules with loaded fengshui data
		var globalAssets = e.target.model.getAsset('global');
		var fsData = globalAssets['fengshui-data'];
		var tipsData = fsData['tips'];

		var achievements = feng.models.achievements.Achievements.getInstance();
		achievements.init( tipsData );

		var sectionController = feng.controllers.SectionController.getInstance();
		sectionController.init();

		var book = feng.views.book.Book.getInstance();

		feng.pubsub.publish( feng.PubSub.Topic.MAIN_LOAD_COMPLETE, globalAssets );

	}else {

		this._episodeScreen.reset();
	}

	//
	this._hasLoadedOnce = true;
};


feng.views.sections.Home.prototype.onLoadAnimationComplete = function(e){

	goog.base(this, 'onLoadAnimationComplete', e);

	this._preloadScreen.onLoadAnimationComplete();
};


feng.views.sections.Home.prototype.onEpisodeLoadComplete = function(e){

	this.animateOut();
};