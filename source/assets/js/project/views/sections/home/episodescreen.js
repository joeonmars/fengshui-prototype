goog.provide('feng.views.sections.home.EpisodeScreen');

goog.require('feng.views.sections.home.Screen');
goog.require('feng.views.EpisodeSelection');


/**
 * @constructor
 */
feng.views.sections.home.EpisodeScreen = function(domElement){

	goog.base(this, domElement);

	var episodeSelectionEl = goog.dom.getElementByClass( 'episode-selection', this.domElement );
	this._episodeSelection = new feng.views.EpisodeSelection( episodeSelectionEl );
};
goog.inherits(feng.views.sections.home.EpisodeScreen, feng.views.sections.home.Screen);


feng.views.sections.home.EpisodeScreen.prototype.activate = function() {

	goog.base(this, 'activate');

	this._eventHandler.listen( this._episodeSelection, feng.events.EventType.COMPLETE, this.onLoadComplete, false, this );
};


feng.views.sections.home.EpisodeScreen.prototype.deactivate = function() {

	goog.base(this, 'deactivate');

	this._episodeSelection.deactivate();
};



feng.views.sections.home.EpisodeScreen.prototype.animateIn = function() {

	goog.base(this, 'animateIn');

	this.activate();

	this._episodeSelection.animateIn();
};


feng.views.sections.home.EpisodeScreen.prototype.animateOut = function() {

	goog.base(this, 'animateOut');

	this.deactivate();

	this._episodeSelection.animateOut();
};


feng.views.sections.home.EpisodeScreen.prototype.onLoadComplete = function(e) {

	this.dispatchEvent( e );
};