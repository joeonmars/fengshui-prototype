goog.provide('feng.fx.Leaves');

goog.require('feng.fx.LeafSprite');
goog.require('feng.models.Preload');

/**
 * @constructor
 * based on http://stemkoski.github.io/Three.js/Particles.html
 */
feng.fx.Leaves = function( color ){

  goog.base(this);

  this._color = color;

  // create shared textures if not
	var preload = feng.models.Preload.getInstance();

	goog.object.forEach(feng.fx.Leaves.LeafType, function(type) {

		if(!feng.fx.Leaves.Texture[type]) {
			var img = preload.getAsset( 'global.leaf.' + type );
			var texture = new THREE.Texture( img );
			feng.fx.Leaves.Texture[type] = texture;
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
		var randTexture = feng.fx.Leaves.Texture[ goog.math.randomInt(textureIds.length) ];
		var leaf = new feng.fx.LeafSprite( randTexture.clone() );

		this.add( leaf );
	}

	//
	this._attributes = {
		startPosition: [],
		randomness: []
	};
};
goog.inherits(feng.fx.Leaves, THREE.Object3D);


feng.fx.Leaves.prototype.animateIn = function( view3dObject ){

	// calculate object radius
	var boundingSphere = view3dObject.getBoundingSphere();
	var radius = boundingSphere.radius;

	// arrange leaves
	var leaves = this.children;

	goog.array.forEach(leaves, function(leaf) {

		leaf.randomize();

		leaf.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );

		// for a cube:
		// leaf.position.multiplyScalar( radiusRange );
		// for a solid sphere:
		// leaf.position.setLength( radiusRange * Math.random() );
		// for a spherical shell:
		leaf.position.setLength( radius * (Math.random() * 0.1 + 0.9) );

		// add variable qualities to arrays, if they need to be accessed later
		attributes.startPosition.push( leaf.position.clone() );
		attributes.randomness.push( Math.random() );
	});
};


feng.fx.Leaves.prototype.animateOut = function(){


};


feng.fx.Leaves.prototype.onAnimationFrame = function(){

	var time = 4 * clock.getElapsedTime();
	
	for ( var c = 0; c < this.children.length; c ++ ) {

		var leaf = this.children[ c ];

		// particle wiggle
		// var wiggleScale = 2;
		// leaf.position.x += wiggleScale * (Math.random() - 0.5);
		// leaf.position.y += wiggleScale * (Math.random() - 0.5);
		// leaf.position.z += wiggleScale * (Math.random() - 0.5);
		
		// pulse away/towards center
		// individual rates of movement
		var a = attributes.randomness[c] + 1;
		var pulseFactor = Math.sin(a * time) * 0.1 + 0.9;
		leaf.position.x = attributes.startPosition[c].x * pulseFactor;
		leaf.position.y = attributes.startPosition[c].y * pulseFactor;
		leaf.position.z = attributes.startPosition[c].z * pulseFactor;	
	}

	// rotate the entire group
	// this.rotation.x = time * 0.5;
	this.rotation.y = time * 0.75;
	// this.rotation.z = time * 1.0;
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