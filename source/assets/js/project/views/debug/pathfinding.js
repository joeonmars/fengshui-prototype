goog.provide('feng.views.debug.Pathfinding');

goog.require('feng.views.debug.DebugView');
goog.require('feng.templates.debug');


/**
 * @constructor
 */
feng.views.debug.Pathfinding = function(){
  goog.base(this, feng.templates.debug.PathfindingDebugView);

	this._canvasContainerDom = goog.dom.getElementByClass('canvasContainer', this.domElement);
	
  this._debugScale = 1;

  this._colors = {};

  this.setColors({
  	walkable: '#CCFF99',
  	blocked: '#FF6666',
  	stroke: 'rgba(0, 0, 0, 0.1)',
  	start: '#00FF00',
  	end: '#33CCFF',
  	path: 'rgba(255, 255, 0, 0.6)'
  });

  this.hide();
};
goog.inherits(feng.views.debug.Pathfinding, feng.views.debug.DebugView);


feng.views.debug.Pathfinding.prototype.setColors = function(colors) {
	
	goog.object.forEach(colors, function(color, name) {
		this._colors[name] = color;
	}, this);
};


feng.views.debug.Pathfinding.prototype.update = function(matrix, gridWidth, gridHeight, numCols, numRows, cellSize, path) {
	var canvasWidth = gridWidth * this._debugScale;
	var canvasHeight = gridHeight * this._debugScale;

	var canvas = goog.dom.createDom('canvas', {
		'width': canvasWidth,
		'height': canvasHeight
	});

	var context = canvas.getContext('2d');

	var row = 0;
	var col = 0;
	var canvasCellSize = cellSize * this._debugScale;
	for(row = 0; row < numRows; ++row) {
		for(col = 0; col < numCols; ++col) {
			var cellX = col * canvasCellSize;
			var cellY = row * canvasCellSize;
			var type = matrix[row][col];
			var color = (type === 0) ? this._colors.walkable : this._colors.blocked;
			context.beginPath();
      context.rect(cellX, cellY, canvasCellSize, canvasCellSize);
      context.fillStyle = color;
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = this._colors.stroke;
      context.stroke();
		}
	}

	// draw path
	var i, l = path.length;
	for(i = 0; i < l; ++i) {
		var cellX = path[i][0] * canvasCellSize;
		var cellY = path[i][1] * canvasCellSize;
		var color = this._colors.path;
		if(i === 0) {
			color = this._colors.start;
		}else if(i === l - 1) {
			color = this._colors.end;
		}
		context.beginPath();
    context.rect(cellX, cellY, canvasCellSize, canvasCellSize);
    context.fillStyle = color;
    context.fill();
	}

	goog.dom.removeChildren( this._canvasContainerDom );
	goog.dom.appendChild(this._canvasContainerDom, canvas);
};