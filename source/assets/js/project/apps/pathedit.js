goog.provide('feng.apps.PathEdit');

goog.require('goog.dom');
goog.require('goog.fx.anim');
goog.require('feng.templates.main');
goog.require('feng.fx.PathTrack');
goog.require('feng.models.Preload');
goog.require('feng.views.Preloader');
goog.require('feng.views.View3D');


feng.apps.PathEdit = function() {

	goog.fx.anim.setAnimationWindow(window);

	this._preloader = new feng.views.Preloader(null, 250);

	this._scene = null;
	this._camera = null;
	this._renderer = null;
	this._controls = null;
	this._pathTrack = null;

	this._mousePosition = new THREE.Vector3();
	this._offset = new THREE.Vector3();
	this._intersect = null;
	this._selectedControl = null;

	this.init();
};
goog.addSingletonGetter(feng.apps.PathEdit);


feng.apps.PathEdit.prototype.init = function() {

	var mainFrag = soy.renderAsFragment(feng.templates.main.Spline);
	goog.dom.appendChild(document.body, mainFrag);

	this._preloader.load('studio.interior1');
	goog.events.listenOnce(this._preloader, feng.events.EventType.COMPLETE, this.onLoadComplete, false, this);
};


feng.apps.PathEdit.prototype.render = function() {

	this._renderer.render(this._scene, this._camera);
};


feng.apps.PathEdit.prototype.onLoadComplete = function(e) {

	var preloadModel = feng.models.Preload.getInstance();
	var sceneData = preloadModel.getAsset('studio.interior1.scene-data');

	this._scene = feng.views.View3D.constructScene( 'studio', 'interior1', sceneData );

	var canvas = goog.dom.query('#spline > canvas')[0];

	this._renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		antialias: true
	});
	this._renderer.setClearColor(0xffffff, 1);
	this._renderer.setSize( window.innerWidth, window.innerHeight );

	this._camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
	this._camera.position.x = 500;
	this._camera.position.y = 500;
	this._camera.position.z = 500;

	var coordinates = [
		new THREE.Vector3(100, 200, 0),
		new THREE.Vector3(150, 250, 10),
		new THREE.Vector3(50, -100, 100),
		new THREE.Vector3(-100, 0, -200)
	];
	this._pathTrack = new feng.fx.PathTrack(coordinates);
	this._scene.add( this._pathTrack );

	goog.events.listen(this._renderer.domElement, 'mousedown', this.onMouseDown, false, this);
	goog.events.listen(window, 'resize', this.onResize, false, this);
	
	this._controls = new THREE.OrbitControls(this._camera, this._renderer.domElement);

	goog.fx.anim.registerAnimation(this);
};


feng.apps.PathEdit.prototype.onMouseDown = function(e) {

	this._mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
	this._mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;

  var projector = new THREE.Projector();
  var raycaster = projector.pickingRay( this._mousePosition, this._camera );
  var intersects = raycaster.intersectObjects( this._pathTrack.children );

  if(intersects.length > 0) {

  	var intersect = intersects[0];

  	if(intersect.object instanceof THREE.Mesh) {

  		this._intersect = intersect;
	  	this._selectedControl = this._intersect.object;
	    this._offset.copy( this._intersect.point ).sub( this._selectedControl.position );

	    this._controls.enabled = false;

			goog.events.listen(document, 'mousemove', this.onMouseMove, false, this);
			goog.events.listen(document, 'mouseup', this.onMouseUp, false, this);
  	}
  }
};


feng.apps.PathEdit.prototype.onMouseMove = function(e) {

	this._mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
	this._mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;

  var projector = new THREE.Projector();
  var raycaster = projector.pickingRay( this._mousePosition, this._camera );
  var ray = raycaster.ray;

	if(this._selectedControl) {
	  var targetPos = ray.direction.clone().multiplyScalar( this._intersect.distance ).add( ray.origin );
	  targetPos.sub(this._offset);

	  var moveX, moveY, moveZ;
	  moveX = moveY = moveZ = true;

	  if(moveX) this._selectedControl.position.x = targetPos.x;
	  if(moveY) this._selectedControl.position.y = targetPos.y;
	  if(moveZ) this._selectedControl.position.z = targetPos.z;

	  this._pathTrack.updateTrack();
	}
};


feng.apps.PathEdit.prototype.onMouseUp = function(e) {

	this._intersect = null;
	this._selectedControl = null;

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