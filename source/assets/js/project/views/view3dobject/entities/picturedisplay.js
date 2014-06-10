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

  // collect picture frame names for picture frame registration
  this.pictureFrameNames = goog.array.map(this.object3d.children, function(child) {
  	return child.name;
  });

  //
  this._pictureFrames = [];
};
goog.inherits(feng.views.view3dobject.entities.PictureDisplay, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.PictureDisplay.prototype.registerPictureFrame = function( pictureFrame ) {

	this._pictureFrames.push( pictureFrame );
	pictureFrame.setParentEventTarget( this );
};