goog.provide('feng.controllers.view3d.ModeController');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('goog.object');
goog.require('feng.events');
goog.require('feng.controllers.controls.BrowseControls');
goog.require('feng.controllers.controls.CloseUpControls');
goog.require('feng.controllers.controls.FlowControls');
goog.require('feng.controllers.controls.DesignControls');
goog.require('feng.controllers.controls.WalkControls');
goog.require('feng.controllers.controls.TransitionControls');


/**
 * @constructor
 */
feng.controllers.view3d.ModeController = function( view3d ){

  goog.base(this);

  this._eventHandler = new goog.events.EventHandler(this);

  this._view3d = view3d;
  this._cameraController = this._view3d.cameraController;
  this._renderController = this._view3d.renderController;

  this._browseControls = null;
  this._flowControls = null;
  this._designControls = null;
  this._walkControls = null;
  this._transitionControls = null;

  this._control = null;
  this._mode = null;

  this._modeControls = {};
};
goog.inherits(feng.controllers.view3d.ModeController, goog.events.EventTarget);


feng.controllers.view3d.ModeController.prototype.init = function(){

	// create mode controls
	this._browseControls = this.createBrowseControls();
	this._closeUpControls = this.createCloseUpControls();
	this._flowControls = this.createFlowControls();
	this._designControls = this.createDesignControls();
	this._walkControls = this.createWalkControls();
	this._transitionControls = this.createTransitionControls();

	// register mode controls
  this._modeControls[feng.controllers.view3d.ModeController.Mode.BROWSE] = this._browseControls;
  this._modeControls[feng.controllers.view3d.ModeController.Mode.CLOSE_UP] = this._closeUpControls;
  this._modeControls[feng.controllers.view3d.ModeController.Mode.FLOW] = this._flowControls;
  this._modeControls[feng.controllers.view3d.ModeController.Mode.DESIGN] = this._designControls;
  this._modeControls[feng.controllers.view3d.ModeController.Mode.WALK] = this._walkControls;
  this._modeControls[feng.controllers.view3d.ModeController.Mode.TRANSITION] = this._transitionControls;

  //
  this._eventHandler.listen(this, feng.events.EventType.CHANGE, this.onModeChange, false, this);
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
	var camera = this._cameraController.getCamera( feng.controllers.view3d.ModeController.Mode.BROWSE );

	var controls = new feng.controllers.controls.BrowseControls( camera, this._view3d, renderElement, uiElement );
	controls.setParentEventTarget( this );

	return controls;
};


feng.controllers.view3d.ModeController.prototype.createCloseUpControls = function(){

	var uiElement = this._view3d.uiElement;
	var renderElement = this._view3d.domElement;
	var camera = this._cameraController.getCamera( feng.controllers.view3d.ModeController.Mode.CLOSE_UP );

	var controls = new feng.controllers.controls.CloseUpControls( camera, this._view3d, renderElement, uiElement );
	controls.setParentEventTarget( this );

	return controls;
};


feng.controllers.view3d.ModeController.prototype.createFlowControls = function(){

	var renderElement = this._view3d.domElement;
	var camera = this._cameraController.getCamera( feng.controllers.view3d.ModeController.Mode.FLOW );
	var energyFlow = this._view3d.energyFlow;

	var controls = new feng.controllers.controls.FlowControls( camera, this._view3d, renderElement, energyFlow );
	controls.setParentEventTarget( this );

	return controls;
};


feng.controllers.view3d.ModeController.prototype.createDesignControls = function(){

	var uiElement = this._view3d.uiElement;
	var renderElement = this._view3d.domElement;
	var camera = this._cameraController.getCamera( feng.controllers.view3d.ModeController.Mode.DESIGN );

	var controls = new feng.controllers.controls.DesignControls( camera, this._view3d, renderElement, uiElement );
	controls.setParentEventTarget( this );

	return controls;
};


feng.controllers.view3d.ModeController.prototype.createWalkControls = function(){

	var renderElement = this._view3d.domElement;
	var camera = this._cameraController.getCamera( feng.controllers.view3d.ModeController.Mode.WALK );

	var controls = new feng.controllers.controls.WalkControls( camera, this._view3d, renderElement );
	controls.setParentEventTarget( this );

	return controls;
};


feng.controllers.view3d.ModeController.prototype.createTransitionControls = function(){

	var renderElement = this._view3d.domElement;
	var camera = this._cameraController.getCamera( feng.controllers.view3d.ModeController.Mode.TRANSITION );

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

	switch(this.control) {
		case this._browseControls:
		this.control.enable( true, e.eventToTrigger );
		break;

		case this._closeUpControls:
		this.control.enable( true, e.object );
		break;	

		default:
		this.control.enable( true );
		break;
	}

	this._cameraController.setCamera( this.control.getCamera() );

	// if next mode is set,
	// set and get the next mode controls start values and use that for current controls' end value
	if(nextControl) {

		var shouldUpdateTo;

		switch(nextControl) {
			
			case this._closeUpControls:
			this._closeUpControls.setCamera( toPosition, toFov, e.object );
			shouldUpdateTo = true;
			break;

			case this._designControls:
			this._designControls.setCamera( fromPosition, fromFov, e.object );
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
		case feng.controllers.view3d.ModeController.Mode.BROWSE:
			break;

		case feng.controllers.view3d.ModeController.Mode.CLOSE_UP:
			break;

		case feng.controllers.view3d.ModeController.Mode.FLOW:
			this.control.start( fromPosition, e.gateway, nextMode );
			break;

		case feng.controllers.view3d.ModeController.Mode.DESIGN:
			console.log(e);
			break;

		case feng.controllers.view3d.ModeController.Mode.WALK:
			this.control.start( fromPosition, toPosition, e.intersectPosition, e.gateway, nextMode );
			break;

		case feng.controllers.view3d.ModeController.Mode.TRANSITION:
			this.control.start( toPosition, toRotation, toFov, nextMode );
			break;

		default:
			break;
	}

	// update renderer
	this._renderController.updateByMode(this._mode, e.nextMode);
};


feng.controllers.view3d.ModeController.Mode = {
	BROWSE: 'browse', //look around
	CLOSE_UP: 'close_up', // a locked perspective viewing a specific object
	DESIGN: 'design', // isometrix view for ease of positioning/rotating control
	WALK: 'walk',	// walk along a path
	FLOW: 'flow', // follow along the energy flow
	TRANSITION: 'transition' // transition between different cameras for the above mode
};