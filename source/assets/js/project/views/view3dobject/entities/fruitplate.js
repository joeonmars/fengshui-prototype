goog.provide('feng.views.view3dobject.entities.FruitPlate');

goog.require('feng.views.view3dobject.HolderObject');


/**
 * @constructor
 * A fruit plate that can hold fruits
 */
feng.views.view3dobject.entities.FruitPlate = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this.fruits = {};
};
goog.inherits(feng.views.view3dobject.entities.FruitPlate, feng.views.view3dobject.HolderObject);


feng.views.view3dobject.entities.FruitPlate.prototype.createHolder = function(){

  goog.base(this, 'createHolder');

  this._holder.position.set( -115.01, 50.36, -67.80 );
};


feng.views.view3dobject.entities.FruitPlate.prototype.drop = function( view3dObject ){

  var name = view3dObject.name;
  var orientation = feng.views.view3dobject.entities.FruitPlate.Orientations[ name ];

  this.fruits[ name ] = view3dObject;

  view3dObject.position.copy( orientation.position );
  view3dObject.rotation.copy( orientation.rotation );
};


feng.views.view3dobject.entities.FruitPlate.prototype.startInteraction = function(){

  goog.base(this, 'startInteraction');
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