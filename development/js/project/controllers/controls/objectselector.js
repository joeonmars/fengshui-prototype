goog.provide('fengshui.controllers.controls.ObjectSelector');

goog.require('goog.events');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');


/**
 * @constructor
 */
fengshui.controllers.controls.ObjectSelector = function(objects, camera, domElement){

  goog.base(this);

  this._selectableObjects = null;
  this._camera = null;
  this._domElement = null;

  this._selectedObject = null;
  this._downObject = null;
  this._isEnabled = false;
  this._startTime = 0;
  this._duration = 400;

	this._eventHandler = new goog.events.EventHandler(this);

	this.update( objects, camera, domElement );
};
goog.inherits(fengshui.controllers.controls.ObjectSelector, goog.events.EventTarget);


fengshui.controllers.controls.ObjectSelector.prototype.update = function (objects, camera, domElement) {

	var wasEnabled = this._isEnabled;

	this.enable(false);

	this._selectableObjects = objects;
	this._camera = camera;
	this._domElement = domElement;

	if(wasEnabled) this.enable(true);
};


fengshui.controllers.controls.ObjectSelector.prototype.enable = function (enable) {

	if(this._isEnabled === enable) {
		return;
	}else {
		this._isEnabled = enable;
	}

	if(this._isEnabled) {

		this._eventHandler.listen(this._domElement, 'mousedown', this.onMouseDown, false, this);
	}else {
		
		this._eventHandler.removeAll();
		goog.fx.anim.unregisterAnimation( this );
	}
};


fengshui.controllers.controls.ObjectSelector.prototype.doSelect = function () {

	this._selectedObject = this._downObject;

	this.dispatchEvent({
		type: fengshui.events.EventType.CHANGE,
		object: this._selectedObject
	});
};


fengshui.controllers.controls.ObjectSelector.prototype.cancelSelect = function () {

	
};


fengshui.controllers.controls.ObjectSelector.prototype.onMouseDown = function ( e ) {

	this._selectedObject = null;

	var intersects = fengshui.utils.ThreeUtils.getObjectsBy2DPosition( e.clientX, e.clientY, this._selectableObjects, this._camera, this._domElement );

	if(intersects.length > 0) {

		this._downObject = intersects[0].object;
	}else {

		return false;
	}

	this._eventHandler.listen(this._domElement, 'mousemove', this.onMouseMove, false, this);
	this._eventHandler.listen(document, 'mouseup', this.onMouseUp, false, this);

	this._startTime = goog.now();
	goog.fx.anim.registerAnimation( this );
};


fengshui.controllers.controls.ObjectSelector.prototype.onMouseMove = function ( e ) {

	this.onMouseUp();
};


fengshui.controllers.controls.ObjectSelector.prototype.onMouseUp = function ( e ) {

	this._eventHandler.unlisten(this._domElement, 'mousemove', this.onMouseMove, false, this);
	this._eventHandler.unlisten(document, 'mouseup', this.onMouseUp, false, this);

	goog.fx.anim.unregisterAnimation( this );

	this.cancelSelect();
};


fengshui.controllers.controls.ObjectSelector.prototype.onAnimationFrame = function ( now ) {

	var progress = Math.min(1, (now - this._startTime) / this._duration);

	console.log('object select progress: ' + progress);

	if(progress === 1) {

		this._eventHandler.unlisten(this._domElement, 'mousemove', this.onMouseMove, false, this);
		this._eventHandler.unlisten(document, 'mouseup', this.onMouseUp, false, this);

		goog.fx.anim.unregisterAnimation( this );

		this.doSelect();
	}
};