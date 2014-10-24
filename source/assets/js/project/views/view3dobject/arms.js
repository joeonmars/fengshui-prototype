goog.provide('feng.views.view3dobject.Arms');

goog.require('feng.views.view3dobject.InteractiveObject');
goog.require('feng.views.view3dobject.MovableObject');

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

  this.addToScene();
};
goog.inherits(feng.views.view3dobject.Arms, feng.views.view3dobject.InteractiveObject);


feng.views.view3dobject.Arms.prototype.addItem = function( view3dObject ){

  goog.array.insert( this._items, view3dObject );

  this.object3d.add( view3dObject.object3d );

  var objectOrientation = feng.views.view3dobject.Arms.Orientations[ view3dObject.name ];
  view3dObject.object3d.position.copy( objectOrientation.position );
  view3dObject.object3d.rotation.copy( objectOrientation.rotation );

  // activate drop button if a movable object is added
  if(view3dObject instanceof feng.views.view3dobject.MovableObject) {

    this._view3d.hud.dropButton.activate( view3dObject );
  }

  console.log( 'collected by arms: ' + view3dObject.name );
};


feng.views.view3dobject.Arms.prototype.removeItem = function( view3dObject ){

  goog.array.remove( this._items, view3dObject );

  this.object3d.remove( view3dObject.object3d );

  // deactivate drop button if a movable object is removed
  if(view3dObject instanceof feng.views.view3dobject.MovableObject) {

    this._view3d.hud.dropButton.deactivate();
  }

  console.log( 'removed from arms: ' + view3dObject.name );
};


feng.views.view3dobject.Arms.prototype.update = function( position, rotation ){

  this.object3d.rotation.copy( rotation );
  this.object3d.position.copy( position ).setY( feng.controllers.controls.Controls.Default.ARM_HEIGHT );
  this.object3d.translateZ( -10 );
};


feng.views.view3dobject.Arms.Orientations = {
  'apple': {
    position: new THREE.Vector3(0.47, 6.10, -4.36),
    rotation: new THREE.Euler(-0.26, 0.16, 0.02)
  },
  'orange': {
    position: new THREE.Vector3(4.90, 4.31, -2.08),
    rotation: new THREE.Euler(0.70, 0.26, -0.50)
  },
  'pineapple': {
    position: new THREE.Vector3(-4.73, 6.62, -0.80),
    rotation: new THREE.Euler(0.12, -0.16, 0.14)
  },
  'peach': {
    position: new THREE.Vector3(0.69, 4.53, -0.42),
    rotation: new THREE.Euler(0.70, 0.08, -0.60)
  },
  'dining-chair': {
    position: new THREE.Vector3(5, -25, -20),
    rotation: new THREE.Euler(0, 0, 0.17)
  },
  'bear': {
    position: new THREE.Vector3(0.47, 0, -5),
    rotation: new THREE.Euler(-0.26, 3.49, 0.02)
  },
  'computer': {
    position: new THREE.Vector3(0.47, -22, -12),
    rotation: new THREE.Euler(-0.26, 3.49, 0.02)
  },
  'swivel-chair': {
    position: new THREE.Vector3(10, -30, -40),
    rotation: new THREE.Euler(0, 3.49, -0.5)
  },
  'setsquare': {
    position: new THREE.Vector3(0.47, -2, -10),
    rotation: new THREE.Euler(-0.78, -1.57, 0.02)
  }
};