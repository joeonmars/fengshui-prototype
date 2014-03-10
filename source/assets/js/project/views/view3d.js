goog.provide('feng.views.View3D');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('feng.controllers.view3d.CameraController');
goog.require('feng.controllers.view3d.ModeController');
goog.require('feng.controllers.view3d.View3DController');
goog.require('feng.models.Preload');


/**
 * @constructor
 */
feng.views.View3D = function(domElement, uiElement, id, eventMediator){
  goog.base(this);

  this.setParentEventTarget( feng.controllers.view3d.View3DController.getInstance() );

  this.id = id;
  this.domElement = domElement;
  this.uiElement = uiElement;

  this.eventMediator = eventMediator;

  this.cameraController = null;
	this.modeController = null;

	this.scene = null;

	this._renderer = null;
	this._axisHelper = null;

	this._collidables = [];

	this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.views.View3D, goog.events.EventTarget);


feng.views.View3D.prototype.init = function(){

	this.cameraController = new feng.controllers.view3d.CameraController(this);
	this.modeController = new feng.controllers.view3d.ModeController(this);

	var viewSize = this.getViewSize();

	this._renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	this._renderer.shadowMapEnabled = true;
	this._renderer.setClearColor(0xffffff, 1);
	this._renderer.setSize( viewSize.width, viewSize.height );
	
	goog.dom.appendChild( this.domElement, this._renderer.domElement );
	goog.dom.appendChild( this.domElement, feng.views.View3D.STATS.domElement );

	this.initScene();
};


feng.views.View3D.prototype.getViewSize = function(){

	return goog.style.getSize(this.domElement);
};


feng.views.View3D.prototype.getRenderElement = function(){

	return this._renderer.domElement;
};


feng.views.View3D.prototype.getGround = function(){

	return this.scene.getObjectByName('ground');
};


feng.views.View3D.prototype.getMeshBox = function(mesh){

	var box = new THREE.Box3().setFromObject( mesh );
  var minX = box.min.x;
  var minZ = box.min.z;
  var maxX = box.max.x;
  var maxZ = box.max.z;

  return (new goog.math.Box(minZ, maxX, maxZ, minX));
};


feng.views.View3D.prototype.getCollidables = function(excludes){

	excludes = goog.isArray(excludes) ? excludes : [excludes];

	var collidables = goog.array.filter(this.scene.children, function(child) {
  	return (goog.array.indexOf(excludes, child) < 0 && child.userData['collidable'] === true);
  });

  return collidables;
};


feng.views.View3D.prototype.getCollidableBoxes = function(excludes){

	var collidables = this.getCollidables(excludes);

	var collidableBoxes = [];

	goog.array.forEach(collidables, function(mesh) {
	  collidableBoxes.push( this.getMeshBox(mesh) );
	}, this);

	return collidableBoxes;
};


feng.views.View3D.prototype.activate = function(){
 
 	this._eventHandler.listen(window, 'resize', this.onResize, false, this);
};
 
 
feng.views.View3D.prototype.deactivate = function(){
 
	this._eventHandler.removeAll();
};


feng.views.View3D.prototype.show = function(){
 
 	this.onResize();

	this.dispatchEvent({
    type: feng.events.EventType.SHOW
  });
};
 
 
feng.views.View3D.prototype.hide = function(){
 
	this.dispatchEvent({
    type: feng.events.EventType.HIDE
  });
};


feng.views.View3D.prototype.render = function() {
	this._renderer.render(this.scene, this.cameraController.activeCamera);
};


feng.views.View3D.prototype.initScene = function() {
	
	this.scene = feng.views.View3D.constructScene(this.id, 'interior1');

	// add collidables
	this.scene.traverse(goog.bind(function(child) {
		if(child.userData['collidable'] === true) {
			this._collidables.push(child);
		}
	}, this));

	// create axis helper
	this._axisHelper = new THREE.AxisHelper( 1000 );
	this.scene.add( this._axisHelper );

	// init camera controller
	this.cameraController.init( this.scene );

	// init mode controller
	this.modeController.init({
		mode: feng.views.View3D.Mode.BROWSE,
		fromPosition: new THREE.Vector3(0, 80, 350),
		fromRotation: new THREE.Euler(0, 0, 0, 'XYZ'),
		fromFov: 45
	});

	//
	goog.fx.anim.registerAnimation(this);
};


feng.views.View3D.prototype.onAnimationFrame = function(now){

  feng.views.View3D.STATS.update();

  this.render();
};


feng.views.View3D.prototype.onResize = function(e){

	var viewSize = this.getViewSize();

	this.cameraController.onResize( viewSize.aspectRatio() );

	this._renderer.setSize( viewSize.width, viewSize.height );

	this.render();
};


feng.views.View3D.constructScene = function(sectionId, sceneId) {

	// create a threejs loader just for parsing scene data
	var loader = new THREE.ObjectLoader();

	// get scene data
	var preloadModel = feng.models.Preload.getInstance();
	var sceneDataPrefix = sectionId+'.'+sceneId;
	var sceneData = preloadModel.getAsset(sceneDataPrefix+'.scene-data');
	var scene = loader.parse( sceneData );

	// parse scene children
	var checkChildren = function(object) {
		if(object instanceof THREE.Object3D) {
			if(object.userData['texture']) {
				var textureSrc = preloadModel.getAsset(sceneDataPrefix+'.'+object.userData['texture']).src;
				object.material.color.setRGB(1, 1, 1);
			  object.material.map = THREE.ImageUtils.loadTexture( textureSrc );

			  if(object.userData['alpha'] === true) {
			  	object.material.alphaTest = 0.5;
			  }
			}

			if(object instanceof THREE.DirectionalLight) {
				object.castShadow = true;

				object.shadowMapWidth = 2048;
				object.shadowMapHeight = 2048;

				var d = 1000;
				object.shadowCameraLeft = -d;
				object.shadowCameraRight = d;
				object.shadowCameraTop = d;
				object.shadowCameraBottom = -d;
				object.shadowCameraFar = 1000;
				object.shadowDarkness = 0.04;
				//object.shadowCameraVisible = true;
			}

			if(object instanceof THREE.Mesh) {
				object.castShadow = true;
			}

			if(object.material) {
				object.material.shading = THREE.FlatShading;
			}

			var children = object.children;
			goog.array.forEach(children, function(child) {
				checkChildren(child);
			});
		}
  };

  scene.getObjectByName('ground').receiveShadow = true;

	scene.traverse(function(child) {
		checkChildren(child);
	});

  return scene;
};


feng.views.View3D.STATS = new Stats();


feng.views.View3D.Mode = {
	BROWSE: 'browse', //look around
	CLOSE_UP: 'close_up', // a locked perspective viewing a specific object
	MANIPULATE: 'manipulate', // isometrix view for ease of positioning/rotating control
	PATH: 'path',	// following a path
	TRANSITION: 'transition' // transition between different cameras for the above mode
};