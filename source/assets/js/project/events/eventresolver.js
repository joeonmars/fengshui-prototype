goog.provide('feng.events.EventResolver');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');


/**
 * @constructor
 */
feng.events.EventResolver = function(){
  goog.base(this);

  this._eventHandler = new goog.events.EventHandler(this);
  this._eventTargets = [];
};
goog.inherits(feng.events.EventResolver, goog.events.EventTarget);


feng.events.EventResolver.prototype.getEventHandler = function(){

	return this._eventHandler;
};


feng.events.EventResolver.prototype.addEventTarget = function( eventTarget ){

	if(goog.array.contains(this._eventTargets, eventTarget)) return;

	this._eventTargets.push(eventTarget);
};


feng.events.EventResolver.prototype.removeEventTarget = function( eventTarget ){

	if(!goog.array.contains(this._eventTargets, eventTarget)) return;
	
	goog.array.remove(this._eventTargets, eventTarget);
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

	goog.array.forEach(this._eventTargets, function(target) {
		target.dispatchEvent(e);
	});
};