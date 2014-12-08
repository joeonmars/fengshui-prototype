goog.provide('feng.views.helpers.SelectorHelper');

goog.require('feng.views.helpers.Helper');

/**
 * @constructor
 */
feng.views.helpers.SelectorHelper = function( domElement ){

  goog.base(this, domElement);

  this._positionPriority = feng.views.helpers.Helper.POSITION_PRIORITY.VERTICAL;

  this._object3d = null;
  this._camera = null;
  this._viewSize = null;
  this._box3 = new THREE.Box3();
};
goog.inherits(feng.views.helpers.SelectorHelper, feng.views.helpers.Helper);


feng.views.helpers.SelectorHelper.prototype.disposeInternal = function() {

	goog.base(this, 'disposeInternal');

	this._object3d = null;
	this._camera = null;
	this._viewSize = null;
};


feng.views.helpers.SelectorHelper.prototype.activate = function() {

	goog.base(this, 'activate');

	feng.pubsub.subscribe( feng.PubSub.Topic.TRIGGER_SELECTOR, this.onTriggerSelector, this );
	feng.pubsub.subscribe( feng.PubSub.Topic.UNTRIGGER_SELECTOR, this.onUntriggerSelector, this );
	feng.pubsub.subscribe( feng.PubSub.Topic.COMPLETE_SELECTOR, this.onCompleteSelector, this );
};


feng.views.helpers.SelectorHelper.prototype.deactivate = function() {

  	goog.base(this, 'deactivate');

  	feng.pubsub.unsubscribe( feng.PubSub.Topic.TRIGGER_SELECTOR, this.onTriggerSelector, this );
  	feng.pubsub.unsubscribe( feng.PubSub.Topic.UNTRIGGER_SELECTOR, this.onUntriggerSelector, this );
  	feng.pubsub.unsubscribe( feng.PubSub.Topic.COMPLETE_SELECTOR, this.onCompleteSelector, this );

  	goog.fx.anim.unregisterAnimation( this );
};


feng.views.helpers.SelectorHelper.prototype.onTriggerSelector = function( object3d, camera, viewSize ) {

	if(this.hasOtherWidgetShown) {
		return;
	}
	
	this._object3d = object3d;
	this._camera = camera;
	this._viewSize = viewSize;

	this.show();

	goog.fx.anim.registerAnimation( this );
};


feng.views.helpers.SelectorHelper.prototype.onUntriggerSelector = function() {

	this.hide();

	goog.fx.anim.unregisterAnimation( this );
};


feng.views.helpers.SelectorHelper.prototype.onCompleteSelector = function() {

	this.doComplete();
};


feng.views.helpers.SelectorHelper.prototype.onAnimationFrame = function( now ) {

	var pos3d = this._box3.setFromObject( this._object3d ).center();
	var pos2d = feng.utils.ThreeUtils.get2DCoordinates( pos3d, this._camera, this._viewSize );

	this._box.top = pos2d.y - 50;
	this._box.right = pos2d.x + 50;
	this._box.bottom = pos2d.y + 50;
	this._box.left = pos2d.x - 50;

	this.calculatePosition( this._box );

	this.updatePosition();
};