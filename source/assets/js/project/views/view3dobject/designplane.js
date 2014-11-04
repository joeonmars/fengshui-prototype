goog.provide('feng.views.view3dobject.DesignPlane');

goog.require('feng.views.view3dobject.View3DObject');

/**
 * @constructor
 * An infinite plane in design mode
 */
feng.views.view3dobject.DesignPlane = function( view3d ){

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

  var planeGeometry = new THREE.PlaneBufferGeometry( 100000, 100000, 1, 1 );
  var planeMaterial = new THREE.MeshLambertMaterial( {
    map: texture,
    transparent: true
  } );
  planeMaterial.shading = THREE.FlatShading;

  var designPlane = new THREE.Mesh( planeGeometry, planeMaterial );
  designPlane.name = 'design-plane';
  designPlane.rotation.x = -Math.PI/2;
  designPlane.position.y = -.5;
  designPlane.receiveShadow = true;

  goog.base( this, designPlane, {}, view3d );
};
goog.inherits(feng.views.view3dobject.DesignPlane, feng.views.view3dobject.View3DObject);