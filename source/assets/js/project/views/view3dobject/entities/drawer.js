goog.provide('feng.views.view3dobject.entities.Drawer');

goog.require('feng.views.view3dobject.TipObject');

/**
 * @constructor
 * The house kitchen drawer where the knife is put
 */
feng.views.view3dobject.entities.Drawer = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._startZ = this.object3d.position.z;
};
goog.inherits(feng.views.view3dobject.entities.Drawer, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.Drawer.prototype.onCameraIn = function(){

  var knife = this._view3d.tipObjects['knife'];

  this.cameraInDuration = (knife.hasPicked && !this.tip.unlocked) ? 4000 : 2000;

  goog.base(this, 'onCameraIn');

  TweenMax.to(this.object3d.position, 1, {
    'z': this._startZ + 20,
    'ease': Quad.easeInOut,
    'onComplete': this.onDrawerOpened,
    'onCompleteScope': this
  });

  //feng.soundController.playSfx('refrigerator-open');
};


feng.views.view3dobject.entities.Drawer.prototype.onCameraOut = function(){

  goog.base(this, 'onCameraOut');

  TweenMax.to(this.object3d.position, 1, {
    'z': this._startZ,
    'ease': Quad.easeInOut
  });

  /*
  TweenMax.delayedCall(.8, function() {
    //feng.soundController.playSfx('refrigerator-close');
  }, [], this);
	*/
};


feng.views.view3dobject.entities.Drawer.prototype.onDrawerOpened = function(){

  if(this.tip.unlocked) return;

  goog.Timer.callOnce(function() {

    var knife = this._view3d.tipObjects['knife'];

    if(knife.hasPicked) {
      knife.drop();
    }
  }, 400, this);
};