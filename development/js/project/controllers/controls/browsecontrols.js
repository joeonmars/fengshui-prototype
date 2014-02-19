goog.provide('fengshui.controllers.controls.BrowseControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('fengshui.controllers.controls.Controls');
goog.require('fengshui.controllers.controls.ObjectSelector');
goog.require('fengshui.utils.ThreeUtils');
goog.require('fengshui.utils.Randomizer');
goog.require('fengshui.utils.MultiLinearInterpolator');

/**
 * @constructor
 * a mod of PointerLockControls...
 */
fengshui.controllers.controls.BrowseControls = function(camera, domElement, view3d){

  goog.base(this, camera, domElement, view3d);

	this._clickableObjects = goog.array.filter(this._scene.children, function(object) {
		return (object instanceof THREE.Mesh);
	});

	this._hasDragged = false;

	this._objectSelector = new fengshui.controllers.controls.ObjectSelector( this._clickableObjects, this._camera, this._view3d.getRenderElement() );

	this._lastMouseX = 0;
	this._lastMouseY = 0;
	this._targetRotationX = 0;
	this._targetRotationY = 0;

	this._maxRotationX = goog.math.toRadians(45);
	this._minRotationX = goog.math.toRadians(-45);

	var randomXNumbers = fengshui.utils.Randomizer.getRandomNumbers(6, 10);
	randomXNumbers.unshift(0);
	randomXNumbers.push(0);
	goog.array.forEach(randomXNumbers, function(number, index) {
		if(index % 2 === 0) randomXNumbers[index] *= -1;
	});

	var randomYNumbers = fengshui.utils.Randomizer.getRandomNumbers(1, 10);
	randomYNumbers.unshift(0);
	randomYNumbers.push(0);
	goog.array.forEach(randomYNumbers, function(number, index) {
		if(index % 2 === 0) randomYNumbers[index] *= -1;
	});

	this._randomXInterpolator = new fengshui.utils.MultiLinearInterpolator(randomXNumbers, 8000);
	this._randomYInterpolator = new fengshui.utils.MultiLinearInterpolator(randomYNumbers, 10000);
};
goog.inherits(fengshui.controllers.controls.BrowseControls, fengshui.controllers.controls.Controls);


fengshui.controllers.controls.BrowseControls.prototype.getRotation = function () {

	var rx = this._targetRotationX + this._camera.rotation.x;
	var ry = this._targetRotationY + this._camera.rotation.y;
	var rz = 0;
	var rotation = new THREE.Euler( rx, ry, rz, 'XYZ' );
	return rotation;
};


fengshui.controllers.controls.BrowseControls.prototype.setRotation = function (x, y, z) {

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


fengshui.controllers.controls.BrowseControls.prototype.enable = function( enable ) {

	goog.base(this, 'enable', enable);

	if(!this._isEnabled) {

		// reset clock, thus set camera natural movement's playhead to 0
		this._clock.startTime = 0;
		this._clock.oldTime = 0;
		this._clock.elapsedTime = 0;

	}else  {

		this._eventHandler.listen(this._objectSelector, fengshui.events.EventType.CHANGE, this.onObjectSelected, false, this);
	}

	this._objectSelector.enable( this._isEnabled );
};


fengshui.controllers.controls.BrowseControls.prototype.update = function () {

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
};


fengshui.controllers.controls.BrowseControls.prototype.onClick = function ( e ) {

	goog.base(this, 'onClick', e);

	if ( this._hasDragged ) return;

	var intersects = fengshui.utils.ThreeUtils.getObjectsBy2DPosition( e.clientX, e.clientY, this._clickableObjects, this._camera, this._domElement );

	if ( intersects.length > 0 ) {

		console.log('clicked on ' + intersects[0].object.name);

		this.dispatchEvent({
			type: fengshui.events.EventType.CHANGE,
			mode: fengshui.views.View3D.Mode.PATH,
			toPosition: intersects[0].point,
			toRotation: this.getRotation(),
			toFov: this.getFov()
		});
	}
};


fengshui.controllers.controls.BrowseControls.prototype.onMouseDown = function ( e ) {

	goog.base(this, 'onMouseDown', e);

	this._hasDragged = false;

	this._lastMouseX = e.clientX;
	this._lastMouseY = e.clientY;
};


fengshui.controllers.controls.BrowseControls.prototype.onMouseMove = function ( e ) {

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


fengshui.controllers.controls.BrowseControls.prototype.onObjectSelected = function ( e ) {

	console.log('Object selected!');

	var manipulateCameraSettings = fengshui.controllers.controls.ManipulateControls.getCameraSettings( this.getPosition(), this.getRotation(), this.getFov() );
	
	this.dispatchEvent({
		type: fengshui.events.EventType.CHANGE,
		mode: fengshui.views.View3D.Mode.MANIPULATE,
		toPosition: manipulateCameraSettings.position,
		toRotation: manipulateCameraSettings.rotation,
		toFov: manipulateCameraSettings.fov,
		lookAt: e.object.position
	});
};