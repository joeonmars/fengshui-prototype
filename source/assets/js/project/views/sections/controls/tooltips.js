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

  this._tooltips = {};

  // tooltips of current view3d
  this._currentTooltips = {};
  this._tooltipObjects = [];
};
goog.inherits(feng.views.sections.controls.Tooltips, feng.views.sections.controls.Controls);


feng.views.sections.controls.Tooltips.prototype.createTooltips = function( view3d ){

  // create tip tooltips
  goog.object.forEach( view3d.tipObjects, function(tipObject) {

    var tip = tipObject.tip;

    if(!this._tooltips[tip.id]) {

      var tooltipEl = soy.renderAsFragment(feng.templates.controls.TipTooltip, {
        tip: tipObject.tip
      });

      goog.dom.appendChild( this.domElement, tooltipEl );

      this._tooltips[tip.id] = tooltipEl;
    }
  }, this);

  // create gateway tooltips
  goog.object.forEach( view3d.getGatewayObjects(), function(gatewayObject) {

    if(!this._tooltips[gatewayObject.gatewayId]) {

      var tooltipEl = soy.renderAsFragment(feng.templates.controls.GatewayTooltip, {
        gateway: gatewayObject
      });

      goog.dom.appendChild( this.domElement, tooltipEl );

      this._tooltips[gatewayObject.gatewayId] = tooltipEl;
    }
  }, this);
};


feng.views.sections.controls.Tooltips.prototype.getTooltip = function( id ){

  return goog.dom.query('.tooltip[data-id=' + id + ']', this.domElement)[0];
};


feng.views.sections.controls.Tooltips.prototype.setView3D = function( view3d ){

  goog.base(this, 'setView3D', view3d);

  // create tooltips if not
  this.createTooltips( view3d );

  // find tooltip objects of view3d
  var tipObjects = goog.object.getValues( view3d.tipObjects );
  var gatewayObjects = view3d.getGatewayObjects();
  this._tooltipObjects = ([]).concat( tipObjects, gatewayObjects );

  // set current tooltips from objects
  this._currentTooltips = {};

  goog.array.forEach( this._tooltipObjects, function(object) {

    var id = object.tip ? object.tip.id : object.gatewayId;
    this._currentTooltips[ id ] = this._tooltips[ id ];
  }, this);

  // listen to tip unlock event
  goog.array.forEach( tipObjects, function(tipObject) {

    var tip = tipObject.tip;
    var tooltipEl = this._tooltips[ tip.id ];

    goog.dom.classes.enable( tooltipEl, 'locked', !(tip.unlocked && tip.isFinal) );

    if(!tip.unlocked && tip.isFinal) {
      goog.events.listenOnce( tip, feng.events.EventType.UNLOCK, this.onTipUnlock, false, this );
    }
  }, this);

  // listen to click event of gateway tooltip
  goog.array.forEach( gatewayObjects, function(gatewayObject) {

    var tooltipEl = this._tooltips[  gatewayObject.gatewayId ];

    goog.events.listenOnce( tooltipEl, 'click', this.onClickGatewayTooltip, false, this );
  }, this);

  // check objects to detect blocking
  this._detectObjects = goog.array.map(this._view3d.getSolidObjects(), function(object) {
    return object.object3d;
  });

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

  var control = this._view3d.modeController.control;
  var controlPosition = control.getPosition();
  var controlDirection = control.getForwardVector( true );
  var thresholdDot = Math.cos( THREE.Math.degToRad(45) );

  goog.array.forEach( this._tooltipObjects, function(object) {

    var id = object.tip ? object.tip.id : object.gatewayId;

    var tooltip = this._currentTooltips[ id ];

    var objectCenter = object.getCenter();
    var direction = this._rayDirection.subVectors( objectCenter, controlPosition ).normalize();
    this._raycaster.set( controlPosition, direction );

    var objectDirection = objectCenter.clone().sub( controlPosition ).normalize();
    var dot = objectDirection.dot( controlDirection );

    if(dot >= thresholdDot) {

      goog.dom.classes.enable( tooltip, 'hidden', false );

    }else {

      goog.dom.classes.enable( tooltip, 'hidden', true );
      return;
    }
    
    var intersects = this._raycaster.intersectObjects( this._detectObjects );

    var shouldShow = (intersects.length > 0 && 
      (intersects[0].object.view3dObject === object || intersects[0].object.parent.view3dObject === object || goog.array.contains(intersects[0].object.children, object.object3d))
      );

    goog.dom.classes.enable( tooltip, 'hidden', !shouldShow );

  }, this);
};


feng.views.sections.controls.Tooltips.prototype.onTipUnlock = function(e){

  var tipId = e.tip.id;
  var tooltipEl = this.getTooltip( tipId );

  goog.dom.classes.remove( tooltipEl, 'locked' );
};


feng.views.sections.controls.Tooltips.prototype.onClickGatewayTooltip = function(e){

  e.preventDefault();

  var gatewayId = e.currentTarget.getAttribute('data-id');
  var gateway = this._view3d.getView3dObject( gatewayId );

  this._view3d.modeController.setMode({
    mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
    nextMode: feng.controllers.view3d.ModeController.Mode.EXIT,
    gateway: gateway
  });
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

  var camera = this._cameraController.activeCamera;
  var viewSize = this._viewSize;

  goog.array.forEach( this._tooltipObjects, function(object) {

    var pos3d = object.getCenter();
    var pos2d = feng.utils.ThreeUtils.get2DCoordinates( pos3d, camera, viewSize );
    
    var id = object.tip ? object.tip.id : object.gatewayId;
    var tooltip = this._currentTooltips[ id ];
    goog.style.setStyle( tooltip, 'transform', 'translateX(' + pos2d.x + 'px) translateY(' + pos2d.y + 'px)' );

  }, this);

  this._detectBlockingThrottle.fire();
};