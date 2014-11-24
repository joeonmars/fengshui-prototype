goog.provide('feng.views.view3dobject.Skybox');

goog.require('feng.views.view3dobject.View3DObject');

/**
 * @constructor
 * An infinite plane in design mode
 */
feng.views.view3dobject.Skybox = function( assets, view3d ){

  this._assets = assets;

  var materials = [];

  for (var i = 0; i < 6; i++) {

    var material = new THREE.MeshBasicMaterial({
      'transparent': true,
      'side': THREE.BackSide
    });
    material.shading = THREE.FlatShading;
    material.fog = false;

    materials.push( material );
  }

  var skyGeometry = new THREE.BoxGeometry( 100000, 100000, 100000 );

  this._material = new THREE.MeshFaceMaterial( materials );
  this._material.shading = THREE.FlatShading;
  this._material.fog = false;

  var skybox = new THREE.Mesh( skyGeometry, this._material );
  skybox.position.y = -8000;
  skybox.name = 'skybox';

  goog.base( this, skybox, {}, view3d );

  this.opacity = 1;

  this.addToScene();
};
goog.inherits(feng.views.view3dobject.Skybox, feng.views.view3dobject.View3DObject);


feng.views.view3dobject.Skybox.prototype.createTextures = function(){

  var shouldCreate = goog.base(this, 'createTextures');

  if(!shouldCreate) return;

  var directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];

  goog.array.forEach(this._material.materials, function(material, i) {

    var asset = this._assets[ directions[i] ];

    var texture = new THREE.Texture( asset );
    texture.needsUpdate = true;

    material.map = texture;
    material.needsUpdate = true;

  }, this);
};


feng.views.view3dobject.Skybox.prototype.disposeTextures = function(){

  var shouldDispose = goog.base(this, 'disposeTextures');

  if(!shouldDispose) return;

  goog.array.forEach(this._material.materials, function(material, i) {

    material.map.dispose();
    material.map = null;
    material.needsUpdate = true;

  }, this);
};


feng.views.view3dobject.Skybox.prototype.updateOpacity = function( opt_opacity ){

  var opacity = goog.isNumber(opt_opacity) ? opt_opacity : this.opacity;

  goog.array.forEach(this._material.materials, function(material) {
    material.opacity = opacity;
  });
};