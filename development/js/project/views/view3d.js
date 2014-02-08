goog.provide('fengshui.views.View3D');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');


/**
 * @constructor
 */
fengshui.views.View3D = function(domElement){
  goog.base(this);

  this.domElement = domElement;

  this._eventHandler = new goog.events.EventHandler(this);

	this._camera = null;
	this._scene = null;
	this._renderer = null;

	this._controls = null;
};
goog.inherits(fengshui.views.View3D, goog.events.EventTarget);


fengshui.views.View3D.prototype.init = function(){

	this._renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	this._renderer.setClearColor(0xffffff, 1);
	this._renderer.setSize( window.innerWidth, window.innerHeight );

	goog.dom.appendChild( this.domElement, this._renderer.domElement );

	this._camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	this._camera.position.x = 0;
	this._camera.position.y = 100;
	this._camera.position.z = 350;

	//
	var loader = new THREE.ObjectLoader();
	loader.load( fengshui.Config['basePath'] + "json/scene-bed-bake.json", goog.bind(this.onLoad, this) );
	//loader.load( fengshui.Config['basePath'] + "json/scene-with-benzai.json", goog.bind(this.onLoad, this) );

	this._controls = new THREE.TrackballControls( this._camera );
	this._controls.rotateSpeed = 1.0;
	this._controls.zoomSpeed = 1.2;
	this._controls.panSpeed = 0.8;

	this._controls.noZoom = false;
	this._controls.noPan = false;
	this._controls.minDistance = 320;
	this._controls.maxDistance = 1200;

	this._controls.staticMoving = true;
	this._controls.dynamicDampingFactor = 0.3;

	this._controls.keys = [ 65, 83, 68 ];

	this._eventHandler.listen(this._controls, 'change', this.render, false, this);
	this._eventHandler.listen(window, 'resize', this.onResize, false, this);
};


fengshui.views.View3D.prototype.render = function() {
	this._renderer.render(this._scene, this._camera);
};


fengshui.views.View3D.prototype.onLoad = function(result) {
	
	this._scene = result;
	console.log(result);

	var bed = this._scene.getObjectByName('bed');
	var material = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('model/bed_bake.png'),
    transparent: true,
    side: THREE.DoubleSide
    //depthWrite: false
  });
  material.alphaTest = 0.5;
  bed.material = material;console.log(bed.material)

	this.render();

	//
	goog.fx.anim.registerAnimation(this);
};


fengshui.views.View3D.prototype.onClickSprite = function(e){
	var spriteName = e.currentTarget.getAttribute('data-name');              
	var sprite = this._scene.getObjectByName(spriteName);

	//console.log(this._camera);
};


fengshui.views.View3D.prototype.onAnimationFrame = function(now){

  var time = now * 0.0004;

  var bed = this._scene.getObjectByName('bed');
  bed.rotation.y = time * 0.7;

  this._controls.update();
  
  fengshui.stats.update();

  this.render();
};


fengshui.views.View3D.prototype.onResize = function(e){

	this._camera.aspect = window.innerWidth / window.innerHeight;
	this._camera.updateProjectionMatrix();

	this._renderer.setSize( window.innerWidth, window.innerHeight );

	this._controls.handleResize();

	this.render();
};