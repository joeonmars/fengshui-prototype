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
 
  this._liEls = goog.dom.query('li', this.domElement);

  this._imgEl = goog.dom.getElementByClass('dragger', this.domElement.parentNode.parentNode);

  this._dragId = 0;
  this._pageId = 0;

  this._numPicturesOfPage = 4;
  this._numPictures = pictures.length;
  this._numPages = Math.ceil( this._numPictures / this._numPicturesOfPage );

  this._pages = [];

  this._blankIds = [];
  this._frameObjects = null;

  this._animTimer = new goog.Timer(150);
  this._animIds = [];

  this._mousePosition = {
  	x: 0,
  	y: 0
  };

  this._lastMousePosition = {
  	x: 0,
  	y: 0
  };

  this._imageRotation = {
  	x: 0,
  	y: 0
  };

  this._cols = 2;
  this._rows = this._numPictures / this._cols;

  this._margin = 12;
  this._gridSize = new goog.math.Size( 312, 236 );
  this._liSize = new goog.math.Size( (this._gridSize.width - this._margin) / 2, (this._gridSize.height - this._margin) / 2 );

  this._liPositions = [];
	for(var i = 0; i < this._numPictures; i++) {
		this._liPositions.push({
			x: 0,
			y: 0
		})
	}

	goog.array.forEach(this._liEls, function(liEl) {
		goog.style.setSize( liEl, this._liSize );
	}, this);

	//
	this.updateLayout( true );
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

	this.enableTransition();
};


feng.views.sections.controls.PictureSelector.prototype.deactivate = function(){

	goog.base(this, 'deactivate');

	this._dragger.setEnabled( false );

	goog.fx.anim.unregisterAnimation( this );
};


feng.views.sections.controls.PictureSelector.prototype.enableTransition = function(){

	goog.array.forEach(this._liEls, function(liEl) {
		goog.dom.classes.add(liEl, 'transition');
	});
};


feng.views.sections.controls.PictureSelector.prototype.disableTransition = function(){

	goog.array.forEach(this._liEls, function(liEl) {
		goog.dom.classes.remove(liEl, 'transition');
	});
};


feng.views.sections.controls.PictureSelector.prototype.prevPage = function() {

	var pageId = Math.max(0, this._pageId - 1);

	if(this._pageId === pageId) return;
	else this._pageId = pageId;

	if(this._pageId === 0) {
		goog.dom.classes.add( this._prevButtonEl, 'inactive' );
	}else {
		goog.dom.classes.remove( this._prevButtonEl, 'inactive' );
	}
};


feng.views.sections.controls.PictureSelector.prototype.nextPage = function() {

	var pageId = Math.min(this._numPages - 1, this._pageId + 1);

	if(this._pageId === pageId) return;
	else this._pageId = pageId;

	if(this._pageId === this._numPages - 1) {
		goog.dom.classes.add( this._nextButtonEl, 'inactive' );
	}else {
		goog.dom.classes.remove( this._nextButtonEl, 'inactive' );
	}
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

	var i = 0;
	var visibleIds = [];

	goog.array.forEach(this._liPositions, function(position, index) {

		var shouldShow = !goog.array.contains(this._blankIds, index);
		if(!shouldShow) return;

		visibleIds.push( index );

		var col = i % this._cols;
		var row = Math.floor(i / this._cols);
		position.x = col * this._liSize.width + col * this._margin;
		position.y = row * this._liSize.height + row * this._margin;

		i ++;

	}, this);

	// calculate pages
	this._pages = [];

	var i, l = visibleIds.length / this._numPicturesOfPage;

	for(i = 0; i < l; i++) {
		var start = i * this._numPicturesOfPage;
		var end = start + this._numPicturesOfPage;
		var pageIds = visibleIds.slice(start, end);
		this._pages.push( pageIds );
	}

	//
	goog.array.forEach(this._liEls, function(liEl, index) {

		var shouldShow = goog.array.contains( visibleIds, index );

		goog.style.setStyle(liEl, {
			'visibility': (shouldShow ? 'visible' : 'hidden'),
			'opacity': (shouldShow ? 1 : 0)
		});

	}, this);

	//
	this._animIds = [];

	goog.array.forEach(this._liPositions, function(position, index) {

		var liEl = this._liEls[ index ];
		var currentPosition = goog.style.getCssTranslation( liEl );

		if( !goog.math.Coordinate.equals( currentPosition, position ) && !goog.array.contains(this._blankIds, index) ) {
			this._animIds.push( index );
		}

	}, this);

	if(instant) {

		this._animTimer.stop();
		
		for(var i = 0; i < this._animIds.length; i++) {
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

	goog.style.setStyle(liEl, {
		'transform': 'translate(' + position.x + 'px,' + position.y + 'px)',
		'opacity': (inCurrentPage ? 1 : 0)
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