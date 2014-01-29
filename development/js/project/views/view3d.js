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

	this._light = null;
	this._shadableGroup = null;
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
	loader.load( fengshui.Config['basePath'] + "json/scene-grouped.json", goog.bind(this.onLoad, this) );

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
  // find groups
  var groups = [];
  var g = mesh;
  while( g ) {
  	g = (!g.parent || g.parent instanceof THREE.Scene) ? null : g.parent;
  	if(g) {
  		groups.push(g);
  	}
  }

  // detect shadable on its group
  var shadable = (mesh.userData['shadable'] !== false || mesh.userData['shadable'] === true);

  if(groups.length > 0) {
		var globalGroup = groups[groups.length - 1];
	  shadable = (globalGroup.userData['shadable'] !== false || globalGroup.userData['shadable'] === true);
  }

  // parse class names by group
  var classes = [mesh.name];

  goog.array.forEach(groups, function(group) {
  	classes.push( group.name );
  });

  classes.reverse();

  if(shadable) classes.push('shadable');

  // create dom
  var dom = goog.dom.createDom('div', classes.join(' '));

  goog.style.setStyle(dom, {
  	'width': mesh.geometry.width + 'px',
  	'height': mesh.geometry.height + 'px',
  	'background-color': '#' + mesh.material.color.getHexString()
  });

  var object = new THREE.CSS3DObject( dom );
  object.position = mesh.position;
  object.rotation = mesh.rotation;

  this._scene.add( object );

  if(groups.length > 0) {
    groups[0].add( object );
  }

  return object;
};


fengshui.views.View3D.prototype.createCSS3DSprite = function( sprite ) {
  var spriteName = sprite.name;

  var dom = goog.dom.createDom('div', 'sprite');
  goog.dom.classes.add(dom, spriteName);

  dom.setAttribute('data-name', spriteName);

  goog.style.setStyle(dom, {
  	'background-color': '#' + sprite.material.color.getHexString()
  });

  var object = new THREE.CSS3DSprite( dom );
  object.position = sprite.position;

  this._scene.add( object );

  this._eventHandler.listen(dom, 'click', this.onClickSprite, false, this);

  return object;
};


fengshui.views.View3D.prototype.createObject3D = function( object3d ) {
  var object = object3d;

  return object;
};


fengshui.views.View3D.prototype.create3DElementGroup = function( object ) {
	var group = object;

	// create child's group if there is
	var children = group['children'];

	goog.array.forEach(children, function(child) {
		if(child.children.length > 0) {
			this.create3DElementGroup( child );
		}else {
			this.create3DElement( child );
		}
	}, this);

	return group;
};


fengshui.views.View3D.prototype.create3DElement = function( child ) {
	var object;

	if(child instanceof THREE.Mesh) {
    object = this.createCSS3DObject( child );
  }
  else if(child instanceof THREE.Sprite) {
    object = this.createCSS3DSprite( child );
  }
  else if(child instanceof THREE.Object3D) {
    object = this.createObject3D( child );
  }

  return object;
};


fengshui.views.View3D.prototype.render = function() {
	this._renderer.render(this._scene, this._camera);
};


fengshui.views.View3D.prototype.onLoad = function(result) {
	
	this._scene = result;

	var children = this._scene.children;

	goog.array.forEach(children, function(child) {

		if(child.children.length > 0) {
			// if has children, create group
			this.create3DElementGroup( child );
		}
		else {
			// if not, create child individually
			this.create3DElement( child );
		}

	}, this);

	this.render();


	var shadableDoms = goog.dom.query('.shadable', this._renderer.domElement);
	this._shadableGroup = new Photon.FaceGroup( this._renderer.domElement, shadableDoms, .5, .5, true );

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

  this._shadableGroup.render(this._light, true, true);

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