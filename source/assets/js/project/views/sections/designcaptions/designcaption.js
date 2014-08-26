goog.provide('feng.views.sections.designcaptions.DesignCaption');

goog.require('goog.events.EventHandler');


/**
 * @constructor
 */
feng.views.sections.designcaptions.DesignCaption = function( domElement ){

  goog.base(this);

  this.domElement = domElement;
  this.activeObject = null;
};
goog.inherits(feng.views.sections.designcaptions.DesignCaption, goog.events.EventTarget);


feng.views.sections.designcaptions.DesignCaption.prototype.activate = function( activeObject ) {

  this.activeObject = activeObject;
};


feng.views.sections.designcaptions.DesignCaption.prototype.deactivate = function() {

  this.activeObject = null;
};


feng.views.sections.designcaptions.DesignCaption.prototype.update = function(x, y) {

  goog.style.setStyle(this.domElement, 'transform', 'translateX(' + x + 'px) translateY(' + y + 'px)');
};