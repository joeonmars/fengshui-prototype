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
				collidable: true,
				interactions: [
					"move",
					"rotate"
				]
			},
			'cabinet': {
				class: "holder",
				receiveShadow: true,
				collidable: true,
				texture: "cabinet-texture",
				interactions: [
					"move",
					"rotate"
				]
			},
			'bed': {
				collidable: true,
				texture: "bed-texture",
				interactions: [
					"move",
					"rotate"
				]
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
				collidable: true,
				texture: "pc-texture",
				interactions: [
					"move",
					"rotate"
				]
			},
			'screen': {
				texture: {
					texture: "screensaver-texture",
					htiles: 45,
					vtiles: 1,
					ntiles: 45,
					duration: 100
				}
			},
			'cactus': {
				texture: "cactus-texture"
			}
		},
		'bathroom': {
			'wall': {
				texture: "wall-texture",
				receiveShadow: true
			},
			'door': {
				class: "gateway",
				collidable: true,
				viewid: "interior2",
				gatewayid: "door"
			},
			'bathtub': {
				texture: "bathtub-texture"
			},
			'closet-door-mirror': {
				mirror: true
			},
			'closet-door': {
				texture: "closet-door-texture"
			},
			'closet': {
				texture: "closet-texture"
			},
			'lamp': {
				texture: "lamp-texture"
			},
			'shelf': {
				texture: "shelf-texture"
			},
			'toilet': {
				texture: "toilet-texture"
			},
			'towel': {
				texture: "towel-texture"
			},
			'washer': {
				texture: "washer-texture"
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