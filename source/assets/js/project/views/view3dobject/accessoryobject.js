goog.provide('feng.views.view3dobject.AccessoryObject');

goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * An interactive object that is placeable on other holder objects
 */
feng.views.view3dobject.AccessoryObject = function( object3d, interactions ){

	var place = feng.views.view3dobject.InteractiveObject.Interaction.PLACE;
	if(!goog.array.contains(interactions, place)) {
		interactions.push(place);
	}

  goog.base(this, object3d, interactions);

  this.interactions = interactions;

  this.holder = null;
};
goog.inherits(feng.views.view3dobject.AccessoryObject, feng.views.view3dobject.InteractiveObject);