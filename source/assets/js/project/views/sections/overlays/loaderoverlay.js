goog.provide('feng.views.sections.overlays.LoaderOverlay');

goog.require('goog.dom');
goog.require('goog.style');
goog.require('feng.views.Overlay');


/**
 * @constructor
 */
feng.views.sections.overlays.LoaderOverlay = function(domElement){

	var canHalt = true;

  goog.base(this, domElement, canHalt);

  this._loaderEl = goog.dom.getElementByClass('loader', this.domElement);
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
};


feng.views.sections.overlays.LoaderOverlay.prototype.animateOut = function(){

	goog.base(this, 'animateOut');

	TweenMax.to(this.domElement, .8, {
		'opacity': 0,
		'ease': Strong.easeInOut,
		'onComplete': this.hide,
		'onCompleteParams': [ true ],
		'onCompleteScope': this
	});
};


feng.views.sections.overlays.LoaderOverlay.prototype.onLoadStart = function(e){

	this.animateIn();
};


feng.views.sections.overlays.LoaderOverlay.prototype.onLoadProgress = function(e){

	this._loaderEl.innerHTML = Math.round(e.progress * 100) + '%';
};


feng.views.sections.overlays.LoaderOverlay.prototype.onLoadComplete = function(e){

	this.animateOut();
};


feng.views.sections.overlays.LoaderOverlay.prototype.onResize = function(e){

	goog.base(this, 'onResize', e);

	goog.style.setSize(this.domElement, goog.dom.getViewportSize());
};