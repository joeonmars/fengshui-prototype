goog.provide('feng.controllers.controls.ManipulateControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.utils.ThreeUtils');


/**
 * @constructor
 * a combination of trackball controls and transform controls
 * WIP
 */
feng.controllers.controls.ManipulateControls = function(camera, domElement, view3d){

  goog.base(this, camera, domElement, view3d);

};
goog.inherits(feng.controllers.controls.ManipulateControls, feng.controllers.controls.Controls);


feng.controllers.controls.ManipulateControls.prototype.update = function () {

	goog.base(this, 'update');

	var elapsed = this._clock.getElapsedTime();

	//this.getObject().lookAt( this._scene.position );
	//this.getObject().camera.position.x = Math.floor(Math.cos( timer ) * 200);
};


feng.controllers.controls.ManipulateControls.prototype.onClick = function ( e ) {

	goog.base(this, 'onClick', e);

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.views.View3D.Mode.BROWSE
	});
};


feng.controllers.controls.ManipulateControls.prototype.onMouseDown = function ( e ) {

	goog.base(this, 'onMouseDown', e);

};


feng.controllers.controls.ManipulateControls.prototype.onMouseMove = function ( e ) {

	goog.base(this, 'onMouseMove', e);

};


feng.controllers.controls.ManipulateControls.getCameraSettings = function( cameraPosition, objectPosition, fov ) {

	var maxDistance = Math.max(Math.abs(cameraPosition.x), Math.abs(cameraPosition.y), Math.abs(cameraPosition.z));

	var position = new THREE.Vector3( cameraPosition.x/Math.abs(cameraPosition.x) * maxDistance, cameraPosition.y/Math.abs(cameraPosition.y) * maxDistance, cameraPosition.z/Math.abs(cameraPosition.z) * maxDistance);
	var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
	var up = new THREE.Vector3(0, 1, 0);
	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(position, objectPosition, up);
	rotation.setFromQuaternion( quaternion );

	var settings = {
		position: position,
		rotation: rotation,
		fov: 60
	};

	return settings;
};