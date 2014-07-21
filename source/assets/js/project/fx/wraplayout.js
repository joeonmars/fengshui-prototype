goog.provide('feng.fx.WrapLayout');

goog.require('goog.math.Box');
goog.require('feng.utils.ThreeUtils');


/**
 * @constructor
 */
feng.fx.WrapLayout = function(){

  this._object2DBox = new goog.math.Box(0, 0, 0, 0);
  this._object3DBox = new THREE.Box3();

  this._minMargin = 5;

  this._blocks = [];

  this._leftBlock = null;
  this._rightBlock = null;
  this._topBlock = null;
  this._bottomBlock = null;
};


feng.fx.WrapLayout.prototype.addBlock = function (element, alignment) {

	if(!element) {
		
		element = goog.dom.createDom('div');

		goog.style.setStyle( element, {
			'position': 'absolute',
			'outline': '1px solid blue',
			'background-color': 'rgba(255, 255, 255, .5)'
		});
	}

	var size = goog.style.getSize(element);

	var block = {
		element: element,
		alignment: alignment,
		width: size.width,
		height: size.height,
		box: new goog.math.Box(0, 0, 0, 0)
	};

	// register new block
	if(alignment === feng.fx.WrapLayout.Alignment.LEFT) {

		if(!this._leftBlock) this._leftBlock = block;
		else throw new Error('left block already exist!');

	}else if(alignment === feng.fx.WrapLayout.Alignment.RIGHT) {

		if(!this._rightBlock) this._rightBlock = block;
		else throw new Error('right block already exist!');

	}else if(alignment === feng.fx.WrapLayout.Alignment.TOP) {

		if(!this._topBlock) this._topBlock = block;
		else throw new Error('top block already exist!');

	}else if(alignment === feng.fx.WrapLayout.Alignment.BOTTOM) {

		if(!this._bottomBlock) this._bottomBlock = block;
		else throw new Error('bottom block already exist!');
	}

	// push the new block
	this._blocks.push( block );

	return block;
};


feng.fx.WrapLayout.prototype.updateBlockSize = function (block) {

	var size = goog.style.getSize( block.element );

	block.width = size.width;
	block.height = size.height;

	return block;
};


feng.fx.WrapLayout.prototype.calculateBlockPosition = function (block, rendererSize) {

	var blockX, blockY;

	switch(block.alignment) {
		case feng.fx.WrapLayout.Alignment.TOP:
		blockX = Math.max(this._minMargin, rendererSize.width / 2 - block.width / 2);
		blockY = Math.max(this._minMargin, this._object2DBox.top / 2 - block.height / 2);
		break;

		case feng.fx.WrapLayout.Alignment.LEFT:
		blockX = Math.max(this._minMargin, this._object2DBox.left / 2 - block.width / 2);
		blockY = Math.max(this._minMargin, rendererSize.height / 2 - block.height / 2);
		break;

		case feng.fx.WrapLayout.Alignment.RIGHT:
		blockX = Math.min(rendererSize.width - block.width - this._minMargin, this._object2DBox.right + (rendererSize.width - this._object2DBox.right) / 2 - block.width / 2);
		blockY = Math.max(this._minMargin, rendererSize.height / 2 - block.height / 2);
		break;

		case feng.fx.WrapLayout.Alignment.BOTTOM:
		var objectTop = this._object2DBox.bottom;
		var leftTop = this._leftBlock ? this._leftBlock.box.bottom : 0;
		var rightTop = this._rightBlock ? this._rightBlock.box.bottom : 0;
		var top = Math.max(objectTop, leftTop, rightTop);

		blockX = Math.max(this._minMargin, rendererSize.width / 2 - block.width / 2);
		blockY = Math.min(rendererSize.height - block.height - this._minMargin, top + (rendererSize.height - top) / 2 - block.height / 2);
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
	if(this._topBlock) {
		this.calculateBlockPosition( this._topBlock, rendererSize );
	}

	if(this._leftBlock) {
		this.calculateBlockPosition( this._leftBlock, rendererSize );
	}

	if(this._rightBlock) {
		this.calculateBlockPosition( this._rightBlock, rendererSize );
	}

	if(this._bottomBlock) {
		this.calculateBlockPosition( this._bottomBlock, rendererSize );
	}
};


feng.fx.WrapLayout.Alignment = {
	TOP: 'top',
	BOTTOM: 'bottom',
	LEFT: 'left',
	RIGHT: 'right'
};