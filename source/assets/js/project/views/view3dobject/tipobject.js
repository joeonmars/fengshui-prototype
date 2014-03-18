goog.provide('feng.views.view3dobject.TipObject');

goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * An interactive object that carries a feng-shui tip
 */
feng.views.view3dobject.TipObject = function( object3d, interactions ){

  goog.base(this, object3d, interactions);

};
goog.inherits(feng.views.view3dobject.TipObject, feng.views.view3dobject.InteractiveObject);