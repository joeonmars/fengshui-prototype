goog.provide('feng.views.view3dobject.HolderObject');

goog.require('feng.views.view3dobject.TipObject');

/**
 * @constructor
 * A holder to be tipped for changing its accessories or receiving objects
 */
feng.views.view3dobject.HolderObject = function( object3d, data, view3d ){

	goog.base(this, object3d, data, view3d);

	this._type = data.holderType || feng.views.view3dobject.HolderObject.Type.OBJECT;

	this._holder = this.object3d.getObjectByName('holder');

	if(!this._holder) {
		this.createHolder();
	}

	if(this._type === feng.views.view3dobject.HolderObject.Type.ACCESSORY) {

		var accessories = view3d.accessories;
		var defaultAccessory = 'empty';

		this.accessory = new feng.views.view3dobject.AccessoryObject( accessories, this, defaultAccessory, view3d );
		
		var changeAccessory = feng.views.view3dobject.InteractiveObject.Interaction.CHANGE_ACCESSORY;
		this.interactions.push(changeAccessory);

	}else if(this._type === feng.views.view3dobject.HolderObject.Type.OBJECT) {


	}
};
goog.inherits(feng.views.view3dobject.HolderObject, feng.views.view3dobject.TipObject);


feng.views.view3dobject.HolderObject.prototype.createHolder = function(){

	this._holder = new THREE.Object3D();
	this._holder.name = 'holder';
	this.object3d.add( this._holder );
};


feng.views.view3dobject.HolderObject.prototype.enableRender = function(){

	goog.base(this, 'enableRender');

	var children = this._holder.children;

	goog.array.forEach(children, function(object3d) {

		var view3dObject = object3d.view3dObject;
		if(view3dObject) {
			view3dObject.enableRender();
		}
	});
};


feng.views.view3dobject.HolderObject.prototype.disableRender = function(){

	goog.base(this, 'disableRender');

	var children = this._holder.children;
	
	goog.array.forEach(children, function(object3d) {

		var view3dObject = object3d.view3dObject;
		if(view3dObject) {
			view3dObject.disableRender();
		}
	});
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