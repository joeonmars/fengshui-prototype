goog.provide('feng.controllers.controls.BackgroundControls');

goog.require('feng.controllers.controls.Controls');
goog.require('feng.utils.ThreeUtils');

/**
 * @constructor
 * a mod of PointerLockControls...
 */
feng.controllers.controls.BackgroundControls = function(camera, view3d, domElement, uiElement){

  goog.base(this, camera, view3d, domElement);

};
goog.inherits(feng.controllers.controls.BackgroundControls, feng.controllers.controls.Controls);


feng.controllers.controls.BackgroundControls.prototype.setCamera = function( position, rotation, fov ) {
	
	// calculate back up position
	var forward = new THREE.Vector3( 0, 0, -1 );
  forward.applyQuaternion( control.getObject().quaternion ).setY(0).normalize();

  var backupPosition = (new THREE.Vector3()).addVectors( position, forward.multiplyScalar(-50) );

  // calculate fov
  var wideFov = fov + 20;

	// set camera
	this.setPosition( backupPosition );
	this.setRotation( rotation );
	this.setFov( wideFov );
};