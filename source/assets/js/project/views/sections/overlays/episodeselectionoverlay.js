goog.provide('feng.views.sections.overlays.EpisodeSelectionOverlay');

goog.require('goog.math.Box');
goog.require('feng.views.sections.overlays.Overlay');
goog.require('feng.views.EpisodeSelection');


/**
 * @constructor
 */
feng.views.sections.overlays.EpisodeSelectionOverlay = function(domElement){
	
	var canHalt = true;

  goog.base(this, domElement, canHalt);

	var episodeSelectionEl = goog.dom.getElementByClass( 'episode-selection', this.domElement );
	this._episodeSelection = new feng.views.EpisodeSelection( episodeSelectionEl );

  this._size = null;
  this._clipRect = new goog.math.Box();
};
goog.inherits(feng.views.sections.overlays.EpisodeSelectionOverlay, feng.views.sections.overlays.Overlay);


feng.views.sections.overlays.EpisodeSelectionOverlay.prototype.activate = function(){

	goog.base(this, 'activate');

	goog.events.listen( this.domElement, 'click', this.onClick, false, this );
	feng.sectionController.listen( feng.events.EventType.START, this.onLoadStart, false, this );
};


feng.views.sections.overlays.EpisodeSelectionOverlay.prototype.deactivate = function(){

	goog.base(this, 'deactivate');

	goog.events.unlisten( this.domElement, 'click', this.onClick, false, this );
	feng.sectionController.unlisten( feng.events.EventType.START, this.onLoadStart, false, this );
};


feng.views.sections.overlays.EpisodeSelectionOverlay.prototype.animateIn = function(){

	goog.base(this, 'animateIn');

	TweenMax.fromTo(this.domElement, .4, {
		'opacity': 0
	}, {
		'opacity': 1,
		'ease': Power3.easeOut
	});

	var midY = this._clipRect.top + (this._clipRect.bottom - this._clipRect.top) / 2;

	TweenMax.fromTo(this._episodeSelection.domElement, 1.2, {
		'opacity': 0,
		'scale': .5,
		'clip': 'rect(' + midY + 'px, ' + this._clipRect.right + 'px, ' + midY + 'px, ' + this._clipRect.left + 'px)'
	}, {
		'opacity': 1,
		'scale': 1,
		'clip': 'rect(' + this._clipRect.top + 'px, ' + this._clipRect.right + 'px, ' + this._clipRect.bottom + 'px, ' + this._clipRect.left + 'px)',
		'clearProps': 'opacity,scale',
		'ease': Strong.easeInOut
	});

	this._episodeSelection.reset();

	TweenMax.delayedCall(.5, this._episodeSelection.animateIn, null, this._episodeSelection);
};


feng.views.sections.overlays.EpisodeSelectionOverlay.prototype.animateOut = function(){

	var midY = this._clipRect.top + (this._clipRect.bottom - this._clipRect.top) / 2;

	TweenMax.to(this._episodeSelection.domElement, .6, {
		'opacity': 0,
		'clip': 'rect(' + midY + 'px, ' + this._clipRect.right + 'px, ' + midY + 'px, ' + this._clipRect.left + 'px)',
		'ease': Strong.easeInOut
	});

	TweenMax.to(this.domElement, .8, {
		'delay': .5,
		'opacity': 0,
		'ease': Power2.easeOut,
		'onComplete': this.hide,
		'onCompleteScope': this
	});

	this._episodeSelection.animateOut();
};


feng.views.sections.overlays.EpisodeSelectionOverlay.prototype.onClick = function(e){

	if(!goog.dom.contains(this._episodeSelection.domElement, e.target)) {

		goog.events.unlisten( this.domElement, 'click', this.onClick, false, this );
		this.animateOut();
	}
};


feng.views.sections.overlays.EpisodeSelectionOverlay.prototype.onLoadStart = function(e){

	TweenMax.to(this._episodeSelection.domElement, .6, {
		'clip': 'rect(' + 0 + 'px, ' + this._clipRect.right + 'px, ' + this._clipRect.bottom + 'px, ' + 0 + 'px)',
		'clearProps': 'all',
		'ease': Strong.easeInOut
	});
};


feng.views.sections.overlays.EpisodeSelectionOverlay.prototype.onResize = function(e){

	goog.base(this, 'onResize', e);

	this._size = goog.dom.getViewportSize();
	goog.style.setSize( this.domElement, this._size );

	var rectHeight = 500;
	this._clipRect.top = this._size.height / 2 - rectHeight / 2;
	this._clipRect.right = this._size.width;
	this._clipRect.bottom = this._size.height / 2 + rectHeight / 2;
	this._clipRect.left = 0;

	TweenMax.set(this._episodeSelection.domElement, {
		'clip': 'rect(' + this._clipRect.top + 'px, ' + this._clipRect.right + 'px, ' + this._clipRect.bottom + 'px, ' + this._clipRect.left + 'px)'
	});
};