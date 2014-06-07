goog.provide('feng.views.sections.controls.ObjectSelector');

goog.require('goog.events');
goog.require('goog.async.Delay');
goog.require('feng.fx.AnimatedSprite');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.ObjectSelector = function(domElement, renderElement){

  goog.base(this, domElement);

  this._selectableObjects = null;
  this._camera = null;
  this._renderElement = renderElement;
  this._domElement = domElement;
  this._fillEl = goog.dom.getElementByClass('fill', this._domElement);

  var img = feng.models.Preload.getInstance().getAsset('global.circular-fill');
  this._fillSprite = new feng.fx.AnimatedSprite(this._fillEl, img, 16, 2, 31);

  this._selectedObject = null;
  this._downObject = null;
  this._isEnabled = false;
  this._startTime = 0;
  this._duration = 800;

  this._callbacks = {};

  // a delay to kick off the progress, to differentiate the mouse behavior between a fast click and object selecting
  this._delay = new goog.async.Delay(this.startSelect, 250, this);

	this.hide();
};
goog.inherits(feng.views.sections.controls.ObjectSelector, feng.views.sections.controls.Controls);


feng.views.sections.controls.ObjectSelector.prototype.update = function (objects, camera, callbacks) {

	this._selectableObjects = goog.object.getValues(objects);

	this._camera = camera;

	this._callbacks = {
	  	'onProgress': callbacks['onProgress'] || goog.nullFunction,
	  	'onStart': callbacks['onStart'] || goog.nullFunction,
	  	'onCancel': callbacks['onCancel'] || goog.nullFunction,
	  	'onComplete': callbacks['onComplete'] || goog.nullFunction
	  };
};


feng.views.sections.controls.ObjectSelector.prototype.getHitTestMeshes = function () {

	var hitTestMeshes = [];

	var parseObject = function(object) {
		
		if(object.interactiveObject) {
			hitTestMeshes.push( object );
		}else {
			var children = object.children;

			if(children.length > 0) {
				goog.array.forEach(children, function(child) {
					parseObject( child );
				});
			}
		}
	};

	goog.array.forEach(this._selectableObjects, function(object) {
		parseObject( object.object3d );
	}, this);

	return hitTestMeshes;
};


feng.views.sections.controls.ObjectSelector.prototype.setPosition = function (x, y) {

	goog.style.setPosition(this.domElement, x, y);
};


feng.views.sections.controls.ObjectSelector.prototype.animateIn = function () {

	TweenMax.fromTo(this.domElement, .25, {
		'scale': 0,
		'opacity': 0,
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

	feng.utils.Utils.setCursor('initial', this._renderElement);
};


feng.views.sections.controls.ObjectSelector.prototype.animateOut = function () {

	TweenMax.to(this.domElement, .25, {
		'scale': .5,
		'opacity': 0,
		'ease': Expo.easeOut,
		'onComplete': this.hide,
		'onCompleteScope': this
	});

	feng.utils.Utils.setCursor(null, this._renderElement);
};


feng.views.sections.controls.ObjectSelector.prototype.activate = function() {

	goog.base(this, 'activate');

	this._eventHandler.listen(this._renderElement, 'mousedown', this.onMouseDown, false, this);
};


feng.views.sections.controls.ObjectSelector.prototype.deactivate = function() {

	goog.base(this, 'deactivate');

	this._delay.stop();

	goog.fx.anim.unregisterAnimation( this );
};


feng.views.sections.controls.ObjectSelector.prototype.doSelect = function () {

	this._selectedObject = this._downObject;

	this.animateOut();

	this._callbacks['onComplete']( this._selectedObject );
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


feng.views.sections.controls.ObjectSelector.prototype.onMouseDown = function ( e ) {

	this._selectedObject = null;

	var meshes = this.getHitTestMeshes()

	var intersects = feng.utils.ThreeUtils.getObjectsBy2DPosition( e.clientX, e.clientY, meshes, this._camera, this._renderElement );

	if(intersects.length === 0) {
		return false;
	}

	this._downObject = intersects[0].object.interactiveObject;
	this.setPosition( e.clientX, e.clientY );

	this._eventHandler.listen(document, 'mousemove', this.onMouseMove, false, this);
	this._eventHandler.listen(document, 'mouseup', this.onMouseUp, false, this);

	this._delay.start();
};


feng.views.sections.controls.ObjectSelector.prototype.onMouseMove = function ( e ) {

	this.onMouseUp();
};


feng.views.sections.controls.ObjectSelector.prototype.onMouseUp = function ( e ) {

	this._delay.stop();

	this._eventHandler.unlisten(document, 'mousemove', this.onMouseMove, false, this);
	this._eventHandler.unlisten(document, 'mouseup', this.onMouseUp, false, this);

	goog.fx.anim.unregisterAnimation( this );

	this.cancelSelect();
};


feng.views.sections.controls.ObjectSelector.prototype.onAnimationFrame = function ( now ) {

	var progress = Math.min(1, (now - this._startTime) / this._duration);
	//console.log('object select progress: ' + progress);

	this._fillSprite.setProgress( progress );

	if(progress === 1) {

		this._eventHandler.unlisten(document, 'mousemove', this.onMouseMove, false, this);
		this._eventHandler.unlisten(document, 'mouseup', this.onMouseUp, false, this);

		goog.fx.anim.unregisterAnimation( this );

		this.doSelect();
	}

	this._callbacks['onProgress']( this._downObject, progress );
};