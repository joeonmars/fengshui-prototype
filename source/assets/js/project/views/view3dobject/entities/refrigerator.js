goog.provide('feng.views.view3dobject.entities.Refrigerator');

goog.require('feng.models.Preload');
goog.require('feng.views.view3dobject.TipObject');
goog.require('feng.utils.ThreeUtils');


/**
 * @constructor
 * A refrigerator from where the fruits can be collected
 */
feng.views.view3dobject.entities.Refrigerator = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._door = this.object3d;

  this.cameraInDuration = 3000;

  this._cameraZoomTweener = null;
};
goog.inherits(feng.views.view3dobject.entities.Refrigerator, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.Refrigerator.prototype.getFruits = function(){

  var fruits = [];

  goog.array.forEach( ['peach', 'pineapple', 'orange', 'apple'], function(name) {

    fruits.push( this._view3d.getView3dObject(name) );
  }, this );

  return fruits;
};


feng.views.view3dobject.entities.Refrigerator.prototype.startInteraction = function(){

  goog.base(this, 'startInteraction');

  // zoom in camera a bit to start picking fruits
  var prop = {
    fov: this.data.camera.fov
  };
  
  this._cameraZoomTweener = TweenMax.to(prop, 1, {
    fov: prop.fov - 20,
    'ease': Quad.easeInOut,
    'onUpdate': this.onCameraZoomUpdate,
    'onUpdateParams': [prop],
    'onUpdateScope': this,
    'onComplete': this.onCameraZoomIn,
    'onCompleteScope': this,
    'onReverseComplete': this.onCameraZoomOut,
    'onReverseCompleteScope': this
  });
};


feng.views.view3dobject.entities.Refrigerator.prototype.onCameraZoomUpdate = function(prop){

  var control = this._view3d.modeController.control;

  control.setFov( prop.fov );
};


feng.views.view3dobject.entities.Refrigerator.prototype.onCameraZoomIn = function(){

  var fruits = this.getFruits();
  
  var arms = this._view3d.arms;

  // animate picking up fruits
  var timeline = new TimelineMax({
    'onComplete': this.onPickedLastFruit,
    'onCompleteScope': this
  });

  goog.array.forEach(fruits, function(fruit) {

    var endOrientation = arms.getWorldOrientation( fruit.name );
    var endPosition = endOrientation.position;
    var endRotation = endOrientation.rotation;
    var startPosition = fruit.object3d.position;
    var startRotation = fruit.object3d.rotation;

    var prop = {
      t: 0
    };

    var position = new THREE.Vector3();
    var rotation = new THREE.Euler();

    var tweener = TweenMax.to( prop, 1, {
      t: 1,
      'ease': Sine.easeIn,
      'onUpdate': function() {
        
        position = position.copy(startPosition).lerp(endPosition, prop.t);
        fruit.object3d.position.copy( position );

        rotation = feng.utils.ThreeUtils.getLerpedEuler( startRotation, endRotation, prop.t, rotation );
        fruit.object3d.rotation.copy( rotation );
      },
      'onComplete': this.onPickedFruit,
      'onCompleteParams': [fruit],
      'onCompleteScope': this
    });

    timeline.add( tweener );

  }, this);
};


feng.views.view3dobject.entities.Refrigerator.prototype.onCameraZoomOut = function(){

  this.unlock();
  this.stopInteraction();
};


feng.views.view3dobject.entities.Refrigerator.prototype.onCameraIn = function(){

  goog.base(this, 'onCameraIn');

  TweenMax.to(this._door.rotation, 2, {
    'y': 2.8,
    'ease': Quad.easeInOut
  });

  feng.soundController.playSfx('refrigerator-open');
};


feng.views.view3dobject.entities.Refrigerator.prototype.onCameraOut = function(){

  goog.base(this, 'onCameraOut');

  TweenMax.to(this._door.rotation, 1, {
    'y': 0,
    'ease': Quad.easeInOut
  });

  TweenMax.delayedCall(.8, function() {
    feng.soundController.playSfx('refrigerator-close');
  });
};


feng.views.view3dobject.entities.Refrigerator.prototype.onPickedFruit = function(fruit){

  var arms = this._view3d.arms;

  arms.addItem( fruit );
};


feng.views.view3dobject.entities.Refrigerator.prototype.onPickedLastFruit = function(){

  this._cameraZoomTweener.reverse();
};