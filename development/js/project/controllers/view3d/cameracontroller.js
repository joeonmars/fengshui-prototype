goog.provide('fengshui.controllers.view3d.CameraController');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('fengshui.events');


/**
 * @constructor
 */
fengshui.controllers.view3d.CameraController = function(view3d){
  goog.base(this);

  this.setParentEventTarget( view3d );

  this.activeCamera = null;

  this._view3d = view3d;
  this._scene = null;

  this._cameras = [];
  this._cameraHelpers = [];

  this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(fengshui.controllers.view3d.CameraController, goog.events.EventTarget);


fengshui.controllers.view3d.CameraController.prototype.init = function( scene ){

  this._scene = scene;

  this.addCamera(fengshui.views.View3D.Mode.BROWSE);
  this.addCamera(fengshui.views.View3D.Mode.CLOSE_UP);
  this.addCamera(fengshui.views.View3D.Mode.PATH);
  this.addCamera(fengshui.views.View3D.Mode.TRANSITION);

  this.setCamera(fengshui.views.View3D.Mode.BROWSE);
};


fengshui.controllers.view3d.CameraController.prototype.addCamera = function( name, fov, near, far ){

  if(this.getCamera(name)) return;

  var fov = fov || 45;
  var aspect = this._view3d.getViewSize().aspectRatio();
  var near = near || 10;
  var far = far || 10000;

  var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.name = name;
  this._scene.add(camera);
  this._cameras.push(camera);

	var cameraHelper = new THREE.CameraHelper( camera );
  cameraHelper.name = name + '-helper';
  this._scene.add(cameraHelper);
  this._cameraHelpers.push(cameraHelper);

  this.dispatchEvent({
    type: fengshui.events.EventType.ADD,
    camera: camera
  });

  return camera;
};


fengshui.controllers.view3d.CameraController.prototype.removeCamera = function( name ){

  var camera = this.getCamera(name);
  if(!camera) return;

  camera.parent.remove( camera );
  goog.array.remove(this._cameras, camera);

	var cameraHelper = this.getCameraHelper(name);

	camera.parent.remove( cameraHelper );
  goog.array.remove(this._cameraHelpers, cameraHelper);

  this.dispatchEvent({
    type: fengshui.events.EventType.REMOVE,
    camera: camera
  });
};


fengshui.controllers.view3d.CameraController.prototype.getCameras = function(){

  return this._cameras;
};


fengshui.controllers.view3d.CameraController.prototype.getCamera = function( name ){

  var camera = goog.array.find(this._cameras, function(camera) {
    return camera.name === name;
  });

  return camera;
};


fengshui.controllers.view3d.CameraController.prototype.getCameraHelper = function( name ){

  var cameraHelper = goog.array.find(this._cameraHelpers, function(cameraHelper) {
    return cameraHelper.name === (name + '-helper');
  });

  return cameraHelper;
};


fengshui.controllers.view3d.CameraController.prototype.setCamera = function( name ){

  this.activeCamera = this.getCamera(name);

  this.dispatchEvent({
    type: fengshui.events.EventType.CHANGE,
    camera: this.activeCamera
  });

  return this.activeCamera;
};


fengshui.controllers.view3d.CameraController.prototype.copyCameraAttributesFromTo = function( cameraA, cameraB ){

  cameraB.position.copy( cameraA.position );
  cameraB.rotation.copy( cameraA.rotation );

  cameraB.fov = cameraA.fov;

  cameraB.updateProjectionMatrix();

  return cameraB;
};


fengshui.controllers.view3d.CameraController.prototype.animatePositionTo = function( position, duration, ease ){

  var currentPosition = this.activeCamera.position;
  var duration = goog.isNumber(duration) ? duration : 1;
  var ease = ease || Quad.easeOut;

  TweenMax.to(currentPosition, duration, {
    x: position.x,
    y: position.y,
    z: position.z,
    ease: ease,
    onStart: this.onTransitionStart,
    onStartScope: this,
    onComplete: this.onTransitionComplete,
    onCompleteScope: this
  });
};


fengshui.controllers.view3d.CameraController.prototype.animateFocusTo = function( lookAt, duration, ease ){

  var target = this.activeCamera.target;
  var duration = goog.isNumber(duration) ? duration : 1;
  var ease = ease || Quad.easeOut;

  TweenMax.to(target, duration, {
    x: lookAt.x,
    y: lookAt.y,
    z: lookAt.z,
    ease: ease,
    onStart: this.onTransitionStart,
    onStartScope: this,
    onComplete: this.onTransitionComplete,
    onCompleteScope: this,
    onUpdate: function() {
      this.activeCamera.lookAt( target );
    },
    onUpdateScope: this
  });
};


fengshui.controllers.view3d.CameraController.prototype.animateFovTo = function( fov, duration, ease ){

  var duration = goog.isNumber(duration) ? duration : 1;
  var ease = ease || Quad.easeOut;
  
  TweenMax.to(this.activeCamera, duration, {
    fov: fov,
    ease: ease,
    onStart: this.onTransitionStart,
    onStartScope: this,
    onComplete: this.onTransitionComplete,
    onCompleteScope: this,
    onUpdate: function() {
      this.activeCamera.updateProjectionMatrix();
    },
    onUpdateScope: this
  });
};


fengshui.controllers.view3d.CameraController.prototype.animateTo = function( position, lookAt, fov, duration, ease ){

  var duration = goog.isNumber(duration) ? duration : 1;
  var ease = ease || Quad.easeOut;

  if(position) this.animatePositionTo(position, duration, ease);
  if(lookAt) this.animateFocusTo(lookAt, duration, ease);
  if(fov) this.animateFovTo(fov, duration, ease);
};


fengshui.controllers.view3d.CameraController.prototype.followSpline = function(spline){

  var prop = {
    t: 0,
    spline: spline
  };

  var tweener = TweenMax.to(prop, 5, {
    t: 1,
    ease: Linear.easeNone,
    onUpdate: this.onSplineStep,
    onUpdateParams: [prop],
    onUpdateScope: this
  });

  return tweener;
};


fengshui.controllers.view3d.CameraController.prototype.onSplineStep = function(prop){

  var t = prop.t;
  var spline = prop.spline;

  var splinePosition = spline.getPointAt( t );

  this.activeCamera.position.x = splinePosition.x;
  //this.activeCamera.position.y = splinePosition.y;
  this.activeCamera.position.z = splinePosition.z;
};


fengshui.controllers.view3d.CameraController.prototype.onTransitionStart = function(){

  //this._controls.enabled = false;
};


fengshui.controllers.view3d.CameraController.prototype.onTransitionComplete = function(){

  //this._controls.enabled = true;
};


fengshui.controllers.view3d.CameraController.prototype.onResize = function(aspect){

  var cameras = this.getCameras();

  goog.array.forEach(cameras, function(camera) {
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  }, this);
};