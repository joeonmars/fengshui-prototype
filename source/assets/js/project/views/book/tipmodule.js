goog.provide('feng.views.book.TipModule');

goog.require('goog.dom');
goog.require('goog.events.EventHandler');
goog.require('goog.math.Size');
goog.require('feng.events');
goog.require('feng.utils.Utils');


feng.views.book.TipModule = function( domElement, index, widthChangeCallback ) {

	goog.base(this);
	
	this.domElement = domElement;
	this._cardEl = goog.dom.getElementByClass('card', this.domElement);
	this._shareButtons = goog.dom.query('.share a', this.domElement);

	this.index = index;
	
	this._widthChangeCallback = widthChangeCallback;

	this.x = 0;
	this.size = new goog.math.Size();

	this._minSize = feng.views.book.TipModule.MIN_SIZE;
	this._aspectRatio = this._minSize.aspectRatio();

	this._ratioOfWidth = feng.views.book.TipModule.RATIO_OF_WIDTH;
	this._ratioOfMargin = feng.views.book.TipModule.RATIO_OF_MARGIN;

	this._margin = 0;
	this._coverWidth = 0;

	this._imageLoaded = false;

	this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.views.book.TipModule, goog.events.EventTarget);


feng.views.book.TipModule.prototype.activate = function() {

	this._eventHandler.listen( this.domElement, 'click', this.onClick, false, this );

	goog.array.forEach(this._shareButtons, function(shareButton) {
		this._eventHandler.listen( shareButton, 'click', this.onClickShareButton, false, this );
	}, this);
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

		if(!this._imageLoaded) {
			
			var screenEl = goog.dom.getElementByClass('screen', this.domElement);

			var img = new Image();
			img.src = screenEl.getAttribute('data-src');

			goog.events.listenOnce(img, 'load', function() {
				goog.style.setStyle(screenEl, 'background-image', 'url(' + img.src + ')');
				goog.dom.classes.enable( screenEl, 'loaded', true );
			});
		}

	}else {

		goog.dom.classes.remove(this.domElement, 'active');
	}
};


feng.views.book.TipModule.prototype.setX = function( x ) {

	this.x = x;
	goog.style.setStyle( this.domElement, 'transform', 'translateX(' + x + 'px)' );
};


feng.views.book.TipModule.prototype.setSize = function( viewportSize ) {

	this._coverWidth = viewportSize.width * this._ratioOfWidth;
	this._coverWidth = Math.max(this._minSize.width, this._coverWidth);

	var maxHeight = Math.max(450, viewportSize.height * .7);
	var height = Math.min(maxHeight, this._coverWidth / this._aspectRatio);

	this._coverWidth = height * this._aspectRatio;

	this._margin = viewportSize.width * this._ratioOfMargin;
	var widthIncludeMargins = this._coverWidth + this._margin * 2;

	this.size.width = widthIncludeMargins;
	this.size.height = height;

	goog.style.setSize( this._cardEl, this._coverWidth, height );
	goog.style.setSize( this.domElement, this.size );

	return this.size;
};


feng.views.book.TipModule.prototype.updateWidth = function() {

	goog.style.setSize( this.domElement, this.size );

	this._widthChangeCallback( this.index, this.size.width );
};


feng.views.book.TipModule.prototype.onClick = function(e) {

	this.dispatchEvent( feng.events.EventType.CHANGE );
};


feng.views.book.TipModule.prototype.onClickShareButton = function(e) {

  e.preventDefault();

  feng.utils.Utils.popUp( e.currentTarget.href );
};


feng.views.book.TipModule.RATIO_OF_WIDTH = 0.25;
feng.views.book.TipModule.RATIO_OF_MARGIN = 0.045;
feng.views.book.TipModule.MIN_SIZE = new goog.math.Size(300, 470);