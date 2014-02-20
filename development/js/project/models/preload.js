goog.provide('fengshui.models.Preload');

goog.require('goog.object');


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
			'texture': 'img/texture/avatar.png'
		}
	};
};
goog.addSingletonGetter(fengshui.models.Preload);


fengshui.models.Preload.prototype.getManifest = function( sectionName ) {

	var sectionAssets = this._assets[sectionName];

	var manifest = [];

	goog.object.forEach(sectionAssets, function(src, id) {
		manifest.push( {id: id, src: src} );
	});

	return manifest;
};


fengshui.models.Preload.prototype.getAsset = function( sectionName, assetName ) {

	var asset = this._assets[sectionName][assetName];
	return goog.isString(asset) ? null : asset;
};


fengshui.models.Preload.prototype.setAsset = function( sectionName, assetName, asset ) {

	this._assets[sectionName][assetName] = asset;
};