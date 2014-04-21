goog.provide('feng.controllers.controls.InteractionResolver');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('feng.controllers.controls.PhysicsInteraction');
goog.require('feng.views.view3dobject.InteractiveObject');


/**
 * @constructor
 */
feng.controllers.controls.InteractionResolver = function(){

	goog.base(this);

	this._rotateTweener = null;

	var _startInteraction = goog.bind(this.startInteraction, this);
	var _endInteraction = goog.bind(this.endInteraction, this);
  this._physicsinteraction = new feng.controllers.controls.PhysicsInteraction(_startInteraction, _endInteraction);

  this._eventHandler = new goog.events.EventHandler( this );
};
goog.inherits(feng.controllers.controls.InteractionResolver, goog.events.EventTarget);
goog.addSingletonGetter(feng.controllers.controls.InteractionResolver);


feng.controllers.controls.InteractionResolver.prototype.resolve = function( object, interaction, options ){

	this._object = object;

	var physical = this._object.physical;
	var object3d = this._object.object3d;

	var interaction = feng.views.view3dobject.InteractiveObject.Interaction;

	switch(e.interaction) {

		case interaction.MOVE:

			if(physical) {
				var worldWidth = options.worldWidth;
				var worldHeight = options.worldHeight;
				var collidableBoxes = options.collidableBoxes;
				var objectBox = options.objectBox;

				this._physicsinteraction.setPhysicsWorld( worldWidth, worldHeight );
				this._physicsinteraction.resolve( object, collidableBoxes, objectBox );
			}
			break;

		case interaction.ROTATE:

			if(physical) {
				var worldWidth = options.worldWidth;
				var worldHeight = options.worldHeight;
				var collidableBoxes = options.collidableBoxes;
				var objectBox = options.objectBox;

				this._physicsinteraction.setPhysicsWorld( worldWidth, worldHeight );
				this._physicsinteraction.resolve( object, collidableBoxes, objectBox );

			}else {

				if(this._rotateTweener && this._rotateTweener.isActive()) return;

				var y = object3d.rotation.y;

				this._rotateTweener = TweenMax.to(object3d.rotation, .2, {
					y: y + Math.PI / 2
				});
			}
			break;

		case 'close':
			this.endInteraction( e.interaction );
			break;
	}
};


feng.controllers.controls.InteractionResolver.prototype.startInteraction = function(interaction) {

	this.dispatchEvent({
		type: feng.events.EventType.START,
		interaction: interaction
	});
};


feng.controllers.controls.InteractionResolver.prototype.endInteraction = function(interaction) {

	this.dispatchEvent({
		type: feng.events.EventType.END,
		interaction: interaction
	});
};