goog.provide('feng.models.avatar.Avatar');

goog.require('goog.object');
goog.require('goog.math');


/**
 * @constructor
 */
feng.models.avatar.Avatar = function( avatarName, settings ){

  this.name = avatarName;
  this.settings = settings;

  var canvas = goog.dom.createDom('canvas');
  canvas.width = feng.models.avatar.Avatar.Size.width;
  canvas.height = feng.models.avatar.Avatar.Size.height;

  this._texture = new createjs.Stage( canvas );
  this._texture.enableDOMEvents(false);

  goog.object.forEach(this.settings, function(value, appearance) {
  	this.setAppearance(appearance, value);
  }, this);
};


feng.models.avatar.Avatar.prototype.setAppearance = function( appearance, value ) {

	this.settings[appearance] = value;
};


feng.models.avatar.Avatar.prototype.generateTexture = function() {

	var canvas = this._texture.canvas;
};


feng.models.avatar.Avatar.Appearance = {
	SKIN: 'skin',
	HAIR: 'hair',
	HAIR_COLOR: 'hair_color',
	EYES: 'eyes',
	EYES_COLOR: 'eyes_color',
	NOSE: 'nose',
	LIPS: 'lips',
	COSTUME: 'costume',
	HAT: 'hat',
	GLASSES: 'glasses'
};


feng.models.avatar.Avatar.Color = {
	BLACK: [0, 0, 0],
	GRAY: [130, 130, 130],
	WHITE: [240, 240, 240],
	BLOND: [255, 219, 126],
	BROWN: [110, 74, 28],
	RED: [152, 38, 43],
	BLUE: [106, 177, 217],
	GREEN: [100, 201, 166],
	ASIAN: [225, 196, 147],
	CAUCASIAN: [255, 211, 190],
	AMERICAN: [84, 50, 36],
	AFRICAN: [41, 33, 30]
};


feng.models.avatar.Avatar.Size = new goog.math.Size(400, 700);