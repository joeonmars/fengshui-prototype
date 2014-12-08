goog.provide('feng.views.helpers.Helper');

goog.require('goog.style');

/**
 * @constructor
 */
feng.views.helpers.Helper = function( domElement ){

  goog.base(this);

  this.domElement = domElement;

  this._closeButton = goog.dom.getElementByClass('close-button', this.domElement);

  this._x = 0;
  this._y = 0;

  this._size = goog.style.getSize( this.domElement );
  this._box = new goog.math.Box();

  this._positionPriority = feng.views.helpers.Helper.POSITION_PRIORITY.HORIZONTAL;

  this._arrowClasses = ['arrow-left', 'arrow-right', 'arrow-top', 'arrow-bottom'];

  this.hasOtherWidgetShown = false;
  this.isShown = false;
  this.isCompleted = false;
};
goog.inherits(feng.views.helpers.Helper, goog.events.EventTarget);


feng.views.helpers.Helper.prototype.disposeInternal = function() {

  goog.base(this, 'disposeInternal');

  this.deactivate();

  this._closeButton = null;
};


feng.views.helpers.Helper.prototype.activate = function() {

	goog.events.listen( this._closeButton, 'click', this.doComplete, false, this );
	goog.events.listen( window, 'resize', this.onResize, false, this );

	feng.pubsub.subscribe( feng.PubSub.Topic.SHOW_WIDGET, this.onShowWidget, this );
	feng.pubsub.subscribe( feng.PubSub.Topic.HIDE_WIDGET, this.onHideWidget, this );

	this.hasOtherWidgetShown = (feng.pubsub.getShownWidgets().length > 0);

	this._size = goog.style.getSize( this.domElement );
};


feng.views.helpers.Helper.prototype.deactivate = function() {

  	goog.events.unlisten( this._closeButton, 'click', this.doComplete, false, this );
  	goog.events.unlisten( window, 'resize', this.onResize, false, this );
};


feng.views.helpers.Helper.prototype.show = function( box ) {

	if(this.isShown) return;
	else this.isShown = true;

	goog.dom.classes.enable( this.domElement, 'shown', true );

	if(box) {
	
		this.calculatePosition( box );

		this.updatePosition();
	}

	feng.pubsub.publish( feng.PubSub.Topic.SHOW_WIDGET, this );
};


feng.views.helpers.Helper.prototype.hide = function() {

	if(!this.isShown) return;
	else this.isShown = false;

	goog.dom.classes.enable( this.domElement, 'shown', false );

	feng.pubsub.publish( feng.PubSub.Topic.HIDE_WIDGET, this );
};


feng.views.helpers.Helper.prototype.doComplete = function() {

	this.isCompleted = true;

	this.deactivate();

	this.hide();

	this.dispatchEvent( feng.events.EventType.COMPLETE );
};


feng.views.helpers.Helper.prototype.updatePosition = function() {

	goog.style.setStyle( this.domElement, 'transform', 'translate(' + this._x + 'px, ' + this._y + 'px)' );
};


feng.views.helpers.Helper.prototype.resolveHorizontalPosition = function( box ) {

	var size = this._size;
	var viewportSize = feng.viewportSize;

	var isFit = false;

	if( viewportSize.width - box.right > size.width ) {

		// snap to right
		this._x = box.right;

		goog.dom.classes.addRemove( this.domElement, this._arrowClasses, 'arrow-left' );

		isFit = true;

	}else if( box.left > size.width ) {

		// snap to left
		this._x = box.left - size.width;

		goog.dom.classes.addRemove( this.domElement, this._arrowClasses, 'arrow-right' );

		isFit = true;
	}

	this._y = box.top - (size.height - (box.bottom - box.top)) / 2;

	if(this._y < 25 || (this._y + size.height) > (viewportSize.height - 150)) {

		isFit = false;
	}

	return isFit;
};


feng.views.helpers.Helper.prototype.resolveVerticalPosition = function( box ) {

	var size = this._size;
	var viewportSize = feng.viewportSize;

	var isFit = false;

	if( box.top > size.height ) {

		this._y = box.top - size.height;

		goog.dom.classes.addRemove( this.domElement, this._arrowClasses, 'arrow-bottom' );

		isFit = true;

	}else if( viewportSize.height - box.bottom > size.height ) {

		this._y = box.bottom;

		goog.dom.classes.addRemove( this.domElement, this._arrowClasses, 'arrow-top' );

		isFit = true;
	}

	this._x = box.left - (size.width - (box.right - box.left)) / 2;

	if(this._x < 150 || (this._x + size.width) > (viewportSize.width - 150)) {

		isFit = false;
	}

	return isFit;
};


feng.views.helpers.Helper.prototype.calculatePosition = function( box ) {

	var size = this._size;
	var viewportSize = feng.viewportSize;

	switch(this._positionPriority) {

		case feng.views.helpers.Helper.POSITION_PRIORITY.HORIZONTAL:

		var resolveHorizontal = this.resolveHorizontalPosition( box );

		if(!resolveHorizontal) {
			this.resolveVerticalPosition( box );
		}
		break;

		case feng.views.helpers.Helper.POSITION_PRIORITY.VERTICAL:

		var resolveVertical = this.resolveVerticalPosition( box );

		if(!resolveVertical) {
			this.resolveHorizontalPosition( box );
		}
		break;
	}
	
	this._x = Math.max(150, Math.min(viewportSize.width - 150 - size.width, this._x));
	this._y = Math.max(25, Math.min(viewportSize.height - 150 - size.height, this._y));
};


feng.views.helpers.Helper.prototype.onShowWidget = function( widget ){

	if(widget === this) {

		return;

	}else {

		this.hasOtherWidgetShown = true;

		this.hide();
	}
};


feng.views.helpers.Helper.prototype.onHideWidget = function( widget ){

	if(widget === this) {
		
		return;

	}else {

		this.hasOtherWidgetShown = false;
	}
};


feng.views.helpers.Helper.prototype.onResize = function( e ) {

	this._size = goog.style.getSize( this.domElement );
};


feng.views.helpers.Helper.POSITION_PRIORITY = {
	HORIZONTAL: 'horizontal',
	VERTICAL: 'vertical'
};