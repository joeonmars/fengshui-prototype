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
};


feng.views.view3dobject.entities.FruitPlate.prototype.startInteraction = function(){

  goog.base(this, 'startInteraction');

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
  }
};


feng.views.view3dobject.entities.FruitPlate.Orientations = {
  'apple': {
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0)
  },
  'orange': {
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0)
  },
  'pineapple': {
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0)
  },
  'peach': {
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0)
  }
};