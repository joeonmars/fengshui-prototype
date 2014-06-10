goog.provide('feng.views.view3dobject.entities.Computer');

goog.require('feng.fx.TextureAnimator');
goog.require('feng.models.Preload');
goog.require('feng.views.view3dobject.TipObject');


/**
 * @constructor
 * A computer whose wallpaper can be changed
 */
feng.views.view3dobject.entities.Computer = function( object3d, data ){

  goog.base(this, object3d, data);

  this._defaultTexture = null;

  this._screenObject = null;

  this._textureAnimator = null;
};
goog.inherits(feng.views.view3dobject.entities.Computer, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.Computer.prototype.init = function() {

  this._screenObject = this.object3d.getObjectByName('screen');

  var textureData = this._screenObject.userData.texture;

  var preload = feng.models.Preload.getInstance();
  this._defaultTexture = THREE.ImageUtils.loadTexture( preload.getAsset( textureData.defaultTexture ).src );

  this._screenObject.material.map = this._defaultTexture;
  this._screenObject.material.color.setRGB(1, 1, 1);

  // create texture animator
  var texture = this._screenObject.material.map;
  var htiles = textureData.htiles;
  var vtiles = textureData.vtiles;
  var ntiles = textureData.ntiles;
  var duration = textureData.duration;

  this._textureAnimator = new feng.fx.TextureAnimator(texture, htiles, vtiles, ntiles, duration);
};


feng.views.view3dobject.entities.Computer.prototype.activate = function(){

  goog.base(this, 'activate');

  this._textureAnimator.start();
};


feng.views.view3dobject.entities.Computer.prototype.deactivate = function(){

  goog.base(this, 'deactivate');

  this._textureAnimator.stop();
};


feng.views.view3dobject.entities.Computer.prototype.setWallpaper = function( url ) {


};