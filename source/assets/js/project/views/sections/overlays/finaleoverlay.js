goog.provide('feng.views.sections.overlays.FinaleOverlay');

goog.require('goog.dom');
goog.require('goog.style');
goog.require('feng.views.Overlay');
goog.require('feng.views.popups.Popup');
goog.require('feng.models.Preload');


/**
 * @constructor
 */
feng.views.sections.overlays.FinaleOverlay = function(domElement){

	var canHalt = true;

  goog.base(this, domElement, canHalt);

  var popupEl = goog.dom.getElementByClass('popup', this.domElement);
  this._popup = new feng.views.popups.Popup( popupEl );

  this._preload = feng.models.Preload.getInstance();
};
goog.inherits(feng.views.sections.overlays.FinaleOverlay, feng.views.Overlay);
goog.addSingletonGetter(feng.views.sections.overlays.FinaleOverlay);


feng.views.sections.overlays.FinaleOverlay.prototype.updateContent = function(){

	var copy = this._preload.getAsset('global.fengshui-data')['dialog']['finale'];

	var title = copy['title'];
	var paragraph = copy['paragraph'];

	var titleEl = goog.dom.query('h1', this.domElement)[0];
	var paragraphEl = goog.dom.query('p', this.domElement)[0];

	titleEl.innerHTML = title;
	paragraphEl.innerHTML = paragraph;
};


feng.views.sections.overlays.FinaleOverlay.prototype.animateIn = function(){

	goog.base(this, 'animateIn');

	TweenMax.fromTo(this.domElement, .8, {
		'opacity': 0
	}, {
		'opacity': 1,
		'ease': Strong.easeInOut
	});

	this._popup.animateIn();
};


feng.views.sections.overlays.FinaleOverlay.prototype.animateOut = function(){

	goog.base(this, 'animateOut');

	TweenMax.to(this.domElement, .8, {
		'delay': .25,
		'opacity': 0,
		'ease': Strong.easeInOut,
		'onComplete': this.hide,
		'onCompleteParams': [ true ],
		'onCompleteScope': this
	});

	this._popup.animateOut();
};


feng.views.sections.overlays.FinaleOverlay.prototype.onResize = function(e){

	goog.base(this, 'onResize', e);

	goog.style.setSize(this.domElement, goog.dom.getViewportSize());
};