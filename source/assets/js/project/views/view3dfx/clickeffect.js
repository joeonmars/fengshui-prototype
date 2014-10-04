goog.provide('feng.views.view3dfx.ClickEffect');


/**
 * @constructor
 */
feng.views.view3dfx.ClickEffect = function(){

	var geometry = new THREE.PlaneGeometry( 10, 10 );

	var canvas = goog.dom.createDom('canvas');
	canvas.width = canvas.height = 128;

	var context = canvas.getContext('2d');
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;

	context.beginPath();
	context.arc(centerX, centerY, 40, 0, 2 * Math.PI, false);
	context.lineWidth = 30;
	context.strokeStyle = 'rgba(255, 255, 255, .1)';
	context.stroke();
	context.closePath();

	context.beginPath();
	context.arc(centerX, centerY, 30, 0, 2 * Math.PI, false);
	context.lineWidth = 6;
	context.strokeStyle = 'rgba(255, 255, 255, .2)';
	context.stroke();
	context.closePath();

	var texture = new THREE.Texture( canvas );
	texture.needsUpdate = true;

	var material = new THREE.MeshBasicMaterial({
		//color: 0xff0000,
		map: texture,
		side: THREE.DoubleSide,
		fog: false,
		transparent: true,
		blending: THREE.AdditiveBlending,
		depthTest: false
	});

  THREE.Mesh.call( this, geometry, material );

  this._lookAtPosition = new THREE.Vector3();
};
goog.inherits(feng.views.view3dfx.ClickEffect, THREE.Mesh);


feng.views.view3dfx.ClickEffect.prototype.play = function( position, normal ) {

	this.position.copy( position );

	this._lookAtPosition.addVectors( normal, position );
	this.lookAt( this._lookAtPosition );

	TweenMax.fromTo(this.scale, .8, {
		'x': .5,
		'y': .5,
	}, {
		'x': 1.5,
		'y': 1.5,
		'ease': Expo.easeOut
	});

	TweenMax.fromTo(this.material, .8, {
		'opacity': 1,
	}, {
		'opacity': 0,
		'ease': Expo.easeOut
	});
};