goog.provide('feng.controllers.controls.DesignControls');

goog.require('goog.fx.Dragger');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.utils.ThreeUtils');
goog.require('feng.views.sections.controls.ZoomSlider');


/**
 * @constructor
 * a combination of trackball controls and transform controls
 */
feng.controllers.controls.DesignControls = function(camera, view3d, domElement){

  goog.base(this, camera, view3d, domElement);

  this._activeObject = null;

  this._focus = new THREE.Vector3();

  this._distance = 900;

  // detect bounding box on floors for camera to move around
  this._boundingBox = new THREE.Box3();

	var floorObjects = goog.array.filter(this._view3d.scene.children, function(obj) {
		if(goog.string.startsWith(obj.name, 'floor') && obj.name.length <= 7) {
			return true;
		}
	})

  goog.array.forEach(floorObjects, function(floorObject) {

  	var floorBox = (new THREE.Box3()).setFromObject( floorObject );
  	this._boundingBox = this._boundingBox.union( floorBox );

  }, this);

  // dragger to drag the view
  this._dragger = new goog.fx.Dragger( this._view3d.domElement );
  this._dragger.setHysteresis( 2 );
  this._dragger.defaultAction = goog.nullFunction;
  this._dragger.setEnabled( false );

  this._dragOrigin = new THREE.Vector3();
  this._dragToPosition = new THREE.Vector3();
  this._dragCamera = new THREE.PerspectiveCamera();

	this._tracker = new THREE.Mesh( new THREE.BoxGeometry( 20, 20, 20 ), new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true, wireframeLinewidth: 2 }) );
	this._tracker.material.fog = false;

	if(feng.debug) {
		this._view3d.scene.add( this._tracker );
	}

  var zoomSliderDom = goog.dom.createDom('div');
  var zoomCallback = goog.bind(this.setFov, this);
  this._zoomSlider = new feng.views.sections.controls.ZoomSlider( zoomSliderDom, this._view3d.domElement, zoomCallback );

  //TODO
  this._dragProps = {
  	'x': 0,
  	'y': 0,
  	startX: 0,
  	startY: 0
  };

  this._startDragRotation = 0;

  this._cameraRotation = new THREE.Euler(0, 0, 0, 'YXZ');
};
goog.inherits(feng.controllers.controls.DesignControls, feng.controllers.controls.Controls);


feng.controllers.controls.DesignControls.prototype.setCamera = function( forward, object ) {

	// set focus to center of scene
	this._focus.copy( this._view3d.scene.position );

	// set position / rotation based on focus
	this.setFocus( this._focus.x, this._focus.z, forward );
	
	this.setFov( this._zoomSlider.calculateFov( .6 ) );

	// calculate start rotation for dragging
	var position = this.getPosition();
	var startDeg = goog.math.angle(position.x, position.z, 0, 0) + 90;
	this._startDragRotation = goog.math.toRadians( startDeg );

	// reset drag props
	this._dragProps['x'] = 0;
	this._dragProps['y'] = 0;
	this._dragProps.startX = 0;
	this._dragProps.startY = 0;

	this._zoomSlider.reset();

	this._activeObject = object;
};


feng.controllers.controls.DesignControls.prototype.setFocus = function( x, z, forward ) {

	this._focus.set( x, 0, z );

	// calculate camera position from inversed forward vector
	var vector = forward.negate().multiplyScalar( this._distance );

/*
	var deg = goog.math.angle(vector.x, vector.z, 0, 0);
	var rad = THREE.Math.degToRad(deg);
	var posX = this._distance * Math.cos( rad ) - this._distance * Math.sin( rad );
	var posZ = this._distance * Math.sin( rad ) + this._distance * Math.cos( rad );

	var cameraX = posX;
	var cameraZ = posZ;
*/
	var cameraX = vector.x;
	var cameraZ = vector.z;

	var cameraY = this._distance;

	// apply position
	this.setPosition( cameraX, cameraY, cameraZ );

	// recalculate rotation
	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(this.getPosition(), this._focus);
	this._cameraRotation.setFromQuaternion( quaternion );

	this.setRotation( this._cameraRotation );

	// update tracker position
	this._tracker.position.copy( this._focus );
};


feng.controllers.controls.DesignControls.prototype.getZoomFraction = function() {

	var fov = this._zoomSlider.getCurrentFov();
	var range = this._zoomSlider.fovRange;
	
	return (fov - range.min) / (range.max - range.min);
};


feng.controllers.controls.DesignControls.prototype.isDragging = function() {

	return this._dragger.isDragging();
};


feng.controllers.controls.DesignControls.prototype.enable = function( enable ) {

	var shouldEnable = goog.base(this, 'enable', enable);

	if(shouldEnable) {

		this._zoomSlider.show(true);

		this.update();

	}else  {

		this._zoomSlider.show(false);
	}

	this._dragger.setEnabled( shouldEnable );
};


feng.controllers.controls.DesignControls.prototype.activate = function () {

	goog.base(this, 'activate');

	this._eventHandler.listen( this._dragger, goog.fx.Dragger.EventType.START, this.onDragStart, false, this);
	this._eventHandler.listen( this._dragger, goog.fx.Dragger.EventType.DRAG, this.onDrag, false, this);
	this._eventHandler.listen( this._dragger, goog.fx.Dragger.EventType.END, this.onDragEnd, false, this);

	this._eventHandler.listen( this._view3d.hud, feng.events.EventType.UPDATE, this.onUpdateHud, false, this);
	this._eventHandler.listen( feng.navigationController, feng.events.EventType.CHANGE, this.onNavigationChange, false, this );
	this._eventHandler.listen( this, feng.events.EventType.CLICK_GATEWAY, this.onClickGateway, false, this );

	this._zoomSlider.activate();
};


feng.controllers.controls.DesignControls.prototype.deactivate = function () {

	goog.base(this, 'deactivate');

	this._zoomSlider.deactivate();
};


feng.controllers.controls.DesignControls.prototype.update = function () {

	goog.base(this, 'update');

	var position = this.getPosition();
	var rotationY = goog.math.angle(position.x, position.z, this._focus.x, this._focus.z) + 90;
	rotationY = goog.math.modulo( goog.math.toRadians(rotationY), 2 * Math.PI );

	//
	this.dispatchEvent({
		type: feng.events.EventType.UPDATE,
		rotationY: rotationY
	});
};


feng.controllers.controls.DesignControls.prototype.applyDragRotation = function( rad ){

	var posX = this._distance * Math.sin( - rad ) + this._focus.x;
	var posZ = this._distance * Math.cos( - rad ) + this._focus.z;
	var posY = this._distance;

	this.setPosition( posX, posY, posZ );

	// look at
	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(this.getPosition(), this._focus);
	this._cameraRotation.setFromQuaternion( quaternion );

	this.setRotation( this._cameraRotation );
};


feng.controllers.controls.DesignControls.prototype.onDragStart = function(e){

	this._dragProps.startX = this._dragProps['x'];

	TweenLite.killTweensOf( this._dragProps );
	ThrowPropsPlugin.untrack( this._dragProps );
	ThrowPropsPlugin.track( this._dragProps, 'x' );
};


feng.controllers.controls.DesignControls.prototype.onDrag = function(e){

	var deltaX = this._dragger.deltaX;
	var deltaY = this._dragger.deltaY;

	this._dragProps['x'] = this._dragProps.startX + deltaX / this._view3d.viewSize.width / 2;

	this.onDragUpdate();
};


feng.controllers.controls.DesignControls.prototype.onDragEnd = function(e){

	ThrowPropsPlugin.to(this._dragProps, {
		'throwProps': {
			'x': 'auto',
			'resistance': 100
		},
		//ease: Quad.easeOut,
		'onUpdate': this.onDragUpdate,
		'onUpdateScope': this
	}, 4, .5);
};


feng.controllers.controls.DesignControls.prototype.onDragUpdate = function(){

	var deg = this._dragProps['x'] * 360;
	var rad = THREE.Math.degToRad( deg );
//todo
console.log(deg + " IN DEG")
	this.applyDragRotation( this._startDragRotation + rad );
};


feng.controllers.controls.DesignControls.prototype.onClickGateway = function(e) {

	// transition camera
	var lookDirection = this._focus.clone().sub( this.getPosition() ).normalize();

	var endPosition = this.getPosition().clone().add( lookDirection.multiplyScalar( 600 ) );

  var prop = {
    t: 0,
    startPosition: this.getPosition().clone(),
    endPosition: endPosition,
    startRotation: this.getRotation(),
    endRotation: this.getRotation(),
    startFov: this.getFov(),
    endFov: this.getFov()
  }

	TweenMax.to( prop, 1, {
	  t: 1,
	  'ease': Expo.easeOut,
	  'onStart': this.onCameraTransitionStart,
	  'onStartScope': this,
	  'onUpdate': this.onCameraTransitionUpdate,
	  'onUpdateParams': [prop],
	  'onUpdateScope': this,
	  'onComplete': this.onCameraTransitionToGatewayComplete,
	  'onCompleteParams': [e.gateway],
	  'onCompleteScope': this
	});
};


feng.controllers.controls.DesignControls.prototype.onNavigationChange = function(e) {

	var navController = e.target;

	var goTipResult = navController.testToken( e.tokenArray, feng.controllers.NavigationController.Token.GO_TIP );

	if(!goTipResult) {

		return;
	}

	// transition camera
	var lookDirection = this._focus.clone().sub( this.getPosition() ).normalize();

	var endPosition = this.getPosition().clone().add( lookDirection.multiplyScalar( 600 ) );

  var prop = {
    t: 0,
    startPosition: this.getPosition().clone(),
    endPosition: endPosition,
    startRotation: this.getRotation(),
    endRotation: this.getRotation(),
    startFov: this.getFov(),
    endFov: this.getFov()
  }

	TweenMax.to( prop, 1, {
	  t: 1,
	  'ease': Expo.easeOut,
	  'onStart': this.onCameraTransitionStart,
	  'onStartScope': this,
	  'onUpdate': this.onCameraTransitionUpdate,
	  'onUpdateParams': [prop],
	  'onUpdateScope': this,
	  'onComplete': this.onCameraTransitionToTipComplete,
	  'onCompleteParams': [goTipResult],
	  'onCompleteScope': this
	});
};


feng.controllers.controls.DesignControls.prototype.onCameraTransitionStart = function(){

	this._view3d.hud.tooltips.deactivate();
	this.deactivate();
};


feng.controllers.controls.DesignControls.prototype.onCameraTransitionUpdate = function(prop){

  var startPosition = prop.startPosition;
  var endPosition = prop.endPosition;
  var startRotation = prop.startRotation;
  var endRotation = prop.endRotation;
  var startFov = prop.startFov;
  var endFov = prop.endFov;
  var t = prop.t;

  this.lerp( startPosition, endPosition, startRotation, endRotation, startFov, endFov, t );

  this._view3d.renderController.globalBrightness = - t;
};


feng.controllers.controls.DesignControls.prototype.onCameraTransitionToGatewayComplete = function( gateway ){

	var gatewayPosition = gateway.getCenter();
	var gatewayOriginPosition = gateway.origin.position;
	var gatewayOriginRotation = gateway.origin.rotation;
	var gatewayDirection = (new THREE.Vector3()).subVectors(gatewayOriginPosition, gatewayPosition).setY(0).normalize();

	var fromPosition = gatewayOriginPosition.clone().add( gatewayDirection.clone().multiplyScalar(50) ).setY( feng.controllers.controls.Controls.Default.STANCE_HEIGHT );
	
	var fromRotation = new THREE.Euler(0, 0, 0, 'YXZ');
  var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(fromPosition, gatewayPosition);
  fromRotation.setFromQuaternion( quaternion );

  var fromFov = feng.controllers.controls.Controls.Default.FOV;

  this.dispatchEvent({
  	type: feng.events.EventType.CHANGE,
    mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
    nextMode: feng.controllers.view3d.ModeController.Mode.EXIT,
    fromPosition: fromPosition,
		fromRotation: fromRotation,
		fromFov: fromFov,
    gateway: gateway
  });
};


feng.controllers.controls.DesignControls.prototype.onCameraTransitionToTipComplete = function( goTipResult ){

	var achievements = feng.models.achievements.Achievements.getInstance();
	var tip = achievements.getTip( goTipResult['tipId'], goTipResult['viewId'], goTipResult['sectionId'] );

	var object = this._view3d.getObjectByTip( tip );

	// calculate camera position/rotation/fov before transition
	var browseControls = this._view3d.modeController.getModeControl(feng.controllers.view3d.ModeController.Mode.BROWSE);
	var direction = new THREE.Vector3().subVectors( browseControls.getPosition(), object.getCenter() ).normalize();
	var fromPosition = object.getCenter().clone().add( direction.multiplyScalar(100) );
	
	var matrixData = feng.pathfinder.getMatrixData( this._view3d.getMatrixId() );
	fromPosition = feng.pathfinder.getClosestWalkablePosition( fromPosition, matrixData ).setY( feng.controllers.controls.Controls.Default.STANCE_HEIGHT );

	var fromRotation = new THREE.Euler(0, 0, 0, 'YXZ');
  var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(fromPosition, object.getCenter());
  fromRotation.setFromQuaternion( quaternion );

  var fromFov = feng.controllers.controls.Controls.Default.FOV;

  browseControls.setPosition( fromPosition );
  browseControls.setRotation( fromRotation );

	//
	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
		nextMode: feng.controllers.view3d.ModeController.Mode.CLOSE_UP,
		fromPosition: fromPosition,
		fromRotation: fromRotation,
		fromFov: fromFov,
		object: object
	});
};