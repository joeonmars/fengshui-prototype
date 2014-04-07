goog.provide('feng.views.view3dobject.InteractiveObject');

goog.require('feng.views.view3dobject.View3DObject');

/**
 * @constructor
 * A 3d object that can be interacted in view3d
 */
feng.views.view3dobject.InteractiveObject = function( object3d, data ){

  goog.base(this, object3d, data);

  this.interactions = this.data.interactions || [];
};
goog.inherits(feng.views.view3dobject.InteractiveObject, feng.views.view3dobject.View3DObject);


feng.views.view3dobject.InteractiveObject.prototype.hasInteraction = function( interaction ){

	return goog.array.contains(this.interactions, interaction);
};


/*
 * Interactions
 */
feng.views.view3dobject.InteractiveObject.Interaction = {
	MOVE: 'move',
	ROTATE: 'rotate',
  PLACE: 'place',
  CHANGE_ACCESSORY: 'change_accessory',
  ENTER: 'enter'
};