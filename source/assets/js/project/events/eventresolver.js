goog.provide('feng.events.EventResolver');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('goog.Disposable');


/**
 * @constructor
 */
feng.events.EventResolver = function(){

  this._eventHandler = new goog.events.EventHandler(this);
  this._eventTarget = new goog.events.EventTarget();
};
goog.inherits(feng.events.EventResolver, goog.Disposable);


feng.events.EventResolver.prototype.getEventTarget = function(){

	return this._eventTarget;
};


feng.events.EventResolver.prototype.listen = function(target, type){

	this._eventHandler.listen(target, type, this.onHandleEvent, false, this);
};


feng.events.EventResolver.prototype.unlisten = function(target, type){

	this._eventHandler.unlisten(target, type, this.onHandleEvent, false, this);
};


feng.events.EventResolver.prototype.unlistenAll = function(){

	this._eventHandler.removeAll();
};


feng.events.EventResolver.prototype.onHandleEvent = function(e){

	this._eventTarget.dispatchEvent(e);
};