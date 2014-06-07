goog.provide('feng.models.Preload');

goog.require('goog.object');
goog.require('feng.utils.Utils');


/**
 * @constructor
 */
feng.models.Preload = function(){

	this._assets = {
		'global': {
			'circular-fill': 'images/circular-fill.png'
		},
		'homepage': {

		},
		'accessories': {
			'rubberplant-data': 'json/elements/rubberplant.json',
			'rubberplant-texture': 'images/texture/rubberplant.png',
			'cactus-data': 'json/elements/cactus.json',
			'cactus-texture': 'images/texture/cactus.png',
			'lotus-data': 'json/elements/lotus.json',
			'lotus-texture': 'images/texture/lotus.png'
		},
		'studio': {
			'interior1': {
				'scene-data': 'json/scene-interior1.json',
				'energyflow-data': 'json/energyflow/energyflow-1.json',
				'bed-texture': 'images/texture/bed.jpg',
				'cabinet-texture': 'images/texture/cabinet.jpg'
			},
			'interior2': {
				'scene-data': 'json/scene-interior2.json',
				'energyflow-data': 'json/energyflow/energyflow-2.json',
				'pc-texture': 'images/texture/pc.jpg',
				'screensaver-texture': 'images/texture/spritesheet/screensaver.png',
				'cactus-texture': 'images/texture/cactus.png',
			},
			'bathroom': {
				'scene-data': 'json/bathroom.json',
				'energyflow-data': 'json/energyflow/energyflow-3.json',
				'bathtub-texture': 'images/texture/studio/bathroom/bathtub.png',
				'closet-door-texture': 'images/texture/studio/bathroom/closet-door.png',
				'closet-texture': 'images/texture/studio/bathroom/closet.jpg',
				'lamp-texture': 'images/texture/studio/bathroom/lamp.png',
				'shelf-texture': 'images/texture/studio/bathroom/shelf.png',
				'toilet-texture': 'images/texture/studio/bathroom/toilet.png',
				'towel-texture': 'images/texture/studio/bathroom/towel.png',
				'wall-texture': 'images/texture/studio/bathroom/wall.jpg',
				'washer-texture': 'images/texture/studio/bathroom/washer.jpg'
			}
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