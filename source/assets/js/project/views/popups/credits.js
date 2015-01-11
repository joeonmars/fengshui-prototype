goog.provide('feng.views.popups.Credits');

goog.require('goog.net.XhrIo');
goog.require('feng.fx.ScrollBar');
goog.require('feng.views.popups.Popup');
goog.require('feng.templates.common');


/**
 * @constructor
 */
feng.views.popups.Credits = function(){

	var domElement = soy.renderAsFragment(feng.templates.common.CreditsPopup);
	
	goog.base( this, domElement );

	this._scrollerEl = goog.dom.getElementByClass('scroller', this.domElement);
	this._scrollBarEl = goog.dom.getElementByClass('scrollbar', this._scrollerEl);
	this._scrollerContentEl = goog.dom.getElementByClass('content', this._scrollerEl);

	this._skipButton = goog.dom.getElementByClass('skip', this.domElement);

    this._scrollBar = new feng.fx.ScrollBar( this._scrollBarEl, this._scrollerContentEl );

	this._escKeyId = null;
	this._animateOut = goog.bind(this.animateOut, this);

	this._onContentLoad = goog.bind(this.onContentLoad, this);

	this._hasLoaded = false;
};
goog.inherits(feng.views.popups.Credits, feng.views.popups.Popup);
goog.addSingletonGetter(feng.views.popups.Credits);


feng.views.popups.Credits.prototype.animateIn = function(){

	goog.base(this, 'animateIn', 200);
};


feng.views.popups.Credits.prototype.doAnimateIn = function(){

	goog.base(this, 'doAnimateIn');

	if( this._hasLoaded ) {

		this._scrollBar.scrollTo( 0 )
		this._scrollBar.resize();

	}else {

		goog.dom.classes.add( this.domElement, 'loading' );

		TweenMax.set(this._scrollerEl, {
			'opacity': 0
		});

		// load ajax content
		var url = feng.Config['assetsPath'] + 'html/credits.html';
		goog.net.XhrIo.send( url, this._onContentLoad );
	}
};


feng.views.popups.Credits.prototype.activate = function(){

	goog.base(this, 'activate');

	this._scrollBar.activate();

	goog.events.listen(window, 'resize', this.onResize, false, this);

	this._escKeyId = feng.keyboardController.bind( this._animateOut, feng.keyboardController.key.ESC, true );

	this._eventHandler.listen( this._skipButton, 'click', this.animateOut, false, this );
};


feng.views.popups.Credits.prototype.deactivate = function(){

	goog.base(this, 'deactivate');

	this._scrollBar.deactivate();

	goog.events.unlisten(window, 'resize', this.onResize, false, this);

	feng.keyboardController.unbind( this._escKeyId );
};


feng.views.popups.Credits.prototype.onContentLoad = function(e){

	this._hasLoaded = true;

	var response = e.target.getResponseText();
	var bodyText = /<body.*?>([\s\S]*)<\/body>/.exec( response )[1];

	this._scrollerContentEl.innerHTML = bodyText;

	this._scrollBar.resize();

	TweenMax.to(this._scrollerEl, .5, {
		'delay': 1,
		'opacity': 1,
		'onComplete': function() {
			goog.dom.classes.remove( this.domElement, 'loading' );
		},
		'onCompleteScope': this
	});
};


feng.views.popups.Credits.prototype.onResize = function(e){

	this._scrollBar.resize();
};