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
				mirror: true
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