goog.provide('feng.views.view3dobject.entities.Pictures');

goog.require('goog.string');
goog.require('feng.models.Preload');
goog.require('feng.views.view3dobject.TipObject');


/**
 * @constructor
 * A tip object that contains pictures
 */
feng.views.view3dobject.entities.Pictures = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  // parse and store pictures data
  var pictures = this.tip.details['pictures'];

  var preload = feng.models.Preload.getInstance();

  this._pictureTextures = goog.object.map(pictures, function(val, key) {

    var img = preload.getAsset( this._view3d.sectionId + '.' + this._view3d.id + '.pictures.' + key );

    var texture = new THREE.Texture( img );
    //texture.minFilter = THREE.LinearFilter;
    //texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    return texture;
  }, this);

  // get all picture object 3ds
  var pictureObject3ds = [];

  this.object3d.traverse(function(obj) {
    if((obj instanceof THREE.Mesh) && (obj.geometry.vertices.length === 4)) {
      pictureObject3ds.push( obj );
    }
  });

  this._pictureObject3ds = (pictureObject3ds.length > 0) ? pictureObject3ds : [this.object3d];

  //
  this._activePicture = null;

  this._sizeBox = new THREE.Box3();

  this._resolvedPictures = {};
};
goog.inherits(feng.views.view3dobject.entities.Pictures, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.Pictures.prototype.startInteraction = function() {

  goog.base(this, 'startInteraction');

  // disable free picture selection for now...
  //this._interactionHandler.listen(this._view3d.domElement, 'click', this.onClick, false, this);

  this.setActivePicture( this._pictureObject3ds[0] );
};


feng.views.view3dobject.entities.Pictures.prototype.stopInteraction = function() {

  goog.base(this, 'stopInteraction');

  this.setActivePicture( null );
};


feng.views.view3dobject.entities.Pictures.prototype.nextPicture = function() {

  var pictureIndex = goog.array.indexOf(this._pictureObject3ds, this._activePicture) + 1;
  pictureIndex = Math.min( pictureIndex, this._pictureObject3ds.length - 1 );

  this.setActivePicture( this._pictureObject3ds[pictureIndex] );
};


feng.views.view3dobject.entities.Pictures.prototype.setActivePicture = function( picture ) {

  this._activePicture = picture;

  goog.array.forEach( this._pictureObject3ds, function(obj) {

    var color;

    if(obj === picture || !picture) {
      color = 0xffffff;
    }else {
      color = 0x6E6E6E;
    }

    var prop = {
      t: 0,
      fromColor: obj.material.color.clone(),
      toColor: new THREE.Color( color )
    };

    TweenMax.to(prop, .25, {
      t: 1,
      'onUpdate': function() {
        obj.material.color.copy( prop.fromColor ).lerp( prop.toColor, prop.t );
        obj.material.needsUpdate = true;
      }
    });
  });
};


feng.views.view3dobject.entities.Pictures.prototype.setPicture = function( id ){

  var texture = this._pictureTextures[ id ];
  this._activePicture.material.map = texture;
  this._activePicture.material.needsUpdate = true;

  // fit picture texture in UV
  var u, v, offsetU, offsetV;
  var imgRatio = texture.image.width / texture.image.height;

  var size = this._sizeBox.setFromObject( this._activePicture ).size();
  var meshWidth = size.x;
  var meshHeight = size.y;
  var meshRatio = meshWidth / meshHeight;

  var actualWidth;
  var actualHeight;

  if(imgRatio > meshRatio) {

    u = 1 / imgRatio / meshRatio;
    v = 1;

    actualWidth = meshHeight * imgRatio;
    actualHeight = meshHeight;

    offsetU = (actualWidth - meshWidth) / 2 / actualWidth;
    offsetV = 0;

  }else {

    u = 1;
    v = 1 * imgRatio / meshRatio;

    actualWidth = meshWidth;
    actualHeight = meshWidth / imgRatio;

    offsetU = 0;
    offsetV = (actualHeight - meshHeight) / 2 / actualHeight;
  }

  texture.repeat.set( u, v );
  texture.offset.set( offsetU, offsetV );

  // check if resolved all
  this._resolvedPictures[ this._activePicture.name ] = true;

  var resolvedAllPictures = (goog.object.getCount( this._resolvedPictures ) === this._pictureObject3ds.length);

  if(resolvedAllPictures) {

    this.unlock();
  }
};

/*
feng.views.view3dobject.entities.Pictures.prototype.onClick = function(e){

  var camera = this._view3d.cameraController.activeCamera;
  var viewSize = this._view3d.viewSize;
  var clickedObjects = feng.utils.ThreeUtils.getObjectsBy2DPosition( e.clientX, e.clientY, this._pictureObject3ds, camera, viewSize );

  if(clickedObjects.length > 0) {
    var picture = clickedObjects[0].object;
    this.setActivePicture( picture );
  }
};
*/