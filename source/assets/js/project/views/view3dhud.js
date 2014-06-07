goog.provide('feng.views.View3DHud');

goog.require('feng.views.sections.controls.ObjectBox');
goog.require('feng.views.sections.controls.ObjectSelector');


/**
 * @constructor
 */
feng.views.View3DHud = function( view3d ){

  goog.base(this);

  var cameraController = view3d.cameraController;
  var viewSize = view3d.viewSize;

  this.domElement = view3d.uiElement;

  // create hud elements
  var objectBoxEl = goog.dom.getElementByClass('objectBox', this.domElement);
  this.objectBox = new feng.views.sections.controls.ObjectBox( objectBoxEl, cameraController, viewSize );

  var objectSelectorEl = goog.dom.getElementByClass('objectSelector', this.domElement);
  var renderEl = view3d.domElement;
  this.objectSelector = new feng.views.sections.controls.ObjectSelector( objectSelectorEl, renderEl );
};
goog.inherits(feng.views.View3DHud, goog.events.EventTarget);