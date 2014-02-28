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

  this._activeObject = null;
  this._eventMediator = this._view3d.eventMediator;
};
goog.inherits(feng.controllers.controls.ManipulateControls, feng.controllers.controls.Controls);


feng.controllers.controls.ManipulateControls.prototype.setCamera = function( cameraPosition, object, fov ) {

	var maxDistance = Math.max(Math.abs(cameraPosition.x), Math.abs(cameraPosition.y), Math.abs(cameraPosition.z));

	var position = new THREE.Vector3( cameraPosition.x/Math.abs(cameraPosition.x), cameraPosition.y/Math.abs(cameraPosition.y), cameraPosition.z/Math.abs(cameraPosition.z)).multiplyScalar( maxDistance );

	var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
	var up = new THREE.Vector3(0, 1, 0);
	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(position, object.position, up);
	rotation.setFromQuaternion( quaternion );

	this._activeObject = object;

	this.setPosition( position );
	this.setRotation( rotation );
	this.setFov( 60 );
};


feng.controllers.controls.ManipulateControls.prototype.enable = function( enable ) {

	goog.base(this, 'enable', enable);

	if(this._isEnabled) {

		this._eventHandler.listen(this._eventMediator.getEventTarget(), feng.events.EventType.UPDATE, this.onMediatorEvent, false, this);

		this._eventMediator.listen(this, feng.events.EventType.UPDATE);

	}else  {

		this._eventMediator.unlisten(this, feng.events.EventType.UPDATE);

	}
};


feng.controllers.controls.ManipulateControls.prototype.update = function () {

	goog.base(this, 'update');

	var elapsed = this._clock.getElapsedTime();
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


feng.controllers.controls.ManipulateControls.prototype.onMediatorEvent = function(e){

	switch(e.type) {

		case feng.events.EventType.UPDATE:

		if(e.target instanceof feng.views.sections.controls.Compass) {
			var radians = THREE.Math.degToRad( e.angle );

			var radius = this.getPosition().y;
			var posX = radius * Math.sin( radians );
			var posZ = radius * Math.cos( radians );
			var posY = radius;

			this.setPosition( posX, posY, posZ );

			// look at
			var up = new THREE.Vector3(0, 1, 0);
			var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
			var objectPosition = new THREE.Vector3(0, 0, 0);
			var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(this.getPosition(), this._activeObject.position, up);
			rotation.setFromQuaternion( quaternion );

			this.setRotation( rotation );
		}

		break;
	}
};