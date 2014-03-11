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
  this._activeObjectBox = null;
  this._eventMediator = this._view3d.eventMediator;

  this._mousePosition = new THREE.Vector3();
  this._movePosition = new THREE.Vector3();
  this._plane = new THREE.Plane( new THREE.Vector3(0,1,0) );

  this._rotateTweener = null;
  this._collidableBoxes = null;

  this._isMouseMoving = false;

  this._moveAnimationFrameTarget = {
  	onAnimationFrame: goog.bind(this.onMoveAnimationFrame, this)
  };

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

	var objectHalfWidth = (this._activeObjectBox.right - this._activeObjectBox.left) / 2;
	var objectHalfHeight = (this._activeObjectBox.bottom - this._activeObjectBox.top) / 2;

	var ground = this._view3d.getGround();

  var projector = new THREE.Projector();
  var groundRay = projector.pickingRay( this._mousePosition.clone(), this._camera );
	var groundIntersects = groundRay.intersectObject( ground );

	if(groundIntersects.length > 0) {

		var intersect = groundIntersects[0];

		var normalMatrix = new THREE.Matrix3();
		normalMatrix.getNormalMatrix( intersect.object.matrixWorld );

		var vec = new THREE.Vector3();
		vec.copy( intersect.face.normal );
		vec.applyMatrix3( normalMatrix ).normalize();

		this._movePosition.addVectors( intersect.point, vec );
	}

	// limit move position within ground
	var globalRay = groundRay.ray.clone();
  var globalIntersect = globalRay.intersectPlane( this._plane );

	var groundBox = new THREE.Box3().setFromObject( ground );
  var maxX = (groundBox.max.x - groundBox.min.x) / 2;
  var maxZ = (groundBox.max.z - groundBox.min.z) / 2;

  this._movePosition.x = Math.max(-maxX + objectHalfWidth, Math.min(globalIntersect.x, maxX - objectHalfWidth));
  this._movePosition.z = Math.max(-maxZ + objectHalfHeight, Math.min(globalIntersect.z, maxZ - objectHalfHeight));
  this._movePosition.y = this._activeObject.position.y;
  //this._movePosition.y = feng.controllers.controls.Controls.Default.STANCE_HEIGHT / 2;

	// create current mouse box
	var top = this._movePosition.z - objectHalfHeight;
	var right = this._movePosition.x + objectHalfWidth;
	var bottom = this._movePosition.z + objectHalfHeight;
	var left = this._movePosition.x - objectHalfWidth;
	var mouseBox = new goog.math.Box(top, right, bottom, left);

	// detect collision
	var collidedBox = goog.array.find(this._collidableBoxes, function(collidableBox) {
		return goog.math.Box.intersects(collidableBox, mouseBox);
	}, this);


	// resolve collision if detected
	if(collidedBox) {

		// resolve x component
		var overlapX;
		var mouseBoxCenterX = mouseBox.left + objectHalfWidth;
		var collidedBoxCenterX = collidedBox.left + (collidedBox.right - collidedBox.left) / 2;

		if(mouseBoxCenterX < collidedBoxCenterX) {
			overlapX = mouseBox.right - collidedBox.left;
		}else {
			overlapX = mouseBox.left - collidedBox.right;
		}

		// resolve z component
		var overlapZ;
		var mouseBoxCenterZ = mouseBox.top + objectHalfHeight;
		var collidedBoxCenterZ = collidedBox.top + (collidedBox.bottom - collidedBox.top) / 2;

		if(mouseBoxCenterZ < collidedBoxCenterZ) {
			overlapZ = mouseBox.bottom - collidedBox.top;
		}else {
			overlapZ = mouseBox.top - collidedBox.bottom;
		}

		if(Math.abs(overlapX) < Math.abs(overlapZ)) {
			this._movePosition.x -= overlapX;
		}else {
			this._movePosition.z -= overlapZ;
		}
	}
};


feng.controllers.controls.ManipulateControls.prototype.onDropObject = function ( e ) {

	this._eventHandler.unlisten(this._domElement, 'mousemove', this.onMoveObject, false, this);
	this._eventHandler.unlisten(this._domElement, 'click', this.onDropObject, false, this);

	this._manipulator.show();

	this._isMouseMoving = false;

	console.log('drop');
};


feng.controllers.controls.ManipulateControls.prototype.onManipulate = function ( e ) {

	if(e.move) {

		// init move object
		this._eventHandler.listen(this._domElement, 'mousemove', this.onMoveObject, false, this);
		this._eventHandler.listen(this._domElement, 'click', this.onDropObject, false, this);

		this._manipulator.hide();

		this._collidableBoxes = this._view3d.getCollidableBoxes( this._activeObject );
		this._activeObjectBox = this._view3d.getMeshBox( this._activeObject );

		this.onMoveObject(e);

		this._isMouseMoving = true;

		goog.fx.anim.registerAnimation( this._moveAnimationFrameTarget );
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


feng.controllers.controls.ManipulateControls.prototype.onMoveAnimationFrame = function(now){

	var ease = .5;
	this._activeObject.position.x += (this._movePosition.x - this._activeObject.position.x) * ease;
	this._activeObject.position.y += (this._movePosition.y - this._activeObject.position.y) * ease;
	this._activeObject.position.z += (this._movePosition.z - this._activeObject.position.z) * ease;
	
	if(!this._isMouseMoving) {

		//this._movePosition.y = 0;

		var diff = this._activeObject.position.distanceTo( this._movePosition );

		if(Math.round(diff) === 0) {
			goog.fx.anim.unregisterAnimation( this._moveAnimationFrameTarget );
		}
	}
};