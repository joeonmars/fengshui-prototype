goog.provide('feng.fx.Leaves');

goog.require('goog.fx.anim.Animated');
goog.require('feng.fx.LeafSprite');
goog.require('feng.models.Preload');

/**
 * @constructor
 * based on http://stemkoski.github.io/Three.js/Particles.html
 */
feng.fx.Leaves = function( color ){

  goog.base(this);

  this.isActive = false;

  this._color = color;

  // create shared textures if not
	var preload = feng.models.Preload.getInstance();

	goog.object.forEach(feng.fx.Leaves.LeafType, function(value, key) {

		if(!feng.fx.Leaves.Texture[key]) {
			var img = preload.getAsset( 'global.leaf.' + value );
			var texture = new THREE.Texture( img );
			feng.fx.Leaves.Texture[key] = texture;
		}
	});

	// create leaves
	var textureIds = [];

	switch(this._color) {
		case feng.fx.Leaves.Color.GREEN:
		textureIds.push('GREEN_1', 'GREEN_2');
		break;

		case feng.fx.Leaves.Color.YELLOW:
		textureIds.push('YELLOW_1', 'YELLOW_2');
		break;
	}

	for(var i = 0; i < 10; i++) {
		
		var textureId = textureIds[ goog.math.randomInt(textureIds.length) ];console.log(textureId);
		var randTexture = feng.fx.Leaves.Texture[ textureId ];
		var leaf = new feng.fx.LeafSprite( randTexture.clone() );

		this.add( leaf );
	}

	this._attributes = {
		startPosition: [],
		randomness: []
	};

	this._leafScaleMultiplier = 1;

	this._leafScaleTweener = TweenMax.fromTo(this, 2, {
		_leafScaleMultiplier: 0
	}, {
		_leafScaleMultiplier: 1,
		'paused': true,
		'onUpdate': this.updateLeafScale,
		'onUpdateScope': this
	});

	this._startTime = 0;

	this._animated = new goog.fx.anim.Animated();
	this._animated.onAnimationFrame = goog.bind( this.onAnimationFrame, this );
};
goog.inherits(feng.fx.Leaves, THREE.Object3D);


feng.fx.Leaves.prototype.animateIn = function( view3dObject ){

	// calculate object radius
	var boundingSphere = view3dObject.getBoundingSphere();
	var radius = Math.max( 15, boundingSphere.radius );

	this.position.copy( boundingSphere.center );

	// arrange leaves
	var leaves = this.children;

	this._attributes.startPosition = [];
	this._attributes.randomness = [];

	goog.array.forEach(leaves, function(leaf) {

		leaf.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );

		// for a spherical shell:
		leaf.position.setLength( radius * (Math.random() * 0.1 + 0.9) );

		this._attributes.startPosition.push( leaf.position.clone() );
		this._attributes.randomness.push( Math.random() );

		leaf.randomize();
		leaf.start();

	}, this);

	// scale up leaves
	this._leafScaleTweener.restart();
	this.updateLeafScale();

	// kick off the animation loop
	this._startTime = goog.now();

	goog.fx.anim.registerAnimation( this._animated );

	this.isActive = true;
};


feng.fx.Leaves.prototype.animateOut = function(){

	var leaves = this.children;

	goog.array.forEach(leaves, function(leaf) {
		leaf.stop();
	});

	goog.fx.anim.unregisterAnimation( this._animated );

	this.isActive = false;
};


feng.fx.Leaves.prototype.updateLeafScale = function(){

	var leaves = this.children;

	var i, l = leaves.length;
	for(i = 0; i < l; i++) {
		leaves[i].setScale( this._leafScaleMultiplier );
	}
};


feng.fx.Leaves.prototype.onAnimationFrame = function(now){

	var time = (now - this._startTime) / 1000;
	
	for ( var c = 0; c < this.children.length; c ++ ) {

		var leaf = this.children[ c ];

		// pulse away/towards center
		// individual rates of movement
		var a = this._attributes.randomness[c] + 1;
		var pulseFactor = Math.sin(a * time) * 0.1 + 0.9;
		var startPosition = this._attributes.startPosition[c];
		leaf.position.x = startPosition.x * pulseFactor;
		leaf.position.y = startPosition.y * pulseFactor;
		leaf.position.z = startPosition.z * pulseFactor;
	}

	// rotate the entire group
	this.rotation.y = time * 0.75;
};


feng.fx.Leaves.Color = {
	GREEN: 'green',
	YELLOW: 'yellow'
};


feng.fx.Leaves.LeafType = {
	'GREEN_1': 'green-1',
	'GREEN_2': 'green-2',
	'YELLOW_1': 'yellow-1',
	'YELLOW_2': 'yellow-2'
};


feng.fx.Leaves.Texture = {
	'GREEN_1': null,
	'GREEN_2': null,
	'YELLOW_1': null,
	'YELLOW_2': null
};