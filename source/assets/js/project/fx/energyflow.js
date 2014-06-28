goog.provide('feng.fx.EnergyFlow');

goog.require('feng.fx.PathTrack');
goog.require('feng.fx.Trail');
goog.require('feng.fx.Leaf');


/**
 * @constructor
 */
feng.fx.EnergyFlow = function(controlPoints, isClosed){

	this._start = 0;
	this._duration = 20000;
	this._particles = [];
	this._numTrails = 100;
	this._numLeaves = 20;
	this._numParticles = this._numTrails + this._numLeaves;

	this._particles = [];

	//
	var offset = 0;
	var color = '#48D1CC';

	goog.base(this, controlPoints, offset, isClosed, color);
};
goog.inherits(feng.fx.EnergyFlow, feng.fx.PathTrack);


feng.fx.EnergyFlow.prototype.create = function(controlPoints, offset, isClosed, color){

	goog.base(this, 'create', controlPoints, offset, isClosed, color);

	// create particles
	var i, l = this._numParticles;
	for(i = 0; i < l; i++) {

		var isLeaf = (i % (this._numParticles / this._numLeaves) === 0);
		var timeOffset = i / this._numParticles;

		var particle = (isLeaf ? new feng.fx.Leaf(timeOffset, this) : new feng.fx.Trail(timeOffset, this));
		particle.setPosition( particle.getPosition() );

		this.add( particle.object3d );

		this._particles.push( particle );
	}
};


feng.fx.EnergyFlow.prototype.activate = function(){

	goog.fx.anim.registerAnimation( this );
};


feng.fx.EnergyFlow.prototype.deactivate = function(){

	goog.fx.anim.unregisterAnimation( this );
};


feng.fx.EnergyFlow.prototype.onAnimationFrame = function( now ){

	// calculate u
	var now = (goog.now() - this._start);
	var u = ( now % this._duration ) / this._duration;

	// update particles
	var i, l = this._numParticles;
	for(i = 0; i < l; i++) {
		this._particles[i].update( u );
	}
};