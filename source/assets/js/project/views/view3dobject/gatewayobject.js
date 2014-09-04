goog.provide('feng.views.view3dobject.GatewayObject');

goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * An interactive object that leads to another view3d
 */
feng.views.view3dobject.GatewayObject = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this.viewId = this.data.viewid;
  this.gatewayId = this.data.gatewayid;

  this.isEntry = true;

  this.origin = this.data.origin;
  this.origin.position.y = feng.controllers.controls.Controls.Default.STANCE_HEIGHT;

  this._baseRotationY = this.object3d.rotation.y;
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