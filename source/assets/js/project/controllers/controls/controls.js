goog.provide('feng.controllers.controls.Controls');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');


/**
 * @constructor
 * A custom camera control, wrapped the camera with pitch and yaw object
 */
feng.controllers.controls.Controls = function(camera, domElement, view3d){
  goog.base(this);

  this._camera = camera;
  this._view3d = view3d;
  this._scene = this._view3d.scene;

  this._eventHandler = new goog.events.EventHandler(this);

  this._interactionEventResolver = this._view3d.interactionEventResolver;

  this._isEnabled = false;
  this._clock = new THREE.Clock(false);

  this._originalPosition = this._camera.position.clone();
  this._originalRotation = this._camera.rotation.clone();

	this._pitchObject = new THREE.Object3D();
	this._pitchObject.add( this._camera );

	this._yawObject = new THREE.Object3D();
	this._yawObject.add( this._pitchObject );

	this._domElement = domElement;

	this._scene.add( this.getObject() );

	this.reset();
};
goog.inherits(feng.controllers.controls.Controls, goog.events.EventTarget);


feng.controllers.controls.Controls.prototype.getObject = function () {

	return this._yawObject;
};


feng.controllers.controls.Controls.prototype.getCamera = function () {

	return this._camera;
};


feng.controllers.controls.Controls.prototype.getPosition = function () {

	return this.getObject().position;
};


feng.controllers.controls.Controls.prototype.getRotation = function () {

	var rotation = new THREE.Euler( this._pitchObject.rotation.x, this._yawObject.rotation.y, 0, 'XYZ' );
	return rotation;
};


feng.controllers.controls.Controls.prototype.getFov = function () {

	return this._camera.fov;
};


feng.controllers.controls.Controls.prototype.setPosition = function (x, y, z) {

	if(x instanceof THREE.Vector3) {
		var position = x;
		this._yawObject.position.copy( position );
	}else {
		this._yawObject.position.set(x, y, z);
	}
};


feng.controllers.controls.Controls.prototype.setRotation = function (x, y) {

	if(x instanceof THREE.Euler) {
		var rotation = x;
		this._pitchObject.rotation.x = rotation.x;
		this._yawObject.rotation.y = rotation.y;
	}else {
		this._pitchObject.rotation.x = x;
		this._yawObject.rotation.y = y;
	}
};


feng.controllers.controls.Controls.prototype.setFov = function (fov) {

	this._camera.fov = fov;
	this._camera.updateProjectionMatrix();
};


feng.controllers.controls.Controls.prototype.reset = function () {

	this._camera.position.set( 0, 0, 0 );
	this._camera.rotation.set( 0, 0, 0 );

	this._pitchObject.position.set(0, 0, 0);
	this._pitchObject.rotation.set(0, 0, 0);
	
	this._yawObject.position = this._originalPosition;
	this._yawObject.rotation = this._originalRotation;
};


feng.controllers.controls.Controls.prototype.enable = function( enable ) {

	if(this._isEnabled === enable) return;
	
	this._isEnabled = enable;

	if(this._isEnabled) {

		this._eventHandler.listen(this._domElement, 'click', this.onClick, false, this);
		this._eventHandler.listen(this._domElement, 'mousedown', this.onMouseDown, false, this);

		this._eventHandler.listen(this._interactionEventResolver.getEventTarget(), feng.events.EventType.CHANGE, this.onChange, false, this);

		this._clock.start();
		goog.fx.anim.registerAnimation(this);

	}else {

		this._eventHandler.removeAll();

		this._clock.stop();
		goog.fx.anim.unregisterAnimation(this);
		
	}
};


feng.controllers.controls.Controls.prototype.update = function() {

};


feng.controllers.controls.Controls.prototype.getDirection = function() {

	// assumes the camera itself is not rotated
	var direction = new THREE.Vector3( 0, 0, -1 );
	var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

	var v = this._yawObject.position.clone();
	rotation.set( this._pitchObject.rotation.x, this._yawObject.rotation.y, 0 );
	v.copy( direction ).applyEuler( rotation );

	return v;
};


feng.controllers.controls.Controls.prototype.onAnimationFrame = function ( now ) {

	this.update();
};


feng.controllers.controls.Controls.prototype.onClick = function ( e ) {

};


feng.controllers.controls.Controls.prototype.onMouseDown = function ( e ) {

	this._eventHandler.listen(this._domElement, 'mousemove', this.onMouseMove, false, this);
	this._eventHandler.listen(document, 'mouseup', this.onMouseUp, false, this);
};


feng.controllers.controls.Controls.prototype.onMouseUp = function ( e ) {

	this._eventHandler.unlisten(this._domElement, 'mousemove', this.onMouseMove, false, this);
	this._eventHandler.unlisten(document, 'mouseup', this.onMouseUp, false, this);
};


feng.controllers.controls.Controls.prototype.onMouseMove = function ( e ) {

};


feng.controllers.controls.Controls.prototype.onChange = function(e){

	if(e.target instanceof feng.views.sections.controls.Compass) {
		var radians = goog.math.toRadians( e.angle );
		this.setRotation(this.getRotation().x, radians);
	}
};