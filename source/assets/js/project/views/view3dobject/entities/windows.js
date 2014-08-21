goog.provide('feng.views.view3dobject.entities.Windows');

goog.require('feng.fx.TextureAnimator');
goog.require('feng.views.view3dobject.TipObject');


/**
 * @constructor
 * Two windows that can be opened or closed
 */
feng.views.view3dobject.entities.Windows = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._windowLeft = null;
  this._windowRight = null;
};
goog.inherits(feng.views.view3dobject.entities.Windows, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.Windows.prototype.init = function(){

  this._windowLeft = this.object3d.getObjectByName('window-left').view3dObject;
  this._windowRight = this.object3d.getObjectByName('window-right').view3dObject;
};