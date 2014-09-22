goog.provide('feng.views.view3dobject.entities.PictureDisplay');

goog.require('feng.models.Preload');
goog.require('feng.views.view3dobject.TipObject');


/**
 * @constructor
 * A tip object that includes a set of picture frames
 */
feng.views.view3dobject.entities.PictureDisplay = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  // parse pictures url from id
  var preload = feng.models.Preload.getInstance();

  this.pictures = goog.array.map(data.pictures, function(picture) {

    var src = preload.getAsset( picture.id ).src;
    var img = new Image();
    img.src = src;

    return {
      img: img,
      src: src,
      description: picture.description
    };
  });

  this.hasIntersected = false;

  this._pictureFrames = null;
  this._pictureFrameObject3Ds = null;
  this._activePictureFrame = null;
};
goog.inherits(feng.views.view3dobject.entities.PictureDisplay, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.PictureDisplay.prototype.getPictureFrames = function() {

  this._pictureFrames = this._pictureFrames || goog.array.map(this.object3d.children, function(child) {
    return child.interactiveObject;
  });

  return this._pictureFrames;
};


feng.views.view3dobject.entities.PictureDisplay.prototype.getPictureFrameObject3Ds = function() {

  if(this._pictureFrameObject3Ds) return this._pictureFrameObject3Ds;

  this._pictureFrameObject3Ds = goog.array.map(this.getPictureFrames(), function(frame) {
    return frame.object3d;
  });

  return this._pictureFrameObject3Ds;
};


feng.views.view3dobject.entities.PictureDisplay.prototype.startInteraction = function() {

  goog.base(this, 'startInteraction');

  this._interactionHandler.listen(this, feng.events.EventType.DRAG, this.onPictureDrag, false, this);
  this._interactionHandler.listen(this, feng.events.EventType.DRAG_END, this.onPictureDragEnd, false, this);
};


feng.views.view3dobject.entities.PictureDisplay.prototype.onPictureDrag = function(e) {

  var x = e.mousePosition.x;
  var y = e.mousePosition.y;
  var objects = this.getPictureFrameObject3Ds();
  var camera = this._view3d.cameraController.activeCamera;
  var viewSize = this._view3d.viewSize;

  var mouseIntersected = feng.utils.ThreeUtils.getObjectsBy2DPosition(x, y, objects, camera, viewSize);

  this.hasIntersected = (mouseIntersected.length > 0);
  
  if(this.hasIntersected) {

    this._activePictureFrame = mouseIntersected[0].object.interactiveObject;

  }else {

    this._activePictureFrame = null;
  }
};


feng.views.view3dobject.entities.PictureDisplay.prototype.onPictureDragEnd = function(e) {

  var idToReturn, idToUse;

  if(this._activePictureFrame) {

    if( goog.isNumber(this._activePictureFrame.pictureId) ) {
      idToReturn = this._activePictureFrame.pictureId;
    }

    idToUse = e.id;

    this._activePictureFrame.setPicture( e.src, e.id, e.size );
  
  }else {

    idToReturn = e.id;
  }

  this.dispatchEvent({
    type: feng.events.EventType.CHANGE,
    idToUse: idToUse,
    idToReturn: idToReturn
  });
};