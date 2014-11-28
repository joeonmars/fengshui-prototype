goog.provide('feng.views.view3dobject.entities.Lamp');

goog.require('feng.fx.TextureAnimator');
goog.require('feng.models.Preload');
goog.require('feng.views.view3dobject.TipObject');


/**
 * @constructor
 * A lamp whose color should be changed
 */
feng.views.view3dobject.entities.Lamp = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  this._light = this.object3d.getObjectByName('light');

  this._defaultColor = this._light.color;
  this._color = this._defaultColor.clone();
  this._toColor = new THREE.Color();

  this.setColor( this._color );
};
goog.inherits(feng.views.view3dobject.entities.Lamp, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.Lamp.prototype.setColor = function(hex) {

  var startHex = this._color.getHex();
  var toColor = this._toColor.set( hex );

  var prop = {
  	t: 0
  };

  TweenMax.to(prop, .8, {
  	t: 1,
  	'ease': Expo.easeOut,
  	'onUpdate': function() {
  		this._color.set(startHex).lerp( this._toColor, prop.t );
  		this._light.color.copy( this._color );
  		this.object3d.material.color.copy( this._color );
  	},
  	'onUpdateScope': this
  });

  if(!toColor.equals( this._defaultColor )) {
    this.unlock();
  }
};


feng.views.view3dobject.entities.Lamp.prototype.setColorByName = function(name) {

	var hex = this.tip.details['colors'][name]['hex'];
	this.setColor( hex );
};