goog.provide('feng.views.book.pages.About');

goog.require('goog.events.MouseWheelHandler');
goog.require('goog.math.Rect');
goog.require('goog.fx.Dragger');
goog.require('feng.views.book.pages.Page');


feng.views.book.pages.About = function( domElement ) {

	goog.base(this, domElement);

// for scrolling
  this._scrollerEl = goog.dom.getElementByClass('scroller', this.domElement);
  this._scrollWidth = 0;
  this._availableScrollWidth = 0;

  var onDraggableUpdate = goog.bind(this.onDraggableUpdate, this);

	this._draggable = new Draggable(this._scrollerEl, {
    'type': 'scrollLeft',
    'edgeResistance': 0.75,
    'dragResistance': 0.5,
    'cursor': 'default',
    'throwProps': true,
	'onThrowUpdate': onDraggableUpdate,
    'onDrag': onDraggableUpdate
  });

	this._mouseWheelHandler = new goog.events.MouseWheelHandler( this._scrollerEl );

	// for scrubbing
  this._scrubberEl = goog.dom.getElementByClass('scrubber', this.domElement);
  this._handleEl = goog.dom.getElementByClass('handle', this.domElement);

  this._scrubberDraggerLimits = new goog.math.Rect(0, 0, 0, 0);
  this._scrubberDragger = new goog.fx.Dragger(this._handleEl, null, this._scrubberDraggerLimits);
};
goog.inherits(feng.views.book.pages.About, feng.views.book.pages.Page);


feng.views.book.pages.About.prototype.activate = function() {

	goog.base(this, 'activate');

	this._eventHandler.listen( this._scrubberDragger, goog.fx.Dragger.EventType.DRAG, this.onDragScrubber, false, this );
	this._eventHandler.listen( this._mouseWheelHandler, goog.events.MouseWheelHandler.EventType.MOUSEWHEEL, this.onMouseWheel, false, this);

	this._draggable.enable();
};


feng.views.book.pages.About.prototype.deactivate = function() {

	goog.base(this, 'deactivate');

	this._draggable.disable();
};


feng.views.book.pages.About.prototype.animateIn = function() {

	goog.base(this, 'animateIn');
};


feng.views.book.pages.About.prototype.animateOut = function( instant ) {

	goog.base(this, 'animateOut', instant);
};


feng.views.book.pages.About.prototype.scrollTo = function( toScrollLeft ) {

	var fromScrollLeft = this._scrollerEl.scrollLeft;

	var scrollDistance = 500;

	var duration = goog.math.lerp(.2, .8, Math.abs(toScrollLeft - fromScrollLeft) / scrollDistance);

	TweenMax.to(this._scrollerEl, duration, {
		'scrollTo': {
			'x': toScrollLeft,
			'autoKill': true
		},
		'ease': Power3.easeOut,
		'onUpdate': this.onDraggableUpdate,
		'onUpdateScope': this
	});
};


feng.views.book.pages.About.prototype.onDragScrubber = function( e ) {

	var draggerX = Math.min(this._scrubberDraggerLimits.width, Math.max(0, e.dragger.deltaX));
	var ratio = draggerX / this._scrubberDraggerLimits.width;
	var scrollLeft = this._availableScrollWidth * ratio;
	
	this.scrollTo( scrollLeft );
};


feng.views.book.pages.About.prototype.onDraggableUpdate = function( e ) {

	var scrollLeft = this._scrollerEl.scrollLeft;
	var ratio = scrollLeft / this._availableScrollWidth;
	var handleX = this._scrubberDraggerLimits.width * ratio;
	goog.style.setPosition( this._handleEl, handleX, 0 );
};


feng.views.book.pages.About.prototype.onMouseWheel = function( e ) {

	var fromScrollLeft = this._scrollerEl.scrollLeft;

	var scrollDistance = 500;

	var toScrollLeft = fromScrollLeft + ((e.deltaY > 0) ? 1 : -1) * Math.max(50, scrollDistance);
	toScrollLeft = Math.max(0, Math.min(toScrollLeft, this._availableScrollWidth));

	this.scrollTo( toScrollLeft );
};


feng.views.book.pages.About.prototype.onResize = function( e ) {

	goog.base(this, 'onResize', e);

	var windowSize = goog.dom.getViewportSize();
	this._scrollWidth = 325 + 650 + 650;
	this._availableScrollWidth = this._scrollWidth - windowSize.width;

	var scrubberSize = goog.style.getSize( this._scrubberEl );
	var handleWidth = Math.ceil( scrubberSize.width * Math.min(1, windowSize.width / this._scrollWidth) );

	goog.style.setStyle(this._handleEl, 'width', handleWidth + 'px');

	this._scrubberDraggerLimits.width = scrubberSize.width - handleWidth;
	this._scrubberDragger.setLimits( this._scrubberDraggerLimits );
};