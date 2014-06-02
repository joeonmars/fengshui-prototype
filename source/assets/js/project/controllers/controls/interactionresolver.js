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
  this._physicsInteraction = new feng.controllers.controls.PhysicsInteraction(_startInteraction, _endInteraction);

  this._eventHandler = new goog.events.EventHandler( this );
};
goog.inherits(feng.controllers.controls.InteractionResolver, goog.events.EventTarget);
goog.addSingletonGetter(feng.controllers.controls.InteractionResolver);


feng.controllers.controls.InteractionResolver.prototype.resolve = function( object, interaction, options ){

	this._object = object;

	var isPhysical = this._object.isPhysical;
	var object3d = this._object.object3d;

	var type = feng.views.view3dobject.InteractiveObject.Interaction;

	switch(interaction) {

		case type.MOVE:

			if(isPhysical) {
				var worldId = options.worldId;
				var worldWidth = options.worldWidth;
				var worldHeight = options.worldHeight;
				var collidableBoxes = options.collidableBoxes;
				var objectBox = options.objectBox;
				var camera = options.camera;

				this._physicsInteraction.setPhysicsWorld( worldId, worldWidth, worldHeight );
				this._physicsInteraction.move( object, collidableBoxes, objectBox, camera );
			}
			break;

		case type.ROTATE:

			if(isPhysical) {
				var worldWidth = options.worldWidth;
				var worldHeight = options.worldHeight;
				var collidableBoxes = options.collidableBoxes;
				var objectBox = options.objectBox;
				var camera = options.camera;

				this._physicsInteraction.setPhysicsWorld( worldId, worldWidth, worldHeight );
				this._physicsInteraction.rotate( object, collidableBoxes, objectBox, camera );

			}else {

				if(this._rotateTweener && this._rotateTweener.isActive()) return;

				var y = object3d.rotation.y;

				this._rotateTweener = TweenMax.to(object3d.rotation, .2, {
					y: y + Math.PI / 2
				});
			}
			break;

		case type.CHANGE_ACCESSORY:
			var accessory = (this._object instanceof feng.views.view3dobject.AccessoryObject)
	  		? this._object
	  		: this._object.accessory;

      accessory.nextAccessory();

      this.endInteraction( interaction );
			break;

		case type.ENTER:
			this.endInteraction( interaction );
			break;

		case 'close':
			this.endInteraction( interaction );
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