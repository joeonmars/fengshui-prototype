goog.provide('fengshui.controllers.controls.Controls');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');

/**
 * @constructor
 * A custom camera control, wrapped the camera with pitch and yaw object
 */
fengshui.controllers.controls.Controls = function(camera, domElement){
  goog.base(this);

  this._camera = camera;

  this._isEnabled = false;
  this._originalPosition = this._camera.position.clone();
  this._originalRotation = this._camera.rotation.clone();

	this._pitchObject = new THREE.Object3D();
	this._pitchObject.add( this._camera );

	this._yawObject = new THREE.Object3D();
	this._yawObject.add( this._pitchObject );

	this._domElement = domElement;

	this._eventHandler = new goog.events.EventHandler(this);

	this.reset();
};
goog.inherits(fengshui.controllers.controls.Controls, goog.events.EventTarget);


fengshui.controllers.controls.Controls.prototype.reset = function () {

	this._camera.position.set( 0, 0, 0 );
	this._camera.rotation.set( 0, 0, 0 );

	this._pitchObject.position.set(0, 0, 0);
	this._pitchObject.rotation.set(0, 0, 0);
	
	this._yawObject.position = this._originalPosition;
	this._yawObject.rotation = this._originalRotation;
};


fengshui.controllers.controls.Controls.prototype.getObject = function () {

	return this._yawObject;
};


fengshui.controllers.controls.Controls.prototype.getCamera = function () {

	return this._camera;
};


fengshui.controllers.controls.Controls.prototype.enable = function( enable ) {

	if(this._isEnabled === enable) return;
	
	this._isEnabled = enable;

	if(this._isEnabled) {
		this._eventHandler.listen(this._domElement, 'click', this.onClick, false, this);
		this._eventHandler.listen(this._domElement, 'mousedown', this.onMouseDown, false, this);
	}else {
		this._eventHandler.removeAll();
	}
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