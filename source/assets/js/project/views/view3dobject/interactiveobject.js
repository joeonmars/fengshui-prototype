goog.provide('feng.views.view3dobject.InteractiveObject');

goog.require('feng.views.view3dobject.View3DObject');

/**
 * @constructor
 * A 3d object that can be interacted in view3d
 */
feng.views.view3dobject.InteractiveObject = function( object3d, data ){

  goog.base(this, object3d, data);

  this.object3d.interactiveObject = this;
  this.interactions = this.data.interactions || [];
  this.isPhysical = true;

  this.isSpecialCameraEnabled = data.camera ? true : false;
  this.specialCameraSettings = data.camera || {};

  this._screenBox = new goog.math.Box(0, 0, 0, 0);
};
goog.inherits(feng.views.view3dobject.InteractiveObject, feng.views.view3dobject.View3DObject);


feng.views.view3dobject.InteractiveObject.prototype.hasInteraction = function( interaction ){

	return goog.array.contains(this.interactions, interaction);
};


feng.views.view3dobject.InteractiveObject.prototype.enableSpecialCamera = function( position, rotation, fov ){

  this.isSpecialCameraEnabled = position ? true : false;

  if(this.isSpecialCameraEnabled) {

    this.specialCameraSettings.position = position;
    this.specialCameraSettings.rotation = rotation;
    this.specialCameraSettings.fov = fov;
  }
};


feng.views.view3dobject.InteractiveObject.prototype.updateScreenBox = function( camera, rendererSize ){

  var box3 = this.getBoundingBox();

  this._screenBox = feng.utils.ThreeUtils.getRectangleFromBox3( box3, camera, rendererSize, this._screenBox );

  return this._screenBox;
};


/*
 * Interactions
 */
feng.views.view3dobject.InteractiveObject.Interaction = {
	MOVE: 'move',
	ROTATE: 'rotate',
  PLACE: 'place',
  CHANGE_ACCESSORY: 'change_accessory',
  ENTER: 'enter'
};