goog.provide('feng.views.view3dobject.entities.Showerhead');

goog.require('goog.fx.Dragger');
goog.require('feng.views.view3dobject.TipObject');
goog.require('feng.utils.ThreeUtils');


/**
 * @constructor
 * The showerhead that is leaking water
 */
feng.views.view3dobject.entities.Showerhead = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._handle = null;

  this._waterdrop = null;

  this._waterdropStartY = null;

  this._tapCamera = {
    position: new THREE.Vector3(11, 59, 76.65),
    rotation: new THREE.Euler(-0.32, -1.59, 0, 'YXZ'),
    fov: 30
  };

  this._waterPositionTweener = null;
  this._waterScaleTweener = null;
  this._cameraTransitionTweener = null;
  this._cameraZoomTweener = null;

  // dragger to rotate the handle
  this._dragger = new goog.fx.Dragger( this._view3d.domElement );
  this._dragger.setHysteresis( 2 );
  this._dragger.defaultAction = goog.nullFunction;

  this._totalDeg = 0;
  this._lastDeg = 0;
  this._totalCount = 4;
  this._count = 0;
};
goog.inherits(feng.views.view3dobject.entities.Showerhead, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.Showerhead.prototype.init = function(){

  goog.base(this, 'init');

  this._handle = this.object3d.getObjectByName('shower-handle');

  this._waterdrop = this.object3d.getObjectByName('waterdrop');
  this._waterdropStartY = this._waterdrop.position.y;
};


feng.views.view3dobject.entities.Showerhead.prototype.onCameraIn = function(){

  goog.base(this, 'onCameraIn');

  if(this.tip.unlocked) {
    return;
  }

  this._waterPositionTweener = TweenMax.fromTo(this._waterdrop.position, 1, {
    'y': this._waterdropStartY
  },{
    'ease': Expo.easeIn,
    'y': this._waterdropStartY - 200,
    'repeat': -1,
    'repeatDelay': 1
  });

  this._waterScaleTweener = TweenMax.fromTo(this._waterdrop.scale, 1, {
    'y': 1
  },{
    'ease': Expo.easeIn,
    'y': 1.5,
    'repeat': -1,
    'repeatDelay': 1
  });
};


feng.views.view3dobject.entities.Showerhead.prototype.onCameraOut = function(){

  goog.base(this, 'onCameraOut');

  if(this._waterPositionTweener) {
    this._waterPositionTweener.kill();
  }

  if(this._waterScaleTweener) {
    this._waterScaleTweener.kill();
  }

  if(this._cameraTransitionTweener) {
    this._cameraTransitionTweener.kill();
  }
};


feng.views.view3dobject.entities.Showerhead.prototype.startInteraction = function(){

  goog.base(this, 'startInteraction');

  // transition camera to look at handle
  var control = this._view3d.modeController.control;

  var prop = {
    t: 0,
    startPosition: control.getPosition().clone(),
    endPosition: this._tapCamera.position,
    startRotation: control.getRotation().clone(),
    endRotation: this._tapCamera.rotation,
    startFov: control.getFov(),
    endFov: this._tapCamera.fov
  }

  this._cameraTransitionTweener = TweenMax.to( prop, 2, {
    t: 1,
    'ease': Sine.easeInOut,
    'onUpdate': this.onCameraTransitionUpdate,
    'onUpdateParams': [prop],
    'onUpdateScope': this,
    'onComplete': this.onCameraTransitionComplete,
    'onCompleteScope': this
  });
};


feng.views.view3dobject.entities.Showerhead.prototype.stopInteraction = function(){

  goog.base(this, 'stopInteraction');

  if(this._waterPositionTweener) {
    this._waterPositionTweener.kill();
  }

  if(this._waterScaleTweener) {
    this._waterScaleTweener.kill();
  }

  if(this._cameraTransitionTweener) {
    this._cameraTransitionTweener.kill();
  }
};


feng.views.view3dobject.entities.Showerhead.prototype.onCameraTransitionUpdate = function(prop){

  var startPosition = prop.startPosition;
  var endPosition = prop.endPosition;
  var startRotation = prop.startRotation;
  var endRotation = prop.endRotation;
  var startFov = prop.startFov;
  var endFov = prop.endFov;
  var t = prop.t;

  var control = this._view3d.modeController.control;

  control.lerp( startPosition, endPosition, startRotation, endRotation, startFov, endFov, t );
};


feng.views.view3dobject.entities.Showerhead.prototype.onCameraTransitionComplete = function(){

  this._interactionHandler.listen( this._dragger, goog.fx.Dragger.EventType.START, this.onDragStart, false, this);
  this._interactionHandler.listen( this._dragger, goog.fx.Dragger.EventType.DRAG, this.onDrag, false, this);
  this._interactionHandler.listen( this._dragger, goog.fx.Dragger.EventType.END, this.onDragEnd, false, this);
};


feng.views.view3dobject.entities.Showerhead.prototype.onCameraZoomUpdate = function(prop){

  var control = this._view3d.modeController.control;

  control.setFov( prop.fov );
};


feng.views.view3dobject.entities.Showerhead.prototype.onDragStart = function(e){

  var prop = {
    fov: this._tapCamera.fov
  };

  this._cameraZoomTweener = TweenMax.to(prop, .5, {
    fov: this._tapCamera.fov - 5,
    'ease': Strong.easeOut,
    'onUpdate': this.onCameraZoomUpdate,
    'onUpdateParams': [prop],
    'onUpdateScope': this
  });
};


feng.views.view3dobject.entities.Showerhead.prototype.onDragEnd = function(e){

  var control = this._view3d.modeController.control;

  var prop = {
    fov: control.getFov()
  };

  this._cameraZoomTweener = TweenMax.to(prop, 1, {
    fov: this._tapCamera.fov,
    'ease': Strong.easeOut,
    'onUpdate': this.onCameraZoomUpdate,
    'onUpdateParams': [prop],
    'onUpdateScope': this
  });
};


feng.views.view3dobject.entities.Showerhead.prototype.onDrag = function(e){

  var clientX = e.target.clientX;
  var clientY = e.target.clientY;

  var startX = e.target.startX;
  var startY = e.target.startY;

  var originX = feng.viewportSize.width / 2;
  var originY = feng.viewportSize.height / 2;

  var rad = Math.atan2(clientY - originY, clientX - originX);
  rad -= Math.atan2(startY - originY, startX - originX);

  var mouseDeg = rad * (180 / Math.PI);

  var a1 = mouseDeg * (Math.PI / 180);
  var a2 = this._lastDeg * (Math.PI / 180);

  var radians = Math.atan2(Math.sin(a1 - a2), Math.cos(a1 - a2));
  var diffDeg = radians * (180 / Math.PI);

  this._lastDeg = mouseDeg;

  this._totalDeg += diffDeg;

  var count = Math.floor( this._totalDeg / 360 );
  var countT = Math.max( 0, Math.min(1, this._totalDeg / (360 * this._totalCount)) );

  this._handle.rotation.x += goog.math.toRadians(diffDeg) * (1 - countT) * .35;

  if(count >= this._totalCount) {

    this._waterdrop.view3dObject.removeFromScene();

    this.onDragEnd();

    this.unlock();
    this.stopInteraction();
  }
};