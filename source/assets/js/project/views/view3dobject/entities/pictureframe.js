goog.provide('feng.views.view3dobject.entities.PictureFrame');

goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * A picture frame that displays a default, but changeable picture
 */
feng.views.view3dobject.entities.PictureFrame = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._plane = this.object3d.children[0];
  this._planeSize = new goog.math.Size(this._plane.geometry.parameters.width, this._plane.geometry.parameters.height);

  var preloadModel = feng.models.Preload.getInstance();
  this._defaultPicture = preloadModel.getAsset( data.defaultTexture );

  this._plane.material.map = THREE.ImageUtils.loadTexture( this._defaultPicture.src );
  this._plane.material.needsUpdate = true;

  this.pictureId = null;
};
goog.inherits(feng.views.view3dobject.entities.PictureFrame, feng.views.view3dobject.InteractiveObject);


feng.views.view3dobject.entities.PictureFrame.prototype.setPicture = function( src, id, size ){

	this.pictureId = id;

  	var texture = THREE.ImageUtils.loadTexture( src );

  	this._plane.material.map = texture;

	var imgAspectRatio = size.aspectRatio();

	var u, v, actualWidth, actualHeight, offsetU, offsetV;

	if(imgAspectRatio > this._planeSize.aspectRatio()) {

		u = 1 / imgAspectRatio;
		v = 1;

		actualWidth = this._planeSize.height * imgAspectRatio;
		actualHeight = this._planeSize.height;

		offsetU = (actualWidth - this._planeSize.width) / 2 / actualWidth;
		offsetV = 0;

	}else {

		u = 1;
		v = 1 * imgAspectRatio;

		actualWidth = this._planeSize.width;
		actualHeight = this._planeSize.width / imgAspectRatio;

		offsetU = 0;
		offsetV = (actualHeight - this._planeSize.height) / 2 / actualHeight;
	}

	texture.repeat.set( u, v );
	texture.offset.set( offsetU, offsetV );
};