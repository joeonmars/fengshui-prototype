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
    this._tooltips[ tooltipEl.getAttribute('data-id') ] = tooltipEl;
  }, this);

  // active tooltips of view3d
  this._activeTooltips = {};
};
goog.inherits(feng.views.sections.controls.Tooltips, feng.views.sections.controls.Controls);


feng.views.sections.controls.Tooltips.prototype.setView3D = function( view3d ){

  goog.base(this, 'setView3D', view3d);

  // set active tooltips of view3d
  this._activeTooltips = {};

  goog.object.forEach( view3d.tipObjects, function(tipObject) {
    var tipId = tipObject.tip.id;
    this._activeTooltips[ tipId ] = this._tooltips[ tipId ];
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

  goog.object.forEach( this._activeTooltips, function(tooltip) {
    goog.dom.classes.addRemove( tooltip, 'fadeOut', 'fadeIn' );
  });

  goog.fx.anim.registerAnimation( this );
};


feng.views.sections.controls.Tooltips.prototype.deactivate = function(){

  var shouldDeactivate = goog.base(this, 'deactivate');

  if(!shouldDeactivate) return;

  goog.object.forEach( this._activeTooltips, function(tooltip) {
    goog.dom.classes.addRemove( tooltip, 'fadeIn', 'fadeOut' );
  });

  goog.fx.anim.unregisterAnimation( this );
};


feng.views.sections.controls.Tooltips.prototype.detectBlocking = function(){

  var tipObjects = this._view3d.tipObjects;
  var controlPosition = this._view3d.modeController.control.getPosition();

  goog.object.forEach( tipObjects, function(tipObject) {

    var proxyBox = tipObject.getProxyBox();
    var direction = this._rayDirection.subVectors( proxyBox.position, controlPosition ).normalize();
    this._raycaster.set( controlPosition, direction );
    
    var intersects = this._raycaster.intersectObjects( this._detectObjects );
    var tooltip = this._activeTooltips[ tipObject.tip.id ];

    if(intersects.length > 0 && intersects[0].object.view3dObject === proxyBox.view3dObject) {

      // not blocked
      goog.dom.classes.remove( tooltip, 'blocked');

    }else {

      // blocked
      goog.dom.classes.add( tooltip, 'blocked');
    }
  }, this);
};


feng.views.sections.controls.Tooltips.prototype.onModeChange = function(e){

  goog.base(this, 'onModeChange', e);

  if(e.mode === feng.controllers.view3d.ModeController.Mode.DESIGN) {

    this.activate();

  }else {

    this.deactivate();
  }
};


feng.views.sections.controls.Tooltips.prototype.onAnimationFrame = function(now) {

  var tipObjects = this._view3d.tipObjects;
  var camera = this._cameraController.activeCamera;
  var viewSize = this._viewSize;
  var zoomFraction = goog.math.lerp( 1, .25, this._view3d.modeController.control.getZoomFraction() );

  goog.object.forEach( tipObjects, function(tipObject) {

    var pos3d = tipObject.getCenter();
    var pos2d = feng.utils.ThreeUtils.get2DCoordinates( pos3d, camera, viewSize );
    
    var tipId = tipObject.tip.id;
    var tooltip = this._activeTooltips[ tipId ];
    goog.style.setStyle( tooltip, 'transform', 'translateX(' + pos2d.x + 'px) translateY(' + pos2d.y + 'px) scale(' + zoomFraction + ')' );

  }, this);

  this._detectBlockingThrottle.fire();
};