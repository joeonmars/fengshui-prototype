goog.provide('feng.views.book.TipModule');

goog.require('goog.dom');
goog.require('goog.events.EventHandler');
goog.require('goog.math.Size');
goog.require('goog.fx.Dragger');
goog.require('feng.events');
goog.require('feng.utils.Utils');


feng.views.book.TipModule = function( domElement, index, widthChangeCallback ) {

	goog.base(this);
	
	this.domElement = domElement;
	this._cardEl = goog.dom.getElementByClass('card', this.domElement);
	this._scrollerEl = goog.dom.getElementByClass('scroller', this.domElement);
	this._scrollerContentEl = goog.dom.getElementByClass('content', this._scrollerEl);
	this._scrollBarEl = goog.dom.getElementByClass('scrollbar', this._scrollerEl);
	this._handleEl = goog.dom.getElementByClass('handle', this._scrollerEl);
	this._shareButtons = goog.dom.query('.share a', this.domElement);

	this._draggerLimits = new goog.math.Rect(0, 0, 0, 0);
	this._dragger = new goog.fx.Dragger(this._handleEl, null, this._draggerLimits);
	this._dragger.defaultAction = goog.bind(this.onDragHandle, this);

	this.index = index;
	
	this.isHoveringScroller = false;

	this._widthChangeCallback = widthChangeCallback;

	this.x = 0;
	this.size = new goog.math.Size();

	this._minSize = feng.views.book.TipModule.MIN_SIZE;
	this._aspectRatio = this._minSize.aspectRatio();

	this._ratioOfWidth = feng.views.book.TipModule.RATIO_OF_WIDTH;
	this._ratioOfMargin = feng.views.book.TipModule.RATIO_OF_MARGIN;

	this._margin = 0;
	this._coverWidth = 0;

	this._scrollerContentHeight = 0;

	this._imageLoaded = false;
	this._hasScrollBar = false;

	this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.views.book.TipModule, goog.events.EventTarget);


feng.views.book.TipModule.prototype.activate = function() {

	this._eventHandler.listen( this.domElement, 'click', this.onClick, false, this );

	this._eventHandler.listen( this._scrollerContentEl, 'scroll', this.onScrollerScroll, false, this );
	this._eventHandler.listen( this._scrollerContentEl, 'mouseover', this.onMouseOverScroller, false, this );
	this._eventHandler.listen( this._scrollerContentEl, 'mouseout', this.onMouseOutScroller, false, this );

	goog.array.forEach(this._shareButtons, function(shareButton) {
		this._eventHandler.listen( shareButton, 'click', this.onClickShareButton, false, this );
	}, this);
};


feng.views.book.TipModule.prototype.deactivate = function() {

	this._eventHandler.removeAll();
};


feng.views.book.TipModule.prototype.getFinalWidth = function() {

	return this._coverWidth + this._margin * 2;
};


feng.views.book.TipModule.prototype.setActive = function( isActive ) {

	if(isActive) {

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

	}else {

		goog.dom.classes.remove(this.domElement, 'active');
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

	var maxHeight = Math.max(450, viewportSize.height * .7);
	var height = Math.min(maxHeight, this._coverWidth / this._aspectRatio);

	this._coverWidth = height * this._aspectRatio;

	this._margin = viewportSize.width * this._ratioOfMargin;
	var widthIncludeMargins = this._coverWidth + this._margin * 2;

	this.size.width = widthIncludeMargins;
	this.size.height = height;

	goog.style.setSize( this._cardEl, this._coverWidth, height );
	goog.style.setSize( this.domElement, this.size );

	// update scroller size
	this._scrollerContentHeight = goog.style.getSize(this._scrollerContentEl).height;
	var scrollerRatio = this._scrollerContentHeight / this._scrollerContentEl.scrollHeight;
	var handlePer = Math.round(scrollerRatio * 100);
	goog.style.setStyle( this._handleEl, 'height', handlePer + '%' );

	this._hasScrollBar = !(handlePer === 100);
	goog.style.showElement( this._scrollBarEl, this._hasScrollBar );

	// update dragger
	var scrollBarPosition = goog.style.getPosition(this._scrollBarEl);
	var scrollBarHeight = goog.style.getSize(this._scrollBarEl).height;
	this._draggerLimits.height = scrollBarHeight - (scrollBarHeight * scrollerRatio);
	this._dragger.setLimits( this._draggerLimits );

	//
	return this.size;
};


feng.views.book.TipModule.prototype.updateWidth = function() {

	goog.style.setSize( this.domElement, this.size );

	this._widthChangeCallback( this.index, this.size.width );
};


feng.views.book.TipModule.prototype.onClick = function(e) {

	this.dispatchEvent( feng.events.EventType.CHANGE );
};


feng.views.book.TipModule.prototype.onDragHandle = function(x, y) {

	goog.style.setPosition( this._handleEl, x, y );

	var ratio = y / this._draggerLimits.height;
	var distanceToScroll = this._scrollerContentEl.scrollHeight - this._scrollerContentHeight;
	this._scrollerContentEl.scrollTop = distanceToScroll * ratio;
};


feng.views.book.TipModule.prototype.onScrollerScroll = function(e) {

	var handleRatio = Math.round(e.currentTarget.scrollTop / e.currentTarget.scrollHeight * 100);

	goog.style.setStyle( this._handleEl, 'top', handleRatio + '%' );
};


feng.views.book.TipModule.prototype.onMouseOverScroller = function(e) {

	this.isHoveringScroller = this._hasScrollBar;
};


feng.views.book.TipModule.prototype.onMouseOutScroller = function(e) {

	if(e.relatedTarget) {
		this.isHoveringScroller = false;
		return;
	}

	if( e.relatedTarget && !goog.dom.contains(e.currentTarget, e.relatedTarget) ) {
		this.isHoveringScroller = false;
	}
};


feng.views.book.TipModule.prototype.onClickShareButton = function(e) {

  e.preventDefault();

  feng.utils.Utils.popUp( e.currentTarget.href );
};


feng.views.book.TipModule.RATIO_OF_WIDTH = 0.25;
feng.views.book.TipModule.RATIO_OF_MARGIN = 0.045;
feng.views.book.TipModule.MIN_SIZE = new goog.math.Size(300, 470);