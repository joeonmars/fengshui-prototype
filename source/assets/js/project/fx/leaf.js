goog.provide('feng.fx.Leaf');

goog.require('goog.math');
goog.require('feng.fx.Particle');


/**
 * @constructor
 */
feng.fx.Leaf = function(timeOffset, leaf, minSize, maxSize, jiggleFrequency, maxJiggleAmount, pathTrack){

	var minSize = minSize || 2;
	var maxSize = minSize + 2;
	this._size = Math.round( goog.math.uniformRandom(minSize, maxSize) );
	this._leaf = leaf;

	this._rotationVelocityX = goog.math.uniformRandom(0.02, 0.04);
	this._rotationVelocityY = goog.math.uniformRandom(0.10, 0.14);

	//
	goog.base(this, timeOffset, jiggleFrequency, maxJiggleAmount, pathTrack);
};
goog.inherits(feng.fx.Leaf, feng.fx.Particle);


feng.fx.Leaf.prototype.create = function() {

	if(this._leaf) {
		var preload = feng.models.Preload.getInstance();
		var texture = THREE.ImageUtils.loadTexture( preload.getAsset('global.leaf.'+this._leaf).src );
	}

	var geometry = new THREE.PlaneGeometry( this._size, this._size );
	var material = new THREE.MeshBasicMaterial({
		map: this._leaf ? texture : null,
		color: 0xffffff,
		transparent: true,
		side: THREE.DoubleSide
	});

	var leaf = new THREE.Mesh( geometry, material );

	return leaf;
};


feng.fx.Leaf.prototype.update = function( u ) {

	goog.base(this, 'update', u);
	
	this.object3d.position.copy( this._position );

	this.object3d.rotation.x += this._rotationVelocityX;
	this.object3d.rotation.y += this._rotationVelocityY;
};