goog.provide('feng.views.view3dobject.entities.Cat');

goog.require('feng.views.view3dobject.TipObject');

/**
 * @constructor
 * The cat sleeping in house corridor
 */
feng.views.view3dobject.entities.Cat = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._cat = this.object3d.getObjectByName('cat');

  this._sleepTweener = TweenMax.to(this._cat.scale, 4, {
    'y': 1.04,
    'repeat': -1,
    'repeatDelay': 0.5,
    'yoyo': true,
    'paused': true,
    'ease': Sine.easeInOut
  });
};
goog.inherits(feng.views.view3dobject.entities.Cat, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.Cat.prototype.onCameraIn = function(){

  goog.base(this, 'onCameraIn');

  this._sleepTweener.play();

  //feng.soundController.playSfx('refrigerator-open');
};


feng.views.view3dobject.entities.Cat.prototype.onCameraOut = function(){

  goog.base(this, 'onCameraOut');

  this._sleepTweener.pause();

  /*
  TweenMax.delayedCall(.8, function() {
    //feng.soundController.playSfx('refrigerator-close');
  }, [], this);
	*/
};