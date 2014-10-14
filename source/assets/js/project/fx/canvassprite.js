goog.provide('feng.fx.CanvasSprite');

goog.require('goog.dom');
goog.require('goog.events.KeyHandler');


feng.fx.CanvasSprite = function( img, data, opt_canvas, opt_debug ) {

	this._canvasEl = opt_canvas || goog.dom.createDom('canvas');
  	this._canvasContext = this._canvasEl.getContext('2d');

  	this._size = new goog.math.Size( data['size']['w'], data['size']['h'] );
  	
  	this._sourceCanvas = goog.dom.createDom('canvas');
  	this._sourceCanvas.width = img.width;
	this._sourceCanvas.height = img.height;
  	this._sourceContext = this._sourceCanvas.getContext('2d');
  	this._sourceContext.drawImage( img, 0, 0 );

	this._frameDic = data['frames'];

	this._frameIds = goog.object.getKeys(this._frameDic).sort();

	this._frames = goog.array.map(this._frameIds, function(frameId) {
		return this._frameDic[frameId];
	}, this);

	this.frameIndex = 0;
	this.numFrames = this._frames.length;

	this.restoreSize();
	this.update();

	// added key events for debugging
	if(opt_debug) {
	
		var keyHandler = new goog.events.KeyHandler( document );
		goog.events.listen( keyHandler, goog.events.KeyHandler.EventType.KEY, function(e) {
			switch(e.keyCode) {
				case goog.events.KeyCodes.LEFT:
				case goog.events.KeyCodes.UP:
				this.prevFrame();
				break;

				case goog.events.KeyCodes.RIGHT:
				case goog.events.KeyCodes.DOWN:
				this.nextFrame();
				break;
			}
		}, false, this);
	}
};


feng.fx.CanvasSprite.prototype.getCanvas = function() {

	return this._canvasEl;
};


feng.fx.CanvasSprite.prototype.getTweener = function( vars, fps, duration ) {

	var fps = fps || 60;
	var duration = duration || (this.numFrames / fps);

	var fromVars = {
		frameIndex: 0
	};

	var toVars = {
  	frameIndex: this.numFrames - 1,
  	'paused': true,
  	'ease': Linear.easeNone,
  	'repeat': -1,
  	'onUpdate': this.update,
  	'onUpdateScope': this
	};

	goog.object.extend(toVars, (vars || {}));

	var tweener = TweenMax.fromTo(this, duration, fromVars, toVars);

  return tweener;
};


feng.fx.CanvasSprite.prototype.restoreSize = function() {

	this._canvasEl.width = this._size.width;
	this._canvasEl.height = this._size.height;
};


feng.fx.CanvasSprite.prototype.getProgress = function() {

	return this.frameIndex / (this.numFrames - 1);
};


feng.fx.CanvasSprite.prototype.getCurrentFrame = function() {

	return this.frameIndex;
};


feng.fx.CanvasSprite.prototype.setProgress = function( progress ) {

	var frameIndex = Math.round( (this.numFrames - 1) * progress );
	this.gotoFrameByIndex( frameIndex );
};


feng.fx.CanvasSprite.prototype.gotoFrameById = function( frameId ) {

	var frameIndex = goog.array.findIndex( this._frameIds, function(key) {
		return (key === frameId);
	});

	this.gotoFrameByIndex( frameIndex );
};


feng.fx.CanvasSprite.prototype.gotoFrameByIndex = function( frameIndex ) {

	this.frameIndex = Math.round(frameIndex);

	var frameData = this._frames[ this.frameIndex ];

	var sx = frameData['sx'], sy = frameData['sy'];
	var sw = frameData['sw'], sh = frameData['sh'];
	var x = frameData['x'], y = frameData['y'];

	this._canvasContext.clearRect( 0, 0, this._canvasEl.width, this._canvasEl.height );

	var imgData = this._sourceContext.getImageData( sx, sy, sw, sh );
	this._canvasContext.putImageData( imgData, x, y );
};


feng.fx.CanvasSprite.prototype.prevFrame = function() {

	this.frameIndex = Math.max(0, this.frameIndex - 1);
	this.update();
};


feng.fx.CanvasSprite.prototype.nextFrame = function() {

	this.frameIndex = Math.min(this.numFrames - 1, this.frameIndex + 1);
	this.update();
};


feng.fx.CanvasSprite.prototype.update = function() {

	this.gotoFrameByIndex( this.frameIndex );
};