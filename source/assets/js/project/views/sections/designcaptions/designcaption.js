goog.provide('feng.views.sections.designcaptions.DesignCaption');

goog.require('goog.async.Delay');
goog.require('goog.dom.classes');
goog.require('goog.events.EventHandler');


/**
 * @constructor
 */
feng.views.sections.designcaptions.DesignCaption = function( domElement ){

  goog.base(this);

  this.domElement = domElement;

  this.activeObject = null;

  this._deactivateDelay = new goog.async.Delay(this.doDeactivate, 200, this);
  this._deactivateDelay.fire();
};
goog.inherits(feng.views.sections.designcaptions.DesignCaption, goog.events.EventTarget);


feng.views.sections.designcaptions.DesignCaption.prototype.activate = function( activeObject ) {

  this.activeObject = activeObject;

  goog.dom.classes.remove(this.domElement, 'hidden');
  goog.dom.classes.add(this.domElement, 'show');

  this._deactivateDelay.stop();
};


feng.views.sections.designcaptions.DesignCaption.prototype.deactivate = function() {

  this._deactivateDelay.start();
};


feng.views.sections.designcaptions.DesignCaption.prototype.doDeactivate = function() {

  this.activeObject = null;

  goog.dom.classes.remove(this.domElement, 'show');
  goog.dom.classes.add(this.domElement, 'hidden');
};


feng.views.sections.designcaptions.DesignCaption.prototype.update = function(x, y) {

  goog.style.setPosition(this.domElement, x, y);
};