goog.provide('feng.views.helpers.CompassHelper');

goog.require('feng.views.helpers.Helper');

/**
 * @constructor
 */
feng.views.helpers.CompassHelper = function( domElement ){

  goog.base(this, domElement);

  this._compassEl = null;
};
goog.inherits(feng.views.helpers.CompassHelper, feng.views.helpers.Helper);


feng.views.helpers.CompassHelper.prototype.disposeInternal = function() {

  goog.base(this, 'disposeInternal');

  this._compassEl = null;
};


feng.views.helpers.CompassHelper.prototype.activate = function() {

	goog.base(this, 'activate');

	feng.pubsub.subscribe( feng.PubSub.Topic.TRIGGER_COMPASS, this.onTriggerCompass, this );
	feng.pubsub.subscribe( feng.PubSub.Topic.UNTRIGGER_COMPASS, this.onUntriggerCompass, this );
	feng.pubsub.subscribe( feng.PubSub.Topic.COMPLETE_COMPASS, this.onCompleteCompass, this );
};


feng.views.helpers.CompassHelper.prototype.deactivate = function() {

  	goog.base(this, 'deactivate');

  	feng.pubsub.unsubscribe( feng.PubSub.Topic.TRIGGER_COMPASS, this.onTriggerCompass, this );
  	feng.pubsub.unsubscribe( feng.PubSub.Topic.UNTRIGGER_COMPASS, this.onUntriggerCompass, this );
  	feng.pubsub.unsubscribe( feng.PubSub.Topic.COMPLETE_COMPASS, this.onCompleteCompass, this );
};


feng.views.helpers.CompassHelper.prototype.updateCompassBox = function() {

	if(!this._compassEl) return;

	var position = goog.style.getPageOffset( this._compassEl );
	var size = goog.style.getSize( this._compassEl );

	this._box.top = position.y;
	this._box.right = position.x + size.width;
	this._box.bottom = position.y + size.height;
	this._box.left = position.x;
};


feng.views.helpers.CompassHelper.prototype.onTriggerCompass = function( compass ) {

	if(this.hasOtherWidgetShown) {
		return;
	}
	
	this._compassEl = compass.domElement;

	this.updateCompassBox();

	this.show( this._box );
};


feng.views.helpers.CompassHelper.prototype.onUntriggerCompass = function() {

	this.hide();
};


feng.views.helpers.CompassHelper.prototype.onCompleteCompass = function() {

	this.doComplete();
};


feng.views.helpers.CompassHelper.prototype.onResize = function(e) {

	this.updateCompassBox();

	goog.base(this, 'onResize', e);
};