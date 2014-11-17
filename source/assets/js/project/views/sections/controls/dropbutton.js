goog.provide('feng.views.sections.controls.DropButton');

goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.DropButton = function(domElement){
	
  goog.base(this, domElement);

  this._movableObject = null;

  this.fadeOut();
};
goog.inherits(feng.views.sections.controls.DropButton, feng.views.sections.controls.Controls);


feng.views.sections.controls.DropButton.prototype.activate = function( movableObject ){

  var shouldActivate = goog.base(this, 'activate');

  if(!shouldActivate) return;

  this._movableObject = movableObject;

  this.fadeIn();

	this._eventHandler.listen(this.domElement, 'click', this.onClick, false, this);

	goog.fx.anim.registerAnimation( this );
};


feng.views.sections.controls.DropButton.prototype.deactivate = function(){

  var shouldDeactivate = goog.base(this, 'deactivate');

  if(!shouldDeactivate) return;

  this._movableObject = null;

  goog.fx.anim.unregisterAnimation( this );
};


feng.views.sections.controls.DropButton.prototype.fadeIn = function(){

	goog.dom.classes.addRemove( this.domElement, 'fadeOut', 'fadeIn' );
};


feng.views.sections.controls.DropButton.prototype.fadeOut = function(){

	goog.dom.classes.addRemove( this.domElement, 'fadeIn', 'fadeOut' );
};


feng.views.sections.controls.DropButton.prototype.onClick = function(e){

	if(goog.dom.classes.has(this.domElement, 'fadeOut')) return false;

	this.fadeOut();

	this._movableObject.drop();
};


feng.views.sections.controls.DropButton.prototype.onAnimationFrame = function(now) {

  var camera = this._cameraController.activeCamera;
  var viewSize = this._viewSize;

  var pos3d = this._movableObject.getDestination();
  var pos2d = feng.utils.ThreeUtils.get2DCoordinates( pos3d, camera, viewSize );
  
  goog.style.setStyle( this.domElement, 'transform', 'translateX(' + pos2d.x + 'px) translateY(' + pos2d.y + 'px)' );
};