goog.provide('feng.views.View3D');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
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
goog.require('feng.views.view3dobject.HolderObject');
goog.require('feng.views.view3dobject.GatewayObject');
goog.require('feng.views.view3dobject.AccessoryObject');
goog.require('feng.views.view3dobject.TipObject');
goog.require('feng.views.view3dobject.entities.Computer');
goog.require('feng.views.view3dobject.entities.PictureDisplay');
goog.require('feng.views.view3dobject.entities.PictureFrame');


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

	this.origin = new THREE.Vector3(0, feng.controllers.controls.Controls.Default.STANCE_HEIGHT, 400);

	this.scene = null;
	this.energyFlow = null;

	this.view3dObjects = {};
	this.interactiveObjects = {};

	this.accessories = [];
	this.editables = [];
	this.collidables = [];

	this.viewSize = new goog.math.Size(0, 0);

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
		var viewSize = goog.style.getSize(this.containerElement);
		this.viewSize.width = viewSize.width;
		this.viewSize.height = viewSize.height;
	}

	return this.viewSize;
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


feng.views.View3D.prototype.getObjectsByClass = function( objectClass ){

	var result = [];

	goog.object.forEach(this.view3dObjects, function(object, name) {
		if(object instanceof objectClass) {
			result.push( object );
		}
	});

	return result;
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

	/*
	 * Classes to be created by external json data
	 */
	var objectClass = {
		'tip': feng.views.view3dobject.TipObject,
	  'holder': feng.views.view3dobject.HolderObject,
	  'gateway': feng.views.view3dobject.GatewayObject,
	  'picturedisplay': feng.views.view3dobject.entities.PictureDisplay,
	  'pictureframe': feng.views.view3dobject.entities.PictureFrame,
	  'computer': feng.views.view3dobject.entities.Computer
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
			var typedObject = new objectClass[className](object, objectData, this);

			this.interactiveObjects[ object.name ] = typedObject;
			this.view3dObjects[ object.name ] = typedObject;

			if(className === 'holder') {
				var accessoryObject = new feng.views.view3dobject.AccessoryObject( this.accessories, typedObject, 'empty', this );

				var objectName = accessoryObject.object3d.name;
				this.interactiveObjects[ objectName ] = accessoryObject;
				this.view3dObjects[ objectName ] = accessoryObject;
			}

		}else if(interactions.length > 0) {

			// create interactive object
			var interactiveObject = new feng.views.view3dobject.InteractiveObject( object, objectData, this);
			this.interactiveObjects[ object.name ] = interactiveObject;
			this.view3dObjects[ object.name ] = interactiveObject;

		}else {

			if( !(object instanceof THREE.Light) ) {

				// create view3d object
				var view3dObject = new feng.views.view3dobject.View3DObject( object, objectData, this);
				this.view3dObjects[ object.name ] = view3dObject;
			}
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

	// init computer
	var computers = this.getObjectsByClass( feng.views.view3dobject.entities.Computer );

	goog.array.forEach( computers, function( computer ) {
		computer.init();
	});

	// init energyflow
	var preloadModel = feng.models.Preload.getInstance();
	var energyFlowData = preloadModel.getAsset(this.sectionId+'.'+this.id+'.energyflow-data');

	if(energyFlowData) {
		var controlPoints = energyFlowData['controlPoints'];
		this.energyFlow = new feng.fx.EnergyFlow( controlPoints, this.id, this.sectionId );
		this.scene.add( this.energyFlow );
	}
};


feng.views.View3D.prototype.onAnimationFrame = function(now){

	this.render();
};


feng.views.View3D.prototype.onCameraChange = function(e){

	this._renderer.setCamera( e.camera );
};


feng.views.View3D.prototype.onResize = function(e){

	var viewSize = goog.style.getSize(this.containerElement);
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

				var textureSrc = preloadModel.getAsset( textureData ).src;
			  object.material.map = THREE.ImageUtils.loadTexture( textureSrc );
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