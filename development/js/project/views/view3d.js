goog.provide('fengshui.views.View3D');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('fengshui.controllers.CameraController');
goog.require('fengshui.controllers.View3DController');


/**
 * @constructor
 */
fengshui.views.View3D = function(domElement){
  goog.base(this);

  this.setParentEventTarget( fengshui.controllers.View3DController.getInstance() );

  this.domElement = domElement;
	
	this.cameraController = new fengshui.controllers.CameraController();

	this._viewSize = goog.style.getSize(this.domElement);

  this._eventHandler = new goog.events.EventHandler(this);

	this._scene = null;
	this._renderer = null;
	this._axisHelper = null;

	this._splineGroupObject = null;

	this._controls = null;

	this._collidables = [];
};
goog.inherits(fengshui.views.View3D, goog.events.EventTarget);


fengshui.views.View3D.prototype.init = function(){

	this._renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	this._renderer.setClearColor(0xffffff, 1);
	this._renderer.setSize( this._viewSize.width, this._viewSize.height );

	goog.dom.appendChild( this.domElement, this._renderer.domElement );
	goog.dom.appendChild( this.domElement, fengshui.views.View3D.STATS.domElement );

	// loader
	var loader = new THREE.ObjectLoader();
	loader.load( fengshui.Config['basePath'] + "json/scene-bed-bake.json", goog.bind(this.onLoad, this) );
};


fengshui.views.View3D.prototype.show = function(){

	this.dispatchEvent({
    type: fengshui.events.EventType.SHOW
  });
};


fengshui.views.View3D.prototype.hide = function(){


	this.dispatchEvent({
    type: fengshui.events.EventType.HIDE
  });
};


fengshui.views.View3D.prototype.render = function() {
	var camera = this._controls.object;//this.cameraController.getCamera('shadow');
	this._renderer.render(this._scene, camera);
};


fengshui.views.View3D.prototype.createSpline = function(coordinates, color) {
	var numPoints = 50;

  var spline = new THREE.SplineCurve3(coordinates);

  var material = new THREE.LineBasicMaterial({
      color: color || '#000000'
  });

  var geometry = new THREE.Geometry();
  var splinePoints = spline.getPoints(numPoints);

  goog.array.forEach(splinePoints, function(splinePoint) {
  	geometry.vertices.push(splinePoint);
  });

  var line = new THREE.Line(geometry, material);
  this._splineGroupObject.add(line);

  return spline;
};


fengshui.views.View3D.prototype.getCameraZOfObjectExactPixelDimension = function(camera, object) {
	var vFOV = camera.fov * (Math.PI / 180);
	var cameraZ = this._viewSize.height / (2 * Math.tan(vFOV / 2) );

	return cameraZ;
};


fengshui.views.View3D.prototype.onLoad = function(result) {
	
	this._scene = result;
	console.log(result);

	// add spline group object
	this._splineGroupObject = new THREE.Object3D();
	this._splineGroupObject.name = 'spline-group';
	this._scene.add( this._splineGroupObject );

	// create axis helper
	this._axisHelper = new THREE.AxisHelper( 1000 );
	this._scene.add( this._axisHelper );

	// create default camera
	var camera = new THREE.PerspectiveCamera( 45, this._viewSize.aspectRatio(), 10, 10000 );
	camera.position.x = 0;
	camera.position.y = 100;
	camera.position.z = 350;

	// controls
	this._controls = new THREE.TrackballControls( camera, this._renderer.domElement );
	this._controls.rotateSpeed = 1.0;
	this._controls.zoomSpeed = 1.2;
	this._controls.panSpeed = 0.8;

	this._controls.noZoom = false;
	this._controls.noPan = false;
	this._controls.noRotate = false;
	this._controls.minDistance = 100;
	this._controls.maxDistance = 900;

	this._controls.staticMoving = true;
	this._controls.dynamicDampingFactor = 0.3;

	this._eventHandler.listen(this._controls, 'change', this.render, false, this);
	this._eventHandler.listen(window, 'resize', this.onResize, false, this);

	// create camera controller
	var shadowCamera = camera.clone();
	shadowCamera.fov = 10;
	shadowCamera.updateProjectionMatrix();

	var cameras = {
		'default': camera,
		'shadow': shadowCamera
	};

	this.cameraController.init( cameras, this._scene, this._controls );

	// add collidables
	this._scene.traverse(goog.bind(function(child) {
		if(child.userData['collidable'] === true) {
			this._collidables.push(child);
		}
	}, this));

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

	// test path finding
	var pathfinder = fengshui.controllers.PathfindingController.getInstance();

	var start = new THREE.Vector3(150, 0, 150);
	var end = new THREE.Vector3(-100, 0, -50);
	var coordinates = pathfinder.findPath( start, end, this._collidables, this._scene );

	var spline = this.createSpline(coordinates, 0xff00f0);

	// tween the camera
	//this.cameraController.followSpline(spline);
	//this.cameraController.animatePositionTo(new THREE.Vector3(0, 100, 600), 4);
	//this.cameraController.animateFocusTo(new THREE.Vector3(0, 40, 0), 4);
	//this.cameraController.animateFovTo(10, 4);
	//this.cameraController.animateFocusTo(end, 1, Linear.easeNone);
	//this.cameraController.animateTo( shadowCamera.position.clone(), bed.position.clone(), 30 );
};


fengshui.views.View3D.prototype.onAnimationFrame = function(now){

  var time = now * 0.0004;

  var bed = this._scene.getObjectByName('bed');
  bed.rotation.y = time * 0.7;

  this._controls.update();

  fengshui.views.View3D.STATS.update();

  this.render();
};


fengshui.views.View3D.prototype.onResize = function(e){

	this._viewSize = goog.style.getSize(this.domElement);

	this.cameraController.onResize( this._viewSize.aspectRatio() );

	this._renderer.setSize( this._viewSize.width, this._viewSize.height );

	this._controls.handleResize();

	this.render();
};


fengshui.views.View3D.STATS = new Stats();