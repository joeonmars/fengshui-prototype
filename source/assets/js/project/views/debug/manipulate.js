goog.provide('feng.views.debug.Manipulate');

goog.require('feng.views.debug.DebugView');
goog.require('feng.templates.debug');
goog.require('feng.controllers.controls.InteractionResolver');


/**
 * @constructor
 */
feng.views.debug.Manipulate = function(){
  goog.base(this, feng.templates.debug.ManipulateDebugView);

	this._viewPanelDom = goog.dom.getElementByClass('viewPanel', this.domElement);

	var interactionResolver = feng.controllers.controls.InteractionResolver.getInstance();
	this._eventHandler.listen(interactionResolver, feng.events.EventType.START, this.onInteractionStart, false, this);

	this.hide();
};
goog.inherits(feng.views.debug.Manipulate, feng.views.debug.DebugView);


feng.views.debug.Manipulate.prototype.onInteractionStart = function(e){

  var physics = e.target._physicsInteraction._currentPhysics;

  if(physics) {
  	goog.dom.removeChildren( this._viewPanelDom );
  	goog.dom.appendChild( this._viewPanelDom, physics.debugCanvas );
  }
};