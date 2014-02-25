goog.provide('feng.controllers.view3d.View3DController');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('feng.events');

/**
 * @constructor
 */
feng.controllers.view3d.View3DController = function(){
  goog.base(this);

  this._eventHandler = new goog.events.EventHandler(this);
  this._eventHandler.listen(this, feng.events.EventType.SHOW, this.onShowView3D, false, this);
  this._eventHandler.listen(this, feng.events.EventType.HIDE, this.onHideView3D, false, this);
};
goog.inherits(feng.controllers.view3d.View3DController, goog.events.EventTarget);
goog.addSingletonGetter(feng.controllers.view3d.View3DController);


feng.controllers.view3d.View3DController.prototype.onShowView3D = function(e){

	console.log('Show View3D: ', e.target.id);
};


feng.controllers.view3d.View3DController.prototype.onHideView3D = function(e){

	console.log('Hide View3D: ', e.target.id);
};