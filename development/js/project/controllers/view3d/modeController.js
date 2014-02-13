goog.provide('fengshui.controllers.view3d.ModeController');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('goog.object');
goog.require('fengshui.events');


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
  this._trackballControls = null;
  this._control = null;

  this._mode = null;

  this._clock = new THREE.Clock();

  this._modeControls = {};
  this._modeControls[fengshui.views.View3D.Mode.BROWSE] = null;
  this._modeControls[fengshui.views.View3D.Mode.CLOSE_UP] = null;
  this._modeControls[fengshui.views.View3D.Mode.PATH] = null;
  this._modeControls[fengshui.views.View3D.Mode.TRANSITION] = null;
};
goog.inherits(fengshui.controllers.view3d.ModeController, goog.events.EventTarget);


fengshui.controllers.view3d.ModeController.prototype.init = function( mode ){

	// create mode controls
	this._browseControls = this.createBrowseControls();
	this._trackballControls = this.createTrackballControls();

	// register mode controls
  this._modeControls[fengshui.views.View3D.Mode.BROWSE] = this._browseControls;
  this._modeControls[fengshui.views.View3D.Mode.CLOSE_UP] = this._trackballControls;
  this._modeControls[fengshui.views.View3D.Mode.PATH] = null;
  this._modeControls[fengshui.views.View3D.Mode.TRANSITION] = null;

  //
  goog.fx.anim.registerAnimation(this);

  this._eventHandler.listen(this, fengshui.events.EventType.CHANGE, this.onModeChange, false, this);

  // set initial mode
  this.setMode( mode );
};


fengshui.controllers.view3d.ModeController.prototype.getMode = function(){

	return this._mode;
};


fengshui.controllers.view3d.ModeController.prototype.setMode = function( mode ){

	if(this._mode === mode) return;
	else this._mode = mode;

	this.dispatchEvent({
		type: fengshui.events.EventType.CHANGE,
		mode: this._mode
	});
};


fengshui.controllers.view3d.ModeController.prototype.createBrowseControls = function(){

	var renderElement = this._view3d.getRenderElement();
	var camera = this._cameraController.getCamera( fengshui.views.View3D.Mode.BROWSE );

	var controls = new THREE.BrowseControls( camera );
	//this._browseControls.enabled = true;
	controls.getObject().position.set( 0, 100, 350 );
	this._view3d._scene.add( controls.getObject() );

	return controls;
};


fengshui.controllers.view3d.ModeController.prototype.createTrackballControls = function(){

	var renderElement = this._view3d.getRenderElement();
	var camera = this._cameraController.getCamera( fengshui.views.View3D.Mode.CLOSE_UP );

	var controls = new THREE.TrackballControls( camera, renderElement );

	with(controls) {
		rotateSpeed = 1.0;
		zoomSpeed = 1.2;
		panSpeed = 0.8;
		noZoom = false;
		noPan = false;
		noRotate = false;
		minDistance = 100;
		maxDistance = 900;
		staticMoving = true;
		dynamicDampingFactor = 0.3;
		enabled = false;
	};

	this._eventHandler.listen(controls, fengshui.events.EventType.CHANGE, this._view3d.render, false, this._view3d);
	this._eventHandler.listen(window, 'resize', this.onResize, false, this);

	return controls;
};


fengshui.controllers.view3d.ModeController.prototype.onModeChange = function(e){

	console.log('view3D mode changed to ' + e.mode);
};


fengshui.controllers.view3d.ModeController.prototype.onAnimationFrame = function(now){
	
	var delta = this._clock.getDelta();

	this._browseControls.update( delta );
  this._trackballControls.update();
};


fengshui.controllers.view3d.ModeController.prototype.onResize = function(e){

	this._trackballControls.handleResize();
};