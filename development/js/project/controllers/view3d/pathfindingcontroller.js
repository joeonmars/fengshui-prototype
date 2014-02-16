goog.provide('fengshui.controllers.view3d.PathfindingController');

goog.require('goog.array');
goog.require('goog.events.EventTarget');
goog.require('goog.events');
goog.require('goog.math.Box');
goog.require('fengshui.views.debug.Pathfinding');

/**
 * @constructor
 */
fengshui.controllers.view3d.PathfindingController = function(){

  goog.base(this);

};
goog.inherits(fengshui.controllers.view3d.PathfindingController, goog.events.EventTarget);
goog.addSingletonGetter(fengshui.controllers.view3d.PathfindingController);


fengshui.controllers.view3d.PathfindingController.prototype.generateMatrix = function( start, end, collidables, scene, minTilesInRowOrCol ) {

	var gridMinX = 0, gridMinZ = 0;
	var gridMaxX = 0, gridMaxZ = 0;

	scene.traverse(function(child) {
		if(child instanceof THREE.Mesh) {
			var mesh = child;
		  var box = new THREE.Box3().setFromObject( mesh );
			
			//console.log(mesh.name + ' bounding box: ', box);

		  var minX = box.min.x;
		  var minZ = box.min.z;
		  var maxX = box.max.x;
		  var maxZ = box.max.z;

		  gridMinX = Math.min(gridMinX, minX, start.x, end.x);
		  gridMinZ = Math.min(gridMinZ, minZ, start.z, end.z);
		  gridMaxX = Math.max(gridMaxX, maxX, start.x, end.x);
		  gridMaxZ = Math.max(gridMaxZ, maxZ, start.z, end.z);
		}
	});

	var collidableBoxes = [];

	goog.array.forEach(collidables, function(mesh) {
	  var box = new THREE.Box3().setFromObject( mesh );

	  var minX = box.min.x;
	  var minZ = box.min.z;
	  var maxX = box.max.x;
	  var maxZ = box.max.z;

	  var collidableBox = new goog.math.Box(minZ, maxX, maxZ, minX);
	  collidableBoxes.push( collidableBox );

	  //console.log(collidableBox);
	});

	var gridWidth = Math.abs(gridMaxX - gridMinX);
	var gridHeight = Math.abs(gridMaxZ - gridMinZ);

	var minTilesInRowOrCol = minTilesInRowOrCol || 20;
	var tileSize = (gridWidth > gridHeight) ? (gridWidth / minTilesInRowOrCol) : (gridHeight / minTilesInRowOrCol);

	gridWidth += tileSize;
	gridHeight += tileSize;

	var numCols = Math.floor(gridWidth / tileSize);
	var numRows = Math.floor(gridHeight / tileSize);

	// generate matrix
	var boxes = [];
	var matrix = [];
	var row = 0;
	var col = 0;
	for(row = 0; row < numRows; ++row) {
		var rowData = [];

		for(col = 0; col < numCols; ++col) {
			var boxMinX = gridMinX + col * tileSize;
			var boxMaxX = boxMinX + tileSize;
			var boxMinZ = gridMinZ + row * tileSize;
			var boxMaxZ = boxMinZ + tileSize;
			var box = new goog.math.Box(boxMinZ, boxMaxX, boxMaxZ, boxMinX);
			boxes.push(box);

			var collided = goog.array.find(collidableBoxes, function(collidableBox) {
				return goog.math.Box.intersects(box, collidableBox);
			});
			var type = collided ? 1 : 0;
			rowData.push( type );
		}

		matrix.push(rowData);
	}

	var startTileCol = Math.floor(Math.abs(start.x - gridMinX) / tileSize);
	var startTileRow = Math.floor(Math.abs(start.z - gridMinZ) / tileSize);
	var startTile = [ startTileCol, startTileRow ];

	var endTileCol = Math.floor(Math.abs(end.x - gridMinX) / tileSize);
	var endTileRow = Math.floor(Math.abs(end.z - gridMinZ) / tileSize);
	var endTile = [ endTileCol, endTileRow ];

	var startTileType = matrix[startTileRow][startTileCol];
	var endTileType = matrix[endTileRow][endTileCol];

	var result = {
		matrix: matrix,
		gridMinX: gridMinX,
		gridMinZ: gridMinZ,
		gridWidth: gridWidth,
		gridHeight: gridHeight,
		numRows: numRows,
		numCols: numCols,
		tileSize: tileSize,
		startTile: startTile,
		endTile: endTile,
		startTileType: startTileType,
		endTileType: endTileType
	};

	return result;
};


fengshui.controllers.view3d.PathfindingController.prototype.getClosestWalkableTile = function( matrix, tile ) {

	var shortestDistance = Number.MAX_VALUE;
	var closestWalkableTile = null;

	var row = 0;
	var col = 0;
	var numRows = matrix.length;
	
	for(row = 0; row < numRows; ++row) {

		var numCols = matrix[row].length;

		for(col = 0; col < numCols; ++col) {
			var type = matrix[row][col];

			if(type === 0) {

				var dx = col - tile[0];
				var dy = row - tile[1];
				var distance = Math.sqrt(dx * dx + dy * dy);

				if(distance < shortestDistance) {
					shortestDistance = distance;
					closestWalkableTile = [col, row];
				}
			}
		}
	}

	return closestWalkableTile;
};


fengshui.controllers.view3d.PathfindingController.prototype.findPath = function( start, end, collidables, scene, minTilesInRowOrCol ) {

	// get matrix
	var matrixResult = this.generateMatrix( start, end, collidables, scene, minTilesInRowOrCol );

	var matrix = matrixResult.matrix;
	var gridMinX = matrixResult.gridMinX;
	var gridMinZ = matrixResult.gridMinZ;
	var gridWidth = matrixResult.gridWidth;
	var gridHeight = matrixResult.gridHeight;
	var numCols = matrixResult.numCols;
	var numRows = matrixResult.numRows;
	var tileSize = matrixResult.tileSize;
	var startTile = matrixResult.startTile;
	var endTile = matrixResult.endTile;
	var startTileType = matrixResult.startTileType;
	var endTileType = matrixResult.endTileType;

	// get closest tile to the end tile if it's non-walkable
	if(endTileType === 1) {

		var closetWalkableTile = this.getClosestWalkableTile(matrix, endTile);

		if(endTile) {
			console.log( 'find closest non-walkable tile: ', endTile );
			endTile = closetWalkableTile;
		}else {
			console.log( 'could not find closest non-walkable tile around: ', endTile);
			return null;
		}
		
	}

	if(goog.array.equals(startTile, endTile)) {
		console.log( 'start tile is the same as end tile: ', startTile);
		return null;
	}

	// find path
	var grid = new PF.Grid(numCols, numRows, matrix);

	var finder = new PF.AStarFinder({
		allowDiagonal: true,
		heuristic: function(dx, dz) {
			return Math.sqrt(Math.pow((start.x - dx), 2) + Math.pow((start.z - dz), 2));
		}
	});

	var path = finder.findPath(startTile[0], startTile[1], endTile[0], endTile[1], grid);

	// convert path coordinates from grid to 3d world
	var smoothPath = PF.Util.smoothenPath(grid, path);
	var coordinates = goog.array.map(smoothPath, function(coordinate) {
		var x = coordinate[0] * tileSize + tileSize/2 + gridMinX;
		var y = 0;
		var z = coordinate[1] * tileSize + tileSize/2 + gridMinZ;
		return new THREE.Vector3(x, y, z);
	});

	coordinates[0] = start.clone().setY( 0 );

	// draw debug view
	var view = fengshui.views.debugger.pathfindingView;
	view.update(matrix, gridWidth, gridHeight, numCols, numRows, tileSize, path);

	//
	return coordinates;
};