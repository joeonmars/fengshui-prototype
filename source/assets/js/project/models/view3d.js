goog.provide('feng.models.View3D');


feng.models.View3D.Data = {

	'studio': {
		'livingroom-test': {
			'ground': {
				receiveShadow: true
			},
			'wall':	{
				collidable: true
			},
			'sofa': {
				class: "tip",
				collidable: true,
				interactions: [
					"move",
					"rotate"
				],
				tipInteraction: "change_color",
				tipKey: 'studio.livingroom.chair'
			},
			'cabinet': {
				class: "holder",
				holderType: "accessory",
				collidable: true,
				texture: "studio.livingroom.cabinet-texture",
				interactions: [
					"move",
					"rotate"
				],
				tipInteraction: "change_color",
				tipKey: 'studio.livingroom.chair'
			},
			'bed': {
				class: "holder",
				holderType: "accessory",
				collidable: true,
				texture: "studio.livingroom.bed-texture",
				interactions: [
					"move",
					"rotate"
				],
				camera: {
					position: new THREE.Vector3(-105.44, 89.50, 116.23),
					rotation: new THREE.Euler(-0.34, -0.80, 0.00, 'YXZ'),
					fov: 60
				},
				tipInteraction: "change_color",
				tipKey: 'studio.livingroom.chair'
			},
			'door': {
				class: "gateway",
				collidable: true,
				viewid: "interior2",
				gatewayid: "door"
			},
			'stairsway': {
				class: "stairs",
				collidable: true
			},
			'picture': {
				class: 'picturedisplay',
				interactions: [
					'change_picture'
				],
				tipInteraction: 'change_picture',
				tipKey: 'studio.livingroom.frame',
				camera: {
					position: new THREE.Vector3(57.56, 90.49, -16.61),
					rotation: new THREE.Euler(-0.24, -1.68, 0.00, 'YXZ'),
					fov: 40
				},
				pictures: [
					{
						id: 'studio.livingroom.pictures.1',
						description: 'This is a dummy picture. Its name is picture 1.'
					},
					{
						id: 'studio.livingroom.pictures.2',
						description: 'This is a dummy picture. Its name is picture 2.'
					},
					{
						id: 'studio.livingroom.pictures.3',
						description: 'This is a dummy picture. Its name is picture 3.'
					},
					{
						id: 'studio.livingroom.pictures.4',
						description: 'This is a dummy picture. Its name is picture 4.'
					},
					{
						id: 'studio.livingroom.pictures.5',
						description: 'This is a dummy picture. Its name is picture 5.'
					},
					{
						id: 'studio.livingroom.pictures.6',
						description: 'This is a dummy picture. Its name is picture 6.'
					},
					{
						id: 'studio.livingroom.pictures.7',
						description: 'This is a dummy picture. Its name is picture 7.'
					},
					{
						id: 'studio.livingroom.pictures.8',
						description: 'This is a dummy picture. Its name is picture 8.'
					},
					{
						id: 'studio.livingroom.pictures.9',
						description: 'This is a dummy picture. Its name is picture 9.'
					},
					{
						id: 'studio.livingroom.pictures.10',
						description: 'This is a dummy picture. Its name is picture 10.'
					}
				]
			},
			'frame1': {
				class: 'pictureframe',
				defaultTexture: 'studio.livingroom.default-picture'
			},
			'frame2': {
				class: 'pictureframe',
				defaultTexture: 'studio.livingroom.default-picture'
			}
		},
		'interior2': {
			'ground': {
				receiveShadow: true
			},
			'door': {
				class: "gateway",
				collidable: true,
				viewid: "bathroom",
				gatewayid: "door"
			},
			'pc': {
				collidable: true,
				texture: "studio.interior2.pc-texture",
				interactions: [
					"move",
					"rotate"
				]
			},
			'screen': {
				texture: {
					defaultTexture: "studio.interior2.screensaver-texture",
					htiles: 45,
					vtiles: 1,
					ntiles: 45,
					duration: 100
				}
			},
			'cactus': {
				texture: "studio.interior2.cactus-texture"
			}
		},
		'livingroom': {
			'studio-door': {
				class: "gateway",
				viewid: "interior2",
				gatewayid: "door",
				castShadow: true,
				isEntry: true,
				origin: {
					position: new THREE.Vector3(-240, 0, 34),
					rotation: new THREE.Euler(0, -Math.PI/2, 0)
				}
			},
			'bathroom-door': {
				class: "gateway",
				viewid: "interior2",
				gatewayid: "door",
				castShadow: true,
				isEntry: false,
				origin: {
					position: new THREE.Vector3(-240, 0, 34),
					rotation: new THREE.Euler(0, -Math.PI/2, 0)
				}
			},
			'wall':	{
				collidable: true,
				castShadow: true,
				texture: "studio.livingroom.wall-texture"
			},
			'wall-outer':	{
				castShadow: true,
				texture: "studio.livingroom.wall-outer-texture"
			},
			'ceiling':	{
				texture: "studio.livingroom.ceiling-texture"
			},
			'floor': {
				texture: "studio.livingroom.floor-texture"
			},
			'bed':	{
				collidable: true,
				texture: "studio.livingroom.bed-texture"
			},
			'kitchen-cabinets':	{
				collidable: true,
				texture: "studio.livingroom.kitchen-cabinets-texture"
			},
			'sofabed':	{
				collidable: true,
				texture: "studio.livingroom.sofabed-texture"
			},
			'sofabed-cabinet':	{
				collidable: true,
				texture: "studio.livingroom.sofabed-cabinet-texture"
			},
			'kitchen-storage':	{
				collidable: true,
				texture: "studio.livingroom.kitchen-storage-texture"
			},
			'coffee-pot':	{
				texture: "studio.livingroom.coffee-pot-texture"
			},
			'round-lamp':	{
				class: 'lamp',
				interactions: [
					"move",
					"rotate"
				],
				colors: [
					"pink",
					"yellow",
					"white",
					"orange"
				],
				tipInteraction: "change_color",
				tipKey: 'studio.livingroom.lamp',
				texture: "studio.livingroom.round-lamp-texture"
			},
			'reading-lamp':	{
				texture: "studio.livingroom.reading-lamp-texture"
			},
			'ventilator':	{
				texture: "studio.livingroom.ventilator-texture"
			},
			'microwave':	{
				texture: "studio.livingroom.microwave-texture"
			},
			'fruitplate':	{
				class: 'fruitplate',
				camera: {
					position: new THREE.Vector3(-84, 80, -87),
					rotation: new THREE.Euler(-0.59, 2.02, 0.00, 'YXZ'),
					fov: 40
				},
				texture: "studio.livingroom.fruitplate-texture",
				tipInteraction: "drop",
				tipKey: 'studio.livingroom.basket',
				captionClass: 'fruits'
			},
			'dining-table':	{
				collidable: true,
				texture: "studio.livingroom.dining-table-texture"
			},
			'dining-chair':	{
				class: "movable",
				collidable: true,
				castShadow: true,
				texture: "studio.livingroom.dining-chair-texture",
				interactions: [
					"move",
					"rotate"
				],
				destination: new THREE.Vector3(0, 0, 0),
				range: 80,
				tipInteraction: "change_object",
				tipKey: 'studio.livingroom.chair'
			},
			'window-books':	{
				texture: "studio.livingroom.window-books-texture"
			},
			'clockset':	{
				texture: "studio.livingroom.clockset-texture"
			},
			'bed-shelf':	{
				texture: "studio.livingroom.bed-shelf-texture"
			},
			'tv-table':	{
				collidable: true,
				texture: "studio.livingroom.tv-table-texture"
			},
			'tv':	{
				texture: "studio.livingroom.tv-texture"
			},
			'sofa':	{
				collidable: true,
				texture: "studio.livingroom.sofa-texture"
			},
			'book-shelf':	{
				collidable: true,
				castShadow: true,
				texture: "studio.livingroom.book-shelf-texture"
			},
			'kitchen-shelf':	{
				texture: "studio.livingroom.kitchen-shelf-texture"
			},
			'nightstand':	{
				collidable: true,
				texture: "studio.livingroom.nightstand-texture"
			},
			'sewingmachine':	{
				texture: "studio.livingroom.sewingmachine-texture"
			},
			'sewingmachine-cover':	{
				texture: "studio.livingroom.sewingmachine-cover-texture"
			},
			'boxes':	{
				texture: "studio.livingroom.boxes-texture"
			},
			'shoestorage':	{
				collidable: true,
				texture: "studio.livingroom.shoestorage-texture"
			},
			'wardrobe':	{
				collidable: true,
				texture: "studio.livingroom.wardrobe-texture"
			},
			'windows': {
				class: "windows",
				interactions: [

				],
				tipInteraction: "change_object",
				tipKey: 'studio.livingroom.windows'
			},
			'refrigerator':	{
				class: "refrigerator",
				collidable: true,
				interactions: [

				],
				camera: {
					position: new THREE.Vector3(-110, 80, -120),
					rotation: new THREE.Euler(-0.64, -1.57, 0.00, 'YXZ'),
					fov: 40
				},
				tipInteraction: "change_object",
				tipKey: 'studio.livingroom.refrigerator',
				texture: "studio.livingroom.refrigerator-texture"
			},
			'refrigerator-door': {
				texture: "studio.livingroom.refrigerator-door-texture"
			},
			'apple': {
				texture: "studio.livingroom.apple-texture"
			},
			'pineapple': {
				texture: "studio.livingroom.pineapple-texture"
			},
			'orange': {
				texture: "studio.livingroom.orange-texture"
			},
			'peach': {
				texture: "studio.livingroom.peach-texture"
			}
		},
		'bathroom': {
			'floor': {
				texture: "studio.bathroom.floor-texture"
			},
			'wall':	{
				collidable: true,
				castShadow: true,
				texture: "studio.bathroom.wall-texture"
			},
			'wall-outer':	{
				castShadow: true,
				texture: "studio.bathroom.wall-outer-texture"
			},
			'door-frame':	{
				texture: "studio.bathroom.door-frame-texture"
			},
			'ceiling':	{
				texture: "studio.bathroom.ceiling-texture"
			},
			'ceiling-lamps':	{
				texture: "studio.bathroom.ceiling-lamps-texture"
			},
			'lotus': {
				class: 'tip',
				interactions: [
					"move",
					"rotate"
				],
				texture: "studio.bathroom.lotus-texture",
				tipInteraction: "drop",
				tipKey: 'studio.bathroom.lotus'
			},
			'towel': {
				texture: "studio.bathroom.towel-texture"
			},
			'showerhead': {
				texture: "studio.bathroom.showerhead-texture"
			},
			'shower-handle': {
				texture: "studio.bathroom.shower-handle-texture"
			},
			'shelf': {
				collidable: true,
				texture: "studio.bathroom.shelf-texture"
			},
			'jar-1': {
				castShadow: true,
				texture: "studio.bathroom.jar-1-texture"
			},
			'jar-2': {
				castShadow: true,
				texture: "studio.bathroom.jar-2-texture"
			},
			'jar-3': {
				castShadow: true,
				texture: "studio.bathroom.jar-3-texture"
			},
			'jar-4': {
				castShadow: true,
				texture: "studio.bathroom.jar-4-texture"
			},
			'jar-5': {
				castShadow: true,
				texture: "studio.bathroom.jar-5-texture"
			},
			'jar-6': {
				castShadow: true,
				texture: "studio.bathroom.jar-6-texture"
			},
			'jar-7': {
				castShadow: true,
				texture: "studio.bathroom.jar-7-texture"
			},
			'jar-8': {
				castShadow: true,
				texture: "studio.bathroom.jar-8-texture"
			},
			'jar-9': {
				castShadow: true,
				texture: "studio.bathroom.jar-9-texture"
			},
			'bottles': {
				texture: "studio.bathroom.bottles-texture",
			},
			'towel-roll': {
				texture: "studio.bathroom.towel-roll-texture"
			},
			'cosmetic-bag': {
				texture: "studio.bathroom.cosmetic-bag-texture",
			},
			'closet': {
				class: "closet",
				receiveShadow: true,
				interactions: [

				],
				camera: {
					position: new THREE.Vector3(35, 81, -47),
					rotation: new THREE.Euler(-0.07, 1.70, 0.00, 'YXZ'),
					fov: 40
				},
				tipInteraction: "change_object",
				tipKey: 'studio.bathroom.closet',
				captionClass: 'arrangecloset',
				texture: "studio.bathroom.closet-texture"
			},
			'closet-door': {
				texture: "studio.bathroom.closet-door-texture",
			},
			'trashcan': {
				collidable: true,
				texture: "studio.bathroom.trashcan-texture"
			},
			'plug': {
				texture: "studio.bathroom.plug-texture"
			},
			'fragrance': {
				texture: "studio.bathroom.fragrance-texture"
			},
			'toilet-paper': {
				texture: "studio.bathroom.toilet-paper-texture"
			},
			'toilet': {
				collidable: true,
				texture: "studio.bathroom.toilet-texture"
			},
			'bathrobe': {
				texture: "studio.bathroom.bathrobe-texture"
			},
			'bathtub': {
				texture: "studio.bathroom.bathtub-texture"
			},
			'shower-curtain': {
				collidable: true,
				texture: "studio.bathroom.shower-curtain-texture"
			},
			'carpets': {
				texture: "studio.bathroom.carpets-texture"
			},
			'washbasin': {
				collidable: true,
				texture: "studio.bathroom.washbasin-texture"
			},
			'flipflop': {
				texture: "studio.bathroom.flipflop-texture"
			},
			'lamps': {
				collidable: true,
				texture: "studio.bathroom.lamps-texture"
			},
			'bathroom-door': {
				class: "gateway",
				viewid: "bathroom",
				gatewayid: "door",
				castShadow: true,
				isEntry: true,
				origin: {
					position: new THREE.Vector3(12, 0, -60),
					rotation: new THREE.Euler(0, Math.PI, 0)
				}
			}
		}
	},
	'townhouse': {
		'livingroom': {
			'ground': {
				receiveShadow: true
			},
			'wall':	{
				collidable: true
			},
			'cabinet': {
				collidable: true,
				texture: "townhouse.livingroom.cabinet-texture"
			},
			'bed': {
				collidable: true,
				texture: "townhouse.livingroom.bed-texture"
			}
		},
		'boysroom': {
			'floor': {
				texture: "townhouse.boysroom.floor-texture"
			},
			'wall':	{
				collidable: true,
				castShadow: true,
				texture: "townhouse.boysroom.wall-texture"
			},
			'wall-outer':	{
				castShadow: true,
				texture: "townhouse.boysroom.wall-outer-texture"
			},
			'ceiling':	{
				texture: "townhouse.boysroom.ceiling-texture"
			},
			'cabinet':	{
				collidable: true,
				texture: "townhouse.boysroom.cabinet-texture"
			},
			'bed': {
				collidable: true,
				texture: "townhouse.boysroom.bed-texture"
			},
			'big-frame': {
				texture: "townhouse.boysroom.big-frame-texture"
			},
			'decoration-pictures': {
				texture: "townhouse.boysroom.decoration-pictures-texture"
			},
			'carpet':	{
				texture: "townhouse.boysroom.carpet-texture"
			},
			'stools': {
				collidable: true,
				texture: "townhouse.boysroom.stools-texture"
			},
			'football': {
				collidable: true,
				texture: "townhouse.boysroom.football-texture"
			},
			'moon': {
				texture: "townhouse.boysroom.moon-texture"
			},
			'shelf-stuff-1': {
				texture: "townhouse.boysroom.shelf-stuff-1-texture"
			},
			'shelf-stuff-2': {
				texture: "townhouse.boysroom.shelf-stuff-2-texture"
			},
			'shelf-stuff-3': {
				texture: "townhouse.boysroom.shelf-stuff-3-texture"
			},
			'shelf-stuff-4': {
				texture: "townhouse.boysroom.shelf-stuff-4-texture"
			},
			'shelf-stuff-5': {
				texture: "townhouse.boysroom.shelf-stuff-5-texture"
			},
			'shelf-stuff-6': {
				texture: "townhouse.boysroom.shelf-stuff-6-texture"
			},
			'toytrain': {
				texture: "townhouse.boysroom.toytrain-texture"
			},
			'computer': {
				texture: "townhouse.boysroom.computer-texture"
			},
			'desk': {
				collidable: true,
				texture: "townhouse.boysroom.desk-texture"
			},
			'table': {
				collidable: true,
				texture: "townhouse.boysroom.table-texture"
			},
			'table-stuff': {
				texture: "townhouse.boysroom.table-stuff-texture"
			},
			'swivel-chair': {
				collidable: true,
				texture: "townhouse.boysroom.swivel-chair-texture"
			},
			'nightstand': {
				collidable: true,
				texture: "townhouse.boysroom.nightstand-texture"
			},
			'pencil-vase': {
				texture: "townhouse.boysroom.pencil-vase-texture"
			},
			'boysroom-door': {
				class: "gateway",
				viewid: "bathroom",
				gatewayid: "door",
				castShadow: true,
				isEntry: true,
				origin: {
					position: new THREE.Vector3(78, 0, 33),
					rotation: new THREE.Euler(0, Math.PI/2, 0)
				}
			},
			'sketchpad': {
				texture: "townhouse.boysroom.sketchpad-texture"
			},
			'ceiling-lamps': {
				texture: "townhouse.boysroom.ceiling-lamps-texture"
			},
			'nightstand-lamp': {
				texture: "townhouse.boysroom.nightstand-lamp-texture"
			},
			'yellow-reading-lamp': {
				texture: "townhouse.boysroom.yellow-reading-lamp-texture"
			},
			'blue-reading-lamp': {
				texture: "townhouse.boysroom.blue-reading-lamp-texture"
			},
			'bedding': {
				texture: "townhouse.boysroom.bedding-texture"
			},
			'chalkboard': {
				texture: "townhouse.boysroom.chalkboard-texture"
			},
			'slippers': {
				texture: "townhouse.boysroom.slippers-texture"
			},
			'table-books': {
				texture: "townhouse.boysroom.table-books-texture"
			},
			'shelf-left': {
				collidable: true,
				texture: "townhouse.boysroom.shelf-left-texture"
			},
			'shelf-right': {
				collidable: true,
				texture: "townhouse.boysroom.shelf-right-texture"
			},
			'drawer': {
				texture: "townhouse.boysroom.drawer-texture"
			},
			'bear': {
				class: 'tip',
				interactions: [
					"move",
					"rotate"
				],
				texture: "townhouse.boysroom.bear-in-drawer-texture",
				tipInteraction: "drop",
				tipKey: 'townhouse.boysroom.bear'
			},
			'handheld': {
				class: 'tip',
				interactions: [
					"move",
					"rotate"
				],
				camera: {
					position: new THREE.Vector3(-29, 56, 16),
					rotation: new THREE.Euler(-0.70, 1.55, 0.00, 'YXZ'),
					fov: 20
				},
				texture: "townhouse.boysroom.handheld-nightstand-texture",
				tipInteraction: "drop",
				tipKey: 'townhouse.boysroom.handheld'
			},
			'window': {
				texture: "townhouse.boysroom.window-texture"
			},
			'window-frame': {
				texture: "townhouse.boysroom.window-frame-texture"
			},
			'door-frame': {
				texture: "townhouse.boysroom.door-frame-texture"
			}
		},
		'homeoffice': {
			'floor': {
				texture: "townhouse.homeoffice.floor-texture"
			},
			'ceiling': {
				texture: "townhouse.homeoffice.ceiling-texture"
			},
			'wall':	{
				collidable: true,
				castShadow: true,
				texture: "townhouse.homeoffice.wall-texture"
			},
			'wall-outer':	{
				castShadow: true,
				texture: "townhouse.homeoffice.wall-outer-texture"
			},
			'homeoffice-door': {
				class: "gateway",
				viewid: "homeoffice",
				gatewayid: "door",
				castShadow: true,
				isEntry: true,
				origin: {
					position: new THREE.Vector3(68, 0, -53),
					rotation: new THREE.Euler(0, Math.PI/2, 0)
				}
			},
			'swivel-chair': {
				collidable: true,
				texture: "townhouse.homeoffice.swivel-chair-texture"
			},
			'storage': {
				collidable: true,
				texture: "townhouse.homeoffice.storage-texture"
			},
			'setsquare': {
				class: 'tip',
				interactions: [
					"move",
					"rotate"
				],
				texture: "townhouse.homeoffice.setsquare-texture",
				tipInteraction: "drop",
				tipKey: 'townhouse.homeoffice.setsquare'
			},
			'carpet': {
				texture: "townhouse.homeoffice.carpet-texture"
			},
			'door-frame': {
				texture: "townhouse.homeoffice.door-frame-texture"
			},
			'display-shelf-lamp': {
				texture: "townhouse.homeoffice.display-shelf-lamp-texture"
			},
			'bookshelf-lamps': {
				texture: "townhouse.homeoffice.bookshelf-lamps-texture"
			},
			'picture-frame-1': {
				texture: "townhouse.homeoffice.picture-frame-1-texture"
			},
			'picture-frame-2': {
				texture: "townhouse.homeoffice.picture-frame-2-texture"
			},
			'picture-frame-3': {
				texture: "townhouse.homeoffice.picture-frame-3-texture"
			},
			'picture-frame-4': {
				texture: "townhouse.homeoffice.picture-frame-4-texture"
			},
			'block-shelf-1':	{
				texture: "townhouse.homeoffice.block-shelf-1-texture"
			},
			'block-shelf-2':	{
				texture: "townhouse.homeoffice.block-shelf-2-texture"
			},
			'block-stuff-1':	{
				texture: "townhouse.homeoffice.block-stuff-1-texture"
			},
			'block-stuff-2':	{
				texture: "townhouse.homeoffice.block-stuff-2-texture"
			},
			'books-1':	{
				texture: "townhouse.homeoffice.books-1-texture"
			},
			'books-2':	{
				texture: "townhouse.homeoffice.books-2-texture"
			},
			'round-lamp':	{
				collidable: true,
				texture: "townhouse.homeoffice.round-lamp-texture"
			},
			'calendar':	{
				texture: "townhouse.homeoffice.calendar-texture"
			},
			'magazine':	{
				texture: "townhouse.homeoffice.magazine-texture"
			},
			'window':	{
				texture: "townhouse.homeoffice.window-texture"
			},
			'armchair':	{
				collidable: true,
				texture: "townhouse.homeoffice.armchair-texture"
			},
			'coffeecup':	{
				texture: "townhouse.homeoffice.coffeecup-texture"
			},
			'writing-desk':	{
				collidable: true,
				texture: "townhouse.homeoffice.writing-desk-texture"
			},
			'dracaena-fragrans': {
				collidable: true,
				texture: "townhouse.homeoffice.dracaena-fragrans-texture"
			},
			'handbag': {
				texture: "townhouse.homeoffice.handbag-texture"
			},
			'pen-vase': {
				texture: "townhouse.homeoffice.pen-vase-texture"
			},
			'rubberplant': {
				texture: "townhouse.homeoffice.rubberplant-texture"
			},
			'coffee-table':	{
				collidable: true,
				texture: "townhouse.homeoffice.coffee-table-texture"
			},
			'coffeecup': {
				texture: "townhouse.homeoffice.coffeecup-texture"
			},
			'floor-lamp': {
				collidable: true,
				texture: "townhouse.homeoffice.floor-lamp-texture"
			},
			'ceiling-lamp': {
				texture: "townhouse.homeoffice.ceiling-lamp-texture"
			},
			'cup': {
				texture: "townhouse.homeoffice.cup-texture"
			},
			'reading-lamp-1': {
				texture: "townhouse.homeoffice.reading-lamp-1-texture"
			},
			'reading-lamp-2': {
				texture: "townhouse.homeoffice.reading-lamp-2-texture"
			},
			'sofa': {
				collidable: true,
				texture: "townhouse.homeoffice.sofa-texture"
			},
			'trash': {
				texture: "townhouse.homeoffice.trash-texture"
			},
			'display-shelf': {
				collidable: true,
				texture: "townhouse.homeoffice.display-shelf-texture"
			},
			'computer':	{
				texture: "townhouse.homeoffice.computer-texture"
			},
			'laptop':	{
				texture: "townhouse.homeoffice.laptop-texture"
			},
			'curtain':	{
				texture: "townhouse.homeoffice.curtain-texture"
			},
			'curtain-rod':	{
				texture: "townhouse.homeoffice.curtain-rod-texture"
			},
			'telephone':	{
				texture: "townhouse.homeoffice.telephone-texture"
			},
			'bookshelf':	{
				collidable: true,
				texture: "townhouse.homeoffice.bookshelf-texture"
			},
			'bookshelf-stuff':	{
				texture: "townhouse.homeoffice.bookshelf-stuff-texture"
			}
		}
	}
};


feng.models.View3D.getData = function(keyString) {

	var keys = keyString.split('.');
	var data = feng.models.View3D.Data;
	goog.array.forEach(keys, function(key) {
		data = data[key];
	});

	return data || {};
};