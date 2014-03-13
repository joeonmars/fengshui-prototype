goog.provide('feng.views.interactiveobject.InteractiveObject');

goog.require('goog.array');
goog.require('feng.views.interactiveobject.View3DObject');

/**
 * @constructor
 * A 3d object that can be interacted in view3d
 */
feng.views.interactiveobject.InteractiveObject = function( object3d, interactions ){

  goog.base(this, object3d);

  this.interactions = interactions;
};
goog.inherits(feng.views.interactiveobject.InteractiveObject, feng.views.interactiveobject.View3DObject);


feng.views.interactiveobject.InteractiveObject.prototype.hasInteraction = function( interaction ){

	return goog.array.contains(this.interactions, interaction);
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