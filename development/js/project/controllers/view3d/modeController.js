goog.provide('fengshui.controllers.view3d.ModeController');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('goog.object');
goog.require('fengshui.events');
goog.require('fengshui.controllers.controls.BrowseControls');
goog.require('fengshui.controllers.controls.CloseUpControls');
goog.require('fengshui.controllers.controls.PathControls');


/**
 * @constructor
 */
fengshui.controllers.view3d.ModeController = function( view3d ){

  goog.base(this);

  this.setParentEventTarget( view3d );

  this._eventHandler = new goog.events.EventHandler(this);

  this._view3d = view3d;
  this._cameraController = this._view3d.cameraController;

  this._browseControls = null;
  this._closeUpControls = null;
  this._pathControls = null;
  this._transitionControls = null;

  this._control = null;
  this._mode = null;

  this._modeControls = {};
  this._modeControls[fengshui.views.View3D.Mode.BROWSE] = null;
  this._modeControls[fengshui.views.View3D.Mode.CLOSE_UP] = null;
  this._modeControls[fengshui.views.View3D.Mode.PATH] = null;
  this._modeControls[fengshui.views.View3D.Mode.TRANSITION] = null;
};
goog.inherits(fengshui.controllers.view3d.ModeController, goog.events.EventTarget);


fengshui.controllers.view3d.ModeController.prototype.init = function( modeData ){

	// create mode controls
	this._browseControls = this.createBrowseControls();
	this._closeUpControls = this.createCloseUpControls();
	this._pathControls = this.createPathControls();
	this._transitionControls = this.createTransitionControls();

	// register mode controls
  this._modeControls[fengshui.views.View3D.Mode.BROWSE] = this._browseControls;
  this._modeControls[fengshui.views.View3D.Mode.CLOSE_UP] = this._closeUpControls;
  this._modeControls[fengshui.views.View3D.Mode.PATH] = this._pathControls;
  this._modeControls[fengshui.views.View3D.Mode.TRANSITION] = this._transitionControls;

  //
  this._eventHandler.listen(this, fengshui.events.EventType.CHANGE, this.onModeChange, false, this);

  // set initial mode
  this.setMode( modeData );
};


fengshui.controllers.view3d.ModeController.prototype.getModeControl = function( mode ){

	return this._modeControls[ mode ];
};


fengshui.controllers.view3d.ModeController.prototype.getMode = function(){

	return this._mode;
};


fengshui.controllers.view3d.ModeController.prototype.setMode = function( modeData ){

	this.dispatchEvent({
		type: fengshui.events.EventType.CHANGE,
		mode: modeData.mode,
		fromPosition: modeData.fromPosition,
		toPosition: modeData.toPosition,
		fromRotation: modeData.fromRotation,
		toRotation: modeData.toRotation,
		fromPov: modeData.fromPov,
		toPov: modeData.toPov
	});
};


fengshui.controllers.view3d.ModeController.prototype.createBrowseControls = function(){

	var renderElement = this._view3d.getRenderElement();
	var camera = this._cameraController.getCamera( fengshui.views.View3D.Mode.BROWSE );

	var controls = new fengshui.controllers.controls.BrowseControls( camera, renderElement, this._view3d );
	controls.setParentEventTarget( this );

	return controls;
};


fengshui.controllers.view3d.ModeController.prototype.createCloseUpControls = function(){

	var renderElement = this._view3d.getRenderElement();
	var camera = this._cameraController.getCamera( fengshui.views.View3D.Mode.CLOSE_UP );

	var controls = new fengshui.controllers.controls.CloseUpControls( camera, renderElement, this._view3d );
	controls.setParentEventTarget( this );

	return controls;
};


fengshui.controllers.view3d.ModeController.prototype.createPathControls = function(){

	var renderElement = this._view3d.getRenderElement();
	var camera = this._cameraController.getCamera( fengshui.views.View3D.Mode.PATH );
	var scene = this._view3d.scene;

	var controls = new fengshui.controllers.controls.PathControls( camera, renderElement, this._view3d );
	controls.setParentEventTarget( this );
	scene.add( controls.getObject() );

	return controls;
};


fengshui.controllers.view3d.ModeController.prototype.createTransitionControls = function(){

	return null;
};


fengshui.controllers.view3d.ModeController.prototype.onModeChange = function(e) {

	if(this._mode === e.mode) return;
	else this._mode = e.mode;

	console.log('view3D mode changed to ' + this._mode, e);

	// handle current control
	if(this.control) {
		this.control.enable( false );
	}

	// get current control
	this.control = this.getModeControl( e.mode );

	switch(e.mode) {
		case fengshui.views.View3D.Mode.BROWSE:
		this.control.setPosition( e.fromPosition );
		this.control.setRotation( e.fromRotation );
		break;

		case fengshui.views.View3D.Mode.CLOSE_UP:

		break;

		case fengshui.views.View3D.Mode.PATH:
		this.control.setPosition( e.fromPosition );
		this.control.setRotation( e.fromRotation );
		this.control.start( e.toPosition, e.toRotation, e.toFov );
		break;

		case fengshui.views.View3D.Mode.TRANSITION:

		break;
	}

	this.control.enable(true);

	this._cameraController.setCamera( this.control.getCamera() );
};


fengshui.controllers.view3d.ModeController.prototype.onResize = function(e){

	//
};