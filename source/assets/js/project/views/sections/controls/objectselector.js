goog.provide( 'feng.views.sections.controls.ObjectSelector' );

goog.require( 'goog.events' );
goog.require( 'goog.async.Delay' );
goog.require( 'goog.async.Throttle' );
goog.require( 'feng.fx.AnimatedSprite' );
goog.require( 'feng.views.sections.controls.Controls' );


/**
 * @constructor
 */
feng.views.sections.controls.ObjectSelector = function( domElement ) {

	goog.base( this, domElement );

	this._selectableObjects = [];

	this._domElement = domElement;
	this._fillEl = goog.dom.getElementByClass( 'fill', this._domElement );

	var img = feng.models.Preload.getInstance().getAsset( 'global.circular-fill' );
	this._fillSprite = new feng.fx.AnimatedSprite( this._fillEl, img, 16, 2, 31 );

	this._selectedObject = null;
	this._downObject = null;
	this._isEnabled = false;
	this._startTime = 0;
	this._duration = 500;

	this._isMouseDown = false;

	this._callbacks = {};

	// a delay to kick off the progress, to differentiate the mouse behavior between a fast click and object selecting
	this._delay = new goog.async.Delay( this.startSelect, 200, this );

	// a throttle to not let the object hover detection fire too often
	this._mouseMoveThrottle = new goog.async.Throttle( this.doHoverDetection, 250, this );
	this._mouseMovePosition = {
		x: 0,
		y: 0
	};

	this._intersectedObject = null;

	this._hitTestMeshes = [];

	this.show( false );
};
goog.inherits( feng.views.sections.controls.ObjectSelector, feng.views.sections.controls.Controls );


feng.views.sections.controls.ObjectSelector.prototype.setPosition = function( x, y ) {

	goog.style.setPosition( this.domElement, x, y );
};


feng.views.sections.controls.ObjectSelector.prototype.setSelectableObjects = function( objects ) {

	this._selectableObjects = objects;

	this._hitTestMeshes = goog.array.map( this._selectableObjects, function( object ) {

		return object.getProxyBox();
	}, this );
};


feng.views.sections.controls.ObjectSelector.prototype.activate = function( callbacks ) {

	var shouldActivate = goog.base( this, 'activate' );

	if ( !shouldActivate ) return;

	this._callbacks = {
		'onProgress': callbacks[ 'onProgress' ] || goog.nullFunction,
		'onStart': callbacks[ 'onStart' ] || goog.nullFunction,
		'onCancel': callbacks[ 'onCancel' ] || goog.nullFunction,
		'onComplete': callbacks[ 'onComplete' ] || goog.nullFunction
	};

	this._eventHandler.listen( this._renderEl, feng.events.EventType.INPUT_DOWN, this.onMouseDown, false, this );
	this._eventHandler.listen( this._renderEl, feng.events.EventType.INPUT_MOVE, this.onMouseMove, false, this );
	this._eventHandler.listen( this._renderEl, feng.events.EventType.INPUT_UP, this.onMouseUp, false, this );
};


feng.views.sections.controls.ObjectSelector.prototype.deactivate = function() {

	var shouldDeactivate = goog.base( this, 'deactivate' );

	if ( !shouldDeactivate ) return;

	this._isMouseDown = false;

	this._delay.stop();

	this._mouseMoveThrottle.stop();

	goog.fx.anim.unregisterAnimation( this );

	feng.pubsub.publish( feng.PubSub.Topic.UNTRIGGER_SELECTOR );
};


feng.views.sections.controls.ObjectSelector.prototype.animateIn = function() {

	TweenMax.fromTo( this.domElement, .25, {
		'scale': 0,
		'opacity': 0,
		'display': 'none'
	}, {
		'scale': 1,
		'opacity': 1,
		'display': 'block',
		'ease': Expo.easeOut
	} );

	TweenMax.fromTo( this._fillEl, .4, {
		'scale': 0
	}, {
		'delay': .1,
		'scale': 1,
		'ease': Back.easeOut
	} );
};


feng.views.sections.controls.ObjectSelector.prototype.animateOut = function() {

	TweenMax.to( this.domElement, .25, {
		'scale': .5,
		'opacity': 0,
		'display': 'none',
		'ease': Expo.easeOut,
		'onComplete': this.hide,
		'onCompleteScope': this
	} );
};


feng.views.sections.controls.ObjectSelector.prototype.doSelect = function() {

	this._selectedObject = this._downObject;

	this.animateOut();

	this._callbacks[ 'onComplete' ]( this._selectedObject );

	feng.pubsub.publish( feng.PubSub.Topic.COMPLETE_SELECTOR );
};


feng.views.sections.controls.ObjectSelector.prototype.cancelSelect = function() {

	this.animateOut();

	this._view3d.fx.selectEffect.animateOut();

	this._callbacks[ 'onCancel' ]();
};


feng.views.sections.controls.ObjectSelector.prototype.startSelect = function() {

	if ( !this._view3d.onlyObjectToUnlock || ( this._downObject === this._view3d.onlyObjectToUnlock ) ) {

		this._view3d.fx.selectEffect.animateIn( this._downObject );

		this.show();
		this.animateIn();

		this._startTime = goog.now();
		goog.fx.anim.registerAnimation( this );

		this._callbacks[ 'onStart' ]( this._downObject );
	}
};


feng.views.sections.controls.ObjectSelector.prototype.doHoverDetection = function() {

	var mouseX = this._mouseMovePosition.x;
	var mouseY = this._mouseMovePosition.y;

	var camera = this._cameraController.activeCamera;

	var intersects = feng.utils.ThreeUtils.getObjectsBy2DPosition( mouseX, mouseY, this._hitTestMeshes, camera, this._viewSize );

	var isIntersected = ( intersects.length > 0 );

	if ( isIntersected ) {

		this._intersectedObject = intersects[ 0 ].object;

		if ( !this._view3d.onlyObjectToUnlock || ( this._intersectedObject.view3dObject === this._view3d.onlyObjectToUnlock ) ) {

			this._view3d.fx.selectEffect.animateIn( this._intersectedObject.view3dObject );
		}

	} else {

		this._intersectedObject = null;

		this._view3d.fx.selectEffect.animateOut();
	}
};


feng.views.sections.controls.ObjectSelector.prototype.onMouseDown = function( e ) {

	this._isMouseDown = true;

	this._selectedObject = null;

	var camera = this._cameraController.activeCamera;

	var intersects = feng.utils.ThreeUtils.getObjectsBy2DPosition( e.clientX, e.clientY, this._hitTestMeshes, camera, this._viewSize );

	if ( intersects.length === 0 ) {
		return false;
	}

	this._downObject = intersects[ 0 ].object.view3dObject;
	this.setPosition( e.clientX, e.clientY );

	this._eventHandler.listen( document, feng.events.EventType.INPUT_MOVE, this.onMouseDownCancel, false, this );
	this._eventHandler.listen( document, feng.events.EventType.INPUT_UP, this.onMouseDownCancel, false, this );

	this._delay.start();
};


feng.views.sections.controls.ObjectSelector.prototype.onMouseUp = function( e ) {

	this._isMouseDown = false;
};


feng.views.sections.controls.ObjectSelector.prototype.onMouseDownCancel = function( e ) {

	this._delay.stop();

	this._eventHandler.unlisten( document, feng.events.EventType.INPUT_MOVE, this.onMouseDownCancel, false, this );
	this._eventHandler.unlisten( document, feng.events.EventType.INPUT_UP, this.onMouseDownCancel, false, this );

	goog.fx.anim.unregisterAnimation( this );

	this.cancelSelect();
};


feng.views.sections.controls.ObjectSelector.prototype.onMouseMove = function( e ) {

	if ( this._isMouseDown ) {

		this._mouseMoveThrottle.stop();
		return false;
	}

	this._mouseMovePosition.x = e.clientX;
	this._mouseMovePosition.y = e.clientY;

	this._mouseMoveThrottle.fire();

	if ( this._intersectedObject ) {

		var camera = this._cameraController.activeCamera;

		feng.pubsub.publish( feng.PubSub.Topic.TRIGGER_SELECTOR, this._intersectedObject, camera, this._viewSize );

	} else {

		feng.pubsub.publish( feng.PubSub.Topic.UNTRIGGER_SELECTOR );
	}
};


feng.views.sections.controls.ObjectSelector.prototype.onAnimationFrame = function( now ) {

	var progress = Math.min( 1, ( now - this._startTime ) / this._duration );
	//console.log('object select progress: ' + progress);

	this._fillSprite.setProgress( progress );

	if ( progress === 1 ) {

		this._eventHandler.unlisten( document, feng.events.EventType.INPUT_MOVE, this.onMouseDownCancel, false, this );
		this._eventHandler.unlisten( document, feng.events.EventType.INPUT_UP, this.onMouseDownCancel, false, this );

		goog.fx.anim.unregisterAnimation( this );

		this.doSelect();
	}

	this._callbacks[ 'onProgress' ]( this._downObject, progress );
};