goog.provide('feng.views.sections.controls.ObjectSelector');

goog.require('goog.events');
goog.require('goog.async.Delay');
goog.require('goog.async.Throttle');
goog.require('feng.fx.AnimatedSprite');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.ObjectSelector = function(domElement){

  goog.base(this, domElement);

  this._selectableObjects = [];

  this._domElement = domElement;
  this._fillEl = goog.dom.getElementByClass('fill', this._domElement);

  var img = feng.models.Preload.getInstance().getAsset('global.circular-fill');
  this._fillSprite = new feng.fx.AnimatedSprite(this._fillEl, img, 16, 2, 31);

  this._selectedObject = null;
  this._downObject = null;
  this._isEnabled = false;
  this._startTime = 0;
  this._duration = 600;

  this._callbacks = {};

  // a delay to kick off the progress, to differentiate the mouse behavior between a fast click and object selecting
  this._delay = new goog.async.Delay(this.startSelect, 200, this);

  // a throttle to not let the object hover detection fire too often
  this._mouseMoveThrottle = new goog.async.Throttle(this.doHoverDetection, 250, this);
  this._mouseMovePosition = {x: 0, y: 0};

  this._intersectedObject = null;

  this._hitTestMeshes = [];

	this.show( false );
};
goog.inherits(feng.views.sections.controls.ObjectSelector, feng.views.sections.controls.Controls);


feng.views.sections.controls.ObjectSelector.prototype.setPosition = function ( x, y ) {

	goog.style.setPosition(this.domElement, x, y);
};


feng.views.sections.controls.ObjectSelector.prototype.setSelectableObjects = function ( objects ) {

	this._selectableObjects = objects;

	this._hitTestMeshes = goog.array.map(this._selectableObjects, function(object) {

		return object.getProxyBox();
	}, this);
};


feng.views.sections.controls.ObjectSelector.prototype.activate = function( callbacks ) {

  var shouldActivate = goog.base(this, 'activate');

  if(!shouldActivate) return;
  
	this._callbacks = {
	  	'onProgress': callbacks['onProgress'] || goog.nullFunction,
	  	'onStart': callbacks['onStart'] || goog.nullFunction,
	  	'onCancel': callbacks['onCancel'] || goog.nullFunction,
	  	'onComplete': callbacks['onComplete'] || goog.nullFunction
	  };

	this._eventHandler.listen(this._renderEl, 'mousedown', this.onMouseDown, false, this);
	this._eventHandler.listen(this._renderEl, 'mousemove', this.onMouseMove, false, this);
};


feng.views.sections.controls.ObjectSelector.prototype.deactivate = function() {

  var shouldDeactivate = goog.base(this, 'deactivate');

  if(!shouldDeactivate) return;

	this._delay.stop();

	goog.fx.anim.unregisterAnimation( this );

	feng.pubsub.publish( feng.PubSub.Topic.UNTRIGGER_SELECTOR );
};


feng.views.sections.controls.ObjectSelector.prototype.animateIn = function () {

	TweenMax.fromTo(this.domElement, .25, {
		'scale': 0,
		'opacity': 0
	}, {
		'scale': 1,
		'opacity': 1,
		'ease': Expo.easeOut
	});

	TweenMax.fromTo(this._fillEl, .4, {
		'scale': 0
	}, {
		'delay': .1,
		'scale': 1,
		'ease': Back.easeOut
	});

	feng.utils.Utils.setCursor('initial', this._renderEl);
};


feng.views.sections.controls.ObjectSelector.prototype.animateOut = function () {

	TweenMax.to(this.domElement, .25, {
		'scale': .5,
		'opacity': 0,
		'ease': Expo.easeOut,
		'onComplete': this.hide,
		'onCompleteScope': this
	});

	feng.utils.Utils.setCursor(null, this._renderEl);
};


feng.views.sections.controls.ObjectSelector.prototype.doSelect = function () {

	this._selectedObject = feng.views.sections.controls.ObjectSelector.findObjectDelegation( this._downObject );

	this.animateOut();

	this._callbacks['onComplete']( this._selectedObject );

	feng.pubsub.publish( feng.PubSub.Topic.COMPLETE_SELECTOR );
};


feng.views.sections.controls.ObjectSelector.prototype.cancelSelect = function () {

	this.animateOut();

	this._callbacks['onCancel']();
};


feng.views.sections.controls.ObjectSelector.prototype.startSelect = function () {

	this.show();
	this.animateIn();

	this._startTime = goog.now();
	goog.fx.anim.registerAnimation( this );

	this._callbacks['onStart']( this._downObject );
};


feng.views.sections.controls.ObjectSelector.prototype.doHoverDetection = function () {

	var mouseX = this._mouseMovePosition.x;
	var mouseY = this._mouseMovePosition.y;

	var camera = this._cameraController.activeCamera;

	var intersects = feng.utils.ThreeUtils.getObjectsBy2DPosition( mouseX, mouseY, this._hitTestMeshes, camera, this._viewSize );
	
	var isIntersected = (intersects.length > 0);

	this._intersectedObject = isIntersected ? intersects[0].object : null;

	goog.dom.classes.enable(this._renderEl, 'help', isIntersected);
};


feng.views.sections.controls.ObjectSelector.prototype.onMouseDown = function ( e ) {

	this._selectedObject = null;

	var camera = this._cameraController.activeCamera;

	var intersects = feng.utils.ThreeUtils.getObjectsBy2DPosition( e.clientX, e.clientY, this._hitTestMeshes, camera, this._viewSize );

	if(intersects.length === 0) {
		return false;
	}

	this._downObject = intersects[0].object.view3dObject;
	this.setPosition( e.clientX, e.clientY );

	this._eventHandler.listen(document, 'mousemove', this.onMouseDownCancel, false, this);
	this._eventHandler.listen(document, 'mouseup', this.onMouseDownCancel, false, this);

	this._delay.start();
};


feng.views.sections.controls.ObjectSelector.prototype.onMouseDownCancel = function ( e ) {

	this._delay.stop();

	this._eventHandler.unlisten(document, 'mousemove', this.onMouseDownCancel, false, this);
	this._eventHandler.unlisten(document, 'mouseup', this.onMouseDownCancel, false, this);

	goog.fx.anim.unregisterAnimation( this );

	this.cancelSelect();
};


feng.views.sections.controls.ObjectSelector.prototype.onMouseMove = function ( e ) {

	this._mouseMovePosition.x = e.clientX;
	this._mouseMovePosition.y = e.clientY;

	this._mouseMoveThrottle.fire();

	if(this._intersectedObject) {

		var camera = this._cameraController.activeCamera;

		feng.pubsub.publish( feng.PubSub.Topic.TRIGGER_SELECTOR, this._intersectedObject, camera, this._viewSize );

	}else {

		feng.pubsub.publish( feng.PubSub.Topic.UNTRIGGER_SELECTOR );
	}
};


feng.views.sections.controls.ObjectSelector.prototype.onAnimationFrame = function ( now ) {

	var progress = Math.min(1, (now - this._startTime) / this._duration);
	//console.log('object select progress: ' + progress);

	this._fillSprite.setProgress( progress );

	if(progress === 1) {

		this._eventHandler.unlisten(document, 'mousemove', this.onMouseDownCancel, false, this);
		this._eventHandler.unlisten(document, 'mouseup', this.onMouseDownCancel, false, this);

		goog.fx.anim.unregisterAnimation( this );

		this.doSelect();
	}

	this._callbacks['onProgress']( this._downObject, progress );
};


feng.views.sections.controls.ObjectSelector.findObjectDelegation = function( object ) {

	/*
	if(object instanceof feng.views.view3dobject.entities.PictureFrame) {
		return object.object3d.parent.interactiveObject;
	}
	*/
	
	return object;
};