goog.provide('feng.views.sections.overlays.FinaleOverlay');

goog.require('goog.dom');
goog.require('goog.style');
goog.require('feng.views.Overlay');
goog.require('feng.views.popups.Popup');
goog.require('feng.models.Preload');
goog.require('feng.utils.Utils');


/**
 * @constructor
 */
feng.views.sections.overlays.FinaleOverlay = function(domElement){

	var canHalt = true;

  goog.base(this, domElement, canHalt);

  var popupEl = goog.dom.getElementByClass('popup', this.domElement);
  this._popup = new feng.views.popups.Popup( popupEl );

  this._shareButtons = goog.dom.query('ul a', this.domElement);

  this._escKeyId = null;

  this._animateOutFunc = goog.bind(function() {
  	this._popup.animateOut();
  }, this);

  this.updateContent();
};
goog.inherits(feng.views.sections.overlays.FinaleOverlay, feng.views.Overlay);
goog.addSingletonGetter(feng.views.sections.overlays.FinaleOverlay);


feng.views.sections.overlays.FinaleOverlay.prototype.activate = function(){

	goog.base(this, 'activate');

	goog.array.forEach(this._shareButtons, function(shareButton) {
		this._eventHandler.listen( shareButton, 'click', this.onClickShareButton, false, this );
	}, this);

	this._eventHandler.listenOnce( this._popup, feng.events.EventType.ANIMATE_OUT, this.animateOut, false, this );
	
	this._escKeyId = feng.keyboardController.bind( this._animateOutFunc, feng.keyboardController.key.ESC, true );
};


feng.views.sections.overlays.FinaleOverlay.prototype.deactivate = function(){

	goog.base(this, 'deactivate');

	feng.keyboardController.unbind( this._escKeyId );
};


feng.views.sections.overlays.FinaleOverlay.prototype.updateContent = function(){

	var preload = feng.models.Preload.getInstance();
	var copy = preload.getAsset('global.fengshui-data')['dialog']['finale'];

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


feng.views.sections.overlays.FinaleOverlay.prototype.onClickShareButton = function(e) {

  e.preventDefault();

  feng.utils.Utils.popUp( e.currentTarget.href );
};


feng.views.sections.overlays.FinaleOverlay.prototype.onResize = function(e){

	goog.base(this, 'onResize', e);

	goog.style.setSize(this.domElement, feng.viewportSize);

	feng.utils.Utils.centerAlign( this._popup.domElement, feng.viewportSize );
};