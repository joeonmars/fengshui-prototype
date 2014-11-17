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
  
  var browseEl = goog.dom.getElementByClass('browse', this.domElement);
  var img = feng.models.Preload.getInstance().getAsset('global.cube-browse');
  this._browseSprite = new feng.fx.AnimatedSprite(browseEl, img, 12, 9, 100);

  var designEl = goog.dom.getElementByClass('design', this.domElement);
  var img = feng.models.Preload.getInstance().getAsset('global.cube-design');
  this._designSprite = new feng.fx.AnimatedSprite(designEl, img, 12, 9, 100);

  this._dragger = new goog.fx.Dragger(this.domElement);
  this._dragger.setHysteresis( 2 );
  this._dragger.defaultAction = goog.bind(this.onDrag, this);

  this._hoveredDesign = false;
  this._hoveredBrowse = false;

  this._rotation = 0;
  this._startRotation = 0;

  this._isInDesignMode = false;
};
goog.inherits(feng.views.sections.controls.Compass, feng.views.sections.controls.Controls);


feng.views.sections.controls.Compass.prototype.activate = function(){

  var shouldActivate = goog.base(this, 'activate');

  if(!shouldActivate) return;

  this._eventHandler.listen(this._dragger, goog.fx.Dragger.EventType.START, this.onDragStart, false, this);
  this._eventHandler.listen(this._dragger, goog.fx.Dragger.EventType.END, this.onDragEnd, false, this);
  this._eventHandler.listen(this.domElement, 'mousemove', this.onMouseMove, false, this);
  this._eventHandler.listen(this.domElement, 'mouseout', this.onMouseOut, false, this);
  this._eventHandler.listen(this.domElement, 'click', this.onClick, false, this);

  this._dragger.setEnabled( true );
};


feng.views.sections.controls.Compass.prototype.deactivate = function(){

  var shouldDeactivate = goog.base(this, 'deactivate');

  if(!shouldDeactivate) return;

  this._dragger.setEnabled( false );
};


feng.views.sections.controls.Compass.prototype.setView3D = function( view3d ){

  goog.base(this, 'setView3D', view3d);

  if(this._view3d) {
    this._view3d.modeController.unlisten( feng.events.EventType.UPDATE, this.onView3dUpdate, false, this );
  }

  this._view3d.modeController.listen( feng.events.EventType.UPDATE, this.onView3dUpdate, false, this );
};


feng.views.sections.controls.Compass.prototype.calculateDraggedRotation = function(){

	var deltaX = this._dragger.clientX - this._dragger.startX;
	var distancePI2 = 200;
	var fractionPI2 = deltaX / distancePI2;

	var rotation = fractionPI2 * (2 * Math.PI);
	return rotation;
};


feng.views.sections.controls.Compass.prototype.setProgress = function(progress){

	this._browseSprite.setProgress( progress );
	this._designSprite.setProgress( progress );
};


feng.views.sections.controls.Compass.prototype.setRotation = function(rotation){

	this._rotation = goog.math.modulo( rotation, 2 * Math.PI );

	var progress = this._rotation / (2 * Math.PI);
	this.setProgress( progress );

	return this._rotation;
};


feng.views.sections.controls.Compass.prototype.onDragStart = function(e){

	goog.dom.classes.add(this._mainEl, 'grabbing');

	goog.dom.classes.remove(this.domElement, 'hover-design');
	this._hoveredDesign = false;
	this._hoveredBrowse = false;

	this._startRotation = this._rotation;
};


feng.views.sections.controls.Compass.prototype.onDragEnd = function(e){

	goog.dom.classes.remove(this._mainEl, 'grabbing');
};


feng.views.sections.controls.Compass.prototype.onDrag = function(x, y){

	var draggedRotation = this.calculateDraggedRotation();

	var rotation = draggedRotation + this._startRotation;

	var standardRotation = this.setRotation( rotation );

	this.dispatchEvent({
		type: feng.events.EventType.UPDATE,
		rotation: standardRotation
	});
};


feng.views.sections.controls.Compass.prototype.onMouseMove = function(e){

	if(this._dragger.isDragging()) return false;

	if(e.offsetY > 40) {

		// browse mode
		goog.dom.classes.addRemove(this.domElement, 'hover-design', 'hover-browse');
		this._hoveredDesign = false;
		this._hoveredBrowse = true;

	}else {

		// design mode
		goog.dom.classes.addRemove(this.domElement, 'hover-browse', 'hover-design');
		this._hoveredDesign = true;
		this._hoveredBrowse = false;
	}
};


feng.views.sections.controls.Compass.prototype.onMouseOut = function(e){

	if(e.relatedTarget && goog.dom.contains(e.currentTarget, e.relatedTarget)) {
		return false;
	}

	goog.dom.classes.remove(this.domElement, 'hover-browse');
	goog.dom.classes.remove(this.domElement, 'hover-design');
	this._hoveredDesign = false;
	this._hoveredBrowse = false;
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


feng.views.sections.controls.Compass.prototype.onView3dUpdate = function(e){

	this.setRotation( e.rotationY );
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
	this.deactivate();
    break;

    default:
	this.activate();
    break;
  }
};