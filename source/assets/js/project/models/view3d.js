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
				collidable: true,
				texture: "texture-cabinet",
				interactions: [
					"move",
					"rotate"
				]
			},
			'bed': {
				collidable: true,
				texture: "texture-bed",
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
				viewid: "interior1",
				gatewayid: "door"
			},
			'pc': {
				collidable: true,
				texture: "texture-pc",
				interactions: [
					"move",
					"rotate"
				]
			},
			'screen': {
				texture: {
					texture: "texture-screensaver",
					htiles: 45,
					vtiles: 1,
					ntiles: 45,
					duration: 100
				}
			},
			'cactus': {
				texture: "texture-cactus"
			}
		},
		'interior3': {
			'ground': {
				receiveShadow: true
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