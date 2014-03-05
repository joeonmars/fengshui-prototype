goog.provide('feng.apps.Spline');

goog.require('goog.dom');
goog.require('goog.fx.anim');
goog.require('feng.templates.main');
goog.require('feng.fx.PathTrack');


feng.apps.Spline = function() {

	goog.fx.anim.setAnimationWindow(window);

	this._scene = null;
	this._camera = null;
	this._renderer = null;
	this._controls = null;
	this._pathTrack = null;

	this.init();
};
goog.addSingletonGetter(feng.apps.Spline);


feng.apps.Spline.prototype.init = function() {

	var mainFrag = soy.renderAsFragment(feng.templates.main.Spline);
	goog.dom.appendChild(document.body, mainFrag);

	var canvas = goog.dom.query('#spline > canvas')[0];

	this._renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		antialias: true
	});
	this._renderer.setClearColor(0xffffff, 1);
	this._renderer.setSize( window.innerWidth, window.innerHeight );

	this._camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
	this._camera.position.x = 500;
	this._camera.position.y = 500;
	this._camera.position.z = 500;

	this._scene = new THREE.Scene();

	var geometry = new THREE.PlaneGeometry( 400, 400 );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationFromEuler( new THREE.Euler( Math.PI / 2, Math.PI, 0 ) ) );

	var material = new THREE.MeshBasicMaterial({
		color: 0xC0C0C0,
		transparent: true,
		opacity: 0.8,
		side: THREE.DoubleSide
	});

	var plane = new THREE.Mesh( geometry, material );
	this._scene.add( plane );

	var coordinates = [
		new THREE.Vector3(100, 200, 0),
		new THREE.Vector3(150, 250, 10),
		new THREE.Vector3(50, -100, 100),
		new THREE.Vector3(-100, 0, -200)
	];
	this._pathTrack = new feng.fx.PathTrack(coordinates);
	this._scene.add( this._pathTrack );

	this._controls = new THREE.OrbitControls(this._camera, this._renderer.domElement);

	goog.fx.anim.registerAnimation(this);

	goog.events.listen(window, 'resize', this.onResize, false, this);
};


feng.apps.Spline.prototype.render = function() {

	this._renderer.render(this._scene, this._camera);
};


feng.apps.Spline.prototype.onAnimationFrame = function(now) {

	//this._pathTrack.controlPoints[0].x ++;
	//this._pathTrack.updateTrack();

	this._controls.update();
	this.render();
};


feng.apps.Spline.prototype.onResize = function(e) {

	this._renderer.setSize( window.innerWidth, window.innerHeight );

	this.render();
};