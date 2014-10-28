goog.provide('feng.fx.Trail');

goog.require('goog.math');
goog.require('feng.fx.Particle');


/**
 * @constructor
 */
feng.fx.Trail = function(timeOffset, color, length, blendMode, jiggleFrequency, maxJiggleAmount, pathTrack){

	//this._numSegments = length + Math.round( goog.math.uniformRandom(-length * .5, length * .5) );
	this._numSegments = 10;

	this._blendMode = blendMode || THREE.AdditiveBlending;

	this._color = ( new THREE.Color() ).set( color );
	this._baseHSL = this._color.getHSL();
	
	this._geometry = new THREE.PlaneGeometry(30, 30, 1, this._numSegments);

	this._material = this.createMaterial( color );

	this._positions = [];
	this._rotations = [];

	this._width = goog.math.uniformRandom(.5, 1);

	//
	goog.base(this, timeOffset, jiggleFrequency, maxJiggleAmount, pathTrack);
};
goog.inherits(feng.fx.Trail, feng.fx.Particle);


feng.fx.Trail.prototype.create = function() {

	var mesh = new THREE.Mesh(this._geometry, this._material);
	mesh.dynamic = true;

	for (var i = 0; i < this._numSegments*2; i++)
	{
	  this._positions[i] = 0;
	  this._rotations[i] = 0;
	}

	return mesh;
};


feng.fx.Trail.prototype.setPosition = function( position ) {

	goog.base(this, 'setPosition', position);


};


feng.fx.Trail.prototype.createMaterial = function( color ) {

	if(!feng.fx.Trail.DefaultTexture) {

	  var size = 32;

	  // create canvas
	  var canvas = document.createElement('canvas');
	  canvas.width = size;
	  canvas.height = size;

	  // get context
	  var context = canvas.getContext('2d');

	  // draw gradient
	  var gradient = context.createLinearGradient( 0, 0, 0, size );
	  gradient.addColorStop(0, '#000000');
	  gradient.addColorStop(.5, '#555555');
	  gradient.addColorStop(1, '#000000'); 
	  context.fillStyle = gradient;
	  var hs = size/2;
	  context.moveTo(0, hs);
	  context.arcTo(hs, 0, size, hs, 10);
	  context.arcTo(hs, size, 0, hs, 10);
	  context.fill();

    var texture = new THREE.Texture( canvas );
    texture.needsUpdate = true;

	  feng.fx.Trail.DefaultTexture = texture;
	}

	this._baseHSL.h = goog.math.uniformRandom(this._baseHSL.h - .1, this._baseHSL.h + .1);
	this._baseHSL.l = goog.math.uniformRandom(this._baseHSL.l - .5, this._baseHSL.l);

	this._color.setHSL( this._baseHSL.h, this._baseHSL.s, this._baseHSL.l );

  var material = new THREE.MeshBasicMaterial({
    color: this._color,
    map: feng.fx.Trail.DefaultTexture,
    fog: false,
    side: THREE.DoubleSide,
    wireframe: true,
    //transparent: true,
    //blending: this._blendMode,
    depthTest: false
  });

	return material;
};


feng.fx.Trail.prototype.update = function( u ) {

	goog.base(this, 'update', u);

  this._positions.pop();
  this._positions.pop();
  this._positions.pop();
  
  this._rotations.pop();
  this._rotations.pop();
  this._rotations.pop();
  
  var position = this.getPosition();

  this._positions.unshift( position.x, position.y, position.z );
  this._rotations.unshift( this._width, this._width, 0 );
  
  for (var i = 0; i < this._numSegments; i++) {

    var v1 = this._geometry.vertices[i*2];
    var v2 = this._geometry.vertices[i*2+1];
    
    var ix = i*3;
    var iy = i*3+1;
    var iz = i*3+2;

    v1.x = this._positions[ix] + this._rotations[ix];
    v1.y = this._positions[iy] + this._rotations[iy];
    v1.z = this._positions[iz] + this._rotations[iz];
    v2.x = this._positions[ix] - this._rotations[ix];
    v2.y = this._positions[iy] - this._rotations[iy];
    v2.z = this._positions[iz] - this._rotations[iz];
  }
  
  this._geometry.verticesNeedUpdate = true;
};


feng.fx.Trail.DefaultTexture = null;