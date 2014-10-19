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
				Class: "tip",
				collidable: true,
				interactions: [
					"move",
					"rotate"
				],
				tipInteraction: "change_color",
				tipKey: 'studio.livingroom.chair'
			},
			'cabinet': {
				Class: "holder",
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
				Class: "holder",
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
				Class: "gateway",
				collidable: true,
				viewid: "interior2",
				gatewayid: "door"
			},
			'stairsway': {
				Class: "stairs",
				collidable: true
			},
			'picture': {
				Class: 'picturedisplay',
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
				Class: 'pictureframe',
				defaultTexture: 'studio.livingroom.default-picture'
			},
			'frame2': {
				Class: 'pictureframe',
				defaultTexture: 'studio.livingroom.default-picture'
			}
		},
		'interior2': {
			'ground': {
				receiveShadow: true
			},
			'door': {
				Class: "gateway",
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
				Class: "gateway",
				viewid: "livingroom",
				gatewayid: "studio-door",
				castShadow: true,
				isEntry: true,
				origin: {
					position: new THREE.Vector3(-240, 0, 34),
					rotation: new THREE.Euler(0, -Math.PI/2, 0)
				},
				texture: "studio.livingroom.studio-door-texture"
			},
			'studio-door-handle': {
				texture: "studio.livingroom.studio-door-handle-texture"
			},
			'studio-door-frame': {
				texture: "studio.livingroom.studio-door-frame-texture"
			},
			'bathroom-door': {
				Class: "gateway",
				viewid: "bathroom",
				gatewayid: "bathroom-door",
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
				castShadow: true,
				texture: "studio.livingroom.ceiling-texture"
			},
			'ceiling-lamp-1':	{
				texture: "studio.livingroom.ceiling-lamp-1-texture"
			},
			'ceiling-lamp-2':	{
				texture: "studio.livingroom.ceiling-lamp-2-texture"
			},
			'floor': {
				texture: "studio.livingroom.floor-texture",
				receiveShadow: true
			},
			'bed':	{
				collidable: true,
				texture: "studio.livingroom.bed-texture"
			},
			'kitchen-cabinets':	{
				collidable: true,
				texture: "studio.livingroom.kitchen-cabinets-texture"
			},
			'kitchen-ware':	{
				texture: "studio.livingroom.kitchen-ware-texture"
			},
			'linen-cabinet':	{
				collidable: true,
				texture: "studio.livingroom.linen-cabinet-texture"
			},
			'mirror':	{
				Class: "mirror"
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
				Class: 'lamp',
				interactions: [
					"move",
					"rotate"
				],
				colors: [
					"pink",
					"yellow",
					"orange"
				],
				tipInteraction: "change_color",
				tipKey: 'studio.livingroom.readinglamp',
				texture: "studio.livingroom.round-lamp-texture",
				captionClass: 'changecolor'
			},
			'reading-lamp':	{
				texture: "studio.livingroom.reading-lamp-texture"
			},
			'hood':	{
				texture: "studio.livingroom.hood-texture"
			},
			'microwave':	{
				texture: "studio.livingroom.microwave-texture"
			},
			'fruitplate':	{
				Class: 'fruitplate',
				camera: {
					position: new THREE.Vector3(-84, 80, -87),
					rotation: new THREE.Euler(-0.59, 2.02, 0.00, 'YXZ'),
					fov: 40
				},
				texture: "studio.livingroom.fruitplate-texture",
				tipInteraction: "drop",
				tipKey: 'studio.livingroom.fruitplate',
				captionClass: 'dropfruits'
			},
			'dining-table':	{
				collidable: true,
				texture: "studio.livingroom.dining-table-texture"
			},
			'dining-chair':	{
				Class: "movable",
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
				tipKey: 'studio.livingroom.diningchair'
			},
			'window-books':	{
				texture: "studio.livingroom.window-books-texture"
			},
			'clock':	{
				Class: "tip",
				texture: "studio.livingroom.clock-texture",
				interactions: [
				],
				tipInteraction: "",
				tipKey: 'studio.livingroom.clock'
			},
			'seasoning':	{
				texture: "studio.livingroom.seasoning-texture"
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
			'pictures':	{
				texture: "studio.livingroom.pictures-texture"
			},
			'boxes':	{
				texture: "studio.livingroom.boxes-texture"
			},
			'shoestorage':	{
				collidable: true,
				texture: "studio.livingroom.shoestorage-texture"
			},
			'carpet':	{
				texture: "studio.livingroom.carpet-texture"
			},
			'crystal':	{
				Class: "tip",
				texture: "studio.livingroom.crystal-texture",
				interactions: [
				],
				tipInteraction: "",
				tipKey: 'studio.livingroom.crystal'
			},
			'laptop':	{
				texture: "studio.livingroom.laptop-texture"
			},
			'wardrobe':	{
				collidable: true,
				texture: "studio.livingroom.wardrobe-texture"
			},
			'window-left': {
				texture: "studio.livingroom.window-left-texture"
			},
			'window-right': {
				texture: "studio.livingroom.window-right-texture"
			},
			'window-left-switch': {
				texture: "studio.livingroom.window-left-switch-texture"
			},
			'window-right-switch': {
				texture: "studio.livingroom.window-right-switch-texture"
			},
			'refrigerator':	{
				collidable: true,
				texture: "studio.livingroom.refrigerator-texture"
			},
			'refrigerator-door': {
				Class: "refrigerator",
				texture: "studio.livingroom.refrigerator-door-texture",
				interactions: [

				],
				camera: {
					position: new THREE.Vector3(-110, 80, -120),
					rotation: new THREE.Euler(-0.64, -1.57, 0.00, 'YXZ'),
					fov: 40
				},
				tipInteraction: "change_object",
				tipKey: 'studio.livingroom.refrigerator'
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
				texture: "studio.bathroom.floor-texture",
				receiveShadow: true
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
				Class: 'tip',
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
				Class: 'tip',
				interactions: [
					"move",
					"rotate"
				],
				texture: "studio.bathroom.showerhead-texture",
				tipInteraction: "drop",
				tipKey: 'studio.bathroom.showerhead'
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
				texture: "studio.bathroom.bottles-texture"
			},
			'towel-roll': {
				texture: "studio.bathroom.towel-roll-texture"
			},
			'cosmetic-bag': {
				texture: "studio.bathroom.cosmetic-bag-texture"
			},
			'closet': {
				texture: "studio.bathroom.closet-texture"
			},
			'closet-door': {
				Class: "closet",
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
				texture: "studio.bathroom.closet-door-texture"
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
				Class: "gateway",
				viewid: "livingroom",
				gatewayid: "bathroom-door",
				castShadow: true,
				isEntry: true,
				origin: {
					position: new THREE.Vector3(12, 0, -60),
					rotation: new THREE.Euler(0, Math.PI, 0)
				}
			}
		}
	},
	'house': {
		'livingroom': {
			'ground': {
				receiveShadow: true
			},
			'wall':	{
				collidable: true
			},
			'cabinet': {
				collidable: true,
				texture: "house.livingroom.cabinet-texture"
			},
			'bed': {
				collidable: true,
				texture: "house.livingroom.bed-texture"
			}
		},
		'boysroom': {
			'floor': {
				texture: "house.boysroom.floor-texture",
				receiveShadow: true
			},
			'wall':	{
				collidable: true,
				castShadow: true,
				texture: "house.boysroom.wall-texture"
			},
			'wall-outer':	{
				castShadow: true,
				texture: "house.boysroom.wall-outer-texture"
			},
			'ceiling':	{
				texture: "house.boysroom.ceiling-texture"
			},
			'cabinet':	{
				collidable: true,
				texture: "house.boysroom.cabinet-texture"
			},
			'bed': {
				collidable: true,
				texture: "house.boysroom.bed-texture"
			},
			'big-frame': {
				texture: "house.boysroom.big-frame-texture"
			},
			'decoration-pictures': {
				texture: "house.boysroom.decoration-pictures-texture"
			},
			'carpet':	{
				texture: "house.boysroom.carpet-texture"
			},
			'stools': {
				collidable: true,
				texture: "house.boysroom.stools-texture"
			},
			'football': {
				collidable: true,
				texture: "house.boysroom.football-texture"
			},
			'moon': {
				texture: "house.boysroom.moon-texture"
			},
			'shelf-stuff-1': {
				texture: "house.boysroom.shelf-stuff-1-texture"
			},
			'shelf-stuff-2': {
				texture: "house.boysroom.shelf-stuff-2-texture"
			},
			'shelf-stuff-3': {
				texture: "house.boysroom.shelf-stuff-3-texture"
			},
			'shelf-stuff-4': {
				texture: "house.boysroom.shelf-stuff-4-texture"
			},
			'shelf-stuff-5': {
				texture: "house.boysroom.shelf-stuff-5-texture"
			},
			'shelf-stuff-6': {
				texture: "house.boysroom.shelf-stuff-6-texture"
			},
			'toytrain': {
				texture: "house.boysroom.toytrain-texture"
			},
			'computer': {
				texture: "house.boysroom.computer-texture"
			},
			'desk': {
				collidable: true,
				texture: "house.boysroom.desk-texture"
			},
			'table': {
				collidable: true,
				texture: "house.boysroom.table-texture"
			},
			'table-stuff': {
				texture: "house.boysroom.table-stuff-texture"
			},
			'swivel-chair': {
				collidable: true,
				texture: "house.boysroom.swivel-chair-texture"
			},
			'nightstand': {
				collidable: true,
				texture: "house.boysroom.nightstand-texture"
			},
			'pencil-vase': {
				texture: "house.boysroom.pencil-vase-texture"
			},
			'boysroom-door': {
				Class: "gateway",
				viewid: "homeoffice",
				gatewayid: "homeoffice-door",
				castShadow: true,
				isEntry: true,
				origin: {
					position: new THREE.Vector3(78, 0, 33),
					rotation: new THREE.Euler(0, Math.PI/2, 0)
				}
			},
			'sketchpad': {
				texture: "house.boysroom.sketchpad-texture"
			},
			'ceiling-lamps': {
				texture: "house.boysroom.ceiling-lamps-texture"
			},
			'nightstand-lamp': {
				texture: "house.boysroom.nightstand-lamp-texture"
			},
			'yellow-reading-lamp': {
				texture: "house.boysroom.yellow-reading-lamp-texture"
			},
			'blue-reading-lamp': {
				texture: "house.boysroom.blue-reading-lamp-texture"
			},
			'bedding': {
				texture: "house.boysroom.bedding-texture"
			},
			'chalkboard': {
				texture: "house.boysroom.chalkboard-texture"
			},
			'slippers': {
				texture: "house.boysroom.slippers-texture"
			},
			'table-books': {
				texture: "house.boysroom.table-books-texture"
			},
			'shelf-left': {
				collidable: true,
				texture: "house.boysroom.shelf-left-texture"
			},
			'shelf-right': {
				collidable: true,
				texture: "house.boysroom.shelf-right-texture"
			},
			'drawer': {
				texture: "house.boysroom.drawer-texture"
			},
			'bear': {
				Class: 'tip',
				interactions: [
					"move",
					"rotate"
				],
				texture: "house.boysroom.bear-in-drawer-texture",
				tipInteraction: "drop",
				tipKey: 'house.boysroom.bear'
			},
			'handheld': {
				Class: 'tip',
				interactions: [
					"move",
					"rotate"
				],
				camera: {
					position: new THREE.Vector3(-29, 56, 16),
					rotation: new THREE.Euler(-0.70, 1.55, 0.00, 'YXZ'),
					fov: 20
				},
				texture: "house.boysroom.handheld-nightstand-texture",
				tipInteraction: "drop",
				tipKey: 'house.boysroom.handheld'
			},
			'window': {
				texture: "house.boysroom.window-texture"
			},
			'window-frame': {
				texture: "house.boysroom.window-frame-texture"
			},
			'door-frame': {
				texture: "house.boysroom.door-frame-texture"
			}
		},
		'homeoffice': {
			'floor': {
				texture: "house.homeoffice.floor-texture",
				receiveShadow: true
			},
			'ceiling': {
				texture: "house.homeoffice.ceiling-texture"
			},
			'wall':	{
				collidable: true,
				castShadow: true,
				texture: "house.homeoffice.wall-texture"
			},
			'wall-outer':	{
				castShadow: true,
				texture: "house.homeoffice.wall-outer-texture"
			},
			'homeoffice-door': {
				Class: "gateway",
				viewid: "boysroom",
				gatewayid: "boysroom-door",
				castShadow: true,
				isEntry: true,
				origin: {
					position: new THREE.Vector3(68, 0, -53),
					rotation: new THREE.Euler(0, Math.PI/2, 0)
				}
			},
			'swivel-chair': {
				Class: "movable",
				collidable: true,
				castShadow: true,
				texture: "house.homeoffice.swivel-chair-texture",
				interactions: [
					"move",
					"rotate"
				],
				destination: new THREE.Vector3(0, 0, 0),
				range: 80,
				tipInteraction: "change_object",
				tipKey: 'house.homeoffice.deskchair'
			},
			'storage': {
				collidable: true,
				texture: "house.homeoffice.storage-texture"
			},
			'setsquare': {
				Class: 'tip',
				interactions: [
					"move",
					"rotate"
				],
				texture: "house.homeoffice.setsquare-texture",
				tipInteraction: "drop",
				tipKey: 'house.homeoffice.setsquare'
			},
			'carpet': {
				texture: "house.homeoffice.carpet-texture"
			},
			'door-frame': {
				texture: "house.homeoffice.door-frame-texture"
			},
			'display-shelf-lamp': {
				texture: "house.homeoffice.display-shelf-lamp-texture"
			},
			'bookshelf-lamps': {
				texture: "house.homeoffice.bookshelf-lamps-texture"
			},
			'picture-frame-1': {
				texture: "house.homeoffice.picture-frame-1-texture"
			},
			'picture-frame-2': {
				texture: "house.homeoffice.picture-frame-2-texture"
			},
			'picture-frame-3': {
				texture: "house.homeoffice.picture-frame-3-texture"
			},
			'picture-frame-4': {
				texture: "house.homeoffice.picture-frame-4-texture"
			},
			'block-shelf-1':	{
				texture: "house.homeoffice.block-shelf-1-texture"
			},
			'block-shelf-2':	{
				texture: "house.homeoffice.block-shelf-2-texture"
			},
			'block-stuff-1':	{
				texture: "house.homeoffice.block-stuff-1-texture"
			},
			'block-stuff-2':	{
				texture: "house.homeoffice.block-stuff-2-texture"
			},
			'books-1':	{
				texture: "house.homeoffice.books-1-texture"
			},
			'books-2':	{
				texture: "house.homeoffice.books-2-texture"
			},
			'round-lamp':	{
				collidable: true,
				texture: "house.homeoffice.round-lamp-texture"
			},
			'calendar':	{
				texture: "house.homeoffice.calendar-texture"
			},
			'magazine':	{
				texture: "house.homeoffice.magazine-texture"
			},
			'window':	{
				texture: "house.homeoffice.window-texture"
			},
			'armchair':	{
				collidable: true,
				texture: "house.homeoffice.armchair-texture"
			},
			'writing-desk':	{
				collidable: true,
				texture: "house.homeoffice.writing-desk-texture"
			},
			'dracaena-fragrans': {
				collidable: true,
				texture: "house.homeoffice.dracaena-fragrans-texture"
			},
			'handbag': {
				texture: "house.homeoffice.handbag-texture"
			},
			'pen-vase': {
				texture: "house.homeoffice.pen-vase-texture"
			},
			'rubberplant': {
				texture: "house.homeoffice.rubberplant-texture"
			},
			'coffee-table':	{
				collidable: true,
				texture: "house.homeoffice.coffee-table-texture"
			},
			'coffeecup': {
				texture: "house.homeoffice.coffeecup-texture"
			},
			'floor-lamp': {
				collidable: true,
				texture: "house.homeoffice.floor-lamp-texture"
			},
			'ceiling-lamp': {
				texture: "house.homeoffice.ceiling-lamp-texture"
			},
			'cup': {
				texture: "house.homeoffice.cup-texture"
			},
			'reading-lamp-1': {
				texture: "house.homeoffice.reading-lamp-1-texture"
			},
			'reading-lamp-2': {
				texture: "house.homeoffice.reading-lamp-2-texture"
			},
			'sofa': {
				collidable: true,
				texture: "house.homeoffice.sofa-texture"
			},
			'trash': {
				texture: "house.homeoffice.trash-texture"
			},
			'display-shelf': {
				collidable: true,
				texture: "house.homeoffice.display-shelf-texture"
			},
			'computer':	{
				texture: "house.homeoffice.computer-texture"
			},
			'laptop':	{
				texture: "house.homeoffice.laptop-texture"
			},
			'curtain':	{
				texture: "house.homeoffice.curtain-texture"
			},
			'curtain-rod':	{
				texture: "house.homeoffice.curtain-rod-texture"
			},
			'telephone':	{
				texture: "house.homeoffice.telephone-texture"
			},
			'bookshelf':	{
				collidable: true,
				texture: "house.homeoffice.bookshelf-texture"
			},
			'bookshelf-stuff':	{
				texture: "house.homeoffice.bookshelf-stuff-texture"
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