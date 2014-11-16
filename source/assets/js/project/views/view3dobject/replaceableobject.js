goog.provide('feng.views.view3dobject.ReplaceableObject');

goog.require('feng.views.view3dobject.TipObject');

/**
 * @constructor
 * A holder to replace its content (mesh)
 */
feng.views.view3dobject.ReplaceableObject = function( object3d, data, view3d ){

	goog.base(this, object3d, data, view3d);

	// create assets loader
	this._loader = new createjs.LoadQueue(true, feng.Config['assetsPath']);
  	createjs.LoadQueue.loadTimeout = 100000;

	this._onLoadComplete = goog.bind(this.onLoadComplete, this);
	this._onLoadError = goog.bind(this.onLoadError, this);

	// object storage
	this._currentObject = this.object3d.children[0];

	this._objects = {};
	this._objects[this._currentObject.name] = this._currentObject;
};
goog.inherits(feng.views.view3dobject.ReplaceableObject, feng.views.view3dobject.TipObject);


feng.views.view3dobject.ReplaceableObject.prototype.change = function( objectId ){

	if(this._objects[objectId]) {

		this.updateObject( object3d );
		return;
	}

	this._loader.removeAllEventListeners();

	this._loader.addEventListener("complete", this._onLoadComplete);
	this._loader.addEventListener("error", this._onLoadError);

	this._loader.loadManifest({
		'data': 'json/repleaceable/' + objectId + '.json',
		'texture': 'images/texture/repleaceable/' + objectId + '.jpg'
	});

	//
};


feng.views.view3dobject.ReplaceableObject.prototype.updateObject = function( object3d ){

	this.object3d.remove( this._currentObject );
	this._currentObject = object3d;
	this.object3d.add( object3d );
};


feng.views.view3dobject.ReplaceableObject.prototype.onLoadComplete = function( e ){


	this.unlock();
};


feng.views.view3dobject.ReplaceableObject.prototype.onLoadError = function( e ){


};