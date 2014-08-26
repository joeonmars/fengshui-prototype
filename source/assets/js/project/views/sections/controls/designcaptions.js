goog.provide('feng.views.sections.controls.DesignCaptions');

goog.require('goog.async.Throttle');
goog.require('feng.utils.ThreeUtils');
goog.require('feng.views.sections.controls.Controls');
goog.require('feng.views.sections.designcaptions.UnlockedDesignCaption');
goog.require('feng.views.sections.designcaptions.LockedDesignCaption');


/**
 * @constructor
 */
feng.views.sections.controls.DesignCaptions = function( domElement ){

  goog.base(this, domElement);

  var unlockedCaptionEls = goog.dom.query('.design-caption.unlocked');
  this._unlockedCaptions = goog.array.map( unlockedCaptionEls, function(el) {
    return new feng.views.sections.designcaptions.UnlockedDesignCaption( el );
  });

  var lockedCaptionEls = goog.dom.query('.design-caption.locked');
  this._lockedCaptions = goog.array.map( lockedCaptionEls, function(el) {
    return new feng.views.sections.designcaptions.LockedDesignCaption( el );
  });

  this._objects = null;

  this._mousePosition = {
    x: 0,
    y: 0
  };

  this._activeObject = null;
  this._activeCaption = null;

  this._mouseMoveThrottle = new goog.async.Throttle( this.detectHover, 1000/30, this );
  this._updateThrottle = new goog.async.Throttle( this.update, 1000/30, this );
};
goog.inherits(feng.views.sections.controls.DesignCaptions, feng.views.sections.controls.Controls);


feng.views.sections.controls.DesignCaptions.prototype.setView3D = function( view3d ){

  goog.base(this, 'setView3D', view3d);

  this._objects = [];

  goog.object.forEach(this._view3d.tipObjects, function(object) {
    this._objects.push( object.object3d );
  }, this);
};


feng.views.sections.controls.DesignCaptions.prototype.getFreeCaption = function( object ) {

  var unlocked = object.tip.unlocked;
  var captions = unlocked ? this._unlockedCaptions : this._lockedCaptions;

  var caption = goog.array.find( captions, function(caption) {
      return (caption.activeObject != this._activeObject);
    }, this);

  return caption;
};


feng.views.sections.controls.DesignCaptions.prototype.activate = function() {

  var shouldActivate = goog.base(this, 'activate');

  if(!shouldActivate) return;

  goog.fx.anim.registerAnimation( this );

  this._eventHandler.listen( this._renderEl, 'mousemove', this.onMouseMove, false, this );
};


feng.views.sections.controls.DesignCaptions.prototype.deactivate = function() {

  var shouldDeactivate = goog.base(this, 'deactivate');

  if(!shouldDeactivate) return;

  this._activeObject = null;
  this._activeCaption = null;

  goog.fx.anim.unregisterAnimation( this );
};


feng.views.sections.controls.DesignCaptions.prototype.detectHover = function() {

  var intersects = feng.utils.ThreeUtils.getObjectsBy2DPosition(
    this._mousePosition.x,
    this._mousePosition.y,
    this._objects,
    this._cameraController.activeCamera,
    this._viewSize);

  if(intersects.length === 0) {

    this._activeObject = null;

    if(this._activeCaption) {
      this._activeCaption.deactivate();
      this._activeCaption = null;
    }

    return null;
  }

  this._activeObject = intersects[0].object.view3dObject;
  
  if(!this._activeCaption) {

    this._activeCaption = this.getFreeCaption( this._activeObject );
    this._activeCaption.activate( this._activeObject );
  }

  return this._activeObject;
};


feng.views.sections.controls.DesignCaptions.prototype.update = function() {

  if(this._activeObject) {

    var camera = this._cameraController.activeCamera;
    var pos3d = this._activeObject.getCenter();
    var pos2d = feng.utils.ThreeUtils.get2DCoordinates( pos3d, camera, this._viewSize );

    this._activeCaption.update( pos2d.x, pos2d.y );
  }
};


feng.views.sections.controls.DesignCaptions.prototype.onMouseMove = function(e) {

  this._mousePosition.x = e.clientX;
  this._mousePosition.y = e.clientY;

  this._mouseMoveThrottle.fire();
};


feng.views.sections.controls.DesignCaptions.prototype.onAnimationFrame = function(now) {

  this._updateThrottle.fire();
};


feng.views.sections.controls.DesignCaptions.prototype.onModeChange = function(e){

  goog.base(this, 'onModeChange', e);

  if(e.mode === feng.controllers.view3d.ModeController.Mode.DESIGN) {

    this.activate();

  }else {

    this.deactivate();
  }
};