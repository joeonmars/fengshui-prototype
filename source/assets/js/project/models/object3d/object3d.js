goog.provide('feng.models.object3d.Object3D');


/**
 * @constructor
 */
feng.models.object3d.Object3D = function( mesh ){

  this._mesh = mesh;

  this._data = {};

  this.setData( this._mesh.userData );
};


feng.models.object3d.Object3D.prototype.setData = function( data ) {

	// for pathfinding detection
	this._data['collidable'] = goog.isBoolean( data['collidable'] ) ? data['collidable'] : true;

	// for preload
	this._data['textureurl'] = feng.Config['imagePath'] + 'texture/' + data['textureurl'];

	// for close-up camera settings
	var hasCameraData = data['camera'];

	var hasPosition = hasCameraData ? goog.isObject( data['camera']['position'] ) : false;
	var hasRotation = hasCameraData ? goog.isObject( data['camera']['rotation'] ) : false;
	var hasFov = hasCameraData ? goog.isNumber( data['camera']['fov'] ) : false;

	var position = hasPosition ? data['camera']['position'] : null;
	var rotation = hasRotation ? data['camera']['rotation'] : null;
	var fov = hasFov ? data['camera']['fov'] : null;

	this._data['camera'] = [];
	this._data['camera']['position'] = hasPosition ? new THREE.Vector3( position['x'], position['y'], position['z'] ) : null;
	this._data['camera']['rotation'] = hasRotation ? new THREE.Euler( rotation['x'], rotation['y'], rotation['z'], 'XYZ' ) : null;
	this._data['camera']['fov'] = hasFov ? fov : null;

	// ...
};


feng.models.object3d.Object3D.prototype.getData = function( name ) {

	return this._data[name];
};