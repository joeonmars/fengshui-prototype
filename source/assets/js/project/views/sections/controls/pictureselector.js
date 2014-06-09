goog.provide('feng.views.sections.controls.PictureSelector');

goog.require('goog.events');
goog.require('feng.fx.Dragger');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.PictureSelector = function(pictures){

	var domElement = null;

  goog.base(this, domElement);

  // look up parent as the placeholder for image dragger
  var parent = this.domElement.parentNode;

  while(!goog.dom.classes.has(parent, 'captionView')) {
  	parent = parent.parentNode;
  }

  this._captionViewEl = parent;

  // create dragger for dragging images from list or object3d
  this._dragger = new goog.fx.Dragger( this._captionViewEl );
  this._dragger.setHysteresis( 2 );
  this._dragger.defaultAction = goog.bind(this.onDrag, this);

  this._prevButtonEl = goog.dom.getElementByClass('prev', this.domElement);
  this._nextButtonEl = goog.dom.getElementByClass('next', this.domElement);
 
 	this._ulEl = goog.dom.query('ul', this.domElement);
  this._liEls = goog.dom.getChildren( this._ulEl );

  this._imgEl = null;

  this._dragId = 0;
  this._pageId = 0;

  this._numPicturesOfPage = 4;
  this._numPictures = pictures.length;
  this._numPages = Math.ceil( this._numPictures / this._numPicturesOfPage );

  this._blankIds = [];
  this._frameObjects = null;

  this._cols = 2;
  this._rows = this._numPictures / this._cols;
  this._liSize = new goog.math.Size( 350 / this._cols, 200 / this._rows );

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
	}, this);

	var imgEls = goog.dom.query('img', this._ulEl);

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
		}

		goog.style.setPosition(img, position);

		return position;
	}, this);
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

	var boxInScreen = goog.style.getBounds( this._imgEl );
	var resultObject = goog.array.find(this._frameObjects, function(object) {
		return true;
	});

	return resultObject;
};


feng.views.sections.controls.PictureSelector.prototype.updateLayout = function(){


};


feng.views.sections.controls.PictureSelector.prototype.onDragStart = function(e) {

	this._imgEl = e.target;

	this._dragId = parseInt( this._imgEl.getAttribute('data-id') );
	this._blankIds.push( this._dragId );
	goog.dom.appendChild(this._captionViewEl, this._imgEl);

	//goog.style.setPosition(this._imgEl, this._dragger.startX, this._dragger.startY);

	this.updateLayout();

	console.log(this._imgEl, this._dragId);
};


feng.views.sections.controls.PictureSelector.prototype.onDragEnd = function(e) {

	// if not hit on any frame object, restore image back to the list
	var object = this.hitTestFrameObjects();

	if(!object) {
		goog.array.remove(this._blankIds, this._dragId);
		goog.dom.appendChild( this._liEls[this._dragId], this._imgEl );
		goog.style.setSize(this._imgEl, this._imageSizes[this._dragId]);
	}

	this.updateLayout();

	this._imgEl = null;
};


feng.views.sections.controls.PictureSelector.prototype.onDrag = function(x, y) {

	if(!this._imgEl) return;

	var object = this.hitTestFrameObjects();
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