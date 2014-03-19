goog.provide('feng.fx.TextureAnimator');

goog.require('goog.events.EventTarget');


/**
 * @constructor
 */
feng.fx.TextureAnimator = function ( texture, tilesHoriz, tilesVert, numTiles, tileDispDuration ) {

	this._tilesHorizontal = tilesHoriz;
  this._tilesVertical = tilesVert;
  this._numberOfTiles = numTiles;

	this._texture = texture;
	this._texture.wrapS = this._texture.wrapT = THREE.RepeatWrapping;
  this._texture.repeat.set(1 / this._tilesHorizontal, 1 / this._tilesVertical);

  this._tileDisplayDuration = tileDispDuration;
  this._currentDisplayTime = 0;
  this._currentTile = 0;

  this._clock = new THREE.Clock( false );
};
goog.inherits(feng.fx.TextureAnimator, goog.events.EventTarget);


feng.fx.TextureAnimator.prototype.start = function() {

	this._clock.start();
	goog.fx.anim.registerAnimation( this );
};


feng.fx.TextureAnimator.prototype.stop = function() {

	this._clock.stop();
	goog.fx.anim.unregisterAnimation( this );
};


feng.fx.TextureAnimator.prototype.onAnimationFrame = function( now ) {

	var currentColumn, currentRow;

  this._currentDisplayTime += 1000 * this._clock.getDelta();

  while (this._currentDisplayTime > this._tileDisplayDuration) {

    this._currentDisplayTime -= this._tileDisplayDuration;
    this._currentTile++;

    if (this._currentTile === this._numberOfTiles) {
      this._currentTile = 0;
    }

    currentColumn = this._currentTile % this._tilesHorizontal;
    this._texture.offset.x = currentColumn / this._tilesHorizontal;

    currentRow = Math.floor(this._currentTile / this._tilesHorizontal);
    this._texture.offset.y = currentRow / this._tilesVertical;
  }
};