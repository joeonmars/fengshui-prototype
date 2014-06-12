goog.provide('feng.views.sections.controls.PictureSelector');

goog.require('goog.events');
goog.require('goog.fx.Dragger');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.PictureSelector = function(domElement, pictures){

  goog.base(this, domElement);

  // create dragger for dragging images from list or object3d
  this._dragger = new goog.fx.Dragger( document.body );
  this._dragger.setHysteresis( 2 );
  this._dragger.defaultAction = goog.bind(this.onDrag, this);

  this._prevButtonEl = goog.dom.getElementByClass('prev', this.domElement);
  this._nextButtonEl = goog.dom.getElementByClass('next', this.domElement);
 
 	this._ulEl = goog.dom.query('ul', this.domElement)[0];
  this._liEls = goog.dom.query('li', this._ulEl);

  this._imgEl = goog.dom.getElementByClass('dragger', this.domElement.parentNode.parentNode);

  this._dragId = 0;
  this._pageId = 0;

  this._numPicturesOfPage = 4;
  this._numPictures = pictures.length;

  this._pages = [];

  this._blankIds = [];
  this._frameObjects = null;

  this._animTimer = new goog.Timer(150);
  this._animIds = [];

  this._mousePosition = {x: 0, y: 0};

  this._lastMousePosition = {x: 0, y: 0};

  this._imageRotation = {x: 0, y: 0};

  this._cols = 2;
  this._rows = this._numPictures / this._cols;

  this._margin = 12;
  this._gridSize = new goog.math.Size( 312, 236 );
  this._liSize = new goog.math.Size( (this._gridSize.width - this._margin) / 2, (this._gridSize.height - this._margin) / 2 );

  this._liPositions = [];
	for(var i = 0; i < this._numPictures; i++) {
		this._liPositions.push({x: 0, y: 0});
	}

	goog.array.forEach(this._liEls, function(liEl, index) {
		goog.style.setStyle(liEl, {
			'width': this._liSize.width + 'px',
			'height': this._liSize.height + 'px',
			'z-index': this._numPictures - 1 - index
		});
	}, this);

	this._pageTweener = new TimelineMax();
};
goog.inherits(feng.views.sections.controls.PictureSelector, feng.views.sections.controls.Controls);


feng.views.sections.controls.PictureSelector.prototype.activate = function( frameObjects ){

	goog.base(this, 'activate');

	this._frameObjects = frameObjects;

	this._eventHandler.listen( this._animTimer, goog.Timer.TICK, this.onTick, false, this );

	this._eventHandler.listen( this._prevButtonEl, 'click', this.onClick, false, this );
	this._eventHandler.listen( this._nextButtonEl, 'click', this.onClick, false, this );

	this._eventHandler.listen( this._dragger, goog.fx.Dragger.EventType.START, this.onDragStart, false, this );
	this._eventHandler.listen( this._dragger, goog.fx.Dragger.EventType.END, this.onDragEnd, false, this );

	this._dragger.setEnabled( true );

	goog.fx.anim.registerAnimation( this );

	this.updateLayout( true );

	this.gotoPage( 0 );
};


feng.views.sections.controls.PictureSelector.prototype.deactivate = function(){

	goog.base(this, 'deactivate');

	this._dragger.setEnabled( false );

	goog.fx.anim.unregisterAnimation( this );
};


feng.views.sections.controls.PictureSelector.prototype.prevPage = function() {

	var minPageId = 0;

	if(this._pageId > minPageId) {
		this.gotoPage( Math.max(minPageId, this._pageId - 1) );
	}
};


feng.views.sections.controls.PictureSelector.prototype.nextPage = function() {

	var maxPageId = this._pages.length - 1;

	if(this._pageId < maxPageId) {
		this.gotoPage( Math.min(maxPageId, this._pageId + 1) );
	}
};


feng.views.sections.controls.PictureSelector.prototype.gotoPage = function( id ) {

	var oldPageId = this._pageId;
	var newPageId = id;

	this._pageId = newPageId;

	var minPageId = 0;
	var maxPageId = this._pages.length - 1;

	goog.dom.classes.enable(this._prevButtonEl, 'inactive', (newPageId === minPageId));
	goog.dom.classes.enable(this._nextButtonEl, 'inactive', (newPageId === maxPageId));

	// animate page transition
	this._pageTweener.clear();

	var oldPageTweeners = goog.array.map(this._pages[oldPageId], function(id) {
		return TweenMax.fromTo(this._liEls[id], .2, {
			'opacity': 1,
			'top': 0,
		}, {
			'opacity': 0,
			'top': ((newPageId > oldPageId) ? -10 : 10) + 'px',
			'clearProps': 'top',
			'ease': Strong.easeOut
		});
	}, this);

	this._pageTweener.add(oldPageTweeners, '+=0', 'start', .05);

	this._pageTweener.add(TweenMax.to(this._ulEl, .05, {
		'y': - newPageId * (this._gridSize.height + this._margin)
	}), '+=0');

	var newPageTweeners = goog.array.map(this._pages[newPageId], function(id) {
		return TweenMax.fromTo(this._liEls[id], .2, {
			'opacity': 0,
			'top': ((newPageId > oldPageId) ? 10 : -10) + 'px'
		}, {
			'opacity': 1,
			'top': 0,
			'clearProps': 'top',
			'ease': Strong.easeOut
		});
	}, this);

	this._pageTweener.add(newPageTweeners, '+=0', 'start', .05);
};


feng.views.sections.controls.PictureSelector.prototype.hitTestFrameObjects = function() {
/*
	var boxInScreen = goog.style.getBounds( this._imgEl );
	var resultObject = goog.array.find(this._frameObjects, function(object) {
		return true;
	});

	return resultObject;*/
};


feng.views.sections.controls.PictureSelector.prototype.updateLayout = function( instant ){

	var freeIds = [];

	goog.array.forEach(this._liPositions, function(position, index) {

		var isFree = !goog.array.contains(this._blankIds, index);
		if(isFree) freeIds.push( index );

	}, this);

	// calculate pages
	this._pages = [];

	var i, l = freeIds.length / this._numPicturesOfPage;

	for(i = 0; i < l; i++) {
		var start = i * this._numPicturesOfPage;
		var end = start + this._numPicturesOfPage;
		var pageIds = freeIds.slice(start, end);
		this._pages.push( pageIds );
	}

	// reposition free li elements
	goog.array.forEach(freeIds, function(freeId, index) {

		var position = this._liPositions[ freeId ];

		var col = index % this._cols;
		var row = Math.floor(index / this._cols);
		position.x = col * this._liSize.width + col * this._margin;
		position.y = row * this._liSize.height + row * this._margin;

	}, this);

	//
	goog.array.forEach(this._liEls, function(liEl, index) {

		var visible = goog.array.contains( freeIds, index );

		goog.style.setStyle(liEl, {
			'display': (visible ? 'block' : 'none')
		});

	}, this);

	//
	this._animIds = [];

	//
	goog.array.forEach(this._liPositions, function(toPosition, index) {

		var liEl = this._liEls[ index ];
		var fromPosition = goog.style.getCssTranslation( liEl );

		if( !goog.math.Coordinate.equals( fromPosition, toPosition ) && !goog.array.contains(this._blankIds, index) ) {
			this._animIds.push( index );
		}

	}, this);

	if(instant) {

		this._animTimer.stop();

		var i, l = this._animIds.length;
		for(var i = 0; i < l; i++) {
			this.onTick();
		}

	}else {

		this._animTimer.start();
	}
};


feng.views.sections.controls.PictureSelector.prototype.onDragStart = function(e) {

	var target = e.browserEvent.target;
	var dragId = parseInt( target.getAttribute('data-id') );

	this._dragId = dragId;
	this._blankIds.push( dragId );

	var targetPagePosition = goog.style.getPageOffset(target);
	var offsetX = targetPagePosition.x - this._dragger.clientX;
	var offsetY = targetPagePosition.y - this._dragger.clientY;

	offsetX = target.naturalWidth * (offsetX / target.width);
	offsetY = target.naturalHeight * (offsetY / target.height);

	this._imgEl.src = target.src;

	goog.style.setStyle(this._imgEl, {
		'margin-left': offsetX + 'px',
		'margin-top': offsetY + 'px'
	});

	goog.style.setPosition(this._imgEl, this._dragger.startX, this._dragger.startY);

	this.updateLayout();

	//console.log(this._imgEl, this._dragId);

	feng.utils.Utils.setCursor('move');
};


feng.views.sections.controls.PictureSelector.prototype.onDragEnd = function(e) {

	// if not hit on any frame object, restore image back to the list
	var object = this.hitTestFrameObjects();

	if(!object) {
		goog.array.remove(this._blankIds, this._dragId);
	}

	this.updateLayout();

	this._imgEl.src = '';

	feng.utils.Utils.setCursor(null);
};


feng.views.sections.controls.PictureSelector.prototype.onDrag = function(x, y) {

	if(this._imgEl.src === '') return;

	var object = this.hitTestFrameObjects();

	goog.style.setPosition(this._imgEl, this._dragger.clientX, this._dragger.clientY);
};


feng.views.sections.controls.PictureSelector.prototype.onClick = function(e) {

	if(this._pageTweener.isActive()) return false;

	switch(e.currentTarget) {
		case this._prevButtonEl:
		this.prevPage();
		break;

		case this._nextButtonEl:
		this.nextPage();
		break;
	}
};


feng.views.sections.controls.PictureSelector.prototype.onTick = function(e) {

	var animId = this._animIds.shift();

	var liEl = this._liEls[ animId ];
	var position = this._liPositions[ animId ];
	var inCurrentPage = goog.array.contains( this._pages[this._pageId], animId );

	TweenMax.to(liEl, .5, {
		'x': position.x,
		'y': position.y,
		'ease': Quint.easeOut
	});

	if(this._animIds.length === 0) {
		this._animTimer.stop();
	}
};


feng.views.sections.controls.PictureSelector.prototype.onAnimationFrame = function(now) {

	if(this._dragger.isDragging()) {

		this._lastMousePosition.x = this._mousePosition.x;
		this._lastMousePosition.y = this._mousePosition.y;

		this._mousePosition.x = this._dragger.clientX;
		this._mousePosition.y = this._dragger.clientY;

		var mouseDeltaX = this._mousePosition.x - this._lastMousePosition.x;
		var mouseDeltaY = this._mousePosition.y - this._lastMousePosition.y;
		
		var targetRotationY = goog.math.clamp(mouseDeltaX, -30, 30);
		var targetRotationX = - goog.math.clamp(mouseDeltaY, -30, 30);

		this._imageRotation.x += (targetRotationX - this._imageRotation.x) * .05;
		this._imageRotation.y += (targetRotationY - this._imageRotation.y) * .05;

		goog.style.setStyle(this._imgEl, {
			'transform': 'rotateX(' + this._imageRotation.x + 'deg) rotateY(' + this._imageRotation.y + 'deg)'
		});
	}
};