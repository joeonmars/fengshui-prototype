goog.provide('feng.views.book.Book');

goog.require('goog.dom');
goog.require('goog.events.EventHandler');
goog.require('goog.events.MouseWheelHandler');
goog.require('goog.object');
goog.require('feng.events');
goog.require('feng.models.achievements.Achievements');
goog.require('feng.templates.book');
goog.require('feng.views.book.TipModule');


feng.views.book.Book = function() {

	goog.base(this);
	
	var glossary = feng.models.Preload.getInstance().getAsset('global.fengshui-data')['glossary'];
	var tips = feng.models.achievements.Achievements.getInstance().getAllTips();

	this.domElement = soy.renderAsFragment(feng.templates.book.Book, {
		tips: tips,
		glossary: glossary
	});

	goog.dom.appendChild(goog.dom.getElement('main'), this.domElement);

	this._closeButton = goog.dom.getElementByClass('close-button', this.domElement);

	this._scrollerEl = goog.dom.getElementByClass('scroller', this.domElement);
	this._scrollerInnerEl = goog.dom.getElementByClass('inner', this._scrollerEl);

	var tipModuleEls = goog.dom.getElementsByClass('tip-module', this.domElement);
	var widthChangeCallback = goog.bind(this.updateFromTipModuleIndex, this);

	this._tipModules = goog.array.map( tipModuleEls, function(tipModuleEl, index) {

		var tipModule = new feng.views.book.TipModule( tipModuleEl, index, widthChangeCallback );
		tipModule.setParentEventTarget( this );
		return tipModule;

	}, this);

	this._tipModuleWidths = [];
	this._openedTipModule = null;
	this._activeTipModule = null;
	this._activeTipIndex = null;

	this._viewportSize = null;
	this._scrollX = 0;
	this._targetScrollX = 0;
	this._sumFunc = function(r, v, i, arr) {return r + v;}

	//
	this._mouseWheelHandler = new goog.events.MouseWheelHandler( this.domElement );
	this._maxDelta = 30;
	this._mouseWheelHandler.setMaxDeltaX( this._maxDelta );
	this._mouseWheelHandler.setMaxDeltaY( this._maxDelta );

	this._eventHandler = new goog.events.EventHandler( this );

	this.animateOut( true );
};
goog.inherits(feng.views.book.Book, goog.events.EventTarget);
goog.addSingletonGetter(feng.views.book.Book);


feng.views.book.Book.prototype.activate = function() {

	this._eventHandler.listen( window, 'resize', this.resize, false, this );
	this._eventHandler.listen( this._closeButton, 'click', this.animateOut, false, this );
	this._eventHandler.listen( this, feng.events.EventType.OPEN, this.onTipModuleOpen, false, this );
	this._eventHandler.listen( this, feng.events.EventType.CLOSE, this.onTipModuleClose, false, this );
	this._eventHandler.listen( this._mouseWheelHandler, goog.events.MouseWheelHandler.EventType.MOUSEWHEEL, this.onMouseWheel, false, this );

	goog.array.forEach( this._tipModules, function(tipModule) {
		tipModule.activate();
	});

	this.scrollToTipModule( 0 );
};


feng.views.book.Book.prototype.deactivate = function() {

	this._eventHandler.removeAll();

	goog.array.forEach( this._tipModules, function(tipModule) {
		tipModule.deactivate();
	});
};


feng.views.book.Book.prototype.resize = function( e ) {

	this._viewportSize = goog.dom.getViewportSize();

	this._tipModuleWidths = goog.array.map(this._tipModules, function(tipModule) {
		return tipModule.setSize( this._viewportSize ).width;
	}, this);

	goog.style.setStyle(this._scrollerEl, 'height', this._tipModules[0].size.height + 'px');

	// rearrange tip module positions after resizing
	goog.array.forEach(this._tipModules, function(tipModule, index) {

		var widths = this._tipModuleWidths.slice(0, index);
		var x = goog.array.reduce(widths, this._sumFunc, 0); 

		tipModule.setX( x );

	}, this);
};


feng.views.book.Book.prototype.updateFromTipModuleIndex = function( tipModuleIndex, tipModuleWidth ) {

	this._tipModuleWidths[ tipModuleIndex ] = tipModuleWidth;

	// rearrange tip module positions when any tip module width change
	goog.array.forEach(this._tipModules, function(tipModule, index) {

		var widths = this._tipModuleWidths.slice(0, index);
		var x = goog.array.reduce(widths, this._sumFunc, 0); 

		tipModule.setX( x );

	}, this);
};


feng.views.book.Book.prototype.animateIn = function() {

	goog.style.showElement(this.domElement, true);

	this.resize();

	this.activate();

	this.dispatchEvent( feng.events.EventType.ANIMATE_IN );
};


feng.views.book.Book.prototype.animateOut = function( instant ) {

	this.deactivate();

	goog.style.showElement(this.domElement, false);

	//
	this.dispatchEvent( feng.events.EventType.ANIMATE_OUT );
};


feng.views.book.Book.prototype.getScrollInfo = function() {

	// pre-calculate X considering tip modules who have post-update widths
	var finalTipModuleWidths = goog.array.map( this._tipModules, function(tipModule) {
		return tipModule.getFinalWidth();
	}, this);

	var scrollWidth = goog.array.reduce(finalTipModuleWidths, this._sumFunc, 0);

	var firstSectionWidth = finalTipModuleWidths[0];
	var lastSectionWidth = finalTipModuleWidths[finalTipModuleWidths.length - 1];

	var leftX = -(this._viewportSize.width - firstSectionWidth) / 2;
	var rightX = (scrollWidth - lastSectionWidth) - (this._viewportSize.width - lastSectionWidth) / 2;

	var info = {
		widths: finalTipModuleWidths,
		scrollWidth: scrollWidth,
		leftX: leftX,
		rightX: rightX
	};

	return info;
};


feng.views.book.Book.prototype.getTipModuleIndexByX = function( x ) {

	var scrollInfo = this.getScrollInfo();
	var finalTipModuleWidths = scrollInfo.widths;
	var leftX = scrollInfo.leftX;
	var rightX = scrollInfo.rightX;

	var i, l = finalTipModuleWidths.length;
	var currentX = leftX;

	for(i = 0; i < l - 1; i ++) {

		var nextX = currentX + finalTipModuleWidths[i];

		if(x >= currentX && x < nextX) {
			return i;
			break;
		}

		currentX = nextX;
	}

	return (l-1);
};


feng.views.book.Book.prototype.scrollToTipModule = function( index ) {

	goog.fx.anim.unregisterAnimation( this );

	this._activeTipIndex = index;
	this._activeTipModule = this._tipModules[ index ];

	var scrollInfo = this.getScrollInfo();
	var finalTipModuleWidths = scrollInfo.widths;
	var leftX = scrollInfo.leftX;

	var widths = finalTipModuleWidths.slice(0, index);
	var tipModuleWidth = finalTipModuleWidths[ index ];
	var tipModuleX = goog.array.reduce(widths, this._sumFunc, 0);

	var scrollX = tipModuleX - (this._viewportSize.width - tipModuleWidth) / 2;

	TweenMax.to(this, .5, {
		_scrollX: scrollX,
		_targetScrollX: scrollX,
		'ease': Quad.easeInOut,
		'onUpdate': this.applyScrollX,
		'onUpdateScope': this
	});
};


feng.views.book.Book.prototype.prevTipModule = function() {

	var index = Math.max(0, this._activeTipIndex - 1);
	this.scrollToTipModule( index );
};


feng.views.book.Book.prototype.nextTipModule = function() {

	var index = Math.min(this._tipModules.length - 1, this._activeTipIndex + 1);
	this.scrollToTipModule( index );
};


feng.views.book.Book.prototype.applyScrollX = function() {

	goog.style.setStyle( this._scrollerInnerEl, 'transform', 'translateX(' + (-this._scrollX) + 'px)' );
};


feng.views.book.Book.prototype.onTipModuleOpen = function(e) {

	if(e.target === this._openedTipModule) return;

	if(this._openedTipModule) {
		this._openedTipModule.close();
	}

	this._openedTipModule = e.target;
};


feng.views.book.Book.prototype.onTipModuleClose = function(e) {

	this._openedTipModule = null;
};


feng.views.book.Book.prototype.onMouseWheel = function( e ) {

	var delta = e.deltaX || e.deltaY;
	var scrollDist = goog.math.lerp( 0, this._viewportSize.width/4, delta/this._maxDelta );

	this._targetScrollX += scrollDist;

	var scrollInfo = this.getScrollInfo();
	var leftX = scrollInfo.leftX;
	var rightX = scrollInfo.rightX;

	this._targetScrollX = Math.max( Math.min( rightX, this._targetScrollX ), leftX );

	goog.fx.anim.registerAnimation( this );
};


feng.views.book.Book.prototype.onAnimationFrame = function( now ) {

	this._scrollX += (this._targetScrollX - this._scrollX) * .1;
	this.applyScrollX();

	// if reached the target scroll x, stop animating and lock to the nearest tip module
	if( goog.math.nearlyEquals(this._scrollX, this._targetScrollX, 1) ) {

		goog.fx.anim.unregisterAnimation( this );

		this._scrollX = this._targetScrollX;

		var tipModuleIndex = this.getTipModuleIndexByX( this._scrollX );
		this.scrollToTipModule( tipModuleIndex );
	}
};