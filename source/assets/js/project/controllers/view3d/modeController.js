goog.provide('feng.controllers.view3d.ModeController');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('goog.object');
goog.require('feng.events');
goog.require('feng.controllers.controls.BrowseControls');
goog.require('feng.controllers.controls.CloseUpControls');
goog.require('feng.controllers.controls.ManipulateControls');
goog.require('feng.controllers.controls.PathControls');
goog.require('feng.controllers.controls.TransitionControls');


/**
 * @constructor
 */
feng.controllers.view3d.ModeController = function( view3d ){

  goog.base(this);

  this._eventHandler = new goog.events.EventHandler(this);

  this._view3d = view3d;
  this._cameraController = this._view3d.cameraController;

  this._browseControls = null;
  this._manipulateControls = null;
  this._pathControls = null;
  this._transitionControls = null;

  this._control = null;
  this._mode = null;

  this._modeControls = {};
  this._modeControls[feng.views.View3D.Mode.BROWSE] = null;
  this._modeControls[feng.views.View3D.Mode.CLOSE_UP] = null;
  this._modeControls[feng.views.View3D.Mode.MANIPULATE] = null;
  this._modeControls[feng.views.View3D.Mode.PATH] = null;
  this._modeControls[feng.views.View3D.Mode.TRANSITION] = null;
};
goog.inherits(feng.controllers.view3d.ModeController, goog.events.EventTarget);


feng.controllers.view3d.ModeController.prototype.init = function( modeData ){

	// create mode controls
	this._browseControls = this.createBrowseControls();
	this._closeUpControls = this.createCloseUpControls();
	this._manipulateControls = this.createManipulateControls();
	this._pathControls = this.createPathControls();
	this._transitionControls = this.createTransitionControls();

	// register mode controls
  this._modeControls[feng.views.View3D.Mode.BROWSE] = this._browseControls;
  this._modeControls[feng.views.View3D.Mode.CLOSE_UP] = this._closeUpControls;
  this._modeControls[feng.views.View3D.Mode.MANIPULATE] = this._manipulateControls;
  this._modeControls[feng.views.View3D.Mode.PATH] = this._pathControls;
  this._modeControls[feng.views.View3D.Mode.TRANSITION] = this._transitionControls;

  //
  this._eventHandler.listen(this, feng.events.EventType.CHANGE, this.onModeChange, false, this);

  // set initial mode
  this.setMode( modeData );
};


feng.controllers.view3d.ModeController.prototype.getModeControl = function( mode ){

	return this._modeControls[ mode ];
};


feng.controllers.view3d.ModeController.prototype.getMode = function(){

	return this._mode;
};


feng.controllers.view3d.ModeController.prototype.setMode = function( modeData ){

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: modeData.mode,
		fromPosition: modeData.fromPosition,
		toPosition: modeData.toPosition,
		fromRotation: modeData.fromRotation,
		toRotation: modeData.toRotation,
		fromFov: modeData.fromFov,
		toFov: modeData.toFov
	});
};


feng.controllers.view3d.ModeController.prototype.createBrowseControls = function(){

	var uiElement = this._view3d.uiElement;
	var renderElement = this._view3d.domElement;
	var camera = this._cameraController.getCamera( feng.views.View3D.Mode.BROWSE );

	var controls = new feng.controllers.controls.BrowseControls( camera, this._view3d, renderElement, uiElement );
	controls.setParentEventTarget( this );

	return controls;
};


feng.controllers.view3d.ModeController.prototype.createCloseUpControls = function(){

	var uiElement = this._view3d.uiElement;
	var renderElement = this._view3d.domElement;
	var camera = this._cameraController.getCamera( feng.views.View3D.Mode.CLOSE_UP );

	var controls = new feng.controllers.controls.CloseUpControls( camera, this._view3d, renderElement, uiElement );
	controls.setParentEventTarget( this );

	return controls;
};


feng.controllers.view3d.ModeController.prototype.createManipulateControls = function(){

	var uiElement = this._view3d.uiElement;
	var renderElement = this._view3d.domElement;
	var camera = this._cameraController.getCamera( feng.views.View3D.Mode.MANIPULATE );

	var controls = new feng.controllers.controls.ManipulateControls( camera, this._view3d, renderElement, uiElement );
	controls.setParentEventTarget( this );

	return controls;
};


feng.controllers.view3d.ModeController.prototype.createPathControls = function(){

	var renderElement = this._view3d.domElement;
	var camera = this._cameraController.getCamera( feng.views.View3D.Mode.PATH );
	var scene = this._view3d.scene;

	var controls = new feng.controllers.controls.PathControls( camera, this._view3d, renderElement );
	controls.setParentEventTarget( this );

	return controls;
};


feng.controllers.view3d.ModeController.prototype.createTransitionControls = function(){

	var renderElement = this._view3d.domElement;
	var camera = this._cameraController.getCamera( feng.views.View3D.Mode.TRANSITION );

	var controls = new feng.controllers.controls.TransitionControls( camera, this._view3d, renderElement );
	controls.setParentEventTarget( this );

	return controls;
};


feng.controllers.view3d.ModeController.prototype.onModeChange = function(e) {

	var oldMode = this._mode;
	var newMode = e.mode;
	var nextMode = e.nextMode;

	if(!newMode) return false;

	if(this._mode === newMode) {

		return;
	}else {

		this._mode = newMode;
	}

	console.log('view3D mode changed from ' + oldMode + ' to ' + newMode);

	var oldControl = this.control;
	var newControl = this.getModeControl( this._mode );
	var nextControl = this.getModeControl( nextMode );

	// handle old control
	if(oldControl) {
		oldControl.enable( false );
	}

	// set new control
	this.control = newControl;

	var fromPosition = e.fromPosition || oldControl.getPosition();
	var fromRotation = e.fromRotation || oldControl.getRotation();
	var fromFov = e.fromFov || oldControl.getFov();

	var toPosition = e.toPosition;
	var toRotation = feng.utils.ThreeUtils.getShortestRotation( fromRotation, toRotation );
	var toFov = e.toFov;

	this.control.setPosition( fromPosition );
	this.control.setRotation( fromRotation );
	this.control.setFov( fromFov );
	this.control.enable( true, e.eventToTrigger );

	this._cameraController.setCamera( this.control.getCamera() );

	// if next mode is set,
	// set and get the next mode controls start values and use that for current controls' end value
	if(nextControl) {

		var shouldUpdateTo;

		switch(nextControl) {
			case this._closeUpControls:
			this._closeUpControls.setCamera( toPosition, e.object );
			shouldUpdateTo = true;
			break;

			case this._manipulateControls:
			this._manipulateControls.setCamera( fromPosition, fromFov, e.object );
			shouldUpdateTo = true;
			break;
		};

		if(shouldUpdateTo) {
			toPosition = nextControl.getPosition();
			toRotation = feng.utils.ThreeUtils.getShortestRotation( fromRotation, nextControl.getRotation() );
			toFov = nextControl.getFov();
		}
	}

	switch(this._mode) {
		case feng.views.View3D.Mode.BROWSE:
			break;

		case feng.views.View3D.Mode.CLOSE_UP:
			console.log('close up');
			break;

		case feng.views.View3D.Mode.MANIPULATE:
			console.log(e);
			break;

		case feng.views.View3D.Mode.PATH:
			this.control.start( fromPosition, toPosition, e.intersectPosition, e.gateway, nextMode );
			break;

		case feng.views.View3D.Mode.TRANSITION:
			this.control.start( toPosition, toRotation, toFov, nextMode );
			break;

		default:
			break;
	}
};


feng.controllers.view3d.ModeController.prototype.onResize = function(e){

	//
};