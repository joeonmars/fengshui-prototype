goog.provide('feng.views.EpisodeSelectionOverlay');

goog.require('goog.dom');
goog.require('goog.math.Box');
goog.require('goog.style');
goog.require('feng.events');
goog.require('feng.views.Overlay');


/**
 * @constructor
 */
feng.views.EpisodeSelectionOverlay = function(){

	var domElement = goog.dom.getElement('episode-selection-overlay');	
	var canHalt = true;

  goog.base(this, domElement, canHalt);

	this._episodeSelection = feng.episodeSelection;

  this._size = null;
  this._clipRect = new goog.math.Box();

  this._button = goog.dom.getElement('episode-button');
  goog.events.listen(this._button, 'click', this.onClick, false, this);
};
goog.inherits(feng.views.EpisodeSelectionOverlay, feng.views.Overlay);
goog.addSingletonGetter(feng.views.EpisodeSelectionOverlay);


feng.views.EpisodeSelectionOverlay.prototype.activate = function(){

	goog.base(this, 'activate');

	this._eventHandler.listen( this.domElement, 'click', this.onClick, false, this );
	this._eventHandler.listen( this._episodeSelection, feng.events.EventType.COMPLETE, this.onComplete, false, this );
	this._eventHandler.listen( feng.sectionController, feng.events.EventType.START, this.onLoadStart, false, this );
};


feng.views.EpisodeSelectionOverlay.prototype.show = function( shouldDispatch ){

	goog.base(this, 'show', shouldDispatch);
	
	this._episodeSelection.reset();
	goog.dom.appendChild(this.domElement, this._episodeSelection.domElement);
};


feng.views.EpisodeSelectionOverlay.prototype.animateIn = function(){

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

	//
	this.dispatchEvent( feng.events.EventType.ANIMATE_IN );
};


feng.views.EpisodeSelectionOverlay.prototype.animateOut = function( episodeId ){

	this.deactivate();

	if(episodeId) {
		
		this._episodeSelection.animateOutOnComplete( episodeId );

		TweenMax.to(this.domElement, .5, {
			'opacity': 0,
			'ease': Power2.easeOut,
			'onComplete': this.hide,
			'onCompleteScope': this
		});

	}else {

		this._episodeSelection.animateOut();

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
	}

	//
	this.dispatchEvent( feng.events.EventType.ANIMATE_OUT );
};


feng.views.EpisodeSelectionOverlay.prototype.onClick = function(e){

	if(e.currentTarget === this._button) {

		if(this.isShown) {

			this.animateOut();

		}else {

			this.animateIn();
		}

		return true;
	}

	if(!goog.dom.contains(this._episodeSelection.domElement, e.target)) {

		this.animateOut();
	}
};


feng.views.EpisodeSelectionOverlay.prototype.onLoadStart = function(e){

	TweenMax.to(this._episodeSelection.domElement, .6, {
		'clip': 'rect(' + 0 + 'px, ' + this._clipRect.right + 'px, ' + this._clipRect.bottom + 'px, ' + 0 + 'px)',
		'clearProps': 'all',
		'ease': Strong.easeInOut
	});

	goog.style.showElement(this._button, false);
};


feng.views.EpisodeSelectionOverlay.prototype.onComplete = function(e){

	var episodeId = e.episode.id;

	this.animateOut( episodeId );
};


feng.views.EpisodeSelectionOverlay.prototype.onResize = function(e){

	goog.base(this, 'onResize', e);

	this._size = goog.style.getSize( this.domElement );

	var rectHeight = 500;
	this._clipRect.top = this._size.height / 2 - rectHeight / 2;
	this._clipRect.right = this._size.width;
	this._clipRect.bottom = this._size.height / 2 + rectHeight / 2;
	this._clipRect.left = 0;

	TweenMax.set(this._episodeSelection.domElement, {
		'clip': 'rect(' + this._clipRect.top + 'px, ' + this._clipRect.right + 'px, ' + this._clipRect.bottom + 'px, ' + this._clipRect.left + 'px)'
	});
};