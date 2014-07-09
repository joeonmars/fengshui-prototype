goog.provide('feng.views.sections.home.IntroScreen');

goog.require('feng.views.sections.home.Screen');


/**
 * @constructor
 */
feng.views.sections.home.IntroScreen = function(domElement){

	goog.base(this, domElement);

	this._continueButtonEl = goog.dom.getElementByClass('primary-button', this.domElement);
};
goog.inherits(feng.views.sections.home.IntroScreen, feng.views.sections.home.Screen);


feng.views.sections.home.IntroScreen.prototype.activate = function() {

	goog.base(this, 'activate');

	this._eventHandler.listen( this._continueButtonEl, 'click', this.onClick, false, this );
};


feng.views.sections.home.IntroScreen.prototype.animateIn = function() {

	goog.base(this, 'animateIn');

	var size = goog.style.getSize( this.domElement );

	TweenMax.fromTo( this.domElement, 1, {
		'clip': 'rect(0px, ' + size.width + 'px, ' + size.height + 'px, ' + size.width + 'px)'
	}, {
		'clip': 'rect(0px, ' + size.width + 'px, ' + size.height + 'px, 0px)',
		'clearProps': 'all',
		'ease': Strong.easeInOut,
		'onComplete': this.activate,
		'onCompleteScope': this
	});
};


feng.views.sections.home.IntroScreen.prototype.animateOut = function() {

	goog.base(this, 'animateOut');

	this.hide();
};


feng.views.sections.home.IntroScreen.prototype.onClick = function(e) {

	this.dispatchEvent( feng.events.EventType.CLOSE );
};