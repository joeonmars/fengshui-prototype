goog.provide('feng.controllers.view3d.CameraController');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('feng.events');


/**
 * @constructor
 */
feng.controllers.view3d.CameraController = function(view3d){
  goog.base(this);

  this.activeCamera = null;

  this._view3d = view3d;
  this._scene = null;

  this.cameras = [];
  this.cameraHelpers = [];

  this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.controllers.view3d.CameraController, goog.events.EventTarget);


feng.controllers.view3d.CameraController.prototype.init = function( scene ){

  this._scene = scene;

  this.addCamera(feng.controllers.view3d.ModeController.Mode.BROWSE);
  this.addCamera(feng.controllers.view3d.ModeController.Mode.CLOSE_UP);
  this.addCamera(feng.controllers.view3d.ModeController.Mode.FLOW);
  this.addCamera(feng.controllers.view3d.ModeController.Mode.DESIGN);
  this.addCamera(feng.controllers.view3d.ModeController.Mode.WALK);
  this.addCamera(feng.controllers.view3d.ModeController.Mode.CLIMB);
  this.addCamera(feng.controllers.view3d.ModeController.Mode.TRANSITION);

  this.setCamera(feng.controllers.view3d.ModeController.Mode.BROWSE);
};


feng.controllers.view3d.CameraController.prototype.addCamera = function( name, fov, near, far ){

  if(this.getCamera(name)) return;

  var fov = fov || 40;
  var aspect = this._view3d.getViewSize().aspectRatio();
  var near = near || 10;
  var far = far || 200000;

  var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.name = name;
  this._scene.add(camera);
  this.cameras.push(camera);

	var cameraHelper = new THREE.CameraHelper( camera );
  cameraHelper.name = name + '-helper';
  this._scene.add(cameraHelper);
  this.cameraHelpers.push(cameraHelper);

  this.dispatchEvent({
    type: feng.events.EventType.ADD,
    camera: camera
  });

  return camera;
};


feng.controllers.view3d.CameraController.prototype.removeCamera = function( name ){

  var camera = this.getCamera(name);
  if(!camera) return;

  camera.parent.remove( camera );
  goog.array.remove(this.cameras, camera);

	var cameraHelper = this.getCameraHelper(name);

	cameraHelper.parent.remove( cameraHelper );
  goog.array.remove(this.cameraHelpers, cameraHelper);

  this.dispatchEvent({
    type: feng.events.EventType.REMOVE,
    camera: camera
  });
};


feng.controllers.view3d.CameraController.prototype.getCameras = function(){

  return this.cameras;
};


feng.controllers.view3d.CameraController.prototype.getCamera = function( name ){

  var camera = goog.array.find(this.cameras, function(camera) {
    return camera.name === name;
  });

  return camera;
};


feng.controllers.view3d.CameraController.prototype.getCameraHelper = function( name ){

  var cameraHelper = goog.array.find(this.cameraHelpers, function(cameraHelper) {
    return cameraHelper.name === (name + '-helper');
  });

  return cameraHelper;
};


feng.controllers.view3d.CameraController.prototype.setCamera = function( val ){

  this.activeCamera = goog.isString(val) ? this.getCamera( val ) : val;

  this.dispatchEvent({
    type: feng.events.EventType.CHANGE,
    camera: this.activeCamera
  });

  return this.activeCamera;
};


feng.controllers.view3d.CameraController.prototype.onResize = function(aspect){

  var cameras = this.getCameras();

  goog.array.forEach(cameras, function(camera) {
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  }, this);
};