goog.provide('feng.views.view3dobject.StairsObject');

goog.require('goog.fx.easing');
goog.require('feng.views.view3dobject.View3DObject');

/**
 * @constructor
 * A view3d object that leads between lower floor to upper floor
 * Structure illustrated as below
 * 
 * ☻ 'upper'
 *  \
 *   \
 *    \
 *     \
 *      \☻ 'lower'
 *
 * speed 0.48m/s
 * step size 0.2m by 0.2m
 */
feng.views.view3dobject.StairsObject = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

};
goog.inherits(feng.views.view3dobject.StairsObject, feng.views.view3dobject.View3DObject);


feng.views.view3dobject.StairsObject.prototype.init = function() {

  // lower / upper global position in view3d
  this.lowerPosition = feng.utils.ThreeUtils.getWorldPosition( this.object3d.getObjectByName('lower') );
  this.upperPosition = feng.utils.ThreeUtils.getWorldPosition( this.object3d.getObjectByName('upper') );

  // adjust the lower / upper position within grid
  var pathfinder = feng.controllers.view3d.PathfindingController.getInstance();

  var matrixId = 'test-matrix';
  var collidableBoxes = this._view3d.getCollidableBoxes();
  var floorObjects = this._view3d.getObjectsOfFloor();
  
  var matrixData = pathfinder.generateMatrix( matrixId, collidableBoxes, floorObjects );

  var lowerTile = pathfinder.getTileByPosition( this.lowerPosition, matrixData );
  lowerTile = pathfinder.getClosestWalkableTile( lowerTile, matrixData );
  
  var lowerTilePosition = pathfinder.getTilePosition( lowerTile, matrixData );

  this.lowerPosition.copy( lowerTilePosition );

  /* ----- upper position WIP ----- */

  // distance of walk
  this.distance = this.lowerPosition.distanceTo( this.upperPosition );

  // time duration of walk, in seconds
  this.duration = this.distance / (0.48 * 100 / 2);

  // number of steps
  var stepLength = Math.sqrt( Math.pow(0.2 * 100, 2) + Math.pow(0.2 * 100, 2) );
  this.numSteps = Math.round( this.distance / stepLength );

  // lerped position
  this._lerpedPosition = new THREE.Vector3();
  this._stepStart = new THREE.Vector3();
  this._stepEnd = new THREE.Vector3();

  // test..
  /*
  console.log(this.duration, this.numSteps, this.distance);

  var geometry = new THREE.BoxGeometry( 10, 10, 10 );
  var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
  var mesh = new THREE.Mesh( geometry, material );
  this._view3d.scene.add( mesh );

  var obj = {
    t: 0
  };

  TweenMax.fromTo(obj, this.duration, {
    t: 0
  }, {
    t: 1,
    ease: Linear.easeNone,
    repeat: -1,
    onUpdate: function() {
      mesh.position.copy( this.getPositionByT( obj.t ) );
    },
    onUpdateScope: this
  });
  */
};


feng.views.view3dobject.StairsObject.prototype.getPositionByT = function(t, descending) {

  var start = descending ? this.upperPosition : this.lowerPosition;
  var end = descending ? this.lowerPosition : this.upperPosition;

  var stepL = 1 / this.numSteps;
  var endSegment = Math.ceil( t / stepL );
  var startSegment = endSegment - 1;

  var endT = endSegment * stepL;
  var startT = startSegment * stepL;

  this._stepStart.copy( start ).lerp( end, startT );
  this._stepEnd.copy( start ).lerp( end, endT );

  // for easing functions, https://gist.github.com/gre/1650294
  var stepT = (t - startT) / (endT - startT);
  stepT = goog.fx.easing.inAndOut( stepT );

  var position = this._lerpedPosition.copy( this._stepStart ).lerp( this._stepEnd, stepT );
  position.y += feng.controllers.controls.Controls.Default.STANCE_HEIGHT;

  return position;
};