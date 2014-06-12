goog.provide('feng.views.view3dobject.AccessoryObject');

goog.require('feng.models.Accessories');
goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * An interactive object that is placeable on other holder objects, and is changeable itself
 */
feng.views.view3dobject.AccessoryObject = function( accessories, holder, defaultAccessory, view3d ){

	var object3d = new THREE.Object3D();

	var data = {
		interactions: ['change_accessory', 'place', 'rotate']
	};

  goog.base(this, object3d, data, view3d);

  this.isPhysical = false;

  this.object3d.name = 'accessory-' + goog.now();
  this.object3d.interactiveObject = null;

	this._emptyAccessory = new THREE.Object3D();
	this._emptyAccessory.name = "empty";

  this._accessory = null;
  this._accessories = accessories.concat();
  this._accessories.push( this._emptyAccessory );

  this._availableAccessories = this.getAvailableAccessories();

	this.holder = this.registerHolder( holder, defaultAccessory || 0 );
};
goog.inherits(feng.views.view3dobject.AccessoryObject, feng.views.view3dobject.InteractiveObject);


feng.views.view3dobject.AccessoryObject.prototype.registerHolder = function( holder, defaultAccessory ) {

	this.holder = holder;
	this.holder.updateAccessory( this );

	if(goog.isNumber(defaultAccessory)) {

		this.changeAccessoryByIndex( defaultAccessory );

	}else if(goog.isString(defaultAccessory)) {

		this.changeAccessoryByName( defaultAccessory );

	}

	return this.holder;
};


feng.views.view3dobject.AccessoryObject.prototype.getAvailableAccessories = function() {

	// return non-parent accessories and the empty accessory
	var availables = goog.array.filter(this._accessories, function(accessory) {
		return (!accessory.parent || accessory === this._accessory || accessory === this._emptyAccessory);
	}, this);

	return availables;
};


feng.views.view3dobject.AccessoryObject.prototype.changeAccessoryByIndex = function(index) {

	this._availableAccessories = this.getAvailableAccessories();

	var accessory = this._availableAccessories[index];
	this.changeAccessory( accessory );
};


feng.views.view3dobject.AccessoryObject.prototype.changeAccessoryByName = function(name) {

	this._availableAccessories = this.getAvailableAccessories();

	var accessory = goog.array.find(this._availableAccessories, function(accessory) {
		return accessory.name === name;
	});

	this.changeAccessory( accessory );
};


feng.views.view3dobject.AccessoryObject.prototype.changeAccessory = function(accessory) {

	if(this._accessory) {
		this.object3d.remove( this._accessory );
	}

	this._accessory = accessory;
	this._accessory.interactiveObject = this;

	this.object3d.add( this._accessory );
};


feng.views.view3dobject.AccessoryObject.prototype.prevAccessory = function(){

	this._availableAccessories = this.getAvailableAccessories();

	var index = goog.array.indexOf(this._availableAccessories, this._accessory) - 1;
	if(index < 0) {
		index = this._availableAccessories.length - 1;
	}

	this.changeAccessory( this._availableAccessories[index] );
};


feng.views.view3dobject.AccessoryObject.prototype.nextAccessory = function(){

	this._availableAccessories = this.getAvailableAccessories();

	var index = goog.array.indexOf(this._availableAccessories, this._accessory) + 1;
	if(index > this._availableAccessories.length - 1) {
		index = 0;
	}

	this.changeAccessory( this._availableAccessories[index] );
};