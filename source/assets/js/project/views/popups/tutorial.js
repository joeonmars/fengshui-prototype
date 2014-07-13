goog.provide('feng.views.popups.Tutorial');

goog.require('feng.views.popups.Popup');
goog.require('feng.templates.common');


/**
 * @constructor
 */
feng.views.popups.Tutorial = function(){

	var domElement = soy.renderAsFragment(feng.templates.common.TutorialPopup);
	goog.base( this, domElement );

	this._loaderEl = goog.dom.getElementByClass('loader', this.domElement);
	this._fillEl = goog.dom.getElementByClass('fill', this.domElement);
	this._counterEl = goog.dom.getElementByClass('counter', this.domElement);

	this._skipButton = goog.dom.getElementByClass('skip', this.domElement);

	this.hideCloseButton();
};
goog.inherits(feng.views.popups.Tutorial, feng.views.popups.Popup);
goog.addSingletonGetter(feng.views.popups.Tutorial);


feng.views.popups.Tutorial.prototype.activate = function(){

	goog.base(this, 'activate');

	this._eventHandler.listen( this._skipButton, 'click', this.animateOut, false, this );
};


feng.views.popups.Tutorial.prototype.showLoader = function(){

	TweenMax.fromTo(this._loaderEl, .25, {
		'opacity': 0,
		'y': 20,
	}, {
		'opacity': 1,
		'y': 0,
		'display': 'block',
		'ease': Strong.easeInOut
	});

	TweenMax.set(this._skipButton, {
		'display': 'none'
	});
};


feng.views.popups.Tutorial.prototype.showSkipButton = function(){

	TweenMax.to(this._loaderEl, .25, {
		'opacity': 0,
		'y': 20,
		'display': 'none',
		'ease': Strong.easeInOut
	});

	TweenMax.fromTo(this._skipButton, .25, {
		'display': 'none',
		'opacity': 0,
		'y': 20
	}, {
		'delay': .6,
		'opacity': 1,
		'y': 0,
		'display': 'block',
		'ease': Strong.easeInOut
	});
};


feng.views.popups.Tutorial.prototype.setProgress = function(progress){

	var progress = Math.round( progress * 100 );

	goog.style.setStyle( this._fillEl, 'width', progress + '%' );

	this._counterEl.innerHTML = (progress > 9) ? progress : ('0' + progress);
};