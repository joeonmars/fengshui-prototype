goog.provide('feng.controllers.controls.ManipulateControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');


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


feng.controllers.controls.ManipulateControls.getCameraSettings = function( position, rotation, fov ) {

	var maxDistance = Math.max(Math.abs(position.x), Math.abs(position.y), Math.abs(position.z));

	var settings = {
		position: new THREE.Vector3( position.x/Math.abs(position.x) * maxDistance, position.y/Math.abs(position.y) * maxDistance, position.z/Math.abs(position.z) * maxDistance),
		rotation: new THREE.Euler(goog.math.toRadians(-45), rotation.y, 0),
		fov: 60
	};

	return settings;
};