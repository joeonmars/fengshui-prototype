goog.provide('feng.controllers.controls.CloseUpControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.views.sections.controls.Manipulator');
goog.require('feng.controllers.controls.InteractionResolver');


/**
 * @constructor
 */
feng.controllers.controls.CloseUpControls = function(camera, view3d, domElement, uiElement) {

  goog.base(this, camera, view3d, domElement);

  this._activeObject = null;

  var manipulatorDom = goog.dom.getElementByClass('manipulator', uiElement);
  this._manipulator = new feng.views.sections.controls.Manipulator( manipulatorDom );
  this._manipulator.setParentEventTarget( this );

  this._interactionResolver = feng.controllers.controls.InteractionResolver.getInstance();

  this._tempPosition = new THREE.Vector3();
};
goog.inherits(feng.controllers.controls.CloseUpControls, feng.controllers.controls.Controls);


feng.controllers.controls.CloseUpControls.prototype.setCamera = function( position, fov, object ) {

	// get camera angle looking at the object
	var object3d = object.object3d;
	var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
	var lookAtPosition = feng.utils.ThreeUtils.getWorldPosition( object3d );
	var up = new THREE.Vector3(0, 1, 0);
	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(position, lookAtPosition, up);
	rotation.setFromQuaternion( quaternion );

	// apply
	this.setPosition( position );
	this.setRotation( rotation );
	this.setFov( fov );

	this._activeObject = object;
};


feng.controllers.controls.CloseUpControls.prototype.enable = function( enable, object ) {

	goog.base(this, 'enable', enable);

	this._activeObject = object || this._activeObject;

	if(this._isEnabled) {

		this._eventHandler.listen(this._manipulator, feng.events.EventType.CLOSE, this.close, false, this);
		this._eventHandler.listen(this._manipulator, feng.events.EventType.CHANGE, this.onManipulate, false, this);

		this._eventHandler.listen(this._interactionResolver, feng.events.EventType.START, this.onInteractionStart, false, this);
		this._eventHandler.listen(this._interactionResolver, feng.events.EventType.END, this.onInteractionEnd, false, this);

		this._manipulator.show();
		this._manipulator.activate( this._activeObject.interactions );

	}else  {

		this._manipulator.hide();
		this._manipulator.deactivate();
	}
};


feng.controllers.controls.CloseUpControls.prototype.close = function ( e ) {

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.controllers.view3d.ModeController.Mode.BROWSE,
		eventToTrigger: e ? e.eventToTrigger : null
	});
};


feng.controllers.controls.CloseUpControls.prototype.update = function() {

	goog.base(this, 'update');

	var viewSize = this._view3d.getViewSize();
	var position3d = feng.utils.ThreeUtils.getWorldPosition( this._activeObject.object3d, this._tempPosition );
	var position2d = feng.utils.ThreeUtils.get2DCoordinates( position3d, this._camera, viewSize );
	this._manipulator.update( position2d.x, position2d.y );
};


feng.controllers.controls.CloseUpControls.prototype.onManipulate = function ( e ) {

	var interaction = feng.views.view3dobject.InteractiveObject.Interaction;
	var isPhysical = this._activeObject.isPhysical;
	var shouldGoDesignMode = false;

	if(e.interaction === interaction.MOVE) shouldGoDesignMode = true;
	if(isPhysical && e.interaction === interaction.ROTATE) shouldGoDesignMode = true;

	if(shouldGoDesignMode) {

		this.dispatchEvent({
			type: feng.events.EventType.CHANGE,
			mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
			nextMode: feng.controllers.view3d.ModeController.Mode.DESIGN,
			object: this._activeObject
		});

	}else {

		this._interactionResolver.resolve( this._activeObject, e.interaction );

	}
	
};


feng.controllers.controls.CloseUpControls.prototype.onMouseDown = function ( e ) {

	goog.base(this, 'onMouseDown', e);

	this.close({
		eventToTrigger: e
	});
};


feng.controllers.controls.CloseUpControls.prototype.onInteractionStart = function(e){

	this._manipulator.hide();
};


feng.controllers.controls.CloseUpControls.prototype.onInteractionEnd = function(e){

	this._manipulator.show();

	if(e.interaction === "enter") {

		var gatewayPosition = this._activeObject.object3d.position;
		var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
		var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(this.getPosition(), gatewayPosition);
		rotation.setFromQuaternion( quaternion );

		this.dispatchEvent({
			type: feng.events.EventType.CHANGE,
			mode: feng.controllers.view3d.ModeController.Mode.WALK,
			nextMode: null,
			gateway: this._activeObject,
			toPosition: gatewayPosition,
			toRotation: rotation,
			toFov: this.getFov(),
			intersectPosition: gatewayPosition
		});
	}

	if(e.interaction === 'close') {
		this.close();
	}
};