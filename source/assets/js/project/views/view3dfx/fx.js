goog.provide('feng.views.view3dfx.FX');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('feng.events');
goog.require('feng.views.view3dfx.ClickEffect');
goog.require('feng.views.view3dfx.SelectEffect');
goog.require('feng.fx.Leaves');

/**
 * @constructor
 */
feng.views.view3dfx.FX = function(){

  goog.base(this);

  this._eventHandler = new goog.events.EventHandler(this);
  this._eventTarget = new goog.events.EventTarget();

  this.clickEffect = new feng.views.view3dfx.ClickEffect();
  this.add( this.clickEffect );

  this.selectEffect = new feng.views.view3dfx.SelectEffect();
  this.add( this.selectEffect );

  this.greenLeaves = new feng.fx.Leaves( this._eventTarget, feng.fx.Leaves.Color.GREEN );
  this.add( this.greenLeaves );

  this.yellowLeaves = new feng.fx.Leaves( this._eventTarget, feng.fx.Leaves.Color.YELLOW );
  this.add( this.yellowLeaves );
};
goog.inherits(feng.views.view3dfx.FX, THREE.Object3D);


feng.views.view3dfx.FX.prototype.activate = function() {

  this._eventHandler.listen( this._eventTarget, feng.events.EventType.UNLOCK, this.onUnlock, false, this );
};


feng.views.view3dfx.FX.prototype.deactivate = function() {

  this.greenLeaves.deactivate();
  this.yellowLeaves.deactivate();

  this._eventHandler.removeAll();
};


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


feng.views.view3dfx.FX.prototype.onUnlock = function(e) {

  this.yellowLeaves.animateOut();
  this.greenLeaves.animateIn( e.activeObject );
};