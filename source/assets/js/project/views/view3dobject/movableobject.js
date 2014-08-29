goog.provide('feng.views.view3dobject.MovableObject');

goog.require('feng.views.view3dobject.TipObject');


/**
 * @constructor
 * A tip object that can be resolved by moving to a new position
 */
feng.views.view3dobject.MovableObject = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._availTiles = null;
  this._onWalkUpdate = goog.bind( this.onWalkUpdate, this );
};
goog.inherits(feng.views.view3dobject.MovableObject, feng.views.view3dobject.TipObject);


feng.views.view3dobject.MovableObject.prototype.updateAvailableTiles = function(){

  // get available tiles by destination and range (in view3d unit)
  var destPos = this.data.destination;
  var range = this.data.range;

  var matrixId = this._view3d.getMatrixId();
  var matrixData = feng.pathfinder.getMatrixData( matrixId );

  var rangeOfTiles = Math.ceil( range / matrixData.tileSize );  
  var destTile = feng.pathfinder.getTileByPosition( destPos, matrixData );

  var numCols = matrixData.numCols;
  var numRows = matrixData.numRows;

  var startCol = Math.max( destTile[0] - rangeOfTiles, 0 );
  var endCol = Math.min( destTile[0] + rangeOfTiles, numCols - 1 );
  var startRow = Math.max( destTile[1] - rangeOfTiles, 0 );
  var endRow = Math.min( destTile[1] + rangeOfTiles, numRows - 1 );

  var row, col;
  var matrix = matrixData.matrix;
  var tiles = [];

  for(row = startRow; row < endRow; row++) {

    var cols = matrix[ row ];

    for(col = startCol; col < endCol; col++) {
      if(cols[col] === 0) {
        tiles.push( [col, row] );
      }
    }
  }

  return tiles;
};


feng.views.view3dobject.MovableObject.prototype.getPositionIfAvailable = function( position ){

  var matrixId = this._view3d.getMatrixId();
  var matrixData = feng.pathfinder.getMatrixData( matrixId );

  var tile = feng.pathfinder.getTileByPosition( position, matrixData );

  var walkable = (matrixData.matrix[ tile[1] ][ tile[0] ] === 0);

  return (walkable ? position : null);
};


feng.views.view3dobject.MovableObject.prototype.pick = function(){

  this.updateAvailableTiles();

  var arms = this._view3d.arms;
  arms.addItem( this );

  var walkControls = this._view3d.modeController.getModeControl( feng.controllers.view3d.ModeController.Mode.WALK );
  walkControls.addUpdateCallback( this._onWalkUpdate );

  var closeUpControls = this._view3d.modeController.getModeControl( feng.controllers.view3d.ModeController.Mode.CLOSE_UP );
  closeUpControls.close();
};


feng.views.view3dobject.MovableObject.prototype.drop = function(){

  var arms = this._view3d.arms;
  arms.removeItem( this );

  var walkControls = this._view3d.modeController.getModeControl( feng.controllers.view3d.ModeController.Mode.WALK );
  walkControls.removeUpdateCallback( this._onWalkUpdate );
};


feng.views.view3dobject.MovableObject.prototype.startInteraction = function(){

  goog.base(this, 'startInteraction');

  this._interactionHandler.listen(this._view3d.domElement, 'click', this.onClick, false, this);
};


feng.views.view3dobject.MovableObject.prototype.onWalkUpdate = function( position ){

  var availablePosition = this.getPositionIfAvailable( position );
  console.log('available position to drop movable: ', availablePosition);
};


feng.views.view3dobject.MovableObject.prototype.onClick = function(e){

  var camera = this._view3d.cameraController.activeCamera;
  var viewSize = this._view3d.viewSize;
  var clickedObjects = feng.utils.ThreeUtils.getObjectsBy2DPosition( e.clientX, e.clientY, [this.object3d], camera, viewSize );

  if(clickedObjects.length > 0) {

    this.pick();
  }
};