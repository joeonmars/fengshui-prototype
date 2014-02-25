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
			'scene-data': 'json/scene-bed-bake.json',
			'texture-bed': 'model/bed_bake.png'
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

	if(goog.isString(asset)) {

		return [{id: keys, src: asset}];

	}else {

		var manifest = [];

		goog.object.forEach(asset, function(src, id) {
			// if src is an Url rather than result
			if(goog.isString(src)) {
				manifest.push( {id: keys+'.'+id, src: src} );
			}
		});
		
		return manifest;

	}
};


feng.models.Preload.prototype.getAsset = function( keys ) {

	var asset = this.getDataByKeys( keys );

	return goog.isString(asset) ? null : asset;
};


feng.models.Preload.prototype.setAsset = function( keys, result ) {

	feng.utils.Utils.setValueByKeys(keys, result, this._assets);
};