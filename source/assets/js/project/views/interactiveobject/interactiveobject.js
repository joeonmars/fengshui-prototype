goog.provide('feng.views.interactiveobject.InteractiveObject');

goog.require('goog.array');
goog.require('goog.events.EventTarget');

/**
 * @constructor
 * A 3d object that can be interacted in view3d
 */
feng.views.interactiveobject.InteractiveObject = function( object3d, interactions ){

  goog.base(this);

  this.object3d = object3d;
  this.interactions = interactions;
};
goog.inherits(feng.views.interactiveobject.InteractiveObject, goog.events.EventTarget);


feng.views.interactiveobject.InteractiveObject.prototype.hasInteraction = function( interaction ){

	return goog.array.contains(this.interactions, interaction);
};


feng.views.interactiveobject.InteractiveObject.prototype.getBox2 = function(){

	var box3 = new THREE.Box3().setFromObject( this.object3d );

  var min = {
  	x: box3.min.x,
  	y: box3.min.z
  };

  var max = {
  	x: box3.max.x,
  	y: box3.max.z
  };

  var box2 = new goog.math.Box(min, max);
  return box2;
};


feng.views.interactiveobject.InteractiveObject.prototype.getBox2BeforeRotation = function(){

	var rotationY = this.object3d.rotation.y;
	this.object3d.rotation.y = 0;

	var box3 = new THREE.Box3().setFromObject( this.object3d );

	this.object3d.rotation.y = rotationY;

  var min = {
  	x: box3.min.x,
  	y: box3.min.z
  };

  var max = {
  	x: box3.max.x,
  	y: box3.max.z
  };

  var box2 = new goog.math.Box(min, max);
  box2.rotation = rotationY;

  return box2;
};


/*
 * Allowed interactions
 */
feng.views.interactiveobject.InteractiveObject.Interaction = {
	MOVE: 'move',
	ROTATE: 'rotate'
};


/*
 * Classes to be created by external json data
 */
feng.views.interactiveobject.InteractiveObject.Type = {
	'door': 'feng.views.interactiveobject.Door',
	'wallpaper': 'feng.views.interactiveobject.Wallpaper'
};