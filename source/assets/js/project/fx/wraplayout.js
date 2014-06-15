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

  this._minMargin = 20;

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
		blockX = Math.max(this._minMargin, rendererSize.width / 2 - block.width / 2);
		blockY = Math.max(this._minMargin, this._object2DBox.top / 2 - block.height / 2);
		break;

		case feng.fx.WrapLayout.Alignment.BOTTOM:
		blockX = Math.max(this._minMargin, rendererSize.width / 2 - block.width / 2);
		blockY = Math.min(rendererSize.height - block.height - this._minMargin, this._object2DBox.bottom + (rendererSize.height - this._object2DBox.bottom) / 2 - block.height / 2);
		break;

		case feng.fx.WrapLayout.Alignment.LEFT:
		blockX = Math.max(this._minMargin, this._object2DBox.left / 2 - block.width / 2);
		blockY = Math.max(this._minMargin, rendererSize.height / 2 - block.height / 2);
		break;

		case feng.fx.WrapLayout.Alignment.RIGHT:
		blockX = Math.min(rendererSize.width - block.width - this._minMargin, this._object2DBox.right + (rendererSize.width - this._object2DBox.right) / 2 - block.width / 2);
		blockY = Math.max(this._minMargin, rendererSize.height / 2 - block.height / 2);
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

	this._object2DBox = feng.utils.ThreeUtils.getRectangleFromBox3( this._object3DBox, camera, rendererSize, this._object2DBox );
	
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