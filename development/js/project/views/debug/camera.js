goog.provide('fengshui.views.debug.Camera');

goog.require('fengshui.views.debug.DebugView');
goog.require('fengshui.templates.debug');


/**
 * @constructor
 */
fengshui.views.debug.Camera = function(){

  goog.base(this, fengshui.templates.debug.CameraDebugView);

  this._fovDom = goog.dom.query('li[data-prop="fov"]', this.domElement)[0];
  this._positionXDom = goog.dom.query('li[data-prop="position-x"]', this.domElement)[0];
  this._positionYDom = goog.dom.query('li[data-prop="position-y"]', this.domElement)[0];
  this._positionZDom = goog.dom.query('li[data-prop="position-z"]', this.domElement)[0];
  this._rotationXDom = goog.dom.query('li[data-prop="rotation-x"]', this.domElement)[0];
  this._rotationYDom = goog.dom.query('li[data-prop="rotation-y"]', this.domElement)[0];
  this._rotationZDom = goog.dom.query('li[data-prop="rotation-z"]', this.domElement)[0];
  this._targetXDom = goog.dom.query('li[data-prop="target-x"]', this.domElement)[0];
  this._targetYDom = goog.dom.query('li[data-prop="target-y"]', this.domElement)[0];
  this._targetZDom = goog.dom.query('li[data-prop="target-z"]', this.domElement)[0];
  this._selectDom = goog.dom.query('select', this.domElement)[0];
  this._textarea = goog.dom.query('textarea', this.domElement)[0];
  this._useButton = goog.dom.query('.use.button', this.domElement)[0];
  this._inputButton = goog.dom.query('.input.button', this.domElement)[0];
  this._outputButton = goog.dom.query('.output.button', this.domElement)[0];

  this._camera = null;
  this._cameraController = null;

  this._eventHandler.listen(this._selectDom, fengshui.events.EventType.CHANGE, this.setSelectedCamera, false, this);
  this._eventHandler.listen(this._useButton, 'click', this.onClick, false, this);
  this._eventHandler.listen(this._inputButton, 'click', this.inputCameraAttributes, false, this);
  this._eventHandler.listen(this._outputButton, 'click', this.outputCameraAttributes, false, this);

  this._cameraControllerEventHandler = new goog.events.EventHandler(this);

  this.show();
};
goog.inherits(fengshui.views.debug.Camera, fengshui.views.debug.DebugView);


fengshui.views.debug.Camera.prototype.show = function(){

  goog.base(this, 'show');
  goog.fx.anim.registerAnimation(this);
};


fengshui.views.debug.Camera.prototype.hide = function(){

  goog.base(this, 'hide');
  goog.fx.anim.unregisterAnimation(this);
};


fengshui.views.debug.Camera.prototype.setSelectedCamera = function(){

	var name = this._selectDom.value;
	this._camera = this._cameraController.getCamera(name);

	return this._camera;
};


fengshui.views.debug.Camera.prototype.inputCameraAttributes = function(){

	if(!this._camera) return;

	var string = this._textarea.value;
	var object = JSON.parse(string);

	var fov = object['fov'];
	var position = object['position'];
	var rotation = object['rotation'];
	var target = object['target'];

	this._camera.fov = fov;

	this._camera.position.x = position['x'];
	this._camera.position.y = position['y'];
	this._camera.position.z = position['z'];

	this._camera.rotation.x = rotation['x'];
	this._camera.rotation.y = rotation['y'];
	this._camera.rotation.z = rotation['z'];

	if(target) {
		this._camera.target = new THREE.Vector3(target['x'], target['y'], target['z']);
		this._camera.lookAt( this._camera.target );
	}

	this._camera.updateProjectionMatrix();
};


fengshui.views.debug.Camera.prototype.outputCameraAttributes = function(){

	if(!this._camera) return;

	var fov = this._camera.fov;
	var position = this._camera.position;
	var rotation = this._camera.rotation;
	var target = this._camera.target;
	var output = {};

	output['fov'] = fov;
	output['position'] = {
		'x': position.x,
		'y': position.y,
		'z': position.z
	};
	output['rotation'] = {
		'x': rotation.x,
		'y': rotation.y,
		'z': rotation.z
	};

	if(target) {
		output['target'] = {
			'x': target.x,
			'y': target.y,
			'z': target.z
		};
	}

	this._textarea.value = JSON.stringify(output, null, '\t');
};


fengshui.views.debug.Camera.prototype.onView3DShow = function(e){

  goog.base(this, 'onView3DShow', e);

  var view3d = e.target;
  this._cameraController = view3d.cameraController;
 	
 	this._cameraControllerEventHandler.listen(this._cameraController, fengshui.events.EventType.ADD, this.onAddCamera, false, this);
 	this._cameraControllerEventHandler.listen(this._cameraController, fengshui.events.EventType.REMOVE, this.onRemoveCamera, false, this);
};


fengshui.views.debug.Camera.prototype.onView3DHide = function(e){

  goog.base(this, 'onView3DHide', e);

  this._cameraControllerEventHandler.removeAll();
};


fengshui.views.debug.Camera.prototype.onAddCamera = function(e){

	var optionDom = goog.dom.createDom('option', {
		'value': e.name
	}, e.name);

	this._selectDom.add( optionDom );

	this.setSelectedCamera();
};


fengshui.views.debug.Camera.prototype.onRemoveCamera = function(e){

	var optionDom = goog.dom.query('option[value="'+e.name+'"]', this._selectDom)[0];
	this._selectDom.remove( optionDom );
};


fengshui.views.debug.Camera.prototype.onClick = function(e){

	goog.base(this, 'onClick', e);

	switch(e.currentTarget) {
		case this._useButton:
		this._cameraController.setCamera( this._selectDom.value );
		break;
	};
};


fengshui.views.debug.Camera.prototype.onAnimationFrame = function(now){

	if(!this._camera) {

		this._fovDom.innerHTML = '';
	  this._positionXDom.innerHTML = '';
	  this._positionYDom.innerHTML = '';
	  this._positionZDom.innerHTML = '';
	  this._rotationXDom.innerHTML = '';
	  this._rotationYDom.innerHTML = '';
	  this._rotationZDom.innerHTML = '';
	  this._targetXDom.innerHTML = '';
	  this._targetYDom.innerHTML = '';
	  this._targetZDom.innerHTML = '';

	}else {

		this._fovDom.innerHTML = this._camera.fov;
	  this._positionXDom.innerHTML = this._camera.position.x;
	  this._positionYDom.innerHTML = this._camera.position.y;
	  this._positionZDom.innerHTML = this._camera.position.z;
	  this._rotationXDom.innerHTML = this._camera.rotation.x;
	  this._rotationYDom.innerHTML = this._camera.rotation.y;
	  this._rotationZDom.innerHTML = this._camera.rotation.z;
	  this._targetXDom.innerHTML = this._camera.target ? this._camera.target.x : '';
	  this._targetYDom.innerHTML = this._camera.target ? this._camera.target.y : '';
	  this._targetZDom.innerHTML = this._camera.target ? this._camera.target.z : '';

	}
};