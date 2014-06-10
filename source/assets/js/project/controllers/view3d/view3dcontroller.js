goog.provide('feng.controllers.view3d.View3DController');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('feng.events');

/**
 * @constructor
 */
feng.controllers.view3d.View3DController = function(){
  goog.base(this);

  this.view3d = null;

  this._view3ds = {};
  this._view3dToFadeIn = null;

  this._eventHandler = new goog.events.EventHandler(this);
  this._eventHandler.listen(this, feng.events.EventType.SHOW, this.onShowView3D, false, this);
  this._eventHandler.listen(this, feng.events.EventType.HIDE, this.onHideView3D, false, this);
  this._eventHandler.listen(this, feng.events.EventType.CHANGE, this.onChangeView3D, false, this);
  this._eventHandler.listen(this, feng.events.EventType.ANIMATE_IN, this.onAnimateInView3D, false, this);
  this._eventHandler.listen(this, feng.events.EventType.ANIMATE_OUT, this.onAnimateOutView3D, false, this);
  this._eventHandler.listen(this, feng.events.EventType.ANIMATED_IN, this.onAnimatedInView3D, false, this);
  this._eventHandler.listen(this, feng.events.EventType.ANIMATED_OUT, this.onAnimatedOutView3D, false, this);
};
goog.inherits(feng.controllers.view3d.View3DController, goog.events.EventTarget);
goog.addSingletonGetter(feng.controllers.view3d.View3DController);


feng.controllers.view3d.View3DController.prototype.registerView3D = function( view3d ){

	this._view3ds[ view3d.sectionId + '.' + view3d.id ] = view3d;
};


feng.controllers.view3d.View3DController.prototype.getView3D = function( sectionId, viewId ){

	return this._view3ds[sectionId + '.' + viewId];
};


feng.controllers.view3d.View3DController.prototype.onHideView3D = function(e){

	console.log('Hide View3D: ', e.target.id);
};


feng.controllers.view3d.View3DController.prototype.onShowView3D = function(e){

	console.log('Show View3D: ', e.target.id);

	this.view3d = e.target;
	this.view3d.activate();

	var position = this.view3d.origin;
	var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
  var lookAtPosition = new THREE.Vector3(0, feng.controllers.controls.Controls.Default.STANCE_HEIGHT, 0);
  var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(position, lookAtPosition);
  rotation.setFromQuaternion( quaternion );

  // set initial mode
  
	this.view3d.modeController.setMode({
		mode: feng.controllers.view3d.ModeController.Mode.BROWSE,
		fromPosition: position,
		fromRotation: rotation,
		fromFov: 40
	});
	
// test
/*
	var activeObject = this.view3d.getInteractiveObject('sofa');
	var cameraSettings = activeObject.specialCameraSettings;

	var closeupControl = this.view3d.modeController.getModeControl('close_up');
	closeupControl.setCamera( cameraSettings.position, cameraSettings.rotation, cameraSettings.fov, activeObject );

	this.view3d.modeController.setMode({
		type: feng.events.EventType.CHANGE,
		mode: feng.controllers.view3d.ModeController.Mode.CLOSE_UP
	});*/
};


feng.controllers.view3d.View3DController.prototype.onChangeView3D = function(e){

	var from = e.target;
	from.fadeOut();

	this._view3dToFadeIn = this.getView3D( e.sectionId, e.viewId );

	var gateway = this._view3dToFadeIn.interactiveObjects[ e.gatewayId ];
	var origin = gateway.origin;

	this._view3dToFadeIn.origin.setX( origin.x );
	this._view3dToFadeIn.origin.setZ( origin.z );

	console.log('Change View3D from: ' + e.target.id + ' to ' + this._view3dToFadeIn.id);
};


feng.controllers.view3d.View3DController.prototype.onAnimateInView3D = function(e){

};


feng.controllers.view3d.View3DController.prototype.onAnimateOutView3D = function(e){

	e.target.deactivate();
};


feng.controllers.view3d.View3DController.prototype.onAnimatedInView3D = function(e){

};


feng.controllers.view3d.View3DController.prototype.onAnimatedOutView3D = function(e){

	if(this._view3dToFadeIn) {
		this._view3dToFadeIn.fadeIn();
	}
};