goog.provide('feng.views.debug.Camera');

goog.require('feng.views.debug.DebugView');
goog.require('feng.templates.debug');


/**
 * @constructor
 */
feng.views.debug.Camera = function(){

  goog.base(this, feng.templates.debug.CameraDebugView);

  this._fovInput = goog.dom.query('input[name="fov"]', this.domElement)[0];
  this._positionXInput = goog.dom.query('input[name="position-x"]', this.domElement)[0];
  this._positionYInput = goog.dom.query('input[name="position-y"]', this.domElement)[0];
  this._positionZInput = goog.dom.query('input[name="position-z"]', this.domElement)[0];
  this._rotationXInput = goog.dom.query('input[name="rotation-x"]', this.domElement)[0];
  this._rotationYInput = goog.dom.query('input[name="rotation-y"]', this.domElement)[0];
  this._rotationZInput = goog.dom.query('input[name="rotation-z"]', this.domElement)[0];
  this._degreesCheckbox = goog.dom.query('.degrees', this.domElement)[0];
  this._selectDom = goog.dom.query('select', this.domElement)[0];
  this._textarea = goog.dom.query('textarea', this.domElement)[0];
  this._visibleButton = goog.dom.query('.visible.button', this.domElement)[0];
  this._useButton = goog.dom.query('.use.button', this.domElement)[0];

  this._isInputFocused = false;

  this._camera = null;
  this._cameraController = null;

  this._controls = null;
  this._modeController = null;

  this._eventHandler.listen(this._selectDom, feng.events.EventType.CHANGE, this.setSelectedCamera, false, this);
  this._eventHandler.listen(this._visibleButton, 'click', this.onClick, false, this);
  this._eventHandler.listen(this._useButton, 'click', this.onClick, false, this);

  var inputs = goog.dom.query('input[type="number"]', this.domElement);
  goog.array.forEach(inputs, function(input) {
  	this._eventHandler.listen(input, 'focus', this.onFocus, false, this);
  	this._eventHandler.listen(input, 'blur', this.onBlur, false, this);
  	this._eventHandler.listen(input, 'change', this.onInputChange, false, this);
  }, this);

  this._cameraControllerEventHandler = new goog.events.EventHandler(this);

  this.show();
};
goog.inherits(feng.views.debug.Camera, feng.views.debug.DebugView);


feng.views.debug.Camera.prototype.show = function(){

  goog.base(this, 'show');
  goog.fx.anim.registerAnimation(this);
};


feng.views.debug.Camera.prototype.hide = function(){

  goog.base(this, 'hide');
  goog.fx.anim.unregisterAnimation(this);
};


feng.views.debug.Camera.prototype.setSelectedCamera = function(){

	var name = this._selectDom.value;
	this._controls = this._modeController.getModeControl( name );
	this._camera = this._controls.getCamera();

	this.updateVisibleButton();

	return this._camera;
};


feng.views.debug.Camera.prototype.updateVisibleButton = function(){
	
	var cameraHelper = this._cameraController.getCameraHelper( this._camera.name );

	if(cameraHelper.visible) {
		goog.dom.classes.remove(this._visibleButton, 'invisible');
	}else {
		goog.dom.classes.add(this._visibleButton, 'invisible');
	}
};


feng.views.debug.Camera.prototype.onView3DShow = function(e){

  goog.base(this, 'onView3DShow', e);

  var view3d = e.target;
  this._cameraController = view3d.cameraController;
  this._modeController = view3d.modeController;

	var cameras = view3d.cameraController.getCameras();
	goog.object.forEach(cameras, function(camera) {
		this.onAddCamera({
			camera: camera
		});
	}, this);

	this._cameraControllerEventHandler.listen(this._cameraController, feng.events.EventType.ADD, this.onAddCamera, false, this);
	this._cameraControllerEventHandler.listen(this._cameraController, feng.events.EventType.REMOVE, this.onRemoveCamera, false, this);
	this._cameraControllerEventHandler.listen(this._cameraController, feng.events.EventType.CHANGE, this.onChangeCamera, false, this);
};


feng.views.debug.Camera.prototype.onView3DHide = function(e){

  goog.base(this, 'onView3DHide', e);

  var view3d = e.target;
  this._cameraController = view3d.cameraController;

	var cameras = view3d.cameraController.getCameras();
	goog.object.forEach(cameras, function(camera) {
		this.onRemoveCamera({
			camera: camera
		});
	}, this);

  this._cameraControllerEventHandler.removeAll();
};


feng.views.debug.Camera.prototype.onAddCamera = function(e){

	var cameraName = e.camera.name;

	// add the camera option if not existed
	var optionDoms = goog.dom.query('option[value="'+cameraName+'"]', this._selectDom);
	if(optionDoms.length > 0) return;

	var optionDom = goog.dom.createDom('option', {
		'value': cameraName
	}, cameraName);

	this._selectDom.add( optionDom );

	this.setSelectedCamera();
};


feng.views.debug.Camera.prototype.onRemoveCamera = function(e){

	var cameraName = e.camera.name;

	// remove the camera option only if exists
	var optionDoms = goog.dom.query('option[value="'+cameraName+'"]', this._selectDom);
	if(optionDoms.length <= 0) return;

	var optionDom = optionDoms[0];

	this._selectDom.remove( optionDom );
};


feng.views.debug.Camera.prototype.onChangeCamera = function(e){

	this._selectDom.value = e.camera.name;
	this.setSelectedCamera();
};


feng.views.debug.Camera.prototype.onClick = function(e){

	goog.base(this, 'onClick', e);

	switch(e.currentTarget) {
		case this._useButton:
		this._cameraController.setCamera( this._selectDom.value );
		break;

		case this._visibleButton:
		var cameraHelper = this._cameraController.getCameraHelper( this._camera.name );
		cameraHelper.visible = !cameraHelper.visible;

		this.updateVisibleButton();
		break;
	};
};


feng.views.debug.Camera.prototype.onFocus = function(e){

	this._isInputFocused = true;
};


feng.views.debug.Camera.prototype.onBlur = function(e){

	this._isInputFocused = false;
};


feng.views.debug.Camera.prototype.onInputChange = function(e){

	var fov = parseFloat( this._fovInput.value );
	this._controls.setFov( fov );

	var positionX = parseFloat( this._positionXInput.value );
	var positionY = parseFloat( this._positionYInput.value );
	var positionZ = parseFloat( this._positionZInput.value );

	this._controls.setPosition( positionX, positionY, positionZ );

	var inDegrees = this._degreesCheckbox.checked;
	var rotationX, rotationY, rotationZ;

	if(inDegrees) {

		rotationX = THREE.Math.degToRad( parseFloat( this._rotationXInput.value ) );
		rotationY = THREE.Math.degToRad( parseFloat( this._rotationYInput.value ) );
		rotationZ = THREE.Math.degToRad( parseFloat( this._rotationZInput.value ) );

	}else {

		rotationX = parseFloat( this._rotationXInput.value );
		rotationY = parseFloat( this._rotationYInput.value );
		rotationZ = parseFloat( this._rotationZInput.value );
	}

	this._controls.setRotation( rotationX, rotationY, rotationZ );
};


feng.views.debug.Camera.prototype.onAnimationFrame = function(now){

	if(!this._camera || this._isInputFocused) return;

	var position = this._controls.getPosition();
	var rotation = this._controls.getRotation();

	this._fovInput.value = this._camera.fov.toFixed(2);
  this._positionXInput.value = position.x.toFixed(2);
  this._positionYInput.value = position.y.toFixed(2);
  this._positionZInput.value = position.z.toFixed(2);

  var inDegrees = this._degreesCheckbox.checked;
  var rotationX = inDegrees ? goog.math.toDegrees( rotation.x ) : rotation.x;
  var rotationY = inDegrees ? goog.math.toDegrees( rotation.y ) : rotation.y;
  var rotationZ = inDegrees ? goog.math.toDegrees( rotation.z ) : rotation.z;

  this._rotationXInput.value = rotationX.toFixed(2);
  this._rotationYInput.value = rotationY.toFixed(2);
  this._rotationZInput.value = rotationZ.toFixed(2);
};