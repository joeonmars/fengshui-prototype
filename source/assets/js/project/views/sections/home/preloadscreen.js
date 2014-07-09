goog.provide('feng.views.sections.home.PreloadScreen');

goog.require('feng.views.sections.home.Screen');
goog.require('feng.views.Logo');


/**
 * @constructor
 */
feng.views.sections.home.PreloadScreen = function(domElement){

	goog.base(this, domElement);

	var logoEl = goog.dom.getElementByClass('fengshui-logo', this.domElement);
	this._logo = new feng.views.Logo( logoEl );

	this._fillEl = goog.dom.getElementByClass('fill', this.domElement);
	this._counterEl = goog.dom.getElementByClass('counter', this.domElement);
};
goog.inherits(feng.views.sections.home.PreloadScreen, feng.views.sections.home.Screen);


feng.views.sections.home.PreloadScreen.prototype.setProgress = function(progress) {

	var progress = Math.round( progress * 100 );

	goog.style.setStyle( this._fillEl, 'width', progress + '%' );

	this._counterEl.innerHTML = (progress > 9) ? progress : ('0' + progress);
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