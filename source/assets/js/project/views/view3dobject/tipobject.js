goog.provide('feng.views.view3dobject.TipObject');

goog.require('feng.models.achievements.Achievements');
goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * An interactive object that shall be solved as a feng-shui tip
 */
feng.views.view3dobject.TipObject = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this.tipInteraction = data.tipInteraction;

  // get tip model
  var tipKeys = data.tipKey.split('.');
  var tipId = tipKeys[2];
  var viewId = tipKeys[1];
  var sectionId = tipKeys[0];
  this.tip = feng.models.achievements.Achievements.getInstance().getTip(tipId, viewId, sectionId);
};
goog.inherits(feng.views.view3dobject.TipObject, feng.views.view3dobject.InteractiveObject);