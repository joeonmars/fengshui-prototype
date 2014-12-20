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

  this._door = this.object3d.getObjectByName('closet-door');

  this._jarsPullOutTweener = null;

  this._anchorX = -41;

  this._anchors = [
    new THREE.Vector3(this._anchorX, 85.489, -40.44),
    new THREE.Vector3(this._anchorX, 74.602, -39.45),
    new THREE.Vector3(this._anchorX, 74.602, -44.72),
    new THREE.Vector3(this._anchorX, 74.602, -50.22),
    new THREE.Vector3(this._anchorX, 74.602, -55.70),
    new THREE.Vector3(this._anchorX, 63.715, -39.70),
    new THREE.Vector3(this._anchorX, 63.715, -46.23),
    new THREE.Vector3(this._anchorX, 63.715, -52.54),
    new THREE.Vector3(this._anchorX, 63.715, -59.22),
    new THREE.Vector3(this._anchorX, 63.715, -65.45)
  ];

  this._anchorFlags = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ];

  this._anchorPlane = null;
  this._dragPlane = null;

  this._dummyJar = null;

  this._dummyJars = [];

  this._dragStartPosition = new THREE.Vector3();

  this._cameraZoomTweener = null;

  this._mousePosition = {
    x: 0,
    y: 0
  };

  this._cameraTweenerProp = {
    fov: 0,
    updateDragOffset: false
  };

  this._swingProgress = 0;
  this._rotationProgress = 0;

  // dragger to drag the item
  this._dragger = new goog.fx.Dragger( this._view3d.domElement );
  this._dragger.defaultAction = goog.nullFunction;
};
goog.inherits(feng.views.view3dobject.entities.Closet, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.Closet.prototype.init = function(){

  goog.base(this, 'init');

  // calculate pulled out position
  var center = this.getCenter();
  var pulledOutPosition = center.clone().setX( center.x + 20 );

  // create plane
  this._dragPlane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 50, 50, 1, 1 ) );
  this._dragPlane.visible = false;
  this._dragPlane.rotation.y = Math.PI/2;
  this._dragPlane.position.copy( pulledOutPosition );

  this._anchorPlane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 50, 50, 1, 1 ) );
  this._anchorPlane.visible = false;
  this._anchorPlane.rotation.y = Math.PI/2;
  this._anchorPlane.position.copy( center ).setX( this._anchorX );

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
    'jar-9',
    'jar-10'
  ];

  var swingValues = [.15, .1, -.08, .3, -.07, .1, .05, .2, .05, -.05];

  var pulledOutPositions = {
    'jar-1': {y: 72, z: -36},
    'jar-2': {y: 64, z: -40},
    'jar-3': {y: 72, z: -65},
    'jar-4': {y: 80, z: -58},
    'jar-5': {y: 82, z: -40},
    'jar-6': {y: 64, z: -48},
    'jar-7': {y: 65, z: -60},
    'jar-8': {y: 68, z: -63},
    'jar-9': {y: 64, z: -55},
    'jar-10': {y: 82, z: -67}
  };

  var pulledOutRotations = {
    'jar-1': {x: -0.12, y: 0.04, z: 0.20},
    'jar-2': {x: 1.00, y: 0.06, z: -0.46},
    'jar-3': {x: 0.58, y: 0.08, z: -0.42},
    'jar-4': {x: -0.50, y: -0.64, z: -0.82},
    'jar-5': {x: 0.8, y: 0.06, z: -0.54},
    'jar-6': {x: 0.38, y: -0.18, z: -0.34},
    'jar-7': {x: 0.56, y: -0.82, z: 0.06},
    'jar-8': {x: -0.04, y: 1.00, z: -0.14},
    'jar-9': {x: -0.52, y: -0.08, z: -0.14},
    'jar-10': {x: -0.64, y: -1.08, z: -0.38}
  };

  var jarTweeners = goog.array.map(jarNames, function(jarName, index) {

    // create dummyJars for dragging
    var jar = this.object3d.getObjectByName(jarName).view3dObject;
    var dummyJar = jar.object3d.clone();
    dummyJar.visible = false;
    this._dummyJars.push( dummyJar );

    dummyJar.userData.jar = jar;
    dummyJar.userData.isAnchored = false;
    dummyJar.userData.anchor = null;

    dummyJar.userData.orientation = {
      positionX: dummyJar.position.x,
      positionY: dummyJar.position.y,
      positionZ: dummyJar.position.z,
      rotationX: dummyJar.rotation.x,
      rotationY: dummyJar.rotation.y,
      rotationZ: dummyJar.rotation.z
    };

    dummyJar.userData.dragOffset = new THREE.Vector3();
    dummyJar.userData.swingMultiplier = 1;
    dummyJar.userData.swing = swingValues[index];
    dummyJar.userData.rotationMultiplier = 1;

    var jarTweener = TweenMax.to(dummyJar.userData.orientation, .65, {
      positionX: pulledOutPosition.x,
      positionY: pulledOutPositions[jar.name].y,
      positionZ: pulledOutPositions[jar.name].z,
      rotationX: pulledOutRotations[jar.name].x,
      rotationY: pulledOutRotations[jar.name].y,
      rotationZ: pulledOutRotations[jar.name].z
    });

    return jarTweener;

  }, this);

  this._jarsPullOutTweener = new TimelineMax({
    'paused': true,
    'onComplete': this.onJarsPulledComplete,
    'onCompleteScope': this
  });

  this._jarsPullOutTweener.add( jarTweeners, '+=0', 'start', .1 );
};


feng.views.view3dobject.entities.Closet.prototype.updateRaycaster = function(){

  var mouseX = ( this._mousePosition.x / feng.viewportSize.width ) * 2 - 1;
  var mouseY = - ( this._mousePosition.y / feng.viewportSize.height ) * 2 + 1;
  var camera = this._view3d.cameraController.activeCamera;
  var cameraPosition = this._view3d.modeController.control.getPosition();

  var vector = new THREE.Vector3( mouseX, mouseY, 0.5 ).unproject( camera );
  var direction = vector.sub( cameraPosition ).normalize();

  var raycaster = feng.utils.ThreeUtils.raycaster;
  raycaster.set( cameraPosition, direction );

  return raycaster;
};


feng.views.view3dobject.entities.Closet.prototype.getRaycastPositionOnPlane = function( plane ){

  var raycaster = feng.utils.ThreeUtils.raycaster;
  var intersects = raycaster.intersectObject( plane );

  return (intersects.length > 0 ? intersects[0].point : null);
};


feng.views.view3dobject.entities.Closet.prototype.detectNearestAnchor = function(){

  var raycastPosition = this.getRaycastPositionOnPlane( this._anchorPlane );

  if(raycastPosition) {

    var i, l = this._anchors.length;
    var shortestDistance = 4;
    var nearestAnchor;

    for(i = 0; i < l; i++) {

      var anchor = this._anchors[i];

      if(this._anchorFlags[i]) continue;

      var distance = raycastPosition.distanceTo( anchor );

      if(distance < shortestDistance) {

        shortestDistance = distance;
        nearestAnchor = anchor;
      }
    }

    return nearestAnchor;

  }else {

    return null;
  }
};


feng.views.view3dobject.entities.Closet.prototype.startInteraction = function(){

  goog.base(this, 'startInteraction');

  // add extra meshes to scene for calculation
  var scene = this._view3d.scene;

  scene.add( this._dragPlane );
  scene.add( this._anchorPlane );

  goog.array.forEach(this._dummyJars, function(dummyJar) {
    scene.add( dummyJar );
  });

  // pull out jars
  this._jarsPullOutTweener.restart();

  TweenMax.to(this, .5, {
    _swingProgress: 1,
    _rotationProgress: 1
  });

  goog.fx.anim.registerAnimation( this );
};


feng.views.view3dobject.entities.Closet.prototype.stopInteraction = function(){

  goog.base(this, 'stopInteraction');

  // remove extra meshes to scene for calculation
  var scene = this._view3d.scene;

  scene.remove( this._dragPlane );
  scene.remove( this._anchorPlane );

  goog.array.forEach(this._dummyJars, function(dummyJar) {
    scene.remove( dummyJar );
  });

  TweenMax.to(this, .5, {
    _swingProgress: 0,
    _rotationProgress: 0
  });

  goog.fx.anim.unregisterAnimation( this );
};


feng.views.view3dobject.entities.Closet.prototype.updateDragOffsetOfJar = function(){

  var raycastPosition = this.getRaycastPositionOnPlane( this._dragPlane );

  this._dummyJar.userData.dragOffset.subVectors( raycastPosition, this._dragStartPosition );
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
  var intersects = feng.utils.ThreeUtils.getObjectsBy2DPosition( e.clientX, e.clientY, this._dummyJars, camera, viewSize );

  if ( intersects.length > 0 ) {

    var dummyJar = intersects[0].object;

    if(dummyJar.userData.isAnchored) {

      this._dummyJar = null;
      return;

    }else {

      this._dummyJar = dummyJar;
    }

    this._mousePosition.x = e.clientX;
    this._mousePosition.y = e.clientY;

    TweenMax.to(this._dummyJar.userData, .5, {
      swingMultiplier: 0,
      rotationMultiplier: 0
    });

    // set drag start position of jar
    this.updateRaycaster();

    var raycastPosition = this.getRaycastPositionOnPlane( this._dragPlane );

    var relPosition = feng.utils.ThreeUtils.getLocalPositionOfWorld( this._dummyJar, raycastPosition );
    var actualPositionX = relPosition.x + this._dummyJar.userData.orientation.positionX;
    var actualPositionY = relPosition.y + this._dummyJar.userData.orientation.positionY;
    var actualPositionZ = relPosition.z + this._dummyJar.userData.orientation.positionZ;

    this._dragStartPosition.set( actualPositionX, actualPositionY, actualPositionZ );

    // update drag offset of jar
    this.updateDragOffsetOfJar();

    // zoom in on first drag occurs
    if(!this._cameraZoomTweener) {

      this._cameraTweenerProp.fov = this.specialCameraSettings.fov;
      this._cameraTweenerProp.updateDragOffset = true;

      this._cameraZoomTweener = TweenMax.to(this._cameraTweenerProp, 1, {
        fov: this.specialCameraSettings.fov - 12,
        'ease': Strong.easeOut,
        'onUpdate': this.onCameraZoomUpdate,
        'onUpdateParams': [this._cameraTweenerProp],
        'onUpdateScope': this
      });
    }
  }
};


feng.views.view3dobject.entities.Closet.prototype.onDragEnd = function(e){

  if(!this._dummyJar) {
    return;
  }

  TweenMax.to(this._dummyJar.userData.dragOffset, .5, {
    'x': 0,
    'y': 0,
    'z': 0
  });

  var isAnchored = this._dummyJar.userData.isAnchored;

  TweenMax.to(this._dummyJar.userData, .5, {
    swingMultiplier: isAnchored ? 0 : 1,
    rotationMultiplier: isAnchored ? 0 : 1,
  });

  this._dummyJar = null;

  // update anchor flags
  goog.array.forEach(this._dummyJars, function(dummyJar) {
    var anchorIndex = goog.array.indexOf(this._anchors, dummyJar.userData.anchor);
    this._anchorFlags[ anchorIndex ] = dummyJar.userData.isAnchored;
  }, this);

  // zoom out when complete
  var notAnchoredJar = goog.array.find(this._dummyJars, function(dummyJar) {
    return (dummyJar.userData.isAnchored === false);
  });

  if(!notAnchoredJar) {

    var control = this._view3d.modeController.control;

    this._cameraTweenerProp.fov = control.getFov();
    this._cameraTweenerProp.updateDragOffset = false;

    this._cameraZoomTweener = TweenMax.to(this._cameraTweenerProp, 1, {
      fov: this.specialCameraSettings.fov,
      'onUpdate': this.onCameraZoomUpdate,
      'onUpdateParams': [this._cameraTweenerProp],
      'onUpdateScope': this,
      'onComplete': this.onCameraZoomOutComplete,
      'onCompleteScope': this
    });
  }
};


feng.views.view3dobject.entities.Closet.prototype.onDrag = function(e){

  if(!this._dummyJar) {
    return;
  }

  this._mousePosition.x = e.clientX;
  this._mousePosition.y = e.clientY;

  this.updateRaycaster();

  this.updateDragOffsetOfJar();

  var anchor = this.detectNearestAnchor();
  this._dummyJar.userData.isAnchored = anchor ? true : false;
  this._dummyJar.userData.anchor = anchor;
};


feng.views.view3dobject.entities.Closet.prototype.onCameraZoomUpdate = function(prop){

  var control = this._view3d.modeController.control;

  control.setFov( prop.fov );

  if(prop.updateDragOffset) {
    this.updateDragOffsetOfJar();
  }
};


feng.views.view3dobject.entities.Closet.prototype.onCameraZoomOutComplete = function(){

  this.unlock();
  this.stopInteraction();
};


feng.views.view3dobject.entities.Closet.prototype.onAnimationFrame = function(now){

  goog.array.forEach(this._dummyJars, function(dummyJar, index) {

    var userData = dummyJar.userData;

    var swing = userData.swing;
    var swingMultiplier = userData.swingMultiplier;
    var rotationMultiplier = userData.rotationMultiplier;
    var dragOffset = userData.dragOffset;
    var orientation = userData.orientation;

    dummyJar.position.x = orientation.positionX;
    dummyJar.position.y = orientation.positionY + Math.sin( now * 0.001 * swing ) * this._swingProgress * swingMultiplier + dragOffset.y;
    dummyJar.position.z = orientation.positionZ + Math.cos( now * 0.001 * swing ) * this._swingProgress * swingMultiplier + dragOffset.z;
  
    dummyJar.rotation.x = orientation.rotationX * this._rotationProgress * rotationMultiplier;
    dummyJar.rotation.y = orientation.rotationY * this._rotationProgress * rotationMultiplier;
    dummyJar.rotation.z = orientation.rotationZ * this._rotationProgress * rotationMultiplier;

    var jarTargetPosition = userData.isAnchored ? userData.anchor : dummyJar.position;

    var jar = dummyJar.userData.jar;
    jar.object3d.position.x += ( jarTargetPosition.x - jar.object3d.position.x ) * .2;
    jar.object3d.position.y += ( jarTargetPosition.y - jar.object3d.position.y ) * .2;
    jar.object3d.position.z += ( jarTargetPosition.z - jar.object3d.position.z ) * .2;

    jar.object3d.rotation.copy( dummyJar.rotation );

  }, this);
};