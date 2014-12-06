goog.provide('feng.views.view3dfx.FX');

goog.require('feng.views.view3dfx.ClickEffect');
goog.require('feng.views.view3dfx.SelectEffect');
goog.require('feng.fx.Leaves');

/**
 * @constructor
 */
feng.views.view3dfx.FX = function(){

  goog.base(this);

  this.clickEffect = new feng.views.view3dfx.ClickEffect();
  this.add( this.clickEffect );

  this.selectEffect = new feng.views.view3dfx.SelectEffect();
  this.add( this.selectEffect );

  this.greenLeaves = new feng.fx.Leaves( feng.fx.Leaves.Color.GREEN );
  this.add( this.greenLeaves );

  this.yellowLeaves = new feng.fx.Leaves( feng.fx.Leaves.Color.YELLOW );
  this.add( this.yellowLeaves );
};
goog.inherits(feng.views.view3dfx.FX, THREE.Object3D);


feng.views.view3dfx.FX.prototype.onBeforeRenderBlur = function() {

	this.clickEffect.visible = true;
	this.selectEffect.visible = true;
	this.greenLeaves.visible = this.greenLeaves.isActive;
	this.yellowLeaves.visible = this.yellowLeaves.isActive;
};


feng.views.view3dfx.FX.prototype.onBeforeRenderMask = function() {

	this.clickEffect.visible = false;
	this.selectEffect.visible = false;
	this.greenLeaves.visible = this.greenLeaves.isActive;
	this.yellowLeaves.visible = this.yellowLeaves.isActive;
};