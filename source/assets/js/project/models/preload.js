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
			'spinner': 'images/spinner.png',
			'spinner-data': 'json/spinner.json',
			'scene-studio': 'images/scene-studio.jpg',
			'scene-house': 'images/scene-house.jpg',
			'circular-fill': 'images/circular-fill.png',
			'book': 'images/book.png',
			'cube-browse': 'images/cube-browse.png',
			'cube-design': 'images/cube-design.png',
			'leaf': {
				'ji': 'images/texture/leaf/ji.png',
				'sha': 'images/texture/leaf/sha.png',
				'yin': 'images/texture/leaf/yin.png',
				'yang': 'images/texture/leaf/yang.png'
			}
		},
		'home': {

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
			'global': {
				'character': {
					'ollie-data': 'json/characters/ollie.json',
					'ollie': 'images/characters/ollie.png'
				}
			},
			'livingroom-test': {
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
					'zneg': 'images/texture/studio/livingroom/skybox/neg-z.png'
				}
			},
			'interior2': {
				'scene-data': 'json/scene-interior2.json',
				'energyflow-data': 'json/energyflow/energyflow-2.json',
				'pc-texture': 'images/texture/pc.jpg',
				'screensaver-texture': 'images/texture/spritesheet/screensaver.png',
				'cactus-texture': 'images/texture/cactus.png'
			},
			'livingroom': {
				'scene-data': 'json/studio-livingroom.json',
				'floor-texture': 'images/texture/studio/livingroom/floor.jpg',
				'wall-texture': 'images/texture/studio/livingroom/wall.jpg',
				'wall-outer-texture': 'images/texture/studio/livingroom/wall-outer.jpg',
				'ceiling-texture': 'images/texture/studio/livingroom/ceiling.jpg',
				'ceiling-lamp-1-texture': 'images/texture/studio/livingroom/ceiling-lamp-1.jpg',
				'ceiling-lamp-2-texture': 'images/texture/studio/livingroom/ceiling-lamp-2.jpg',
				'studio-door-texture': 'images/texture/studio/livingroom/studio-door.jpg',
				'studio-door-handle-texture': 'images/texture/studio/livingroom/studio-door-handle.jpg',
				'studio-door-frame-texture': 'images/texture/studio/livingroom/studio-door-frame.jpg',
				'bed-texture': 'images/texture/studio/livingroom/bed.jpg',
				'shoestorage-texture': 'images/texture/studio/livingroom/shoestorage.jpg',
				'sofabed-cabinet-texture': 'images/texture/studio/livingroom/sofabed-cabinet.jpg',
				'kitchen-cabinets-texture': 'images/texture/studio/livingroom/kitchen-cabinets.jpg',
				'kitchen-storage-texture': 'images/texture/studio/livingroom/kitchen-storage.jpg',
				'microwave-texture': 'images/texture/studio/livingroom/microwave.jpg',
				'fruitplate-texture': 'images/texture/studio/livingroom/fruitplate.jpg',
				'dining-table-texture': 'images/texture/studio/livingroom/dining-table.jpg',
				'dining-chair-texture': 'images/texture/studio/livingroom/dining-chair.jpg',
				'window-books-texture': 'images/texture/studio/livingroom/window-books.jpg',
				'clock-texture': 'images/texture/studio/livingroom/clock.jpg',
				'seasoning-texture': 'images/texture/studio/livingroom/seasoning.jpg',
				'bed-shelf-texture': 'images/texture/studio/livingroom/bed-shelf.jpg',
				'kitchen-ware-texture': 'images/texture/studio/livingroom/kitchen-ware.jpg',
				'linen-cabinet-texture': 'images/texture/studio/livingroom/linen-cabinet.jpg',
				'tv-texture': 'images/texture/studio/livingroom/tv.jpg',
				'tv-table-texture': 'images/texture/studio/livingroom/tv-table.jpg',
				'sofa-texture': 'images/texture/studio/livingroom/sofa.jpg',
				'sofabed-texture': 'images/texture/studio/livingroom/sofabed.jpg',
				'book-shelf-texture': 'images/texture/studio/livingroom/book-shelf.jpg',
				'nightstand-texture': 'images/texture/studio/livingroom/nightstand.jpg',
				'kitchen-shelf-texture': 'images/texture/studio/livingroom/kitchen-shelf.jpg',
				'sewingmachine-texture': 'images/texture/studio/livingroom/sewingmachine.jpg',
				'sewingmachine-cover-texture': 'images/texture/studio/livingroom/sewingmachine-cover.jpg',
				'coffee-pot-texture': 'images/texture/studio/livingroom/coffee-pot.jpg',
				'hood-texture': 'images/texture/studio/livingroom/hood.jpg',
				'round-lamp-texture': 'images/texture/studio/livingroom/round-lamp.png',
				'reading-lamp-texture': 'images/texture/studio/livingroom/reading-lamp.jpg',
				'boxes-texture': 'images/texture/studio/livingroom/boxes.jpg',
				'wardrobe-texture': 'images/texture/studio/livingroom/wardrobe.jpg',
				'pictures-texture': 'images/texture/studio/livingroom/pictures.jpg',
				'refrigerator-texture': 'images/texture/studio/livingroom/refrigerator.jpg',
				'refrigerator-door-texture': 'images/texture/studio/livingroom/refrigerator-door.jpg',
				'crystal-texture': 'images/texture/studio/livingroom/crystal.jpg',
				'carpet-texture': 'images/texture/studio/livingroom/carpet.jpg',
				'laptop-texture': 'images/texture/studio/livingroom/laptop.jpg',
				'apple-texture': 'images/texture/studio/livingroom/apple.jpg',
				'pineapple-texture': 'images/texture/studio/livingroom/pineapple.jpg',
				'orange-texture': 'images/texture/studio/livingroom/orange.jpg',
				'peach-texture': 'images/texture/studio/livingroom/peach.jpg',
				'window-left-texture': 'images/texture/studio/livingroom/window-left.jpg',
				'window-left-switch-texture': 'images/texture/studio/livingroom/window-left-switch.jpg',
				'window-right-texture': 'images/texture/studio/livingroom/window-right.jpg',
				'window-right-switch-texture': 'images/texture/studio/livingroom/window-right-switch.jpg',
				'skybox': {
					'xpos': 'images/texture/studio/livingroom/skybox/pos-x.png',
					'xneg': 'images/texture/studio/livingroom/skybox/neg-x.png',
					'ypos': 'images/texture/studio/livingroom/skybox/pos-y.png',
					'yneg': 'images/texture/studio/livingroom/skybox/neg-y.png',
					'zpos': 'images/texture/studio/livingroom/skybox/pos-z.png',
					'zneg': 'images/texture/studio/livingroom/skybox/neg-z.png'
				}
			},
			'bathroom': {
				'scene-data': 'json/studio-bathroom.json',
				'floor-texture': 'images/texture/studio/bathroom/floor.jpg',
				'ceiling-texture': 'images/texture/studio/bathroom/ceiling.jpg',
				'wall-texture': 'images/texture/studio/bathroom/wall.jpg',
				'wall-outer-texture': 'images/texture/studio/bathroom/wall-outer.jpg',
				'door-frame-texture': 'images/texture/studio/bathroom/door-frame.jpg',
				'ceiling-lamps-texture': 'images/texture/studio/bathroom/ceiling-lamps.jpg',
				'bathrobe-texture': 'images/texture/studio/bathroom/bathrobe.jpg',
				'bathtub-texture': 'images/texture/studio/bathroom/bathtub.jpg',
				'shower-curtain-texture': 'images/texture/studio/bathroom/shower-curtain.jpg',
				'lotus-texture': 'images/texture/studio/bathroom/lotus.jpg',
				'towel-texture': 'images/texture/studio/bathroom/towel.jpg',
				'showerhead-texture': 'images/texture/studio/bathroom/showerhead.jpg',
				'shower-handle-texture': 'images/texture/studio/bathroom/shower-handle.jpg',
				'shelf-texture': 'images/texture/studio/bathroom/shelf.jpg',
				'jar-1-texture': 'images/texture/studio/bathroom/jar-1.jpg',
				'jar-2-texture': 'images/texture/studio/bathroom/jar-2.jpg',
				'jar-3-texture': 'images/texture/studio/bathroom/jar-3.jpg',
				'jar-4-texture': 'images/texture/studio/bathroom/jar-4.jpg',
				'jar-5-texture': 'images/texture/studio/bathroom/jar-5.jpg',
				'jar-6-texture': 'images/texture/studio/bathroom/jar-6.jpg',
				'jar-7-texture': 'images/texture/studio/bathroom/jar-7.jpg',
				'jar-8-texture': 'images/texture/studio/bathroom/jar-8.jpg',
				'jar-9-texture': 'images/texture/studio/bathroom/jar-9.jpg',
				'closet-texture': 'images/texture/studio/bathroom/closet.jpg',
				'closet-door-texture': 'images/texture/studio/bathroom/closet-door.jpg',
				'trashcan-texture': 'images/texture/studio/bathroom/trashcan.jpg',
				'plug-texture': 'images/texture/studio/bathroom/plug.jpg',
				'fragrance-texture': 'images/texture/studio/bathroom/fragrance.jpg',
				'carpets-texture': 'images/texture/studio/bathroom/carpets.jpg',
				'toilet-texture': 'images/texture/studio/bathroom/toilet.jpg',
				'toilet-paper-texture': 'images/texture/studio/bathroom/toilet-paper.jpg',
				'washbasin-texture': 'images/texture/studio/bathroom/washbasin.jpg',
				'lamps-texture': 'images/texture/studio/bathroom/lamps.jpg',
				'flipflop-texture': 'images/texture/studio/bathroom/flipflop.jpg',
				'bottles-texture': 'images/texture/studio/bathroom/bottles.jpg',
				'towel-roll-texture': 'images/texture/studio/bathroom/towel-roll.jpg',
				'cosmetic-bag-texture': 'images/texture/studio/bathroom/cosmetic-bag.jpg',
				'skybox': {
					'xpos': 'images/texture/studio/livingroom/skybox/pos-x.png',
					'xneg': 'images/texture/studio/livingroom/skybox/neg-x.png',
					'ypos': 'images/texture/studio/livingroom/skybox/pos-y.png',
					'yneg': 'images/texture/studio/livingroom/skybox/neg-y.png',
					'zpos': 'images/texture/studio/livingroom/skybox/pos-z.png',
					'zneg': 'images/texture/studio/livingroom/skybox/neg-z.png'
				}
			}
		},
		'house': {
			'global': {
				'character': {
					'joanna-data': 'json/characters/joanna.json',
					'joanna': 'images/characters/joanna.png',
					'scott-data': 'json/characters/scott.json',
					'scott': 'images/characters/scott.png',
					'nick-data': 'json/characters/nick.json',
					'nick': 'images/characters/nick.png'
				}
			},
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
				'scene-data': 'json/house-boysroom.json',
				'floor-texture': 'images/texture/house/boysroom/floor.jpg',
				'ceiling-texture': 'images/texture/house/boysroom/ceiling.jpg',
				'wall-texture': 'images/texture/house/boysroom/wall.jpg',
				'wall-outer-texture': 'images/texture/house/boysroom/wall-outer.jpg',
				'cabinet-texture': 'images/texture/house/boysroom/cabinet.jpg',
				'bed-texture': 'images/texture/house/boysroom/bed.jpg',
				'big-frame-texture': 'images/texture/house/boysroom/big-frame.jpg',
				'decoration-pictures-texture': 'images/texture/house/boysroom/decoration-pictures.jpg',
				'ceiling-lamps-texture': 'images/texture/house/boysroom/ceiling-lamps.jpg',
				'stools-texture': 'images/texture/house/boysroom/stools.jpg',
				'football-texture': 'images/texture/house/boysroom/football.jpg',
				'bear-in-drawer-texture': 'images/texture/house/boysroom/bear-in-drawer.jpg',
				'moon-texture': 'images/texture/house/boysroom/moon.jpg',
				'carpet-texture': 'images/texture/house/boysroom/carpet.jpg',
				'shelf-stuff-1-texture': 'images/texture/house/boysroom/shelf-stuff-1.jpg',
				'shelf-stuff-2-texture': 'images/texture/house/boysroom/shelf-stuff-2.jpg',
				'shelf-stuff-3-texture': 'images/texture/house/boysroom/shelf-stuff-3.jpg',
				'shelf-stuff-4-texture': 'images/texture/house/boysroom/shelf-stuff-4.jpg',
				'shelf-stuff-5-texture': 'images/texture/house/boysroom/shelf-stuff-5.jpg',
				'shelf-stuff-6-texture': 'images/texture/house/boysroom/shelf-stuff-6.jpg',
				'toytrain-texture': 'images/texture/house/boysroom/toytrain.jpg',
				'sketchpad-texture': 'images/texture/house/boysroom/sketchpad.jpg',
				'nightstand-lamp-texture': 'images/texture/house/boysroom/nightstand-lamp.jpg',
				'yellow-reading-lamp-texture': 'images/texture/house/boysroom/yellow-reading-lamp.jpg',
				'blue-reading-lamp-texture': 'images/texture/house/boysroom/blue-reading-lamp.jpg',
				'bedding-texture': 'images/texture/house/boysroom/bedding.jpg',
				'chalkboard-texture': 'images/texture/house/boysroom/chalkboard.jpg',
				'slippers-texture': 'images/texture/house/boysroom/slippers.jpg',
				'table-books-texture': 'images/texture/house/boysroom/table-books.jpg',
				'computer-texture': 'images/texture/house/boysroom/computer.jpg',
				'table-texture': 'images/texture/house/boysroom/table.jpg',
				'table-stuff-texture': 'images/texture/house/boysroom/table-stuff.jpg',
				'desk-texture': 'images/texture/house/boysroom/desk.jpg',
				'swivel-chair-texture': 'images/texture/house/boysroom/swivel-chair.jpg',
				'shelf-left-texture': 'images/texture/house/boysroom/shelf-left.jpg',
				'shelf-right-texture': 'images/texture/house/boysroom/shelf-right.jpg',
				'pencil-vase-texture': 'images/texture/house/boysroom/pencil-vase.jpg',
				'nightstand-texture': 'images/texture/house/boysroom/nightstand.jpg',
				'drawer-texture': 'images/texture/house/boysroom/drawer.jpg',
				'handheld-nightstand-texture': 'images/texture/house/boysroom/handheld-nightstand.jpg',
				'window-texture': 'images/texture/house/boysroom/window.jpg',
				'window-frame-texture': 'images/texture/house/boysroom/window-frame.jpg',
				'door-frame-texture': 'images/texture/house/boysroom/door-frame.jpg',
				'skybox': {
					'xpos': 'images/texture/house/boysroom/skybox/pos-x.png',
					'xneg': 'images/texture/house/boysroom/skybox/neg-x.png',
					'ypos': 'images/texture/house/boysroom/skybox/pos-y.png',
					'yneg': 'images/texture/house/boysroom/skybox/neg-y.png',
					'zpos': 'images/texture/house/boysroom/skybox/pos-z.png',
					'zneg': 'images/texture/house/boysroom/skybox/neg-z.png'
				}
			},
			'homeoffice': {
				'scene-data': 'json/house-homeoffice.json',
				'floor-texture': 'images/texture/house/homeoffice/floor.jpg',
				'ceiling-texture': 'images/texture/house/homeoffice/ceiling.jpg',
				'wall-texture':	'images/texture/house/homeoffice/wall.jpg',
				'wall-outer-texture': 'images/texture/house/homeoffice/wall-outer.jpg',
				'swivel-chair-texture': 'images/texture/house/homeoffice/swivel-chair.jpg',
				'storage-texture': 'images/texture/house/homeoffice/storage.jpg',
				'setsquare-texture': 'images/texture/house/homeoffice/setsquare.jpg',
				'carpet-texture': 'images/texture/house/homeoffice/carpet.jpg',
				'door-frame-texture': 'images/texture/house/homeoffice/door-frame.jpg',
				'display-shelf-lamp-texture': 'images/texture/house/homeoffice/display-shelf-lamp.jpg',
				'bookshelf-lamps-texture': 'images/texture/house/homeoffice/bookshelf-lamps.jpg',
				'picture-frame-1-texture': 'images/texture/house/homeoffice/picture-frame-1.jpg',
				'picture-frame-2-texture': 'images/texture/house/homeoffice/picture-frame-2.jpg',
				'picture-frame-3-texture': 'images/texture/house/homeoffice/picture-frame-3.jpg',
				'picture-frame-4-texture': 'images/texture/house/homeoffice/picture-frame-4.jpg',
				'block-shelf-1-texture': 'images/texture/house/homeoffice/block-shelf-1.jpg',
				'block-shelf-2-texture': 'images/texture/house/homeoffice/block-shelf-2.jpg',
				'block-stuff-1-texture': 'images/texture/house/homeoffice/block-stuff-1.jpg',
				'block-stuff-2-texture': 'images/texture/house/homeoffice/block-stuff-2.jpg',
				'books-1-texture': 'images/texture/house/homeoffice/books-1.jpg',
				'books-2-texture': 'images/texture/house/homeoffice/books-2.jpg',
				'round-lamp-texture': 'images/texture/house/homeoffice/round-lamp.jpg',
				'calendar-texture': 'images/texture/house/homeoffice/calendar.jpg',
				'magazine-texture': 'images/texture/house/homeoffice/magazine.jpg',
				'window-texture': 'images/texture/house/homeoffice/window.jpg',
				'armchair-texture': 'images/texture/house/homeoffice/armchair.jpg',
				'coffeecup-texture': 'images/texture/house/homeoffice/coffeecup.jpg',
				'writing-desk-texture': 'images/texture/house/homeoffice/writing-desk.jpg',
				'dracaena-fragrans-texture': 'images/texture/house/homeoffice/dracaena-fragrans.jpg',
				'handbag-texture': 'images/texture/house/homeoffice/handbag.jpg',
				'pen-vase-texture': 'images/texture/house/homeoffice/pen-vase.jpg',
				'rubberplant-texture': 'images/texture/house/homeoffice/rubberplant.jpg',
				'coffee-table-texture': 'images/texture/house/homeoffice/coffee-table.jpg',
				'floor-lamp-texture': 'images/texture/house/homeoffice/floor-lamp.jpg',
				'ceiling-lamp-texture': 'images/texture/house/homeoffice/ceiling-lamp.jpg',
				'cup-texture': 'images/texture/house/homeoffice/cup.jpg',
				'reading-lamp-1-texture': 'images/texture/house/homeoffice/reading-lamp-1.jpg',
				'reading-lamp-2-texture': 'images/texture/house/homeoffice/reading-lamp-2.jpg',
				'sofa-texture': 'images/texture/house/homeoffice/sofa.jpg',
				'trash-texture': 'images/texture/house/homeoffice/trash.jpg',
				'display-shelf-texture': 'images/texture/house/homeoffice/display-shelf.jpg',
				'computer-texture': 'images/texture/house/homeoffice/computer.jpg',
				'laptop-texture': 'images/texture/house/homeoffice/laptop.jpg',
				'curtain-texture': 'images/texture/house/homeoffice/curtain.jpg',
				'curtain-rod-texture': 'images/texture/house/homeoffice/curtain-rod.jpg',
				'telephone-texture': 'images/texture/house/homeoffice/telephone.jpg',
				'bookshelf-texture': 'images/texture/house/homeoffice/bookshelf.jpg',
				'bookshelf-stuff-texture': 'images/texture/house/homeoffice/bookshelf-stuff.jpg',
				'skybox': {
					'xpos': 'images/texture/house/boysroom/skybox/pos-x.png',
					'xneg': 'images/texture/house/boysroom/skybox/neg-x.png',
					'ypos': 'images/texture/house/boysroom/skybox/pos-y.png',
					'yneg': 'images/texture/house/boysroom/skybox/neg-y.png',
					'zpos': 'images/texture/house/boysroom/skybox/pos-z.png',
					'zneg': 'images/texture/house/boysroom/skybox/neg-z.png'
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
				
				// if obj is an Object contains keys, parse it again
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