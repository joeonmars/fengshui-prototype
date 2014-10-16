goog.provide('feng.controllers.KeyboardController');

goog.require('goog.events.EventTarget');
goog.require('goog.events.KeyHandler');
goog.require('goog.object');
goog.require('goog.string');

/**
 * @constructor
 */
feng.controllers.KeyboardController = function(){
	
  goog.base(this);

  this.key = {
  	ESC: goog.events.KeyCodes.ESC,
  	ENTER: goog.events.KeyCodes.ENTER,
  	LEFT: goog.events.KeyCodes.LEFT,
  	RIGHT: goog.events.KeyCodes.RIGHT,
  	UP: goog.events.KeyCodes.UP,
  	DOWN: goog.events.KeyCodes.DOWN
  };

  this._bindMappings = {
  	/*
		'id': {'handler': function, 'keycode': number}
  	*/
  };

  this._keycodeMappings = {
  	/*
		'keycode': [id, id...]
  	*/
  };

  this._keyHandler = new goog.events.KeyHandler(document);

  goog.events.listen( this._keyHandler, goog.events.KeyHandler.EventType.KEY, this.onKey, false, this);
};
goog.inherits(feng.controllers.KeyboardController, goog.events.EventTarget);
goog.addSingletonGetter(feng.controllers.KeyboardController);


feng.controllers.KeyboardController.prototype.bind = function(handler, keycode, once){

	var duplicateId = goog.object.findKey( this._bindMappings, function(id, obj) {
		return (obj.handler === handler && obj.keycode === keycode && obj.once === once);
	});

	if(duplicateId) {
		return duplicateId;
	}

	// add bind mapping
	var id = goog.string.getRandomString();

	var val = {
		handler: handler,
		keycode: keycode,
		once: once
	};

	goog.object.set( this._bindMappings, id, val );

	// add keycode mapping
	this._keycodeMappings[keycode] = this._keycodeMappings[keycode] || [];
	goog.array.insert( this._keycodeMappings[keycode], id );

	return id;
};


feng.controllers.KeyboardController.prototype.unbind = function(id){

	var bindMapping = this._bindMappings[ id ];

	if(!bindMapping) return;

	var keycode = bindMapping.keycode;

	goog.array.remove( this._keycodeMappings[keycode], id );

	goog.object.remove( this._bindMappings, id );
};


feng.controllers.KeyboardController.prototype.onKey = function(e){

  var bindIds = this._keycodeMappings[ e.keyCode ];

  if(!bindIds || e.repeat) return false;

  goog.array.forEach(bindIds, function(id) {

  	var bindMapping = this._bindMappings[id];
  	bindMapping.handler();

  	if( bindMapping.once ) {
  		this.unbind( id );
  	}
  }, this);
};