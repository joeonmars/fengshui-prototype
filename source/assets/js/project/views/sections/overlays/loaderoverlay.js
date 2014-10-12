goog.provide('feng.views.sections.overlays.LoaderOverlay');

goog.require('goog.dom');
goog.require('goog.style');
goog.require('feng.models.Preload');
goog.require('feng.views.Overlay');
goog.require('feng.fx.CanvasSprite');


/**
 * @constructor
 */
feng.views.sections.overlays.LoaderOverlay = function(domElement){

  this._loaderEl = goog.dom.getElementByClass('loader', domElement);
  this._spinnerEl = goog.dom.getElementByClass('spinner', domElement);
  this._progressEl = goog.dom.getElementByClass('progress', domElement);

  var preload = feng.models.Preload.getInstance();
  var img = preload.getAsset( 'global.spinner' );
	var data = preload.getAsset( 'global.spinner-data' );
  this._spinner = new feng.fx.CanvasSprite( img, data, this._spinnerEl );

  this._spinnerTweener = this._spinner.getTweener();

  var canHalt = true;

  goog.base(this, domElement, canHalt);
};
goog.inherits(feng.views.sections.overlays.LoaderOverlay, feng.views.Overlay);
goog.addSingletonGetter(feng.views.sections.overlays.LoaderOverlay);


feng.views.sections.overlays.LoaderOverlay.prototype.animateIn = function(){

	goog.base(this, 'animateIn');

	TweenMax.fromTo(this.domElement, .8, {
		'opacity': 0
	}, {
		'opacity': 1,
		'ease': Strong.easeInOut
	});

	TweenMax.fromTo(this._loaderEl, .8, {
		'opacity': 0
	}, {
		'delay': .8,
		'opacity': 1
	});

	this._spinnerTweener.restart();
};


feng.views.sections.overlays.LoaderOverlay.prototype.animateOut = function(){

	this.dispatchEvent( feng.events.EventType.ANIMATE_OUT );

	TweenMax.to(this.domElement, .8, {
		'opacity': 0,
		'ease': Strong.easeInOut,
		'onComplete': this.hide,
		'onCompleteParams': [ true ],
		'onCompleteScope': this
	});
};


feng.views.sections.overlays.LoaderOverlay.prototype.hide = function( shouldDispatch ){

	goog.base(this, 'hide', shouldDispatch);

	this._spinnerTweener.pause();
};


feng.views.sections.overlays.LoaderOverlay.prototype.onLoadStart = function(e){

	this.animateIn();
};


feng.views.sections.overlays.LoaderOverlay.prototype.onLoadProgress = function(e){

	var numStr = Math.round(e.progress * 100).toString();
	this._progressEl.innerHTML = (numStr.length > 1) ? numStr : ('0' + numStr);
};


feng.views.sections.overlays.LoaderOverlay.prototype.onLoadComplete = function(e){

	this.animateOut();
};


feng.views.sections.overlays.LoaderOverlay.prototype.onResize = function(e){

	goog.base(this, 'onResize', e);

	goog.style.setSize(this.domElement, goog.dom.getViewportSize());
};