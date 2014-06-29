goog.provide('feng.fx.Particle');

goog.require('goog.math');


/**
 * @constructor
 */
feng.fx.Particle = function(timeOffset, jiggleFrequency, maxJiggleAmount, pathTrack){

	this._spline = pathTrack.spline;
	this._isClosed = pathTrack.isClosed;

	var radius = 15;
	var offsetX = Math.round( goog.math.uniformRandom(-radius, radius) );
	var offsetY = Math.round( goog.math.uniformRandom(-radius, radius) );
	var offsetZ = Math.round( goog.math.uniformRandom(-radius, radius) );
	this._offset = new THREE.Vector3(offsetX, offsetY, offsetZ);
	
	this._timeOffset = timeOffset;

	this._time = 0;
	this._lastTime = 0;

	this._jiggle = new THREE.Vector3();
	this._jiggleFrequency = jiggleFrequency || 2;
	this._maxJiggleAmount = maxJiggleAmount || 4;
	
	this._position = new THREE.Vector3();

	this.object3d = this.create();
};


feng.fx.Particle.prototype.create = function() {


};


feng.fx.Particle.prototype.getPosition = function() {

	return this._position;
};


feng.fx.Particle.prototype.setPosition = function( position ) {

	this._position.copy( position );
};


feng.fx.Particle.prototype.update = function( u ) {

	var a = Math.abs( Math.sin( u * this._jiggleFrequency * Math.PI ) );
	var jiggleAmount = Math.cos( a * Math.PI ) * this._maxJiggleAmount;
	this._jiggle.set( jiggleAmount, jiggleAmount, jiggleAmount );

	this._lastTime = this._time;
	this._time = (u + this._timeOffset) % 1;
	
	var pos = this._spline.getPointAt( this._time );
	this._position.copy( pos ).add( this._offset ).add( this._jiggle );

	if(!this._isClosed) {
		var opacity = Math.sin( this._time * Math.PI );
		this.object3d.material.opacity = opacity;
	}

	var shouldReset = this._isClosed ? false : (this._time < this._lastTime);

	if(shouldReset) {

		this.setPosition( this._position );
	}
};