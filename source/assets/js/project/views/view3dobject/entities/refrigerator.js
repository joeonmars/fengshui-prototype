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

  this._door = this.object3d.getObjectByName('refrigerator-door');

  this._fruits = null;
};
goog.inherits(feng.views.view3dobject.entities.Refrigerator, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.Refrigerator.prototype.enableRender = function(){

  goog.base(this, 'enableRender');

  this._door.view3dObject.enableRender();

  this._fruits = this._fruits || this.getFruits();

  goog.array.forEach(this._fruits, function(fruit) {
    fruit.view3dObject.enableRender();
  });
};


feng.views.view3dobject.entities.Refrigerator.prototype.disableRender = function(){

  goog.base(this, 'disableRender');

  this._door.view3dObject.disableRender();

  this._fruits = this._fruits || this.getFruits();

  goog.array.forEach(this._fruits, function(fruit) {
    fruit.view3dObject.disableRender();
  });
};


feng.views.view3dobject.entities.Refrigerator.prototype.getFruits = function(){

  this._fruits = [];

  goog.array.forEach( ['apple', 'pineapple', 'orange', 'peach'], function(name) {

    var fruit = this.object3d.getObjectByName( name );
    if(fruit) {
      this._fruits.push( fruit );
    }
  }, this );

  return this._fruits;
};


feng.views.view3dobject.entities.Refrigerator.prototype.startInteraction = function(){

  goog.base(this, 'startInteraction');

  this._fruits = this.getFruits();
  
  this._interactionHandler.listen(this._view3d.domElement, 'click', this.onClick, false, this);
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


feng.views.view3dobject.entities.Refrigerator.prototype.onClick = function(e){

  var arms = this._view3d.arms;

  var camera = this._view3d.cameraController.activeCamera;
  var viewSize = this._view3d.viewSize;
  var clickedObjects = feng.utils.ThreeUtils.getObjectsBy2DPosition( e.clientX, e.clientY, this._fruits, camera, viewSize );

  if(clickedObjects.length > 0) {
    var fruit = clickedObjects[0];
    arms.addItem( fruit.object.view3dObject );
  }
};