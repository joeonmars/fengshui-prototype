goog.provide('feng.views.view3dobject.entities.PictureFrame');

goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * A picture frame that displays a default, but changeable picture
 */
feng.views.view3dobject.entities.PictureFrame = function( object3d, data ){

  goog.base(this, object3d, data);

  this._defaultPicture = data.defaultPicture;
};
goog.inherits(feng.views.view3dobject.entities.PictureFrame, feng.views.view3dobject.InteractiveObject);


feng.views.view3dobject.entities.PictureFrame.prototype.setPicture = function( src ){


};