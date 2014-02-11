goog.provide('fengshui.controllers.PathfindingController');

goog.require('goog.array');
goog.require('goog.events.EventTarget');
goog.require('goog.events');
goog.require('goog.math.Box');
goog.require('fengshui.views.debug.Pathfinding');

/**
 * @constructor
 */
fengshui.controllers.PathfindingController = function(){

  goog.base(this);

  this._debugView = null;
};
goog.inherits(fengshui.controllers.PathfindingController, goog.events.EventTarget);
goog.addSingletonGetter(fengshui.controllers.PathfindingController);


fengshui.controllers.PathfindingController.prototype.init = function() {

	this._debugView = new fengshui.views.debug.Pathfinding();
};


fengshui.controllers.PathfindingController.prototype.findPath = function( start, end, collidables, scene, minCellsInRowOrCol ) {

	var gridMinX = 0, gridMinZ = 0;
	var gridMaxX = 0, gridMaxZ = 0;

	scene.traverse(function(child) {
		if(child instanceof THREE.Mesh) {
			var mesh = child;
		  var box = new THREE.Box3().setFromObject( mesh );
			
			console.log(mesh.name + ' bounding box: ', box);

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

	  console.log(collidableBox);
	});

	var gridWidth = Math.abs(gridMaxX - gridMinX);
	var gridHeight = Math.abs(gridMaxZ - gridMinZ);

	var minCellsInRowOrCol = minCellsInRowOrCol || 20;
	var cellSize = (gridWidth > gridHeight) ? (gridWidth / minCellsInRowOrCol) : (gridHeight / minCellsInRowOrCol);

	gridWidth += cellSize;
	gridHeight += cellSize;

	var numCols = Math.floor(gridWidth / cellSize);
	var numRows = Math.floor(gridHeight / cellSize);

	// generate matrix
	var boxes = [];
	var matrix = [];
	var row = 0;
	var col = 0;
	for(row = 0; row < numRows; ++row) {
		var rowData = [];

		for(col = 0; col < numCols; ++col) {
			var boxMinX = gridMinX + col * cellSize;
			var boxMaxX = boxMinX + cellSize;
			var boxMinZ = gridMinZ + row * cellSize;
			var boxMaxZ = boxMinZ + cellSize;
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

	var startCellCol = Math.floor(Math.abs(start.x - gridMinX) / cellSize);
	var startCellRow = Math.floor(Math.abs(start.z - gridMinZ) / cellSize);
	var startCell = [ startCellCol, startCellRow ];

	var endCellCol = Math.floor(Math.abs(end.x - gridMinX) / cellSize);
	var endCellRow = Math.floor(Math.abs(end.z - gridMinZ) / cellSize);
	var endCell = [ endCellCol, endCellRow ];

	// find path
	var grid = new PF.Grid(numCols, numRows, matrix);
	var finder = new PF.AStarFinder({
		allowDiagonal: true,
		heuristic: function(dx, dz) {
			return Math.sqrt(Math.pow((start.x - dx), 2) + Math.pow((start.z - dz), 2));
		}
	});
	var path = finder.findPath(startCell[0], startCell[1], endCell[0], endCell[1], grid);

	// convert path coordinates from grid to 3d world
	var smoothPath = PF.Util.smoothenPath(grid, path);
	var coordinates = goog.array.map(smoothPath, function(coordinate) {
		var x = coordinate[0] * cellSize + cellSize/2 + gridMinX;
		var y = 0;
		var z = coordinate[1] * cellSize + cellSize/2 + gridMinZ;
		return new THREE.Vector3(x, y, z);
	});

	// draw debug view
	this._debugView.update(matrix, gridWidth, gridHeight, numCols, numRows, cellSize, path);

	//
	return coordinates;
};