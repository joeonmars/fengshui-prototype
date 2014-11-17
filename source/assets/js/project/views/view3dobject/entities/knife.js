goog.provide('feng.views.view3dobject.entities.Knife');

goog.require('feng.views.view3dobject.MovableObject');


/**
 * @constructor
 * The knife found in house kitchen, to be put in kitchen drawer
 */
feng.views.view3dobject.entities.Knife = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  var preload = feng.models.Preload.getInstance();
  var inDrawerImg = preload.getAsset(this._view3d.sectionId + '.' + this._view3d.id + '.knife-in-drawer-texture');
  this._inDrawerTexture = new THREE.Texture( inDrawerImg );
  this._inDrawerTexture.needsUpdate = true;
};
goog.inherits(feng.views.view3dobject.entities.Knife, feng.views.view3dobject.MovableObject);


feng.views.view3dobject.entities.Knife.prototype.getCloseUpObjectWhenDropped = function(){

  return this._view3d.tipObjects['drawer'];
};


feng.views.view3dobject.entities.Knife.prototype.pick = function(){

  goog.base(this, 'pick');

};


feng.views.view3dobject.entities.Knife.prototype.drop = function(){

  goog.base(this, 'drop');

  this.object3d.material.map = this._inDrawerTexture;
  this.object3d.material.needsUpdate = true;
  
  var drawerTipObject = this._view3d.tipObjects['drawer'];
  drawerTipObject.unlock();
};