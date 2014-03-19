goog.provide('feng.controllers.controls.ManipulateControls');

goog.require('goog.fx.anim.Animated');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.utils.ThreeUtils');
goog.require('feng.views.sections.controls.Manipulator');
goog.require('feng.controllers.controls.ManipulatePhysics');


/**
 * @constructor
 * a combination of trackball controls and transform controls
 * WIP
 */
feng.controllers.controls.ManipulateControls = function(camera, view3d, domElement, uiElement){

  goog.base(this, camera, view3d, domElement);

  this._activeObject = null;
  this._eventMediator = this._view3d.eventMediator;

  this._plane = new THREE.Plane( new THREE.Vector3(0,1,0) );

  this._rotateTweener = null;

  var groundBox = this._view3d.getView3dObject( 'ground' ).getBox();
  var width = groundBox.right - groundBox.left;
  var height = groundBox.bottom - groundBox.top;
  this.physics = new feng.controllers.controls.ManipulatePhysics( width, height );

  var manipulatorDom = goog.dom.getElementByClass('manipulator', uiElement);
  this._manipulator = new feng.views.sections.controls.Manipulator( manipulatorDom );
  this._manipulator.setParentEventTarget( this );
};
goog.inherits(feng.controllers.controls.ManipulateControls, feng.controllers.controls.Controls);


feng.controllers.controls.ManipulateControls.prototype.setCamera = function( fromPosition, fromFov, object ) {

	// get camera angle from center
	var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
	var lookAtPosition = new THREE.Vector3(0, 0, 0);
	var up = new THREE.Vector3(0, 1, 0);
	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(fromPosition, lookAtPosition, up);
	rotation.setFromQuaternion( quaternion );

	// get position by camera angle
	var cameraHeight = 400;
	var x = cameraHeight * Math.sin( rotation.y );
	var z = cameraHeight * Math.cos( rotation.y );
	var y = cameraHeight;

	var position = new THREE.Vector3(x, y, z);

	// get rotation looking at center
	var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
	var lookAtPosition = new THREE.Vector3(0, 0, 0);
	var up = new THREE.Vector3(0, 1, 0);
	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(position, lookAtPosition, up);
	rotation.setFromQuaternion( quaternion );

	// apply
	this.setPosition( position );
	this.setRotation( rotation );
	this.setFov( 60 );

	this._activeObject = object;
};


feng.controllers.controls.ManipulateControls.prototype.enable = function( enable ) {

	goog.base(this, 'enable', enable);

	if(this._isEnabled) {

		this._eventHandler.listen(this._manipulator, feng.events.EventType.CLOSE, this.close, false, this);
		this._eventHandler.listen(this._manipulator, feng.events.EventType.CHANGE, this.onManipulate, false, this);
		this._eventHandler.listen(this._eventMediator.getEventTarget(), feng.events.EventType.UPDATE, this.onMediatorEvent, false, this);
		this._eventMediator.listen(this, feng.events.EventType.UPDATE);

		this._manipulator.show();
		this._manipulator.activate();

	}else  {

		this._eventMediator.unlisten(this, feng.events.EventType.UPDATE);

		this._manipulator.hide();
		this._manipulator.deactivate();
	}
};


feng.controllers.controls.ManipulateControls.prototype.update = function () {

	goog.base(this, 'update');

	//
	this.dispatchEvent({
		type: feng.events.EventType.UPDATE,
		rotationY: this.getYaw()
	});

	//
	var renderElement = this._view3d.domElement;
	var renderElementSize = goog.style.getSize( renderElement );
	var object2d = feng.utils.ThreeUtils.get2DCoordinates( this._activeObject.position, this._camera, renderElementSize );
	this._manipulator.update( object2d.x, object2d.y );
};


feng.controllers.controls.ManipulateControls.prototype.close = function () {

	var closeUpControls = this._view3d.modeController.getModeControl(feng.views.View3D.Mode.CLOSE_UP);
	var objectPosition = this._activeObject.position;
	var currentPosition = this.getPosition();

	var d = objectPosition.distanceTo( currentPosition );
	var sine = (currentPosition.z - objectPosition.z) / d;
	var rad = Math.asin( sine );
	var x = objectPosition.x + Math.cos(rad) * 90;
	var z = objectPosition.z + Math.sin(rad) * 90;
	var toPosition = new THREE.Vector3(x, closeUpControls.getPosition().y, z);

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.views.View3D.Mode.CLOSE_UP,
		toPosition: toPosition,
		object: this._activeObject
	});
};


feng.controllers.controls.ManipulateControls.prototype.syncPhysics = function(){

	// update position
	var threePosition = this.physics.getActiveBox3DPosition();
	threePosition.y = this._activeObject.position.y;

	this._activeObject.position.set(threePosition.x, threePosition.y, threePosition.z);

	// update rotation
	var rotation = this.physics.getActiveBoxRotation();

	this._activeObject.rotation.y = rotation;
};


feng.controllers.controls.ManipulateControls.prototype.onMoveObject = function ( e ) {

	var viewSize = this._view3d.getViewSize();

	var mousePos = new THREE.Vector3();
	mousePos.x = ( e.clientX / viewSize.width ) * 2 - 1;
	mousePos.y = - ( e.clientY / viewSize.height ) * 2 + 1;

  var projector = new THREE.Projector();
  var ray = projector.pickingRay( mousePos, this._camera ).ray;
	var intersect = ray.intersectPlane( this._plane );

	this.physics.updateActiveBox( intersect.x, intersect.z );
};


feng.controllers.controls.ManipulateControls.prototype.onDropObject = function ( e ) {

	this._eventHandler.unlisten(this._domElement, 'mousemove', this.onMoveObject, false, this);
	this._eventHandler.unlisten(this._domElement, 'click', this.onDropObject, false, this);

	this._manipulator.show();

	this.physics.stop();

	console.log('drop');
};


feng.controllers.controls.ManipulateControls.prototype.onManipulate = function ( e ) {

	var collidableBoxes = this._view3d.getCollidableBoxes( this._activeObject );

	var activeObject = this._view3d.getView3dObject( this._activeObject.name );
	var activeObjectBox = activeObject.getBoxBeforeRotation();

	if(e.move) {

		this.physics.startMove( collidableBoxes, activeObjectBox );

		// init move object
		this._eventHandler.listen(this._domElement, 'mousemove', this.onMoveObject, false, this);
		this._eventHandler.listen(this._domElement, 'click', this.onDropObject, false, this);

		this._manipulator.hide();

		this.onMoveObject(e);
	}
	else if(e.rotate) {
		
		// prevent rotating during physics running
		if(this.physics.isRunning) return;

		this.physics.startRotate( collidableBoxes, activeObjectBox );

		// rotate object around it's own Y axis
		var prop = {
			rad: this._activeObject.rotation.y
		};

		this._rotateTweener = TweenMax.to(prop, .2, {
			rad: prop.rad + Math.PI / 2,
			onUpdate: function() {
				this.physics.updateActiveBox( null, null, prop.rad );
			},
			onUpdateScope: this,
			onComplete: function() {
				this.physics.stop();
				this.syncPhysics();
			},
			onCompleteScope: this
		});
	}
};


feng.controllers.controls.ManipulateControls.prototype.onMediatorEvent = function(e){

	switch(e.type) {

		case feng.events.EventType.UPDATE:

		if(e.target instanceof feng.views.sections.controls.Compass) {

			var radians = THREE.Math.degToRad( e.angle%360 );

			var cameraHeight = this.getPosition().y;
			var posX = cameraHeight * Math.sin( radians );
			var posZ = cameraHeight * Math.cos( radians );
			var posY = cameraHeight;

			this.setPosition( posX, posY, posZ );

			// look at
			var up = new THREE.Vector3(0, 1, 0);
			var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
			var centerPosition = new THREE.Vector3(0, 0, 0);
			var position = centerPosition; // this._activeObject.position
			var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(this.getPosition(), position, up);
			rotation.setFromQuaternion( quaternion );

			this.setRotation( rotation );
		}

		break;
	}
};


feng.controllers.controls.ManipulateControls.prototype.onAnimationFrame = function(now){

	goog.base(this, 'onAnimationFrame', now);

	if(this.physics.isRunning) {
		
		this.syncPhysics();
	}
};