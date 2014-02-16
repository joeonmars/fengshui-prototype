goog.provide('fengshui.controllers.controls.Controls');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');

/**
 * @constructor
 * A custom camera control, wrapped the camera with pitch and yaw object
 */
fengshui.controllers.controls.Controls = function(camera, domElement, view3d){
  goog.base(this);

  this._camera = camera;
  this._view3d = view3d;
  this._scene = this._view3d.scene;

  this._isEnabled = false;
  this._clock = new THREE.Clock(false);

  this._originalPosition = this._camera.position.clone();
  this._originalRotation = this._camera.rotation.clone();

	this._pitchObject = new THREE.Object3D();
	this._pitchObject.add( this._camera );

	this._yawObject = new THREE.Object3D();
	this._yawObject.add( this._pitchObject );

	this._domElement = domElement;

	this._eventHandler = new goog.events.EventHandler(this);

	this._scene.add( this.getObject() );

	this.reset();
};
goog.inherits(fengshui.controllers.controls.Controls, goog.events.EventTarget);


fengshui.controllers.controls.Controls.prototype.getObject = function () {

	return this._yawObject;
};


fengshui.controllers.controls.Controls.prototype.getCamera = function () {

	return this._camera;
};


fengshui.controllers.controls.Controls.prototype.getPosition = function () {

	return this.getObject().position;
};


fengshui.controllers.controls.Controls.prototype.getRotation = function () {

	var rotation = new THREE.Euler( this._pitchObject.rotation.x, this._yawObject.rotation.y, 0, 'XYZ' );
	return rotation;
};


fengshui.controllers.controls.Controls.prototype.getPov = function () {

	return this._camera.pov;
};


fengshui.controllers.controls.Controls.prototype.setPosition = function (x, y, z) {

	if(x instanceof THREE.Vector3) {
		var position = x;
		this._yawObject.position.copy( position );
	}else {
		this._yawObject.position.set(x, y, z);
	}
};


fengshui.controllers.controls.Controls.prototype.setRotation = function (x, y) {

	if(x instanceof THREE.Euler) {
		var rotation = x;
		this._pitchObject.rotation.x = rotation.x;
		this._yawObject.rotation.y = rotation.y;
	}else {
		this._pitchObject.rotation.x = x;
		this._yawObject.rotation.y = y;
	}
};


fengshui.controllers.controls.Controls.prototype.setPov = function (pov) {

	this._camera.pov = pov;
	this._camera.updateProjectionMatrix();
};



fengshui.controllers.controls.Controls.prototype.reset = function () {

	this._camera.position.set( 0, 0, 0 );
	this._camera.rotation.set( 0, 0, 0 );

	this._pitchObject.position.set(0, 0, 0);
	this._pitchObject.rotation.set(0, 0, 0);
	
	this._yawObject.position = this._originalPosition;
	this._yawObject.rotation = this._originalRotation;
};


fengshui.controllers.controls.Controls.prototype.enable = function( enable ) {

	if(this._isEnabled === enable) return;
	
	this._isEnabled = enable;

	if(this._isEnabled) {
		this._eventHandler.listen(this._domElement, 'click', this.onClick, false, this);
		this._eventHandler.listen(this._domElement, 'mousedown', this.onMouseDown, false, this);

		this._clock.start();
		goog.fx.anim.registerAnimation(this);
	}else {
		this._eventHandler.removeAll();

		this._clock.stop();
		goog.fx.anim.unregisterAnimation(this);
	}
};


fengshui.controllers.controls.Controls.prototype.update = function() {

};


fengshui.controllers.controls.Controls.prototype.getDirection = function() {

	// assumes the camera itself is not rotated
	var direction = new THREE.Vector3( 0, 0, -1 );
	var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

	var v = this._yawObject.position.clone();
	rotation.set( this._pitchObject.rotation.x, this._yawObject.rotation.y, 0 );
	v.copy( direction ).applyEuler( rotation );

	return v;
};


fengshui.controllers.controls.Controls.prototype.onAnimationFrame = function ( now ) {

	this.update();
};


fengshui.controllers.controls.Controls.prototype.onClick = function ( e ) {

};


fengshui.controllers.controls.Controls.prototype.onMouseDown = function ( e ) {

	this._eventHandler.listen(this._domElement, 'mousemove', this.onMouseMove, false, this);
	this._eventHandler.listen(document, 'mouseup', this.onMouseUp, false, this);
};


fengshui.controllers.controls.Controls.prototype.onMouseUp = function ( e ) {

	this._eventHandler.unlisten(this._domElement, 'mousemove', this.onMouseMove, false, this);
	this._eventHandler.unlisten(document, 'mouseup', this.onMouseUp, false, this);
};


fengshui.controllers.controls.Controls.prototype.onMouseMove = function ( e ) {

};