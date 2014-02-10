goog.provide('fengshui.views.View3D');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('fengshui.controllers.CameraController');


/**
 * @constructor
 */
fengshui.views.View3D = function(domElement){
  goog.base(this);

  this.domElement = domElement;
	
	this._viewSize = goog.style.getSize(this.domElement);

  this._eventHandler = new goog.events.EventHandler(this);

	this._scene = null;
	this._renderer = null;

	this._axisHelper = null;

	this._cameraController = null;

	this._controls = null;
};
goog.inherits(fengshui.views.View3D, goog.events.EventTarget);


fengshui.views.View3D.prototype.init = function(){

	this._renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	this._renderer.setClearColor(0xffffff, 1);
	this._renderer.setSize( this._viewSize.width, this._viewSize.height );

	goog.dom.appendChild( this.domElement, this._renderer.domElement );

	// loader
	var loader = new THREE.ObjectLoader();
	loader.load( fengshui.Config['basePath'] + "json/scene-bed-bake.json", goog.bind(this.onLoad, this) );
	//loader.load( fengshui.Config['basePath'] + "json/scene-with-benzai.json", goog.bind(this.onLoad, this) );
};


fengshui.views.View3D.prototype.render = function() {
	var camera = this._controls.object;//this._cameraController.getCamera('shadow');
	this._renderer.render(this._scene, camera);
};


fengshui.views.View3D.prototype.getCameraZOfObjectExactPixelDimension = function(camera, object) {
	var vFOV = camera.fov * (Math.PI / 180);
	var cameraZ = this._viewSize.height / (2 * Math.tan(vFOV / 2) );

	return cameraZ;
};


fengshui.views.View3D.prototype.onLoad = function(result) {
	
	this._scene = result;
	console.log(result);

	// create axis helper
	this._axisHelper = new THREE.AxisHelper( 1000 );
	this._scene.add( this._axisHelper );

	// create default camera
	var camera = new THREE.PerspectiveCamera( 45, this._viewSize.aspectRatio(), 10, 1000 );
	camera.position.x = 0;
	camera.position.y = 100;
	camera.position.z = 350;

	// controls
	this._controls = new THREE.TrackballControls( camera );
	this._controls.rotateSpeed = 1.0;
	this._controls.zoomSpeed = 1.2;
	this._controls.panSpeed = 0.8;

	this._controls.noZoom = false;
	this._controls.noPan = false;
	this._controls.minDistance = 100;
	this._controls.maxDistance = 900;

	this._controls.staticMoving = true;
	this._controls.dynamicDampingFactor = 0.3;

	this._eventHandler.listen(this._controls, 'change', this.render, false, this);
	this._eventHandler.listen(window, 'resize', this.onResize, false, this);

	// create camera controller
	var shadowCamera = camera.clone();
	shadowCamera.target = this._controls.target.clone();
	shadowCamera.fov = 10;
	shadowCamera.updateProjectionMatrix();

	var cameras = {
		'default': camera,
		'shadow': shadowCamera
	};

	this._cameraController = new fengshui.controllers.CameraController( cameras, this._scene, this._controls );

	//
	var bed = this._scene.getObjectByName('bed');
	var material = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('model/bed_bake.png'),
    transparent: true,
    side: THREE.DoubleSide
    //depthWrite: false
  });
  material.alphaTest = 0.5;
  bed.material = material;

	this.render();

	//
	goog.fx.anim.registerAnimation(this);

	// tween the camera
	//this._cameraController.animateTo( shadowCamera.position.clone(), bed.position.clone() );
};


fengshui.views.View3D.prototype.onAnimationFrame = function(now){

  var time = now * 0.0004;

  var bed = this._scene.getObjectByName('bed');
  bed.rotation.y = time * 0.7;

  this._controls.update();

  fengshui.stats.update();

  this.render();
};


fengshui.views.View3D.prototype.onResize = function(e){

	this._viewSize = goog.style.getSize(this.domElement);

	this._cameraController.onResize( this._viewSize.aspectRatio() );

	this._renderer.setSize( this._viewSize.width, this._viewSize.height );

	this._controls.handleResize();

	this.render();
};