goog.provide('feng.views.view3dobject.GatewayObject');

goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * An interactive object that leads to another view3d
 */
feng.views.view3dobject.GatewayObject = function( object3d, data ){

  goog.base(this, object3d, data);

	var enter = feng.views.view3dobject.InteractiveObject.Interaction.ENTER;
	if(!goog.array.contains(this.interactions, enter)) {
		this.interactions.push(enter);
	}

  this.viewId = this.data.viewid;
  this.gatewayId = this.data.gatewayid;

  var originObject = this.object3d.getObjectByName('origin');
  this.object3d.updateMatrixWorld();
  this.origin = new THREE.Vector3().setFromMatrixPosition( originObject.matrixWorld );
  
  this.hasEntered = false;
};
goog.inherits(feng.views.view3dobject.GatewayObject, feng.views.view3dobject.InteractiveObject);



feng.views.view3dobject.GatewayObject.prototype.enter = function() {

	if(!this.hasEntered) {
		this.hasEntered = true;

		// animate...
	}
};