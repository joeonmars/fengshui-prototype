goog.provide('feng.views.view3dobject.MovableObject');

goog.require('feng.views.view3dobject.TipObject');


/**
 * @constructor
 * A tip object that can be resolved by moving to a new position
 */
feng.views.view3dobject.MovableObject = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._minCol = 0;
  this._maxCol = 0;
  this._minRow = 0;
  this._maxRow = 0;

  this._dropPosition = new THREE.Vector3();
};
goog.inherits(feng.views.view3dobject.MovableObject, feng.views.view3dobject.TipObject);


feng.views.view3dobject.MovableObject.prototype.updateTilesRange = function(){

  // get available tiles by destination position and range (in view3d unit)
  var destPos = this.data.position;
  var range = this.data.range;

  var matrixId = this._view3d.getMatrixId();
  var matrixData = feng.pathfinder.getMatrixData( matrixId );

  var rangeOfTiles = Math.round( range / 2 / matrixData.tileSize );  
  var destTile = feng.pathfinder.getTileByPosition( destPos, matrixData );

  var numCols = matrixData.numCols;
  var numRows = matrixData.numRows;

  this._minCol = Math.max( destTile[0] - rangeOfTiles, 0 );
  this._maxCol = Math.min( destTile[0] + rangeOfTiles, numCols - 1 );
  this._minRow = Math.max( destTile[1] - rangeOfTiles, 0 );
  this._maxRow = Math.min( destTile[1] + rangeOfTiles, numRows - 1 );

  /*
  console.log(
    'movable range of tiles: ' + rangeOfTiles,
    'destination tile col: ' + destTile[0] + ', row: ' + destTile[1],
    'min col: ' + this._minCol + ', max col: ' + this._maxCol + ', min row: ' + this._minRow + ', max row: ' + this._maxRow,
    'total cols: ' + numCols + ', total rows: ' + numRows);*/
};


feng.views.view3dobject.MovableObject.prototype.getPositionIfAvailable = function(){

  var control = this._view3d.modeController.control;
  var controlPosition = control.getPosition();

  var forward = control.getForwardVector();

  this._dropPosition.addVectors( controlPosition, forward.multiplyScalar(50) );

  var matrixId = this._view3d.getMatrixId();
  var matrixData = feng.pathfinder.getMatrixData( matrixId );

  var tile = feng.pathfinder.getTileByPosition( this._dropPosition, matrixData );
  var tileCol = tile[0];
  var tileRow = tile[1];

  var isInRange = ((tileCol >= this._minCol && tileCol <= this._maxCol) && (tileRow >= this._minRow && tileRow <= this._maxRow));

  return (isInRange ? this._dropPosition : null);
};


feng.views.view3dobject.MovableObject.prototype.pick = function(){

  this.updateTilesRange();

  var arms = this._view3d.arms;
  arms.addItem( this );

  var closeUpControls = this._view3d.modeController.getModeControl( feng.controllers.view3d.ModeController.Mode.CLOSE_UP );
  closeUpControls.close();
};


feng.views.view3dobject.MovableObject.prototype.drop = function(){

  var arms = this._view3d.arms;
  arms.removeItem( this );

  var position = this.getPositionIfAvailable();

  this.object3d.position.copy( this.data.position );
  this.object3d.rotation.copy( this.data.rotation );
  this.addToScene();

  if(this.data.parent) {
    var parentView3dObject = this._view3d.getView3dObject( this.data.parent );
    parentView3dObject.object3d.add( this.object3d );
  }

  var browseControls = this._view3d.modeController.getModeControl( feng.controllers.view3d.ModeController.Mode.BROWSE );
  
  browseControls.dispatchEvent({
    type: feng.events.EventType.CHANGE,
    mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
    nextMode: feng.controllers.view3d.ModeController.Mode.CLOSE_UP,
    object: this
  });

  this.unlock();
};


feng.views.view3dobject.MovableObject.prototype.startInteraction = function(){

  goog.base(this, 'startInteraction');

  this._interactionHandler.listen(this._view3d.domElement, 'click', this.onClick, false, this);
};


feng.views.view3dobject.MovableObject.prototype.onClick = function(e){

  var camera = this._view3d.cameraController.activeCamera;
  var viewSize = this._view3d.viewSize;
  var clickedObjects = feng.utils.ThreeUtils.getObjectsBy2DPosition( e.clientX, e.clientY, [this.object3d], camera, viewSize );

  if(clickedObjects.length > 0) {

    this.pick();
  }
};