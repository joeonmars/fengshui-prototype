goog.provide('feng.views.view3dobject.TipObject');

goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * An interactive object that shall be solved as a feng-shui tip
 */
feng.views.view3dobject.TipObject = function( object3d, data ){

  goog.base(this, object3d, data);

  this.tipInteraction = data.tipInteraction;
};
goog.inherits(feng.views.view3dobject.TipObject, feng.views.view3dobject.InteractiveObject);