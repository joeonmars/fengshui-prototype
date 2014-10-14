goog.provide('feng.views.sections.home.PreloadScreen');

goog.require('goog.Timer');
goog.require('feng.views.sections.home.Screen');
goog.require('feng.fx.AnimatedHouseLogo');


/**
 * @constructor
 */
feng.views.sections.home.PreloadScreen = function(domElement){

	goog.base(this, domElement);

	this._houseLogo = null;
	this._houseLogoTweener = null;
};
goog.inherits(feng.views.sections.home.PreloadScreen, feng.views.sections.home.Screen);


feng.views.sections.home.PreloadScreen.prototype.activate = function() {

	goog.base(this, 'activate');

	var houseLogoImg = feng.fx.AnimatedHouseLogo.getImg();
	this._eventHandler.listenOnce( houseLogoImg, goog.events.EventType.LOAD, this.createHouseLogo, false, this );
};


feng.views.sections.home.PreloadScreen.prototype.hide = function() {

	goog.base(this, 'hide');

	this._houseLogoTweener.pause();
};


feng.views.sections.home.PreloadScreen.prototype.createHouseLogo = function() {

	var logoEl = goog.dom.getElementByClass('house-logo', this.domElement);
	this._houseLogo = new feng.fx.AnimatedHouseLogo( logoEl );
	this._houseLogoTweener = this._houseLogo.getTweener({
		'repeat': -1,
		'repeatDelay': 1.5,
		'ease': Sine.easeInOut
	}, 60);

	this._houseLogoTweener.restart();
};


feng.views.sections.home.PreloadScreen.prototype.animateOut = function() {

	goog.base(this, 'animateOut');

	TweenMax.to(this.domElement, 1, {
		'delay': .8,
		'opacity': 0,
		'ease': Strong.easeInOut,
		'onComplete': this.hide,
		'onCompleteScope': this
	});
};


feng.views.sections.home.PreloadScreen.prototype.onLoadAnimationComplete = function(e){

	goog.Timer.callOnce(function() {
		this.dispatchEvent( feng.events.EventType.CLOSE );
	}, 2000, this);
};