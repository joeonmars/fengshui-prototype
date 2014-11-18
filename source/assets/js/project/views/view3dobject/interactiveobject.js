goog.provide('feng.views.view3dobject.InteractiveObject');

goog.require('goog.async.Delay');
goog.require('goog.events.EventHandler');
goog.require('feng.views.view3dobject.View3DObject');

/**
 * @constructor
 * A 3d object that can be interacted in view3d
 */
feng.views.view3dobject.InteractiveObject = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this.object3d.interactiveObject = this;
  this.isPhysical = true;

  this.isSpecialCameraEnabled = data.camera ? true : false;
  this.specialCameraSettings = data.camera || {};

  this._interactionHandler = new goog.events.EventHandler(this);

  this.cameraInDuration = 1000;
  this._onCameraAnimatedInDelay = new goog.async.Delay(this.onCameraAnimatedIn, 0, this);
};
goog.inherits(feng.views.view3dobject.InteractiveObject, feng.views.view3dobject.View3DObject);


feng.views.view3dobject.InteractiveObject.prototype.registerToView3D = function(){

  goog.base(this, 'registerToView3D');
  
  this._view3d.interactiveObjects[ this.name ] = this;
};


feng.views.view3dobject.InteractiveObject.prototype.activate = function(){

};


feng.views.view3dobject.InteractiveObject.prototype.deactivate = function(){

};


feng.views.view3dobject.InteractiveObject.prototype.startInteraction = function(){

};


feng.views.view3dobject.InteractiveObject.prototype.stopInteraction = function(){

  this._interactionHandler.removeAll();
};


feng.views.view3dobject.InteractiveObject.prototype.enableSpecialCamera = function( position, rotation, fov ){

  this.isSpecialCameraEnabled = position ? true : false;

  if(this.isSpecialCameraEnabled) {

    this.specialCameraSettings.position = position;
    this.specialCameraSettings.rotation = rotation;
    this.specialCameraSettings.fov = fov;
  }
};


feng.views.view3dobject.InteractiveObject.prototype.onCameraIn = function(){

  console.log('on camera in: ' + this.name);

  this._onCameraAnimatedInDelay.start( this.cameraInDuration );
};


feng.views.view3dobject.InteractiveObject.prototype.onCameraOut = function(){

  console.log('on camera out: ' + this.name);

  this._onCameraAnimatedInDelay.stop();
};


feng.views.view3dobject.InteractiveObject.prototype.onCameraAnimatedIn = function(){

  this.dispatchEvent( feng.events.EventType.ANIMATED_IN );
};