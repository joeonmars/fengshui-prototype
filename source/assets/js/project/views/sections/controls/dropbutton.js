goog.provide('feng.views.sections.controls.DropButton');

goog.require('goog.Timer');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.DropButton = function(domElement){
	
  goog.base(this, domElement);

  this._movableObject = null;
  this._detectTimer = new goog.Timer( 1000/30 );

  this.fadeOut();
};
goog.inherits(feng.views.sections.controls.DropButton, feng.views.sections.controls.Controls);


feng.views.sections.controls.DropButton.prototype.activate = function( movableObject ){

  var shouldActivate = goog.base(this, 'activate');

  if(!shouldActivate) return;

  this._movableObject = movableObject;

  this._detectTimer.start();

	this._eventHandler.listen(this.domElement, 'click', this.onClick, false, this);
	this._eventHandler.listen(this._detectTimer, goog.Timer.TICK, this.detect, false, this);

	goog.fx.anim.registerAnimation( this );
};


feng.views.sections.controls.DropButton.prototype.deactivate = function(){

  var shouldDeactivate = goog.base(this, 'deactivate');

  if(!shouldDeactivate) return;

  this._movableObject = null;

  this._detectTimer.stop();

  goog.fx.anim.unregisterAnimation( this );
};


feng.views.sections.controls.DropButton.prototype.detect = function(){

	var dropPosition = this._movableObject.getPositionIfAvailable();

	if(dropPosition) {

		this.fadeIn();

	}else {

		this.fadeOut();
	}
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