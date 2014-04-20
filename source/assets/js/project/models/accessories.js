goog.provide('feng.models.Accessories');

goog.require('feng.models.Preload');


feng.models.Accessories = function(){

	this._loader = new THREE.ObjectLoader();
};
goog.addSingletonGetter(feng.models.Accessories);


feng.models.Accessories.Data = {
	'studio': {
		'interior1': ['empty', 'rubberplant', 'cactus'],
		'interior2': [],
		'bathroom': []
	}
};


feng.models.Accessories.prototype.getAccessoryObject3D = function(name) {

	if(name === 'empty') {
		return new THREE.Object3D();
	}

	var preloadModel = feng.models.Preload.getInstance();

	var data = preloadModel.getAsset('accessories.'+name+'-data');
	var textureSrc = preloadModel.getAsset('accessories.'+name+'-texture').src;

	var mesh = this._loader.parse( data );
	mesh.material.map = THREE.ImageUtils.loadTexture( textureSrc );
	mesh.material.shading = THREE.FlatShading;
	mesh.castShadow = true;

	return mesh;
};


feng.models.Accessories.prototype.getAccessories = function(sectionId, sceneId) {

	var names = feng.models.Accessories.Data[sectionId][sceneId];
	var accessories = goog.array.map(names, function(name) {
		return this.getAccessoryObject3D( name );
	}, this);

	return accessories;
};