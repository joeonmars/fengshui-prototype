goog.provide('feng.fx.WrapLayout');

goog.require('goog.math.Box');
goog.require('goog.events.EventTarget');
goog.require('feng.utils.ThreeUtils');


/**
 * @constructor
 */
feng.fx.WrapLayout = function(){

  goog.base(this);

  this._object2DBox = new goog.math.Box(0, 0, 0, 0);
  this._object3DBox = new THREE.Box3();

  this._vertices2D = [];
  this._vertices3D = [];

  for(var i = 0; i < 8; i ++) {

  	this._vertices3D.push( new THREE.Vector3() );

  	this._vertices2D.push({
  		x: 0,
  		y: 0
  	});
  }

  this._blocks = [];
};
goog.inherits(feng.fx.WrapLayout, goog.events.EventTarget);


feng.fx.WrapLayout.prototype.addBlock = function (element, alignment, size) {

	size = size || new goog.math.Size(400, 400);

	if(!element) {
		
		element = goog.dom.createDom('div');

		goog.style.setStyle( element, {
			'position': 'absolute',
			'width': size.width + 'px',
			'height': size.height + 'px',
			'outline': '1px solid blue',
			'background-color': 'rgba(255, 255, 255, .5)'
		});
	}

	var block = {
		element: element,
		alignment: alignment,
		width: size.width,
		height: size.height,
		box: new goog.math.Box(0, 0, 0, 0)
	};

	this._blocks.push( block );

	return block;
};


feng.fx.WrapLayout.prototype.calculateBlockPosition = function (block, rendererSize) {

	var blockX, blockY;

	switch(block.alignment) {
		case feng.fx.WrapLayout.Alignment.TOP:
		blockX = Math.max(0, rendererSize.width / 2 - block.width / 2);
		blockY = Math.max(0, this._object2DBox.top / 2 - block.height / 2);
		break;

		case feng.fx.WrapLayout.Alignment.BOTTOM:
		blockX = Math.max(0, rendererSize.width / 2 - block.width / 2);
		blockY = Math.min(rendererSize.height - block.height, this._object2DBox.bottom + (rendererSize.height - this._object2DBox.bottom) / 2 - block.height / 2);
		break;

		case feng.fx.WrapLayout.Alignment.LEFT:
		blockX = Math.max(0, this._object2DBox.left / 2 - block.width / 2);
		blockY = Math.max(0, rendererSize.height / 2 - block.height / 2);
		break;

		case feng.fx.WrapLayout.Alignment.RIGHT:
		blockX = Math.min(rendererSize.width - block.width, this._object2DBox.right + (rendererSize.width - this._object2DBox.right) / 2 - block.width / 2);
		blockY = Math.max(0, rendererSize.height / 2 - block.height / 2);
		break;
	}

	block.box.top = blockY;
	block.box.bottom = blockY + block.height;
	block.box.left = blockX;
	block.box.right = blockX + block.width;

	if(goog.math.Box.intersects(block.box, this._object2DBox)) {
		goog.dom.classes.add( block.element, 'intersected' );
	}else {
		goog.dom.classes.remove( block.element, 'intersected' );
	}

	goog.style.setStyle( block.element, 'transform', 'translate(' + blockX + 'px,' + blockY + 'px)');
};


feng.fx.WrapLayout.prototype.update = function ( object3d, camera, rendererSize ) {

	// calculate object3d bounding box
	this._object3DBox.setFromObject( object3d );

	// extract all vertices of box
	var max = this._object3DBox.max;
	var min = this._object3DBox.min;

	this._vertices3D[ 0 ].set( max.x, max.y, max.z );
	this._vertices3D[ 1 ].set( min.x, max.y, max.z );
	this._vertices3D[ 2 ].set( min.x, min.y, max.z );
	this._vertices3D[ 3 ].set( max.x, min.y, max.z );
	this._vertices3D[ 4 ].set( max.x, max.y, min.z );
	this._vertices3D[ 5 ].set( min.x, max.y, min.z );
	this._vertices3D[ 6 ].set( min.x, min.y, min.z );
	this._vertices3D[ 7 ].set( max.x, min.y, min.z );

	// convert vertices to 2d coordinates
	goog.array.forEach(this._vertices2D, function(vertex2D, index) {

		var vertex3D = this._vertices3D[ index ];
		var coord = feng.utils.ThreeUtils.get2DCoordinates( vertex3D, camera, rendererSize );
		vertex2D.x = coord.x;
		vertex2D.y = coord.y;

	}, this);

	this._object2DBox.top = Math.min(
		this._vertices2D[0].y,
		this._vertices2D[1].y,
		this._vertices2D[2].y,
		this._vertices2D[3].y,
		this._vertices2D[4].y,
		this._vertices2D[5].y,
		this._vertices2D[6].y,
		this._vertices2D[7].y);

	this._object2DBox.bottom = Math.max(
		this._vertices2D[0].y,
		this._vertices2D[1].y,
		this._vertices2D[2].y,
		this._vertices2D[3].y,
		this._vertices2D[4].y,
		this._vertices2D[5].y,
		this._vertices2D[6].y,
		this._vertices2D[7].y);

	this._object2DBox.left = Math.min(
		this._vertices2D[0].x,
		this._vertices2D[1].x,
		this._vertices2D[2].x,
		this._vertices2D[3].x,
		this._vertices2D[4].x,
		this._vertices2D[5].x,
		this._vertices2D[6].x,
		this._vertices2D[7].x);

	this._object2DBox.right = Math.max(
		this._vertices2D[0].x,
		this._vertices2D[1].x,
		this._vertices2D[2].x,
		this._vertices2D[3].x,
		this._vertices2D[4].x,
		this._vertices2D[5].x,
		this._vertices2D[6].x,
		this._vertices2D[7].x);

	// calculate block position
	goog.array.forEach(this._blocks, function(block) {
		this.calculateBlockPosition( block, rendererSize );
	}, this);
};


feng.fx.WrapLayout.Alignment = {
	TOP: 'top',
	BOTTOM: 'bottom',
	LEFT: 'left',
	RIGHT: 'right'
};