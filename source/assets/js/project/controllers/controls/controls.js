goog.provide('feng.controllers.controls.Controls');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');


/**
 * @constructor
 * A custom camera control, wrapped the camera with pitch and yaw object
 */
feng.controllers.controls.Controls = function(camera, view3d, domElement){
	
  goog.base(this);

  this._camera = camera;
  this._view3d = view3d;
  this._scene = this._view3d.scene;

  this._eventHandler = new goog.events.EventHandler(this);

  this.isEnabled = false;
  this.isPaused = false;

  this._pauseProps = {
  	fov: 0,
  	oFov: 0,
  	z: 0,
  	oZ: 0
  };

  this._rotation = new THREE.Euler(0, 0, 0, 'YXZ'); //YXZ is to overcome gimbal lock

  this._originalPosition = this._camera.position.clone();
  this._originalRotation = this._camera.rotation.clone();

	this._pitchObject = new THREE.Object3D();
	this._pitchObject.add( this._camera );

	this._yawObject = new THREE.Object3D();
	this._yawObject.add( this._pitchObject );

	this._mainEl = goog.dom.getElement('main');
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

	this._rotation.x = this.getPitch();
	this._rotation.y = this.getYaw();
	return this._rotation;
};


feng.controllers.controls.Controls.prototype.getPitch = function () {

	return this._pitchObject.rotation.x;
};


feng.controllers.controls.Controls.prototype.getYaw = function () {

	return this._yawObject.rotation.y;
};


feng.controllers.controls.Controls.prototype.getFov = function () {

	return this._camera.fov;
};


feng.controllers.controls.Controls.prototype.getForwardVector = function (dontForceZeroY) {

	var forward = new THREE.Vector3(0, 0, -1);
	forward.applyEuler(this._pitchObject.rotation, this._pitchObject.rotation.order);
	forward.applyEuler(this._yawObject.rotation, this._yawObject.rotation.order);
	forward.normalize();

	if(!dontForceZeroY) {
		forward.setY(0);
	}

	return forward;
};


feng.controllers.controls.Controls.prototype.getTarget = function () {

	var raycaster = new THREE.Raycaster(this.getPosition(), this.getForwardVector(true));
	var intersects = raycaster.intersectObjects( this._view3d.scene.children );
	var intersectPosition = intersects.length > 0 ? intersects[0].point : this._view3d.scene.position;

	return intersectPosition;
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
		this._rotation.x = rotation.x;
		this._rotation.y = rotation.y;
	}else {
		this._rotation.x = x;
		this._rotation.y = y;
	}

	this._pitchObject.rotation.x = this._rotation.x;
	this._yawObject.rotation.y = this._rotation.y;
};


feng.controllers.controls.Controls.prototype.setPitch = function (pitch) {

	this._pitchObject.rotation.x = pitch;
};


feng.controllers.controls.Controls.prototype.setYaw = function (yaw) {

	this._yawObject.rotation.y = yaw;
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
	
	this._yawObject.position.copy( this._originalPosition );
	this._yawObject.rotation.copy( this._originalRotation );
};


feng.controllers.controls.Controls.prototype.activate = function() {

	this._eventHandler.listen(this._domElement, 'click', this.onClick, false, this);
	this._eventHandler.listen(this._domElement, 'mousedown', this.onMouseDown, false, this);

	goog.fx.anim.registerAnimation(this);

	goog.dom.classes.add(this._view3d.domElement, 'grab');
};


feng.controllers.controls.Controls.prototype.deactivate = function() {

	this._eventHandler.removeAll();

	goog.fx.anim.unregisterAnimation(this);

	goog.dom.classes.remove(this._view3d.domElement, 'grab');
	goog.dom.classes.remove(this._mainEl, 'grabbing');
};


feng.controllers.controls.Controls.prototype.enable = function( enable ) {

	if(this.isEnabled === enable) return;
	
	this.isEnabled = enable;

	if(this.isEnabled) {

		this.activate();

	}else {

		this.deactivate();
	}

	return this.isEnabled;
};


feng.controllers.controls.Controls.prototype.pause = function( pause ) {

	if(this.isPaused === pause || !this.isEnabled) return;
	
	this.isPaused = pause;

	if(this.isPaused) {

		this._pauseProps.oFov = this._pauseProps.fov = this.getFov();
		this._pauseProps.oZ = this._pauseProps.z = 0;

		TweenMax.to( this._pauseProps, .8, {
			fov: this._pauseProps.oFov + 8,
			z: 5,
			'ease': Quad.easeInOut,
			'onUpdate': this.onPauseAnimate,
			'onUpdateScope': this,
			'onStart': this.onPauseStart,
			'onStartScope': this
		});

	}else {

		TweenMax.to( this._pauseProps, .8, {
			fov: this._pauseProps.oFov,
			z: this._pauseProps.oZ,
			'ease': Quad.easeInOut,
			'onUpdate': this.onPauseAnimate,
			'onUpdateScope': this,
			'onComplete': this.onPauseResumed,
			'onCompleteScope': this
		});
	}

	return this.isPaused;
};


feng.controllers.controls.Controls.prototype.update = function() {

};


feng.controllers.controls.Controls.prototype.getDirection = function() {

	// assumes the camera itself is not rotated
	var direction = new THREE.Vector3( 0, 0, -1 );
	var rotation = new THREE.Euler( 0, 0, 0, 'YXZ' );

	var v = this._yawObject.position.clone();
	rotation.set( this._pitchObject.rotation.x, this._yawObject.rotation.y, 0 );
	v.copy( direction ).applyEuler( rotation );

	return v;
};


feng.controllers.controls.Controls.prototype.onPauseStart = function() {

	this.deactivate();
};


feng.controllers.controls.Controls.prototype.onPauseAnimate = function() {

	var camera = this.getCamera();

	camera.position.z = this._pauseProps.z;

	this.setFov( this._pauseProps.fov );
};


feng.controllers.controls.Controls.prototype.onPauseResumed = function() {

	this.activate();
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

	goog.dom.classes.remove(this._mainEl, 'grabbing');
};


feng.controllers.controls.Controls.prototype.onMouseMove = function ( e ) {

	goog.dom.classes.add(this._mainEl, 'grabbing');
};


feng.controllers.controls.Controls.Default = {
	STANCE_HEIGHT: (170 - 10) / 2, // eyes height (10cm) of 170cm..
	ARM_HEIGHT: (170 - 10 - 30) / 2,
	FOV: 40
};