goog.provide('feng.views.sections.overlays.EndingOverlay');

goog.require('goog.dom');
goog.require('goog.style');
goog.require('feng.views.Overlay');
goog.require('feng.views.popups.Popup');
goog.require('feng.models.Preload');


/**
 * @constructor
 */
feng.views.sections.overlays.EndingOverlay = function(domElement){

	var canHalt = true;

  goog.base(this, domElement, canHalt);

  var popupEl = goog.dom.getElementByClass('popup', this.domElement);
  this._popup = new feng.views.popups.Popup( domElement );

  this._character = '';

  this._preload = feng.models.Preload.getInstance();
};
goog.inherits(feng.views.sections.overlays.EndingOverlay, feng.views.Overlay);
goog.addSingletonGetter(feng.views.sections.overlays.EndingOverlay);


feng.views.sections.overlays.EndingOverlay.prototype.updateContent = function( sectionId, isFinished ){

	var copy = this._preload.getAsset('global.fengshui-data')['dialog']['ending'][sectionId];
	copy = isFinished ? copy['finished'] : copy['unfinished'];

	var character = copy['character'];
	var title = copy['title'];
	var paragraph = copy['paragraph'];

	var titleEl = goog.dom.query('h1', this.domElement)[0];
	var paragraphEl = goog.dom.query('p', this.domElement)[0];
	var characterEl = goog.dom.getElementByClass('character', this.domElement);

	titleEl.innerHTML = title;
	paragraphEl.innerHTML = paragraph;

	goog.dom.classes.add( characterEl, this._character, character );
	this._character = character;
};


feng.views.sections.overlays.EndingOverlay.prototype.animateIn = function(){

	goog.base(this, 'animateIn');

	TweenMax.fromTo(this.domElement, .8, {
		'opacity': 0
	}, {
		'opacity': 1,
		'ease': Strong.easeInOut
	});
};


feng.views.sections.overlays.EndingOverlay.prototype.animateOut = function(){

	TweenMax.to(this.domElement, .8, {
		'delay': .25,
		'opacity': 0,
		'ease': Strong.easeInOut,
		'onComplete': this.hide,
		'onCompleteParams': [ true ],
		'onCompleteScope': this
	});
};


feng.views.sections.overlays.EndingOverlay.prototype.onResize = function(e){

	goog.base(this, 'onResize', e);

	goog.style.setSize(this.domElement, goog.dom.getViewportSize());
};