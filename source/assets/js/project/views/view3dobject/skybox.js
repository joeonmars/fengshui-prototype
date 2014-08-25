goog.provide('feng.views.view3dobject.Skybox');

goog.require('feng.views.view3dobject.View3DObject');

/**
 * @constructor
 * An infinite plane in design mode
 */
feng.views.view3dobject.Skybox = function( assets, view3d ){

  var directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];

  var skyGeometry = new THREE.BoxGeometry( 150000, 150000, 150000 ); 
  
  var materials = [];

  for (var i = 0; i < 6; i++) {

    var asset = assets[ directions[i] ];

    var material;

    if(asset) {

      var texture = new THREE.Texture( asset );
      texture.needsUpdate = true;

      material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide
      });
      material.shading = THREE.FlatShading;
      material.fog = false;
    }

    materials.push( material );
  }

  var skyMaterial = new THREE.MeshFaceMaterial( materials );
  skyMaterial.shading = THREE.FlatShading;
  skyMaterial.fog = false;

  var skybox = new THREE.Mesh( skyGeometry, skyMaterial );
  skybox.position.y = -15000;
  skybox.name = 'skybox';

  goog.base( this, skybox, {}, view3d );

  this.addToScene();
};
goog.inherits(feng.views.view3dobject.Skybox, feng.views.view3dobject.View3DObject);