goog.provide('feng.fx.ScrollBar');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.fx.Dragger');


/**
 * @constructor
 */
feng.fx.ScrollBar = function(domElement, scrollerEl){

	goog.base(this);

	this.domElement = domElement;
	this._handleEl = goog.dom.getElementByClass('handle', this.domElement);

	this._scrollerEl = scrollerEl;

	this._eventHandler = new goog.events.EventHandler(this);

	this.isHoveringScroller = false;

	this._scrollerContentHeight = 0;
	this._hasScrollBar = false;

	this._draggerLimits = new goog.math.Rect(0, 0, 0, 0);
	this._dragger = new goog.fx.Dragger(this._handleEl, null, this._draggerLimits);
	this._dragger.defaultAction = goog.bind(this.onDragHandle, this);
};
goog.inherits(feng.fx.ScrollBar, goog.events.EventTarget);


feng.fx.ScrollBar.prototype.activate = function() {

	this._eventHandler.listen( this._scrollerEl, 'scroll', this.onScrollerScroll, false, this );
	this._eventHandler.listen( this._scrollerEl, 'mouseover', this.onMouseOverScroller, false, this );
	this._eventHandler.listen( this._scrollerEl, 'mouseout', this.onMouseOutScroller, false, this );

	this.resize();
};


feng.fx.ScrollBar.prototype.deactivate = function() {

	this._eventHandler.removeAll();
};


feng.fx.ScrollBar.prototype.resize = function() {

	// update scroller size
	this._scrollerContentHeight = goog.style.getSize(this._scrollerEl).height;
	var scrollerRatio = this._scrollerContentHeight / this._scrollerEl.scrollHeight;
	var handlePer = Math.round(scrollerRatio * 100);
	goog.style.setStyle( this._handleEl, 'height', handlePer + '%' );

	this._hasScrollBar = !(handlePer >= 100 || handlePer <= 0);
	goog.style.showElement( this.domElement, this._hasScrollBar );

	// update dragger
	var scrollBarPosition = goog.style.getPosition(this.domElement);
	var scrollBarHeight = goog.style.getSize(this.domElement).height;
	this._draggerLimits.height = scrollBarHeight - (scrollBarHeight * scrollerRatio);
	this._dragger.setLimits( this._draggerLimits );
};


feng.fx.ScrollBar.prototype.onDragHandle = function(x, y) {

	goog.style.setPosition( this._handleEl, x, y );

	var ratio = y / this._draggerLimits.height;
	var distanceToScroll = this._scrollerEl.scrollHeight - this._scrollerContentHeight;
	this._scrollerEl.scrollTop = distanceToScroll * ratio;
};


feng.fx.ScrollBar.prototype.onScrollerScroll = function(e) {

	var handleRatio = Math.round(e.currentTarget.scrollTop / e.currentTarget.scrollHeight * 100);

	goog.style.setStyle( this._handleEl, 'top', handleRatio + '%' );
};


feng.fx.ScrollBar.prototype.onMouseOverScroller = function(e) {

	this.isHoveringScroller = this._hasScrollBar;
};


feng.fx.ScrollBar.prototype.onMouseOutScroller = function(e) {

	if(e.relatedTarget) {
		this.isHoveringScroller = false;
		return;
	}

	if( e.relatedTarget && !goog.dom.contains(e.currentTarget, e.relatedTarget) ) {
		this.isHoveringScroller = false;
	}
};