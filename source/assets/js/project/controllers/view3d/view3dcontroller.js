goog.provide('feng.controllers.view3d.View3DController');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('feng.events');

/**
 * @constructor
 */
feng.controllers.view3d.View3DController = function(){

  goog.base(this);

  this.view3d = null;

  this._view3ds = {};
  this._view3dToFadeIn = null;

  this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.controllers.view3d.View3DController, goog.events.EventTarget);


feng.controllers.view3d.View3DController.prototype.activate = function(){

  this._eventHandler.listen(this, feng.events.EventType.SHOW, this.onShowView3D, false, this);
  this._eventHandler.listen(this, feng.events.EventType.HIDE, this.onHideView3D, false, this);
  this._eventHandler.listen(this, feng.events.EventType.CHANGE, this.onChangeView3D, false, this);
  this._eventHandler.listen(this, feng.events.EventType.ANIMATE_IN, this.onAnimateInView3D, false, this);
  this._eventHandler.listen(this, feng.events.EventType.ANIMATE_OUT, this.onAnimateOutView3D, false, this);
  this._eventHandler.listen(this, feng.events.EventType.ANIMATED_IN, this.onAnimatedInView3D, false, this);
  this._eventHandler.listen(this, feng.events.EventType.ANIMATED_OUT, this.onAnimatedOutView3D, false, this);
};


feng.controllers.view3d.View3DController.prototype.deactivate = function(){

  this._eventHandler.removeAll();
};


feng.controllers.view3d.View3DController.prototype.registerView3D = function( view3d ){

	this._view3ds[ view3d.sectionId + '.' + view3d.id ] = view3d;
	view3d.setParentEventTarget( this );
};


feng.controllers.view3d.View3DController.prototype.isRegisteredViewID = function( sectionId, viewId ){

	var isRegistered = goog.isDefAndNotNull( this._view3ds[ sectionId + '.' + viewId ] );
	return isRegistered;
};


feng.controllers.view3d.View3DController.prototype.getView3D = function( sectionId, viewId ){

	return this._view3ds[sectionId + '.' + viewId];
};


feng.controllers.view3d.View3DController.prototype.onHideView3D = function(e){

	console.log('Hide View3D: ', e.target.id);

	feng.pubsub.publish( feng.PubSub.Topic.HIDE_VIEW3D, e.target );
};


feng.controllers.view3d.View3DController.prototype.onShowView3D = function(e){

	this.view3d = e.target;

	console.log('Show View3D: ', this.view3d.id);

	this.view3d.createResources();
	this.view3d.activate();

	feng.pubsub.publish( feng.PubSub.Topic.SHOW_VIEW3D, this.view3d );
};


feng.controllers.view3d.View3DController.prototype.onChangeView3D = function(e){

	var from = e.target;
	from.fadeOut();

	this._view3dToFadeIn = this.getView3D( e.sectionId, e.viewId );
	this._view3dToFadeIn.startGateway = this._view3dToFadeIn.view3dObjects[ e.gatewayId ];

	console.log(
		'Change View3D from: ' + e.target.id + 
		' to ' + this._view3dToFadeIn.id + 
		' start gateway: ' + this._view3dToFadeIn.startGateway.gatewayId);
};


feng.controllers.view3d.View3DController.prototype.onAnimateInView3D = function(e){

};


feng.controllers.view3d.View3DController.prototype.onAnimateOutView3D = function(e){

	var view3d = e.target;
	view3d.deactivate();
	view3d.disposeResources();
};


feng.controllers.view3d.View3DController.prototype.onAnimatedInView3D = function(e){

};


feng.controllers.view3d.View3DController.prototype.onAnimatedOutView3D = function(e){

	if(this._view3dToFadeIn) {
		this._view3dToFadeIn.fadeIn( this._startGateway );
	}
};