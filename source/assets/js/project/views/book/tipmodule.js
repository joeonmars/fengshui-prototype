goog.provide('feng.views.book.TipModule');

goog.require('goog.dom');
goog.require('goog.events.EventHandler');
goog.require('goog.math.Size');
goog.require('feng.events');


feng.views.book.TipModule = function( domElement, index, widthChangeCallback ) {

	goog.base(this);
	
	this.domElement = domElement;
	this._coverEl = goog.dom.getElementByClass('cover', this.domElement);

	this.index = index;
	
	this._widthChangeCallback = widthChangeCallback;

	this.size = new goog.math.Size();

	this._minSize = feng.views.book.TipModule.MIN_SIZE;
	this._aspectRatio = this._minSize.aspectRatio();

	this._ratioOfWidth = feng.views.book.TipModule.RATIO_OF_WIDTH;
	this._ratioOfMargin = feng.views.book.TipModule.RATIO_OF_MARGIN;

	this._margin = 0;
	this._coverWidth = 0;

	this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.views.book.TipModule, goog.events.EventTarget);


feng.views.book.TipModule.prototype.activate = function() {


};


feng.views.book.TipModule.prototype.deactivate = function() {

	this._eventHandler.removeAll();
};


feng.views.book.TipModule.prototype.getFinalWidth = function() {

	return this._coverWidth + this._margin * 2;
};


feng.views.book.TipModule.prototype.setActive = function( isActive ) {

	if(isActive) {

		goog.dom.classes.add(this.domElement, 'active');

		var coverSrc = this._coverEl.getAttribute('data-src');
		goog.style.setStyle(this._coverEl, 'background-image', 'url(' + coverSrc + ')');

	}else {

		goog.dom.classes.remove(this.domElement, 'active');
	}
};


feng.views.book.TipModule.prototype.setX = function( x ) {

	goog.style.setStyle( this.domElement, 'transform', 'translateX(' + x + 'px)' );
};


feng.views.book.TipModule.prototype.setSize = function( viewportSize ) {

	this._coverWidth = viewportSize.width * this._ratioOfWidth;
	this._coverWidth = Math.max(this._minSize.width, this._coverWidth);

	var height = this._coverWidth / this._aspectRatio;

	this._margin = viewportSize.width * this._ratioOfMargin;
	var widthIncludeMargins = this._coverWidth + this._margin * 2;

	this.size.width = widthIncludeMargins;
	this.size.height = height;

	goog.style.setSize( this._coverEl, this._coverWidth, height );
	goog.style.setSize( this.domElement, this.size );

	return this.size;
};


feng.views.book.TipModule.prototype.updateWidth = function() {

	goog.style.setSize( this.domElement, this.size );

	this._widthChangeCallback( this.index, this.size.width );
};


feng.views.book.TipModule.RATIO_OF_WIDTH = 0.25;
feng.views.book.TipModule.RATIO_OF_MARGIN = 0.045;
feng.views.book.TipModule.MIN_SIZE = new goog.math.Size(300, 470);