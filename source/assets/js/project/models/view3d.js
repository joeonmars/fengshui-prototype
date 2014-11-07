goog.provide('feng.models.View3D');


feng.models.View3D.Data = {

	'studio': {
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
				texture: "studio.interior2.pc-texture"
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
			'glamour-photo': {
				Class: 'pictures',
				captionClass: 'changepicture',
				tipKey: 'studio.livingroom.glamourphoto',
				texture: 'studio.livingroom.glamour-photo-texture',
				camera: {
					position: new THREE.Vector3(59, 80, 62),
					rotation: new THREE.Euler(0.13, -3.10, 0.00, 'YXZ'),
					fov: 40
				},
				pictures: {
					'1':{
						description: 'This is a dummy picture. Its name is 1.'
					},
					'2':{
						description: 'This is a dummy picture. Its name is 2.'
					},
					'3':{
						description: 'This is a dummy picture. Its name is 3.'
					},
					'4':{
						description: 'This is a dummy picture. Its name is 4.'
					}
				}
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
				origin: {
					position: new THREE.Vector3(-240, 0, 34),
					rotation: new THREE.Euler(0, -Math.PI/2, 0)
				}
			},
			'wall':	{
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
				colors: [
					"pink",
					"yellow",
					"orange"
				],
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
				position: new THREE.Vector3(-47.69, 0, -54.87),
				rotation: new THREE.Euler(0, 0, 0),
				range: 50,
				tipKey: 'studio.livingroom.diningchair'
			},
			'window-books':	{
				texture: "studio.livingroom.window-books-texture"
			},
			'clock':	{
				Class: "tip",
				texture: "studio.livingroom.clock-texture",
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
				camera: {
					position: new THREE.Vector3(-110, 80, -120),
					rotation: new THREE.Euler(-0.64, -1.57, 0.00, 'YXZ'),
					fov: 40
				},
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
				texture: "studio.bathroom.lotus-texture",
				tipKey: 'studio.bathroom.lotus'
			},
			'towel': {
				texture: "studio.bathroom.towel-texture"
			},
			'showerhead': {
				Class: 'tip',
				texture: "studio.bathroom.showerhead-texture",
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
				camera: {
					position: new THREE.Vector3(35, 81, -47),
					rotation: new THREE.Euler(-0.07, 1.70, 0.00, 'YXZ'),
					fov: 40
				},
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
			'livingroom-door': {
				Class: "gateway",
				viewid: "livingroom",
				gatewayid: "livingroom-door",
				castShadow: true,
				isEntry: true,
				origin: {
					position: new THREE.Vector3(110, 0, 0),
					rotation: new THREE.Euler(0, Math.PI/2, 0)
				},
				texture: "house.livingroom.livingroom-door-texture"
			},
			'stairways-door': {
				Class: "gateway",
				viewid: "corridor",
				gatewayid: "stairways-door",
				origin: {
					position: new THREE.Vector3(-125, 0, 50),
					rotation: new THREE.Euler(0, -Math.PI/2, 0)
				}
			},
			'floor': {
				receiveShadow: true
			},
			'wall':	{
				castShadow: true
			},
			'wall-outer':	{
				castShadow: true
			},
			'ceiling':	{
				castShadow: true
			},
			'mirror':	{
				Class: "mirror"
			},
			'knife': {
				texture: "house.livingroom.knife-texture"
			},
			'kitchen-top': {
				texture: "house.livingroom.kitchen-top-texture"
			},
			'kitchen-bottom': {
				collidable: true
			},
			'kitchen-stuff': {
				texture: "house.livingroom.kitchen-stuff-texture"
			},
			'windowsill-stuff': {
				texture: "house.livingroom.windowsill-stuff-texture"
			},
			'basin': {
				texture: "house.livingroom.basin-texture"
			},
			'cooktop': {
				texture: "house.livingroom.cooktop-texture"
			},
			'long-table': {
				collidable: true,
				texture: "house.livingroom.long-table-texture"
			},
			'clock': {
				texture: "house.livingroom.clock-texture"
			},
			'bookshelf': {
				collidable: true,
				texture: "house.livingroom.bookshelf-texture"
			},
			'round-table': {
				collidable: true,
				texture: "house.livingroom.round-table-texture"
			},
			'window-stand': {
				collidable: true,
				texture: "house.livingroom.window-stand-texture"
			},
			'entrance-stuff': {
				texture: "house.livingroom.entrance-stuff-texture"
			},
			'blue-sofa': {
				collidable: true,
				texture: "house.livingroom.blue-sofa-texture"
			},
			'pads': {
				texture: "house.livingroom.pads-texture"
			},
			'dining-table': {
				collidable: true,
				texture: "house.livingroom.dining-table-texture"
			},
			'dining-chairs': {
				collidable: true,
				texture: "house.livingroom.dining-chairs-texture"
			},
			'divider': {
				collidable: true,
				texture: "house.livingroom.divider-texture"
			},
			'fruitplate': {
				texture: "house.livingroom.fruitplate-texture"
			},
			'tv-stand': {
				collidable: true,
				texture: "house.livingroom.tv-stand-texture"
			}
		},
		'corridor': {
			'stairways-door': {
				Class: "gateway",
				viewid: "livingroom",
				gatewayid: "stairways-door",
				isEntry: true,
				origin: {
					position: new THREE.Vector3(50, 0, 225),
					rotation: new THREE.Euler(0, 0, 0)
				}
			},
			'boysroom-door': {
				Class: "gateway",
				viewid: "boysroom",
				gatewayid: "boysroom-door",
				castShadow: true,
				origin: {
					position: new THREE.Vector3(60, 0, -170),
					rotation: new THREE.Euler(0, 0, 0)
				}
			},
			'homeoffice-door': {
				Class: "gateway",
				viewid: "homeoffice",
				gatewayid: "homeoffice-door",
				castShadow: true,
				origin: {
					position: new THREE.Vector3(20, 0, -50),
					rotation: new THREE.Euler(0, 0, 0)
				}
			},
			'floor': {
				receiveShadow: true
			},
			'wall':	{
				castShadow: true
			},
			'wall-outer':	{
				castShadow: true
			},
			'ceiling':	{
				castShadow: true
			}
		},
		'boysroom': {
			'floor': {
				texture: "house.boysroom.floor-texture",
				receiveShadow: true
			},
			'wall':	{
				castShadow: true,
				texture: "house.boysroom.wall-texture"
			},
			'wall-outer':	{
				castShadow: true,
				texture: "house.boysroom.wall-outer-texture"
			},
			'ceiling':	{
				castShadow: true,
				texture: "house.boysroom.ceiling-texture"
			},
			'cabinet':	{
				collidable: true,
				texture: "house.boysroom.cabinet-texture"
			},
			'bed': {
				collidable: true,
				receiveShadow: true,
				texture: "house.boysroom.bed-texture"
			},
			'big-frame': {
				texture: "house.boysroom.big-frame-texture"
			},
			'big-frame-picture': {
				Class: 'pictures',
				captionClass: 'changepicture',
				tipKey: 'house.boysroom.poster',
				texture: "house.boysroom.handheld-nightstand-texture",
				camera: {
					position: new THREE.Vector3(21.1, 80, -26.46),
					rotation: new THREE.Euler(-0.03, 1.55, 0.00, 'YXZ'),
					fov: 40
				},
				pictures: {
					'1':{
						description: 'This is a dummy picture. Its name is 1.'
					},
					'2':{
						description: 'This is a dummy picture. Its name is 2.'
					},
					'3':{
						description: 'This is a dummy picture. Its name is 3.'
					}
				}
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
				Class: "computer",
				collidable: true,
				castShadow: true,
				texture: "house.boysroom.computer-on-table-texture",
				position: new THREE.Vector3(63.04, 37.75, -97.24),
				rotation: new THREE.Euler(0, 3.14, 0),
				range: 50,
				tipKey: 'house.boysroom.computer'
			},
			'desk': {
				collidable: true,
				receiveShadow: true,
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
				viewid: "corridor",
				gatewayid: "boysroom-door",
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
				receiveShadow: true,
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
				Class: "bear",
				castShadow: true,
				texture: "house.boysroom.bear-in-drawer-texture",
				position: new THREE.Vector3(-50.04, 33.70, -27.77),
				rotation: new THREE.Euler(0, -1.57, 0),
				range: 50,
				parent: 'bed',
				tipKey: 'house.boysroom.bear'
			},
			'handheld': {
				Class: 'tip',
				camera: {
					position: new THREE.Vector3(-29, 56, 16),
					rotation: new THREE.Euler(-0.70, 1.55, 0.00, 'YXZ'),
					fov: 20
				},
				texture: "house.boysroom.handheld-nightstand-texture",
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
				castShadow: true,
				texture: "house.homeoffice.wall-texture"
			},
			'wall-outer':	{
				castShadow: true,
				texture: "house.homeoffice.wall-outer-texture"
			},
			'homeoffice-door': {
				Class: "gateway",
				viewid: "corridor",
				gatewayid: "homeoffice-door",
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
				position: new THREE.Vector3(-40, 0, 9),
				rotation: new THREE.Euler(0, 0, 0),
				range: 50,
				tipKey: 'house.homeoffice.deskchair'
			},
			'storage': {
				collidable: true,
				texture: "house.homeoffice.storage-texture"
			},
			'setsquare': {
				Class: "movable",
				collidable: true,
				castShadow: true,
				texture: "house.homeoffice.setsquare-texture",
				tipKey: 'house.homeoffice.setsquare',
				position: new THREE.Vector3(-36.95, 107.05, 137.10),
				rotation: new THREE.Euler(0, 1.57, 0.18),
				range: 50,
				parent: 'block-shelf-1'
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
			'picture-1': {
				texture: "house.homeoffice.calendar-texture"
			},
			'picture-2': {
				texture: "house.homeoffice.calendar-texture"
			},
			'picture-3': {
				texture: "house.homeoffice.calendar-texture"
			},
			'picture-4': {
				texture: "house.homeoffice.calendar-texture"
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
				Class: "tip",
				texture: "house.homeoffice.rubberplant-texture",
				tipKey: 'house.homeoffice.officeplant'
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
				Class: 'pictures',
				collidable: true,
				captionClass: 'changepicture',
				tipKey: 'house.homeoffice.photodisplay',
				texture: "house.homeoffice.display-shelf-texture",
				camera: {
					position: new THREE.Vector3(23, 80, -60),
					rotation: new THREE.Euler(0.01, 0.07, 0.00, 'YXZ'),
					fov: 40
				},
				pictures: {
					'1':{
						description: 'This is a dummy picture. Its name is 1.'
					},
					'2':{
						description: 'This is a dummy picture. Its name is 2.'
					},
					'3':{
						description: 'This is a dummy picture. Its name is 3.'
					},
					'4':{
						description: 'This is a dummy picture. Its name is 4.'
					}
				}
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