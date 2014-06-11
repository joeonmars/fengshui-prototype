goog.provide('feng.models.View3D');


feng.models.View3D.Data = {

	'studio': {
		'interior1': {
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
				tipKey: 'studio.interior1.sofa',
				camera: {
					position: new THREE.Vector3(80, 90, 17),
					rotation: new THREE.Euler(-0.53, -0.40, 0.00, 'YXZ'),
					fov: 40
				}
			},
			'cabinet': {
				class: "holder",
				collidable: true,
				texture: "studio.interior1.cabinet-texture",
				interactions: [
					"move",
					"rotate"
				]
			},
			'bed': {
				class: "holder",
				collidable: true,
				texture: "studio.interior1.bed-texture",
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
			'picture': {
				class: 'picturedisplay',
				interactions: [
					'change_picture'
				],
				tipInteraction: 'change_picture',
				tipKey: 'studio.interior1.picture',
				camera: {
					position: new THREE.Vector3(57.56, 90.49, -16.61),
					rotation: new THREE.Euler(-0.24, -1.68, 0.00, 'YXZ'),
					fov: 40
				},
				pictures: [
					{
						id: 'studio.interior1.pictures.1',
						description: 'This is a dummy picture. Its name is picture 1.'
					},
					{
						id: 'studio.interior1.pictures.2',
						description: 'This is a dummy picture. Its name is picture 2.'
					},
					{
						id: 'studio.interior1.pictures.3',
						description: 'This is a dummy picture. Its name is picture 3.'
					},
					{
						id: 'studio.interior1.pictures.4',
						description: 'This is a dummy picture. Its name is picture 4.'
					},
					{
						id: 'studio.interior1.pictures.5',
						description: 'This is a dummy picture. Its name is picture 5.'
					},
					{
						id: 'studio.interior1.pictures.6',
						description: 'This is a dummy picture. Its name is picture 6.'
					},
					{
						id: 'studio.interior1.pictures.7',
						description: 'This is a dummy picture. Its name is picture 7.'
					},
					{
						id: 'studio.interior1.pictures.8',
						description: 'This is a dummy picture. Its name is picture 8.'
					},
					{
						id: 'studio.interior1.pictures.9',
						description: 'This is a dummy picture. Its name is picture 9.'
					},
					{
						id: 'studio.interior1.pictures.10',
						description: 'This is a dummy picture. Its name is picture 10.'
					}
				]
			},
			'frame': {
				class: 'pictureframe'
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
				class: "computer",
				collidable: true,
				texture: "studio.interior2.pc-texture",
				interactions: [
					"move",
					"rotate"
				],
				tipKey: 'studio.interior2.computer'
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
		'bathroom': {
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