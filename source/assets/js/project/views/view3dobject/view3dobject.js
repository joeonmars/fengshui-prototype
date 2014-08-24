goog.provide('feng.views.view3dobject.View3DObject');

goog.require('goog.events.EventTarget');
goog.require('goog.math.Box');

/**
 * @constructor
 * A 3d object in view3d
 */
feng.views.view3dobject.View3DObject = function( object3d, data, view3d ){

  goog.base(this);

  this.object3d = object3d;
  this.object3d.userData = data;
  this.object3d.view3dObject = this;

  this.name = object3d.name;
  this.data = data;

  this._view3d = view3d;
  this._boundingBox = new THREE.Box3();
  this._center = new THREE.Vector3();

  this._tilemapProxy = null;

  //
  this.registerToView3D();
};
goog.inherits(feng.views.view3dobject.View3DObject, goog.events.EventTarget);


feng.views.view3dobject.View3DObject.prototype.registerToView3D = function(){

  this._view3d.view3dObjects[ this.name ] = this;
};


feng.views.view3dobject.View3DObject.prototype.init = function(){

};


feng.views.view3dobject.View3DObject.prototype.isCollidable = function(){

  return (this.data.collidable === true);
};


feng.views.view3dobject.View3DObject.prototype.isFloor = function(){

  return (goog.string.startsWith(this.name, 'floor'));
};


feng.views.view3dobject.View3DObject.prototype.getBoundingBox = function(){

  this._boundingBox.setFromObject( this.object3d );
  return this._boundingBox;
};


feng.views.view3dobject.View3DObject.prototype.getBox = function(){

  var box3 = this.getBoundingBox();
  var minX = box3.min.x;
  var minZ = box3.min.z;
  var maxX = box3.max.x;
  var maxZ = box3.max.z;

  var box2 = new goog.math.Box(minZ, maxX, maxZ, minX);

  return box2;
};


feng.views.view3dobject.View3DObject.prototype.getCenter = function(){

  var box3 = this.getBoundingBox();
  return box3.center();
};


feng.views.view3dobject.View3DObject.prototype.getBoundingBoxParameters = function(){

  var box3 = this.getBoundingBox();
  
  return {
    width: Math.abs(box3.max.x - box3.min.x),
    height: Math.abs(box3.max.y - box3.min.y),
    length: Math.abs(box3.max.z - box3.min.z)
  };
};


feng.views.view3dobject.View3DObject.prototype.getHeight = function(){

  return this.getBoundingBoxParameters().height;
};


feng.views.view3dobject.View3DObject.prototype.getTilemapProxy = function(){

  var clone = this._tilemapProxy;

  if(!clone) {

    clone = new THREE.Mesh( this.object3d.geometry.clone(), feng.views.view3dobject.View3DObject.ProxyMaterial.GREEN );
    this._tilemapProxy = clone;
  }

  if(this.isCollidable()) {

    clone.material = feng.views.view3dobject.View3DObject.ProxyMaterial.RED;

  }else {

    clone.material = feng.views.view3dobject.View3DObject.ProxyMaterial.GREEN;
  }
  
  clone.material.overdraw = true;

  clone.position.copy( this.object3d.position );
  clone.rotation.copy( this.object3d.rotation );

  return clone;
};


feng.views.view3dobject.View3DObject.prototype.add = function(){

  this._view3d.scene.add( this.object3d );
};


feng.views.view3dobject.View3DObject.prototype.remove = function(){

  this._view3d.scene.remove( this.object3d );
};


feng.views.view3dobject.View3DObject.prototype.enableRender = function(){

  // itself and its parent should be all renderable
  var object3d = this.object3d;

  while(object3d && !(object3d instanceof THREE.Scene)) {
    object3d.visible = true;
    object3d = object3d.parent;
  }

  //console.log("SHOW:", this.object3d.name);
};


feng.views.view3dobject.View3DObject.prototype.disableRender = function(){

  // its children should not be renderable
  this.object3d.visible = false;

  //console.log("HIDE:", this.object3d.name);
};


feng.views.view3dobject.View3DObject.ProxyMaterial = {
  RED: new THREE.MeshBasicMaterial( {color: feng.Color.TILEMAP_RED} ),
  GREEN: new THREE.MeshBasicMaterial( {color: feng.Color.TILEMAP_GREEN} )
};