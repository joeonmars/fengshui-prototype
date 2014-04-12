goog.provide('feng.models.Preload');

goog.require('goog.object');
goog.require('feng.utils.Utils');


/**
 * @constructor
 */
feng.models.Preload = function(){

	this._assets = {
		'global': {

		},
		'homepage': {

		},
		'studio': {
			'interior1': {
				'scene-data': 'json/scene-interior1.json',
				'energyflow-data': 'json/energyflow/energyflow-1.json',
				'texture-bed': 'images/texture/bed-texture.jpg',
				'texture-cabinet': 'images/texture/cabinet-texture.jpg'
			},
			'interior2': {
				'scene-data': 'json/scene-interior2.json',
				'energyflow-data': 'json/energyflow/energyflow-2.json',
				'texture-pc': 'images/texture/pc-texture.jpg',
				'texture-screensaver': 'images/texture/spritesheet/screensaver.png',
				'texture-cactus': 'images/texture/cactus-texture.png',
			},
			'bathroom': {
				'scene-data': 'json/bathroom.json',
				'energyflow-data': 'json/energyflow/energyflow-3.json',
				'texture-bathtub': 'images/texture/studio/bathroom/bathtub.png',
				'texture-closet-door': 'images/texture/studio/bathroom/closet-door.png',
				'texture-closet': 'images/texture/studio/bathroom/closet.jpg',
				'texture-lamp': 'images/texture/studio/bathroom/lamp.png',
				'texture-shelf': 'images/texture/studio/bathroom/shelf.png',
				'texture-toilet': 'images/texture/studio/bathroom/toilet.png',
				'texture-towel': 'images/texture/studio/bathroom/towel.png',
				'texture-wall': 'images/texture/studio/bathroom/wall.jpg',
				'texture-washer': 'images/texture/studio/bathroom/washer.jpg'
			}
		},
		'avatar': {
			'texture': 'images/texture/avatar/avatar.png',
			'texture-data': 'json/avatar.json'
		}
	};
};
goog.addSingletonGetter(feng.models.Preload);


feng.models.Preload.prototype.getDataByKeys = function( keys ) {

	//keys should be of the format 'key1.key2.key3..'

	var asset = this._assets;

	var keys = keys.split('.');
	var lastKey = keys[keys.length - 1];

	goog.array.forEach(keys, function(key) {
		asset = asset[key];
	});

	return asset;
};


feng.models.Preload.prototype.getManifest = function( keys ) {

	var asset = this.getDataByKeys( keys );

	var manifest = [];

	var parseObject = function(key, asset) {

		goog.object.forEach(asset, function(obj, id) {

			if(goog.isString(obj)) {
				// if obj is an Url rather than result
				manifest.push( {id: key+'.'+id, src: obj} );
			}else {
				// if obj is an Object contains keys
				parseObject(key+'.'+id, obj);
			}
		});
	};

	if(goog.isString(asset)) {

		manifest.push( {id: keys, src: asset} );

	}else {

		var key = keys;
		var object = asset;
		parseObject(key, object);
	}

	return manifest;
};


feng.models.Preload.prototype.getAsset = function( keys ) {

	var asset = this.getDataByKeys( keys );

	return goog.isString(asset) ? null : asset;
};


feng.models.Preload.prototype.setAsset = function( keys, result ) {

	feng.utils.Utils.setValueByKeys(keys, result, this._assets);
};