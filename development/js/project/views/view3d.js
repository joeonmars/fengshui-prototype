goog.provide('fengshui.views.View3D');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');


/**
 * @constructor
 */
fengshui.views.View3D = function(domElement){
  goog.base(this);

  this.domElement = domElement;
	
	this._viewSize = goog.style.getSize(this.domElement);

  this._eventHandler = new goog.events.EventHandler(this);

	this._camera = null;
	this._scene = null;
	this._renderer = null;

	this._axisHelper = null;
	this._cameraHelper = null;

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

	this._camera = new THREE.PerspectiveCamera( 45, this._viewSize.aspectRatio(), 10, 1000 );
	this._camera.position.x = 0;
	this._camera.position.y = 100;
	this._camera.position.z = 350;

	// loader
	var loader = new THREE.ObjectLoader();
	loader.load( fengshui.Config['basePath'] + "json/scene-bed-bake.json", goog.bind(this.onLoad, this) );
	//loader.load( fengshui.Config['basePath'] + "json/scene-with-benzai.json", goog.bind(this.onLoad, this) );

	// controls
	this._controls = new THREE.TrackballControls( this._camera );
	this._controls.rotateSpeed = 1.0;
	this._controls.zoomSpeed = 1.2;
	this._controls.panSpeed = 0.8;

	this._controls.noZoom = false;
	this._controls.noPan = false;
	this._controls.minDistance = 100;
	this._controls.maxDistance = 900;

	this._controls.staticMoving = true;
	this._controls.dynamicDampingFactor = 0.3;

	this._controls.keys = [ 65, 83, 68 ];

	this._eventHandler.listen(this._controls, 'change', this.render, false, this);
	this._eventHandler.listen(window, 'resize', this.onResize, false, this);

	// helpers
	this._helperCamera = this._camera.clone();
	this._helperCamera.target = this._controls.target.clone();
	this._cameraHelper = new THREE.CameraHelper( this._helperCamera );

	this._axisHelper = new THREE.AxisHelper( 1000 );
};


fengshui.views.View3D.prototype.render = function() {
	this._renderer.render(this._scene, this._camera);
};


fengshui.views.View3D.prototype.getCameraZOfObjectExactPixelDimension = function(camera, object) {
	var vFOV = camera.fov * (Math.PI / 180);
	var cameraZ = this._viewSize.height / (2 * Math.tan(vFOV / 2) );

	return cameraZ;
};


fengshui.views.View3D.prototype.onLoad = function(result) {
	
	this._scene = result;
	console.log(result);

	//this._helperCamera.fov = 10;
	//this._helperCamera.updateProjectionMatrix();
	this._scene.add( this._helperCamera );

	this._scene.add( this._axisHelper );
	this._scene.add( this._cameraHelper );

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
	/*
	var target = this._controls.target;
	var position = this._controls.object.position;
	var dest = new THREE.Vector3(100, 0, 0);
	TweenMax.to(target, 1, {
		x: dest.x,
		y: dest.y,
		z: dest.z,
		onUpdate: function() {
			this._helperCamera.lookAt(target);
		},
		onUpdateScope: this
	});

	TweenMax.to(position, 1, {
		x: 0,
		y: 100,
		z: 400
	});
	*/
};


fengshui.views.View3D.prototype.onAnimationFrame = function(now){

  var time = now * 0.0004;

  var bed = this._scene.getObjectByName('bed');
  bed.rotation.y = time * 0.7;

  this._cameraHelper.update();

  this._controls.update();
  //console.log(this._controls.target)
  fengshui.stats.update();

  this.render();
};


fengshui.views.View3D.prototype.onResize = function(e){

	this._viewSize = goog.style.getSize(this.domElement);

	this._camera.aspect = this._viewSize.aspectRatio();
	this._camera.updateProjectionMatrix();

	this._renderer.setSize( this._viewSize.width, this._viewSize.height );

	this._controls.handleResize();

	this.render();
};