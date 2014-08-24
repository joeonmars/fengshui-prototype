goog.provide('feng.views.view3dobject.HolderObject');

goog.require('feng.views.view3dobject.TipObject');

/**
 * @constructor
 * A holder to be tipped for changing its accessories or receiving objects
 */
feng.views.view3dobject.HolderObject = function( object3d, data, view3d ){

	goog.base(this, object3d, data, view3d);

	this._type = data.holderType;

	this._holder = this.object3d.getObjectByName('holder');

	if(this._type === feng.views.view3dobject.HolderObject.Type.ACCESSORY) {

		var accessories = view3d.accessories;
		var defaultAccessory = 'empty';
		
		this.accessory = new feng.views.view3dobject.AccessoryObject( accessories, this, defaultAccessory, view3d );
		
		var changeAccessory = feng.views.view3dobject.TipObject.Interaction.CHANGE_ACCESSORY;
		this.interactions.push(changeAccessory);

	}else if(this._type === feng.views.view3dobject.HolderObject.Type.OBJECT) {



	}else {

		throw new Error('No holder type specified.');
	}
};
goog.inherits(feng.views.view3dobject.HolderObject, feng.views.view3dobject.TipObject);


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


feng.views.view3dobject.HolderObject.Type = {
	ACCESSORY: 'accessory',
	OBJECT: 'object'
};