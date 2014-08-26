goog.provide('feng.views.sections.controls.PictureSelector');

goog.require('goog.events');
goog.require('goog.fx.Dragger');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.PictureSelector = function(domElement, pictureDisplay){

  goog.base(this, domElement);

  // create dragger for dragging images from list or object3d
  this._dragger = new goog.fx.Dragger( document.body );
  this._dragger.setHysteresis( 2 );
  this._dragger.defaultAction = goog.bind(this.onDrag, this);

	this._prevButtonEl = goog.dom.getElementByClass('prev', this.domElement);
	this._nextButtonEl = goog.dom.getElementByClass('next', this.domElement);

	this._scrollerEl = goog.dom.query('ul', this.domElement)[0];
	this._liEls = goog.dom.query('li', this._scrollerEl);

  this._imgEl = goog.dom.getElementByClass('dragger', this.domElement.parentNode.parentNode);

  this._dragId = 0;
  this._pageId = 0;

  this._pictureDisplay = pictureDisplay;

  this._numPicturesOfPage = 4;
  this._numPictures = this._pictureDisplay.pictures.length;
	this._numPages = 0;

  this._pages = [];

  this._usedIds = [];

  this._mousePosition = new goog.math.Coordinate();
  this._lastMousePosition = new goog.math.Coordinate();

  this._imageRotation = {x: 0, y: 0};

  this._imageSize = new goog.math.Size( 0, 0 );
};
goog.inherits(feng.views.sections.controls.PictureSelector, feng.views.sections.controls.Controls);


feng.views.sections.controls.PictureSelector.prototype.activate = function(){

  var shouldActivate = goog.base(this, 'activate');

  if(!shouldActivate) return;

	this._eventHandler.listen( this._prevButtonEl, 'click', this.onClick, false, this );
	this._eventHandler.listen( this._nextButtonEl, 'click', this.onClick, false, this );

	this._eventHandler.listen( this._dragger, goog.fx.Dragger.EventType.START, this.onDragStart, false, this );
	this._eventHandler.listen( this._dragger, goog.fx.Dragger.EventType.END, this.onDragEnd, false, this );

	this._eventHandler.listen( this._pictureDisplay, feng.events.EventType.CHANGE, this.onObjectChange, false, this );

	this._dragger.setEnabled( true );

	goog.fx.anim.registerAnimation( this );

	this.updateLayout( true );

	this.gotoPage( 0 );

	this._pictureDisplay.startInteraction();
};


feng.views.sections.controls.PictureSelector.prototype.deactivate = function(){

  var shouldDeactivate = goog.base(this, 'deactivate');

  if(!shouldDeactivate) return;
  
	this._dragger.setEnabled( false );

	goog.fx.anim.unregisterAnimation( this );

	this._pictureDisplay.stopInteraction();
};


feng.views.sections.controls.PictureSelector.prototype.getImgById = function( id ) {

	return this._pictureDisplay.pictures[id].img;
};


feng.views.sections.controls.PictureSelector.prototype.prevPage = function() {

	var minPageId = 0;
	var pageId = Math.max(minPageId, this._pageId - 1);

	this.gotoPage( pageId );
};


feng.views.sections.controls.PictureSelector.prototype.nextPage = function() {

	var maxPageId = this._numPages - 1;
	var pageId = Math.min(maxPageId, this._pageId + 1);

	this.gotoPage( pageId );
};


feng.views.sections.controls.PictureSelector.prototype.gotoPage = function( id ) {

	this._pageId = id;

	var minPageId = 0;
	var maxPageId = this._numPages - 1;

	var isFirstPage = (this._pageId === minPageId);
	var isLastPage = (this._pageId === maxPageId);

	goog.dom.classes.enable(this._prevButtonEl, 'disabled', isFirstPage);
	goog.dom.classes.enable(this._nextButtonEl, 'disabled', isLastPage);

	// animate page transition
	var scrollLeft = goog.style.getSize( this._scrollerEl ).width * this._pageId;

	if(isLastPage) scrollLeft = 'max';

	TweenMax.to(this._scrollerEl, .4, {
		'scrollTo': {
			'x': scrollLeft
		},
		'ease': Quad.easeOut
	});
};


feng.views.sections.controls.PictureSelector.prototype.updateLayout = function( instant ){

	var numUnused = 0;

	goog.array.forEach(this._liEls, function(liEl) {

		var id = parseInt( liEl.getAttribute('data-id') );
		var isUsed = goog.array.contains(this._usedIds, id);

		goog.dom.classes.enable( liEl, 'used', isUsed );

		if(!isUsed) numUnused ++;

	}, this);

	this._numPages = Math.ceil( numUnused / this._numPicturesOfPage );

	var newPageId = Math.max(0, Math.min(this._pageId, this._numPages - 1));

	if(this._pageId !== newPageId) {
		this._pageId = newPageId;
		this.gotoPage( this._pageId );
	}
};


feng.views.sections.controls.PictureSelector.prototype.onDragStart = function(e) {

	var target = e.browserEvent.target;

	// return if drag not started on a thumbnail
	if(!goog.dom.classes.has(target, 'thumbnail')) {
		return false;
	}

	// drag on thumbnail
	var thumb = target;
	var dragId = parseInt( thumb.getAttribute('data-id') );
	var img = this.getImgById( dragId );

	this._dragId = dragId;
	this._usedIds.push( dragId );

	var thumbPagePosition = goog.style.getPageOffset( thumb );
	var offsetX = thumbPagePosition.x - this._dragger.clientX;
	var offsetY = thumbPagePosition.y - this._dragger.clientY;

	var thumbSize = goog.style.getSize( thumb );

	offsetX = img.naturalWidth * (offsetX / thumbSize.width);
	offsetY = img.naturalHeight * (offsetY / thumbSize.height);

	this._imgEl.src = img.src;
	this._imgEl.setAttribute('data-id', thumb.getAttribute('data-id'));

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

	var src = this._imgEl.src;
	var id = parseInt( this._imgEl.getAttribute('data-id') );

	this._imageSize.width = this._imgEl.naturalWidth;
	this._imageSize.height = this._imgEl.naturalHeight;

	this._imgEl.src = '';
	this._imgEl.setAttribute('data-id', '');

	feng.utils.Utils.setCursor(null);

	// dispatch a drag end event
	this._pictureDisplay.dispatchEvent({
		type: feng.events.EventType.DRAG_END,
		src: src,
		id: id,
		size: this._imageSize
	});
};


feng.views.sections.controls.PictureSelector.prototype.onDrag = function(x, y) {

	if(this._imgEl.src === '') return;

	goog.style.setPosition(this._imgEl, this._mousePosition);

	// dispatch a drag event with global mouse position
	this._pictureDisplay.dispatchEvent({
		type: feng.events.EventType.DRAG,
		mousePosition: this._mousePosition
	});

	// 
	var opacity = (this._pictureDisplay.hasIntersected ? .5 : 1);
	goog.style.setOpacity(this._imgEl, opacity);
};


feng.views.sections.controls.PictureSelector.prototype.onObjectChange = function(e) {

	if(goog.isNumber(e.idToUse)) {
		goog.array.insert(this._usedIds, e.idToUse);
	}

	if(goog.isNumber(e.idToReturn)) {
		goog.array.remove(this._usedIds, e.idToReturn);
	}

	this.updateLayout();
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


feng.views.sections.controls.PictureSelector.prototype.onAnimationFrame = function(now) {

	this._lastMousePosition.x = this._mousePosition.x;
	this._lastMousePosition.y = this._mousePosition.y;

	this._mousePosition.x = this._dragger.clientX;
	this._mousePosition.y = this._dragger.clientY;
	
	if(this._dragger.isDragging()) {

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


feng.views.sections.controls.PictureSelector.prototype.onResize = function ( e ) {

	goog.base(this, 'onResize', e);

	this.gotoPage( this._pageId );
};