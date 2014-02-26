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

  this.setParentEventTarget( view3d );

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


feng.controllers.view3d.ModeController.prototype.requireTransitionMode = function(oldMode, newMode){

	var requiredModes = [
		[feng.views.View3D.Mode.BROWSE, feng.views.View3D.Mode.MANIPULATE]
	];

	var result = goog.array.find(requiredModes, function(modes) {
		return (goog.array.indexOf(modes, oldMode) >= 0 && goog.array.indexOf(modes, newMode) >= 0);
	});

	if(result) {
		return true;
	}else {
		return false;
	}
};


feng.controllers.view3d.ModeController.prototype.createBrowseControls = function(){

	var renderElement = this._view3d.getRenderElement();
	var camera = this._cameraController.getCamera( feng.views.View3D.Mode.BROWSE );

	var controls = new feng.controllers.controls.BrowseControls( camera, renderElement, this._view3d );
	controls.setParentEventTarget( this );

	return controls;
};


feng.controllers.view3d.ModeController.prototype.createCloseUpControls = function(){

	var renderElement = this._view3d.getRenderElement();
	var camera = this._cameraController.getCamera( feng.views.View3D.Mode.CLOSE_UP );

	var controls = new feng.controllers.controls.CloseUpControls( camera, renderElement, this._view3d );
	controls.setParentEventTarget( this );

	return controls;
};


feng.controllers.view3d.ModeController.prototype.createManipulateControls = function(){

	var renderElement = this._view3d.getRenderElement();
	var camera = this._cameraController.getCamera( feng.views.View3D.Mode.MANIPULATE );

	var controls = new feng.controllers.controls.ManipulateControls( camera, renderElement, this._view3d );
	controls.setParentEventTarget( this );

	return controls;
};


feng.controllers.view3d.ModeController.prototype.createPathControls = function(){

	var renderElement = this._view3d.getRenderElement();
	var camera = this._cameraController.getCamera( feng.views.View3D.Mode.PATH );
	var scene = this._view3d.scene;

	var controls = new feng.controllers.controls.PathControls( camera, renderElement, this._view3d );
	controls.setParentEventTarget( this );

	return controls;
};


feng.controllers.view3d.ModeController.prototype.createTransitionControls = function(){

	var renderElement = this._view3d.getRenderElement();
	var camera = this._cameraController.getCamera( feng.views.View3D.Mode.TRANSITION );

	var controls = new feng.controllers.controls.TransitionControls( camera, renderElement, this._view3d );
	controls.setParentEventTarget( this );

	return controls;
};


feng.controllers.view3d.ModeController.prototype.onModeChange = function(e) {

	var oldMode = this._mode;
	var newMode = e.mode;

	if(!newMode) return false;

	if(this._mode === newMode) {

		return;
	}else {

		var requireTransitionMode = this.requireTransitionMode(oldMode, newMode);
		newMode = requireTransitionMode ? feng.views.View3D.Mode.TRANSITION : newMode;
		this._mode = newMode;
	}

	console.log('view3D mode changed from ' + oldMode + ' to ' + newMode);

	var oldControl = this.control;
	var newControl = this.getModeControl( this._mode );
	var futureControl = this.getModeControl( e.mode );

	// handle old control
	if(oldControl) {
		oldControl.enable( false );
	}

	// set new control
	this.control = newControl;

	var fromPosition = e.fromPosition || oldControl.getPosition();
	var fromRotation = e.fromRotation || oldControl.getRotation();
	var fromFov = e.fromFov || oldControl.getFov();

	var toPosition = e.toPosition || futureControl.getPosition();
	var toRotation = e.toRotation || futureControl.getRotation();
	var toFov = e.toFov || futureControl.getFov();

	this.control.setPosition( fromPosition );
	this.control.setRotation( fromRotation );
	this.control.setFov( fromFov );

	switch(this._mode) {
		case feng.views.View3D.Mode.BROWSE:
		break;

		case feng.views.View3D.Mode.MANIPULATE:

		break;

		case feng.views.View3D.Mode.PATH:
		this.control.start( toPosition, toRotation, toFov );
		break;

		case feng.views.View3D.Mode.TRANSITION:
		this.control.start( toPosition, toRotation, toFov, e.lookAt, e.mode );
		break;
	}

	this.control.enable(true);

	this._cameraController.setCamera( this.control.getCamera() );
};


feng.controllers.view3d.ModeController.prototype.onResize = function(e){

	//
};