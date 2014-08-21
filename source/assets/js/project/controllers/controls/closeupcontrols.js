goog.provide('feng.controllers.controls.CloseUpControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.views.sections.controls.Manipulator');
goog.require('feng.controllers.controls.InteractionResolver');


/**
 * @constructor
 */
feng.controllers.controls.CloseUpControls = function(camera, view3d, domElement, uiElement) {

  goog.base(this, camera, view3d, domElement);

  this._activeObject = null;

  var manipulatorDom = goog.dom.getElementByClass('manipulator', uiElement);
  this._manipulator = new feng.views.sections.controls.Manipulator( manipulatorDom );

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

	goog.base(this, 'enable', enable);

	this._activeObject = object || this._activeObject;

	if(this._isEnabled) {

		this._eventHandler.listen(this, feng.events.EventType.CLOSE, this.close, false, this);

		this._eventHandler.listen(this._manipulator, feng.events.EventType.CLOSE, this.close, false, this);
		this._eventHandler.listen(this._manipulator, feng.events.EventType.CHANGE, this.onManipulate, false, this);

		this._eventHandler.listen(this._interactionResolver, feng.events.EventType.START, this.onInteractionStart, false, this);
		this._eventHandler.listen(this._interactionResolver, feng.events.EventType.END, this.onInteractionEnd, false, this);

		this._manipulator.show();
		this._manipulator.activate( this._activeObject.interactions );

		this.distanceToObject = this.getPosition().distanceTo( this._activeObject.object3d.position );

		this._activeObject.onCameraIn();

		// test...
		var type = this._activeObject.tipInteraction || 'change_object';
		var caption = this._view3d.hud.getCaption( this._activeObject, this, type );
		caption.setParentEventTarget(this);
		caption.show();

	}else  {

		this._manipulator.hide();
		this._manipulator.deactivate();

		// test...
		var type = this._activeObject.tipInteraction || 'change_object';
		var caption = this._view3d.hud.getCaption( this._activeObject, this, type );
		caption.setParentEventTarget(this);
		caption.hide();
	}
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


feng.controllers.controls.CloseUpControls.prototype.update = function() {

	goog.base(this, 'update');

	var viewSize = this._view3d.getViewSize();
	var position3d = feng.utils.ThreeUtils.getWorldPosition( this._activeObject.object3d, this._tempPosition );
	var position2d = feng.utils.ThreeUtils.get2DCoordinates( position3d, this._camera, viewSize );
	this._manipulator.update( position2d.x, position2d.y );
};


feng.controllers.controls.CloseUpControls.prototype.onManipulate = function ( e ) {

	var interaction = feng.views.view3dobject.InteractiveObject.Interaction;
	var isPhysical = this._activeObject.isPhysical;
	var shouldGoDesignMode = false;

	if(e.interaction === interaction.MOVE) shouldGoDesignMode = true;
	if(isPhysical && e.interaction === interaction.ROTATE) shouldGoDesignMode = true;

	if(shouldGoDesignMode) {

		this.dispatchEvent({
			type: feng.events.EventType.CHANGE,
			mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
			nextMode: feng.controllers.view3d.ModeController.Mode.DESIGN,
			object: this._activeObject
		});

	}else {

		this._interactionResolver.resolve( this._activeObject, e.interaction );

	}
	
};


feng.controllers.controls.CloseUpControls.prototype.onInteractionStart = function(e){

	this._manipulator.hide();
};


feng.controllers.controls.CloseUpControls.prototype.onInteractionEnd = function(e){

	this._manipulator.show();

	if(e.interaction === 'close') {
		this.close();
	}
};


feng.controllers.controls.CloseUpControls.prototype.onResize = function ( e ) {

	goog.base(this, 'onResize', e);

	this.shiftCamera( this._cameraOffsetX );
};