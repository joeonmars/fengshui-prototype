goog.provide('feng.controllers.controls.BrowseControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.controllers.controls.ObjectSelector');
goog.require('feng.utils.ThreeUtils');
goog.require('feng.utils.Randomizer');
goog.require('feng.utils.MultiLinearInterpolator');

/**
 * @constructor
 * a mod of PointerLockControls...
 */
feng.controllers.controls.BrowseControls = function(camera, domElement, view3d){

  goog.base(this, camera, domElement, view3d);

  this._eventMediator = this._view3d.eventMediator;

	this._clickableObjects = goog.array.filter(this._scene.children, function(object) {
		return (object instanceof THREE.Mesh);
	});

	this._hasDragged = false;

	this._objectSelector = new feng.controllers.controls.ObjectSelector( this._clickableObjects, this._camera, this._view3d.getRenderElement() );

	this._lastMouseX = 0;
	this._lastMouseY = 0;
	this._targetRotationX = 0;
	this._targetRotationY = 0;

	this._maxRotationX = goog.math.toRadians(45);
	this._minRotationX = goog.math.toRadians(-45);

	var randomXNumbers = feng.utils.Randomizer.getRandomNumbers(6, 10);
	randomXNumbers.unshift(0);
	randomXNumbers.push(0);
	goog.array.forEach(randomXNumbers, function(number, index) {
		if(index % 2 === 0) randomXNumbers[index] *= -1;
	});

	var randomYNumbers = feng.utils.Randomizer.getRandomNumbers(1, 10);
	randomYNumbers.unshift(0);
	randomYNumbers.push(0);
	goog.array.forEach(randomYNumbers, function(number, index) {
		if(index % 2 === 0) randomYNumbers[index] *= -1;
	});

	this._randomXInterpolator = new feng.utils.MultiLinearInterpolator(randomXNumbers, 8000);
	this._randomYInterpolator = new feng.utils.MultiLinearInterpolator(randomYNumbers, 10000);
};
goog.inherits(feng.controllers.controls.BrowseControls, feng.controllers.controls.Controls);


feng.controllers.controls.BrowseControls.prototype.getRotation = function () {

	var rx = this._targetRotationX + this._camera.rotation.x;
	var ry = this._targetRotationY + this._camera.rotation.y;
	var rz = 0;
	var rotation = new THREE.Euler( rx, ry, rz, 'YXZ' );
	return rotation;
};


feng.controllers.controls.BrowseControls.prototype.setRotation = function (x, y, z) {

	goog.base(this, 'setRotation', x, y, z);

	if(x instanceof THREE.Euler) {
		var rotation = x;
		this._targetRotationX = rotation.x;
		this._targetRotationY = rotation.y;
	}else {
		this._targetRotationX = x;
		this._targetRotationY = y;
	}
};


feng.controllers.controls.BrowseControls.prototype.enable = function( enable ) {

	goog.base(this, 'enable', enable);

	if(this._isEnabled) {

		this._eventHandler.listen(this._objectSelector, feng.events.EventType.CHANGE, this.onObjectSelected, false, this);
		this._eventHandler.listen(this._eventMediator.getEventTarget(), feng.events.EventType.UPDATE, this.onMediatorEvent, false, this);

		this._eventMediator.listen(this, feng.events.EventType.UPDATE);

	}else  {

		// reset clock, thus set camera natural movement's playhead to 0
		this._clock.startTime = 0;
		this._clock.oldTime = 0;
		this._clock.elapsedTime = 0;

		this._eventMediator.unlisten(this, feng.events.EventType.UPDATE);

	}

	this._objectSelector.enable( this._isEnabled );
};


feng.controllers.controls.BrowseControls.prototype.update = function () {

	goog.base(this, 'update');

	var elapsed = this._clock.getElapsedTime();

	var PI_2 = Math.PI / 2;

	this._yawObject.rotation.y += (this._targetRotationY - this._yawObject.rotation.y) * .1;
	this._pitchObject.rotation.x += (this._targetRotationX - this._pitchObject.rotation.x) * .1;
	this._pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, this._pitchObject.rotation.x ) );

	// random rotating motion
	this._randomXInterpolator.update( elapsed * 1000 );
	this._randomYInterpolator.update( elapsed * 1000 );

	var cameraRotateX = this._randomXInterpolator.getValue() * .04;
	var cameraRotateY = this._randomYInterpolator.getValue() * .04;
	this._camera.rotation.x = cameraRotateX;
	this._camera.rotation.y = cameraRotateY;

	//
	this.dispatchEvent({
		type: feng.events.EventType.UPDATE,
		rotationY: this._yawObject.rotation.y
	});
};


feng.controllers.controls.BrowseControls.prototype.onClick = function ( e ) {
	
	goog.base(this, 'onClick', e);

	if ( this._hasDragged ) return;

	var intersects = feng.utils.ThreeUtils.getObjectsBy2DPosition( e.clientX, e.clientY, this._clickableObjects, this._camera, this._domElement );

	if ( intersects.length > 0 ) {

		console.log('clicked on ' + intersects[0].object.name);

		this.dispatchEvent({
			type: feng.events.EventType.CHANGE,
			mode: feng.views.View3D.Mode.PATH,
			toPosition: intersects[0].point,
			toRotation: this.getRotation(),
			toFov: this.getFov()
		});
	}
};


feng.controllers.controls.BrowseControls.prototype.onMouseDown = function ( e ) {

	goog.base(this, 'onMouseDown', e);

	this._hasDragged = false;

	this._lastMouseX = e.clientX;
	this._lastMouseY = e.clientY;
};


feng.controllers.controls.BrowseControls.prototype.onMouseMove = function ( e ) {

	goog.base(this, 'onMouseMove', e);

	this._hasDragged = true;

	var movementX = e.clientX - this._lastMouseX;
	var movementY = e.clientY - this._lastMouseY;

	this._lastMouseX = e.clientX;
	this._lastMouseY = e.clientY;

	this._targetRotationY = this._yawObject.rotation.y + movementX * 0.004;
	this._targetRotationX = this._pitchObject.rotation.x + movementY * 0.004;

	// limit vertical rotation
	this._targetRotationX = Math.max(Math.min(this._maxRotationX, this._targetRotationX), this._minRotationX);
};


feng.controllers.controls.BrowseControls.prototype.onObjectSelected = function ( e ) {

	console.log('Object selected!');

	var manipulateCameraSettings = feng.controllers.controls.ManipulateControls.getCameraSettings( this.getPosition(), this.getRotation(), this.getFov() );
	
	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.views.View3D.Mode.MANIPULATE,
		toPosition: manipulateCameraSettings.position,
		toRotation: manipulateCameraSettings.rotation,
		toFov: manipulateCameraSettings.fov,
		lookAt: e.object.position
	});
};



feng.controllers.controls.BrowseControls.prototype.onMediatorEvent = function(e){

	switch(e.type) {

		case feng.events.EventType.UPDATE:

		if(e.target instanceof feng.views.sections.controls.Compass) {
			var radians = goog.math.toRadians( e.angle );
			this._yawObject.rotation.y = radians;
			this._targetRotationY = radians;
		}

		break;

		default:
		break;
	}
};