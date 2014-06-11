goog.provide('feng.views.view3dobject.entities.PictureDisplay');

goog.require('feng.models.Preload');
goog.require('feng.views.view3dobject.TipObject');


/**
 * @constructor
 * A tip object that includes a set of picture frames
 */
feng.views.view3dobject.entities.PictureDisplay = function( object3d, data ){

  goog.base(this, object3d, data);

  // parse pictures url from id
  var preload = feng.models.Preload.getInstance();

  this.pictures = goog.array.map(data.pictures, function(picture) {
    return {
      src: preload.getAsset( picture.id ).src,
      description: picture.description
    };
  });

  this._pictureFrames = null;
};
goog.inherits(feng.views.view3dobject.entities.PictureDisplay, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.PictureDisplay.prototype.getPictureFrames = function() {

  this._pictureFrames = this._pictureFrames || goog.array.map(this.object3d.children, function(child) {
    return child.interactiveObject;
  });

  return this._pictureFrames;
};


feng.views.view3dobject.entities.PictureDisplay.prototype.startInteraction = function() {

  goog.base(this, 'startInteraction');

  this._interactionHandler.listen(this, feng.events.EventType.DRAG, this.onPictureDrag, false, this);
  this._interactionHandler.listen(window, 'resize', this.onResize, false, this);
};


feng.views.view3dobject.entities.PictureDisplay.prototype.onPictureDrag = function(e) {

  console.log(e);
};


feng.views.view3dobject.entities.PictureDisplay.prototype.onResize = function(e) {

  
};