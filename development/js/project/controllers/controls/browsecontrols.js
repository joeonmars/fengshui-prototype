goog.provide('fengshui.controllers.controls.BrowseControls');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('goog.testing.PseudoRandom');

/**
 * @constructor
 * a mod of PointerLockControls...
 */
fengshui.controllers.controls.BrowseControls = function(camera, domElement){
  goog.base(this);

  this.enabled = false;

	this.camera = camera;
	this.camera.rotation.set( 0, 0, 0 );

	this._pitchObject = new THREE.Object3D();
	this._pitchObject.add( this.camera );

	this._yawObject = new THREE.Object3D();
	this._yawObject.add( this._pitchObject );

	this._domElement = domElement || document;

	this._moveForward = false;
	this._moveBackward = false;
	this._moveLeft = false;
	this._moveRight = false;

	this._velocity = new THREE.Vector3();

	this._lastMouseX = 0;
	this._lastMouseY = 0;
	this._targetRotationX = 0;
	this._targetRotationY = 0;

	this._random = new goog.testing.PseudoRandom(1);

	this._eventHandler = new goog.events.EventHandler(this);
	this._eventHandler.listen(this._domElement, 'mousedown', this.onMouseDown, false, this);
	this._eventHandler.listen(document, 'keydown', this.onKeyDown, false, this);
	this._eventHandler.listen(document, 'keyup', this.onKeyUp, false, this);
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


fengshui.controllers.controls.BrowseControls.prototype.update = function ( delta ) {

	if ( !this.enabled ) return;

	delta *= 0.1;

	var PI_2 = Math.PI / 2;

	this._velocity.x += ( - this._velocity.x ) * 0.08 * delta;
	this._velocity.z += ( - this._velocity.z ) * 0.08 * delta;

	if ( this._moveForward ) this._velocity.z -= 0.12 * delta;
	if ( this._moveBackward ) this._velocity.z += 0.12 * delta;

	if ( this._moveLeft ) this._velocity.x -= 0.12 * delta;
	if ( this._moveRight ) this._velocity.x += 0.12 * delta;

	this._yawObject.translateX( this._velocity.x );
	this._yawObject.translateY( this._velocity.y ); 
	this._yawObject.translateZ( this._velocity.z );

	this._yawObject.rotation.y += (this._targetRotationY - this._yawObject.rotation.y) * .1;
	this._pitchObject.rotation.x += (this._targetRotationX - this._pitchObject.rotation.x) * .1;
	this._pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, this._pitchObject.rotation.x ) );
};


fengshui.controllers.controls.BrowseControls.prototype.onMouseDown = function ( e ) {

	if ( !this.enabled ) return;

	this._lastMouseX = e.clientX;
	this._lastMouseY = e.clientY;

	this._eventHandler.listen(this._domElement, 'mousemove', this.onMouseMove, false, this);
	this._eventHandler.listen(this._domElement, 'mouseup', this.onMouseUp, false, this);
};


fengshui.controllers.controls.BrowseControls.prototype.onMouseUp = function ( e ) {

	this._eventHandler.unlisten(this._domElement, 'mousemove', this.onMouseMove, false, this);
	this._eventHandler.unlisten(this._domElement, 'mouseup', this.onMouseUp, false, this);
};


fengshui.controllers.controls.BrowseControls.prototype.onMouseMove = function ( e ) {

	if ( !this.enabled ) return;

	var movementX = e.clientX - this._lastMouseX;
	var movementY = e.clientY - this._lastMouseY;

	this._lastMouseX = e.clientX;
	this._lastMouseY = e.clientY;

	this._targetRotationY = this._yawObject.rotation.y + movementX * 0.01;
	this._targetRotationX = this._pitchObject.rotation.x + movementY * 0.01;
};


fengshui.controllers.controls.BrowseControls.prototype.onKeyDown = function ( e ) {

	switch ( e.keyCode ) {

		case 38: // up
		case 87: // w
			this._moveForward = true;
			break;

		case 37: // left
		case 65: // a
			this._moveLeft = true; break;

		case 40: // down
		case 83: // s
			this._moveBackward = true;
			break;

		case 39: // right
		case 68: // d
			this._moveRight = true;
			break;
	}
};


fengshui.controllers.controls.BrowseControls.prototype.onKeyUp = function (e) {

	switch( e.keyCode ) {

		case 38: // up
		case 87: // w
			this._moveForward = false;
			break;

		case 37: // left
		case 65: // a
			this._moveLeft = false;
			break;

		case 40: // down
		case 83: // s
			this._moveBackward = false;
			break;

		case 39: // right
		case 68: // d
			this._moveRight = false;
			break;
	}
};