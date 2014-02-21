goog.provide('fengshui.models.Preload');

goog.require('goog.object');
goog.require('fengshui.utils.Utils');


/**
 * @constructor
 */
fengshui.models.Preload = function(){

	this._assets = {
		'global': {

		},
		'homepage': {

		},
		'avatar': {
			'texture': 'img/texture/avatar/avatar.png',
			'texture-data': 'json/avatar.json'
		}
	};
};
goog.addSingletonGetter(fengshui.models.Preload);


fengshui.models.Preload.prototype.getDataByKeys = function( keys ) {

	//keys should be of the format 'key1.key2.key3..'

	var asset = this._assets;

	var keys = keys.split('.');
	var lastKey = keys[keys.length - 1];

	goog.array.forEach(keys, function(key) {
		asset = asset[key];
	});

	return asset;
};


fengshui.models.Preload.prototype.getManifest = function( keys ) {

	var asset = this.getDataByKeys( keys );

	if(goog.isString(asset)) {

		return [{id: keys, src: asset}];

	}else {

		var manifest = [];

		goog.object.forEach(asset, function(src, id) {
			manifest.push( {id: keys+'.'+id, src: src} );
		});
		
		return manifest;

	}
};


fengshui.models.Preload.prototype.getAsset = function( keys ) {

	var asset = this.getDataByKeys( keys );

	return goog.isString(asset) ? null : asset;
};


fengshui.models.Preload.prototype.setAsset = function( keys, result ) {

	fengshui.utils.Utils.setValueByKeys(keys, result, this._assets);
};