goog.provide('feng.views.view3dobject.TipObject');

goog.require('feng.models.achievements.Achievements');
goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * An interactive object that shall be solved as a feng-shui tip
 */
feng.views.view3dobject.TipObject = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  // get tip model and listen to unlock event
  var tipKeys = data.tipKey.split('.');
  var tipId = tipKeys[2];
  var viewId = tipKeys[1];
  var sectionId = tipKeys[0];
  this.tip = feng.models.achievements.Achievements.getInstance().getTip(tipId, viewId, sectionId);

  goog.events.listenOnce(this.tip, feng.events.EventType.UNLOCK, this.onUnlock, false, this);

  // get tip caption id if specified
  this.captionClass = data.captionClass || null;
};
goog.inherits(feng.views.view3dobject.TipObject, feng.views.view3dobject.InteractiveObject);


feng.views.view3dobject.TipObject.prototype.registerToView3D = function(){

  goog.base(this, 'registerToView3D');
  
  this._view3d.tipObjects[ this.name ] = this;
};


feng.views.view3dobject.TipObject.prototype.isUnlocked = function(){

  return this.tip.unlocked;
};


feng.views.view3dobject.TipObject.prototype.unlock = function(e){

  this.tip.unlock();
};


feng.views.view3dobject.TipObject.prototype.onUnlock = function(e){

  this.dispatchEvent( feng.events.EventType.UNLOCK );

  console.log("UNLOCK: ", this);
};