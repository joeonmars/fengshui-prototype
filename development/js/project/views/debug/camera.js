goog.provide('fengshui.views.debug.Camera');

goog.require('fengshui.views.debug.DebugView');


/**
 * @constructor
 */
fengshui.views.debug.Camera = function(){
  goog.base(this, fengshui.templates.CameraDebugView);

};
goog.inherits(fengshui.views.debug.Camera, fengshui.views.debug.DebugView);