goog.provide('feng.controllers.controls.DesignControls');

goog.require('goog.fx.anim.Animated');
goog.require('goog.math');
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
  this._eventMediator = this._view3d.eventMediator;

  this._interactionResolver = feng.controllers.controls.InteractionResolver.getInstance();

  var boundObject = this._view3d.getView3dObject( 'ground' ) || this._view3d.getView3dObject( 'wall' );
  var boundBox = boundObject.getBox();
  this._worldWidth = boundBox.right - boundBox.left;
  this._worldHeight = boundBox.bottom - boundBox.top;
  this._worldId = this._view3d.sectionId + '.' + this._view3d.id;

  var manipulatorDom = goog.dom.getElementByClass('manipulator', uiElement);
  this._manipulator = new feng.views.sections.controls.Manipulator( manipulatorDom );
  this._manipulator.setParentEventTarget( this );

  var zoomSliderDom = goog.dom.createDom('div');
  this._zoomSlider = new feng.views.sections.controls.ZoomSlider( zoomSliderDom, this._view3d.domElement );
};
goog.inherits(feng.controllers.controls.DesignControls, feng.controllers.controls.Controls);


feng.controllers.controls.DesignControls.prototype.setCamera = function( fromPosition, fromFov, object ) {

	// get camera angle from center
	var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
	var lookAtPosition = new THREE.Vector3(0, 0, 0);
	var up = new THREE.Vector3(0, 1, 0);
	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(fromPosition, lookAtPosition, up);
	rotation.setFromQuaternion( quaternion );

	// get position by camera angle
	var cameraHeight = 400;
	var x = cameraHeight * Math.sin( rotation.y );
	var z = cameraHeight * Math.cos( rotation.y );
	var y = cameraHeight;

	var position = new THREE.Vector3(x, y, z);

	// get rotation looking at center
	var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
	var lookAtPosition = new THREE.Vector3(0, 0, 0);
	var up = new THREE.Vector3(0, 1, 0);
	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(position, lookAtPosition, up);
	rotation.setFromQuaternion( quaternion );

	// apply
	this.setPosition( position );
	this.setRotation( rotation );
	this.setFov( this._zoomSlider.calculateFov() );

	this._activeObject = object;
};


feng.controllers.controls.DesignControls.prototype.enable = function( enable ) {

	goog.base(this, 'enable', enable);

	if(this._isEnabled) {

		this._eventHandler.listen(this._manipulator, feng.events.EventType.CHANGE, this.onManipulate, false, this);
		this._eventHandler.listen(this._eventMediator.getEventTarget(), feng.events.EventType.UPDATE, this.onMediatorEvent, false, this);
		this._eventMediator.listen(this, feng.events.EventType.UPDATE);

		this._eventHandler.listen(this._view3d.domElement, 'click', this.onClickView, false, this);

		this._eventHandler.listen(this._interactionResolver, feng.events.EventType.START, this.onInteractionStart, false, this);
		this._eventHandler.listen(this._interactionResolver, feng.events.EventType.END, this.onInteractionEnd, false, this);

		this._zoomSlider.activate();
		this._zoomSlider.show();

		this._manipulator.show();
		this._manipulator.activate( this._activeObject.interactions );
		this.update();

	}else  {

		this._eventMediator.unlisten(this, feng.events.EventType.UPDATE);

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
	var objectPosition = this._activeObject.object3d.position;
	var currentPosition = this.getPosition();

	var d = objectPosition.distanceTo( currentPosition );
	var sine = (currentPosition.z - objectPosition.z) / d;
	var rad = Math.asin( sine );
	var x = objectPosition.x + Math.cos(rad) * 90;
	var z = objectPosition.z + Math.sin(rad) * 90;
	var toPosition = new THREE.Vector3(x, closeUpControls.getPosition().y, z);

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
		nextMode: feng.controllers.view3d.ModeController.Mode.CLOSE_UP,
		toPosition: toPosition,
		object: this._activeObject
	});
};


feng.controllers.controls.DesignControls.prototype.onManipulate = function ( e ) {

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


feng.controllers.controls.DesignControls.prototype.onMediatorEvent = function(e){

	switch(e.type) {

		case feng.events.EventType.UPDATE:

		if(e.target instanceof feng.views.sections.controls.Compass) {

			var cameraHeight = this.getPosition().y;
			var posX = cameraHeight * Math.sin( -e.rotation );
			var posZ = cameraHeight * Math.cos( -e.rotation );
			var posY = cameraHeight;

			this.setPosition( posX, posY, posZ );

			// look at
			var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
			var centerPosition = new THREE.Vector3(0, 0, 0);
			var position = centerPosition;
			var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(this.getPosition(), position);
			rotation.setFromQuaternion( quaternion );

			this.setRotation( rotation );
		}

		break;
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