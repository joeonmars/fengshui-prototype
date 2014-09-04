goog.provide('feng.views.View3D');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('goog.object');
goog.require('feng.controllers.view3d.CameraController');
goog.require('feng.controllers.view3d.ModeController');
goog.require('feng.controllers.view3d.RenderController');
goog.require('feng.fx.EnergyFlow');
goog.require('feng.fx.Renderer');
goog.require('feng.models.Preload');
goog.require('feng.models.View3D');
goog.require('feng.models.Accessories');
goog.require('feng.views.book.Book');
goog.require('feng.views.view3dobject.View3DObject');
goog.require('feng.views.view3dobject.InteractiveObject');
goog.require('feng.views.view3dobject.Arms');
goog.require('feng.views.view3dobject.DesignPlane');
goog.require('feng.views.view3dobject.HolderObject');
goog.require('feng.views.view3dobject.MovableObject');
goog.require('feng.views.view3dobject.GatewayObject');
goog.require('feng.views.view3dobject.StairsObject');
goog.require('feng.views.view3dobject.Skybox');
goog.require('feng.views.view3dobject.AccessoryObject');
goog.require('feng.views.view3dobject.TipObject');
goog.require('feng.views.view3dobject.entities.Lamp');
goog.require('feng.views.view3dobject.entities.Computer');
goog.require('feng.views.view3dobject.entities.PictureDisplay');
goog.require('feng.views.view3dobject.entities.PictureFrame');
goog.require('feng.views.view3dobject.entities.Refrigerator');
goog.require('feng.views.view3dobject.entities.FruitPlate');
goog.require('feng.views.view3dobject.entities.Windows');


/**
 * @constructor
 */
feng.views.View3D = function(sectionId, viewId, containerElement, hud){

  goog.base(this);

  this.id = viewId;
  this.sectionId = sectionId;

  this.isShown = true;

  this.containerElement = containerElement;

  this.domElement = goog.dom.createDom('canvas');
  goog.dom.appendChild( this.containerElement, this.domElement );

  this.hud = hud;
  
  this.cameraController = null;
  this.renderController = null;
	this.modeController = null;

	this.scene = null;
	this.energyFlow = null;
	this.arms = null;
	this.designPlane = null;
	this.skybox = null;

	this.view3dObjects = {};
	this.interactiveObjects = {};
	this.tipObjects = {};

	this.accessories = [];

	this.viewSize = new goog.math.Size(0, 0);

	this.floorIndex = 0;
	this.floorObjects = [];
	this._floorMatrixIds = [];

	this._renderer = null;

	this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.views.View3D, goog.events.EventTarget);


feng.views.View3D.prototype.init = function(){

	this.initScene();

	this.cameraController = new feng.controllers.view3d.CameraController(this);
	this.cameraController.init( this.scene );

	this._renderer = new feng.fx.Renderer(this.domElement, this.scene, this.cameraController.activeCamera);

	var viewSize = this.getViewSize();
	this._renderer.setSize( viewSize.width, viewSize.height );
	
	this.renderController = new feng.controllers.view3d.RenderController(this);

	this.modeController = new feng.controllers.view3d.ModeController(this);
	this.modeController.init();

	this.hide();
};


feng.views.View3D.prototype.getViewSize = function(){

	if(this.viewSize.isEmpty()) {
		var viewSize = goog.dom.getViewportSize();
		this.viewSize.width = viewSize.width;
		this.viewSize.height = viewSize.height;
	}

	return this.viewSize;
};


feng.views.View3D.prototype.getMatrixId = function(){

	return this._floorMatrixIds[ this.floorIndex ];
};


feng.views.View3D.prototype.getEntry = function(){

	var gatewayObjects = this.getObjectsByClass( feng.views.view3dobject.GatewayObject );

	var entry = goog.array.find( gatewayObjects, function(gatewayObject) {
		return (gatewayObject.isEntry === true);
	});

	return entry;
};


feng.views.View3D.prototype.getFloorY = function(){

	return this.floorObjects[ this.floorIndex ].position.y;
};


feng.views.View3D.prototype.getObjectByTip = function( tip ){

	var tipObject = goog.object.findValue( this.tipObjects, function(object) {
		return (object.tip === tip);
	});

	return tipObject;
};


feng.views.View3D.prototype.getObjectsOfFloor = function( floorIndex ){

	var hasFloorIndex = goog.isNumber( floorIndex );

	var floor = hasFloorIndex ? this.floorObjects[floorIndex] : this.floorObjects[0];

	var upperFloor = this.floorObjects[floorIndex+1];

	var minY = floor.position.y;
	var maxY = upperFloor ? upperFloor.position.y : Number.MAX_VALUE;

	var objects = [];
	
	// find view3d objects between this floor and its upper floor, if exists
	goog.object.forEach(this.view3dObjects, function(object) {

		var obj3d = object.object3d;

		if(obj3d.position.y < maxY && obj3d.position.y >= minY) {
			objects.push( object );
		}
  });

	goog.array.remove( objects, this.designPlane );
	goog.array.remove( objects, this.skybox );

	return objects;
};


feng.views.View3D.prototype.getView3dObject = function( name ){

	return this.view3dObjects[ name ];
};


feng.views.View3D.prototype.getInteractiveObject = function( name ){

	return this.interactiveObjects[ name ];
};


feng.views.View3D.prototype.getObjectsByClass = function( objectClass ){

	var result = [];

	goog.object.forEach(this.view3dObjects, function(object, name) {
		if(object instanceof objectClass) {
			result.push( object );
		}
	});

	return result;
};


feng.views.View3D.prototype.activate = function(){

 	this._eventHandler.listen( window, 'resize', this.onResize, false, this );
 	this._eventHandler.listen( this.cameraController, feng.events.EventType.CHANGE, this.onCameraChange, false, this );
 	
 	goog.object.forEach(this.interactiveObjects, function(interactiveObject) {
 		interactiveObject.activate();
 	});

 	goog.fx.anim.registerAnimation(this);
};
 
 
feng.views.View3D.prototype.deactivate = function(){
 
	this._eventHandler.removeAll();

 	goog.object.forEach(this.interactiveObjects, function(interactiveObject) {
 		interactiveObject.deactivate();
 	});

	goog.fx.anim.unregisterAnimation(this);
};


feng.views.View3D.prototype.show = function(){
 
	if(this.isShown) return;
	else this.isShown = true;

	TweenMax.set(this.domElement, {
		'opacity': 0,
		'display': 'block'
	});

 	this.onResize();

 	var book = feng.views.book.Book.getInstance();
 	book.listen(feng.events.EventType.OPEN, this.deactivate, false, this);
 	book.listen(feng.events.EventType.CLOSE, this.activate, false, this);

	this.dispatchEvent({
		type: feng.events.EventType.SHOW
	});
};

 
feng.views.View3D.prototype.hide = function(){
 
	if(!this.isShown) return;
	else this.isShown = false;

	TweenMax.set(this.domElement, {
		'opacity': 0,
		'display': 'none'
	});

 	var book = feng.views.book.Book.getInstance();
 	book.unlisten(feng.events.EventType.OPEN, this.deactivate, false, this);
 	book.unlisten(feng.events.EventType.CLOSE, this.activate, false, this);

	this.dispatchEvent({
		type: feng.events.EventType.HIDE
	});
};


feng.views.View3D.prototype.fadeIn = function(){

	if(!this.isShown) {
		this.show();
	}

 	var tweener = TweenMax.to(this.domElement, 1, {
 		'delay': 1,
 		'opacity': 1,
 		'clearProps': 'all'
 	});

	this.dispatchEvent({
		type: feng.events.EventType.ANIMATE_IN
	});

 	tweener.eventCallback("onComplete", goog.bind(function() {
 		this.dispatchEvent({
 			type: feng.events.EventType.ANIMATED_IN
 		});
 	}, this));
};


feng.views.View3D.prototype.fadeOut = function(){
 
 	var tweener = TweenMax.to(this.domElement, 1, {
 		'opacity': 0
 	});

	this.dispatchEvent({
		type: feng.events.EventType.ANIMATE_OUT
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

	// add fog to scene for fading 45 deg ground plane
	this.scene.fog = new THREE.FogExp2( 0xd9d9d9, 0.0008 );

	// add directional light for shadow
	var light = new THREE.DirectionalLight( 0x000000, 1 );
	light.position.set( 200, 200, 200 );
	light.target.position.set(0, 0, 0);
	light.castShadow = true;

	light.shadowMapWidth = 512;
	light.shadowMapHeight = 512;

	var d = 400;
	light.shadowCameraLeft = -d;
	light.shadowCameraRight = d;
	light.shadowCameraTop = d;
	light.shadowCameraBottom = -d;
	light.shadowCameraNear = 2;
	light.shadowCameraFar = 800;

	light.shadowDarkness = 0.1;
	//light.shadowCameraVisible = true;

	this.scene.add( light );

	/*
	 * Classes to be created by external json data
	 */
	var objectClass = {
		'tip': feng.views.view3dobject.TipObject,
		'holder': feng.views.view3dobject.HolderObject,
		'movable': feng.views.view3dobject.MovableObject,
		'gateway': feng.views.view3dobject.GatewayObject,
		'stairs': feng.views.view3dobject.StairsObject,
		'picturedisplay': feng.views.view3dobject.entities.PictureDisplay,
		'pictureframe': feng.views.view3dobject.entities.PictureFrame,
		'computer': feng.views.view3dobject.entities.Computer,
		'lamp': feng.views.view3dobject.entities.Lamp,
		'refrigerator': feng.views.view3dobject.entities.Refrigerator,
		'windows': feng.views.view3dobject.entities.Windows,
		'fruitplate': feng.views.view3dobject.entities.FruitPlate
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
			var classObject = new objectClass[className](object, objectData, this);

		}else if(interactions.length > 0) {

			// create interactive object
			var interactiveObject = new feng.views.view3dobject.InteractiveObject( object, objectData, this);

		}else {

			if( object instanceof THREE.Mesh ) {

				// create view3d object
				var view3dObject = new feng.views.view3dobject.View3DObject( object, objectData, this);
			}
		}

	}, this);

	goog.array.forEach(this.scene.children, function(child) {
		feng.views.View3D.parseChildren(child, parse);
	});

	// find floors & init pathfinder matrix
	this.floorObjects = goog.array.filter(this.scene.children, function(obj) {
		if(goog.string.startsWith(obj.name, 'floor')) {
			return true;
		}
	});

	goog.array.sort(this.floorObjects, function(floorA, floorB) {
		return ((floorA.position.y > floorB.position.y) ? 1 : -1);
	});

	this._floorMatrixIds = goog.array.map(this.floorObjects, function(obj, index) {

		var matrixId = ([this.sectionId, this.id, index]).join('-');

		var objectsOfFloor = this.getObjectsOfFloor( index );

		feng.pathfinder.generateMatrix( matrixId, objectsOfFloor );

		return matrixId;
	}, this);

	// create energyflow
	var preloadModel = feng.models.Preload.getInstance();
	var energyFlowData = preloadModel.getAsset(this.sectionId+'.'+this.id+'.energyflow-data');

	if(energyFlowData) {
		var controlPoints = energyFlowData['controlPoints'];
		this.energyFlow = new feng.fx.EnergyFlow( controlPoints, this.id, this.sectionId );
		//this.scene.add( this.energyFlow );
	}

	// create design plane
	this.designPlane = new feng.views.view3dobject.DesignPlane( this );

	/* for testing skybox
	goog.object.forEach(this.view3dObjects, function(object) {
		object.removeFromScene();
	});
	*/

	// create skybox
	var assets = preloadModel.getAsset(this.sectionId+'.'+this.id+'.skybox');

	this.skybox = new feng.views.view3dobject.Skybox( assets, this );

	// create arms
	this.arms = new feng.views.view3dobject.Arms( this );

	// init all view3d objects
	goog.object.forEach(this.view3dObjects, function(object) {
		object.init();
	});
};


feng.views.View3D.prototype.onAnimationFrame = function(now){

	var control = this.modeController.control;
	this.arms.update( control.getPosition(), control.getRotation() );

	this.render();
};


feng.views.View3D.prototype.onCameraChange = function(e){

	this._renderer.setCamera( e.camera );
};


feng.views.View3D.prototype.onResize = function(e){

	var viewSize = goog.dom.getViewportSize();
	this.viewSize.width = viewSize.width;
	this.viewSize.height = viewSize.height;

	this.cameraController.onResize( this.viewSize.aspectRatio() );

	this._renderer.setSize( this.viewSize.width, this.viewSize.height );

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
	var sceneData = preloadModel.getAsset(sectionId+'.'+sceneId+'.scene-data');
	var scene = loader.parse( sceneData );

	// parse scene children
	var parse = function(object) {

		var objectData = feng.models.View3D.getData(sectionId+'.'+sceneId+'.'+object.name);

		if(object instanceof THREE.Object3D) {

			var textureData = objectData.texture;

			if(goog.isString(textureData)) {

					var textureAsset = preloadModel.getAsset( textureData );
					var texture;

					if(textureAsset.src) {

						texture = new THREE.Texture( textureAsset );
						texture.needsUpdate = true;

					}else {

						var ddsLoader = new THREE.DDSLoader();           
            var dds = ddsLoader.parse( textureAsset );

            texture = new THREE.CompressedTexture();
            texture.image = [];
            texture.flipY = false;
            texture.generateMipmaps = false;
            texture.image.width = dds.width;
            texture.image.height = dds.height;
            texture.mipmaps = dds.mipmaps;
            texture.format = dds.format;
            texture.needsUpdate = true;
					}

			  	object.material.map = texture;
			}

			if(object instanceof THREE.Mesh) {
				object.castShadow = objectData.castShadow || false;
				object.receiveShadow = objectData.receiveShadow || false;

				if(object.material) {
					object.material.shading = THREE.FlatShading;
					object.material.fog = false;
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