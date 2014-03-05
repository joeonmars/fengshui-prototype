goog.provide('feng.controllers.controls.ManipulateControls');

goog.require('goog.fx.anim.Animated');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.utils.ThreeUtils');
goog.require('feng.views.sections.controls.Manipulator');


/**
 * @constructor
 * a combination of trackball controls and transform controls
 * WIP
 */
feng.controllers.controls.ManipulateControls = function(camera, view3d, domElement, uiElement){

  goog.base(this, camera, view3d, domElement);

  this._activeObject = null;
  this._eventMediator = this._view3d.eventMediator;

  this._mousePosition = new THREE.Vector3();
  this._movePosition = new THREE.Vector3();
  this._plane = new THREE.Plane( new THREE.Vector3(0,1,0) );

  this._rotateTweener = null;
  this._collidableBoxes = null;

  var manipulatorDom = goog.dom.getElementByClass('manipulator', uiElement);
  this._manipulator = new feng.views.sections.controls.Manipulator( manipulatorDom );
  this._manipulator.setParentEventTarget( this );
};
goog.inherits(feng.controllers.controls.ManipulateControls, feng.controllers.controls.Controls);


feng.controllers.controls.ManipulateControls.prototype.setCamera = function( cameraPosition, object, fov ) {

	// get camera angle from center
	var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
	var lookAtPosition = new THREE.Vector3(0, 0, 0);
	var up = new THREE.Vector3(0, 1, 0);
	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(cameraPosition, lookAtPosition, up);
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
	var renderElement = this._view3d.getRenderElement();
	var renderElementSize = goog.style.getSize( renderElement );
	var object2d = feng.utils.ThreeUtils.get2DCoordinates( this._activeObject.position, this._camera, renderElementSize );
	this._manipulator.update( object2d.x, object2d.y );
};


feng.controllers.controls.ManipulateControls.prototype.close = function () {

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.views.View3D.Mode.BROWSE
	});
};


feng.controllers.controls.ManipulateControls.prototype.onObjectRotated = function ( e ) {

	this._activeObject.rotation.y = this._activeObject.rotation.y % (Math.PI * 2);
};


feng.controllers.controls.ManipulateControls.prototype.onMoveObject = function ( e ) {

	var viewSize = this._view3d.getViewSize();

	this._mousePosition.x = ( e.clientX / viewSize.width ) * 2 - 1;
	this._mousePosition.y = - ( e.clientY / viewSize.height ) * 2 + 1;

	var ground = this._view3d.getGround();

  var projector = new THREE.Projector();
  var raycaster = projector.pickingRay( this._mousePosition.clone(), this._camera );

	var globalRay = raycaster.ray.clone();
  var globalIntersect = globalRay.intersectPlane( this._plane );

	var intersects = raycaster.intersectObject( ground );

	if(intersects.length > 0) {

		var intersect = intersects[0];

		var normalMatrix = new THREE.Matrix3();
		normalMatrix.getNormalMatrix( intersect.object.matrixWorld );

		var vec = new THREE.Vector3();
		vec.copy( intersect.face.normal );
		vec.applyMatrix3( normalMatrix ).normalize();

		this._movePosition.addVectors( intersect.point, vec );

	}else {

		var groundBox = new THREE.Box3().setFromObject( ground );

	  var maxX = Math.abs(groundBox.max.x - groundBox.min.x) / 2;
	  var maxZ = Math.abs(groundBox.max.z - groundBox.min.z) / 2;

	  this._movePosition.x = Math.max(-maxX, Math.min(globalIntersect.x, maxX));
	  this._movePosition.z = Math.max(-maxZ, Math.min(globalIntersect.z, maxZ));

	}

	// create current mouse box
	var objectBox = this._view3d.getMeshBox( this._activeObject );
	var objectHalfWidth = Math.abs(objectBox.right - objectBox.left) / 2;
	var objectHalfHeight = Math.abs(objectBox.bottom - objectBox.top) / 2;
	var top = this._movePosition.z - objectHalfHeight;
	var right = this._movePosition.x + objectHalfWidth;
	var bottom = this._movePosition.z + objectHalfHeight;
	var left = this._movePosition.x - objectHalfWidth;
	var mouseBox = new goog.math.Box(top, right, bottom, left);

	// detect collision
	var collided = goog.array.find(this._collidableBoxes, function(collidableBox) {
		return goog.math.Box.intersects(collidableBox, mouseBox);
	}, this);

	if(!collided) {
		// set object position
		this._activeObject.position.x = this._movePosition.x;
		this._activeObject.position.z = this._movePosition.z;
	}

	console.log('move');
};


feng.controllers.controls.ManipulateControls.prototype.onDropObject = function ( e ) {

	this._eventHandler.unlisten(this._domElement, 'mousemove', this.onMoveObject, false, this);
	this._eventHandler.unlisten(this._domElement, 'click', this.onDropObject, false, this);

	this._manipulator.show();

	console.log('drop');
};


feng.controllers.controls.ManipulateControls.prototype.onManipulate = function ( e ) {

	if(e.move) {

		// init move object
		this._eventHandler.listen(this._domElement, 'mousemove', this.onMoveObject, false, this);
		this._eventHandler.listen(this._domElement, 'click', this.onDropObject, false, this);

		this._manipulator.hide();

		this._collidableBoxes = this._view3d.getCollidableBoxes( this._activeObject );

		this.onMoveObject(e);
	}
	else if(e.rotate) {
		
		// prevent rotating during tweening
		if(this._rotateTweener && this._rotateTweener.isActive()) return;

		// rotate object around it's own Y axis
		this._rotateTweener = TweenMax.to(this._activeObject.rotation, .2, {
			y: this._activeObject.rotation.y + Math.PI/2,
			onComplete: this.onObjectRotated,
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