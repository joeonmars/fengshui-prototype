goog.provide('feng.views.sections.controls.Tooltips');

goog.require('goog.async.Throttle');
goog.require('goog.dom.classlist');
goog.require('feng.views.sections.controls.Controls');
goog.require('feng.utils.ThreeUtils');


/**
 * @constructor
 */
feng.views.sections.controls.Tooltips = function( domElement ){

  goog.base(this, domElement);

  this._detectBlockingThrottle = new goog.async.Throttle( this.detectBlocking, 400, this );

  this._raycaster = new THREE.Raycaster();

  this._rayDirection = new THREE.Vector3();

  this._detectObjects = [];

  // object id as keys
  this._tooltips = {};

  // tooltips of current view3d
  this._currentTooltips = {};
  this._tooltipObjects = [];
};
goog.inherits(feng.views.sections.controls.Tooltips, feng.views.sections.controls.Controls);


feng.views.sections.controls.Tooltips.prototype.createTooltips = function( view3d ){

  // create tip tooltips
  var sectionId = view3d.sectionId;
  var viewId = view3d.id;

  goog.object.forEach( view3d.tipObjects, function(tipObject) {

    var objectId = tipObject.id;
    
    if(!this._tooltips[ objectId ]) {

      var goTipToken = feng.controllers.NavigationController.Token.GO_TIP.replace('{sectionId}', sectionId).replace('{viewId}', viewId).replace('{objectId}', objectId);

      var tooltipEl = soy.renderAsFragment(feng.templates.controls.TipTooltip, {
        object: tipObject,
        goTipToken: goTipToken
      });

      goog.dom.appendChild( this.domElement, tooltipEl );

      this._tooltips[ tipObject.id ] = tooltipEl;
    }
  }, this);

  // create gateway tooltips
  goog.object.forEach( view3d.getGatewayObjects(), function(gatewayObject) {

    if(!this._tooltips[ gatewayObject.id ] && !gatewayObject.toHome) {

      var tooltipEl = soy.renderAsFragment(feng.templates.controls.GatewayTooltip, {
        gateway: gatewayObject
      });

      goog.dom.appendChild( this.domElement, tooltipEl );

      this._tooltips[ gatewayObject.id ] = tooltipEl;
    }
  }, this);
};


feng.views.sections.controls.Tooltips.prototype.setView3D = function( view3d ){

  goog.base(this, 'setView3D', view3d);

  // create tooltips if not
  this.createTooltips( view3d );

  // find tooltip objects of view3d
  var tipObjects = goog.object.getValues( view3d.tipObjects );

  var gatewayObjects = goog.array.filter(view3d.getGatewayObjects(), function(gatewayObject) {
    return !gatewayObject.toHome;
  });
  
  this._tooltipObjects = ([]).concat( tipObjects, gatewayObjects );

  // set current tooltips from objects
  this._currentTooltips = {};

  goog.array.forEach( this._tooltipObjects, function(object) {

    var id = object.id;
    this._currentTooltips[ id ] = this._tooltips[ id ];
  }, this);

  // listen to tip unlock event
  goog.array.forEach( tipObjects, function(tipObject) {

    var id = tipObject.id;
    var tooltipEl = this._tooltips[ id ];

    var tip = tipObject.tip;
    goog.dom.classlist.enable( tooltipEl, 'locked', !(tip.unlocked && tip.isFinal) );

    if(!tip.unlocked && tip.isFinal) {
      goog.events.listenOnce( tip, feng.events.EventType.UNLOCK, this.onTipUnlock, false, this );
    }
  }, this);

  // listen to click event of gateway tooltip
  goog.array.forEach( gatewayObjects, function(gatewayObject) {

    var tooltipEl = this._tooltips[ gatewayObject.id ];
    goog.events.listenOnce( tooltipEl, 'click', this.onClickGatewayTooltip, false, this );
  }, this);

  this.updateDetectObjects();
};


feng.views.sections.controls.Tooltips.prototype.activate = function(){

  var shouldActivate = goog.base(this, 'activate');

  if(!shouldActivate) return;

  goog.object.forEach( this._currentTooltips, function(tooltip) {
    goog.dom.classlist.addRemove( tooltip, 'fadeOut', 'fadeIn' );
  });

  this.updateDetectObjects();

  TweenMax.ticker.addEventListener("tick", this.update, this);
};


feng.views.sections.controls.Tooltips.prototype.deactivate = function(){

  var shouldDeactivate = goog.base(this, 'deactivate');

  if(!shouldDeactivate) return;

  goog.object.forEach( this._currentTooltips, function(tooltip) {
    goog.dom.classlist.addRemove( tooltip, 'fadeIn', 'fadeOut' );
  });

  TweenMax.ticker.removeEventListener("tick", this.update, this);
};


feng.views.sections.controls.Tooltips.prototype.onModeChange = function( e ){
  
  goog.base(this, 'onModeChange', e);

  switch(e.mode) {

    case feng.controllers.view3d.ModeController.Mode.CLOSE_UP:
    this.deactivate();
    break;

    default:
    this.activate();
    break;
  }
};


feng.views.sections.controls.Tooltips.prototype.updateDetectObjects = function(){

  if(!this._view3d) return;

  // check objects to detect blocking
  this._detectObjects = goog.array.map(this._view3d.getSolidObjects(), function(object) {
    return object.object3d;
  });
};


feng.views.sections.controls.Tooltips.prototype.detectBlocking = function(){

  if(this._view3d.arms.hasObject()) {

    goog.object.forEach(this._currentTooltips, function(tooltip) {
      goog.dom.classlist.enable( tooltip, 'hidden', true );
    });

    return;
  }
  
  var control = this._view3d.modeController.control;
  var controlPosition = control.getPosition();
  var controlDirection = control.getForwardVector( true );
  var thresholdDot = Math.cos( THREE.Math.degToRad(45) );

  var i, l = this._tooltipObjects.length;

  for(i = 0; i < l; i++) {

    var object = this._tooltipObjects[i];

    var tooltip = this._currentTooltips[ object.id ];

    var objectCenter = object.getCenter();
    var direction = this._rayDirection.subVectors( objectCenter, controlPosition ).normalize();
    this._raycaster.set( controlPosition, direction );

    var objectDirection = objectCenter.sub( controlPosition ).normalize();
    var dot = objectDirection.dot( controlDirection );

    if(dot >= thresholdDot) {

      goog.dom.classlist.enable( tooltip, 'hidden', false );

    }else {

      goog.dom.classlist.enable( tooltip, 'hidden', true );
      continue;
    }

    var shouldShow = feng.utils.ThreeUtils.isFirstIntersectedObject( this._detectObjects, object.object3d, object.getProxyBox(), this._raycaster );

    goog.dom.classlist.enable( tooltip, 'hidden', !shouldShow );
  }
};


feng.views.sections.controls.Tooltips.prototype.onTipUnlock = function(e){

  var tooltipEls = goog.dom.query('.tooltip[data-tip-id=' + e.tip.id + ']', this.domElement);

  goog.array.forEach(tooltipEls, function(tooltipEl) {
    goog.dom.classlist.remove( tooltipEl, 'locked' );
  });
};


feng.views.sections.controls.Tooltips.prototype.onClickGatewayTooltip = function(e){

  e.preventDefault();

  var gatewayId = e.currentTarget.getAttribute('data-id');
  var gateway = this._view3d.getView3dObject( gatewayId );

  this.dispatchEvent({
    type: feng.events.EventType.CLICK_GATEWAY,
    gateway: gateway
  });
};


feng.views.sections.controls.Tooltips.prototype.onModeChange = function(e){

  goog.base(this, 'onModeChange', e);

  goog.dom.classlist.enable(this.domElement, 'design', (e.mode === feng.controllers.view3d.ModeController.Mode.DESIGN));

  switch(e.mode) {
    case feng.controllers.view3d.ModeController.Mode.ENTRY:
    this.deactivate();
    this._raycaster.far = 400/2;
    break;

    case feng.controllers.view3d.ModeController.Mode.BROWSE:
    this.activate();
    this._raycaster.far = 400/2;
    break;

    case feng.controllers.view3d.ModeController.Mode.DESIGN:
    this.activate();
    this._raycaster.far = Infinity;
    break;

    default:
    this.deactivate();
    break;
  }
};


feng.views.sections.controls.Tooltips.prototype.update = function() {

  var camera = this._cameraController.activeCamera;
  var viewSize = this._viewSize;

  goog.array.forEach( this._tooltipObjects, function(object) {

    var pos3d = object.getCenter();
    var pos2d = feng.utils.ThreeUtils.get2DCoordinates( pos3d, camera, viewSize );

    var id = object.id;
    var tooltip = this._currentTooltips[ id ];

    var inScreenRect = (pos2d.x > 140 && pos2d.x < (viewSize.width - 140) && pos2d.y > 140 && pos2d.y < (viewSize.height - 140));

    if(inScreenRect) {

      goog.dom.classlist.addRemove( tooltip, 'fadeOut', 'fadeIn' );

    }else {

      goog.dom.classlist.addRemove( tooltip, 'fadeIn', 'fadeOut' );
    }

    goog.style.setStyle( tooltip, 'transform', 'translateX(' + pos2d.x + 'px) translateY(' + pos2d.y + 'px)' );

  }, this);

  this._detectBlockingThrottle.fire();
};