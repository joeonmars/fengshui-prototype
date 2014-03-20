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
  this._eventHandler.listen(this, feng.events.EventType.SHOW, this.onShowView3D, false, this);
  this._eventHandler.listen(this, feng.events.EventType.HIDE, this.onHideView3D, false, this);
  this._eventHandler.listen(this, feng.events.EventType.CHANGE, this.onChangeView3D, false, this);
  this._eventHandler.listen(this, feng.events.EventType.ANIMATED_IN, this.onAnimatedInView3D, false, this);
  this._eventHandler.listen(this, feng.events.EventType.ANIMATED_OUT, this.onAnimatedOutView3D, false, this);
};
goog.inherits(feng.controllers.view3d.View3DController, goog.events.EventTarget);
goog.addSingletonGetter(feng.controllers.view3d.View3DController);


feng.controllers.view3d.View3DController.prototype.registerView3D = function( view3d ){

	this._view3ds[ view3d.sectionId + '.' + view3d.id ] = view3d;
};


feng.controllers.view3d.View3DController.prototype.getView3D = function( sectionId, viewId ){

	return this._view3ds[sectionId + '.' + viewId];
};


feng.controllers.view3d.View3DController.prototype.onHideView3D = function(e){

	console.log('Hide View3D: ', e.target.id);
};


feng.controllers.view3d.View3DController.prototype.onShowView3D = function(e){

	console.log('Show View3D: ', e.target.id);

	this.view3d = e.target;
};


feng.controllers.view3d.View3DController.prototype.onChangeView3D = function(e){

	var from = e.target;console.log(from)
	from.fadeOut();

	this._view3dToFadeIn = this.getView3D( e.sectionId, e.viewId );

	console.log('Change View3D from: ' + e.target.id + ' to ' + this._view3dToFadeIn.id);
};


feng.controllers.view3d.View3DController.prototype.onAnimatedInView3D = function(e){

	this.view3d = e.target;
	this.view3d.activate();
};


feng.controllers.view3d.View3DController.prototype.onAnimatedOutView3D = function(e){

	e.target.deactivate();

	if(this._view3dToFadeIn) {
		this._view3dToFadeIn.fadeIn();
	}
};