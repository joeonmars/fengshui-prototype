goog.provide('feng.views.sections.overlays.Overlay');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');


/**
 * @constructor
 */
feng.views.sections.overlays.Overlay = function(domElement, canHalt){
	
  goog.base(this);

  this.domElement = domElement;

  this.isShown = false;

  this._canHalt = canHalt;

  this._eventHandler = new goog.events.EventHandler(this);

  this.hide( false );
};
goog.inherits(feng.views.sections.overlays.Overlay, goog.events.EventTarget);


feng.views.sections.overlays.Overlay.prototype.activate = function(){

	this._eventHandler.listen(window, 'resize', this.onResize, false, this);
};


feng.views.sections.overlays.Overlay.prototype.deactivate = function(){

	this._eventHandler.removeAll();
};


feng.views.sections.overlays.Overlay.prototype.show = function( shouldDispatch ){

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


feng.views.sections.overlays.Overlay.prototype.hide = function( shouldDispatch ){

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


feng.views.sections.overlays.Overlay.prototype.animateIn = function(){

	this.show( true );
};


feng.views.sections.overlays.Overlay.prototype.animateOut = function(){

	this.hide( true );
};


feng.views.sections.overlays.Overlay.prototype.onResize = function(e){


};