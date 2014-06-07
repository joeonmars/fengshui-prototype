goog.provide('feng.views.View3DHud');

goog.require('feng.views.sections.controls.ObjectBox');


/**
 * @constructor
 */
feng.views.View3DHud = function( view3d ){

  goog.base(this);

  var cameraController = view3d.cameraController;
  var viewSize = view3d.viewSize;

  this.domElement = view3d.uiElement;

  // create hud elements
  var objectBoxEl = goog.dom.query('.objectBox', this.domElement)[0];
  this.objectBox = new feng.views.sections.controls.ObjectBox( objectBoxEl, cameraController, viewSize );
};
goog.inherits(feng.views.View3DHud, goog.events.EventTarget);