goog.provide('feng.views.sections.overlays.TutorialOverlay');

goog.require('goog.dom');
goog.require('goog.style');
goog.require('feng.views.Overlay');


/**
 * @constructor
 */
feng.views.sections.overlays.TutorialOverlay = function(domElement){

	var canHalt = true;

  goog.base(this, domElement, canHalt);
};
goog.inherits(feng.views.sections.overlays.TutorialOverlay, feng.views.Overlay);
goog.addSingletonGetter(feng.views.sections.overlays.TutorialOverlay);


feng.views.sections.overlays.TutorialOverlay.prototype.show = function( shouldDispatch ){

	goog.base(this, 'show', shouldDispatch);
	
	feng.tutorial.enableAutoPlay(false);
	goog.dom.appendChild( this.domElement, feng.tutorial.domElement );
};


feng.views.sections.overlays.TutorialOverlay.prototype.animateIn = function(){

	goog.base(this, 'animateIn');

	TweenMax.fromTo(this.domElement, .8, {
		'opacity': 0
	}, {
		'opacity': 1,
		'ease': Strong.easeInOut
	});
};


feng.views.sections.overlays.TutorialOverlay.prototype.animateOut = function(){

	this.dispatchEvent( feng.events.EventType.ANIMATE_OUT );

	TweenMax.to(this.domElement, .8, {
		'delay': .25,
		'opacity': 0,
		'ease': Strong.easeInOut,
		'onComplete': this.hide,
		'onCompleteParams': [ true ],
		'onCompleteScope': this
	});
};


feng.views.sections.overlays.TutorialOverlay.prototype.onResize = function(e){

	goog.base(this, 'onResize', e);

	goog.style.setSize(this.domElement, goog.dom.getViewportSize());
};