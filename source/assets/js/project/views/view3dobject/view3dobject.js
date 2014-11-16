goog.provide('feng.views.view3dobject.View3DObject');

goog.require('goog.events.EventTarget');
goog.require('goog.math.Box');
goog.require('feng.models.Preload');
goog.require('feng.models.View3D');

/**
 * @constructor
 * A 3d object in view3d
 */
feng.views.view3dobject.View3DObject = function( object3d, data, view3d ){

  goog.base(this);

  this.object3d = object3d;
  this.object3d.userData = data;
  this.object3d.view3dObject = this;

  this.name = object3d.name;
  this.id = object3d.name + '-' + object3d.uuid;
  this.data = data;

  this._view3d = view3d;
  this._boundingBox = new THREE.Box3();
  this._boundingSphere = new THREE.Sphere();
  this._center = new THREE.Vector3();

  this._tilemapProxy = null;

  this._proxyBox = new THREE.Mesh( new THREE.BoxGeometry(1,1,1) );
  this._proxyBox.view3dObject = this;

  this._canRender = this.object3d.visible;
  this._isRenderEnabled = this._canRender;
  this._isTextureCreated = false;

  //
  this.registerToView3D();
};
goog.inherits(feng.views.view3dobject.View3DObject, goog.events.EventTarget);


feng.views.view3dobject.View3DObject.prototype.registerToView3D = function(){

  this._view3d.view3dObjects[ this.name ] = this;
};


feng.views.view3dobject.View3DObject.prototype.init = function(){

  // assign object model data
  var preloadModel = feng.models.Preload.getInstance();
  var sectionId = this._view3d.sectionId;
  var viewId = this._view3d.id;

  this.object3d.traverse(function(object) {

    var data = feng.models.View3D.getData(sectionId+'.'+viewId+'.'+object.name);

    if(object instanceof THREE.Object3D) {
      object.castShadow = data.castShadow || false;
      object.receiveShadow = data.receiveShadow || false;

      if(object.material) {
        object.material.shading = THREE.FlatShading;
        object.material.fog = false;
      }
    }
  });
};


feng.views.view3dobject.View3DObject.prototype.createTextures = function(){

  if(this._isTextureCreated) {

    return false;

  }else {

    this._isTextureCreated = true;
  }

  var preloadModel = feng.models.Preload.getInstance();
  var sectionId = this._view3d.sectionId;
  var viewId = this._view3d.id;

  this.object3d.traverse(function(object) {

    var data = feng.models.View3D.getData(sectionId+'.'+viewId+'.'+object.name);

    if(object instanceof THREE.Object3D) {

      var textureData = data.texture;

      if(goog.isString(textureData) && !object.material.map) {

          var textureAsset = preloadModel.getAsset( textureData );
          var texture;

          if(textureAsset.src) {

            texture = new THREE.Texture( textureAsset );
            texture.needsUpdate = true;

          }else {
            /*
            var ddsLoader = new THREE.DDSLoader();           
            var dds = ddsLoader.parse( textureAsset );

            texture = new THREE.CompressedTexture();
            texture.image = [];
            texture.flipY = false;
            texture.generateMipmaps = false;
            texture.image.width = dds.width;
            texture.image.height = dds.height;
            texture.mipmaps = dds.mipmaps;
            texture.format = dds.format;
            texture.needsUpdate = true;
            */
          }

          object.material.map = texture;
          object.material.needsUpdate = true;
      }
    }
  });

  return true;
};


feng.views.view3dobject.View3DObject.prototype.disposeTextures = function(){

  if(!this._isTextureCreated) {

    return false;

  }else {

    this._isTextureCreated = false;
  }

  this.object3d.traverse(function(object) {

    if(object instanceof THREE.Mesh) {

      if(object.material.map) {

        object.material.map.dispose();
        object.material.map = null;
        object.material.needsUpdate = true;
      }
    }
  });

  return true;
};


feng.views.view3dobject.View3DObject.prototype.isCollidable = function(){

  return (this.data.collidable === true);
};


feng.views.view3dobject.View3DObject.prototype.isFloor = function(){

  return (goog.string.startsWith(this.name, 'floor'));
};


feng.views.view3dobject.View3DObject.prototype.getProxyBox = function(){

  var boundingBox = this.getBoundingBox();

  boundingBox.size( this._proxyBox.scale );
  boundingBox.center( this._proxyBox.position );
  this._proxyBox.updateMatrixWorld();

  return this._proxyBox;
};


feng.views.view3dobject.View3DObject.prototype.getBoundingBox = function(){

  this._boundingBox.setFromObject( this.object3d );
  return this._boundingBox;
};


feng.views.view3dobject.View3DObject.prototype.getBoundingSphere = function(){

  this.getBoundingBox().getBoundingSphere( this._boundingSphere );
  return this._boundingSphere;
};


feng.views.view3dobject.View3DObject.prototype.getBox = function(){

  var box3 = this.getBoundingBox();
  var minX = box3.min.x;
  var minZ = box3.min.z;
  var maxX = box3.max.x;
  var maxZ = box3.max.z;

  var box2 = new goog.math.Box(minZ, maxX, maxZ, minX);

  return box2;
};


feng.views.view3dobject.View3DObject.prototype.getCenter = function(){

  var box3 = this.getBoundingBox();
  return box3.center();
};


feng.views.view3dobject.View3DObject.prototype.getBoundingBoxParameters = function(){

  var box3 = this.getBoundingBox();
  
  return {
    width: Math.abs(box3.max.x - box3.min.x),
    height: Math.abs(box3.max.y - box3.min.y),
    length: Math.abs(box3.max.z - box3.min.z)
  };
};


feng.views.view3dobject.View3DObject.prototype.getHeight = function(){

  return this.getBoundingBoxParameters().height;
};


feng.views.view3dobject.View3DObject.prototype.getTilemapProxy = function(){

  var clone = this._tilemapProxy;

  if(!clone) {

    clone = new THREE.Mesh( this.object3d.geometry, feng.views.view3dobject.View3DObject.ProxyMaterial.GREEN );
    this._tilemapProxy = clone;
  }

  if(this.isCollidable()) {

    clone.material = feng.views.view3dobject.View3DObject.ProxyMaterial.RED;

  }else {

    clone.material = feng.views.view3dobject.View3DObject.ProxyMaterial.GREEN;
  }
  
  clone.material.overdraw = true;

  clone.position.copy( this.object3d.position );
  clone.rotation.copy( this.object3d.rotation );

  return clone;
};


feng.views.view3dobject.View3DObject.prototype.addToScene = function(){

  this._view3d.scene.add( this.object3d );
};


feng.views.view3dobject.View3DObject.prototype.removeFromScene = function(){

  this._view3d.scene.remove( this.object3d );
};


feng.views.view3dobject.View3DObject.prototype.enableRender = function(){

  if(!this._canRender) return;

  if(this._isRenderEnabled) return;
  else this._isRenderEnabled = true;

  // itself, its parent and its children should be renderable
  this.object3d.visible = true;

  var parent = this.object3d.parent;
  var scene = this._view3d.scene;

  while(parent && !(parent === scene)) {

    if(parent.view3dObject) parent.view3dObject.enableRender();
    else parent.visible = true;

    parent = parent.parent;
  }

  this.object3d.traverse(function(child) {

    if(child.view3dObject) child.view3dObject.enableRender();
    else child.visible = true;
  });

  //console.log("SHOW:", this.object3d.name);
};


feng.views.view3dobject.View3DObject.prototype.disableRender = function(){

  if(!this._isRenderEnabled) return;
  else this._isRenderEnabled = false;

  // itself and its children should not be renderable
  this.object3d.visible = false;

  //console.log("HIDE:", this.object3d.name);
};


feng.views.view3dobject.View3DObject.ProxyMaterial = {
  RED: new THREE.MeshBasicMaterial( {color: 0xff0000} ),
  GREEN: new THREE.MeshBasicMaterial( {color: 0x00ff00} )
};