goog.provide('feng.controllers.view3d.ModeController');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('goog.object');
goog.require('feng.events');
goog.require('feng.controllers.controls.BrowseControls');
goog.require('feng.controllers.controls.CloseUpControls');
goog.require('feng.controllers.controls.EntryControls');
goog.require('feng.controllers.controls.DesignControls');
goog.require('feng.controllers.controls.WalkControls');
goog.require('feng.controllers.controls.TransitionControls');


/**
 * @constructor
 */
feng.controllers.view3d.ModeController = function( view3d ){

  goog.base(this);

  this._eventHandler = new goog.events.EventHandler(this);

  this.control = null;

  this._view3d = view3d;
  this._cameraController = this._view3d.cameraController;
  this._renderController = this._view3d.renderController;

  this._browseControls = null;
  this._designControls = null;
  this._walkControls = null;
  this._climbControls = null;
  this._transitionControls = null;

  this._mode = null;

  this._modeControls = {};
};
goog.inherits(feng.controllers.view3d.ModeController, goog.events.EventTarget);


feng.controllers.view3d.ModeController.prototype.init = function(){

	// create mode controls
	this._browseControls = this.createControls( feng.controllers.view3d.ModeController.Mode.BROWSE );
	this._closeUpControls = this.createControls( feng.controllers.view3d.ModeController.Mode.CLOSE_UP );
	this._designControls = this.createControls( feng.controllers.view3d.ModeController.Mode.DESIGN );
	this._entryControls = this.createControls( feng.controllers.view3d.ModeController.Mode.ENTRY );
	this._walkControls = this.createControls( feng.controllers.view3d.ModeController.Mode.WALK );
	this._transitionControls = this.createControls( feng.controllers.view3d.ModeController.Mode.TRANSITION );

	//
	this.control = this._entryControls;
};


feng.controllers.view3d.ModeController.prototype.activate = function(){

	this._eventHandler.listen( this, feng.events.EventType.CHANGE, this.onModeChange, false, this );
	this._eventHandler.listen( feng.navigationController, feng.events.EventType.CHANGE, this.onNavigationChange, false, this );
};


feng.controllers.view3d.ModeController.prototype.deactivate = function(){

	this._eventHandler.removeAll();
};


feng.controllers.view3d.ModeController.prototype.getModeControl = function( mode ){

	return this._modeControls[ mode ];
};


feng.controllers.view3d.ModeController.prototype.getMode = function(){

	return this._mode;
};


feng.controllers.view3d.ModeController.prototype.setMode = function( modeData ){

	var eventData = {
		type: feng.events.EventType.CHANGE
	};

	goog.object.extend( eventData, modeData );

	this.dispatchEvent( eventData );
};


feng.controllers.view3d.ModeController.prototype.createControls = function( mode ){

	var uiElement = this._view3d.hud.domElement;
	var renderElement = this._view3d.domElement;
	var camera = this._cameraController.getCamera( mode );

	var ControlClass;

	switch(mode) {

		case feng.controllers.view3d.ModeController.Mode.BROWSE:
		ControlClass = feng.controllers.controls.BrowseControls;
		break;

		case feng.controllers.view3d.ModeController.Mode.CLOSE_UP:
		ControlClass = feng.controllers.controls.CloseUpControls;
		break;

		case feng.controllers.view3d.ModeController.Mode.DESIGN:
		ControlClass = feng.controllers.controls.DesignControls;
		break;

		case feng.controllers.view3d.ModeController.Mode.ENTRY:
		ControlClass = feng.controllers.controls.EntryControls;
		break;

		case feng.controllers.view3d.ModeController.Mode.WALK:
		ControlClass = feng.controllers.controls.WalkControls;
		break;

		case feng.controllers.view3d.ModeController.Mode.TRANSITION:
		ControlClass = feng.controllers.controls.TransitionControls;
		break;
	}

	var controls = new ControlClass( camera, this._view3d, renderElement, uiElement );
	controls.setParentEventTarget( this );

	// register mode controls
	this._modeControls[ mode ] = controls;

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

	var toPosition = e.toPosition || (nextControl ? nextControl.getPosition() : newControl.getPosition());
	var toRotation = e.toRotation || (nextControl ? nextControl.getRotation() : newControl.getRotation());
	var toFov = e.toFov || (nextControl ? nextControl.getFov() : newControl.getFov());

	this.control.setPosition( fromPosition );
	this.control.setRotation( fromRotation );
	this.control.setFov( fromFov );

	e.fromPosition = fromPosition;
	e.fromRotation = fromRotation;
	e.fromFov = fromFov;
	e.toPosition = toPosition;
	e.toRotation = toRotation;
	e.toFov = toFov;

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

		var shouldUpdateToPosition = false;
		var shouldUpdateToRotation = false;
		var shouldUpdateToFov = false;
		var shouldUpdateToTarget = false;

		switch(nextControl) {
			
			case this._browseControls:
			if(oldControl === this._designControls || oldControl === this._closeUpControls) {
				this._browseControls.setCamera( toRotation );
				shouldUpdateToRotation = true;
				shouldUpdateToTarget = true;
			}
			break;

			case this._closeUpControls:
			this._closeUpControls.setCamera( e.object );
			shouldUpdateToPosition = true;
			shouldUpdateToRotation = true;
			shouldUpdateToFov = true;
			shouldUpdateToTarget = true;
			break;

			case this._designControls:
			this._designControls.setCamera( this.control.getForwardVector(), e.object );
			shouldUpdateToPosition = true;
			shouldUpdateToRotation = true;
			shouldUpdateToFov = true;
			shouldUpdateToTarget = true;
			break;
		};

		e.toPosition = shouldUpdateToPosition ? nextControl.getPosition() : e.toPosition;
		e.toRotation = shouldUpdateToRotation ? feng.utils.ThreeUtils.getShortestRotation(fromRotation, nextControl.getRotation()) : e.toRotation;
		e.toFov = shouldUpdateToFov ? nextControl.getFov() : e.toFov;
		e.toTarget = shouldUpdateToTarget ? nextControl.getTarget() : e.toTarget;
	}

	switch(this._mode) {
		case feng.controllers.view3d.ModeController.Mode.ENTRY:
			this.control.start();
			break;

		case feng.controllers.view3d.ModeController.Mode.WALK:
		case feng.controllers.view3d.ModeController.Mode.TRANSITION:
			this.control.start( e );
			break;

		default:
			break;
	}

	// update renderer
	this._renderController.updateByMode(this._mode, e.nextMode);
};


feng.controllers.view3d.ModeController.prototype.onNavigationChange = function(e) {

	var navController = e.target;

	var goTipResult = navController.testToken( e.tokenArray, feng.controllers.NavigationController.Token.GO_TIP );

	if(goTipResult) {

		var achievements = feng.models.achievements.Achievements.getInstance();
		var tip = achievements.getTip( goTipResult.tipId, goTipResult.viewId, goTipResult.sectionId );

		var object = this._view3d.getObjectByTip( tip );

		this.setMode({
			mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
			nextMode: feng.controllers.view3d.ModeController.Mode.CLOSE_UP,
			object: object
		});
	}
};


feng.controllers.view3d.ModeController.Mode = {
	BROWSE: 'browse', //look around
	CLOSE_UP: 'close_up', //a locked perspective viewing a specific object
	DESIGN: 'design', // isometrix view for ease of positioning/rotating control
	ENTRY: 'entry', //first-time enter a residence
	WALK: 'walk',	// walk along a path
	CLIMB: 'climb',	// climb stairs
	TRANSITION: 'transition' // transition between different cameras for the above mode
};