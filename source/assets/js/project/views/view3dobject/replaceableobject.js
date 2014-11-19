goog.provide('feng.views.view3dobject.ReplaceableObject');

goog.require('feng.views.view3dobject.TipObject');
goog.require('feng.utils.ThreeUtils');

/**
 * @constructor
 * A holder to replace its content (mesh)
 */
feng.views.view3dobject.ReplaceableObject = function( object3d, data, view3d ){

	goog.base(this, object3d, data, view3d);

	// create assets loader
	this._loader = new createjs.LoadQueue(true);
  	createjs.LoadQueue.loadTimeout = 100000;

	this._onLoadComplete = goog.bind(this.onLoadComplete, this);
	this._onLoadError = goog.bind(this.onLoadError, this);

	// object storage
	this._object = this.object3d.children[0];

	this.objects = {};

	goog.array.forEach( data.objects, function(objectKey) {
		this.objects[ objectKey ] = null;
	}, this);

	//
	this._idToLoad = null;
};
goog.inherits(feng.views.view3dobject.ReplaceableObject, feng.views.view3dobject.TipObject);


feng.views.view3dobject.ReplaceableObject.prototype.change = function( objectId ){

	if(this.objects[objectId]) {

		this.updateObject( this.objects[objectId] );
		return;
	}

	this._idToLoad = objectId;

	this._loader.removeAll();
	this._loader.removeAllEventListeners();

	this._loader.addEventListener("complete", this._onLoadComplete);
	this._loader.addEventListener("error", this._onLoadError);

	this._loader.loadManifest([
		{
			'src': feng.Config['assetsPath'] + 'json/replaceable/' + objectId + '.json',
			'id': 'data'
		},
		{
			'src': feng.Config['assetsPath'] + 'images/texture/replaceable/' + objectId + '.jpg',
			'id': 'texture'
		}
	]);

	//
};


feng.views.view3dobject.ReplaceableObject.prototype.updateObject = function( mesh ){

	var currentObject = this.object3d.children[0];

	if(currentObject) {

		this.object3d.remove( currentObject );
		delete this._view3d.view3dObjects[ currentObject.name ];
	}

	this._object = mesh;

	this.object3d.add( this._object );
};


feng.views.view3dobject.ReplaceableObject.prototype.onLoadComplete = function( e ){

	var json = this._loader.getResult('data');
	var img = this._loader.getResult('texture');

	var mesh = feng.utils.ThreeUtils.loader.parse( json );

	var texture = new THREE.Texture( img );
	texture.needsUpdate = true;

	mesh.material.map = texture;
	mesh.material.needsUpdate = true;

	var view3dObject = new feng.views.view3dobject.View3DObject( mesh, {}, this._view3d );
	this._view3d.view3dObjects[ view3dObject.name ] = view3dObject;

	this.updateObject( mesh );

	this.unlock();
};


feng.views.view3dobject.ReplaceableObject.prototype.onLoadError = function( e ){


};