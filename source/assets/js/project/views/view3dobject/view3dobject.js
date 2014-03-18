goog.provide('feng.views.view3dobject.View3DObject');

goog.require('goog.events.EventTarget');
goog.require('goog.math.Box');

/**
 * @constructor
 * A 3d object in view3d
 */
feng.views.view3dobject.View3DObject = function( object3d ){

  goog.base(this);

  this.object3d = object3d;
};
goog.inherits(feng.views.view3dobject.View3DObject, goog.events.EventTarget);


feng.views.view3dobject.View3DObject.prototype.getBox = function(){

  var box3 = new THREE.Box3().setFromObject( this.object3d );
  var minX = box3.min.x;
  var minZ = box3.min.z;
  var maxX = box3.max.x;
  var maxZ = box3.max.z;

  var box2 = new goog.math.Box(minZ, maxX, maxZ, minX);

  return box2;
};


feng.views.view3dobject.View3DObject.prototype.getBoxBeforeRotation = function(){

  var rotationY = this.object3d.rotation.y;
  this.object3d.rotation.y = 0;

  var box3 = new THREE.Box3().setFromObject( this.object3d );

  this.object3d.rotation.y = rotationY;

  var minX = box3.min.x;
  var minZ = box3.min.z;
  var maxX = box3.max.x;
  var maxZ = box3.max.z;

  var box2 = new goog.math.Box(minZ, maxX, maxZ, minX);
  box2.rotation = rotationY;

  return box2;
};


feng.views.view3dobject.View3DObject.prototype.show = function(){

  this.object3d.visible = true;
};


feng.views.view3dobject.View3DObject.prototype.hide = function(){

  this.object3d.visible = false;
};