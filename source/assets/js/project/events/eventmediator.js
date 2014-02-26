goog.provide('feng.events.EventMediator');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('goog.Disposable');


/**
 * @constructor
 */
feng.events.EventMediator = function(){

  this._eventHandler = new goog.events.EventHandler(this);
  this._eventTarget = new goog.events.EventTarget();
};
goog.inherits(feng.events.EventMediator, goog.Disposable);


feng.events.EventMediator.prototype.getEventTarget = function(){

	return this._eventTarget;
};


feng.events.EventMediator.prototype.listen = function(target, type){

	this._eventHandler.listen(target, type, this.onHandleEvent, false, this);
};


feng.events.EventMediator.prototype.unlisten = function(target, type){

	this._eventHandler.unlisten(target, type, this.onHandleEvent, false, this);
};


feng.events.EventMediator.prototype.unlistenAll = function(){

	this._eventHandler.removeAll();
};


feng.events.EventMediator.prototype.onHandleEvent = function(e){

	this._eventTarget.dispatchEvent(e);
};