goog.provide('feng.models.Preload');

goog.require('goog.object');
goog.require('feng.utils.Utils');


/**
 * @constructor
 */
feng.models.Preload = function(){

	this._assets = {
		'global': {
			'fengshui-data': 'json/fengshui.json',
			'tip-icons-data': 'json/tip-icons.json',
			'tip-icons': 'images/tip-icons.png',
			'scene-studio': 'images/scene-studio.jpg',
			'scene-townhouse': 'images/scene-townhouse.jpg',
			'circular-fill': 'images/circular-fill.png',
			'book': 'images/book.png',
			'cube-browse': 'images/cube-browse.png',
			'cube-design': 'images/cube-design.png',
			'leaf': {
				'ji': 'images/texture/leaf/ji.png',
				'sha': 'images/texture/leaf/sha.png',
				'yin': 'images/texture/leaf/yin.png',
				'yang': 'images/texture/leaf/yang.png'
			},
			'hanzi': {
				'chi': {
					'scene': 'json/hanzi/chi.json'
				},
				'ji': {
					'scene': 'json/hanzi/ji.json'
				},
				'sha': {
					'scene': 'json/hanzi/sha.json'
				},
				'wuxing': {
					'scene': 'json/hanzi/wuxing.json'
				},
				'yinyang': {
					'scene': 'json/hanzi/yinyang.json'
				}
			}
		},
		'home': {

		},
		'outro': {

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
			'livingroom': {
				'scene-data': 'json/scene-interior1.json',
				'energyflow-data': 'json/energyflow/energyflow-1.json',
				'bed-texture': 'images/texture/bed.jpg',
				'cabinet-texture': 'images/texture/cabinet.jpg',
				'default-picture': 'images/texture/studio/pictures/0.jpg',
				'pictures': {
					'1': 'images/texture/studio/pictures/1.jpg',
					'2': 'images/texture/studio/pictures/2.jpg',
					'3': 'images/texture/studio/pictures/3.jpg',
					'4': 'images/texture/studio/pictures/4.jpg',
					'5': 'images/texture/studio/pictures/5.jpg',
					'6': 'images/texture/studio/pictures/6.jpg',
					'7': 'images/texture/studio/pictures/7.jpg',
					'8': 'images/texture/studio/pictures/8.jpg',
					'9': 'images/texture/studio/pictures/9.jpg',
					'10': 'images/texture/studio/pictures/10.jpg'
				}
			},
			'interior2': {
				'scene-data': 'json/scene-interior2.json',
				'energyflow-data': 'json/energyflow/energyflow-2.json',
				'pc-texture': 'images/texture/pc.jpg',
				'screensaver-texture': 'images/texture/spritesheet/screensaver.png',
				'cactus-texture': 'images/texture/cactus.png',
			},
			'interior3': {
				'scene-data': 'json/studio-livingroom.json',
				'floor-texture': 'images/texture/studio/livingroom/floor.png',
				'wall-texture': 'images/texture/studio/livingroom/wall.png',
				'ceiling-texture': 'images/texture/studio/livingroom/ceiling.png',
				'bed-texture': 'images/texture/studio/livingroom/bed.png',
				'shoestorage-texture': 'images/texture/studio/livingroom/shoestorage.png',
				'sofabed-cabinet-texture': 'images/texture/studio/livingroom/sofabed-cabinet.png',
				'kitchen-cabinets-texture': 'images/texture/studio/livingroom/kitchen-cabinets.png',
				'kitchen-storage-texture': 'images/texture/studio/livingroom/kitchen-storage.png',
				'microwave-texture': 'images/texture/studio/livingroom/microwave.png',
				'fruitplate-texture': 'images/texture/studio/livingroom/fruitplate.png',
				'dining-table-texture': 'images/texture/studio/livingroom/dining-table.png',
				'dining-chair-texture': 'images/texture/studio/livingroom/dining-chair.png',
				'window-books-texture': 'images/texture/studio/livingroom/window-books.png',
				'clockset-texture': 'images/texture/studio/livingroom/clockset.png',
				'bed-shelf-texture': 'images/texture/studio/livingroom/bed-shelf.png',
				'tv-texture': 'images/texture/studio/livingroom/tv.png',
				'tv-table-texture': 'images/texture/studio/livingroom/tv-table.png',
				'sofa-texture': 'images/texture/studio/livingroom/sofa.png',
				'sofabed-texture': 'images/texture/studio/livingroom/sofabed.png',
				'book-shelf-texture': 'images/texture/studio/livingroom/book-shelf.png',
				'nightstand-texture': 'images/texture/studio/livingroom/nightstand.png',
				'kitchen-shelf-texture': 'images/texture/studio/livingroom/kitchen-shelf.png',
				'sewingmachine-texture': 'images/texture/studio/livingroom/sewingmachine.png',
				'sewingmachine-cover-texture': 'images/texture/studio/livingroom/sewingmachine-cover.png',
				'coffee-pot-texture': 'images/texture/studio/livingroom/coffee-pot.png',
				'ventilator-texture': 'images/texture/studio/livingroom/ventilator.png',
				'round-lamp-texture': 'images/texture/studio/livingroom/round-lamp.png',
				'reading-lamp-texture': 'images/texture/studio/livingroom/reading-lamp.png',
				'boxes-texture': 'images/texture/studio/livingroom/boxes.png',
				'shoestorage-texture': 'images/texture/studio/livingroom/shoestorage.png',
				'wardrobe-texture': 'images/texture/studio/livingroom/wardrobe.png',
				'refrigerator-texture': 'images/texture/studio/livingroom/refrigerator.png',
				'refrigerator-door-texture': 'images/texture/studio/livingroom/refrigerator-door.png',
				'apple-texture': 'images/texture/studio/livingroom/apple.jpg',
				'pineapple-texture': 'images/texture/studio/livingroom/pineapple.jpg',
				'orange-texture': 'images/texture/studio/livingroom/orange.jpg',
				'peach-texture': 'images/texture/studio/livingroom/peach.jpg',
				'skybox': {
					'xpos': 'images/texture/studio/livingroom/skybox/xpos.png',
					'xneg': 'images/texture/studio/livingroom/skybox/xneg.png',
					'zpos': 'images/texture/studio/livingroom/skybox/zpos.png',
					'zneg': 'images/texture/studio/livingroom/skybox/zneg.png'
				}
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
		},
		'townhouse': {
			'livingroom': {
				'scene-data': 'json/scene-interior1.json',
				'energyflow-data': 'json/energyflow/energyflow-1.json',
				'bed-texture': 'images/texture/bed.jpg',
				'cabinet-texture': 'images/texture/cabinet.jpg',
				'default-picture': 'images/texture/studio/pictures/0.jpg',
				'pictures': {
					'1': 'images/texture/studio/pictures/1.jpg',
					'2': 'images/texture/studio/pictures/2.jpg',
					'3': 'images/texture/studio/pictures/3.jpg',
					'4': 'images/texture/studio/pictures/4.jpg',
					'5': 'images/texture/studio/pictures/5.jpg',
					'6': 'images/texture/studio/pictures/6.jpg',
					'7': 'images/texture/studio/pictures/7.jpg',
					'8': 'images/texture/studio/pictures/8.jpg',
					'9': 'images/texture/studio/pictures/9.jpg',
					'10': 'images/texture/studio/pictures/10.jpg'
				}
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

	var parseLoadItem = function(obj) {

		if( goog.string.endsWith(obj.src, '.dds') ) {
			obj.type = createjs.LoadQueue.BINARY;
		}

		return obj;
	};

	var parseObject = function(key, asset) {

		goog.object.forEach(asset, function(obj, id) {

			if(goog.isString(obj)) {
				// if obj is an Url rather than result
				var loadItem = parseLoadItem( {id: key+'.'+id, src: obj} );
				manifest.push( loadItem );
			}else {
				// if obj is an Object contains keys
				parseObject(key+'.'+id, obj);
			}
		});
	};

	if(goog.isString(asset)) {

		var loadItem = parseLoadItem( {id: keys, src: asset} );
		manifest.push( loadItem );

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