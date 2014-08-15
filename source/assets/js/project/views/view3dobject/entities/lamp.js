goog.provide('feng.views.view3dobject.entities.Lamp');

goog.require('feng.fx.TextureAnimator');
goog.require('feng.models.Preload');
goog.require('feng.views.view3dobject.TipObject');


/**
 * @constructor
 * A lamp whose color can be changed
 */
feng.views.view3dobject.entities.Lamp = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._light = this.object3d.getObjectByName('light');
  this._color = this._light.color;

  this.changeColor( this._color );
};
goog.inherits(feng.views.view3dobject.entities.Lamp, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.Lamp.prototype.changeColor = function(color) {

  this._color = color;

  // TODO: animate the color
  this._light.color = color;
  this.object3d.material.color = color;
};


feng.views.view3dobject.entities.Lamp.Colors = {

};