goog.provide('feng.views.helpers.Helpers');

goog.require('feng.templates.common');
goog.require('feng.views.helpers.CompassHelper');
goog.require('feng.views.helpers.SelectorHelper');
goog.require('feng.views.helpers.WalkHelper');

/**
 * @constructor
 */
feng.views.helpers.Helpers = function(){

  goog.base(this);

  this.domElement = soy.renderAsFragment(feng.templates.common.Helpers);

  var compassHelperEl = goog.dom.getElementByClass('compass', this.domElement);
  this._compassHelper = new feng.views.helpers.CompassHelper( compassHelperEl );

  var selectorHelperEl = goog.dom.getElementByClass('selector', this.domElement);
  this._selectorHelper = new feng.views.helpers.SelectorHelper( selectorHelperEl );

  var walkHelperEl = goog.dom.getElementByClass('walk', this.domElement);
  this._walkHelper = new feng.views.helpers.WalkHelper( walkHelperEl );
};
goog.inherits(feng.views.helpers.Helpers, goog.events.EventTarget);
goog.addSingletonGetter(feng.views.helpers.Helpers);


feng.views.helpers.Helpers.prototype.activate = function() {


};


feng.views.helpers.Helpers.prototype.deactivate = function() {

  
};