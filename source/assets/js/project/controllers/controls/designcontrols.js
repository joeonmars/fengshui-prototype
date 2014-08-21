goog.provide('feng.controllers.controls.DesignControls');

goog.require('feng.controllers.controls.Controls');
goog.require('feng.controllers.controls.InteractionResolver');
goog.require('feng.utils.ThreeUtils');
goog.require('feng.views.sections.controls.Manipulator');
goog.require('feng.views.sections.controls.ZoomSlider');


/**
 * @constructor
 * a combination of trackball controls and transform controls
 */
feng.controllers.controls.DesignControls = function(camera, view3d, domElement, uiElement){

  goog.base(this, camera, view3d, domElement);

  this._activeObject = null;

  this._focus = new THREE.Vector3();

  this._distance = 1000;

  // detect bounding box on floors for camera to move around
  this._boundingBox = new THREE.Box3();

  goog.array.forEach(this._view3d.floorObjects, function(floorObject) {

  	var floorBox = (new THREE.Box3()).setFromObject( floorObject );
  	this._boundingBox = this._boundingBox.union( floorBox );

  }, this);

  //
  this._interactionResolver = feng.controllers.controls.InteractionResolver.getInstance();

  var manipulatorDom = goog.dom.getElementByClass('manipulator', uiElement);
  this._manipulator = new feng.views.sections.controls.Manipulator( manipulatorDom );

  var zoomSliderDom = goog.dom.createDom('div');
  this._zoomSlider = new feng.views.sections.controls.ZoomSlider( zoomSliderDom, this._view3d.domElement );
};
goog.inherits(feng.controllers.controls.DesignControls, feng.controllers.controls.Controls);


feng.controllers.controls.DesignControls.prototype.setCamera = function( fromPosition, fromFov, object ) {

	// reset focus to object
	this._focus.copy( /*object ? object.object3d.position :*/ this._view3d.scene.position );

	// set default rotation by default position
	var position = new THREE.Vector3( this._distance, this._distance, this._distance );

	var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
	var up = new THREE.Vector3(0, 1, 0);
	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(position, this._focus, up);
	rotation.setFromQuaternion( quaternion );

	this.setRotation( rotation );

	this.setFocus( this._focus.x, this._focus.z );
	
	this.setFov( this._zoomSlider.calculateFov() );

	this._activeObject = object;
};


feng.controllers.controls.DesignControls.prototype.setFocus = function( x, z ) {

	this._focus.set( x, 0, z );

	var rotation = this.getRotation();

	// get position by camera angle
	var cameraX = this._distance/* * Math.sin( rotation.y )*/ + this._focus.x;
	var cameraZ = this._distance/* * Math.cos( rotation.y )*/ + this._focus.z;
	var cameraY = this._distance;

	// apply position
	this.setPosition( cameraX, cameraY, cameraZ );
};


feng.controllers.controls.DesignControls.prototype.enable = function( enable ) {

	goog.base(this, 'enable', enable);

	if(this._isEnabled) {

		this._eventHandler.listen( this._view3d.hud, feng.events.EventType.UPDATE, this.onUpdateHud, false, this);

		this._eventHandler.listen(this._manipulator, feng.events.EventType.CHANGE, this.onManipulate, false, this);
		this._eventHandler.listen(this._view3d.domElement, 'click', this.onClickView, false, this);

		this._eventHandler.listen(this._interactionResolver, feng.events.EventType.START, this.onInteractionStart, false, this);
		this._eventHandler.listen(this._interactionResolver, feng.events.EventType.END, this.onInteractionEnd, false, this);

		this._zoomSlider.activate();
		this._zoomSlider.show();

		this._manipulator.show();
		this._manipulator.activate( this._activeObject.interactions );
		this.update();

	}else  {

		this._zoomSlider.deactivate();
		this._zoomSlider.hide();

		this._manipulator.hide();
		this._manipulator.deactivate();
	}
};


feng.controllers.controls.DesignControls.prototype.update = function () {

	goog.base(this, 'update');

	//
	this.dispatchEvent({
		type: feng.events.EventType.UPDATE,
		rotationY: -this.getYaw()
	});

	//
	var renderElement = this._view3d.domElement;
	var renderElementSize = goog.style.getSize( renderElement );
	var object3d = this._activeObject.object3d;
	var object2d = feng.utils.ThreeUtils.get2DCoordinates( object3d.position, this._camera, renderElementSize );
	this._manipulator.update( object2d.x, object2d.y );
};


feng.controllers.controls.DesignControls.prototype.close = function () {

	var closeUpControls = this._view3d.modeController.getModeControl(feng.controllers.view3d.ModeController.Mode.CLOSE_UP);
	var closeUpCameraPosition = closeUpControls.getPosition();
	var objectPosition = this._activeObject.object3d.position;

	var originalDistanceToObject = closeUpControls.distanceToObject;

	var cameraPosition = new THREE.Vector3();
	cameraPosition.subVectors( closeUpCameraPosition, objectPosition ).normalize().multiplyScalar( originalDistanceToObject );
	cameraPosition = objectPosition.clone().add( cameraPosition );
	cameraPosition.y = closeUpCameraPosition.y;

	var cameraRotation = new THREE.Euler(0, 0, 0, 'YXZ');
	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(cameraPosition, objectPosition);
	cameraRotation.setFromQuaternion( quaternion );

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
		nextMode: feng.controllers.view3d.ModeController.Mode.CLOSE_UP,
		toPosition: cameraPosition,
		toRotation: cameraRotation,
		toFov: feng.controllers.controls.Controls.Default.FOV,
		object: this._activeObject
	});
};


feng.controllers.controls.DesignControls.prototype.onManipulate = function ( e ) {
	/*
	var collidableBoxes = this._view3d.getCollidableBoxes( this._activeObject.object3d );
	var objectBox = this._activeObject.getBoxBeforeRotation();

	this._interactionResolver.resolve( this._activeObject, e.interaction, {
		worldId: this._worldId,
		worldWidth: this._worldWidth,
		worldHeight: this._worldHeight,
		collidableBoxes: collidableBoxes,
		objectBox: objectBox,
		camera: this._camera
	});
*/
};


feng.controllers.controls.DesignControls.prototype.onClickView = function(e){

	var intersects = feng.utils.ThreeUtils.getObjectsBy2DPosition(
		e.clientX,
		e.clientY,
		this._view3d.editables,
		this._camera,
		this._view3d.getViewSize());

	if(intersects.length === 0) {
		return false;
	}

	this._activeObject = this._view3d.interactiveObjects[ intersects[0].object.name ];
};


feng.controllers.controls.DesignControls.prototype.onUpdateHud = function(e){

	if(e.target instanceof feng.views.sections.controls.Compass) {

		var posX = this._distance * Math.sin( -e.rotation );
		var posZ = this._distance * Math.cos( -e.rotation );
		var posY = this._distance;

		this.setPosition( posX, posY, posZ );

		// look at
		var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
		var centerPosition = new THREE.Vector3(0, 0, 0);
		var position = centerPosition;
		var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(this.getPosition(), position);
		rotation.setFromQuaternion( quaternion );

		this.setRotation( rotation );
	}
};


feng.controllers.controls.DesignControls.prototype.onInteractionStart = function(e){

	this._manipulator.hide();
};


feng.controllers.controls.DesignControls.prototype.onInteractionEnd = function(e){

	this._manipulator.show();

	if(e.interaction === 'close') {
		this.close();
	}
};


feng.controllers.controls.DesignControls.prototype.onAnimationFrame = function(now){

	goog.base(this, 'onAnimationFrame', now);

	this.setFov( this._zoomSlider.getCurrentFov() );
};