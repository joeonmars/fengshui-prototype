goog.provide('feng.views.view3dobject.entities.PictureFrame');

goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * A picture frame that displays a default, but changeable picture
 */
feng.views.view3dobject.entities.PictureFrame = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._defaultPicture = data.defaultPicture;
};
goog.inherits(feng.views.view3dobject.entities.PictureFrame, feng.views.view3dobject.InteractiveObject);


feng.views.view3dobject.entities.PictureFrame.prototype.setPicture = function( img ){

	//var texture = new THREE.Texture( img );
	//console.log(img);

	/*
	 if texture is 800x2000.
	 a 100x100 cube, show a 100x100 portion of that big texture, offset at like 300x400

	tex.repeat.x = 100 / 800;
tex.repeat.y = 100 / 2000;
tex.offset.x = ( 300 / 100 ) * tex.repeat.x;
tex.offset.y = ( 400 / 100 ) * tex.repeat.y;

*/
};