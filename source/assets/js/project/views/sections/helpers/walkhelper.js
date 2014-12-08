goog.provide('feng.views.helpers.WalkHelper');

goog.require('goog.async.Delay');
goog.require('feng.views.helpers.Helper');

/**
 * @constructor
 */
feng.views.helpers.WalkHelper = function( domElement ){

  goog.base(this, domElement);

  this._mousewheelEl = goog.dom.getElementByClass('mousewheel', this.domElement);
  this._clickEl = goog.dom.getElementByClass('click', this.domElement);

  this._hasShownMousewheel = false;
  this._hasShownClick = false;

  this._delayToShow = new goog.async.Delay( this.show, 1000, this );
  this._delayToComplete = new goog.async.Delay( this.doComplete, 5000, this );
};
goog.inherits(feng.views.helpers.WalkHelper, feng.views.helpers.Helper);


feng.views.helpers.WalkHelper.prototype.disposeInternal = function() {

	goog.base(this, 'disposeInternal');

	this._delayToComplete.dispose();
};


feng.views.helpers.WalkHelper.prototype.show = function() {

	goog.base(this, 'show');

	this._delayToShow.dispose();

	this.calculatePosition();

	this.updatePosition();
};


feng.views.helpers.WalkHelper.prototype.hide = function() {

	goog.base(this, 'hide');

	this._delayToShow.stop();
	this._delayToComplete.stop();
};


feng.views.helpers.WalkHelper.prototype.calculatePosition = function() {

	var size = goog.style.getSize( this.domElement );
	var viewportSize = feng.viewportSize;

	this._x = ( viewportSize.width - size.width ) / 2;
	this._y = ( viewportSize.height - size.height ) / 2;
};


feng.views.helpers.WalkHelper.prototype.activate = function() {

	goog.base(this, 'activate');

	feng.pubsub.subscribe( feng.PubSub.Topic.TRIGGER_WALK, this.onTriggerWalk, this );
};


feng.views.helpers.WalkHelper.prototype.deactivate = function() {

  	goog.base(this, 'deactivate');

  	feng.pubsub.unsubscribe( feng.PubSub.Topic.TRIGGER_WALK, this.onTriggerWalk, this );
};


feng.views.helpers.WalkHelper.prototype.onTriggerWalk = function( type ) {

	if(this._hasShownClick && this._hasShownMousewheel) {
		return;
	}

	if(this.hasOtherWidgetShown) {
		return;
	}

	if(type === 'mousewheel') {

		goog.style.showElement(this._mousewheelEl, false);
		goog.style.showElement(this._clickEl, true);

		this._hasShownClick = true;
	
	}else if(type === 'click') {

		goog.style.showElement(this._mousewheelEl, true);
		goog.style.showElement(this._clickEl, false);

		this._hasShownMousewheel = true;
	}

	if(!this._delayToShow.isActive() && !this._delayToShow.isDisposed()) {
		this._delayToShow.start();
	}

	this._delayToComplete.start();
};