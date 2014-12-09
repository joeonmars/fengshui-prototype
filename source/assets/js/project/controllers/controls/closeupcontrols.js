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

  this._backUpRotation = new THREE.Euler(0, 0, 0, 'YXZ');

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

	//
	this._activeObject = object;

	// pre-calculate backed up rotation, in case the object might be later picked up
	var browseControls = this._view3d.modeController.getModeControl( feng.controllers.view3d.ModeController.Mode.BROWSE );

	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt( browseControls.getPosition(), this._activeObject.getCenter() );
	this._backUpRotation.setFromQuaternion( quaternion );
};


feng.controllers.controls.CloseUpControls.prototype.enable = function( enable, object ) {
	
	this._activeObject = object || this._activeObject;

	var shouldEnable = goog.base(this, 'enable', enable);

	if(shouldEnable) {

		this.distanceToObject = this.getPosition().distanceTo( this._activeObject.object3d.position );

		this._activeObject.onCameraIn();

		var caption = this._view3d.hud.getCaption( this._activeObject, this );
		caption.setParentEventTarget(this);
		caption.show();

		// todo
		if(this._activeObject.tip.unlocked) {

			this._view3d.fx.greenLeaves.animateIn( this._activeObject );
			this._view3d.fx.yellowLeaves.animateOut();

		}else {

			this._view3d.fx.yellowLeaves.animateIn( this._activeObject );
			this._view3d.fx.greenLeaves.animateOut();
		}

	}else  {
		
		var caption = this._view3d.hud.getCaption( this._activeObject, this );
		caption.hide();
	}
};


feng.controllers.controls.CloseUpControls.prototype.activate = function () {

	goog.base(this, 'activate');

	this._eventHandler.listen(this, feng.events.EventType.CLOSE, this.close, false, this);

	// animate out object select effect
	this._view3d.fx.selectEffect.animateOut();
};


feng.controllers.controls.CloseUpControls.prototype.close = function ( e ) {

	this._activeObject.onCameraOut();

	feng.navigationController.replaceToken("");

	//
	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
		nextMode: feng.controllers.view3d.ModeController.Mode.BROWSE,
		toRotation: this._backUpRotation,
		eventToTrigger: e ? e.eventToTrigger : null
	});
};