goog.provide('feng.views.debug.Manipulate');

goog.require('feng.views.debug.DebugView');
goog.require('feng.templates.debug');


/**
 * @constructor
 */
feng.views.debug.Manipulate = function(){
  goog.base(this, feng.templates.debug.ManipulateDebugView);

	this._viewPanelDom = goog.dom.getElementByClass('viewPanel', this.domElement);

	this.hide();
};
goog.inherits(feng.views.debug.Manipulate, feng.views.debug.DebugView);