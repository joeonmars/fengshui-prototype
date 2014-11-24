goog.provide('feng.views.view3dobject.DesignPlane');

goog.require('feng.views.view3dobject.View3DObject');

/**
 * @constructor
 * An infinite plane in design mode
 */
feng.views.view3dobject.DesignPlane = function( view3d ){

  var planeGeometry = new THREE.PlaneBufferGeometry( 100000, 100000, 1, 1 );
  var planeMaterial = new THREE.MeshLambertMaterial( {
    transparent: true
  } );
  planeMaterial.shading = THREE.FlatShading;

  var plane = new THREE.Mesh( planeGeometry, planeMaterial );
  plane.name = 'design-plane';
  plane.rotation.x = -Math.PI/2;
  plane.position.y = -.5;

  var data = {
    receiveShadow: true,
    fog: true
  };

  goog.base( this, plane, data, view3d );

  this.opacity = 1;
};
goog.inherits(feng.views.view3dobject.DesignPlane, feng.views.view3dobject.View3DObject);


feng.views.view3dobject.DesignPlane.prototype.createTextures = function(){

  var shouldCreate = goog.base(this, 'createTextures');

  if(!shouldCreate) return;

  var size = 128;
  var canvas = goog.dom.createDom('canvas');
  canvas.width = size;
  canvas.height = size;
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#f5f5f5";
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = "#414141";
  ctx.strokeRect(0, 0, size, size);

  var texture = new THREE.Texture( canvas );
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8000, 8000);
  texture.needsUpdate = true;

  this.object3d.material.map = texture;
  this.object3d.material.needsUpdate = true;
};


feng.views.view3dobject.DesignPlane.prototype.updateOpacity = function( opt_opacity ){

  var opacity = goog.isNumber(opt_opacity) ? opt_opacity : this.opacity;

  this.object3d.material.opacity = opacity;
};