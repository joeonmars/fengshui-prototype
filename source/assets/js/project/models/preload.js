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
				},
				'skybox': {
					'xpos': 'images/texture/studio/livingroom/skybox/pos-x.png',
					'xneg': 'images/texture/studio/livingroom/skybox/neg-x.png',
					'ypos': 'images/texture/studio/livingroom/skybox/pos-y.png',
					'yneg': 'images/texture/studio/livingroom/skybox/neg-y.png',
					'zpos': 'images/texture/studio/livingroom/skybox/pos-z.png',
					'zneg': 'images/texture/studio/livingroom/skybox/neg-z.png',
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
				'floor-texture': 'images/texture/studio/livingroom/floor.jpg',
				'wall-texture': 'images/texture/studio/livingroom/wall.jpg',
				'wall-outer-texture': 'images/texture/studio/livingroom/wall-outer.png',
				'ceiling-texture': 'images/texture/studio/livingroom/ceiling.jpg',
				'bed-texture': 'images/texture/studio/livingroom/bed.jpg',
				'shoestorage-texture': 'images/texture/studio/livingroom/shoestorage.png',
				'sofabed-cabinet-texture': 'images/texture/studio/livingroom/sofabed-cabinet.jpg',
				'kitchen-cabinets-texture': 'images/texture/studio/livingroom/kitchen-cabinets.png',
				'kitchen-storage-texture': 'images/texture/studio/livingroom/kitchen-storage.png',
				'microwave-texture': 'images/texture/studio/livingroom/microwave.png',
				'fruitplate-texture': 'images/texture/studio/livingroom/fruitplate.png',
				'dining-table-texture': 'images/texture/studio/livingroom/dining-table.png',
				'dining-chair-texture': 'images/texture/studio/livingroom/dining-chair.png',
				'window-books-texture': 'images/texture/studio/livingroom/window-books.jpg',
				'clockset-texture': 'images/texture/studio/livingroom/clockset.png',
				'bed-shelf-texture': 'images/texture/studio/livingroom/bed-shelf.png',
				'tv-texture': 'images/texture/studio/livingroom/tv.png',
				'tv-table-texture': 'images/texture/studio/livingroom/tv-table.png',
				'sofa-texture': 'images/texture/studio/livingroom/sofa.png',
				'sofabed-texture': 'images/texture/studio/livingroom/sofabed.png',
				'book-shelf-texture': 'images/texture/studio/livingroom/book-shelf.jpg',
				'nightstand-texture': 'images/texture/studio/livingroom/nightstand.png',
				'kitchen-shelf-texture': 'images/texture/studio/livingroom/kitchen-shelf.png',
				'sewingmachine-texture': 'images/texture/studio/livingroom/sewingmachine.png',
				'sewingmachine-cover-texture': 'images/texture/studio/livingroom/sewingmachine-cover.jpg',
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
					'xpos': 'images/texture/studio/livingroom/skybox/pos-x.png',
					'xneg': 'images/texture/studio/livingroom/skybox/neg-x.png',
					'ypos': 'images/texture/studio/livingroom/skybox/pos-y.png',
					'yneg': 'images/texture/studio/livingroom/skybox/neg-y.png',
					'zpos': 'images/texture/studio/livingroom/skybox/pos-z.png',
					'zneg': 'images/texture/studio/livingroom/skybox/neg-z.png',
				}
			},
			'bathroom': {
				'scene-data': 'json/studio-bathroom.json',
				'floor-texture': 'images/texture/studio/bathroom/floor.jpg',
				'bathrobe-texture': 'images/texture/studio/bathroom/bathrobe.jpg',
				'bathtub-texture': 'images/texture/studio/bathroom/bathtub.jpg',
				'lotus-texture': 'images/texture/studio/bathroom/lotus.jpg',
				'shelf-texture': 'images/texture/studio/bathroom/shelf.jpg',
				'carpets-texture': 'images/texture/studio/bathroom/carpets.jpg',
				'toilet-texture': 'images/texture/studio/bathroom/toilet.jpg',
				'toilet-paper-texture': 'images/texture/studio/bathroom/toilet-paper.jpg',
				'washbasin-texture': 'images/texture/studio/bathroom/washbasin.jpg',
				'lamps-texture': 'images/texture/studio/bathroom/lamps.jpg',
				'flipflop-texture': 'images/texture/studio/bathroom/flipflop.jpg',
				'skybox': {
					'xpos': 'images/texture/studio/livingroom/skybox/pos-x.png',
					'xneg': 'images/texture/studio/livingroom/skybox/neg-x.png',
					'ypos': 'images/texture/studio/livingroom/skybox/pos-y.png',
					'yneg': 'images/texture/studio/livingroom/skybox/neg-y.png',
					'zpos': 'images/texture/studio/livingroom/skybox/pos-z.png',
					'zneg': 'images/texture/studio/livingroom/skybox/neg-z.png',
				}
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
			'boysroom': {
				'scene-data': 'json/townhouse-boysroom.json',
				'floor-texture': 'images/texture/townhouse/boysroom/floor.jpg',
				'ceiling-texture': 'images/texture/townhouse/boysroom/ceiling.jpg',
				'wall-texture': 'images/texture/townhouse/boysroom/wall.jpg',
				'wall-outer-texture': 'images/texture/townhouse/boysroom/wall-outer.jpg',
				'cabinet-texture': 'images/texture/townhouse/boysroom/cabinet.jpg',
				'bed-texture': 'images/texture/townhouse/boysroom/bed.jpg',
				'big-frame-texture': 'images/texture/townhouse/boysroom/big-frame.jpg',
				'decoration-pictures-texture': 'images/texture/townhouse/boysroom/decoration-pictures.jpg',
				'ceiling-lamps-texture': 'images/texture/townhouse/boysroom/ceiling-lamps.jpg',
				'stools-texture': 'images/texture/townhouse/boysroom/stools.jpg',
				'football-texture': 'images/texture/townhouse/boysroom/football.jpg',
				'bear-in-drawer-texture': 'images/texture/townhouse/boysroom/bear-in-drawer.jpg',
				'moon-texture': 'images/texture/townhouse/boysroom/moon.jpg',
				'carpet-texture': 'images/texture/townhouse/boysroom/carpet.jpg',
				'shelf-stuff-1-texture': 'images/texture/townhouse/boysroom/shelf-stuff-1.jpg',
				'shelf-stuff-2-texture': 'images/texture/townhouse/boysroom/shelf-stuff-2.jpg',
				'shelf-stuff-3-texture': 'images/texture/townhouse/boysroom/shelf-stuff-3.jpg',
				'shelf-stuff-4-texture': 'images/texture/townhouse/boysroom/shelf-stuff-4.jpg',
				'shelf-stuff-5-texture': 'images/texture/townhouse/boysroom/shelf-stuff-5.jpg',
				'shelf-stuff-6-texture': 'images/texture/townhouse/boysroom/shelf-stuff-6.jpg',
				'toytrain-texture': 'images/texture/townhouse/boysroom/toytrain.jpg',
				'sketchpad-texture': 'images/texture/townhouse/boysroom/sketchpad.jpg',
				'nightstand-lamp-texture': 'images/texture/townhouse/boysroom/nightstand-lamp.jpg',
				'yellow-reading-lamp-texture': 'images/texture/townhouse/boysroom/yellow-reading-lamp.jpg',
				'blue-reading-lamp-texture': 'images/texture/townhouse/boysroom/blue-reading-lamp.jpg',
				'bedding-texture': 'images/texture/townhouse/boysroom/bedding.jpg',
				'chalkboard-texture': 'images/texture/townhouse/boysroom/chalkboard.jpg',
				'slippers-texture': 'images/texture/townhouse/boysroom/slippers.jpg',
				'table-books-texture': 'images/texture/townhouse/boysroom/table-books.jpg',
				'computer-texture': 'images/texture/townhouse/boysroom/computer.jpg',
				'table-texture': 'images/texture/townhouse/boysroom/table.jpg',
				'table-stuff-texture': 'images/texture/townhouse/boysroom/table-stuff.jpg',
				'desk-texture': 'images/texture/townhouse/boysroom/desk.jpg',
				'swivel-chair-texture': 'images/texture/townhouse/boysroom/swivel-chair.jpg',
				'shelf-left-texture': 'images/texture/townhouse/boysroom/shelf-left.jpg',
				'shelf-right-texture': 'images/texture/townhouse/boysroom/shelf-right.jpg',
				'pencil-vase-texture': 'images/texture/townhouse/boysroom/pencil-vase.jpg',
				'nightstand-texture': 'images/texture/townhouse/boysroom/nightstand.jpg',
				'drawer-texture': 'images/texture/townhouse/boysroom/drawer.jpg',
				'handheld-nightstand-texture': 'images/texture/townhouse/boysroom/handheld-nightstand.jpg',
				'window-texture': 'images/texture/townhouse/boysroom/window.jpg',
				'window-frame-texture': 'images/texture/townhouse/boysroom/window-frame.jpg',
				'door-frame-texture': 'images/texture/townhouse/boysroom/door-frame.jpg',
				'skybox': {
					'xpos': 'images/texture/townhouse/boysroom/skybox/pos-x.png',
					'xneg': 'images/texture/townhouse/boysroom/skybox/neg-x.png',
					'ypos': 'images/texture/townhouse/boysroom/skybox/pos-y.png',
					'yneg': 'images/texture/townhouse/boysroom/skybox/neg-y.png',
					'zpos': 'images/texture/townhouse/boysroom/skybox/pos-z.png',
					'zneg': 'images/texture/townhouse/boysroom/skybox/neg-z.png',
				}
			},
			'homeoffice': {
				'scene-data': 'json/townhouse-homeoffice.json',
				'floor-texture': 'images/texture/townhouse/homeoffice/floor.jpg',
				'ceiling-texture': 'images/texture/townhouse/homeoffice/ceiling.jpg',
				'wall-texture':	'images/texture/townhouse/homeoffice/wall.jpg',
				'wall-outer-texture': 'images/texture/townhouse/homeoffice/wall-outer.jpg',
				'swivel-chair-texture': 'images/texture/townhouse/homeoffice/swivel-chair.jpg',
				'storage-texture': 'images/texture/townhouse/homeoffice/storage.jpg',
				'setsquare-texture': 'images/texture/townhouse/homeoffice/setsquare.jpg',
				'carpet-texture': 'images/texture/townhouse/homeoffice/carpet.jpg',
				'door-frame-texture': 'images/texture/townhouse/homeoffice/door-frame.jpg',
				'display-shelf-lamp-texture': 'images/texture/townhouse/homeoffice/display-shelf-lamp.jpg',
				'bookshelf-lamps-texture': 'images/texture/townhouse/homeoffice/bookshelf-lamps.jpg',
				'picture-frame-1-texture': 'images/texture/townhouse/homeoffice/picture-frame-1.jpg',
				'picture-frame-2-texture': 'images/texture/townhouse/homeoffice/picture-frame-2.jpg',
				'picture-frame-3-texture': 'images/texture/townhouse/homeoffice/picture-frame-3.jpg',
				'picture-frame-4-texture': 'images/texture/townhouse/homeoffice/picture-frame-4.jpg',
				'block-shelf-1-texture': 'images/texture/townhouse/homeoffice/block-shelf-1.jpg',
				'block-shelf-2-texture': 'images/texture/townhouse/homeoffice/block-shelf-2.jpg',
				'block-stuff-1-texture': 'images/texture/townhouse/homeoffice/block-stuff-1.jpg',
				'block-stuff-2-texture': 'images/texture/townhouse/homeoffice/block-stuff-2.jpg',
				'books-1-texture': 'images/texture/townhouse/homeoffice/books-1.jpg',
				'books-2-texture': 'images/texture/townhouse/homeoffice/books-2.jpg',
				'round-lamp-texture': 'images/texture/townhouse/homeoffice/round-lamp.jpg',
				'calendar-texture': 'images/texture/townhouse/homeoffice/calendar.jpg',
				'magazine-texture': 'images/texture/townhouse/homeoffice/magazine.jpg',
				'window-texture': 'images/texture/townhouse/homeoffice/window.jpg',
				'armchair-texture': 'images/texture/townhouse/homeoffice/armchair.jpg',
				'coffeecup-texture': 'images/texture/townhouse/homeoffice/coffeecup.jpg',
				'writing-desk-texture': 'images/texture/townhouse/homeoffice/writing-desk.jpg',
				'dracaena-fragrans-texture': 'images/texture/townhouse/homeoffice/dracaena-fragrans.jpg',
				'handbag-texture': 'images/texture/townhouse/homeoffice/handbag.jpg',
				'pen-vase-texture': 'images/texture/townhouse/homeoffice/pen-vase.jpg',
				'rubberplant-texture': 'images/texture/townhouse/homeoffice/rubberplant.jpg',
				'coffee-table-texture': 'images/texture/townhouse/homeoffice/coffee-table.jpg',
				'coffeecup-texture': 'images/texture/townhouse/homeoffice/coffeecup.jpg',
				'floor-lamp-texture': 'images/texture/townhouse/homeoffice/floor-lamp.jpg',
				'ceiling-lamp-texture': 'images/texture/townhouse/homeoffice/ceiling-lamp.jpg',
				'cup-texture': 'images/texture/townhouse/homeoffice/cup.jpg',
				'floor-lamp-texture': 'images/texture/townhouse/homeoffice/floor-lamp.jpg',
				'reading-lamp-1-texture': 'images/texture/townhouse/homeoffice/reading-lamp-1.jpg',
				'reading-lamp-2-texture': 'images/texture/townhouse/homeoffice/reading-lamp-2.jpg',
				'sofa-texture': 'images/texture/townhouse/homeoffice/sofa.jpg',
				'trash-texture': 'images/texture/townhouse/homeoffice/trash.jpg',
				'display-shelf-texture': 'images/texture/townhouse/homeoffice/display-shelf.jpg',
				'computer-texture': 'images/texture/townhouse/homeoffice/computer.jpg',
				'laptop-texture': 'images/texture/townhouse/homeoffice/laptop.jpg',
				'curtain-texture': 'images/texture/townhouse/homeoffice/curtain.jpg',
				'curtain-rod-texture': 'images/texture/townhouse/homeoffice/curtain-rod.jpg',
				'telephone-texture': 'images/texture/townhouse/homeoffice/telephone.jpg',
				'bookshelf-texture': 'images/texture/townhouse/homeoffice/bookshelf.jpg',
				'bookshelf-stuff-texture': 'images/texture/townhouse/homeoffice/bookshelf-stuff.jpg',
				'skybox': {
					'xpos': 'images/texture/townhouse/boysroom/skybox/pos-x.png',
					'xneg': 'images/texture/townhouse/boysroom/skybox/neg-x.png',
					'ypos': 'images/texture/townhouse/boysroom/skybox/pos-y.png',
					'yneg': 'images/texture/townhouse/boysroom/skybox/neg-y.png',
					'zpos': 'images/texture/townhouse/boysroom/skybox/pos-z.png',
					'zneg': 'images/texture/townhouse/boysroom/skybox/neg-z.png',
				}
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