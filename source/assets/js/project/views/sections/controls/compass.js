goog.provide('feng.views.sections.controls.Compass');

goog.require('goog.dom');
goog.require('goog.fx.Dragger');
goog.require('feng.events');
goog.require('feng.fx.AnimatedSprite');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.Compass = function(domElement){
	
  goog.base(this, domElement);

  this._mainEl = goog.dom.getElement('main');
  this._cubeEl = goog.dom.getElementByClass('cube', this.domElement);
  
  var browseEl = goog.dom.getElementByClass('browse', this.domElement);
  var img = feng.models.Preload.getInstance().getAsset('global.cube-browse');
  this._browseSprite = new feng.fx.AnimatedSprite(browseEl, img, 12, 9, 100);

  var designEl = goog.dom.getElementByClass('design', this.domElement);
  var img = feng.models.Preload.getInstance().getAsset('global.cube-design');
  this._designSprite = new feng.fx.AnimatedSprite(designEl, img, 12, 9, 100);

  this._hitTestCanvas = goog.dom.createDom('canvas');
  this._hitTestCanvas.width = this._browseSprite.size.width;
  this._hitTestCanvas.height = this._browseSprite.size.height;
  this._hitTestCanvasContext = this._hitTestCanvas.getContext('2d');

  this._dragger = new goog.fx.Dragger(this.domElement);
  this._dragger.setHysteresis( 2 );
  this._dragger.defaultAction = goog.bind(this.onDrag, this);

  this._hoveredDesign = false;
  this._hoveredBrowse = false;

  this._rotation = 0;

  this._isInDesignMode = false;
};
goog.inherits(feng.views.sections.controls.Compass, feng.views.sections.controls.Controls);


feng.views.sections.controls.Compass.prototype.activate = function(){

  var shouldActivate = goog.base(this, 'activate');

  if(!shouldActivate) return;

	this._eventHandler.listen(this._dragger, goog.fx.Dragger.EventType.START, this.onDragStart, false, this);
  this._eventHandler.listen(this._dragger, goog.fx.Dragger.EventType.END, this.onDragEnd, false, this);
  this._eventHandler.listen(this._cubeEl, 'mousemove', this.onMouseMove, false, this);
  this._eventHandler.listen(this._cubeEl, 'click', this.onClick, false, this);

  this._dragger.setEnabled( true );

  this.updateHitTestCanvas();
};


feng.views.sections.controls.Compass.prototype.deactivate = function(){

  var shouldDeactivate = goog.base(this, 'deactivate');

  if(!shouldDeactivate) return;

  this._dragger.setEnabled( false );
};


feng.views.sections.controls.Compass.prototype.calculateFractionOfPI = function(){

	var deltaX = this._dragger.clientX - this._dragger.startX;
	var distancePI = 160;
	var fractionPI = deltaX / distancePI;

	fractionPI += (this._rotation / Math.PI);

	return fractionPI;
};


feng.views.sections.controls.Compass.prototype.calculateRotation = function(fractionOfPI){

	var fractionOfPI = goog.isNumber(fractionOfPI) ? fractionOfPI : this.calculateFractionOfPI();
	return fractionOfPI * Math.PI;
};


feng.views.sections.controls.Compass.prototype.setProgress = function(fractionOfPI){

	var fractionPI = goog.isNumber(fractionOfPI) ? fractionOfPI : this.calculateFractionOfPI();

	var progress = fractionPI % 1;
	progress = progress < 0 ? (progress + 1) : progress;
	progress = 1 - progress;

	this._browseSprite.setProgress( progress );
	this._designSprite.setProgress( progress );

	this.updateHitTestCanvas();
};


feng.views.sections.controls.Compass.prototype.setRotation = function(rotation){

	if(this._dragger.isDragging()) return;

	this._rotation = rotation;
	this.setProgress( this._rotation / Math.PI );
};


feng.views.sections.controls.Compass.prototype.updateHitTestCanvas = function(){

	var framePosition = this._browseSprite.getFramePosition();
	var x = framePosition.x;
	var y = framePosition.y;
	var w = this._browseSprite.size.width;
	var h = this._browseSprite.size.height;

	this._hitTestCanvasContext.clearRect( 0, 0, w, h );
	this._hitTestCanvasContext.drawImage( this._browseSprite.image, x, y, w, h, 0, 0, w, h );
};


feng.views.sections.controls.Compass.prototype.onDragStart = function(e){

	goog.dom.classes.add(this._mainEl, 'grabbing');

	goog.dom.classes.remove(this.domElement, 'hover-design');
	this._hoveredDesign = false;
	this._hoveredBrowse = false;
};


feng.views.sections.controls.Compass.prototype.onDragEnd = function(e){

	goog.dom.classes.remove(this._mainEl, 'grabbing');

	this._rotation = this.calculateRotation();
};


feng.views.sections.controls.Compass.prototype.onDrag = function(x, y){

	var fractionPI = this.calculateFractionOfPI();
	var rotation = this.calculateRotation( fractionPI );

	this.setProgress( fractionPI );

	this.dispatchEvent({
		type: feng.events.EventType.UPDATE,
		rotation: rotation
	});
};


feng.views.sections.controls.Compass.prototype.onMouseMove = function(e){

	if(this._dragger.isDragging()) return false;

	var pixel = this._hitTestCanvasContext.getImageData( e.offsetX, e.offsetY, 1, 1 ).data;
	var r = pixel[0], g = pixel[1], b = pixel[2], a = pixel[3];

	if(a === 0) {

		// transparent (default)
		goog.dom.classes.remove(this.domElement, 'hover-browse');
		goog.dom.classes.remove(this.domElement, 'hover-design');
		this._hoveredDesign = false;
		this._hoveredBrowse = false;

	}else if(r < 200) {

		// gray (ignore)

	}else if(r === 255 && b === 255 && b === 255) {

		// white (design mode)
		goog.dom.classes.addRemove(this.domElement, 'hover-browse', 'hover-design');
		this._hoveredDesign = true;
		this._hoveredBrowse = false;

	}else {

		// yellow (browse mode)
		goog.dom.classes.addRemove(this.domElement, 'hover-design', 'hover-browse');
		this._hoveredDesign = false;
		this._hoveredBrowse = true;
	}
};


feng.views.sections.controls.Compass.prototype.onClick = function(e){

	if(this._dragger.isDragging()) return false;

	if(this._hoveredDesign) {

		if(this._isInDesignMode) return false;

		this._view3d.modeController.setMode({
			type: feng.events.EventType.CHANGE,
			mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
			nextMode: feng.controllers.view3d.ModeController.Mode.DESIGN
		});

	}else if(this._hoveredBrowse) {

		if(!this._isInDesignMode) return false;

		var designControl = this._view3d.modeController.getModeControl( feng.controllers.view3d.ModeController.Mode.DESIGN );
		var toRotation = designControl.getRotation().clone();
		toRotation.x = 0;

		this._view3d.modeController.setMode({
			type: feng.events.EventType.CHANGE,
			mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
			nextMode: feng.controllers.view3d.ModeController.Mode.BROWSE,
			toRotation: toRotation
		});
	}
};


feng.views.sections.controls.Compass.prototype.onResize = function(e){

	var viewportSize = goog.dom.getViewportSize();
	goog.style.setPosition(this.domElement, viewportSize.width - 100 - 30, 30);
};


feng.views.sections.controls.Compass.prototype.onModeChange = function(e){

  goog.base(this, 'onModeChange', e);

  if(e.mode === feng.controllers.view3d.ModeController.Mode.DESIGN) {

  	goog.dom.classes.addRemove(this.domElement, 'browse', 'design');

  	this._isInDesignMode = true;

  }else {

  	goog.dom.classes.addRemove(this.domElement, 'design', 'browse');

  	this._isInDesignMode = false;
  }
  
  switch(e.mode) {

    case feng.controllers.view3d.ModeController.Mode.CLOSE_UP:
	goog.style.showElement(this.domElement, false);
	this.deactivate();
    break;

    default:
    goog.style.showElement(this.domElement, true);
	this.activate();
    break;
  }
};