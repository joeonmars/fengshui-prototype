goog.provide('feng.views.View3D');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('feng.controllers.view3d.CameraController');
goog.require('feng.controllers.view3d.ModeController');
goog.require('feng.controllers.view3d.View3DController');
goog.require('feng.fx.EnergyFlow');
goog.require('feng.fx.TextureAnimator');
goog.require('feng.fx.Renderer');
goog.require('feng.models.Preload');
goog.require('feng.models.View3D');
goog.require('feng.models.Accessories');
goog.require('feng.views.view3dobject.View3DObject');
goog.require('feng.views.view3dobject.InteractiveObject');
goog.require('feng.views.view3dobject.HolderObject');
goog.require('feng.views.view3dobject.GatewayObject');
goog.require('feng.views.view3dobject.AccessoryObject');

/**
 * @constructor
 */
feng.views.View3D = function(sectionId, viewId, containerElement, uiElement, eventMediator){

  goog.base(this);

  this.id = viewId;
  this.sectionId = sectionId;

  var view3dController = feng.controllers.view3d.View3DController.getInstance();
  view3dController.registerView3D( this );

  this.setParentEventTarget( view3dController );

  this.containerElement = containerElement;
  this.uiElement = uiElement;
 
  this.domElement = goog.dom.createDom('canvas');
  goog.dom.appendChild( this.containerElement, this.domElement );

  this.eventMediator = eventMediator;

  this.cameraController = null;
	this.modeController = null;

	this.origin = new THREE.Vector3(0, feng.controllers.controls.Controls.Default.STANCE_HEIGHT, 400);

	this.scene = null;
	this.energyFlow = null;

	this.view3dObjects = {};
	this.interactiveObjects = {};

	this.accessories = [];
	this.editables = [];
	this.collidables = [];

	this._renderer = null;

	this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.views.View3D, goog.events.EventTarget);


feng.views.View3D.prototype.init = function(){

	this.cameraController = new feng.controllers.view3d.CameraController(this);
	this.modeController = new feng.controllers.view3d.ModeController(this);

	this.initScene();

	this._renderer = new feng.fx.Renderer(this.domElement, this.scene, this.cameraController.activeCamera);
	this._renderer.removePass(this._renderer._blurTexturePass);

	var viewSize = this.getViewSize();
	this._renderer.setSize( viewSize.width, viewSize.height );

	this.hide();
};


feng.views.View3D.prototype.getViewSize = function(){

	return goog.style.getSize(this.containerElement);
};


feng.views.View3D.prototype.getGround = function(){

	return this.scene.getObjectByName('ground');
};


feng.views.View3D.prototype.getView3dObject = function( name ){

	return this.view3dObjects[ name ];
};


feng.views.View3D.prototype.getInteractiveObject = function( name ){

	return this.interactiveObjects[ name ];
};


feng.views.View3D.prototype.getCollidables = function(excludes){

	excludes = goog.isArray(excludes) ? excludes : [excludes];

	var sectionId = this.sectionId;
	var sceneId = this.id;

	var collidables = goog.array.filter(this.scene.children, function(object) {

		var objectData = feng.models.View3D.getData(sectionId+'.'+sceneId+'.'+object.name);
  	return (goog.array.indexOf(excludes, object) < 0 && objectData.collidable === true);

  });

  return collidables;
};


feng.views.View3D.prototype.getCollidableBoxes = function(excludes){

	var collidables = this.getCollidables(excludes);

	var collidableBoxes = [];

	goog.array.forEach(collidables, function(mesh) {
		var object = this.getView3dObject( mesh.name );
	  collidableBoxes.push( object.getBox() );
	}, this);

	return collidableBoxes;
};


feng.views.View3D.prototype.activate = function(){
 
 	this._eventHandler.listen(window, 'resize', this.onResize, false, this);
 	this._eventHandler.listen(this.cameraController, feng.events.EventType.CHANGE, this.onCameraChange, false, this);
};
 
 
feng.views.View3D.prototype.deactivate = function(){
 
	this._eventHandler.removeAll();
};


feng.views.View3D.prototype.show = function(){
 
	goog.dom.appendChild( this.containerElement, feng.views.View3D.STATS.domElement );
 
	goog.style.showElement(this.domElement, true);

 	this.onResize();

	this.dispatchEvent({
    type: feng.events.EventType.SHOW
  });

	goog.fx.anim.registerAnimation(this);
};

 
feng.views.View3D.prototype.hide = function(){
 
 	goog.style.showElement(this.domElement, false);

 	goog.fx.anim.unregisterAnimation(this);

	this.dispatchEvent({
    type: feng.events.EventType.HIDE
  });
};


feng.views.View3D.prototype.fadeIn = function(){
 
 	var tweener = TweenMax.fromTo(this.domElement, .5, {
 		opacity: 0
 	}, {
 		opacity: 1
 	});

 	tweener.eventCallback("onStart", goog.bind(function() {
 		this.show();
 	}, this));

 	tweener.eventCallback("onComplete", goog.bind(function() {
 		this.dispatchEvent({
 			type: feng.events.EventType.ANIMATED_IN
 		});
 	}, this));
};


feng.views.View3D.prototype.fadeOut = function(){
 
 	var tweener = TweenMax.fromTo(this.domElement, .5, {
 		opacity: 1
 	}, {
 		opacity: 0
 	});

 	tweener.eventCallback("onComplete", goog.bind(function() {
 		this.hide();
 		this.dispatchEvent({
 			type: feng.events.EventType.ANIMATED_OUT
 		});
 	}, this));
};


feng.views.View3D.prototype.render = function() {
	
	this._renderer.render();
};


feng.views.View3D.prototype.initScene = function() {
	
	var constructed = feng.views.View3D.constructScene(this.sectionId, this.id);
	this.scene = constructed.scene;

	/*
	 * Classes to be created by external json data
	 */
	var objectClass = {
	  'holder': feng.views.view3dobject.HolderObject,
	  'gateway': feng.views.view3dobject.GatewayObject,
		'door': 'feng.views.view3dobject.Door',
		'wallpaper': 'feng.views.view3dobject.Wallpaper'
	};

	// parse scene objects
	var sectionId = this.sectionId;
	var sceneId = this.id;

	this.accessories = feng.models.Accessories.getInstance().getAccessories(sectionId, sceneId);

	var parse = goog.bind( function(object) {

		if(!(object instanceof THREE.Object3D)) return;

		var objectData = feng.models.View3D.getData(sectionId+'.'+sceneId+'.'+object.name);
		var interactions = objectData.interactions || [];
		var className = objectData.class;

		if(className) {

			// create specific class object
			var typedObject = new objectClass[className](object, objectData);

			this.interactiveObjects[ object.name ] = typedObject;
			this.view3dObjects[ object.name ] = typedObject;

			if(className === 'holder') {
				var accessoryObject = new feng.views.view3dobject.AccessoryObject( this.accessories, typedObject, 'empty' );

				var objectName = accessoryObject.object3d.name;
				this.interactiveObjects[ objectName ] = accessoryObject;
				this.view3dObjects[ objectName ] = accessoryObject;
			}

		}else if(interactions.length > 0) {

			// create interactive object
			var interactiveObject = new feng.views.view3dobject.InteractiveObject( object, objectData );
			this.interactiveObjects[ object.name ] = interactiveObject;
			this.view3dObjects[ object.name ] = interactiveObject;

		}else {

			// create view3d object
			var view3dObject = new feng.views.view3dobject.View3DObject( object, objectData );
			this.view3dObjects[ object.name ] = view3dObject;

		}

		// add collidables
		if(objectData.collidable === true) {
			this.collidables.push( object );
		}

		// add editables
		var interactions = objectData.interactions;
		if(interactions && (goog.array.contains(interactions, 'move') || goog.array.contains(interactions, 'rotate'))) {
			this.editables.push( object );
		}

	}, this);

	goog.array.forEach(this.scene.children, function(child) {
		feng.views.View3D.parseChildren(child, parse);
	});

	// init energyflow
	var preloadModel = feng.models.Preload.getInstance();
	var energyFlowData = preloadModel.getAsset(this.sectionId+'.'+this.id+'.energyflow-data');

	if(energyFlowData) {
		var controlPoints = energyFlowData['controlPoints'];
		this.energyFlow = new feng.fx.EnergyFlow( controlPoints, this.id, this.sectionId );
		this.scene.add( this.energyFlow );
	}

	// init camera controller
	this.cameraController.init( this.scene );

	// init mode controller
	this.modeController.init();
};


feng.views.View3D.prototype.onAnimationFrame = function(now){

  feng.views.View3D.STATS.update();

  this.render();
};


feng.views.View3D.prototype.onCameraChange = function(e){

	this._renderer.setCamera( e.camera );
};


feng.views.View3D.prototype.onResize = function(e){

	var viewSize = this.getViewSize();

	this.cameraController.onResize( viewSize.aspectRatio() );

	this._renderer.setSize( viewSize.width, viewSize.height );

	this.render();
};


feng.views.View3D.parseChildren = function(object, parseFunc) {

	parseFunc( object );

	if(object instanceof THREE.Object3D) {

		goog.array.forEach(object.children, function(child) {
			feng.views.View3D.parseChildren(child, parseFunc);
		});
	}
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
	var parse = function(object) {

		var objectData = feng.models.View3D.getData(sectionId+'.'+sceneId+'.'+object.name);

		if(object instanceof THREE.Object3D) {

			var textureData = objectData.texture;

			if(goog.isString(textureData)) {

				// if texture data is image
				var textureSrc = preloadModel.getAsset(sceneDataPrefix+'.'+textureData).src;
			  object.material.map = THREE.ImageUtils.loadTexture( textureSrc );

			}else if(goog.isObject(textureData)) {

				// if texture data is animated spritesheet
				var textureSrc = preloadModel.getAsset(sceneDataPrefix+'.'+textureData.texture).src;
				object.material.map = THREE.ImageUtils.loadTexture( textureSrc );
				object.material.color.setRGB(1, 1, 1);

				// create texture animator
				var texture = object.material.map;
				var htiles = textureData.htiles;
				var vtiles = textureData.vtiles;
				var ntiles = textureData.ntiles;
				var duration = textureData.duration;
				var textureAnimator = new feng.fx.TextureAnimator(texture, htiles, vtiles, ntiles, duration);
				textureData.animator = textureAnimator;
				textureAnimator.start();

			}

			if(object instanceof THREE.DirectionalLight) {
				object.castShadow = true;

				object.shadowMapWidth = 1024;
				object.shadowMapHeight = 1024;

				var d = 400;
				object.shadowCameraLeft = -d;
				object.shadowCameraRight = d;
				object.shadowCameraTop = d;
				object.shadowCameraBottom = -d;
				object.shadowCameraFar = 400;
				object.shadowDarkness = 0.05;
				//object.shadowCameraVisible = true;
			}

			if(object instanceof THREE.Mesh) {
				object.castShadow = true;
				object.receiveShadow = objectData.receiveShadow;

				if(object.material) {
					object.material.shading = THREE.FlatShading;
				}
			}
		}
  };

	goog.array.forEach(scene.children, function(child) {
		feng.views.View3D.parseChildren(child, parse);
	});

  return {
  	scene: scene
  };
};


feng.views.View3D.STATS = new Stats();