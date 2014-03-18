goog.provide('feng.views.view3dobject.HolderObject');

goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * An interactive object that can hold accessories
 */
feng.views.view3dobject.HolderObject = function( object3d, interactions ){

	var changeAccessory = feng.views.view3dobject.InteractiveObject.Interaction.CHANGE_ACCESSORY;
	if(!goog.array.contains(interactions, changeAccessory)) {
		interactions.push(changeAccessory);
	}

  goog.base(this, object3d, interactions);

  this.interactions = interactions;

  this.accessories = [];
  this.accessory = null;

  this._holder = this.object3d.getObjectByName('holder');
};
goog.inherits(feng.views.view3dobject.HolderObject, feng.views.view3dobject.InteractiveObject);


feng.views.view3dobject.HolderObject.prototype.getAccessoryByName = function( name ){

	var accessory = goog.array.find(this.accessories, function(accessory) {
		return (accessory.object3d.name === name);
	});
};


feng.views.view3dobject.HolderObject.prototype.addAccessory = function( accessory ){

	var index = this.accessory ? goog.array.indexOf(this.accessories, this.accessory) : 0;
	goog.array.insertAt(this.accessories, accessory, index + 1);

	accessory.hide();
	this_holder.add( accessory.object3d );
};


feng.views.view3dobject.HolderObject.prototype.removeAccessory = function( accessory ){

	var index = goog.array.indexOf(this.accessories, this.accessory);
	goog.array.remove(this.accessories, accessory);

	accessory.show();
	this_holder.remove( accessory.object3d );

	this.accessory = (this.accessories.length > 0) ? this.accessories[index] : null;
};


feng.views.view3dobject.HolderObject.prototype.removeAccessoryByName = function( name ){

	var accessory = this.getAccessoryByName(name);
	this.removeAccessory( accessory );
};


feng.views.view3dobject.HolderObject.prototype.setAccessory = function( accessory ){

	goog.array.forEach(this.accessories, function(accessory) {
		accessory.hide();
	});

	this.accessory = accessory;
	this.accessory.show();
};


feng.views.view3dobject.HolderObject.prototype.prevAccessory = function(){

	var index = goog.array.indexOf(this.accessories, this.accessory) - 1;
	if(index < 0) {
		index = this.accessories.length - 1;
	}

	this.setAccessory( this.accessories[index] );
};


feng.views.view3dobject.HolderObject.prototype.nextAccessory = function(){

	var index = goog.array.indexOf(this.accessories, this.accessory) + 1;
	if(index > this.accessories.length - 1) {
		index = 0;
	}

	this.setAccessory( this.accessories[index] );
};