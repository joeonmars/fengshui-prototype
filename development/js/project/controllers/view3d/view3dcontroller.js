goog.provide('fengshui.controllers.view3d.View3DController');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('fengshui.events');

/**
 * @constructor
 */
fengshui.controllers.view3d.View3DController = function(){
  goog.base(this);

  this._eventHandler = new goog.events.EventHandler(this);
  this._eventHandler.listen(this, fengshui.events.EventType.SHOW, this.onShowView3D, false, this);
  this._eventHandler.listen(this, fengshui.events.EventType.HIDE, this.onHideView3D, false, this);
};
goog.inherits(fengshui.controllers.view3d.View3DController, goog.events.EventTarget);
goog.addSingletonGetter(fengshui.controllers.view3d.View3DController);


fengshui.controllers.view3d.View3DController.prototype.onShowView3D = function(e){

	console.log('Show View3D: ', e.target);
};


fengshui.controllers.view3d.View3DController.prototype.onHideView3D = function(e){

	console.log('Remove View3D: ', e.target);
};