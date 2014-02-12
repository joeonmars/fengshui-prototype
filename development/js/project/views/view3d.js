goog.provide('fengshui.views.View3D');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('fengshui.controllers.view3d.CameraController');
goog.require('fengshui.controllers.view3d.View3DController');


/**
 * @constructor
 */
fengshui.views.View3D = function(domElement){
  goog.base(this);

  this.setParentEventTarget( fengshui.controllers.view3d.View3DController.getInstance() );

  this.domElement = domElement;
	
	this.cameraController = new fengshui.controllers.view3d.CameraController(this);

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

	var viewSize = this.getViewSize();

	this._renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	this._renderer.setClearColor(0xffffff, 1);
	this._renderer.setSize( viewSize.width, viewSize.height );

	goog.dom.appendChild( this.domElement, this._renderer.domElement );
	goog.dom.appendChild( this.domElement, fengshui.views.View3D.STATS.domElement );

	// loader
	var loader = new THREE.ObjectLoader();
	loader.load( fengshui.Config['basePath'] + "json/scene-bed-bake.json", goog.bind(this.onLoad, this) );
};


fengshui.views.View3D.prototype.getViewSize = function(){

	return goog.style.getSize(this.domElement);
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
	this._renderer.render(this._scene, this.cameraController.activeCamera);
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
	var viewSize = this.getViewSize();

	var vFOV = camera.fov * (Math.PI / 180);
	var cameraZ = viewSize.height / (2 * Math.tan(vFOV / 2) );

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

	// create camera controller
	this.cameraController.init( this._scene );

	// get default camera
	var defaultCamera = this.cameraController.getCamera('default');
	defaultCamera.position.x = 0;
	defaultCamera.position.y = 50;
	defaultCamera.position.z = 350;

	var shadowCamera = this.cameraController.addCamera('shadow');
	this.cameraController.copyCameraAttributesFromTo(defaultCamera, shadowCamera);
	shadowCamera.fov = 10;
	shadowCamera.updateProjectionMatrix();

	// controls
	this._controls = new THREE.TrackballControls( defaultCamera, this._renderer.domElement );
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
	//this._controls.enabled = false;

	this._eventHandler.listen(this._controls, 'change', this.render, false, this);
	this._eventHandler.listen(this, fengshui.events.EventType.CHANGE, this.onCameraChange, false, this);
	this._eventHandler.listen(window, 'resize', this.onResize, false, this);

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
  });
  material.alphaTest = 0.5;
  bed.material = material;

	this.render();

	//
	goog.fx.anim.registerAnimation(this);

	// test path finding
	var pathfinder = fengshui.controllers.view3d.PathfindingController.getInstance();

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


fengshui.views.View3D.prototype.onCameraChange = function(e){

	this._controls.object = e.camera;
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

	var viewSize = this.getViewSize();

	this.cameraController.onResize( viewSize.aspectRatio() );

	this._renderer.setSize( viewSize.width, viewSize.height );

	this._controls.handleResize();

	this.render();
};


fengshui.views.View3D.STATS = new Stats();


fengshui.views.View3D.MODE = {
	BROWSE: 'browse', //look around
	CLOSE_UP: 'close_up', // lock to an object's unique perspective of view
	PATH: 'path',	// following a path
	TRANSITION: 'transition' // transition between different cameras for the above mode
};