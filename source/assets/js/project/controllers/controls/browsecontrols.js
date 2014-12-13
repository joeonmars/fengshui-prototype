goog.provide('feng.controllers.controls.BrowseControls');

goog.require('goog.events');
goog.require('goog.events.MouseWheelHandler');
goog.require('goog.math.Box');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.utils.ThreeUtils');

/**
 * @constructor
 * a mod of PointerLockControls...
 */
feng.controllers.controls.BrowseControls = function(camera, view3d, domElement){

  goog.base(this, camera, view3d, domElement);

	this._shouldIgnoreClick = false;

	this._objectSelectorCallbacks = {
		'onStart': goog.bind(this.onObjectSelectStart, this),
		'onCancel': goog.bind(this.onObjectSelectCancel, this),
		'onComplete': goog.bind(this.onObjectSelectComplete, this)
	};

	this._objectSelector = this._view3d.hud.objectSelector;
	this._progressBar = this._view3d.hud.progressBar;

	this._detectorDistance = 300/2;
	
	this._detectorSphere = new THREE.Sphere();

	this._detectorRay = new THREE.Raycaster();
	this._detectorRay.far = this._detectorDistance;

	this._maxMouseWheelDeltaY = 50;
	this._mouseWheelHandler = new goog.events.MouseWheelHandler( domElement );
	this._mouseWheelHandler.setMaxDeltaY( this._maxMouseWheelDeltaY );

	this._lastMouseX = 0;
	this._lastMouseY = 0;
	this._targetRotationX = 0;
	this._targetRotationY = 0;

	this._maxRotationX = THREE.Math.degToRad(40);
	this._minRotationX = THREE.Math.degToRad(-60);
};
goog.inherits(feng.controllers.controls.BrowseControls, feng.controllers.controls.Controls);


feng.controllers.controls.BrowseControls.prototype.setCamera = function( toRotation ) {

	this.setRotation( toRotation );
};


feng.controllers.controls.BrowseControls.prototype.enable = function( enable, mouseEventToTrigger ) {

	var shouldEnable = goog.base(this, 'enable', enable);

	if(shouldEnable) {

		if(mouseEventToTrigger) {
			this.onInputDown( mouseEventToTrigger );
		}

		this._targetRotationY = this._yawObject.rotation.y;
		this._targetRotationX = this._pitchObject.rotation.x;

		// update sphere to limit the reach of tip objects
		var cameraPosition = this.getPosition();
		this._detectorSphere.set( cameraPosition, this._detectorDistance );

		// update selectable objects only locked within sphere
		var selectableObjects = [];

		var solidObjects = this._view3d.getSolidObjects();
		var object3ds = goog.array.map(solidObjects, function(object) {
			return object.object3d;
		});

		goog.object.forEach(this._view3d.tipObjects, function(tipObject) {

			var locked = !tipObject.tip.unlocked;
			
			var isUnlockedRequiredTip = (tipObject.tip.getProvidedTip() && !locked);
			if(isUnlockedRequiredTip) return;

			var withinRange = this._detectorSphere.intersectsSphere( tipObject.getBoundingSphere() );

			var inArms = this._view3d.arms.hasObject( tipObject );

			//console.log(tipObject.name + ' withinRange: ' + withinRange + ', locked: ' + locked);

			if(locked && withinRange && !inArms) {
				selectableObjects.push( tipObject );
			}
		}, this);

		//
		var nearbyObjects = selectableObjects.concat();
		
		this._objectSelector.setSelectableObjects( selectableObjects );
		this._progressBar.setNearbyObjects( nearbyObjects );
	}
};


feng.controllers.controls.BrowseControls.prototype.activate = function () {

	goog.base(this, 'activate');

	this._eventHandler.listen( this._view3d.hud, feng.events.EventType.UPDATE, this.onUpdateHud, false, this );
	this._eventHandler.listen( this._view3d.hud.compass, feng.events.EventType.CLICK_COMPASS, this.onClickCompass, false, this );
	this._eventHandler.listen( this._view3d.hud.tooltips, feng.events.EventType.CLICK_GATEWAY, this.onClickGateway, false, this );
	
	this._eventHandler.listen( this._mouseWheelHandler, goog.events.MouseWheelHandler.EventType.MOUSEWHEEL, this.onMouseWheel, false, this );
	this._eventHandler.listen( feng.navigationController, feng.events.EventType.CHANGE, this.onNavigationChange, false, this );

	this._objectSelector.activate( this._objectSelectorCallbacks );
};


feng.controllers.controls.BrowseControls.prototype.deactivate = function () {

	goog.base(this, 'deactivate');

	this._objectSelector.deactivate();
};


feng.controllers.controls.BrowseControls.prototype.getClickableObjects = function () {

	var clickableObjects = [];

	goog.object.forEach(this._view3d.view3dObjects, function(object) {

		clickableObjects.push( object.object3d );
	});

	return clickableObjects;
};


feng.controllers.controls.BrowseControls.prototype.update = function () {

	goog.base(this, 'update');

	var PI_2 = Math.PI / 2;

	this._yawObject.rotation.y += (this._targetRotationY - this._yawObject.rotation.y) * .1;
	this._pitchObject.rotation.x += (this._targetRotationX - this._pitchObject.rotation.x) * .1;
	this._pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, this._pitchObject.rotation.x ) );

	var fov = this.getFov();
	var defaultFov = feng.controllers.controls.Controls.Default.FOV;

	if(fov !== defaultFov) {

		fov += (defaultFov - fov) * .05;
		this.setFov( fov );

		if(goog.math.nearlyEquals(fov, defaultFov, .1)) {
			this.setFov( defaultFov );
		}
	}
	
	//
	this.dispatchEvent({
		type: feng.events.EventType.UPDATE,
		rotationY: this.getYaw()
	});
};


feng.controllers.controls.BrowseControls.prototype.onClick = function ( e ) {
	
	goog.base(this, 'onClick', e);

	if ( this._shouldIgnoreClick ) return;

	var clickableObjects = this.getClickableObjects();

	goog.array.remove( clickableObjects, this._view3d.designPlane.object3d );
	goog.array.remove( clickableObjects, this._view3d.skybox.object3d );

	var intersects = feng.utils.ThreeUtils.getObjectsBy2DPosition( e.clientX, e.clientY, clickableObjects, this._camera, this._view3d.getViewSize() );

	if ( intersects.length > 0 ) {

		// walk to the object
		var toPosition = intersects[0].point;

		this.dispatchEvent({
			type: feng.events.EventType.CHANGE,
			mode: feng.controllers.view3d.ModeController.Mode.WALK,
			nextMode: feng.controllers.view3d.ModeController.Mode.BROWSE,
			toPosition: toPosition
		});

		feng.pubsub.publish( feng.PubSub.Topic.TRIGGER_WALK, 'click' );

		// play click effect
		var normal = intersects[0].face.normal;
		this._view3d.fx.clickEffect.play( toPosition, normal );
	}
};


feng.controllers.controls.BrowseControls.prototype.onInputDown = function ( e ) {

	goog.base(this, 'onInputDown', e);

	this._shouldIgnoreClick = false;

	this._lastMouseX = e.clientX;
	this._lastMouseY = e.clientY;
};


feng.controllers.controls.BrowseControls.prototype.onInputMove = function ( e ) {

	goog.base(this, 'onInputMove', e);

	this._shouldIgnoreClick = true;

	var movementX = e.clientX - this._lastMouseX;
	var movementY = e.clientY - this._lastMouseY;

	this._lastMouseX = e.clientX;
	this._lastMouseY = e.clientY;

	this._targetRotationY = this._yawObject.rotation.y + movementX * 0.009;
	this._targetRotationX = this._pitchObject.rotation.x + movementY * 0.009;

	// limit vertical rotation
	this._targetRotationX = Math.max(Math.min(this._maxRotationX, this._targetRotationX), this._minRotationX);
};


feng.controllers.controls.BrowseControls.prototype.onMouseWheel = function ( e ) {

	e.preventDefault();

	var distance = goog.math.lerp( 100, 400, Math.abs(e.deltaY) / this._maxMouseWheelDeltaY );
	distance *= - e.deltaY / Math.abs(e.deltaY);

	var forward = this.getForwardVector();
	var toPosition = (new THREE.Vector3()).addVectors( this.getPosition(), forward.multiplyScalar( distance ) );
	toPosition.y = this.getPosition().y;

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.controllers.view3d.ModeController.Mode.WALK,
		nextMode: feng.controllers.view3d.ModeController.Mode.BROWSE,
		toPosition: toPosition,
		mousewheel: true
	});

	feng.pubsub.publish( feng.PubSub.Topic.TRIGGER_WALK, 'mousewheel' );
};


feng.controllers.controls.BrowseControls.prototype.onObjectSelectCancel = function () {

	this._view3d.fx.selectEffect.animateOut();
};


feng.controllers.controls.BrowseControls.prototype.onObjectSelectStart = function ( object ) {

	this._view3d.fx.selectEffect.animateIn( object );
};


feng.controllers.controls.BrowseControls.prototype.onObjectSelectComplete = function ( object ) {

	console.log('Object selected: ' + object.object3d.name);

	//
	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
		nextMode: feng.controllers.view3d.ModeController.Mode.CLOSE_UP,
		object: object
	});	
};


feng.controllers.controls.BrowseControls.prototype.onUpdateHud = function(e){

	if(e.target instanceof feng.views.sections.controls.Compass) {
		this.setYaw( e.rotation );
		this._targetRotationY = e.rotation;
	}
};


feng.controllers.controls.BrowseControls.prototype.onClickCompass = function(e) {

	if(e.mode === 'design') {

  	this.dispatchEvent({
  		type: feng.events.EventType.CHANGE,
			mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
			nextMode: feng.controllers.view3d.ModeController.Mode.DESIGN
		});
	}
};


feng.controllers.controls.BrowseControls.prototype.onClickGateway = function(e) {

  this.dispatchEvent({
  	type: feng.events.EventType.CHANGE,
    mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
    nextMode: feng.controllers.view3d.ModeController.Mode.EXIT,
    gateway: e.gateway
  });
};


feng.controllers.controls.BrowseControls.prototype.onNavigationChange = function(e) {

	var navController = e.target;

	var goTipResult = navController.testToken( e.tokenArray, feng.controllers.NavigationController.Token.GO_TIP );
	
	if(goTipResult) {

		var object = this._view3d.getView3dObjectById( goTipResult['objectId'] );
		var tip = object.tip;

		this.dispatchEvent({
			type: feng.events.EventType.CHANGE,
			mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
			nextMode: feng.controllers.view3d.ModeController.Mode.CLOSE_UP,
			object: object
		});
	}
};