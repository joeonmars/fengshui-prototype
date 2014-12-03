goog.provide('feng.views.view3dobject.entities.GlassBowl');

goog.require('feng.views.view3dobject.TipObject');

/**
 * @constructor
 * The glass bowl where the goldfish lives
 */
feng.views.view3dobject.entities.GlassBowl = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._fish = null;
  
  this._fishPosition = new THREE.Vector3();
  this._fishRotation = new THREE.Euler();

  this._fishMoveTweener = null;
  this._fishBreathTweener = null;

  this._hasDroppedFish = false;
};
goog.inherits(feng.views.view3dobject.entities.GlassBowl, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.GlassBowl.prototype.init = function(){

  goog.base(this, 'init');

  var water = this.object3d.getObjectByName('fish-bowl-water');
  water.material.reflectivity = 0.65;
  water.material.opacity = 0.25;
  water.material.transparent = true;
  water.material.shininess = 10;
  water.material.envMap = this._view3d.createCubeMap( this.getCenter(), 512 );
  water.material.needsUpdate = true;

  //
  this._fish = this._view3d.getView3dObject('goldfish');

  var transform = new THREE.Matrix4().makeRotationY( Math.PI/2 );
  this._fish.object3d.geometry.applyMatrix( transform );

  this._fish.removeFromScene();
};


feng.views.view3dobject.entities.GlassBowl.prototype.onCameraIn = function(){

  goog.base(this, 'onCameraIn');

  if(this._hasDroppedFish) {

    this.tweenFish();
  }
};


feng.views.view3dobject.entities.GlassBowl.prototype.onCameraOut = function(){

  goog.base(this, 'onCameraOut');

  if(this._hasDroppedFish) {

    if(this._fishMoveTweener) {
      this._fishMoveTweener.kill();
    }

    if(this._fishBreathTweener) {
      this._fishBreathTweener.kill();
    }
  }
};


feng.views.view3dobject.entities.GlassBowl.prototype.startInteraction = function(){

  goog.base(this, 'startInteraction');

  if(!this._hasDroppedFish) {

    this._fish.addToScene( this.object3d );

    TweenMax.fromTo(this._fish.object3d.position, 4, {
      'y': this._fish.object3d.position.y + 30
    }, {
      'y': this._fish.object3d.position.y,
      'immediateRender': true,
      'ease': Expo.easeOut,
      'onComplete': this.onFishDropped,
      'onCompleteScope': this
    });
  }
};


feng.views.view3dobject.entities.GlassBowl.prototype.tweenFish = function(){

  var duration = Math.random() * 3 + 2;
  var delay = Math.random() * 1;
  var radX = 3;
  var radZ = 3;

  var fish = this._fish.object3d;

  var fromPosition = fish.position.clone();
  var toPosition = fish.position.clone().set( goog.math.uniformRandom( -radX, radX ), 0, goog.math.uniformRandom( -radZ, radZ ) );

  var fromRotation = fish.rotation.clone();

  var lookAtQ = feng.utils.ThreeUtils.getQuaternionByLookAt( fromPosition, toPosition );
  var toRotation = fish.rotation.clone().setFromQuaternion( lookAtQ );

  var prop = {
    t: 0,
    fromPosition: fromPosition,
    toPosition: toPosition,
    fromRotation: fromRotation,
    toRotation: toRotation
  };

  this._fishMoveTweener = TweenMax.to( prop, duration, {
    t: 1,
    'delay': delay,
    'onUpdate': this.updateFish,
    'onUpdateParams': [prop],
    'onUpdateScope': this,
    'onComplete': this.tweenFish,
    'onCompleteScope': this
  });

  if(!this._fishBreathTweener || !this._fishBreathTweener.isActive()) {
    this._fishBreathTweener = TweenMax.fromTo( fish.scale, .85, {
      'x': 1
    }, {
      'x': 1.1,
      'yoyo': true,
      'repeat': -1
    });
  }
};


feng.views.view3dobject.entities.GlassBowl.prototype.updateFish = function( prop ){

  var t = prop.t;
  var position = this._fishPosition.copy( prop.fromPosition ).lerp( prop.toPosition, t );
  var rotation = feng.utils.ThreeUtils.getLerpedEuler( prop.fromRotation, prop.toRotation, t, this._fishRotation );

  this._fish.object3d.position.copy( position );
  this._fish.object3d.rotation.copy( rotation );
};


feng.views.view3dobject.entities.GlassBowl.prototype.onFishDropped = function(){

  this.tweenFish();

  this.unlock();
  this.stopInteraction();

  this._hasDroppedFish = true;
};