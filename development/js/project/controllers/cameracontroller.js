goog.provide('fengshui.controllers.CameraController');

goog.require('goog.events.EventTarget');
goog.require('goog.events');
goog.require('goog.object');


/**
 * @constructor
 */
fengshui.controllers.CameraController = function(cameras, scene, controls){
  goog.base(this);

  this._scene = scene;
  this._controls = controls;
  this._cameras = {};
  this._cameraHelpers = {};

  goog.object.forEach(cameras, function(camera, name) {
  	this.addCamera(name, camera);
  }, this);

  this.setCamera('default');
};
goog.inherits(fengshui.controllers.CameraController, goog.events.EventTarget);


fengshui.controllers.CameraController.prototype.addCamera = function( name, camera ){

  if(goog.object.containsKey(this._cameras, name)) return;

	goog.object.add(this._cameras, name, camera);
  this._scene.add(camera);

	var cameraHelper = new THREE.CameraHelper( camera );
	goog.object.add(this._cameraHelpers, name, cameraHelper);
  this._scene.add(cameraHelper);
};


fengshui.controllers.CameraController.prototype.removeCamera = function( name ){

  var camera = this._cameras[name];
  this._scene.remove( camera );
	goog.object.remove(this._cameras, name);

	var cameraHelper = this._cameraHelpers[name];
	this._scene.remove( cameraHelper );
	goog.object.remove(this._cameraHelpers, name);
};


fengshui.controllers.CameraController.prototype.getCamera = function( name ){

  return this._cameras[name];
};


fengshui.controllers.CameraController.prototype.setCamera = function( name ){

  this._activeCamera = this._cameras[name];
};


fengshui.controllers.CameraController.prototype.animateTo = function( position, lookAt, duration, ease ){

  var target = this._controls.target;
  var position = this._activeCamera.position;
  var duration = goog.isNumber(duration) ? duration : 1;
  var ease = ease || Quad.easeOut;

  TweenMax.to(target, duration, {
    x: lookAt.x,
    y: lookAt.y,
    z: lookAt.z,
    ease: ease,
    onUpdate: function() {
      this._activeCamera.lookAt( target );
    },
    onUpdateScope: this
  });

  TweenMax.to(position, duration, {
    x: position.x,
    y: position.y,
    z: position.z,
    ease: ease
  });
};


fengshui.controllers.CameraController.prototype.onResize = function(aspect){

  goog.object.forEach(this._cameras, function(camera, name) {
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  }, this);
};