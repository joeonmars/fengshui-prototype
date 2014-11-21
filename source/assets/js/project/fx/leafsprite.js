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
		'fog': false
	});

  THREE.Sprite.call( this, material );

  var numTiles = texture.image.width / 128;
	var frameDuration = goog.math.randomInt( 40 ) + 40;
	this._textureAnimator = new feng.fx.TextureAnimator( texture, numTiles, 1, numTiles, frameDuration );

	this.randomize();
};
goog.inherits(feng.fx.LeafSprite, THREE.Sprite);


feng.fx.LeafSprite.prototype.randomize = function(){

	var scale = goog.math.uniformRandom(3, 6);
	this.scale.set( scale, scale, scale );

	var rotation = Math.random() * Math.PI * 2;
	this.material.rotation = rotation;
};