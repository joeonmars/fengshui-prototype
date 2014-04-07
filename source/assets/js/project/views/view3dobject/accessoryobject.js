goog.provide('feng.views.view3dobject.AccessoryObject');

goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * An interactive object that is placeable on other holder objects
 */
feng.views.view3dobject.AccessoryObject = function( object3d, data ){

  goog.base(this, object3d, data);

	var place = feng.views.view3dobject.InteractiveObject.Interaction.PLACE;
	if(!goog.array.contains(this.interactions, place)) {
		this.interactions.push(place);
	}

  this.holder = null;
};
goog.inherits(feng.views.view3dobject.AccessoryObject, feng.views.view3dobject.InteractiveObject);