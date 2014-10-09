goog.provide('feng.controllers.controls.CloseUpControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.controllers.controls.InteractionResolver');


/**
 * @constructor
 */
feng.controllers.controls.CloseUpControls = function(camera, view3d, domElement) {

  goog.base(this, camera, view3d, domElement);

  this._activeObject = null;

  this._interactionResolver = feng.controllers.controls.InteractionResolver.getInstance();

  this._tempPosition = new THREE.Vector3();

  this._box3 = new THREE.Box3();
  this._proxyBox = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true, wireframeLinewidth: 2 } ) );
  this._raycaster = new THREE.Raycaster();

  this._cameraOffsetX = 0;

  this.distanceToObject = 0;
};
goog.inherits(feng.controllers.controls.CloseUpControls, feng.controllers.controls.Controls);


feng.controllers.controls.CloseUpControls.prototype.setCamera = function( position, rotation, fov, object ) {
	
	// get special camera settings from object
	var cameraSettings = object.isSpecialCameraEnabled ? object.specialCameraSettings : null;
	console.log( 'set close up by special camera settings: ', cameraSettings );

	// otherwise focus on the center of object
	if(!cameraSettings) {

		var toRotation = new THREE.Euler(0, 0, 0, 'YXZ');
		var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(position, object.getCenter());
		toRotation.setFromQuaternion( quaternion );

	  this._box3.setFromObject( object.object3d );
	 
	  this._box3.size( this._proxyBox.scale );
	  this._box3.center( this._proxyBox.position );
	  this._proxyBox.updateMatrixWorld();
	 
	  var direction = this._proxyBox.position.clone().sub( position ).normalize();
	  this._raycaster.set( position, direction );

	  var intersects = this._raycaster.intersectObject( this._proxyBox, true );
	  this.distanceToObject = intersects[0].distance;
	 
	  var height = this._box3.size().y;
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


feng.controllers.controls.CloseUpControls.prototype.calculateCameraOffset = function () {

	var viewSize = this._view3d.viewSize;
	var fov = this.getFov();

	var visibleHeight = 2 * Math.tan( fov * Math.PI / 180 / 2 ) * this.distanceToObject;
	var sizeFraction = viewSize.height / visibleHeight;
	var offsetScreenWidth = viewSize.width / 5;
	var offsetDistance = offsetScreenWidth / sizeFraction;

	return offsetDistance;
};


feng.controllers.controls.CloseUpControls.prototype.shiftCameraToLeft = function () {

	this._cameraOffsetX = this.calculateCameraOffset();
	this.shiftCamera( - this._cameraOffsetX );
};


feng.controllers.controls.CloseUpControls.prototype.shiftCameraToRight = function () {

	this._cameraOffsetX = this.calculateCameraOffset();
	this.shiftCamera( this._cameraOffsetX );
};


feng.controllers.controls.CloseUpControls.prototype.shiftCamera = function ( x ) {

	var camera = this.getCamera();

	TweenMax.to(camera.position, .5, {
		x: x,
		'ease': Sine.easeInOut
	});
};


feng.controllers.controls.CloseUpControls.prototype.enable = function( enable, object ) {
	
	this._activeObject = object || this._activeObject;

	var shouldEnable = goog.base(this, 'enable', enable);

	if(shouldEnable) {

		this.distanceToObject = this.getPosition().distanceTo( this._activeObject.object3d.position );

		this._activeObject.onCameraIn();

		// test...
		var type = this._activeObject.tipInteraction || 'change_object';
		var caption = this._view3d.hud.getCaption( this._activeObject, this, type );
		caption.setParentEventTarget(this);
		caption.show();

	}else  {
		
		// test...
		var type = this._activeObject.tipInteraction || 'change_object';
		var caption = this._view3d.hud.getCaption( this._activeObject, this, type );
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

	// find out the closest walkable position to go to
	var pathfinder = feng.pathfinder;

	var matrixId = this._view3d.getMatrixId();
	var matrixData = pathfinder.getMatrixData( matrixId );

	var tile = pathfinder.getTileByPosition( this.getPosition(), matrixData );
	var toPosition = pathfinder.getClosestWalkableTilePosition( tile, matrixData );
	toPosition.y = feng.controllers.controls.Controls.Default.STANCE_HEIGHT;

	var toFov = feng.controllers.controls.Controls.Default.FOV;

	// delay to animate out object select effect
	this._view3d.fx.selectEffect.animateOut( 1 );

	//
	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
		nextMode: feng.controllers.view3d.ModeController.Mode.BROWSE,
		toPosition: toPosition,
		toFov: toFov,
		eventToTrigger: e ? e.eventToTrigger : null
	});
};