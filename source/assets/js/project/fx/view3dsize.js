goog.provide('feng.fx.View3DSize');

goog.require('goog.events.EventTarget');
goog.require('goog.math.Size');

/**
 * @constructor
 */
feng.fx.View3DSize = function(width, height){

	goog.base(this);

	this._size = new goog.math.Size( width, height );
	
	this.ratioX = 1;
	this.ratioY = 1;

	this.width = this._size.width;
	this.height = this._size.height;

	goog.events.listen( window, goog.events.EventType.RESIZE, this.onResize, false, this );
};
goog.inherits(feng.fx.View3DSize, goog.events.EventTarget);


feng.fx.View3DSize.prototype.set = function(width, height){

	this._size.width = goog.isNumber(width) ? width : this._size.width;
	this._size.height = goog.isNumber(height) ? height : this._size.height;

	this.width = this._size.width;
	this.height = this._size.height;

	this.dispatchEvent({
		type: goog.events.EventType.RESIZE,
		width: this._size.width,
		height: this._size.height
	});
};


feng.fx.View3DSize.prototype.isEmpty = function(){

	return this._size.isEmpty();
};


feng.fx.View3DSize.prototype.reset = function(){

	this.update(1, 1);
};


feng.fx.View3DSize.prototype.aspectRatio = function(){

	return this._size.aspectRatio();
};


feng.fx.View3DSize.prototype.update = function( ratioX, ratioY ){

	this.ratioX = goog.isNumber(ratioX) ? ratioX : this.ratioX;
	this.ratioY = goog.isNumber(ratioY) ? ratioY : this.ratioY;

	var width = feng.viewportSize.width * this.ratioX;
	var height = feng.viewportSize.height * this.ratioY;

	this.set( width, height );

	return this;
};


feng.fx.View3DSize.prototype.onResize = function(e){

	this.update();
};