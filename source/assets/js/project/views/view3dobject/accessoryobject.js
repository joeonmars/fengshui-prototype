goog.provide('feng.views.view3dobject.AccessoryObject');

goog.require('feng.models.Accessories');
goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * An interactive object that is placeable on other holder objects, and is changeable itself
 */
feng.views.view3dobject.AccessoryObject = function( accessories ){

	var object3d = new THREE.Object3D();

	var data = {
		interactions: ['change_accessory', 'place']
	};

  goog.base(this, object3d, data);

  this.object3d.name = 'accessory-' + goog.now();
  this.object3d.interactiveObject = null;

  this._accessory = null;
  this._accessories = accessories;

	goog.array.forEach(this._accessories, function(accessory) {
		accessory.interactiveObject = this;
	}, this);

  this.changeAccessoryByIndex(0);
};
goog.inherits(feng.views.view3dobject.AccessoryObject, feng.views.view3dobject.InteractiveObject);


feng.views.view3dobject.AccessoryObject.prototype.registerHolder = function( holder, defaultAccessory ) {

	holder.updateAccessory( this );

	if(goog.isNumber(defaultAccessory)) {

		this.changeAccessoryByIndex( defaultAccessory );

	}else if(goog.isString(defaultAccessory)) {

		this.changeAccessoryByName( defaultAccessory );

	}
};


feng.views.view3dobject.AccessoryObject.prototype.changeAccessoryByIndex = function(index) {

	var accessory = this._accessories[index];
	this.changeAccessory( accessory );
};


feng.views.view3dobject.AccessoryObject.prototype.changeAccessoryByName = function(name) {

	var accessory = goog.array.find(this._accessories, function(accessory) {
		return accessory.name === name;
	});

	this.changeAccessory( accessory );
};


feng.views.view3dobject.AccessoryObject.prototype.changeAccessory = function(accessory) {

	if(this._accessory) {
		this.object3d.remove( this._accessory );
	}

	this._accessory = accessory;
	this.object3d.add( this._accessory );
};


feng.views.view3dobject.AccessoryObject.prototype.prevAccessory = function(){

	var index = goog.array.indexOf(this._accessories, this._accessory) - 1;
	if(index < 0) {
		index = this._accessories.length - 1;
	}

	this.changeAccessory( this._accessories[index] );
};


feng.views.view3dobject.AccessoryObject.prototype.nextAccessory = function(){

	var index = goog.array.indexOf(this._accessories, this._accessory) + 1;
	if(index > this._accessories.length - 1) {
		index = 0;
	}

	this.changeAccessory( this._accessories[index] );
};