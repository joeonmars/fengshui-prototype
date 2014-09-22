goog.provide('feng.views.view3dfx.FX');

goog.require('feng.views.view3dfx.ClickEffect');
goog.require('feng.views.view3dfx.SelectEffect');

/**
 * @constructor
 */
feng.views.view3dfx.FX = function(){

  goog.base(this);

  this.clickEffect = new feng.views.view3dfx.ClickEffect();
  this.add( this.clickEffect );

  this.selectEffect = new feng.views.view3dfx.SelectEffect();
  this.add( this.selectEffect );
};
goog.inherits(feng.views.view3dfx.FX, THREE.Object3D);