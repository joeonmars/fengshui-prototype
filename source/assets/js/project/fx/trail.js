goog.provide('feng.fx.Trail');

goog.require('goog.math');
goog.require('feng.fx.Particle');


/**
 * @constructor
 */
feng.fx.Trail = function(timeOffset, color, length, jiggleFrequency, maxJiggleAmount, pathTrack){

	this._numLineVertices = length + Math.round(Math.random()*length);
	this._geometry = new THREE.Geometry();

	this._hsl = new THREE.Color( color ).getHSL();

	//
	goog.base(this, timeOffset, jiggleFrequency, maxJiggleAmount, pathTrack);
};
goog.inherits(feng.fx.Trail, feng.fx.Particle);


feng.fx.Trail.prototype.create = function() {

	var color = new THREE.Color();
	var h = goog.math.uniformRandom(this._hsl.h - .02, this._hsl.h + .02);

	for( var i = 0; i < this._numLineVertices; i++ ) {

		this._geometry.vertices.push( i === 0 ? this._position : new THREE.Vector3() );
		var ratio = i / (this._numLineVertices - 1);
		var s = this._hsl.s;
		var l = Math.sin( ratio * Math.PI ) * .1;
		color.setHSL(h, s, l);
		this._geometry.colors.push( color.clone() );
	}

	var material = new THREE.LineBasicMaterial({
		blending: THREE.AdditiveBlending,
		vertexColors: THREE.VertexColors,
		transparent: true,
		linewidth: 4,
		fog: false
	});

	var line = new THREE.Line( this._geometry, material );

	return line;
};


feng.fx.Trail.prototype.setPosition = function( position ) {

	goog.base(this, 'setPosition', position);

	for(var i = 0; i < this._numLineVertices; i++ ) {

		this._geometry.vertices[i].copy( this._position );
	}

	this._geometry.verticesNeedUpdate = true;
};


feng.fx.Trail.prototype.update = function( u ) {

	goog.base(this, 'update', u);

	for(var i = this._numLineVertices - 1; i > 0; i --) {

		this._geometry.vertices[i].copy( this._geometry.vertices[i-1] );
	}

	this._geometry.verticesNeedUpdate = true;
};