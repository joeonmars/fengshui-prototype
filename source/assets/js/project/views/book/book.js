goog.provide('feng.views.book.Book');

goog.require('goog.dom');
goog.require('goog.events.EventHandler');
goog.require('goog.events.MouseWheelHandler');
goog.require('goog.fx.Dragger');
goog.require('goog.math.Rect');
goog.require('goog.object');
goog.require('feng.events');
goog.require('feng.models.achievements.Achievements');
goog.require('feng.templates.book');
goog.require('feng.views.book.TipModule');


feng.views.book.Book = function() {

	goog.base(this);
	
	// retrieve final tips
	var tips = feng.models.achievements.Achievements.getInstance().getAllTips();

	this._tips = goog.array.filter(tips, function(tip) {

		if( tip.isFinal ) {
			tip.listen( feng.events.EventType.UNLOCK, this.onTipUnlock, false, this );
		}

		return tip.isFinal;
	}, this);

	this.domElement = soy.renderAsFragment(feng.templates.book.Book, {
		tips: this._tips
	});

	goog.dom.appendChild(goog.dom.getElement('main'), this.domElement);

	this._closeButton = goog.dom.getElementByClass('close-button', this.domElement);

	this._tipCounterEl = goog.dom.getElementByClass('tip-counter', this.domElement);
	this.updateTipCounter();

	this._scrollerEl = goog.dom.getElementByClass('scroller', this.domElement);
	this._scrollerInnerEl = goog.dom.getElementByClass('inner', this._scrollerEl);

	this._scrubberEl = goog.dom.getElementByClass('scrubber', this.domElement);
	this._handleEl = goog.dom.getElementByClass('handle', this._scrubberEl);

	this._scrubberWidth = 0;
	this._handleWidth = 0;

	this._dragger = new goog.fx.Dragger(this._handleEl);
	this._dragger.setHysteresis( 10 );
	this._draggerLimits = new goog.math.Rect(0, 0, 0, 0);

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
	this._activeTipIndex = 0;

	this._viewportSize = null;
	this._scrollX = 0;
	this._targetScrollX = 0;
	this._sumFunc = function(r, v, i, arr) {return r + v;}

	this._scrollTweener = null;

	this._animateInTweener = new TimelineMax();

	//
	this._animateOut = goog.bind( this.animateOut, this );
	this._prevTipModule = goog.bind( this.prevTipModule, this );
	this._nextTipModule = goog.bind( this.nextTipModule, this );

	this._enterKeyId = null;
	this._leftKeyId = null;
	this._rightKeyId = null;

	//
	this._mouseWheelHandler = new goog.events.MouseWheelHandler( this.domElement );
	this._maxDelta = 30;
	this._mouseWheelHandler.setMaxDeltaX( this._maxDelta );
	this._mouseWheelHandler.setMaxDeltaY( this._maxDelta );

	this._eventHandler = new goog.events.EventHandler( this );

	goog.events.listen( feng.navigationController, feng.events.EventType.CHANGE, this.onNavigationChange, false, this );

	this.animateOut( true );
};
goog.inherits(feng.views.book.Book, goog.events.EventTarget);
goog.addSingletonGetter(feng.views.book.Book);


feng.views.book.Book.prototype.activate = function() {

	this._eventHandler.listen( window, 'resize', this.onResize, false, this );
	this._eventHandler.listen( this._closeButton, 'click', this.animateOut, false, this );
	this._eventHandler.listen( this, feng.events.EventType.CHANGE, this.onTipModuleChange, false, this );
	this._eventHandler.listen( this, feng.events.EventType.CLOSE, this.onTipModuleClose, false, this );
	this._eventHandler.listen( this._mouseWheelHandler, goog.events.MouseWheelHandler.EventType.MOUSEWHEEL, this.onMouseWheel, false, this );
	this._eventHandler.listen( this._dragger, goog.fx.Dragger.EventType.DRAG, this.onDrag, false, this );
	this._eventHandler.listen( this._dragger, goog.fx.Dragger.EventType.START, this.onDragStart, false, this );
	this._eventHandler.listen( this._dragger, goog.fx.Dragger.EventType.END, this.onDragEnd, false, this );

	this._enterKeyId = feng.keyboardController.bind( this._animateOut, feng.keyboardController.key.ESC, true );
	this._leftKeyId = feng.keyboardController.bind( this._prevTipModule, feng.keyboardController.key.LEFT );
	this._rightKeyId = feng.keyboardController.bind( this._nextTipModule, feng.keyboardController.key.RIGHT );

	goog.array.forEach( this._tipModules, function(tipModule) {
		tipModule.activate();
	});
};


feng.views.book.Book.prototype.deactivate = function() {

	this._eventHandler.removeAll();

	feng.keyboardController.unbind( this._enterKeyId );
	feng.keyboardController.unbind( this._leftKeyId );
	feng.keyboardController.unbind( this._rightKeyId );

	goog.array.forEach( this._tipModules, function(tipModule) {
		tipModule.deactivate();
	});
};


feng.views.book.Book.prototype.resize = function() {

	this._viewportSize = feng.viewportSize;

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

	// set scrubber limits
	var tipModuleTotalWidth = goog.array.reduce(this._tipModuleWidths, this._sumFunc, 0); 
	this._scrubberWidth = goog.style.getSize(this._scrubberEl).width;
	this._handleWidth = this._viewportSize.width / tipModuleTotalWidth * this._scrubberWidth;
	goog.style.setStyle(this._handleEl, 'width', this._handleWidth + 'px');
	this._draggerLimits.width = this._scrubberWidth - this._handleWidth;
	this._dragger.setLimits( this._draggerLimits );
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


feng.views.book.Book.prototype.animateIn = function( tipId ) {

	goog.style.showElement(this.domElement, true);

	this.activate();

	this.resize();

	// lock to tip if id supplied
	var tipModuleIndex = 0;

	if(tipId) {

		tipModuleIndex = goog.array.findIndex(this._tipModules, function(tipModule) {
			var el = tipModule.domElement;
			return (el.getAttribute('data-tip-id') === tipId);
		});
	}

	this.scrollToTipModule( tipModuleIndex, true );

	this.dispatchEvent( feng.events.EventType.ANIMATE_IN );

	// animate in
	this._animateInTweener.clear();

	var tipTweeners = [];

	var i = Math.max(0, tipModuleIndex - 2);
	var l = Math.min(tipModuleIndex + 2, this._tipModules.length);

	for( i = i; i <= l; i ++ ) {

		var tipModule = this._tipModules[i];
		var el = tipModule.domElement;

		TweenMax.set( el, {
			'x': tipModule.x + this._viewportSize.width
		});

		var tweener = TweenMax.to( el, 1.2, {
			'x': tipModule.x,
			'ease': Strong.easeOut
		});

		tipTweeners.push( tweener );
	}

	this._animateInTweener.add( tipTweeners, '+=0', 'start', .10 );
	this._animateInTweener.play();

	feng.soundController.playSfx('confirm');
};


feng.views.book.Book.prototype.animateOut = function( instant ) {

	goog.style.showElement(this.domElement, false);

	this.deactivate();

	feng.navigationController.replaceToken('');

	feng.soundController.playSfx('close');

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


feng.views.book.Book.prototype.scrollToTipModule = function( index, instant ) {

	goog.fx.anim.unregisterAnimation( this );

	if(this._activeTipModule) {
		this._activeTipModule.setActive(false);
	}

	this._activeTipIndex = index;
	this._activeTipModule = this._tipModules[ index ];

	this._activeTipModule.setActive(true);

	var scrollInfo = this.getScrollInfo();
	var finalTipModuleWidths = scrollInfo.widths;
	var leftX = scrollInfo.leftX;

	var widths = finalTipModuleWidths.slice(0, index);
	var tipModuleWidth = finalTipModuleWidths[ index ];
	var tipModuleX = goog.array.reduce(widths, this._sumFunc, 0);

	var scrollX = tipModuleX - (this._viewportSize.width - tipModuleWidth) / 2;

	var duration = instant ? 0 : .5;

	this._scrollTweener = TweenMax.to(this, duration, {
		_scrollX: scrollX,
		_targetScrollX: scrollX,
		'ease': Quad.easeInOut,
		'onUpdate': this.applyScrollX,
		'onUpdateScope': this
	});
};


feng.views.book.Book.prototype.prevTipModule = function() {

	if(this._scrollTweener && this._scrollTweener.isActive()) {
		return;
	}

	var index = Math.max(0, this._activeTipIndex - 1);
	this.scrollToTipModule( index );
};


feng.views.book.Book.prototype.nextTipModule = function() {

	if(this._scrollTweener && this._scrollTweener.isActive()) {
		return;
	}

	var index = Math.min(this._tipModules.length - 1, this._activeTipIndex + 1);
	this.scrollToTipModule( index );
};


feng.views.book.Book.prototype.applyScrollX = function() {

	goog.style.setStyle( this._scrollerInnerEl, 'transform', 'translateX(' + (-this._scrollX) + 'px)' );

	if(!this._dragger.isDragging()) {

		var scrollInfo = this.getScrollInfo();
		var leftX = scrollInfo.leftX;
		var rightX = scrollInfo.rightX;
		var scrollWidth = scrollInfo.scrollWidth;
		var ratio = (this._scrollX - leftX) / (rightX - leftX);
		var handleX = (this._scrubberWidth - this._handleWidth) * ratio;
		goog.style.setPosition( this._handleEl, handleX, 0 );
	}
};


feng.views.book.Book.prototype.updateTipCounter = function() {

	var numUnlocked = goog.array.count(this._tips, function(tip) {
		return tip.unlocked;
	});

	this._tipCounterEl.innerHTML = numUnlocked + '/' + this._tips.length;
};


feng.views.book.Book.prototype.onDrag = function( e ) {

	var ratio = Math.max(0, Math.min(1, this._dragger.deltaX / this._draggerLimits.width));
	var scrollInfo = this.getScrollInfo();
	var leftX = scrollInfo.leftX;
	var rightX = scrollInfo.rightX;

	this._targetScrollX = goog.math.lerp( leftX, rightX, ratio );
};


feng.views.book.Book.prototype.onDragStart = function( e ) {

	goog.fx.anim.registerAnimation( this );

	if(this._scrollTweener && this._scrollTweener.isActive()) {
		this._scrollTweener.kill();
	}

	goog.dom.classes.addRemove(this._scrollerEl, 'zoom-in', 'zoom-out');
};


feng.views.book.Book.prototype.onDragEnd = function( e ) {

	goog.dom.classes.addRemove(this._scrollerEl, 'zoom-out', 'zoom-in');
};


feng.views.book.Book.prototype.onTipModuleChange = function(e) {
 
	this.scrollToTipModule( e.target.index );
};


feng.views.book.Book.prototype.onTipModuleClose = function(e) {
 
 	this.animateOut();
};


feng.views.book.Book.prototype.onMouseWheel = function( e ) {

	// skip mousewheel if hovering on a tip module scroller
	var hoveringScroller = goog.array.find(this._tipModules, function(tipModule) {
		return (tipModule.isHoveringScroller() === true);
	});

	if(hoveringScroller) {
		return false;
	}

	//
	var delta = e.deltaX || e.deltaY;
	var scrollDist = goog.math.lerp( 0, this._viewportSize.width/4, delta/this._maxDelta );

	this._targetScrollX += scrollDist;

	var scrollInfo = this.getScrollInfo();
	var leftX = scrollInfo.leftX;
	var rightX = scrollInfo.rightX;

	this._targetScrollX = Math.max( Math.min( rightX, this._targetScrollX ), leftX );

	goog.fx.anim.registerAnimation( this );

	if(this._scrollTweener && this._scrollTweener.isActive()) {
		this._scrollTweener.kill();
	}
};


feng.views.book.Book.prototype.onAnimationFrame = function( now ) {

	this._scrollX += (this._targetScrollX - this._scrollX) * .1;
	this.applyScrollX();

	// if reached the target scroll x, stop animating and lock to the nearest tip module
	if( goog.math.nearlyEquals(this._scrollX, this._targetScrollX, 1) && !this._dragger.isDragging()) {

		goog.fx.anim.unregisterAnimation( this );

		this._scrollX = this._targetScrollX;

		var tipModuleIndex = this.getTipModuleIndexByX( this._scrollX );
		this.scrollToTipModule( tipModuleIndex );
	}
};


feng.views.book.Book.prototype.onNavigationChange = function( e ) {

	var navController = e.target;

	var shouldOpenBook = navController.testToken( e.tokenArray, feng.controllers.NavigationController.Token.BOOK );
	var tipToken = navController.testToken( e.tokenArray, feng.controllers.NavigationController.Token.READ_TIP );
	
	var tipId = tipToken ? tipToken['tipId'] : null;

	if(tipId) {
		shouldOpenBook = true;
	}

	if(shouldOpenBook) {
		this.animateIn( tipId );
	}
};


feng.views.book.Book.prototype.onTipUnlock = function( e ) {

	this.updateTipCounter();
};


feng.views.book.Book.prototype.onResize = function( e ) {

	this.resize();

	// lock to module
	this.scrollToTipModule( (this._activeTipIndex || 0) );
};