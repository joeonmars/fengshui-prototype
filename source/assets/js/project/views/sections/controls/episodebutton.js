goog.provide('feng.views.sections.controls.EpisodeButton');

goog.require('goog.dom');
goog.require('feng.fx.AnimatedSprite');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.EpisodeButton = function(domElement, episodeOverlay){
	
  goog.base(this, domElement);

  this._episodeOverlay = episodeOverlay;
};
goog.inherits(feng.views.sections.controls.EpisodeButton, feng.views.sections.controls.Controls);


feng.views.sections.controls.EpisodeButton.prototype.activate = function(){

	goog.base(this, 'activate');

	this._eventHandler.listen(this.domElement, 'click', this.onClick, false, this);
};


feng.views.sections.controls.EpisodeButton.prototype.deactivate = function(){

  goog.base(this, 'deactivate');

};


feng.views.sections.controls.EpisodeButton.prototype.onClick = function(e){

	if(this._episodeOverlay.isShown) {

		this._episodeOverlay.animateOut();

	}else {

		this._episodeOverlay.animateIn();
	}
};