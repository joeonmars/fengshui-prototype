goog.provide('feng.views.view3dobject.entities.FruitPlate');

goog.require('feng.views.view3dobject.TipObject');


/**
 * @constructor
 * A fruit plate that will contain fruits
 */
feng.views.view3dobject.entities.FruitPlate = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._fruits = {
    'apple': false,
    'orange': false,
    'pineapple': false,
    'peach': false
  };
};
goog.inherits(feng.views.view3dobject.entities.FruitPlate, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.FruitPlate.prototype.dropFruit = function( fruitId ){

  if(this._fruits[ fruitId ]) {

    return;

  }else {

    this._fruits[ fruitId ] = true;
  }

  var fruit = this._view3d.getView3dObject( fruitId );

  // animate drop
  var arms = this._view3d.arms;
  arms.removeItem( fruit );

  this.object3d.add( fruit.object3d );

  var startOrientation = arms.getWorldOrientation( fruitId );
  var worldPosition = startOrientation.position;
  var worldRotation = startOrientation.rotation;

  var startPosition = feng.utils.ThreeUtils.getLocalPositionOfWorld( this.object3d, worldPosition );
  var startRotation = feng.utils.ThreeUtils.getLocalRotationOfWorld( this.object3d, worldRotation );

  var endOrientation = feng.views.view3dobject.entities.FruitPlate.Orientations[ fruitId ];

  var endPosition = endOrientation.position.clone().setY( endOrientation.position.y + 10 );
  var endRotation = endOrientation.rotation;

  var prop = {
    t: 0
  };

  var position = new THREE.Vector3();
  var rotation = new THREE.Euler();

  TweenMax.to( prop, .8, {
    t: 1,
    'ease': Sine.easeInOut,
    'onUpdate': function() {
      
      position = position.copy(startPosition).lerp(endPosition, prop.t);
      fruit.object3d.position.copy( position );

      rotation = feng.utils.ThreeUtils.getLerpedEuler( startRotation, endRotation, prop.t, rotation );
      fruit.object3d.rotation.copy( rotation );
    },
    'onUpdateScope': this
  });

  TweenMax.to( fruit.object3d.position, .8, {
    'y': endOrientation.position.y,
    'delay': 1,
    'ease': Bounce.easeOut,
    'onComplete': this.onFruitDropped,
    'onCompleteScope': this
  });
};


feng.views.view3dobject.entities.FruitPlate.prototype.onFruitDropped = function(){

  // unlock if all fruits are dropped
  var isDone = this._fruits['apple'] && this._fruits['orange'] && this._fruits['pineapple'] && this._fruits['peach'];

  if(isDone) {
    this.unlock();
    this.stopInteraction();
  }
};


feng.views.view3dobject.entities.FruitPlate.Orientations = {
  'apple': {
    position: new THREE.Vector3(-115.46, 55.00, -67.47),
    rotation: new THREE.Euler(-0.28, -0.28, -0.32)
  },
  'orange': {
    position: new THREE.Vector3(-115.46, 55.00, -67.47),
    rotation: new THREE.Euler(-0.28, -0.28, -0.32)
  },
  'pineapple': {
    position: new THREE.Vector3(-115.46, 55.00, -67.47),
    rotation: new THREE.Euler(-0.28, -0.28, -0.32)
  },
  'peach': {
    position: new THREE.Vector3(-115.46, 55.00, -67.47),
    rotation: new THREE.Euler(-0.28, -0.28, -0.32)
  }
};