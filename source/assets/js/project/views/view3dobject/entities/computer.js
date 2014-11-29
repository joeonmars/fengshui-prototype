goog.provide('feng.views.view3dobject.entities.Computer');

goog.require('feng.views.view3dobject.TipObject');


/**
 * @constructor
 * The computer in boy's room
 */
feng.views.view3dobject.entities.Computer = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._onDeskTexture = null;
};
goog.inherits(feng.views.view3dobject.entities.Computer, feng.views.view3dobject.MovableObject);


feng.views.view3dobject.entities.Computer.prototype.createTextures = function(){

  goog.base(this, 'createTextures');

  var preload = feng.models.Preload.getInstance();
  var onBedImg = preload.getAsset(this._view3d.sectionId + '.' + this._view3d.id + '.computer-on-desk-texture');
  this._onDeskTexture = new THREE.Texture( onBedImg );
  this._onDeskTexture.needsUpdate = true;

  if(this.hasPicked) {
    this.object3d.material.map = this._onDeskTexture;
  }
};


feng.views.view3dobject.entities.Computer.prototype.disposeTextures = function(){

  this._onDeskTexture.dispose();
  this._onDeskTexture = null;

  this.object3d.material.map = null;

  goog.base(this, 'disposeTextures');
};


feng.views.view3dobject.entities.Computer.prototype.pick = function(){

  goog.base(this, 'pick');

  this.object3d.material.map = this._onDeskTexture;
  this.object3d.material.needsUpdate = true;
};