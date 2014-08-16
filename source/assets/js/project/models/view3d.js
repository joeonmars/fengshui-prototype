goog.provide('feng.models.View3D');


feng.models.View3D.Data = {

	'studio': {
		'livingroom': {
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
				collidable: true,
				texture: "studio.livingroom.cabinet-texture",
				interactions: [
					"move",
					"rotate"
				]
			},
			'bed': {
				class: "holder",
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
				}
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
		'interior3': {
			'studio-door': {
				class: "gateway",
				viewid: "interior2",
				gatewayid: "door"
			},
			'bathroom-door': {
				class: "gateway",
				viewid: "interior2",
				gatewayid: "door"
			},
			'wall':	{
				texture: "studio.interior3.wall-texture"
			},
			'ceiling':	{
				texture: "studio.interior3.ceiling-texture"
			},
			'floor': {
				receiveShadow: true,
				texture: "studio.interior3.floor-texture"
			},
			'kitchen-cabinets':	{
				collidable: true,
				texture: "studio.interior3.kitchen-cabinets-texture"
			},
			'sofabed':	{
				collidable: true,
				texture: "studio.interior3.sofabed-texture"
			},
			'sofabed-cabinet':	{
				collidable: true,
				texture: "studio.interior3.sofabed-cabinet-texture"
			},
			'kitchen-storage':	{
				collidable: true,
				texture: "studio.interior3.kitchen-storage-texture"
			},
			'coffee-pot':	{
				texture: "studio.interior3.coffee-pot-texture"
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
				texture: "studio.interior3.round-lamp-texture"
			},
			'reading-lamp':	{
				texture: "studio.interior3.reading-lamp-texture"
			},
			'ventilator':	{
				texture: "studio.interior3.ventilator-texture"
			},
			'microwave':	{
				texture: "studio.interior3.microwave-texture"
			},
			'fruitplate':	{
				texture: "studio.interior3.fruitplate-texture"
			},
			'dining-table':	{
				collidable: true,
				texture: "studio.interior3.dining-table-texture"
			},
			'dining-chair':	{
				collidable: true,
				castShadow: true,
				texture: "studio.interior3.dining-chair-texture",
				class: "tip",
				interactions: [
					"move",
					"rotate"
				],
				tipInteraction: "change_color",
				tipKey: 'studio.livingroom.chair'
			},
			'window-books':	{
				texture: "studio.interior3.window-books-texture"
			},
			'clockset':	{
				texture: "studio.interior3.clockset-texture"
			},
			'bed-shelf':	{
				texture: "studio.interior3.bed-shelf-texture"
			},
			'tv-table':	{
				collidable: true,
				texture: "studio.interior3.tv-table-texture"
			},
			'tv':	{
				texture: "studio.interior3.tv-texture"
			},
			'sofa':	{
				collidable: true,
				texture: "studio.interior3.sofa-texture"
			},
			'book-shelf':	{
				collidable: true,
				texture: "studio.interior3.book-shelf-texture"
			},
			'kitchen-shelf':	{
				texture: "studio.interior3.kitchen-shelf-texture"
			},
			'nightstand':	{
				collidable: true,
				texture: "studio.interior3.nightstand-texture"
			},
			'sewingmachine':	{
				texture: "studio.interior3.sewingmachine-texture"
			},
			'sewingmachine-cover':	{
				texture: "studio.interior3.sewingmachine-cover-texture"
			},
			'boxes':	{
				texture: "studio.interior3.boxes-texture"
			},
			'shoestorage':	{
				collidable: true,
				texture: "studio.interior3.shoestorage-texture"
			}
		},
		'bathroom': {/*
			'wall': {
				texture: "studio.bathroom.wall-texture"
			},
			'door': {
				class: "gateway",
				collidable: true,
				viewid: "interior2",
				gatewayid: "door"
			},
			'bathtub': {
				texture: "studio.bathroom.bathtub-texture"
			},
			'closet-door-mirror': {

			},
			'closet-door': {
				texture: "studio.bathroom.closet-door-texture"
			},
			'closet': {
				texture: "studio.bathroom.closet-texture"
			},
			'lamp': {
				texture: "studio.bathroom.lamp-texture"
			},
			'shelf': {
				texture: "studio.bathroom.shelf-texture"
			},
			'toilet': {
				texture: "studio.bathroom.toilet-texture"
			},
			'towel': {
				texture: "studio.bathroom.towel-texture"
			},
			'washer': {
				texture: "studio.bathroom.washer-texture"
			}*/
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
		'interior2': {
			'ground': {
				receiveShadow: true
			},
			'door': {
				class: "gateway",
				collidable: true,
				viewid: "bathroom",
				gatewayid: "door"
			}
		},
		'bathroom': {
			'wall': {
				texture: "townhouse.bathroom.wall-texture"
			},
			'door': {
				class: "gateway",
				collidable: true,
				viewid: "interior2",
				gatewayid: "door"
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