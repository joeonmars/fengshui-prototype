goog.provide('feng.views.Avatar');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('feng.controllers.view3d.AvatarController');
goog.require('feng.models.Avatar');


/**
 * @constructor
 */
feng.views.Avatar = function(model){
  goog.base(this);

  this._model = model;

  this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.views.Avatar, goog.events.EventTarget);


feng.views.Avatar.prototype.init = function(){

};