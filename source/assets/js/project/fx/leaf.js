goog.provide('feng.fx.Leaf');

goog.require('goog.math');
goog.require('feng.fx.Particle');


/**
 * @constructor
 */
feng.fx.Leaf = function(timeOffset, pathTrack){

	goog.base(this, timeOffset, pathTrack);

	this._size = Math.round( goog.math.uniformRandom(4, 12) );
	this._rotationVelocityX = goog.math.uniformRandom(0.02, 0.04);
	this._rotationVelocityY = goog.math.uniformRandom(0.10, 0.14);
};
goog.inherits(feng.fx.Leaf, feng.fx.Particle);


feng.fx.Leaf.prototype.create = function() {

	var geometry = new THREE.PlaneGeometry( this._size, this._size );
	var material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		transparent: true,
		side: THREE.DoubleSide
	});

	var leaf = new THREE.Mesh( geometry, material );
	leaf.position = this._position;

	return leaf;
};


feng.fx.Leaf.prototype.update = function( u ) {

	goog.base(this, 'update', u);
	
	this.object3d.rotation.x += this._rotationVelocityX;
	this.object3d.rotation.y += this._rotationVelocityY;
};