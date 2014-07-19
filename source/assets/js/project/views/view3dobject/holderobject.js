goog.provide('feng.views.view3dobject.HolderObject');

goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * An interactive object that can hold accessories
 */
feng.views.view3dobject.HolderObject = function( object3d, data, view3d ){

	goog.base(this, object3d, data, view3d);

	var changeAccessory = feng.views.view3dobject.InteractiveObject.Interaction.CHANGE_ACCESSORY;
	this.interactions.push(changeAccessory);

	this.accessory = null;

	this._holder = this.object3d.getObjectByName('holder');
};
goog.inherits(feng.views.view3dobject.HolderObject, feng.views.view3dobject.InteractiveObject);


feng.views.view3dobject.HolderObject.prototype.enableRender = function(){

	goog.base(this, 'enableRender');

	if(this.accessory) this.accessory.enableRender();
};


feng.views.view3dobject.HolderObject.prototype.updateAccessory = function( accessory ){

	this.accessory = accessory;

	if(this.accessory) {
		this._holder.add( this.accessory.object3d );
	}
};