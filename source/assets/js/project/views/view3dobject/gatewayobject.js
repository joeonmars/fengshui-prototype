goog.provide('feng.views.view3dobject.GatewayObject');

goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * An interactive object that leads to another view3d
 */
feng.views.view3dobject.GatewayObject = function( object3d, interactions ){

	var enter = feng.views.view3dobject.InteractiveObject.Interaction.ENTER;
	if(!goog.array.contains(interactions, enter)) {
		interactions.push(enter);
	}

  goog.base(this, object3d, interactions);

  this.interactions = interactions;

  this.viewId = this.object3d.userData['viewid'];
  this.gatewayId = this.object3d.userData['gatewayid'];

  var origin = this.object3d.getObjectByName('origin');
  this.object3d.updateMatrixWorld();
  this.originPosition = new THREE.Vector3().setFromMatrixPosition( origin.matrixWorld );

  this.hasEntered = false;
};
goog.inherits(feng.views.view3dobject.GatewayObject, feng.views.view3dobject.InteractiveObject);



feng.views.view3dobject.GatewayObject.prototype.enter = function() {

	if(!this.hasEntered) {
		this.hasEntered = true;

		// animate...
	}
};