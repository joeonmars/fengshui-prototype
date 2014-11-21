goog.provide('feng.controllers.controls.CloseUpControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');


/**
 * @constructor
 */
feng.controllers.controls.CloseUpControls = function(camera, view3d, domElement) {

  goog.base(this, camera, view3d, domElement);

  this._activeObject = null;

  this._tempPosition = new THREE.Vector3();

  this._raycaster = feng.utils.ThreeUtils.raycaster;

  this.distanceToObject = 0;
};
goog.inherits(feng.controllers.controls.CloseUpControls, feng.controllers.controls.Controls);


feng.controllers.controls.CloseUpControls.prototype.setCamera = function( object ) {
	
	// from
	var browseControls = this._view3d.modeController.getModeControl(feng.controllers.view3d.ModeController.Mode.BROWSE);
	var position = browseControls.getPosition();
	var rotation = browseControls.getRotation();
	var fov = browseControls.getFov();

	// get special camera settings from object
	var cameraSettings = object.isSpecialCameraEnabled ? object.specialCameraSettings : null;
	console.log( 'set close up by special camera settings: ', cameraSettings );

	// otherwise focus on the center of object's proxy box
	if(!cameraSettings) {

		var proxyBox = object.getProxyBox();
		var boundingBox = (new THREE.Box3()).setFromObject( proxyBox );

		var toRotation = new THREE.Euler(0, 0, 0, 'YXZ');
		var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(position, boundingBox.center());
		toRotation.setFromQuaternion( quaternion );

		var direction = proxyBox.position.clone().sub( position ).normalize();
		this._raycaster.set( position, direction );

		var intersects = this._raycaster.intersectObject( proxyBox, true );
		this.distanceToObject = intersects[0].distance;

		var height = boundingBox.size().y;
		var fitFov = 2 * Math.atan( height / ( 2 * this.distanceToObject ) ) * ( 180 / Math.PI );
		var toFov = fitFov + 10;

		cameraSettings = {
			position: position,
			rotation: toRotation,
			fov: toFov
		};
	}

	// clear camera offset
	this.getCamera().position.set( 0, 0, 0 );

	// set camera
	this.setPosition( cameraSettings.position );
	this.setRotation( cameraSettings.rotation );
	this.setFov( cameraSettings.fov );

	this._activeObject = object;
};


feng.controllers.controls.CloseUpControls.prototype.enable = function( enable, object ) {
	
	this._activeObject = object || this._activeObject;

	var shouldEnable = goog.base(this, 'enable', enable);

	if(shouldEnable) {

		this.distanceToObject = this.getPosition().distanceTo( this._activeObject.object3d.position );

		this._activeObject.onCameraIn();

		// test...
		var caption = this._view3d.hud.getCaption( this._activeObject, this );
		caption.setParentEventTarget(this);
		caption.show();

	}else  {
		
		// test...
		var caption = this._view3d.hud.getCaption( this._activeObject, this );
		caption.setParentEventTarget(this);
		caption.hide();
	}
};


feng.controllers.controls.CloseUpControls.prototype.activate = function () {

	goog.base(this, 'activate');

	this._eventHandler.listen(this, feng.events.EventType.CLOSE, this.close, false, this);
};


feng.controllers.controls.CloseUpControls.prototype.close = function ( e ) {

	this._activeObject.onCameraOut();

	// delay to animate out object select effect
	this._view3d.fx.selectEffect.animateOut( 1 );

	//
	feng.navigationController.replaceToken("");

	var browseControls = this._view3d.modeController.getModeControl( feng.controllers.view3d.ModeController.Mode.BROWSE );

  	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt( browseControls.getPosition(), this._activeObject.getCenter() );
	var rotation = (new THREE.Euler(0, 0, 0, 'YXZ')).setFromQuaternion( quaternion );

	//
	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
		nextMode: feng.controllers.view3d.ModeController.Mode.BROWSE,
		toRotation: rotation,
		eventToTrigger: e ? e.eventToTrigger : null
	});
};