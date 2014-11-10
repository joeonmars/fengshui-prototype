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

  goog.base(this, 'onCameraIn');

  TweenMax.to(this.object3d.position, 1, {
    'z': this._startZ + 20,
    'ease': Quad.easeInOut
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