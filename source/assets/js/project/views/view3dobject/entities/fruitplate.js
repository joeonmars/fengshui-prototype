goog.provide('feng.views.view3dobject.entities.FruitPlate');

goog.require('feng.views.view3dobject.HolderObject');


/**
 * @constructor
 * A fruit plate that can hold fruits
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
goog.inherits(feng.views.view3dobject.entities.FruitPlate, feng.views.view3dobject.HolderObject);


feng.views.view3dobject.entities.FruitPlate.prototype.createHolder = function(){

  goog.base(this, 'createHolder');

  this._holder.position.set( -115.01, 50.36, -67.80 );
};


feng.views.view3dobject.entities.FruitPlate.prototype.drop = function( view3dObject ){

  var name = view3dObject.name;
  var orientation = feng.views.view3dobject.entities.FruitPlate.Orientations[ name ];

  this._fruits[ name ] = true;

  var object3d = view3dObject.object3d;
  
  object3d.position.copy( orientation.position );
  object3d.rotation.copy( orientation.rotation );

  this._holder.add( object3d );

  // check all fruits status for unlock
  var isDone = this._fruits['apple'] && this._fruits['orange'] && this._fruits['pineapple'] && this._fruits['peach'];

  if(isDone) {
    this.unlock();
    this.stopInteraction();
  }
};


feng.views.view3dobject.entities.FruitPlate.prototype.startInteraction = function(){

  goog.base(this, 'startInteraction');

  if(this.isUnlocked()) return;

  this._interactionHandler.listen(this._view3d.domElement, 'click', this.onClick, false, this);
};


feng.views.view3dobject.entities.FruitPlate.prototype.onClick = function(e){

  var arms = this._view3d.arms;

  var camera = this._view3d.cameraController.activeCamera;
  var viewSize = this._view3d.viewSize;
  var fruitPlate = [this.object3d];
  var clickedObjects = feng.utils.ThreeUtils.getObjectsBy2DPosition( e.clientX, e.clientY, fruitPlate, camera, viewSize );

  if(clickedObjects.length > 0) {

    var fruitName = goog.object.findKey(this._fruits, function(dropped, name) {
      return (dropped === false);
    });

    var fruit = this._view3d.getView3dObject( fruitName );

    arms.removeItem( fruit );
    this.drop( fruit );

    this.dispatchEvent({
      type: feng.events.EventType.CHANGE,
      fruit: fruitName
    });
  }
};


feng.views.view3dobject.entities.FruitPlate.Orientations = {
  'apple': {
    position: new THREE.Vector3(2.38, 2.75, -3.71),
    rotation: new THREE.Euler(-0.28, -0.28, -0.32)
  },
  'orange': {
    position: new THREE.Vector3(3.49, 2.32, 1.97),
    rotation: new THREE.Euler(0.38, 0.24, -0.18)
  },
  'pineapple': {
    position: new THREE.Vector3(-4.08, 5.76, 5.25),
    rotation: new THREE.Euler(0.78, -0.3, 0.36)
  },
  'peach': {
    position: new THREE.Vector3(-3.16, 2, -3.63),
    rotation: new THREE.Euler(0.14, 0, 0)
  }
};