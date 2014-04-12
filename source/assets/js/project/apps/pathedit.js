goog.provide('feng.apps.PathEdit');

goog.require('goog.dom');
goog.require('goog.events.KeyHandler');
goog.require('goog.events.MouseWheelHandler');
goog.require('goog.fx.anim');
goog.require('feng.templates.main');
goog.require('feng.fx.EnergyFlow');
goog.require('feng.fx.PathTrack');
goog.require('feng.models.Preload');
goog.require('feng.views.Preloader');
goog.require('feng.views.View3D');
goog.require('feng.views.debug.Debugger');


feng.apps.PathEdit = function() {

	goog.base(this);

	goog.fx.anim.setAnimationWindow(window);

	this._preloader = new feng.views.Preloader(null, 250);

	this._sceneKeys = [
		'studio.interior1',
		'studio.interior2',
		'studio.bathroom'
	];

	this._scene = null;
	this._scenes = [];
	this._camera = null;
	this._editCamera = null;
	this._motionCamera = null;
	this._motionCameraHelper = null;
	this._renderer = null;
	this._controls = null;
	this._pathTrack = null;

	this._mousePosition = new THREE.Vector3();
	this._offset = new THREE.Vector3();
	this._intersect = null;
	this._controlPoint = null;

	this._motionTweener = null;

	this._keyHandler = null;
	this._mouseWheelHandler = null;
	this._zoomFactor = 1;
	this._zoom = 1;
	this._isObjectsShown = true;

	this.init();
};
goog.inherits(feng.apps.PathEdit, goog.events.EventTarget);
goog.addSingletonGetter(feng.apps.PathEdit);


feng.apps.PathEdit.prototype.init = function() {

	var mainFrag = soy.renderAsFragment(feng.templates.main.Spline);
	goog.dom.appendChild(document.body, mainFrag);

	var domElement = goog.dom.getElement('spline');
	var canvas = goog.dom.query('canvas', domElement)[0];

	this._renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		antialias: true
	});
	this._renderer.setClearColor(0xffffff, 1);
	this._renderer.setSize( window.innerWidth, window.innerHeight );

	this._editCamera = new THREE.CombinedCamera( window.innerWidth, window.innerHeight, 45, 1, 10000, 1, 10000 );
	this._editCamera.position.x = 500;
	this._editCamera.position.y = 500;
	this._editCamera.position.z = 500;

	this._motionCamera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1000 );

	this._camera = this._editCamera;

	this._keyHandler = new goog.events.KeyHandler( document );
	goog.events.listen(this._keyHandler, 'key', this.onKey, false, this);

	this._mouseWheelHandler = new goog.events.MouseWheelHandler( this._renderer.domElement );
	goog.events.listen(this._mouseWheelHandler, goog.events.MouseWheelHandler.EventType.MOUSEWHEEL, this.onMouseWheel, false, this);

	goog.events.listen(this._renderer.domElement, 'mousedown', this.onMouseDown, false, this);
	goog.events.listen(window, 'resize', this.onResize, false, this);

	this._controls = new THREE.OrbitControls(this._camera, this._renderer.domElement);
	this._controls.noZoom = true;
	this._controls.noKeys = true;

	this._preloader.load( this._sceneKeys );
	goog.events.listenOnce(this._preloader, feng.events.EventType.LOAD_COMPLETE, this.onLoadComplete, false, this);
};


feng.apps.PathEdit.prototype.getDefaultPathTrack = function() {
	var pathTrack = goog.array.find(this._scene.children, function(child) {
  	return (child instanceof feng.fx.PathTrack);
  });

  return pathTrack;
};


feng.apps.PathEdit.prototype.highlightControl = function() {

	this._pathTrack.getObjectByName('cube'+goog.array.indexOf(this._pathTrack.controlPoints, this._controlPoint)).material.opacity = 1;
};


feng.apps.PathEdit.prototype.showObjects = function(shouldShow) {

	this._isObjectsShown = shouldShow;

	goog.array.forEach(this._scene.children, function(child) {
		if(!(child instanceof feng.fx.PathTrack)) {
			child.visible = shouldShow;
		}
	});
};


feng.apps.PathEdit.prototype.updateMotionTweener = function() {

	var tempProgress = this._motionTweener ? this._motionTweener.progress() : 0;
	this._motionTweener = null;
	this.onPlay();
	this._motionTweener.progress(tempProgress);
	this.onPause();
};


feng.apps.PathEdit.prototype.render = function() {

	this._renderer.render(this._scene, this._camera);
};


feng.apps.PathEdit.prototype.onLoadComplete = function(e) {

	this._scenes = goog.array.map(this._sceneKeys, function(sceneKey) {

		var preloadModel = feng.models.Preload.getInstance();
		var sceneData = preloadModel.getAsset(sceneKey);

		var sectionId = sceneKey.split('.')[0];
		var sceneId = sceneKey.split('.')[1];
		
		var scene = feng.views.View3D.constructScene( sectionId, sceneId, sceneData );

		var motionCameraHelper = new THREE.CameraHelper( this._motionCamera );
		motionCameraHelper.name = 'motionCameraHelper';
		scene.add( motionCameraHelper );

		var coordinates = [
			new THREE.Vector3(100, 40, 0),
			new THREE.Vector3(-30, 50, -50),
			new THREE.Vector3(-100, 50, -200)
		];
		var pathTrack = new feng.fx.EnergyFlow(coordinates);
		scene.add( pathTrack );

		return scene;
	}, this);

	this._scene = this._scenes[0];
	this._scene.add( this._editCamera );
	this._scene.add( this._motionCamera );

	this._motionCameraHelper = this._scene.getObjectByName('motionCameraHelper');

	this._pathTrack = this.getDefaultPathTrack();
	this._controlPoint = this._pathTrack.controlPoints[0];
	this.highlightControl();

	//
	goog.fx.anim.registerAnimation(this);

	// create debugger
	with(feng.views.debug.Debugger.Options) {
		CAMERA = false;
		PATHFINDING = false;
		MANIPULATE = false;
		ACHIEVEMENTS = false;
		PATH_TRACK = true;
	};
	
	feng.views.debug.Debugger.getInstance();

	goog.events.listen(this, feng.events.EventType.ADD, this.onAddControlPoint, false, this);
	goog.events.listen(this, feng.events.EventType.REMOVE, this.onRemoveControlPoint, false, this);
	goog.events.listen(this, feng.events.EventType.CHANGE, this.onChange, false, this);
	goog.events.listen(this, feng.events.EventType.PLAY, this.onPlay, false, this);
	goog.events.listen(this, feng.events.EventType.PAUSE, this.onPause, false, this);
	goog.events.listen(this, feng.events.EventType.PROGRESS, this.onProgress, false, this);

	//
	this.dispatchEvent({
		type: e.type,
		scenes: this._scenes
	});

	this.dispatchEvent({
  	type: feng.events.EventType.CHANGE,
  	controlPoint: this._controlPoint,
  	pathTrack: this._pathTrack
  });
};


feng.apps.PathEdit.prototype.onChange = function(e) {

	if(e.fly === true) {

		this._camera = this._motionCamera;

	}else if(e.fly === false) {

		this._camera = this._editCamera;
	}

	if(e.sceneName) {
		this._scene = goog.array.find(this._scenes, function(scene) {
			return scene.name === e.sceneName;
		});

		this._scene.add( this._editCamera );
		this._scene.add( this._motionCamera );

	  this._pathTrack = this.getDefaultPathTrack();
	  this._controlPoint = this._pathTrack.controlPoints[0];
	  this.highlightControl();

  	this._motionCameraHelper = this._scene.getObjectByName('motionCameraHelper');

		this.updateMotionTweener();

		this.showObjects(true);

		this.dispatchEvent({
	  	type: feng.events.EventType.CHANGE,
	  	controlPoint: this._controlPoint,
	  	pathTrack: this._pathTrack
	  });
	}
};


feng.apps.PathEdit.prototype.onPlay = function(e) {

	if(!this._motionTweener) {

		var prop = {
			progress: 0
		};

		this._motionTweener = TweenMax.to(prop, 10, {
			progress: 1,
			ease: Linear.easeNone,
			onUpdate: this.onProgress,
			onUpdateParams: [prop],
			onUpdateScope: this,
			onComplete: this.onComplete,
			onCompleteScope: this
		});
	}

	if(this._motionTweener.progress() === 1) {
		this._motionTweener.restart();
	}else {
		this._motionTweener.play();
	}
};


feng.apps.PathEdit.prototype.onProgress = function(e) {

	//
	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		progress: e.progress
	});

	//
	var pathCamera = this._pathTrack.getCameraAt( e.progress );

	this._motionCamera.position.copy( pathCamera.position );
	this._motionCamera.rotation.copy( pathCamera.rotation );

	console.log( this._pathTrack.getTipIdsAndWeightOfProgress( e.progress ) );
};


feng.apps.PathEdit.prototype.onPause = function(e) {

	this._motionTweener.pause();
};


feng.apps.PathEdit.prototype.onComplete = function(e) {

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		complete: true
	});
};


feng.apps.PathEdit.prototype.onAddControlPoint = function(e) {

	if(this._controlPoint) {

		this._pathTrack.addControlPoint( this._controlPoint );

		var currentControlId = goog.array.indexOf(this._pathTrack.controlPoints, this._controlPoint);
		var nextControlId = currentControlId + 1;
		this._controlPoint = this._pathTrack.controlPoints[nextControlId];

		this._pathTrack.updateTrack();
		this.highlightControl();
	}
};


feng.apps.PathEdit.prototype.onRemoveControlPoint = function(e) {

	if(this._controlPoint) {
		var currentControlId = goog.array.indexOf(this._pathTrack.controlPoints, this._controlPoint);
		var nextControlId = Math.max(0, currentControlId-1);

		if(currentControlId === nextControlId) {
			if(this._pathTrack.controlPoints.length <= 1) {
				return;
			}
		}

		var controlToRemove = this._controlPoint;

		this._controlPoint = this._pathTrack.controlPoints[nextControlId];

		this._pathTrack.removeControlPoint( controlToRemove );

		this._pathTrack.updateTrack();
		this.highlightControl();
	}
};


feng.apps.PathEdit.prototype.onMouseDown = function(e) {

	this._mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
	this._mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;

  var projector = new THREE.Projector();
  var raycaster = projector.pickingRay( this._mousePosition, this._camera );

  var pathTracksChildren = [];

  goog.array.forEach(this._scene.children, function(child) {
  	if(child instanceof feng.fx.PathTrack) {
  		goog.array.extend(pathTracksChildren, child.getControlMeshes());
  	}
  });

  var intersects = raycaster.intersectObjects( pathTracksChildren );

  if(intersects.length > 0) {

  	var intersect = intersects[0];

  	if(intersect.object instanceof THREE.Mesh) {

  		this._intersect = intersect;
  		this._pathTrack = this._intersect.object.parent;
	  	this._controlPoint = this._intersect.object.position;

	    this._offset.copy( this._intersect.point ).sub( this._controlPoint );

	    this._controls.enabled = false;

			goog.events.listen(document, 'mousemove', this.onMouseMove, false, this);
			goog.events.listen(document, 'mouseup', this.onMouseUp, false, this);

			this._pathTrack.updateTrack();
			this.highlightControl();
  	}
  }

  this.dispatchEvent({
  	type: feng.events.EventType.CHANGE,
  	controlPoint: this._controlPoint,
  	pathTrack: this._pathTrack
  });
};


feng.apps.PathEdit.prototype.onMouseMove = function(e) {

	this._mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
	this._mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;

  var projector = new THREE.Projector();
  var raycaster = projector.pickingRay( this._mousePosition, this._camera );
  var ray = raycaster.ray;

  var targetPos = ray.direction.clone().multiplyScalar( this._intersect.distance ).add( ray.origin );
  targetPos.sub(this._offset);

  this._controlPoint.copy( targetPos );

  this._pathTrack.updateTrack();

  this.highlightControl();

  // refresh progress of new spline
	this.updateMotionTweener();

	this.dispatchEvent({
  	type: feng.events.EventType.CHANGE,
  	controlPoint: this._controlPoint
  });
};


feng.apps.PathEdit.prototype.onMouseUp = function(e) {

	this._controls.enabled = true;

	goog.events.unlisten(document, 'mousemove', this.onMouseMove, false, this);
	goog.events.unlisten(document, 'mouseup', this.onMouseUp, false, this);
};


feng.apps.PathEdit.prototype.onKey = function(e) {

	switch(e.target.tagName) {
		case goog.dom.TagName.TEXTAREA:
		case goog.dom.TagName.INPUT:
		return false;
		break;
	};

	e.preventDefault();

	switch(e.keyCode) {
		case goog.events.KeyCodes.TAB:
		if(this._editCamera.inPerspectiveMode) {
			this._zoomFactor = 10;
			this._editCamera.toOrthographic();
			this._editCamera.setZoom(this._zoom * this._zoomFactor);
		}else {
			this._zoomFactor = 1;
			this._editCamera.toPerspective();
			this._editCamera.setZoom(this._zoom * this._zoomFactor);
		}
		break;

		case goog.events.KeyCodes.ONE:
		this._editCamera.position.x = 0;
		this._editCamera.position.y = 500;
		this._editCamera.position.z = 0;
		break;

		case goog.events.KeyCodes.TWO:
		this._editCamera.position.x = 0;
		this._editCamera.position.y = -500;
		this._editCamera.position.z = 0;
		break;

		case goog.events.KeyCodes.THREE:
		this._editCamera.position.x = 500;
		this._editCamera.position.y = 0;
		this._editCamera.position.z = 0;
		break;

		case goog.events.KeyCodes.FOUR:
		this._editCamera.position.x = -500;
		this._editCamera.position.y = 0;
		this._editCamera.position.z = 0;
		break;

		case goog.events.KeyCodes.FIVE:
		this._editCamera.position.x = 0;
		this._editCamera.position.y = 0;
		this._editCamera.position.z = 500;
		break;

		case goog.events.KeyCodes.SIX:
		this._editCamera.position.x = 0;
		this._editCamera.position.y = 0;
		this._editCamera.position.z = -500;
		break;

		case goog.events.KeyCodes.EQUALS:
		this.onAddControlPoint();
		break;

		case goog.events.KeyCodes.DASH:
		this.onRemoveControlPoint();
		break;

		case goog.events.KeyCodes.C:
		var shouldFly = (this._camera === this._editCamera);
		this.dispatchEvent({
			type: feng.events.EventType.CHANGE,
			fly: shouldFly
		});
		break;

		case goog.events.KeyCodes.H:
		this._isObjectsShown = !this._isObjectsShown;
		this.showObjects( this._isObjectsShown );
		break;
	};
};


feng.apps.PathEdit.prototype.onMouseWheel = function(e) {

	e.preventDefault();

	if(e.deltaY > 0) {

		this._zoom /= 1.1;
	}else {

		this._zoom *= 1.1;
	}

	this._editCamera.setZoom( this._zoom * this._zoomFactor );
};


feng.apps.PathEdit.prototype.onAnimationFrame = function(now) {

	this._controls.update();
	this.render();
};


feng.apps.PathEdit.prototype.onResize = function(e) {

	this._editCamera.setSize( window.innerWidth, window.innerHeight );
	this._editCamera.updateProjectionMatrix();	

	this._motionCamera.aspect = window.innerWidth / window.innerHeight;
	this._motionCamera.updateProjectionMatrix();		

	this._renderer.setSize( window.innerWidth, window.innerHeight );

	this.render();
};