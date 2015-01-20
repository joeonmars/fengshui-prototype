goog.provide('feng.views.view3dobject.DesignPlane');

goog.require('feng.views.view3dobject.View3DObject');

/**
 * @constructor
 * An infinite plane in design mode
 */
feng.views.view3dobject.DesignPlane = function( view3d ){

  var planeGeometry = new THREE.PlaneBufferGeometry( 100000, 100000, 1, 1 );
  var planeMaterial = new THREE.MeshBasicMaterial({
    transparent: true
  });

  this._plane = new THREE.Mesh( planeGeometry, planeMaterial );
  this._plane.name = 'design-plane';
  this._plane.rotation.x = -Math.PI/2;
  this._plane.position.y = -10;

  var data = {
    fog: true
  };

  var object3d = new THREE.Object3D();
  object3d.add( this._plane );

  goog.base( this, object3d, data, view3d );

  this.opacity = 1;
};
goog.inherits(feng.views.view3dobject.DesignPlane, feng.views.view3dobject.View3DObject);


feng.views.view3dobject.DesignPlane.prototype.init = function(){

  goog.base(this, 'init');

  var ground = this._view3d.getView3dObject( 'ground' );

  if(ground) {
    this.object3d.add( ground.object3d );
  }
};


feng.views.view3dobject.DesignPlane.prototype.createTextures = function(){

  var shouldCreate = goog.base(this, 'createTextures');

  if(!shouldCreate) return;

  var size = 128;
  var canvas = goog.dom.createDom('canvas');
  canvas.width = size;
  canvas.height = size;
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#e7e7e7";
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = "#aaaaaa";
  ctx.strokeRect(0, 0, size, size);

  var texture = new THREE.Texture( canvas );
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8000, 8000);
  texture.needsUpdate = true;

  this._plane.material.map = texture;
  this._plane.material.needsUpdate = true;
};


feng.views.view3dobject.DesignPlane.prototype.updateOpacity = function( opt_opacity ){

  this.opacity = goog.isNumber(opt_opacity) ? opt_opacity : this.opacity;

  this._plane.material.opacity = this.opacity;
};