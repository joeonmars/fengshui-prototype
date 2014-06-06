goog.provide('feng.controllers.controls.BrowseControls');

goog.require('goog.events');
goog.require('goog.math.Box');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.views.sections.controls.ObjectSelector');
goog.require('feng.utils.ThreeUtils');
goog.require('feng.utils.Randomizer');

/**
 * @constructor
 * a mod of PointerLockControls...
 */
feng.controllers.controls.BrowseControls = function(camera, view3d, domElement, uiElement){

  goog.base(this, camera, view3d, domElement);

  this._eventMediator = this._view3d.eventMediator;

	this._shouldIgnoreClick = false;

	var objectSelectorEl = goog.dom.getElementByClass('objectSelector', uiElement);
	var renderEl = this._view3d.domElement;
	var interactiveObjects = this._view3d.interactiveObjects;
	this._objectSelector = new feng.views.sections.controls.ObjectSelector( interactiveObjects, this._camera, objectSelectorEl, renderEl );

	this._lastMouseX = 0;
	this._lastMouseY = 0;
	this._targetRotationX = 0;
	this._targetRotationY = 0;

	this._maxRotationX = THREE.Math.degToRad(40);
	this._minRotationX = THREE.Math.degToRad(-40);

	this._raycaster = new THREE.Raycaster();
};
goog.inherits(feng.controllers.controls.BrowseControls, feng.controllers.controls.Controls);


feng.controllers.controls.BrowseControls.prototype.enable = function( enable, mouseEventToTrigger ) {

	goog.base(this, 'enable', enable);

	if(this._isEnabled) {

		this._eventHandler.listen(this._objectSelector, feng.events.EventType.START, this.onObjectSelectStart, false, this);
		this._eventHandler.listen(this._objectSelector, feng.events.EventType.CHANGE, this.onObjectSelected, false, this);

		this._eventHandler.listen(this._eventMediator.getEventTarget(), feng.events.EventType.UPDATE, this.onMediatorEvent, false, this);
		this._eventMediator.listen(this, feng.events.EventType.UPDATE);

		this._eventHandler.listen(this._eventMediator.getEventTarget(), feng.events.EventType.CHANGE, this.onMediatorEvent, false, this);
		this._eventMediator.listen(this, feng.events.EventType.CHANGE);

		if(mouseEventToTrigger) {
			this.onMouseDown( mouseEventToTrigger );
		}

		this._targetRotationY = this._yawObject.rotation.y;
		this._targetRotationX = this._pitchObject.rotation.x;

	}else  {

		this._eventMediator.unlisten(this, feng.events.EventType.UPDATE);
	}

	if(this._isEnabled) {
		this._objectSelector.show();
		this._objectSelector.activate();
	}else {
		this._objectSelector.hide();
		this._objectSelector.deactivate();
	}
};


feng.controllers.controls.BrowseControls.prototype.update = function () {

	goog.base(this, 'update');

	var PI_2 = Math.PI / 2;

	this._yawObject.rotation.y += (this._targetRotationY - this._yawObject.rotation.y) * .1;
	this._pitchObject.rotation.x += (this._targetRotationX - this._pitchObject.rotation.x) * .1;
	this._pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, this._pitchObject.rotation.x ) );

	var fov = this.getFov();
	var defaultFov = feng.controllers.controls.Controls.Default.FOV;

	if(fov !== defaultFov) {

		fov += (defaultFov - fov) * .05;
		this.setFov( fov );

		if(goog.math.nearlyEquals(fov, defaultFov, .1)) {
			this.setFov( defaultFov );
		}
	}

	//
	this.dispatchEvent({
		type: feng.events.EventType.UPDATE,
		rotationY: this.getYaw()
	});
};


feng.controllers.controls.BrowseControls.prototype.onClick = function ( e ) {
	
	goog.base(this, 'onClick', e);

	if ( this._shouldIgnoreClick ) return;

	var clickableObjects = [];
	goog.object.forEach(this._view3d.view3dObjects, function(object) {
		clickableObjects.push( object.object3d );
	});
	
	var intersects = feng.utils.ThreeUtils.getObjectsBy2DPosition( e.clientX, e.clientY, clickableObjects, this._camera, this._domElement );

	if ( intersects.length > 0 ) {

		var intersectPosition = intersects[0].point.clone();
		intersectPosition.y = intersectPosition.y < 10 ? this.getPosition().y : intersectPosition.y;

		var objectName = intersects[0].object.name;

		console.log( 'clicked on ' + objectName);

		this.dispatchEvent({
			type: feng.events.EventType.CHANGE,
			mode: feng.controllers.view3d.ModeController.Mode.WALK,
			nextMode: feng.controllers.view3d.ModeController.Mode.BROWSE,
			toPosition: intersects[0].point,
			toRotation: this.getRotation(),
			toFov: this.getFov(),
			intersectPosition: intersectPosition
		});
	}
};


feng.controllers.controls.BrowseControls.prototype.onMouseDown = function ( e ) {

	goog.base(this, 'onMouseDown', e);

	this._shouldIgnoreClick = false;

	this._lastMouseX = e.clientX;
	this._lastMouseY = e.clientY;
};


feng.controllers.controls.BrowseControls.prototype.onMouseMove = function ( e ) {

	goog.base(this, 'onMouseMove', e);

	this._shouldIgnoreClick = true;

	var movementX = e.clientX - this._lastMouseX;
	var movementY = e.clientY - this._lastMouseY;

	this._lastMouseX = e.clientX;
	this._lastMouseY = e.clientY;

	this._targetRotationY = this._yawObject.rotation.y + movementX * 0.004;
	this._targetRotationX = this._pitchObject.rotation.x + movementY * 0.004;

	// limit vertical rotation
	this._targetRotationX = Math.max(Math.min(this._maxRotationX, this._targetRotationX), this._minRotationX);
};


feng.controllers.controls.BrowseControls.prototype.onObjectSelectStart = function ( e ) {

	this._shouldIgnoreClick = true;
};


feng.controllers.controls.BrowseControls.prototype.onObjectSelected = function ( e ) {

	console.log('Object selected!');

	var cameraSettings;

	// get special camera settings from object
	cameraSettings = e.object.isSpecialCameraEnabled ? e.object.specialCameraSettings : null;
	console.log( 'specialCameraSettings: ', cameraSettings );

	// otherwise focus on the center of object
	if(!cameraSettings) {

		// get camera angle looking at the object's center
		var position = this.getPosition();
		var object3d = e.object.object3d;
		var objectCenter = e.object.getCenter();

		var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
		var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(position, objectCenter);
		rotation.setFromQuaternion( quaternion );

		// find distance between camera and the nearest face from camera to object
		var dir = new THREE.Vector3();
		dir.subVectors( objectCenter, position ).normalize();

		//test
		//http://stemkoski.github.io/Three.js/Helpers.html
//var hex = 0xff4400;

//var arrowHelper = new THREE.ArrowHelper( dir, position, 100, hex );
//this._view3d.scene.add( arrowHelper );
		//

		this._raycaster.set( position, dir );
		var intersect = this._raycaster.intersectObject( object3d, true )[0];

		var distance = intersect.distance;
		var height = e.object.getHeight() * 1.5;

		var fov = 2 * Math.atan( height / ( 2 * distance ) ) * ( 180 / Math.PI );

		cameraSettings = {
			position: position,
			rotation: rotation,
			fov: fov
		};
	}

	//
	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
		nextMode: feng.controllers.view3d.ModeController.Mode.CLOSE_UP,
		toPosition: cameraSettings.position,
		toRotation: cameraSettings.rotation,
		toFov: cameraSettings.fov,
		object: e.object,
		isSpecial: e.object.isSpecialCameraEnabled
	});
};


feng.controllers.controls.BrowseControls.prototype.onMediatorEvent = function(e){

	switch(e.type) {

		case feng.events.EventType.UPDATE:

		if(e.target instanceof feng.views.sections.controls.Compass) {
			var rad = THREE.Math.degToRad( e.angle );
			this.setYaw( rad );
			this._targetRotationY = rad;
		}

		break;

		case feng.events.EventType.CHANGE:

		if(e.target instanceof feng.views.sections.controls.ProgressBar) {
			this.dispatchEvent({
				type: feng.events.EventType.CHANGE,
				mode: feng.controllers.view3d.ModeController.Mode.FLOW,
				toPosition: this.getPosition(),
				tip: e.tip
			});
		}

		break;
	}
};