goog.provide('feng.fx.Leaf');

goog.require('goog.math');
goog.require('feng.fx.Particle');
goog.require('feng.fx.TextureAnimator');


/**
 * @constructor
 */
feng.fx.Leaf = function(timeOffset, leaf, minSize, maxSize, jiggleFrequency, maxJiggleAmount, pathTrack){

	var preload = feng.models.Preload.getInstance();
	var animSpriteImg = preload.getAsset( 'global.leaf.' + leaf );
	var animTexture = new THREE.Texture( animSpriteImg );

	var numTiles = animSpriteImg.width / 128;
	var frameDuration = goog.math.randomInt( 40 ) + 40;
	this._textureAnimator = new feng.fx.TextureAnimator( animTexture, numTiles, 1, numTiles, frameDuration );

	this._material = new THREE.SpriteMaterial({
		map: leaf ? this._textureAnimator.texture : null,
		transparent: true,
		side: THREE.DoubleSide,
		rotation: Math.random() * Math.PI
	});

	//
	var minSize = minSize || 2;
	var maxSize = minSize + 2;
	this._size = Math.round( goog.math.uniformRandom(minSize, maxSize) );
	this._leaf = leaf;

	//
	this._rotationVelocityX = goog.math.uniformRandom(0.02, 0.04);
	this._rotationVelocityY = goog.math.uniformRandom(0.10, 0.14);

	//
	goog.base(this, timeOffset, jiggleFrequency, maxJiggleAmount, pathTrack);

	this._textureAnimator.start();
};
goog.inherits(feng.fx.Leaf, feng.fx.Particle);


feng.fx.Leaf.prototype.create = function() {

	var scale = goog.math.uniformRandom(3, 6);
	var rotation = THREE.Math.degToRad( Math.random() * 360 );

	var leaf = new THREE.Sprite( this._material );
	leaf.scale.set( scale, scale, scale );

	return leaf;
};


feng.fx.Leaf.prototype.update = function( u ) {

	goog.base(this, 'update', u);
	
	this.object3d.position.copy( this._position );
};