goog.provide('feng.fx.LeafSprite');

goog.require('feng.fx.TextureAnimator');


/**
 * @constructor
 */
feng.fx.LeafSprite = function( texture ){

	var material = new THREE.SpriteMaterial({
		'map': texture,
		'transparent': true,
		'side': THREE.DoubleSide,
		'sizeAttenuation': true,
		'alphaTest': 1,
		'fog': true
	});

	THREE.Sprite.call( this, material );

	var numTiles = texture.image.width / 128;
	var frameDuration = goog.math.randomInt( 40 ) + 40;
	this._textureAnimator = new feng.fx.TextureAnimator( texture, numTiles, 1, numTiles, frameDuration );

	this._baseScale = 1;

	this.randomize();
};
goog.inherits(feng.fx.LeafSprite, THREE.Sprite);


feng.fx.LeafSprite.prototype.start = function(){

	this._textureAnimator.start();
};


feng.fx.LeafSprite.prototype.stop = function(){

	this._textureAnimator.stop();
};


feng.fx.LeafSprite.prototype.setScale = function( scaleMultiplier ){

	var finalScale = this._baseScale * scaleMultiplier;

	this.scale.set( finalScale, finalScale, finalScale );
};


feng.fx.LeafSprite.prototype.randomize = function(){

	this._baseScale = goog.math.uniformRandom(0.5, 2);

	this.setScale( 1 );

	var rotation = Math.random() * Math.PI * 2;
	this.material.rotation = rotation;
};