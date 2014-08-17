goog.provide('feng.views.view3dobject.InteractiveObject');

goog.require('goog.events.EventHandler');
goog.require('feng.views.view3dobject.View3DObject');

/**
 * @constructor
 * A 3d object that can be interacted in view3d
 */
feng.views.view3dobject.InteractiveObject = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this.object3d.interactiveObject = this;
  this.interactions = this.data.interactions || [];
  this.isPhysical = true;
  this.screenBox = new goog.math.Box(0, 0, 0, 0);

  this.isSpecialCameraEnabled = data.camera ? true : false;
  this.specialCameraSettings = data.camera || {};

  this._interactionHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.views.view3dobject.InteractiveObject, feng.views.view3dobject.View3DObject);


feng.views.view3dobject.InteractiveObject.prototype.hasInteraction = function( interaction ){

	return goog.array.contains(this.interactions, interaction);
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


feng.views.view3dobject.InteractiveObject.prototype.updateScreenBox = function(){

  var box3 = this.getBoundingBox();
  var camera = this._view3d.cameraController.activeCamera;
  var viewSize = this._view3d.getViewSize();

  this.screenBox = feng.utils.ThreeUtils.getRectangleFromBox3( box3, camera, viewSize, this.screenBox );

  return this.screenBox;
};


feng.views.view3dobject.InteractiveObject.prototype.onCameraIn = function(){

  console.log('on camera in: ' + this.name);
};


feng.views.view3dobject.InteractiveObject.prototype.onCameraOut = function(){

  console.log('on camera out: ' + this.name);
};


/*
 * Interactions
 */
feng.views.view3dobject.InteractiveObject.Interaction = {
  MOVE: 'move',
  ROTATE: 'rotate',
  PLACE: 'place',
  CHANGE_PICTURE: 'change_picture',
  CHANGE_ACCESSORY: 'change_accessory'
};