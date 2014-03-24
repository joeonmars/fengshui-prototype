goog.provide('feng.controllers.controls.FlowControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.fx.PathTrack');
goog.require('feng.utils.ThreeUtils');

/**
 * @constructor
 */
feng.controllers.controls.FlowControls = function(camera, view3d, domElement){

  goog.base(this, camera, view3d, domElement);

  this._energyFlow = this._view3d.energyFlow;
	this._tweener = null;
};
goog.inherits(feng.controllers.controls.FlowControls, feng.controllers.controls.Controls);


feng.controllers.controls.FlowControls.prototype.update = function () {

	goog.base(this, 'update');
};


feng.controllers.controls.FlowControls.prototype.start = function ( fromPosition, gateway, nextMode ) {

	// find closest points on path
	var nearest = this._energyFlow.getNearest( fromPosition );

	// start path animation from closest t
	var prop = {
    t: nearest.t
  };

  this._tweener = TweenMax.to(prop, duration, {
    t: 1,
    ease: Linear.easeNone,
    onUpdate: this.onPathProgress,
    onUpdateParams: [prop],
    onUpdateScope: this,
    onComplete: this.onPathComplete,
    onCompleteParams: [gateway, nextMode],
    onCompleteScope: this
  });
};


feng.controllers.controls.FlowControls.prototype.onPathProgress = function ( prop ) {

	//
	var pathCamera = this._energyFlow.getCameraAt( prop.t );

	this.setPosition( pathCamera.position );
	this.setRotation( pathCamera.rotation );
};


feng.controllers.controls.FlowControls.prototype.onPathComplete = function ( gateway, nextMode ) {

	if(gateway) {
		// if event has gateway object, animate the gateway and fade out view3d
		gateway.enter();

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