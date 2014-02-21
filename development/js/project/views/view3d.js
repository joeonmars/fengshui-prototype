goog.provide('fengshui.views.View3D');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('fengshui.controllers.view3d.CameraController');
goog.require('fengshui.controllers.view3d.ModeController');
goog.require('fengshui.controllers.view3d.View3DController');


/**
 * @constructor
 */
fengshui.views.View3D = function(domElement){
  goog.base(this);

  this.setParentEventTarget( fengshui.controllers.view3d.View3DController.getInstance() );

  this.domElement = domElement;
	this.scene = null;
	
	this._renderer = null;
	this._axisHelper = null;

	this._splineGroupObject = null;

	this._collidables = [];

	this.cameraController = new fengshui.controllers.view3d.CameraController(this);
	this.modeController = new fengshui.controllers.view3d.ModeController(this);

  this._eventHandler = new goog.events.EventHandler(this);
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


fengshui.views.View3D.prototype.getRenderElement = function(){

	return this._renderer.domElement;
};


fengshui.views.View3D.prototype.show = function(){
 
 	this.onResize();

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
	this._renderer.render(this.scene, this.cameraController.activeCamera);
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
	
	this.scene = result;
	console.log(result);

	// add spline group object
	this._splineGroupObject = new THREE.Object3D();
	this._splineGroupObject.name = 'spline-group';
	this.scene.add( this._splineGroupObject );

	// create axis helper
	this._axisHelper = new THREE.AxisHelper( 1000 );
	this.scene.add( this._axisHelper );

	// init camera controller
	this.cameraController.init( this.scene );

	// add collidables
	this.scene.traverse(goog.bind(function(child) {
		if(child.userData['collidable'] === true) {
			this._collidables.push(child);
		}
	}, this));

	//
	var bed = this.scene.getObjectByName('bed');
	var material = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('model/bed_bake.png'),
    transparent: true,
    side: THREE.DoubleSide
  });
  material.alphaTest = 0.5;
  bed.material = material;

	this.render();

	// init mode controller
	this.modeController.init({
		mode: fengshui.views.View3D.Mode.BROWSE,
		fromPosition: new THREE.Vector3(0, 80, 350),
		fromRotation: new THREE.Euler(0, 0, 0, 'XYZ'),
		fromFov: 45
	});

	// tween the camera
	//this.cameraController.animatePositionTo(new THREE.Vector3(0, 100, 600), 4);
	//this.cameraController.animateFocusTo(new THREE.Vector3(0, 40, 0), 4);
	//this.cameraController.animateFovTo(10, 4);
	//this.cameraController.animateFocusTo(end, 1, Linear.easeNone);
	//this.cameraController.animateTo( closeupCamera.position.clone(), bed.position.clone(), 30 );


	//
	goog.fx.anim.registerAnimation(this);
	this._eventHandler.listen(window, 'resize', this.onResize, false, this);
};


fengshui.views.View3D.prototype.onAnimationFrame = function(now){

  var time = now * 0.0004;

  var bed = this.scene.getObjectByName('bed');
  //bed.rotation.y = time * 0.5;

  fengshui.views.View3D.STATS.update();

  this.render();
};


fengshui.views.View3D.prototype.onResize = function(e){

	var viewSize = this.getViewSize();

	this.cameraController.onResize( viewSize.aspectRatio() );

	this._renderer.setSize( viewSize.width, viewSize.height );

	this.render();
};


fengshui.views.View3D.STATS = new Stats();


fengshui.views.View3D.Mode = {
	BROWSE: 'browse', //look around
	CLOSE_UP: 'close_up', // a locked perspective viewing a specific object
	MANIPULATE: 'manipulate', // isometrix view for ease of positioning/rotating control
	PATH: 'path',	// following a path
	TRANSITION: 'transition' // transition between different cameras for the above mode
};