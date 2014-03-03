goog.provide('feng.views.sections.controls.ObjectSelector');

goog.require('goog.events');
goog.require('goog.async.Delay');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.ObjectSelector = function(objects, camera, domElement){

  goog.base(this, domElement);

  this._selectableObjects = null;
  this._camera = null;
  this._domElement = null;

  this._selectedObject = null;
  this._downObject = null;
  this._isEnabled = false;
  this._startTime = 0;
  this._duration = 400;

  // a delay to kick off the progress, to differentiate the mouse behavior between a fast click and object selecting
  this._delay = new goog.async.Delay(this.startProgress, 250, this);

	this.update( objects, camera, domElement );
};
goog.inherits(feng.views.sections.controls.ObjectSelector, feng.views.sections.controls.Controls);


feng.views.sections.controls.ObjectSelector.prototype.update = function (objects, camera, domElement) {

	this._selectableObjects = objects;
	this._camera = camera;
	this._domElement = domElement;
};


feng.views.sections.controls.ObjectSelector.prototype.activate = function() {

	goog.base(this, 'activate');

	this._eventHandler.listen(this._domElement, 'mousedown', this.onMouseDown, false, this);
};


feng.views.sections.controls.ObjectSelector.prototype.deactivate = function() {

	goog.base(this, 'deactivate');

	this._delay.stop();

	goog.fx.anim.unregisterAnimation( this );
};


feng.views.sections.controls.ObjectSelector.prototype.doSelect = function () {

	this._selectedObject = this._downObject;

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		object: this._selectedObject
	});
};


feng.views.sections.controls.ObjectSelector.prototype.cancelSelect = function () {

	
};


feng.views.sections.controls.ObjectSelector.prototype.startProgress = function () {

	this._startTime = goog.now();
	goog.fx.anim.registerAnimation( this );

	this.dispatchEvent({
		type: feng.events.EventType.START
	});
};


feng.views.sections.controls.ObjectSelector.prototype.onMouseDown = function ( e ) {

	this._selectedObject = null;

	var intersects = feng.utils.ThreeUtils.getObjectsBy2DPosition( e.clientX, e.clientY, this._selectableObjects, this._camera, this._domElement );

	if(intersects.length > 0) {

		this._downObject = intersects[0].object;
	}else {

		return false;
	}

	this._eventHandler.listen(this._domElement, 'mousemove', this.onMouseMove, false, this);
	this._eventHandler.listen(document, 'mouseup', this.onMouseUp, false, this);

	this._delay.start();
};


feng.views.sections.controls.ObjectSelector.prototype.onMouseMove = function ( e ) {

	this.onMouseUp();
};


feng.views.sections.controls.ObjectSelector.prototype.onMouseUp = function ( e ) {

	this._delay.stop();

	this._eventHandler.unlisten(this._domElement, 'mousemove', this.onMouseMove, false, this);
	this._eventHandler.unlisten(document, 'mouseup', this.onMouseUp, false, this);

	goog.fx.anim.unregisterAnimation( this );

	this.cancelSelect();
};


feng.views.sections.controls.ObjectSelector.prototype.onAnimationFrame = function ( now ) {

	var progress = Math.min(1, (now - this._startTime) / this._duration);

	console.log('object select progress: ' + progress);

	if(progress === 1) {

		this._eventHandler.unlisten(this._domElement, 'mousemove', this.onMouseMove, false, this);
		this._eventHandler.unlisten(document, 'mouseup', this.onMouseUp, false, this);

		goog.fx.anim.unregisterAnimation( this );

		this.doSelect();
	}
};