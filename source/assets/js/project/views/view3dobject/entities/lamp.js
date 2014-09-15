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

  this.colors = {};

  var colors = feng.views.view3dobject.entities.Lamp.Colors;

  goog.array.forEach( data.colors, function(colorKey) {

  	this.colors[ colorKey ] = {
  		color: colors[ colorKey ],
  		hex: '#' + colors[ colorKey ].getHexString()
  	}
  }, this);

  this._color = this._light.color.clone();

  this.setColor( this._color );
};
goog.inherits(feng.views.view3dobject.entities.Lamp, feng.views.view3dobject.TipObject);


feng.views.view3dobject.entities.Lamp.prototype.setColor = function(color) {

  var startColor = this._color.clone();

  var prop = {
  	t: 0
  };

  TweenMax.to(prop, .8, {
  	t: 1,
  	ease: Expo.easeOut,
  	onUpdate: function() {
  		var c = startColor.clone().lerp( color, prop.t );
  		this._color.copy( c );
  		this._light.color.copy( c );
  		this.object3d.material.color.copy( c );
  	},
  	onUpdateScope: this
  });

  this.unlockReady();
};


feng.views.view3dobject.entities.Lamp.prototype.setColorByName = function(name) {

	var color = feng.views.view3dobject.entities.Lamp.Colors[ name ];
	this.setColor( color );
};


feng.views.view3dobject.entities.Lamp.Colors = {
	"pink": new THREE.Color().set( '#ed6464' ),
	"yellow": new THREE.Color().set( '#ffd700' ),
	"white": new THREE.Color().set( '#ffffff' ),
	"orange": new THREE.Color().set( '#ffb35d' )
};