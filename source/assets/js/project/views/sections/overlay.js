goog.provide('feng.views.Overlay');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');


/**
 * @constructor
 */
feng.views.Overlay = function(domElement, canHalt){
	
  goog.base(this);

  this.domElement = domElement;

  this.isShown = false;

  this._canHalt = canHalt;

  this._eventHandler = new goog.events.EventHandler(this);

  this.hide( false );
};
goog.inherits(feng.views.Overlay, goog.events.EventTarget);


feng.views.Overlay.prototype.activate = function(){

	this._eventHandler.listen(window, 'resize', this.onResize, false, this);
};


feng.views.Overlay.prototype.deactivate = function(){

	this._eventHandler.removeAll();
};


feng.views.Overlay.prototype.show = function( shouldDispatch ){

	this.isShown = true;

	goog.style.showElement(this.domElement, this.isShown);

	this.onResize();

	this.activate();

	var shouldDispatch = (shouldDispatch === false) ? false : true;

	if(shouldDispatch) {

		this.dispatchEvent({
			type: feng.events.EventType.SHOW,
			canHalt: this._canHalt
		});
	}
};


feng.views.Overlay.prototype.hide = function( shouldDispatch ){

	this.isShown = false;
	
	goog.style.showElement(this.domElement, this.isShown);

	this.deactivate();

	var shouldDispatch = (shouldDispatch === false) ? false : true;

	if(shouldDispatch) {

		this.dispatchEvent({
			type: feng.events.EventType.HIDE,
			canHalt: this._canHalt
		});
	}
};


feng.views.Overlay.prototype.animateIn = function(){

	this.show( true );

	this.dispatchEvent( feng.events.EventType.ANIMATE_IN );
};


feng.views.Overlay.prototype.animateOut = function(){

	this.hide( true );

	this.dispatchEvent( feng.events.EventType.ANIMATE_OUT );
};


feng.views.Overlay.prototype.onResize = function(e){


};