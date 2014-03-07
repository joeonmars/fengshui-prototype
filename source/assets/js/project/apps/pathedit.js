goog.provide('feng.apps.PathEdit');

goog.require('goog.dom');
goog.require('goog.fx.anim');
goog.require('feng.templates.main');
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
		'studio.interior3'
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

	this.init();
};
goog.inherits(feng.apps.PathEdit, goog.events.EventTarget);
goog.addSingletonGetter(feng.apps.PathEdit);


feng.apps.PathEdit.prototype.init = function() {

	var mainFrag = soy.renderAsFragment(feng.templates.main.Spline);
	goog.dom.appendChild(document.body, mainFrag);

	var canvas = goog.dom.query('#spline > canvas')[0];

	this._renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		antialias: true
	});
	this._renderer.setClearColor(0xffffff, 1);
	this._renderer.setSize( window.innerWidth, window.innerHeight );

	this._editCamera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
	this._editCamera.position.x = 500;
	this._editCamera.position.y = 500;
	this._editCamera.position.z = 500;

	this._motionCamera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 1000 );

	this._camera = this._editCamera;

	this._motionCameraHelper = new THREE.CameraHelper( this._motionCamera );

	goog.events.listen(this._renderer.domElement, 'mousedown', this.onMouseDown, false, this);
	goog.events.listen(window, 'resize', this.onResize, false, this);

	this._controls = new THREE.OrbitControls(this._camera, this._renderer.domElement);

	this._preloader.load( this._sceneKeys );
	goog.events.listenOnce(this._preloader, feng.events.EventType.LOAD_COMPLETE, this.onLoadComplete, false, this);
};


feng.apps.PathEdit.prototype.highlightControl = function() {

	this._pathTrack.getObjectByName('cube'+goog.array.indexOf(this._pathTrack.controlPoints, this._controlPoint)).material.opacity = 1;
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

		var coordinates = [
			new THREE.Vector3(100, 200, 0),
			new THREE.Vector3(150, 250, 10),
			new THREE.Vector3(50, -100, 100),
			new THREE.Vector3(-100, 0, -200)
		];
		var pathTrack = new feng.fx.PathTrack(coordinates);
		scene.add( pathTrack );

		return scene;
	}, this);

	this._scene = this._scenes[0];
	this._scene.add( this._motionCameraHelper );

	//
	goog.fx.anim.registerAnimation(this);

	// create debugger
	with(feng.views.debug.Debugger.Options) {
		CAMERA = false;
		PATHFINDING = false;
		PATH_TRACK = true;
	};
	
	feng.views.debug.Debugger.getInstance();

	goog.events.listen(this, feng.events.EventType.ADD, this.onAddControlPoint, false, this);
	goog.events.listen(this, feng.events.EventType.REMOVE, this.onRemoveControlPoint, false, this);
	goog.events.listen(this, feng.events.EventType.CHANGE, this.onSceneChange, false, this);
	goog.events.listen(this, feng.events.EventType.PLAY, this.onPlay, false, this);
	goog.events.listen(this, feng.events.EventType.PAUSE, this.onPause, false, this);
	goog.events.listen(this, feng.events.EventType.STOP, this.onStop, false, this);

	//
	this.dispatchEvent({
		type: e.type,
		scenes: this._scenes
	});
};


feng.apps.PathEdit.prototype.onSceneChange = function(e) {

	if(e.sceneName) {
		this._scene = goog.array.find(this._scenes, function(scene) {
			return scene.name === e.sceneName;
		});

		this._scene.add( this._motionCameraHelper );
	}
};


feng.apps.PathEdit.prototype.onPlay = function(e) {
// refer to http://mrdoob.github.io/three.js/examples/webgl_geometry_extrude_splines.html
	if(!this._motionTweener) {

		var prop = {
			val: 0
		};

		this._motionTweener = TweenMax.to(prop, 5, {
			val: 1,
			ease: Linear.easeNone,
			onUpdate: function() {
				var position = this._pathTrack.spline.getPointAt( prop.val );
				var nextPosition = this._pathTrack.spline.getPointAt( Math.min(1, prop.val + 0.05) );
				this._motionCamera.position.copy( position );
			},
			onUpdateScope: this
		});
	}

	if(this._motionTweener.progress() === 1) {
		this._motionTweener.restart();
	}else {
		this._motionTweener.play();
	}

	this._camera = this._motionCamera;
};


feng.apps.PathEdit.prototype.onPause = function(e) {

	this._motionTweener.pause();
};


feng.apps.PathEdit.prototype.onStop = function(e) {

	this._motionTweener.pause();

	this._camera = this._editCamera;
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
  		goog.array.extend(pathTracksChildren, child.children);
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

			this.highlightControl();
  	}
  }else {

  	if(this._pathTrack) {
  		this._pathTrack.updateTrack();
  	}

  	this._intersect = null;
  	this._pathTrack = null;
  	this._controlPoint = null;
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
};


feng.apps.PathEdit.prototype.onMouseUp = function(e) {

	this._controls.enabled = true;

	goog.events.unlisten(document, 'mousemove', this.onMouseMove, false, this);
	goog.events.unlisten(document, 'mouseup', this.onMouseUp, false, this);
};


feng.apps.PathEdit.prototype.onAnimationFrame = function(now) {

	this._controls.update();
	this.render();
};


feng.apps.PathEdit.prototype.onResize = function(e) {

	this._camera.aspect = window.innerWidth / window.innerHeight;
	this._camera.updateProjectionMatrix();
	this._renderer.setSize( window.innerWidth, window.innerHeight );

	this.render();
};