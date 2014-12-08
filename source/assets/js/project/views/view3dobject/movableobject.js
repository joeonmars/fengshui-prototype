goog.provide('feng.views.view3dobject.MovableObject');

goog.require('feng.views.view3dobject.TipObject');
goog.require('feng.utils.ThreeUtils');


/**
 * @constructor
 * A tip object that can be resolved by moving to a new position
 */
feng.views.view3dobject.MovableObject = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this.dropParent = null;
  this.range = this.data.range;

  this.hasPicked = false;
  this.hasDropped = false;

  this._pickDelay = new goog.async.Delay(this.pick, 1000, this);
};
goog.inherits(feng.views.view3dobject.MovableObject, feng.views.view3dobject.TipObject);


feng.views.view3dobject.MovableObject.prototype.init = function(){

  goog.base(this, 'init');

  var dropParentObject = this._view3d.getView3dObject( this.data.parent );
  this.dropParent = dropParentObject ? dropParentObject.object3d : this._view3d.scene;
};


feng.views.view3dobject.MovableObject.prototype.getBoundingBox = function(){

  if(!this.hasPicked) {

    return goog.base(this, 'getBoundingBox');

  }else {

    // calculate bounding box of original orientation
    this.object3d.geometry.computeBoundingBox();
    var boundingBox = this.object3d.geometry.boundingBox;

    var size = boundingBox.size();
    var center = this.data.position.clone();
    center.y += size.y/2;

    this._boundingBox.setFromCenterAndSize( center, size );
    return this._boundingBox;
  }
};


feng.views.view3dobject.MovableObject.prototype.getDestination = function(){

  return this.dropParent.localToWorld( this.data.position.clone() );
};


feng.views.view3dobject.MovableObject.prototype.getCloseUpObjectWhenDropped = function(){

  return this;
};


feng.views.view3dobject.MovableObject.prototype.pick = function(){

  var arms = this._view3d.arms;
  var endOrientation = arms.getWorldOrientation( this.name );
  var endPosition = endOrientation.position;
  var endRotation = endOrientation.rotation;
  var startPosition = this.object3d.position;
  var startRotation = this.object3d.rotation;

  var prop = {
    t: 0
  };

  var position = new THREE.Vector3();
  var rotation = new THREE.Euler();

  TweenMax.to( prop, 2, {
    t: 1,
    'ease': Sine.easeIn,
    'onUpdate': function() {
      
      position = position.copy(startPosition).lerp(endPosition, prop.t);
      this.object3d.position.copy( position );

      rotation = feng.utils.ThreeUtils.getLerpedEuler( startRotation, endRotation, prop.t, rotation );
      this.object3d.rotation.copy( rotation );
    },
    'onUpdateScope': this,
    'onComplete': this.onPicked,
    'onCompleteScope': this
  });
};


feng.views.view3dobject.MovableObject.prototype.drop = function(){

  var arms = this._view3d.arms;
  arms.removeItem( this );

  this.dropParent.add( this.object3d );

  //
  var startOrientation = arms.getWorldOrientation( this.name );
  var worldPosition = startOrientation.position;
  var worldRotation = startOrientation.rotation;

  var startPosition = feng.utils.ThreeUtils.getLocalPositionOfWorld( this.dropParent, worldPosition );
  var startRotation = feng.utils.ThreeUtils.getLocalRotationOfWorld( this.dropParent, worldRotation );

  var endPosition = this.data.position.clone().setY( this.data.position.y + 10 );
  var endRotation = this.data.rotation;

  var prop = {
    t: 0
  };

  var position = new THREE.Vector3();
  var rotation = new THREE.Euler();

  TweenMax.to( prop, 1, {
    t: 1,
    'immediateRender': true,
    'ease': Sine.easeInOut,
    'onUpdate': function() {
      
      position = position.copy(startPosition).lerp(endPosition, prop.t);
      this.object3d.position.copy( position );

      rotation = feng.utils.ThreeUtils.getLerpedEuler( startRotation, endRotation, prop.t, rotation );
      this.object3d.rotation.copy( rotation );
    },
    'onUpdateScope': this
  });

  TweenMax.to( this.object3d.position, 1, {
    'y': this.data.position.y,
    'delay': 1.5,
    'ease': Bounce.easeOut,
    'onComplete': this.onDropped,
    'onCompleteScope': this
  });
};


feng.views.view3dobject.MovableObject.prototype.startInteraction = function(){

  goog.base(this, 'startInteraction');

  this._pickDelay.start();
};


feng.views.view3dobject.MovableObject.prototype.stopInteraction = function(){

  goog.base(this, 'stopInteraction');

  this._pickDelay.stop();
};


feng.views.view3dobject.MovableObject.prototype.onPicked = function(){

  this.hasPicked = true;

  var arms = this._view3d.arms;
  arms.addItem( this );

  var closeUpControls = this._view3d.modeController.getModeControl( feng.controllers.view3d.ModeController.Mode.CLOSE_UP );
  closeUpControls.close();
};


feng.views.view3dobject.MovableObject.prototype.onDropped = function(){

  this.hasDropped = true;

  this.unlock();
};


feng.views.view3dobject.MovableObject.prototype.onCameraIn = function(){

  if(this.hasDropped) {

    this.cameraInDuration = 1000;

  }else if(!this.hasPicked) {

    this.cameraInDuration = 1000;

  }else if(this.hasPicked && !this.hasDropped) {

    this.cameraInDuration = 3000;

    this.drop();
  }

  goog.base(this, 'onCameraIn');
};