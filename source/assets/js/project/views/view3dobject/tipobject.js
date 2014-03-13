goog.provide('feng.views.interactiveobject.TipObject');

goog.require('feng.views.interactiveobject.InteractiveObject');

/**
 * @constructor
 * An interactive object that carries a feng-shui tip
 */
feng.views.interactiveobject.TipObject = function( object3d, interactions ){

  goog.base(this, object3d, interactions);

};
goog.inherits(feng.views.interactiveobject.TipObject, feng.views.interactiveobject.InteractiveObject);