goog.provide('feng.views.view3dobject.entities.Bear');

goog.require('feng.views.view3dobject.TipObject');


/**
 * @constructor
 * The bear in boy's room
 */
feng.views.view3dobject.entities.Bear = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  var preload = feng.models.Preload.getInstance();
  var onBedImg = preload.getAsset(this._view3d.sectionId + '.' + this._view3d.id + '.bear-on-bed-texture');
  this._onBedTexture = new THREE.Texture( onBedImg );
  this._onBedTexture.needsUpdate = true;
};
goog.inherits(feng.views.view3dobject.entities.Bear, feng.views.view3dobject.MovableObject);


feng.views.view3dobject.entities.Bear.prototype.pick = function(){

  goog.base(this, 'pick');

  this.object3d.material.map = this._onBedTexture;
  this.object3d.material.needsUpdate = true;

  var drawer = this._view3d.getView3dObject( 'drawer' );
  TweenMax.to( drawer.object3d.position, 1, {
    'z': -11
  });
};