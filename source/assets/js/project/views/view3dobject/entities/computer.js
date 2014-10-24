goog.provide('feng.views.view3dobject.entities.Computer');

goog.require('feng.views.view3dobject.TipObject');


/**
 * @constructor
 * The computer in boy's room
 */
feng.views.view3dobject.entities.Computer = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  var preload = feng.models.Preload.getInstance();
  var onBedImg = preload.getAsset(this._view3d.sectionId + '.' + this._view3d.id + '.computer-on-desk-texture');
  this._onBedTexture = new THREE.Texture( onBedImg );
  this._onBedTexture.needsUpdate = true;
};
goog.inherits(feng.views.view3dobject.entities.Computer, feng.views.view3dobject.MovableObject);


feng.views.view3dobject.entities.Computer.prototype.pick = function(){

  goog.base(this, 'pick');

  this.object3d.material.map = this._onBedTexture;
  this.object3d.material.needsUpdate = true;
};