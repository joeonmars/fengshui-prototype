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
  this._controlProps = {
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

	//
	var position = this.getPosition();
	//atan(opposite/adjacent) = angle
	//this._startDragRotation = Math.atan( position.x / position.z ) - Math.PI/2;

	//console.log(position.x, position.z);

	//var shouldDeg = goog.math.angle(position.x, position.y, 0, 0);
	//var shouldRad = THREE.Math.degToRad( shouldDeg ); 

	var shouldRad = Math.atan( position.x/position.z );
	var shouldDeg = THREE.Math.radToDeg( shouldRad );

	var posX = this._distance * Math.sin( - shouldRad ) + this._focus.x;
	var posZ = this._distance * Math.cos( - shouldRad ) + this._focus.z;

	console.log( position.x, position.z, posX, posZ, shouldDeg );
	//


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

	this._eventHandler.listen( this._view3d.hud, feng.events.EventType.UPDATE, this.onUpdateHud, false, this);

	this._eventHandler.listen( this._dragger, goog.fx.Dragger.EventType.START, this.onDragStart, false, this);
	this._eventHandler.listen( this._dragger, goog.fx.Dragger.EventType.DRAG, this.onDrag, false, this);
	this._eventHandler.listen( this._dragger, goog.fx.Dragger.EventType.END, this.onDragEnd, false, this);

	this._eventHandler.listen( feng.navigationController, feng.events.EventType.CHANGE, this.onNavigationChange, false, this );

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

	//var posX = this._distance * Math.cos( rad ) - this._distance * Math.sin( rad );
	//var posZ = this._distance * Math.sin( rad ) + this._distance * Math.cos( rad );

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

	this._controlProps.startX = this._controlProps['x'];

	TweenLite.killTweensOf( this._controlProps );
	ThrowPropsPlugin.untrack( this._controlProps );
	ThrowPropsPlugin.track( this._controlProps, 'x' );

	/*
	// set origin focus position
	this._dragOrigin.copy( this._focus );
	this._dragToPosition.copy( this._focus );

	// relocate drag camera
	this._dragCamera.position.copy( this.getPosition() );
	this._dragCamera.fov = this.getFov();
	this._dragCamera.aspect = this._camera.aspect;
	this._dragCamera.updateProjectionMatrix();
	this._dragCamera.lookAt( this._focus );
	*/
};


feng.controllers.controls.DesignControls.prototype.onDrag = function(e){

	var deltaX = this._dragger.deltaX;
	var deltaY = this._dragger.deltaY;

	this._controlProps['x'] = this._controlProps.startX + deltaX / this._view3d.viewSize.width / 2;

	this.onDragUpdate();

	/*
	var fov = this.getFov();
	var minFov = this._zoomSlider.fovRange.min;
	var maxFov = this._zoomSlider.fovRange.max;
	var fovFraction = (fov - minFov) / (maxFov - minFov);
	var deltaFactor = goog.math.lerp( 6, 4, fovFraction );

	var cameraDeltaX = deltaX / deltaFactor;
	var cameraDeltaY = deltaY / deltaFactor;

	// drag object by camera direction
	var forward = new THREE.Vector3( 0, 0, -1 );
	forward.applyQuaternion( this._dragCamera.quaternion ).setY(0).normalize();
	
	var right = new THREE.Vector3( 1, 0, 0 );
	right.applyQuaternion( this._dragCamera.quaternion ).setY(0).normalize();

	this._dragToPosition.addVectors( forward.multiplyScalar(cameraDeltaY), right.multiplyScalar(-cameraDeltaX) );
	this._dragToPosition.add( this._dragOrigin );

	this._dragToPosition.x = goog.math.clamp( this._dragToPosition.x, this._boundingBox.min.x, this._boundingBox.max.x );
	this._dragToPosition.z = goog.math.clamp( this._dragToPosition.z, this._boundingBox.min.z, this._boundingBox.max.z );

	this._focus.copy( this._dragToPosition );

	this._tracker.position.copy( this._focus );

	// look at
	var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(this.getPosition(), this._focus);
	rotation.setFromQuaternion( quaternion );

	this.setRotation( rotation );
	*/
};


feng.controllers.controls.DesignControls.prototype.onDragEnd = function(e){

	ThrowPropsPlugin.to(this._controlProps, {
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

	var deg = this._controlProps['x'] * 360;
	var rad = THREE.Math.degToRad( deg );

	//this.applyDragRotation( this._startDragRotation );

	this.applyDragRotation( this._startDragRotation + rad );
};


feng.controllers.controls.DesignControls.prototype.onNavigationChange = function(e) {

	var navController = e.target;

	var goTipResult = navController.testToken( e.tokenArray, feng.controllers.NavigationController.Token.GO_TIP );

	if(goTipResult) {

		var achievements = feng.models.achievements.Achievements.getInstance();
		var tip = achievements.getTip( goTipResult['tipId'], goTipResult['viewId'], goTipResult['sectionId'] );

		var object = this._view3d.getObjectByTip( tip );

		this.dispatchEvent({
			type: feng.events.EventType.CHANGE,
			mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
			nextMode: feng.controllers.view3d.ModeController.Mode.CLOSE_UP,
			object: object
		});
	}
};