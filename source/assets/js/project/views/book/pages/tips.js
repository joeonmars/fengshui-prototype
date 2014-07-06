goog.provide('feng.views.book.pages.Tips');

goog.require('goog.events.MouseWheelHandler');
goog.require('goog.math.Box');
goog.require('goog.math.Size');
goog.require('goog.math.Rect');
goog.require('goog.fx.Dragger');
goog.require('feng.events');
goog.require('feng.views.book.pages.Page');
goog.require('feng.models.achievements.Achievements');


feng.views.book.pages.Tips = function( domElement ) {

	goog.base(this, domElement);

	this._tipEls = goog.dom.query('.tip', this.domElement);

	var achievements = feng.models.achievements.Achievements.getInstance();
  this._tips = achievements.getAllTips();

  goog.array.forEach(this._tips, function(tip, index) {

  	// test storage...
  	//tip.unlocked = (Math.random() < .5);
  	//if(tip.unlocked) feng.storageController.onTipUnlocked( tip.id );

  	var iconCanvas = goog.dom.query('canvas', this._tipEls[index])[0];
  	iconCanvas = tip.getIcon(40, '#FFFDF1', iconCanvas);

    tip.listenOnce(feng.events.EventType.UNLOCK, this.onUnlock, false, this);
  }, this);

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
  this._scrubberDragger.defaultAction = goog.nullFunction;

  // for tip blocks alignment
  this._blocks = goog.array.map(this._tips, function(tip) {
  	return new goog.math.Box(0, 0, 0, 0);
  });

  this._unlockedBlockTypes = [
  	{
  		classname: 'unlocked1',
  		size: new goog.math.Size(360, 206)
  	},
  	{
  		classname: 'unlocked2',
  		size: new goog.math.Size(375, 206)
  	}
  ];

  this._lockedBlockType = {
  		classname: 'locked',
  		size: new goog.math.Size(104, 206)
  };

  this._colors = ['red', 'black', 'yellow'];

  this.updateLayout();
};
goog.inherits(feng.views.book.pages.Tips, feng.views.book.pages.Page);


feng.views.book.pages.Tips.prototype.updateLayout = function() {

	var i, l = this._tips.length;
	var odd = 0, even = 0;
	var margin = 400;

	this._scrollWidth = 0;

	for(i = 0; i < l; i ++) {

		var tip = this._tips[i];
		var unlocked = tip.unlocked;

		if(i%2 === 0) {
			even ++;
		}else {
			odd ++;
		}

		var unlockedBlockType = (i%2 === 0) ? this._unlockedBlockTypes[even%2] : this._unlockedBlockTypes[(1 - odd%2)];
		var blockType = unlocked ? unlockedBlockType : this._lockedBlockType;
		var size = blockType.size;
		var classname = blockType.classname;
		var isUp = (i%2 === 0);
		var isDown = !isUp;
		var y = (isUp ? 0 : 1) * size.height;

		var lastBlockOfSameRow = this._blocks[i-2];
		var lastBlockOfDiffRow = this._blocks[i-1];

		var x = margin;

		if(lastBlockOfDiffRow) {
			var isLockedType = (lastBlockOfDiffRow.right - lastBlockOfDiffRow.left === this._lockedBlockType.size.width);
			if(isLockedType) {
				x = lastBlockOfDiffRow.right;
			}else {
				x = lastBlockOfDiffRow.left + (lastBlockOfDiffRow.right - lastBlockOfDiffRow.left)/2;
			}
		}

		if(lastBlockOfSameRow) {
			x = Math.max(x, lastBlockOfSameRow.right);
		}

		var block = this._blocks[i];
		block.top = y;
		block.bottom = y + size.height;
		block.left = x;
		block.right = x + size.width + ((i === l-1) ? margin : 0);

		this._scrollWidth = Math.max( block.right, this._scrollWidth );

		var tipEl = this._tipEls[i];
		goog.style.setStyle(tipEl, {
			'width': (block.right - block.left) + 'px',
			'height': size.height + 'px',
			'top': block.top + 'px',
			'left': block.left + 'px'
		});

		var color = this._colors[i%this._colors.length];
		goog.dom.classes.add( tipEl, color );

		if(unlocked) {
			goog.dom.classes.addRemove(tipEl, 'locked', 'unlocked');
			goog.dom.classes.add(tipEl, unlockedBlockType.classname);
		}

		if(isUp) {
			goog.dom.classes.add(tipEl, 'up');
		}

		if(isDown) {
			goog.dom.classes.add(tipEl, 'down');
		}
	}
};


feng.views.book.pages.Tips.prototype.activate = function() {

	goog.base(this, 'activate');

	this._eventHandler.listen( this._scrubberDragger, goog.fx.Dragger.EventType.DRAG, this.onDragScrubber, false, this );
	this._eventHandler.listen( this._mouseWheelHandler, goog.events.MouseWheelHandler.EventType.MOUSEWHEEL, this.onMouseWheel, false, this);

	this._draggable.enable();
};


feng.views.book.pages.Tips.prototype.deactivate = function() {

	goog.base(this, 'deactivate');

	this._draggable.disable();
};


feng.views.book.pages.Tips.prototype.animateIn = function() {

	goog.base(this, 'animateIn');
};


feng.views.book.pages.Tips.prototype.animateOut = function( instant ) {

	goog.base(this, 'animateOut', instant);
};


feng.views.book.pages.Tips.prototype.scrollTo = function( toScrollLeft ) {

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


feng.views.book.pages.Tips.prototype.onUnlock = function( e ) {

	var iconCanvas = goog.dom.query('li[data-tip-id="' + e.tip.id + '"] canvas', this._scrollerEl)[0];
  	iconCanvas = tip.getIcon(40, '#FFFDF1', iconCanvas);

	this.updateLayout();
};


feng.views.book.pages.Tips.prototype.onDragScrubber = function( e ) {

	var draggerX = Math.min(this._scrubberDraggerLimits.width, Math.max(0, e.dragger.deltaX));
	var ratio = draggerX / this._scrubberDraggerLimits.width;
	var scrollLeft = this._availableScrollWidth * ratio;
	
	this.scrollTo( scrollLeft );
};


feng.views.book.pages.Tips.prototype.onDraggableUpdate = function( e ) {

	var scrollLeft = this._scrollerEl.scrollLeft;
	var ratio = scrollLeft / this._availableScrollWidth;
	var handleX = this._scrubberDraggerLimits.width * ratio;
	goog.style.setPosition( this._handleEl, handleX, 0 );
};


feng.views.book.pages.Tips.prototype.onMouseWheel = function( e ) {

	var fromScrollLeft = this._scrollerEl.scrollLeft;

	var scrollDistance = 500;

	var toScrollLeft = fromScrollLeft + ((e.deltaY > 0) ? 1 : -1) * Math.max(50, scrollDistance);
	toScrollLeft = Math.max(0, Math.min(toScrollLeft, this._availableScrollWidth));

	this.scrollTo( toScrollLeft );
};


feng.views.book.pages.Tips.prototype.onResize = function( e ) {

	goog.base(this, 'onResize', e);

	var windowSize = goog.dom.getViewportSize();
	this._availableScrollWidth = this._scrollWidth - windowSize.width;

	var scrubberSize = goog.style.getSize( this._scrubberEl );
	var handleWidth = Math.ceil( scrubberSize.width * Math.min(1, windowSize.width / this._scrollWidth) );

	goog.style.setStyle(this._handleEl, 'width', handleWidth + 'px');

	this._scrubberDraggerLimits.width = scrubberSize.width - handleWidth;
	this._scrubberDragger.setLimits( this._scrubberDraggerLimits );
};