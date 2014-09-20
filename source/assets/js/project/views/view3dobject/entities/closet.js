goog.provide('feng.views.view3dobject.entities.Closet');

goog.require('feng.models.Preload');
goog.require('feng.views.view3dobject.TipObject');
goog.require('feng.utils.ThreeUtils');


/**
 * @constructor
 * The bathroom closet storing jars to be re-arranged
 */
feng.views.view3dobject.entities.Closet = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._door = this.object3d.getObjectByName('closet-door');
  console.log(this.tip)
};
goog.inherits(feng.views.view3dobject.entities.Closet, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.Closet.prototype.startInteraction = function(){

  goog.base(this, 'startInteraction');

  this._interactionHandler.listen(this._view3d.domElement, 'click', this.onClick, false, this);
};


feng.views.view3dobject.entities.Closet.prototype.onCameraIn = function(){

  goog.base(this, 'onCameraIn');

  TweenMax.to(this._door.rotation, 1, {
    'y': -2.8,
    'ease': Quad.easeInOut
  });

  //feng.soundController.playSfx('refrigerator-open');
};


feng.views.view3dobject.entities.Closet.prototype.onCameraOut = function(){

  goog.base(this, 'onCameraOut');

  TweenMax.to(this._door.rotation, 1, {
    'y': 0,
    'ease': Quad.easeInOut
  });

  TweenMax.delayedCall(.8, function() {
    //feng.soundController.playSfx('refrigerator-close');
  });
};


feng.views.view3dobject.entities.Closet.prototype.onClick = function(e){

};