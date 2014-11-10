goog.provide('feng.views.sections.captions.ChangeColorCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.sections.captions.Caption');


/**
 * @constructor
 */
feng.views.sections.captions.ChangeColorCaption = function( object, cameraController, renderSize, controls, hud ){

  this._template = feng.templates.captions.ChangeColorCaption;
  
  this._templateData = {
  	colors: object.colors,
    tip: object.tip,
    position: 'right'
  };

  goog.base(this, object, cameraController, renderSize, controls, hud);

  this._colorEls = goog.dom.getElementsByClass('color', this.domElement);
};
goog.inherits(feng.views.sections.captions.ChangeColorCaption, feng.views.sections.captions.Caption);


feng.views.sections.captions.ChangeColorCaption.prototype.show = function() {

  goog.base(this, 'show');

  goog.array.forEach(this._colorEls, function(colorEl) {
    this._eventHandler.listen(colorEl, 'click', this.onClickColor, false, this);
  }, this);

  this._object.startInteraction();
};


feng.views.sections.captions.ChangeColorCaption.prototype.hide = function() {

  goog.base(this, 'hide');

  this._object.stopInteraction();
};


feng.views.sections.captions.ChangeColorCaption.prototype.close = function() {

  goog.Timer.callOnce(this.doClose, 600, this);
};


feng.views.sections.captions.ChangeColorCaption.prototype.onClickColor = function(e) {

  var colorName = e.currentTarget.getAttribute("data-color");

  this._object.setColorByName( colorName );
};