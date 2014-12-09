goog.provide('feng.views.sections.controls.DropButton');

goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.DropButton = function(domElement){
	
  goog.base(this, domElement);

  this._movableObject = null;

  goog.dom.classes.addRemove( this.domElement, 'fadeIn', 'fadeOut' );
  goog.dom.classes.enable( this.domElement, 'hidden', true );
};
goog.inherits(feng.views.sections.controls.DropButton, feng.views.sections.controls.Controls);


feng.views.sections.controls.DropButton.prototype.activate = function( movableObject ){

  var shouldActivate = goog.base(this, 'activate');

  if(!shouldActivate) return;

  this._movableObject = movableObject;

  goog.dom.classes.enable( this.domElement, 'hidden', false );

  this.fadeIn();

	this._eventHandler.listen(this.domElement, 'click', this.onClick, false, this);

	goog.fx.anim.registerAnimation( this );
};


feng.views.sections.controls.DropButton.prototype.deactivate = function(){

  var shouldDeactivate = goog.base(this, 'deactivate');

  if(!shouldDeactivate) return;

  this._movableObject = null;

  goog.dom.classes.enable( this.domElement, 'hidden', true );

  goog.fx.anim.unregisterAnimation( this );
};


feng.views.sections.controls.DropButton.prototype.fadeIn = function(){

  if( !goog.dom.classes.has(this.domElement, 'fadeIn') ) {

    goog.dom.classes.addRemove( this.domElement, 'fadeOut', 'fadeIn' );
  }
};


feng.views.sections.controls.DropButton.prototype.fadeOut = function(){

  if( !goog.dom.classes.has(this.domElement, 'fadeOut') ) {

    goog.dom.classes.addRemove( this.domElement, 'fadeIn', 'fadeOut' );
  }
};


feng.views.sections.controls.DropButton.prototype.onClick = function(e){

	if(goog.dom.classes.has(this.domElement, 'fadeOut')) return false;

	this.fadeOut();

  feng.soundController.playSfx('confirm');

  var browseControls = this._view3d.modeController.getModeControl( feng.controllers.view3d.ModeController.Mode.BROWSE );

  browseControls.dispatchEvent({
    type: feng.events.EventType.CHANGE,
    mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
    nextMode: feng.controllers.view3d.ModeController.Mode.CLOSE_UP,
    object: this._movableObject.getCloseUpObjectWhenDropped()
  });
};


feng.views.sections.controls.DropButton.prototype.onAnimationFrame = function(now) {

  var camera = this._cameraController.activeCamera;
  var viewSize = this._viewSize;

  var pos3d = this._movableObject.getDestination();
  var pos2d = feng.utils.ThreeUtils.get2DCoordinates( pos3d, camera, viewSize );

  var controlPosition = this._view3d.modeController.control.getPosition();
  var distance = controlPosition.distanceTo( pos3d );
  
  var shouldShow = (distance <= this._movableObject.range);

  goog.style.setStyle( this.domElement, 'transform', 'translateX(' + pos2d.x + 'px) translateY(' + pos2d.y + 'px)');

  if(shouldShow) {
    this.fadeIn();
  }else {
    this.fadeOut();
  }
};