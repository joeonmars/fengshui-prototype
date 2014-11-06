goog.provide('feng.controllers.controls.ExitControls');

goog.require('feng.controllers.controls.Controls');
goog.require('feng.utils.ThreeUtils');


/**
 * @constructor
 * to move in front of and face the gateway, then load the next view
 */
feng.controllers.controls.ExitControls = function(camera, view3d, domElement){

  goog.base(this, camera, view3d, domElement);

  this._gateway = null;
};
goog.inherits(feng.controllers.controls.ExitControls, feng.controllers.controls.Controls);


feng.controllers.controls.ExitControls.prototype.setCamera = function( gateway ) {

	this._gateway = gateway;
	
	var position = this._gateway.origin.position;
	this.setPosition( position );

	var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
  	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(position, gateway.getCenter());
  	rotation.setFromQuaternion( quaternion );
	this.setRotation( rotation );

	var fov = feng.controllers.controls.Controls.Default.FOV;
	this.setFov( fov );
};


feng.controllers.controls.ExitControls.prototype.activate = function () {

	goog.base(this, 'activate');

	// start to load the go-to view3d of this episode
	var viewId = this._gateway.viewId;
	this._view3d.episode.load( viewId );

	// listen to episode load complete event to resume after load
	this._eventHandler.listenOnce( this._view3d.episode, feng.events.EventType.COMPLETE, this.onLoadComplete, false, this);
};


feng.controllers.controls.ExitControls.prototype.onLoadComplete = function () {

	this._view3d.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		sectionId: this._view3d.sectionId,
		viewId: this._gateway.viewId,
		gatewayId: this._gateway.gatewayId
	});
};