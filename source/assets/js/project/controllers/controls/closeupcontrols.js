goog.provide('feng.controllers.controls.CloseUpControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.views.sections.controls.Manipulator');


/**
 * @constructor
 */
feng.controllers.controls.CloseUpControls = function(camera, view3d, domElement, uiElement) {

  goog.base(this, camera, view3d, domElement);

  this._activeObject = null;

  var manipulatorDom = goog.dom.getElementByClass('manipulator', uiElement);
  this._manipulator = new feng.views.sections.controls.Manipulator( manipulatorDom );
  this._manipulator.setParentEventTarget( this );
};
goog.inherits(feng.controllers.controls.CloseUpControls, feng.controllers.controls.Controls);


feng.controllers.controls.CloseUpControls.prototype.setCamera = function( position, object ) {

	// get camera angle looking at the object
	var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
	var lookAtPosition = object.position.clone();
	var up = new THREE.Vector3(0, 1, 0);
	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(position, lookAtPosition, up);
	rotation.setFromQuaternion( quaternion );

	// apply
	this.setPosition( position );
	this.setRotation( rotation );

	this._activeObject = object;
};


feng.controllers.controls.CloseUpControls.prototype.enable = function( enable ) {

	goog.base(this, 'enable', enable);

	if(this._isEnabled) {

		this._eventHandler.listen(this._manipulator, feng.events.EventType.CLOSE, this.close, false, this);
		this._eventHandler.listen(this._manipulator, feng.events.EventType.CHANGE, this.onManipulate, false, this);

		this._manipulator.show();
		this._manipulator.activate();

	}else  {

		this._manipulator.hide();
		this._manipulator.deactivate();
	}
};


feng.controllers.controls.CloseUpControls.prototype.close = function ( e ) {

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.views.View3D.Mode.BROWSE,
		eventToTrigger: e.eventToTrigger
	});
};


feng.controllers.controls.CloseUpControls.prototype.update = function() {

	goog.base(this, 'update');

	var renderElement = this._view3d.domElement;
	var renderElementSize = goog.style.getSize( renderElement );
	var object2d = feng.utils.ThreeUtils.get2DCoordinates( this._activeObject.position, this._camera, renderElementSize );
	this._manipulator.update( object2d.x, object2d.y );
};


feng.controllers.controls.CloseUpControls.prototype.onManipulate = function ( e ) {

	if(e.move || e.rotate) {
		this.dispatchEvent({
			type: feng.events.EventType.CHANGE,
			mode: feng.views.View3D.Mode.MANIPULATE,
			object: this._activeObject
		});
	}
};


feng.controllers.controls.CloseUpControls.prototype.onMouseDown = function ( e ) {

	goog.base(this, 'onMouseDown', e);

	this.close({
		eventToTrigger: e
	});
};