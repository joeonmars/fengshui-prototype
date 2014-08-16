goog.provide('feng.views.view3dobject.Arms');

goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * A placeholder of temporarily possessed items in view3d
 */
feng.views.view3dobject.Arms = function( view3d ){

  var object3d = new THREE.Object3D();
  object3d.name = 'arms';

  // -- test
  /*
  var geometry = new THREE.BoxGeometry( 10, 10, 10 );
  var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );

  mesh = new THREE.Mesh( geometry, material );
  mesh.translateY( 5 );

  object3d.add( mesh );
  */
  // -- end

  var data = {};

  goog.base(this, object3d, data, view3d);

  this._items = [];

  this.add();
};
goog.inherits(feng.views.view3dobject.Arms, feng.views.view3dobject.InteractiveObject);


feng.views.view3dobject.Arms.prototype.addItem = function( interactiveObject ){

  goog.array.insert( this._items, interactiveObject );

  var objectContainer = feng.views.view3dobject.Arms.Presets[ interactiveObject.name ];
  objectContainer.add( interactiveObject.object3d );

  this.object3d.add( objectContainer );
};


feng.views.view3dobject.Arms.prototype.removeItem = function( interactiveObject ){

  goog.array.remove( this._items, interactiveObject );

  var objectContainer = feng.views.view3dobject.Arms.Presets[ interactiveObject.name ];
  objectContainer.remove( interactiveObject.object3d );
  
  this.object3d.remove( objectContainer );
};


feng.views.view3dobject.Arms.prototype.update = function( position, rotation ){

  this.object3d.rotation.copy( rotation );
  this.object3d.position.copy( position ).setY( feng.controllers.controls.Controls.Default.ARM_HEIGHT );
  this.object3d.translateZ( -10 );
};


feng.views.view3dobject.Arms.Presets = {
  'apple': new THREE.Object3D(),
  'orange': new THREE.Object3D(),
  'pineapple': new THREE.Object3D(),
  'peach': new THREE.Object3D()
};