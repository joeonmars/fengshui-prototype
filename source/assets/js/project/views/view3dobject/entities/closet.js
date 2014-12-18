goog.provide('feng.views.view3dobject.entities.Closet');

goog.require('goog.fx.Dragger');
goog.require('feng.views.view3dobject.TipObject');
goog.require('feng.utils.ThreeUtils');


/**
 * @constructor
 * The bathroom closet storing jars to be re-arranged
 */
feng.views.view3dobject.entities.Closet = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._door = this.object3d;
  this._jar = null;
  this._jars = [];
  this._jarObject3ds = [];

  this._jarsPullOutTweener = null;

  this._raycastPlane = null;

  this._dragStartPosition = new THREE.Vector3();

  this._cameraZoomTweener = null;

  // dragger to drag the item
  this._dragger = new goog.fx.Dragger( this._view3d.domElement );
  this._dragger.defaultAction = goog.nullFunction;
};
goog.inherits(feng.views.view3dobject.entities.Closet, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.Closet.prototype.init = function(){

  goog.base(this, 'init');

  // calculate pulled out position
  var center = this.getCenter();
  var pulledOutPosition = center.clone().setX( center.x + 35 );

  // set projector plane
  this._raycastPlane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 50, 50, 1, 1 ) );
  this._raycastPlane.visible = false;
  this._raycastPlane.rotation.y = Math.PI/2;
  this._raycastPlane.position.copy( pulledOutPosition );

  // get jars
  var jarNames = [
    'jar-1',
    'jar-2',
    'jar-3',
    'jar-4',
    'jar-5',
    'jar-6',
    'jar-7',
    'jar-8',
    'jar-9'
  ];

  var swingValues = [.35, .2, -.15, .6, -.15, .2, .1, .4, .1];

  for(var i = 0; i < jarNames.length; i++) {
    var jar = this._door.parent.getObjectByName( jarNames[i] );
    this._jarObject3ds.push( jar );
    this._jars.push( jar.view3dObject );
  }

  var jarTweeners = goog.array.map(this._jars, function(jar, index) {

    var jarPulledOutPosition = jar.basePosition.clone().setX( pulledOutPosition.x );
    jar.object3d.userData.pulledOutPosition = jarPulledOutPosition;
    jar.object3d.userData.dragOffset = new THREE.Vector3();
    jar.object3d.userData.swingMultiplier = 1;
    jar.object3d.userData.swing = swingValues[index];

    var jarTweener = TweenMax.to(jar.object3d.position, .65, {
      'x': pulledOutPosition.x
    });

    return jarTweener;
  });

  this._jarsPullOutTweener = new TimelineMax({
    'paused': true,
    'onComplete': this.onJarsPulledComplete,
    'onCompleteScope': this
  });

  this._jarsPullOutTweener.add( jarTweeners, '+=0', 'start', .2 );
};


feng.views.view3dobject.entities.Closet.prototype.getRaycastPositionOnPlane = function(x, y){

  var mouseX = ( x / feng.viewportSize.width ) * 2 - 1;
  var mouseY = - ( y / feng.viewportSize.height ) * 2 + 1;
  var camera = this._view3d.cameraController.activeCamera;
  var cameraPosition = this._view3d.modeController.control.getPosition();

  var vector = new THREE.Vector3( mouseX, mouseY, 0.5 ).unproject( camera );
  var direction = vector.sub( cameraPosition ).normalize();

  var raycaster = feng.utils.ThreeUtils.raycaster;
  raycaster.set( cameraPosition, direction );

  var intersects = raycaster.intersectObject( this._raycastPlane );

  return (intersects.length > 0 ? intersects[0].point : null);
};


feng.views.view3dobject.entities.Closet.prototype.startInteraction = function(){

  goog.base(this, 'startInteraction');

  // pull out jars
  this._jarsPullOutTweener.restart();

  this._view3d.scene.add( this._raycastPlane );

  goog.fx.anim.registerAnimation( this );
};


feng.views.view3dobject.entities.Closet.prototype.stopInteraction = function(){

  goog.base(this, 'stopInteraction');

  this._view3d.scene.remove( this._raycastPlane );

  goog.fx.anim.unregisterAnimation( this );
};


feng.views.view3dobject.entities.Closet.prototype.onCameraIn = function(){

  this.cameraInDuration = 2000;

  goog.base(this, 'onCameraIn');

  TweenMax.to(this._door.rotation, 1.5, {
    'y': -2.8,
    'ease': Quad.easeInOut
  });

  //feng.soundController.playSfx('refrigerator-open');
};


feng.views.view3dobject.entities.Closet.prototype.onCameraOut = function(){

  goog.base(this, 'onCameraOut');

  TweenMax.to(this._door.rotation, 1.5, {
    'y': 0,
    'ease': Quad.easeInOut
  });

  TweenMax.delayedCall(.8, function() {
    //feng.soundController.playSfx('refrigerator-close');
  });
};


feng.views.view3dobject.entities.Closet.prototype.onJarsPulledComplete = function(){

  this._interactionHandler.listen( this._dragger, goog.fx.Dragger.EventType.START, this.onDragStart, false, this);
  this._interactionHandler.listen( this._dragger, goog.fx.Dragger.EventType.DRAG, this.onDrag, false, this);
  this._interactionHandler.listen( this._dragger, goog.fx.Dragger.EventType.END, this.onDragEnd, false, this);
};


feng.views.view3dobject.entities.Closet.prototype.onDragStart = function(e){

  var camera = this._view3d.cameraController.activeCamera;
  var viewSize = this._view3d.viewSize;
  var intersects = feng.utils.ThreeUtils.getObjectsBy2DPosition( e.clientX, e.clientY, this._jarObject3ds, camera, viewSize );

  if ( intersects.length > 0 ) {

    var jar = intersects[0].object.view3dObject;

    if(TweenMax.isTweening(jar.object3d.userData.dragOffset)) {

      this._jar = null;

      return;

    }else {

      this._jar = jar;
    }

    TweenMax.to(this._jar.object3d.userData, .5, {
      swingMultiplier: 0
    });

    var raycastPosition = this.getRaycastPositionOnPlane(e.clientX, e.clientY);


    this._dragStartPosition.copy( raycastPosition );

    // zoom in
    var prop = {
      fov: this.specialCameraSettings.fov
    };

    this._cameraZoomTweener = TweenMax.to(prop, 1, {
      fov: this.specialCameraSettings.fov - 15,
      'ease': Strong.easeOut,
      'onUpdate': this.onCameraZoomUpdate,
      'onUpdateParams': [prop],
      'onUpdateScope': this
    });
  }
};


feng.views.view3dobject.entities.Closet.prototype.onDragEnd = function(e){

  if(!this._jar) {
    return;
  }

  TweenMax.to(this._jar.object3d.userData.dragOffset, .5, {
    'x': 0,
    'y': 0,
    'z': 0
  });

  TweenMax.to(this._jar.object3d.userData, .5, {
    swingMultiplier: 1
  });

  this._jar = null;

  // zoom out
  var control = this._view3d.modeController.control;

  var prop = {
    fov: control.getFov()
  };

  this._cameraZoomTweener = TweenMax.to(prop, 1, {
    fov: this.specialCameraSettings.fov,
    'onUpdate': this.onCameraZoomUpdate,
    'onUpdateParams': [prop],
    'onUpdateScope': this
  });
};


feng.views.view3dobject.entities.Closet.prototype.onDrag = function(e){

  if(!this._jar) {
    return;
  }

  var raycastPosition = this.getRaycastPositionOnPlane(e.clientX, e.clientY);

  this._jar.object3d.userData.dragOffset.subVectors( raycastPosition, this._dragStartPosition );
};


feng.views.view3dobject.entities.Closet.prototype.onCameraZoomUpdate = function(prop){

  var control = this._view3d.modeController.control;

  control.setFov( prop.fov );
};


feng.views.view3dobject.entities.Closet.prototype.onAnimationFrame = function(now){

  var pullProgress = this._jarsPullOutTweener.progress();

  goog.array.forEach(this._jars, function(jar, index) {
    var swing = jar.object3d.userData.swing;
    var swingMultiplier = jar.object3d.userData.swingMultiplier;
    var dragOffset = jar.object3d.userData.dragOffset;
    jar.object3d.position.y = jar.basePosition.y + Math.sin( now * 0.001 * swing ) * pullProgress * swingMultiplier + dragOffset.y;
    jar.object3d.position.z = jar.basePosition.z + Math.cos( now * 0.001 * swing ) * pullProgress * swingMultiplier + dragOffset.z;
  }, this);
};