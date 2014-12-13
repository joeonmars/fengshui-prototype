goog.provide('feng.views.view3dobject.entities.Windows');

goog.require('goog.fx.Dragger');
goog.require('feng.fx.TextureAnimator');
goog.require('feng.views.view3dobject.TipObject');


/**
 * @constructor
 * Two windows in ollie's studio to be be lifted up or pulled down
 */
feng.views.view3dobject.entities.Windows = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._window = null;
  this._switch = null;

  this._windowLeft = null;
  this._windowRight = null;
  this._windowLeftSwitch = null;
  this._windowRightSwitch = null;

  this._switchTopY = 30;
  this._switchBottomY = 0;
  this._switchStartY = 0;

  this._startFov = 0;

  this._canDrag = false;

  this._cameraTransitionTweener = null;
  this._cameraZoomTweener = null;

  this._hasDoneWindowLeft = false;
  this._hasDoneWindowRight = false;

  // dragger to drag the windows
  this._dragger = new goog.fx.Dragger( this._view3d.domElement );
  this._dragger.setHysteresis( 5 );
  this._dragger.defaultAction = goog.nullFunction;
};
goog.inherits(feng.views.view3dobject.entities.Windows, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.Windows.prototype.init = function(){

	goog.base(this, 'init');
	
  this._windowLeft = this._view3d.getView3dObject('window-left');
  this._windowRight = this._view3d.getView3dObject('window-right');

  this._windowLeftSwitch = this._view3d.getView3dObject( 'window-left-switch' );
  this._windowRightSwitch = this._view3d.getView3dObject( 'window-right-switch' );
};


feng.views.view3dobject.entities.Windows.prototype.startInteraction = function(){

  goog.base(this, 'startInteraction');

  this.enableWindowDragging( this );
};


feng.views.view3dobject.entities.Windows.prototype.stopInteraction = function(){

  goog.base(this, 'stopInteraction');
};


feng.views.view3dobject.entities.Windows.prototype.transitionToWindow = function( opt_window ){

	this._interactionHandler.removeAll();

	this._window = opt_window;

	var toCameraSettings = opt_window.specialCameraSettings;

  var control = this._view3d.modeController.control;

  var prop = {
    t: 0,
    startPosition: control.getPosition().clone(),
    endPosition: toCameraSettings.position,
    startRotation: control.getRotation().clone(),
    endRotation: toCameraSettings.rotation,
    startFov: control.getFov(),
    endFov: toCameraSettings.fov
  }

  this._cameraTransitionTweener = TweenMax.to( prop, 1, {
    t: 1,
    'ease': Sine.easeInOut,
    'onUpdate': this.onCameraTransitionUpdate,
    'onUpdateParams': [prop],
    'onUpdateScope': this,
    'onComplete': this.onCameraTransitionComplete,
    'onCompleteScope': this
  });
};


feng.views.view3dobject.entities.Windows.prototype.enableWindowDragging = function( opt_window ){

  this._window = (opt_window === this._windowLeft) ? this._windowLeft : this._windowRight;
  this._switch = (this._window === this._windowLeft) ? this._windowLeftSwitch : this._windowRightSwitch;

  this._startFov = this._view3d.modeController.control.getFov();
  
  this._interactionHandler.listen( this._view3d.domElement, feng.events.EventType.INPUT_DOWN, this.onDown, false, this);
  this._interactionHandler.listen( this._dragger, goog.fx.Dragger.EventType.START, this.onDragStart, false, this);
  this._interactionHandler.listen( this._dragger, goog.fx.Dragger.EventType.DRAG, this.onDrag, false, this);
  this._interactionHandler.listen( this._dragger, goog.fx.Dragger.EventType.END, this.onDragEnd, false, this);
};


feng.views.view3dobject.entities.Windows.prototype.onDown = function(e){

	var camera = this._view3d.cameraController.activeCamera;
  var viewSize = this._view3d.viewSize;
  var objects = [this._window.getProxyBox()];
  var clickedObjects = feng.utils.ThreeUtils.getObjectsBy2DPosition( e.clientX, e.clientY, objects, camera, viewSize );

  this._canDrag = (clickedObjects.length > 0);
};


feng.views.view3dobject.entities.Windows.prototype.onDragStart = function(e){

	if(!this._canDrag) return;

	this._switchStartY = this._switch.object3d.position.y;

	var control = this._view3d.modeController.control;

	var prop = {
    fov: control.getFov()
  };

  this._cameraZoomTweener = TweenMax.to(prop, 1, {
    fov: this._startFov - 5,
    'ease': Strong.easeOut,
    'onUpdate': this.onCameraZoomUpdate,
    'onUpdateParams': [prop],
    'onUpdateScope': this
  });
};


feng.views.view3dobject.entities.Windows.prototype.onDrag = function(e){

	if(!this._canDrag) return;

	var dist = (this._switchTopY - this._switchBottomY) * (this._dragger.deltaY / feng.viewportSize.height);
	var switchY = this._switchStartY - dist;

	this._switch.object3d.position.y = goog.math.clamp( switchY, this._switchBottomY, this._switchTopY );
};


feng.views.view3dobject.entities.Windows.prototype.onDragEnd = function(e){

	if(!this._canDrag) return;

	this._hasDoneWindowLeft = (this._windowLeftSwitch.object3d.position.y === this._switchTopY);
	this._hasDoneWindowRight = (this._windowRightSwitch.object3d.position.y === this._switchBottomY);

	var justDoneWindowLeft = (this._window === this._windowLeft && this._hasDoneWindowLeft);
	var justDoneWindowRight = (this._window === this._windowRight && this._hasDoneWindowRight);

	if(justDoneWindowLeft || justDoneWindowRight) {

		var control = this._view3d.modeController.control;

		var prop = {
	    fov: control.getFov()
	  };

	  this._cameraZoomTweener = TweenMax.to(prop, 1, {
	    fov: this._startFov,
	    'onUpdate': this.onCameraZoomUpdate,
	    'onUpdateParams': [prop],
	    'onUpdateScope': this,
	    'onComplete': this.onCameraZoomOutComplete,
	    'onCompleteScope': this
	  });
	}
};


feng.views.view3dobject.entities.Windows.prototype.onCameraTransitionUpdate = function(prop){

  var startPosition = prop.startPosition;
  var endPosition = prop.endPosition;
  var startRotation = prop.startRotation;
  var endRotation = prop.endRotation;
  var startFov = prop.startFov;
  var endFov = prop.endFov;
  var t = prop.t;

  var control = this._view3d.modeController.control;

  control.lerp( startPosition, endPosition, startRotation, endRotation, startFov, endFov, t );
};


feng.views.view3dobject.entities.Windows.prototype.onCameraTransitionComplete = function(){

  this.enableWindowDragging( this._window );
};


feng.views.view3dobject.entities.Windows.prototype.onCameraZoomUpdate = function(prop){

  var control = this._view3d.modeController.control;

  control.setFov( prop.fov );
};


feng.views.view3dobject.entities.Windows.prototype.onCameraZoomOutComplete = function(){

	if(this._hasDoneWindowLeft && this._hasDoneWindowRight) {

    this.unlock();
    this.stopInteraction();

	}else if(this._hasDoneWindowLeft) {

		this.transitionToWindow( this._windowRight );

	}else if(this._hasDoneWindowRight) {

		this.transitionToWindow( this._windowLeft );
	}
};