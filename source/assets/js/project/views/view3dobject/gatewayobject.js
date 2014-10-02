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

  this._openTweener = TweenMax.fromTo( this.object3d.rotation, 1.6, {
  	'y': this._baseRotationY
  }, {
		'y': this._baseRotationY + goog.math.toRadians( 90 ),
		'ease': Strong.easeOut,
		'paused': true,
		'onComplete': this.onOpenComplete,
		'onCompleteScope': this
	});

	this._delayToPause = new goog.async.Delay( this.pause, 250, this );
};
goog.inherits(feng.views.view3dobject.GatewayObject, feng.views.view3dobject.InteractiveObject);


feng.views.view3dobject.GatewayObject.prototype.open = function() {

	this._openTweener.restart();

	this._delayToPause.start();
};


feng.views.view3dobject.GatewayObject.prototype.close = function() {

	TweenMax.to( this.object3d.rotation, 1.6, {
		'y': this._baseRotationY,
		'ease': Strong.easeIn
	});

	this._delayToPause.stop();
};


feng.views.view3dobject.GatewayObject.prototype.resume = function() {

	this._openTweener.resume();
};


feng.views.view3dobject.GatewayObject.prototype.pause = function() {

	this._openTweener.pause();

	this.dispatchEvent( feng.events.EventType.PAUSE );
};


feng.views.view3dobject.GatewayObject.prototype.onOpenComplete = function(e) {

	this.dispatchEvent( feng.events.EventType.COMPLETE );
};