goog.provide('feng.views.view3dobject.MovableObject');

goog.require('feng.views.view3dobject.TipObject');
goog.require('feng.utils.ThreeUtils');


/**
 * @constructor
 * A tip object that can be resolved by moving to a new position
 */
feng.views.view3dobject.MovableObject = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  var dropParentObject = this._view3d.getView3dObject( this.data.parent );
  this._dropParent = dropParentObject ? dropParentObject.object3d : this._view3d.scene;

  this._dropPosition = new THREE.Vector3();
};
goog.inherits(feng.views.view3dobject.MovableObject, feng.views.view3dobject.TipObject);


feng.views.view3dobject.MovableObject.prototype.getDestination = function(){

  return this._dropParent.localToWorld( this.data.position.clone() );
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

  //this.object3d.position.copy( this.data.position );
  //this.object3d.rotation.copy( this.data.rotation );

  this._dropParent.add( this.object3d );

  //
  var startOrientation = arms.getWorldOrientation( this.name );
  var startPosition = startOrientation.position;
  var startRotation = startOrientation.rotation;
  var endPosition = this.data.position.clone().setY( this.data.position.y + 10 );
  var endRotation = this.data.rotation;

  var prop = {
    t: 0
  };

  var position = new THREE.Vector3();
  var rotation = new THREE.Euler();

  TweenMax.to( prop, 1, {
    t: 1,
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

  this._interactionHandler.listen(this._view3d.domElement, 'click', this.onClick, false, this);
};


feng.views.view3dobject.MovableObject.prototype.onPicked = function(){

  var arms = this._view3d.arms;
  arms.addItem( this );

  var closeUpControls = this._view3d.modeController.getModeControl( feng.controllers.view3d.ModeController.Mode.CLOSE_UP );
  closeUpControls.close();
};


feng.views.view3dobject.MovableObject.prototype.onDropped = function(){

  this.unlock();

  var browseControls = this._view3d.modeController.getModeControl( feng.controllers.view3d.ModeController.Mode.BROWSE );
  
  browseControls.dispatchEvent({
    type: feng.events.EventType.CHANGE,
    mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
    nextMode: feng.controllers.view3d.ModeController.Mode.CLOSE_UP,
    object: this.getCloseUpObjectWhenDropped()
  });
};


feng.views.view3dobject.MovableObject.prototype.onClick = function(e){

  var camera = this._view3d.cameraController.activeCamera;
  var viewSize = this._view3d.viewSize;
  var clickedObjects = feng.utils.ThreeUtils.getObjectsBy2DPosition( e.clientX, e.clientY, [this.object3d], camera, viewSize );
  
  if(clickedObjects.length > 0) {

    this.pick();
  }
};