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

	this._groups = [];

	this._light = null;
	this._lightFaces = [];
};
goog.inherits(fengshui.views.View3D, goog.events.EventTarget);


fengshui.views.View3D.prototype.init = function(){

	this._renderer = new THREE.CSS3DRenderer();
	this._renderer.setSize( window.innerWidth, window.innerHeight );

	goog.dom.appendChild( this.domElement, this._renderer.domElement );

	this._camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	this._camera.position.x = 0;
	this._camera.position.y = 100;
	this._camera.position.z = 350;

	this._light = new Photon.Light(x = 45, y = -180, z = 100);

	//
	var loader = new THREE.ObjectLoader();
	loader.load( fengshui.Config['basePath'] + "json/scene-css.json", goog.bind(this.onLoad, this) );

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


fengshui.views.View3D.prototype.createCSS3DObject = function ( mesh ) {
  var groupName = mesh.userData['group'];

  var shadable = mesh.userData['shadable'];

  var classes = (groupName ? groupName + ' ' : '') + mesh.name;
  if(shadable !== false) {
  	classes += ' shadable';
  }

  var dom = goog.dom.createDom('div', classes);

  goog.style.setStyle(dom, {
  	'width': mesh.geometry.width + 'px',
  	'height': mesh.geometry.height + 'px',
  	'background-color': '#'+mesh.material.color.getHexString()
  });

  var object = new THREE.CSS3DObject( dom );
  object.position = mesh.position;
  object.rotation = mesh.rotation;

  this._scene.add( object );

  if(groupName) {
    var group = this.addToGroup(object, groupName);
    group.position.y += 2;
    this._scene.add( group );
  }

  return object;
};


fengshui.views.View3D.prototype.createCSS3DSprite = function( sprite ) {
  var spriteName = sprite.name;

  var classes = 'sprite ' + (spriteName || '');
  var dom = goog.dom.createDom('div', classes);

  dom.setAttribute('data-name', spriteName);

  goog.style.setStyle(dom, {
  	'background-color': '#'+sprite.material.color.getHexString()
  });

  var object = new THREE.CSS3DSprite( dom );
  object.position = sprite.position;

  this._scene.add( object );

  this._eventHandler.listen(dom, 'click', this.onClickSprite, false, this);

  return object;
}

fengshui.views.View3D.prototype.addToGroup = function(css3dObject, groupName) {
  var group = this._scene.getObjectByName(groupName);

  if(!group) {
    group = new THREE.Object3D();
    group.name = groupName;

    this._groups.push(group);
  }

  group.add(css3dObject);

  return group;
};


fengshui.views.View3D.prototype.render = function() {
	this._renderer.render(this._scene, this._camera);
};


fengshui.views.View3D.prototype.onLoad = function(result) {
	
	this._scene = result;


	var children = this._scene.children.concat();

	goog.array.forEach(children, function(child) {

		if(child instanceof THREE.Mesh) {
	    this.createCSS3DObject( child );
	  }else if(child instanceof THREE.Sprite) {
	    this.createCSS3DSprite( child );
	  }

	}, this);

	this.render();


	var shadableDoms = goog.dom.query('.shadable', this.domElement);

	goog.array.forEach(shadableDoms, function(dom) {

	  var face = new Photon.Face( dom, .5, .5, true );
	  this._lightFaces.push( face );

	}, this);

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

  goog.array.forEach(this._groups, function(group) {
  	group.rotation.y = time * 0.7;
  }, this);

  goog.array.forEach(this._lightFaces, function(face) {
  	face.render(this._light, true);
  }, this);

  this._controls.update();
  
  this.render();

  fengshui.stats.update();
};


fengshui.views.View3D.prototype.onResize = function(e){

	this._camera.aspect = window.innerWidth / window.innerHeight;
	this._camera.updateProjectionMatrix();

	this._renderer.setSize( window.innerWidth, window.innerHeight );

	this._controls.handleResize();

	this._render();
};