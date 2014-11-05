goog.provide('feng.views.sections.controls.Tooltips');

goog.require('goog.async.Throttle');
goog.require('goog.dom.classes');
goog.require('feng.views.sections.controls.Controls');
goog.require('feng.utils.ThreeUtils');


/**
 * @constructor
 */
feng.views.sections.controls.Tooltips = function( domElement ){

  goog.base(this, domElement);

  this._detectBlockingThrottle = new goog.async.Throttle( this.detectBlocking, 1000/15, this );

  this._raycaster = new THREE.Raycaster();
  this._rayDirection = new THREE.Vector3();
  this._detectObjects = [];

  // collect tooltips by id
  this._tooltips = {};

  var tooltipEls = goog.dom.getChildren( this.domElement );

  goog.array.forEach( tooltipEls, function(tooltipEl) {
    var tipId = tooltipEl.getAttribute('data-id');
    this._tooltips[ tipId ] = tooltipEl;
  }, this);

  // tooltips of current view3d
  this._currentTooltips = {};
};
goog.inherits(feng.views.sections.controls.Tooltips, feng.views.sections.controls.Controls);


feng.views.sections.controls.Tooltips.prototype.getTooltip = function( tipId ){

  return goog.dom.query('.tooltip[data-id=' + tipId + ']', this.domElement)[0];
};


feng.views.sections.controls.Tooltips.prototype.setView3D = function( view3d ){

  goog.base(this, 'setView3D', view3d);

  // set active tooltips of view3d
  this._currentTooltips = {};

  goog.object.forEach( view3d.tipObjects, function(tipObject) {

    var tip = tipObject.tip;
    var tipId = tip.id;
    this._currentTooltips[ tipId ] = this._tooltips[ tipId ];

    if(!tip.unlocked) {
      goog.events.listenOnce( tip, feng.events.EventType.UNLOCK, this.onTipUnlock, false, this );
    }
  }, this);

  // check objects to detect blocking
  this._detectObjects = [];

  goog.object.forEach(this._view3d.view3dObjects, function(object) {
    this._detectObjects.push( object.object3d );
  }, this);

  goog.array.remove( this._detectObjects, this._view3d.designPlane.object3d );
  goog.array.remove( this._detectObjects, this._view3d.skybox.object3d );
};


feng.views.sections.controls.Tooltips.prototype.activate = function(){

  var shouldActivate = goog.base(this, 'activate');

  if(!shouldActivate) return;

  goog.object.forEach( this._currentTooltips, function(tooltip) {
    goog.dom.classes.addRemove( tooltip, 'fadeOut', 'fadeIn' );
  });

  goog.fx.anim.registerAnimation( this );
};


feng.views.sections.controls.Tooltips.prototype.deactivate = function(){

  var shouldDeactivate = goog.base(this, 'deactivate');

  if(!shouldDeactivate) return;

  goog.object.forEach( this._currentTooltips, function(tooltip) {
    goog.dom.classes.addRemove( tooltip, 'fadeIn', 'fadeOut' );
  });

  goog.fx.anim.unregisterAnimation( this );
};


feng.views.sections.controls.Tooltips.prototype.detectBlocking = function(){

  var tipObjects = this._view3d.tipObjects;
  var control = this._view3d.modeController.control;
  var controlPosition = control.getPosition();
  var controlDirection = control.getForwardVector( true );
  var thresholdDot = Math.cos( THREE.Math.degToRad(45) );

  goog.object.forEach( tipObjects, function(tipObject) {

    var tooltip = this._currentTooltips[ tipObject.tip.id ];

    var proxyBox = tipObject.getProxyBox();
    var direction = this._rayDirection.subVectors( proxyBox.position, controlPosition ).normalize();
    this._raycaster.set( controlPosition, direction );

    var objectDirection = proxyBox.position.clone().sub( controlPosition ).normalize();
    var dot = objectDirection.dot( controlDirection );
    
    if(dot >= thresholdDot) {

      goog.dom.classes.enable( tooltip, 'hidden', false );

    }else {

      goog.dom.classes.enable( tooltip, 'hidden', true );
      return;
    }
    
    var intersects = this._raycaster.intersectObjects( this._detectObjects );

    var shouldShow = (intersects.length > 0 && intersects[0].object.view3dObject === proxyBox.view3dObject);
    
    goog.dom.classes.enable( tooltip, 'hidden', !shouldShow );

  }, this);
};


feng.views.sections.controls.Tooltips.prototype.onTipUnlock = function(e){

  var tipId = e.tip.id;
  var tooltipEl = this.getTooltip( tipId );

  goog.dom.classes.remove( tooltipEl, 'locked' );
};


feng.views.sections.controls.Tooltips.prototype.onModeChange = function(e){

  goog.base(this, 'onModeChange', e);

  switch(e.mode) {
    case feng.controllers.view3d.ModeController.Mode.BROWSE:
    case feng.controllers.view3d.ModeController.Mode.DESIGN:
    case feng.controllers.view3d.ModeController.Mode.WALK:
    this.activate();
    break;

    default:
    this.deactivate();
    break;
  }
};


feng.views.sections.controls.Tooltips.prototype.onAnimationFrame = function(now) {

  var tipObjects = this._view3d.tipObjects;
  var camera = this._cameraController.activeCamera;
  var viewSize = this._viewSize;
  //var zoomFraction = goog.math.lerp( 1, .25, this._view3d.modeController.control.getZoomFraction() );

  var zoomFraction = 1;

  goog.object.forEach( tipObjects, function(tipObject) {

    var pos3d = tipObject.getCenter();
    var pos2d = feng.utils.ThreeUtils.get2DCoordinates( pos3d, camera, viewSize );
    
    var tipId = tipObject.tip.id;
    var tooltip = this._currentTooltips[ tipId ];
    goog.style.setStyle( tooltip, 'transform', 'translateX(' + pos2d.x + 'px) translateY(' + pos2d.y + 'px) scale(' + zoomFraction + ')' );

  }, this);

  this._detectBlockingThrottle.fire();
};