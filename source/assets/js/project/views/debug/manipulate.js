goog.provide('feng.views.debug.Manipulate');

goog.require('feng.views.debug.DebugView');
goog.require('feng.templates.debug');


/**
 * @constructor
 */
feng.views.debug.Manipulate = function(){
  goog.base(this, feng.templates.debug.ManipulateDebugView);

	this._viewPanelDom = goog.dom.getElementByClass('viewPanel', this.domElement);

};
goog.inherits(feng.views.debug.Manipulate, feng.views.debug.DebugView);


feng.views.debug.Manipulate.prototype.onView3DShow = function(e){

  goog.base(this, 'onView3DShow', e);

  var view3d = e.target;
  var manipulateControls = view3d.modeController.getModeControl( feng.views.View3D.Mode.MANIPULATE );
  var physics = manipulateControls.physics;

  goog.dom.removeChildren( this._viewPanelDom );
  goog.dom.appendChild( this._viewPanelDom, physics.debugCanvas );
};