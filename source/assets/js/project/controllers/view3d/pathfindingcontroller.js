goog.provide('feng.controllers.view3d.PathfindingController');

goog.require('goog.array');
goog.require('goog.events.EventTarget');
goog.require('goog.math.Box');
goog.require('feng.views.debug.Pathfinding');

/**
 * @constructor
 */
feng.controllers.view3d.PathfindingController = function(){

  goog.base(this);

  // matrix pool
  this._matrixData = {
  	/*
	{
		matrix: matrix,
		gridWidth: gridWidth,
		gridHeight: gridHeight,
		gridMinX: Number,
		gridMaxX: Number,
		gridMinZ: Number,
		gridMaxZ: Number,
		tileSize: tileSize,
		numCols: numCols,
		numRows: numRows
	}
  	*/
  };

  // scene for capturing tiles
  this._scene = new THREE.Scene();

  this._camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
  this._camera.rotation.x = - Math.PI / 2;

  this._boundaryBox = new THREE.Box3();

  this._zoom = 1;

  this._centerOffset = {
  	x: 0,
  	y: 0
  };

  this._renderer = new THREE.CanvasRenderer();
  this._renderer.setClearColor( feng.Color.TILEMAP_RED );
  document.body.appendChild( this._renderer.domElement );
};
goog.inherits(feng.controllers.view3d.PathfindingController, goog.events.EventTarget);
goog.addSingletonGetter(feng.controllers.view3d.PathfindingController);


feng.controllers.view3d.PathfindingController.prototype.getMatrixData = function( matrixId, collidableBoxes, objects, minTilesInRowOrCol ) {

	var matrixData = this._matrixData[ matrixId ];

	if(!matrixData) {
		matrixData = this.generateMatrix( matrixId, start, end, collidableBoxes, objects, minTilesInRowOrCol );
	}

	return matrixData;
};


feng.controllers.view3d.PathfindingController.prototype.generateMatrix = function( matrixId, collidableBoxes, objects, minTilesInRowOrCol ) {

	// draw scene from top view (WIP)
	// remove last children from rendering
	var obj, i, l = this._scene.children.length;

	for ( i = l - 1; i >= 0 ; i -- ) {

	    obj = this._scene.children[ i ];
			this._scene.remove( obj );
	}

	// add new children to rendering
	l = objects.length;

	for ( i = 0; i < l; i++ ) {

	    obj = objects[ i ];

	    if(obj.isCollidable() || obj.isFloor()) {
	    	var proxyMesh = obj.getTilemapProxy();
	    	this._scene.add( proxyMesh );
	    }
	}

	var box = this._boundaryBox.setFromObject( this._scene );
	var sceneSize = box.size();
	var sceneWidth = sceneSize.x;
	var sceneHeight = sceneSize.z;

	this._camera.left = sceneWidth / -2;
	this._camera.right = sceneWidth / 2;
	this._camera.top = sceneHeight / 2;
	this._camera.bottom = sceneHeight / -2;
	this._camera.position.copy( box.center() );
	this._camera.updateProjectionMatrix();

	this._renderer.setSize( sceneWidth * this._zoom, sceneHeight * this._zoom );
  this._renderer.render( this._scene, this._camera );

  // parse tiles from render
  var gridWidth = sceneWidth;
  var gridHeight = sceneHeight;

  var minTilesInRowOrCol = minTilesInRowOrCol || 40;
	var tileSize = (gridWidth > gridHeight) ? Math.floor(gridWidth / minTilesInRowOrCol) : Math.floor(gridHeight / minTilesInRowOrCol);

	gridWidth = Math.ceil(gridWidth / tileSize) * tileSize;
	gridHeight = Math.ceil(gridHeight / tileSize) * tileSize;

	var numCols = gridWidth / tileSize;
	var numRows = gridHeight / tileSize;

	var matrix = [];
	var row = 0;
	var col = 0;
	var ctx = this._renderer.domElement.getContext('2d');
	var halfTileSize = tileSize / 2;

	for(row = 0; row < numRows; ++row) {
		var rowData = [];

		for(col = 0; col < numCols; ++col) {

			var x = col * tileSize + halfTileSize;
			var y = row * tileSize + halfTileSize;
			var data = ctx.getImageData(x, y, 1, 1).data;

			var collided = (data[0] === 255);

			var type = collided ? 1 : 0;
			rowData.push( type );
		}

		matrix.push(rowData);
	}

	console.log(matrix)

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

	//
	var gridMinX = 0, gridMinZ = 0;
	var gridMaxX = 0, gridMaxZ = 0;

	goog.array.forEach(objects, function(obj) {

		if(obj.object3d instanceof THREE.Mesh) {
			
			var mesh = obj.object3d;
			var box = new THREE.Box3().setFromObject( mesh );

			//console.log(mesh.name + ' bounding box: ', box);

			var minX = box.min.x;
			var minZ = box.min.z;
			var maxX = box.max.x;
			var maxZ = box.max.z;

			gridMinX = Math.min(gridMinX, minX);
			gridMinZ = Math.min(gridMinZ, minZ);
			gridMaxX = Math.max(gridMaxX, maxX);
			gridMaxZ = Math.max(gridMaxZ, maxZ);
		}
	});

	var gridWidth = Math.abs(gridMaxX - gridMinX);
	var gridHeight = Math.abs(gridMaxZ - gridMinZ);

	var minTilesInRowOrCol = minTilesInRowOrCol || 40;
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

	// cache the matrix by Id
	var matrixData = {
		matrix: matrix,
		gridWidth: gridWidth,
		gridHeight: gridHeight,
		gridMinX: gridMinX,
		gridMaxX: gridMaxX,
		gridMinZ: gridMinZ,
		gridMaxZ: gridMaxZ,
		tileSize: tileSize,
		numCols: numCols,
		numRows: numRows
	};

	this._matrixData[ matrixId ] = matrixData;

	return matrixData;
};


feng.controllers.view3d.PathfindingController.prototype.getTileByPosition = function( position, matrixData ) {

	var gridMinX = matrixData.gridMinX;
	var gridMinZ = matrixData.gridMinZ;
	var tileSize = matrixData.tileSize;

	var tileCol = Math.floor(Math.abs(position.x - gridMinX) / tileSize);
	var tileRow = Math.floor(Math.abs(position.z - gridMinZ) / tileSize);
	var tile = [ tileCol, tileRow ];

	return tile;
};


feng.controllers.view3d.PathfindingController.prototype.resolveMatrix = function( matrixData, start, end ) {

	var matrix = matrixData.matrix;
	var gridWidth = matrixData.gridWidth;
	var gridHeight = matrixData.gridHeight;
	var gridMinX = matrixData.gridMinX;
	var gridMaxX = matrixData.gridMaxX;
	var gridMinZ = matrixData.gridMinZ;
	var gridMaxZ = matrixData.gridMaxZ;
	var tileSize = matrixData.tileSize;
	var numCols = matrixData.numCols;
	var numRows = matrixData.numRows;

	var startTile = this.getTileByPosition( start, matrixData );
	var endTile = this.getTileByPosition( end, matrixData );
	
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
		endTile: endTile
	};

	return result;
};


feng.controllers.view3d.PathfindingController.prototype.getClosestWalkableTile = function( tile, matrixData ) {

	var matrix = matrixData.matrix;

	// return this tile if is walkable
	var tileType = matrix[ tile[1] ][ tile[0] ];

	if(tileType === 0) {
		return tile;
	}

	// otherwise find the closest
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


feng.controllers.view3d.PathfindingController.prototype.getTilePosition = function( tile, matrixData ) {

	var gridMinX = matrixData.gridMinX;
	var gridMinZ = matrixData.gridMinZ;
	var tileSize = matrixData.tileSize;

	var x = tile[0] * tileSize + tileSize/2 + gridMinX;
	var y = 0;
	var z = tile[1] * tileSize + tileSize/2 + gridMinZ;

	return new THREE.Vector3(x, y, z);
};


feng.controllers.view3d.PathfindingController.prototype.getClosestWalkableTilePosition = function( tile, matrixData ) {

	var tile = this.getClosestWalkableTile( tile, matrixData );

	return this.getTilePosition( tile, matrixData );
};


feng.controllers.view3d.PathfindingController.prototype.findPath = function( matrixId, start, end ) {

	// get matrix
	var matrixData = this.getMatrixData( matrixId );
	var matrixResult = this.resolveMatrix( matrixData, start, end );

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

	// get closest tile to the end tile if it's non-walkable
	endTile = this.getClosestWalkableTile( endTile, matrixData );

	if(endTile) {
		console.log( 'found closest non-walkable tile: ', endTile );
	}else {
		console.log( 'could not find closest non-walkable tile around: ', endTile);
		return null;
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

	// extract points from grid
	var coordinates = goog.array.map(path, function(coordinate) {
		var x = coordinate[0] * tileSize + tileSize/2 + gridMinX;
		var y = 0;
		var z = coordinate[1] * tileSize + tileSize/2 + gridMinZ;
		return new THREE.Vector3(x, y, z);
	});

	coordinates[0] = start.clone().setY( 0 );

	// draw debug view
	this.dispatchEvent({
		type: feng.events.EventType.UPDATE,
		matrix: matrix,
		gridWidth: gridWidth,
		gridHeight: gridHeight,
		numCols: numCols,
		numRows: numRows,
		tileSize: tileSize,
		path: path
	});

	// return smoothened coordinates
	var spline = new THREE.SplineCurve3( coordinates );
	var numPoints = Math.floor( spline.getLength() / 50 );
	var coordinates = spline.getSpacedPoints( numPoints );

	return coordinates;
};