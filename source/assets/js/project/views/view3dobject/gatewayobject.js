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

	this.toHome = this.data.toHome;  
  this.isEntry = this.data.isEntry;

  this.origin = this.data.origin;
  this.origin.position.y = feng.controllers.controls.Controls.Default.STANCE_HEIGHT;

  this._startRotationY = this.object3d.rotation.y;

	this._openTweener = TweenMax.fromTo( this.object3d.rotation, 2.5, {
		'y': this._startRotationY
	}, {
		'y': this.getEndRotationY(),
		'paused': true,
		'onComplete': this.onOpenComplete,
		'onCompleteScope': this
	});

	this._delayToPause = new goog.async.Delay( this.pause, 250, this );
};
goog.inherits(feng.views.view3dobject.GatewayObject, feng.views.view3dobject.InteractiveObject);


feng.views.view3dobject.GatewayObject.prototype.shouldGoHome = function() {

	return (this.data.toHome === true);
};


feng.views.view3dobject.GatewayObject.prototype.getEndRotationY = function() {

	var direction = this.data.inversed ? -1 : 1;
	var rotation = (this._startRotationY + goog.math.toRadians( -90 * direction ));

	return rotation;
};


feng.views.view3dobject.GatewayObject.prototype.open = function( skipPause ) {

	this._openTweener.updateTo({
		'y': this.getEndRotationY()
	}, true);

	this._openTweener.restart();

	if( !skipPause ) {

		this._delayToPause.start();
	}
};


feng.views.view3dobject.GatewayObject.prototype.close = function() {

	TweenMax.to( this.object3d.rotation, 2, {
		'y': this._startRotationY,
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