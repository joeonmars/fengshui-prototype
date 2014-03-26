goog.provide('feng.controllers.controls.FlowControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.fx.PathTrack');
goog.require('feng.utils.ThreeUtils');

/**
 * @constructor
 */
feng.controllers.controls.FlowControls = function(camera, view3d, domElement, energyFlow){

  goog.base(this, camera, view3d, domElement);

  this._energyFlow = energyFlow;
	this._tweener = null;
};
goog.inherits(feng.controllers.controls.FlowControls, feng.controllers.controls.Controls);


feng.controllers.controls.FlowControls.prototype.start = function ( fromPosition, gateway, nextMode ) {

	// find closest points on path
	var nearest = this._energyFlow.getNearest( fromPosition );

	// start path animation from closest t
	var fromU = nearest.u;
	var toU = 1;

	var prop = {
    u: fromU
  };

  var distanceBetweenU = this._energyFlow.getEstimatedDistanceBetweenU(fromU, toU);
  var duration = distanceBetweenU * 2 / (1.564 / 2 * 100);	// adult walking speed is 1.564 meter per second

  this._tweener = TweenMax.to(prop, duration, {
    u: 1,
    ease: Linear.easeNone,
    onUpdate: this.onPathProgress,
    onUpdateParams: [prop],
    onUpdateScope: this,
    onComplete: this.onPathComplete,
    onCompleteParams: [gateway, nextMode],
    onCompleteScope: this,
    repeat: -1
  });
};


feng.controllers.controls.FlowControls.prototype.onPathProgress = function ( prop ) {

	var tips = this._energyFlow.getTipsAndWeightOfProgress( prop.u );
	var object1 = tips.current ? tips.current.getView3dObject().object3d : null;
	var object2 = tips.next ? tips.next.getView3dObject().object3d : null;
	var lookAtRotation = this._energyFlow.interpolateLookAt( object1, object2, tips.weight );

	//
	var pathCamera = this._energyFlow.getCameraAt( prop.u );

	var rotation = pathCamera.rotation; //this._energyFlow.getLookAt( object2 );

	this.setPosition( pathCamera.position );
	this.setRotation( rotation );
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