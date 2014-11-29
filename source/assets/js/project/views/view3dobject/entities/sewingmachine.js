goog.provide('feng.views.view3dobject.entities.SewingMachine');

goog.require('feng.views.view3dobject.TipObject');
goog.require('feng.utils.ThreeUtils');


/**
 * @constructor
 * The sewing machine with a cover
 */
feng.views.view3dobject.entities.SewingMachine = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._isCovered = false;

  this._cover = null;
};
goog.inherits(feng.views.view3dobject.entities.SewingMachine, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.SewingMachine.prototype.init = function(){

  goog.base(this, 'init');

  this._cover = this._view3d.getView3dObject('sewingmachine-cover');
  this._cover.removeFromScene();
};


feng.views.view3dobject.entities.SewingMachine.prototype.startInteraction = function(){

  goog.base(this, 'startInteraction');

  if(!this._isCovered) {

  	this._cover.addToScene( this.object3d );

  	TweenMax.fromTo(this._cover.object3d.position, 2, {
  		'y': this._cover.object3d.position.y + 30
  	}, {
  		'y': this._cover.object3d.position.y,
  		'ease': Strong.easeInOut,
  		'onComplete': this.onCovered,
  		'onCompleteScope': this
  	});
  }
};


feng.views.view3dobject.entities.SewingMachine.prototype.onCovered = function(){

  this.unlock();
  this.stopInteraction();

  this._isCovered = true;
};