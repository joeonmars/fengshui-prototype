goog.provide('fengshui.views.Avatar');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('fengshui.controllers.view3d.AvatarController');
goog.require('fengshui.models.Avatar');


/**
 * @constructor
 */
fengshui.views.Avatar = function(model){
  goog.base(this);

  this._model = model;

  this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(fengshui.views.Avatar, goog.events.EventTarget);


fengshui.views.Avatar.prototype.init = function(){

};