goog.provide('feng.views.book.TipModule');

goog.require('goog.dom');
goog.require('goog.events.EventHandler');
goog.require('goog.math.Size');
goog.require('feng.events');
goog.require('feng.utils.Utils');
goog.require('feng.fx.ScrollBar');


feng.views.book.TipModule = function( domElement, index, widthChangeCallback ) {

	goog.base(this);
	
	this.domElement = domElement;
	this._cardEl = goog.dom.getElementByClass('card', this.domElement);

	var scrollerEl = goog.dom.getElementByClass('scroller', this.domElement);
	var scrollerContentEl = goog.dom.getElementByClass('content', scrollerEl);
	var scrollBarEl = goog.dom.getElementByClass('scrollbar', scrollerEl);

	this._scrollBar = new feng.fx.ScrollBar( scrollBarEl, scrollerContentEl );

	this._shareButtons = goog.dom.query('.share a', this.domElement);

	this.id = this.domElement.getAttribute('data-tip-id');

	this.index = index;
	
	this._widthChangeCallback = widthChangeCallback;

	this.x = 0;
	this.size = new goog.math.Size();

	this._minSize = feng.views.book.TipModule.MIN_SIZE;
	this._aspectRatio = this._minSize.aspectRatio();

	this._ratioOfWidth = feng.views.book.TipModule.RATIO_OF_WIDTH;
	this._ratioOfMargin = feng.views.book.TipModule.RATIO_OF_MARGIN;

	this._margin = 0;
	this._coverWidth = 0;

	this._imageLoaded = false;

	this._isUnlocked = false;

	this._outerEventHandler = new goog.events.EventHandler(this);
	this._innerEventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.views.book.TipModule, goog.events.EventTarget);


feng.views.book.TipModule.prototype.activate = function() {

	this._outerEventHandler.listen( this.domElement, 'click', this.onClick, false, this );
};


feng.views.book.TipModule.prototype.deactivate = function() {

	this._outerEventHandler.removeAll();
	this._innerEventHandler.removeAll();
};


feng.views.book.TipModule.prototype.getFinalWidth = function() {

	return this._coverWidth + this._margin * 2;
};


feng.views.book.TipModule.prototype.setActive = function( isActive ) {

	if(isActive && this._isUnlocked) {

		goog.dom.classes.add(this.domElement, 'active');

		if(!this._imageLoaded) {
			
			var screenEl = goog.dom.getElementByClass('screen', this.domElement);

			var img = new Image();
			img.src = screenEl.getAttribute('data-src');

			goog.events.listenOnce(img, 'load', function() {
				goog.style.setStyle(screenEl, 'background-image', 'url(' + img.src + ')');
				goog.dom.classes.enable( screenEl, 'loaded', true );
			});
		}

		// activate inner events
		this._scrollBar.activate();

		goog.array.forEach(this._shareButtons, function(shareButton) {
			this._innerEventHandler.listen( shareButton, 'click', this.onClickShareButton, false, this );
		}, this);

	}else {

		goog.dom.classes.remove(this.domElement, 'active');

		this._scrollBar.deactivate();

		// deactivate inner events
		this._innerEventHandler.removeAll();
	}
};


feng.views.book.TipModule.prototype.setX = function( x ) {

	this.x = x;
	goog.style.setStyle( this.domElement, 'transform', 'translateX(' + x + 'px)' );
};


feng.views.book.TipModule.prototype.setSize = function( viewportSize ) {

	// update element size
	this._coverWidth = viewportSize.width * this._ratioOfWidth;
	this._coverWidth = Math.max(this._minSize.width, this._coverWidth);

	var maxHeight = Math.max(450, viewportSize.height * .6);
	var height = Math.min(maxHeight, this._coverWidth / this._aspectRatio);

	this._coverWidth = height * this._aspectRatio;

	this._margin = viewportSize.width * this._ratioOfMargin;
	var widthIncludeMargins = this._coverWidth + this._margin * 2;

	this.size.width = widthIncludeMargins;
	this.size.height = height;

	goog.style.setSize( this._cardEl, this._coverWidth, height );
	goog.style.setSize( this.domElement, this.size );

	// update scroller size
	this._scrollBar.resize();

	//
	return this.size;
};


feng.views.book.TipModule.prototype.isHoveringScroller = function() {

	return this._scrollBar.isHoveringScroller;
};


feng.views.book.TipModule.prototype.updateWidth = function() {

	goog.style.setSize( this.domElement, this.size );

	this._widthChangeCallback( this.index, this.size.width );
};


feng.views.book.TipModule.prototype.unlock = function() {

	this._isUnlocked = true;

	goog.dom.classes.enable( this.domElement, 'unlocked', true );
};


feng.views.book.TipModule.prototype.onClick = function(e) {

	this.dispatchEvent( feng.events.EventType.CHANGE );
};


feng.views.book.TipModule.prototype.onClickShareButton = function(e) {

  e.preventDefault();

  feng.utils.Utils.popUp( e.currentTarget.href );
};


feng.views.book.TipModule.RATIO_OF_WIDTH = 0.35;
feng.views.book.TipModule.RATIO_OF_MARGIN = 0.025;
feng.views.book.TipModule.MIN_SIZE = new goog.math.Size(300, 440);