goog.provide('feng.controllers.controls.ClimbControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.utils.ThreeUtils');

/**
 * @constructor
 */
feng.controllers.controls.ClimbControls = function(camera, view3d, domElement){

  goog.base(this, camera, view3d, domElement);

};
goog.inherits(feng.controllers.controls.ClimbControls, feng.controllers.controls.Controls);


feng.controllers.controls.ClimbControls.prototype.start = function ( ev ) {

	var stairs = ev.stairs;
	var gateway = ev.gateway;
	var descending = ev.descending;
	var nextMode = feng.controllers.view3d.ModeController.Mode.BROWSE;

	var prop = {
		t: 0,
		stairs: stairs,
		descending: descending
	};

	var duration = stairs.duration;

	TweenMax.to(prop, duration, {
		t: 1,
		ease: Linear.easeNone,
		onUpdate: this.onClimbUpdate,
		onUpdateParams: [prop],
		onUpdateScope: this,
		onComplete: this.onClimbComplete,
		onCompleteParams: [gateway, nextMode],
		onCompleteScope: this
	});
};


feng.controllers.controls.ClimbControls.prototype.onClimbUpdate = function ( prop ) {

	var stairs = prop.stairs;
	var t = prop.t;
	var descending = prop.descending;
	var position = stairs.getPositionByT( t, descending );

	this.setPosition( position );
};


feng.controllers.controls.ClimbControls.prototype.onClimbComplete = function ( gateway, nextMode ) {

	if(gateway) {
		// if event has gateway object, fade out view3d
		this._view3d.dispatchEvent({
			type: feng.events.EventType.CHANGE,
			sectionId: this._view3d.sectionId,
			viewId: gateway.viewId,
			gatewayId: gateway.gatewayId
		});
	}

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: nextMode
	});
};