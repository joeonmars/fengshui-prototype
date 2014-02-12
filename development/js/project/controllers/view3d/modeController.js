goog.provide('fengshui.controllers.view3d.ModeController');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('goog.object');
goog.require('fengshui.events');


/**
 * @constructor
 */
fengshui.controllers.view3d.ModeController = function( view3d ){

  goog.base(this);

  this.setParentEventTarget( view3d );

  this._modeControls = {};
  this._modeControls[fengshui.views.View3D.MODE.BROWSE] = null;
  this._modeControls[fengshui.views.View3D.MODE.CLOSE_UP] = null;
  this._modeControls[fengshui.views.View3D.MODE.PATH] = null;
  this._modeControls[fengshui.views.View3D.MODE.TRANSITION] = null;

  this._scene = null;
  this._control = null;
};
goog.inherits(fengshui.controllers.view3d.ModeController, goog.events.EventTarget);


fengshui.controllers.view3d.ModeController.prototype.init = function(){

	
};