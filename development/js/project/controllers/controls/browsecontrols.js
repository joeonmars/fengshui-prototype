goog.provide('fengshui.controllers.controls.BrowseControls');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('fengshui.utils.Randomizer');
goog.require('fengshui.utils.MultiLinearInterpolator');

/**
 * @constructor
 * a mod of PointerLockControls...
 */
fengshui.controllers.controls.BrowseControls = function(camera, clickableObjects, domElement){
  goog.base(this);

  this.enabled = false;

	this.camera = camera;
	this.camera.rotation.set( 0, 0, 0 );

	this._clickableObjects = clickableObjects;

	this._pitchObject = new THREE.Object3D();
	this._pitchObject.add( this.camera );

	this._yawObject = new THREE.Object3D();
	this._yawObject.add( this._pitchObject );

	this._domElement = domElement;

	this._hasDragged = false;

	this._lastMouseX = 0;
	this._lastMouseY = 0;
	this._targetRotationX = 0;
	this._targetRotationY = 0;

	this._projector = new THREE.Projector();

	var randomXNumbers = fengshui.utils.Randomizer.getRandomNumbers(6, 10, true);
	goog.array.forEach(randomXNumbers, function(number, index) {
		if(index % 2 === 0) randomXNumbers[index] *= -1;
	});

	var randomYNumbers = fengshui.utils.Randomizer.getRandomNumbers(1, 10, true);
	goog.array.forEach(randomYNumbers, function(number, index) {
		if(index % 2 === 0) randomYNumbers[index] *= -1;
	});

	this._randomXInterpolator = new fengshui.utils.MultiLinearInterpolator(randomXNumbers, 8000);
	this._randomYInterpolator = new fengshui.utils.MultiLinearInterpolator(randomYNumbers, 10000);

	this._eventHandler = new goog.events.EventHandler(this);
	this._eventHandler.listen(this._domElement, 'click', this.onClick, false, this);
	this._eventHandler.listen(this._domElement, 'mousedown', this.onMouseDown, false, this);
};
goog.inherits(fengshui.controllers.controls.BrowseControls, goog.events.EventTarget);


fengshui.controllers.controls.BrowseControls.prototype.reset = function () {

	this._yawObject.rotation.y = 0;
	this._pitchObject.rotation.x = 0;
};


fengshui.controllers.controls.BrowseControls.prototype.getObject = function () {

	return this._yawObject;
};


fengshui.controllers.controls.BrowseControls.prototype.getDirection = function() {

	// assumes the camera itself is not rotated
	var direction = new THREE.Vector3( 0, 0, -1 );
	var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

	var v = this._yawObject.position.clone();
	rotation.set( this._pitchObject.rotation.x, this._yawObject.rotation.y, 0 );
	v.copy( direction ).applyEuler( rotation );

	return v;
};


fengshui.controllers.controls.BrowseControls.prototype.update = function ( elapsed ) {

	if ( !this.enabled ) return;

	var PI_2 = Math.PI / 2;

	this._yawObject.rotation.y += (this._targetRotationY - this._yawObject.rotation.y) * .1;
	this._pitchObject.rotation.x += (this._targetRotationX - this._pitchObject.rotation.x) * .1;
	this._pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, this._pitchObject.rotation.x ) );

	// random rotating motion
	this._randomXInterpolator.update( elapsed * 1000 );
	this._randomYInterpolator.update( elapsed * 1000 );

	var cameraRotateX = this._randomXInterpolator.getValue() * .04;
	var cameraRotateY = this._randomYInterpolator.getValue() * .04;
	this.camera.rotation.x = cameraRotateX;
	this.camera.rotation.y = cameraRotateY;
};


fengshui.controllers.controls.BrowseControls.prototype.onClick = function ( e ) {

	if ( !this.enabled || this._hasDragged ) return;

	var viewSize = goog.style.getSize(this._domElement);
	var position = this.getObject().position;

	var vector = new THREE.Vector3( ( e.clientX / viewSize.width ) * 2 - 1, - ( e.clientY / viewSize.height ) * 2 + 1, 0.5 );
	this._projector.unprojectVector( vector, this.camera );

	var raycaster = new THREE.Raycaster( position, vector.sub( position ).normalize() );

	var intersects = raycaster.intersectObjects( this._clickableObjects );

	if ( intersects.length > 0 ) {

		console.log('clicked on ' + intersects[0].object.name);

		this.dispatchEvent({
			type: fengshui.events.EventType.CHANGE,
			mode: fengshui.views.View3D.Mode.PATH,
			position: intersects[0].point
		});
	}
};


fengshui.controllers.controls.BrowseControls.prototype.onMouseDown = function ( e ) {

	if ( !this.enabled ) return;

	this._hasDragged = false;

	this._lastMouseX = e.clientX;
	this._lastMouseY = e.clientY;

	this._eventHandler.listen(this._domElement, 'mousemove', this.onMouseMove, false, this);
	this._eventHandler.listen(document, 'mouseup', this.onMouseUp, false, this);
};


fengshui.controllers.controls.BrowseControls.prototype.onMouseUp = function ( e ) {

	this._eventHandler.unlisten(this._domElement, 'mousemove', this.onMouseMove, false, this);
	this._eventHandler.unlisten(document, 'mouseup', this.onMouseUp, false, this);
};


fengshui.controllers.controls.BrowseControls.prototype.onMouseMove = function ( e ) {

	if ( !this.enabled ) return;

	this._hasDragged = true;

	var movementX = e.clientX - this._lastMouseX;
	var movementY = e.clientY - this._lastMouseY;

	this._lastMouseX = e.clientX;
	this._lastMouseY = e.clientY;

	this._targetRotationY = this._yawObject.rotation.y + movementX * 0.004;
	this._targetRotationX = this._pitchObject.rotation.x + movementY * 0.004;
};