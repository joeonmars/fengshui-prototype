goog.provide('feng.views.view3dobject.entities.Fruit');

goog.require('feng.views.view3dobject.View3DObject');


/**
 * @constructor
 * The generic fruit class
 */
feng.views.view3dobject.entities.Fruit = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._inPlateTexture = null;
};
goog.inherits(feng.views.view3dobject.entities.Fruit, feng.views.view3dobject.View3DObject);


feng.views.view3dobject.entities.Fruit.prototype.createTextures = function(){

  var shouldCreate = goog.base(this, 'createTextures');

  if(!shouldCreate) return;

  var preload = feng.models.Preload.getInstance();
  var inPlateImg = preload.getAsset(this._view3d.sectionId + '.' + this._view3d.id + '.' + this.name +'-in-plate-texture');
  this._inPlateTexture = new THREE.Texture( inPlateImg );
  this._inPlateTexture.needsUpdate = true;

  if(this.object3d.parent.name !== 'refrigerator') {
    this.object3d.material.map = this._inPlateTexture;
  }
};


feng.views.view3dobject.entities.Fruit.prototype.disposeTextures = function(){

  var shouldDispose = goog.base(this, 'disposeTextures');

  if(!shouldDispose) return;

  this._inPlateTexture.dispose();
  this._inPlateTexture = null;
};


feng.views.view3dobject.entities.Fruit.prototype.onPick = function(){

  this.object3d.material.map = this._inPlateTexture;
  this.object3d.material.needsUpdate = true;
};