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

  this._blankIds = [];
  this._frameObjects = null;

  this._cols = 2;
  this._rows = this._numPictures / this._cols;

  this._liSize = new goog.math.Size( 350 / 2, 200 / 2 );

  this._liPositions = [];
	for(var i = 0; i < this._numPictures; i++) {
		this._liPositions.push({
			x: 0,
			y: 0
		})
	}

	// precalculate image positions & size
	goog.array.forEach(this._liPositions, function(position, index) {
		var col = index % this._cols;
		var row = Math.floor(index / this._cols);
		position.x = col * this._liSize.width;
		position.y = row * this._liSize.height;

		goog.style.setSize( this._liEls[index], this._liSize );
	}, this);

	var imgEls = goog.dom.query('img', this.domElement);

	this._imageSizes = goog.array.map(imgEls, function(img) {
		var size = new goog.math.Size(img.naturalWidth, img.naturalHeight);
		size.scaleToFit( this._liSize );

		goog.style.setSize(img, size);

		return size;
	}, this);

	this._imagePositions = goog.array.map(imgEls, function(img, index) {
		var size = this._imageSizes[ index ];
		var position = {
			x: (this._liSize.width - size.width) / 2,
			y: (this._liSize.height - size.height) / 2
		};

		goog.style.setPosition(img, position.x, position.y);

		return position;
	}, this);

	//
	this.updateLayout();
};
goog.inherits(feng.views.sections.controls.PictureSelector, feng.views.sections.controls.Controls);


feng.views.sections.controls.PictureSelector.prototype.activate = function( frameObjects ){

	goog.base(this, 'activate');

	this._frameObjects = frameObjects;

	this._eventHandler.listen( this._prevButtonEl, 'click', this.onClick, false, this );
	this._eventHandler.listen( this._nextButtonEl, 'click', this.onClick, false, this );

	this._eventHandler.listen( this._dragger, goog.fx.Dragger.EventType.START, this.onDragStart, false, this );
	this._eventHandler.listen( this._dragger, goog.fx.Dragger.EventType.END, this.onDragEnd, false, this );

	this._dragger.setEnabled( true );
};


feng.views.sections.controls.PictureSelector.prototype.deactivate = function(){

	goog.base(this, 'deactivate');

	this._dragger.setEnabled( false );
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


feng.views.sections.controls.PictureSelector.prototype.updateLayout = function(){

	var i = 0;

	goog.array.forEach(this._liPositions, function(position, index) {

		if(goog.array.contains(this._blankIds, index)) return;

		var col = i % this._cols;
		var row = Math.floor(i / this._cols);
		position.x = col * this._liSize.width;
		position.y = row * this._liSize.height;

		i ++;

	}, this);

	goog.array.forEach(this._liEls, function(liEl, index) {

		var shouldShow = !goog.array.contains(this._blankIds, index);
		var position = this._liPositions[ index ];

		goog.style.setStyle(liEl, {
			'transform': 'translate(' + position.x + 'px,' + position.y + 'px)',
			'display': shouldShow ? 'block' : 'none'
		});

	}, this);
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

	console.log(this._imgEl, this._dragId);
};


feng.views.sections.controls.PictureSelector.prototype.onDragEnd = function(e) {

	// if not hit on any frame object, restore image back to the list
	var object = this.hitTestFrameObjects();

	if(!object) {
		goog.array.remove(this._blankIds, this._dragId);
	}

	this.updateLayout();

	this._imgEl.src = '';
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