goog.provide('feng.views.view3dobject.entities.Wallpaper');

goog.require('feng.views.view3dobject.TipObject');

/**
 * @constructor
 * The animated wallpaper for home office computer
 */
feng.views.view3dobject.entities.Wallpaper = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._video = goog.dom.createDom('video', {
    'preload': 'metadata',
    'loop': true
  }, [
    goog.dom.createDom('source', {
      'src': feng.Config['assetsPath'] + 'video/wallpaper.mp4',
      'type': 'video/mp4; codecs="avc1.42E01E"'
    }),
    goog.dom.createDom('source', {
      'src': feng.Config['assetsPath'] + 'video/wallpaper.ogv',
      'type': 'video/ogg; codecs="theora, vorbis"'
    })
  ]);

  this._videoCanvas = null;
  this._videoCanvasContext = null;

  this._videoTexture = null;
};
goog.inherits(feng.views.view3dobject.entities.Wallpaper, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.Wallpaper.prototype.activate = function(){

  goog.base(this, 'activate');

  goog.events.listen( this._video, 'canplay', this.onVideoUpdate, false, this );
};


feng.views.view3dobject.entities.Wallpaper.prototype.deactivate = function(){

  goog.base(this, 'deactivate');

  goog.events.unlisten( this._video, 'canplay', this.onVideoUpdate, false, this );
};


feng.views.view3dobject.entities.Wallpaper.prototype.createTextures = function(){

  goog.base(this, 'createTextures');

  this._videoCanvas = goog.dom.createDom('canvas', {
    'width': 480,
    'height': 268
  });

  this._videoCanvasContext = this._videoCanvas.getContext( '2d' );
  this._videoCanvasContext.fillStyle = '#000000';
  this._videoCanvasContext.fillRect( 0, 0, this._videoCanvas.width, this._videoCanvas.height );

  this._videoTexture = new THREE.Texture( this._videoCanvas );
  this._videoTexture.minFilter = THREE.LinearFilter;
  this._videoTexture.magFilter = THREE.LinearFilter;

  this.object3d.material.map = this._videoTexture;

  this._video.load();
};


feng.views.view3dobject.entities.Wallpaper.prototype.onVideoUpdate = function(){

  this._videoCanvasContext.drawImage( this._video, 0, 0 );
  this._videoTexture.needsUpdate = true;
};


feng.views.view3dobject.entities.Wallpaper.prototype.onCameraIn = function(){

  goog.base(this, 'onCameraIn');

  this._video.play();

  TweenMax.ticker.addEventListener("tick", this.onVideoUpdate, this);
};


feng.views.view3dobject.entities.Wallpaper.prototype.onCameraOut = function(){

  goog.base(this, 'onCameraOut');

  this._video.pause();

  TweenMax.ticker.removeEventListener("tick", this.onVideoUpdate, this);
};