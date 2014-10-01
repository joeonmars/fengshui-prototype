goog.provide('feng.fx.AnimatedSprite');

goog.require('goog.math.Size');
goog.require('goog.math.Coordinate');


feng.fx.AnimatedSprite = function( domElement, image, framesHorizontal, framesVertical, numFrames, useRetina ) {

	this.domElement = domElement;
	this.image = image;

	this._framesHorizontal = framesHorizontal;
	this._framesVertical = framesVertical;
	this._numFrames = numFrames;

	this._retinaScale = (useRetina === true && window.devicePixelRatio > 1) ? 2 : 1;

	var domWidth = this.image.width / this._framesHorizontal / this._retinaScale;
	var domHeight = this.image.height / this._framesVertical / this._retinaScale;
	this.size = new goog.math.Size( domWidth, domHeight );

	this._frameId = 0;
	this._framePosition = new goog.math.Coordinate(0, 0);

	goog.style.setStyle(this.domElement, {
		'background-image': 'url('+this.image.src+')',
		'background-size': (this.image.width / this._retinaScale) + 'px ' + (this.image.height / this._retinaScale) + 'px',
		'background-repeat': 'no-repeat',
		'width': domWidth + 'px',
		'height': domHeight + 'px'
	});

	this.gotoFrame( 0 );
};


feng.fx.AnimatedSprite.prototype.getProgress = function() {

	return this._frameId / (this._numFrames - 1);
};


feng.fx.AnimatedSprite.prototype.getCurrentFrame = function() {

	return this._frameId;
};


feng.fx.AnimatedSprite.prototype.getFramePositionById = function( frameId ) {

	var frameCol = frameId % this._framesHorizontal;
	this._framePosition.x = frameCol / this._framesHorizontal * this.image.width / this._retinaScale;

	var frameRow = Math.floor(frameId / this._framesHorizontal);
	this._framePosition.y = frameRow / this._framesVertical * this.image.height / this._retinaScale;

	return this._framePosition;
};


feng.fx.AnimatedSprite.prototype.getFramePosition = function() {

	return this.getFramePositionById( this._frameId );
};


feng.fx.AnimatedSprite.prototype.setProgress = function( progress ) {

	var frameId = Math.round( (this._numFrames - 1) * progress );
	this.gotoFrame( frameId );
};


feng.fx.AnimatedSprite.prototype.gotoFrame = function( frameId ) {

	this._frameId = frameId;

	var framePosition = this.getFramePositionById( this._frameId );

	goog.style.setStyle(this.domElement, 'background-position', (-framePosition.x + 'px ') + (-framePosition.y + 'px'));
};