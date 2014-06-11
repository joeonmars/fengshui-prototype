goog.provide('feng.views.view3dobject.GatewayObject');

goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * An interactive object that leads to another view3d
 */
feng.views.view3dobject.GatewayObject = function( object3d, data ){

  goog.base(this, object3d, data);

  this.viewId = this.data.viewid;
  this.gatewayId = this.data.gatewayid;

  this._baseRotationY = this.object3d.rotation.y;

  // create origin position that is half meter away from the door
  var origin = new THREE.Vector3();
  origin.subVectors( this.object3d.parent.position, this.getCenter() ).normalize().multiplyScalar(25);
  origin = this.getCenter().clone().add( origin );

  this.origin = origin;
};
goog.inherits(feng.views.view3dobject.GatewayObject, feng.views.view3dobject.InteractiveObject);


feng.views.view3dobject.GatewayObject.prototype.open = function() {

	TweenMax.to( this.object3d.rotation, 1, {
		'y': this._baseRotationY + goog.math.toRadians( 90 ),
		'ease': Strong.easeOut
	});
};


feng.views.view3dobject.GatewayObject.prototype.close = function() {

	TweenMax.to( this.object3d.rotation, 1, {
		'y': this._baseRotationY,
		'ease': Strong.easeIn
	});
};