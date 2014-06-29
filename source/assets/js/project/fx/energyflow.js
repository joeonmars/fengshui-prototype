goog.provide('feng.fx.EnergyFlow');

goog.require('feng.fx.PathTrack');
goog.require('feng.fx.Trail');
goog.require('feng.fx.Leaf');


/**
 * @constructor
 */
feng.fx.EnergyFlow = function(controlPoints, isClosed, preset){

	this._preset = preset || feng.fx.EnergyFlow.Preset.DEFAULT;

	this._start = 0;
	this._timeDiff = 0;
	this._duration = this._preset.duration;
	this._particles = [];
	this._numTrails = 100;
	this._numLeaves = 20;
	this._numParticles = this._numTrails + this._numLeaves;

	this._particles = [];

	//
	var offset = 0;
	var color = '#000000';

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

		var particle = isLeaf ? new feng.fx.Leaf(
			timeOffset,
			this._preset.leaf,
			this._preset.jiggleFrequency,
			this._preset.maxJiggleAmount,
			this)
		:
		new feng.fx.Trail(
			timeOffset,
			this._preset.color,
			this._preset.length,
			this._preset.jiggleFrequency,
			this._preset.maxJiggleAmount,
			this);

		particle.setPosition( particle.getPosition() );

		this.add( particle.object3d );

		this._particles.push( particle );
	}
};


feng.fx.EnergyFlow.prototype.activate = function(){

	goog.fx.anim.registerAnimation( this );

	this._start = goog.now();

	// update particles
	var i, l = this._numParticles;
	for(i = 0; i < l; i++) {
		var particle = this._particles[i];
		particle.update( 0 );
		particle.setPosition( particle.getPosition() );
	}

	goog.events.listen(window, 'focus', this.onWindowFocus, false, this);
	goog.events.listen(window, 'blur', this.onWindowBlur, false, this);
};


feng.fx.EnergyFlow.prototype.deactivate = function(){

	goog.fx.anim.unregisterAnimation( this );

	goog.events.unlisten(window, 'focus', this.onWindowFocus, false, this);
	goog.events.unlisten(window, 'blur', this.onWindowBlur, false, this);
};


feng.fx.EnergyFlow.prototype.onAnimationFrame = function( now ){

	// calculate u
	var diff = goog.now() - this._start;
	var u = ( diff % this._duration ) / this._duration;

	// update particles
	var i, l = this._numParticles;
	for(i = 0; i < l; i++) {
		this._particles[i].update( u );
	}
};


feng.fx.EnergyFlow.prototype.onWindowFocus = function( e ){

	goog.fx.anim.registerAnimation( this );

	this._start = goog.now() - this._timeDiff;
};


feng.fx.EnergyFlow.prototype.onWindowBlur = function( e ){

	goog.fx.anim.unregisterAnimation( this );

	this._timeDiff = goog.now() - this._start;
};


feng.fx.EnergyFlow.Preset = {
	DEFAULT: {
		leaf: null,
		color: '#48D1CC',
		duration: 20000,
		length: 80,
		jiggleFrequency: 2,
		maxJiggleAmount: 4 
	},
	JI: {
		leaf: 'ji',
		color: '#25DDFF',
		duration: 20000,
		length: 80,
		jiggleFrequency: 2,
		maxJiggleAmount: 4 
	},
	SHA: {
		leaf: 'sha',
		color: '#E49230',
		duration: 8000,
		length: 20,
		jiggleFrequency: 2,
		maxJiggleAmount: 4 
	},
	YIN: {
		leaf: 'yin',
		color: '#00B936',
		duration: 20000,
		length: 60,
		jiggleFrequency: 2,
		maxJiggleAmount: 4 
	},
	YANG: {
		leaf: 'yang',
		color: '#EF3B00',
		duration: 20000,
		length: 60,
		jiggleFrequency: 2,
		maxJiggleAmount: 4 
	}
};