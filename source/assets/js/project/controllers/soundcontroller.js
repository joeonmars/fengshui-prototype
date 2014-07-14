goog.provide('feng.controllers.SoundController');

goog.require('goog.events.EventTarget');
goog.require('goog.object');
goog.require('feng.events');


/**
 * @constructor
 */
feng.controllers.SoundController = function(){

  goog.base(this);

  this._sounds = {};

  this._numSoundsToLoad = 0;
  this._numSoundsLoaded = 0;

  this._data = {
    'home': {

    },
    'studio': {

    },
    'townhouse': {

    }
  };

  this._onSoundLoad = goog.bind(this.onSoundLoad, this);

  this._isMuted = false;

  if(feng.storageController.isSoundEnabled()) {
    this.unmute();
  }else {
    this.mute();
  }
};
goog.inherits(feng.controllers.SoundController, goog.events.EventTarget);
goog.addSingletonGetter(feng.controllers.SoundController);


feng.controllers.SoundController.prototype.loadSound = function( sectionId ){
  
  var data = this._data[ sectionId ];

  this._numSoundsLoaded = 0;
  this._numSoundsToLoad = goog.object.getCount( data );

  goog.object.forEach(data, function(_data, key) {
    var sound = new Howl(_data);
    sound.on('load', this._onSoundLoad);
    this._data[ key ] = sound;
  }, this);
};


feng.controllers.SoundController.prototype.getSound = function( id ){
  
  return this._sounds[ id ];
};


feng.controllers.SoundController.prototype.mute = function(){
  
  Howler.mute();

  this._isMuted = true;

  this.dispatchEvent( feng.events.EventType.MUTE );
};


feng.controllers.SoundController.prototype.unmute = function(){
  
  Howler.unmute();

  this._isMuted = false;

  this.dispatchEvent( feng.events.EventType.UNMUTE );
};


feng.controllers.SoundController.prototype.toggle = function(){
  
  if(this._isMuted) {

    this.unmute();

  }else {

    this.mute();
  }
};


feng.controllers.SoundController.prototype.play = function( id, loop ){
  
  var sound = this.getSound( id );
  sound.loop( (loop === true) ? true : false );
  sound.play();

  return sound;
};


feng.controllers.SoundController.prototype.pause = function( id ){
  
  var sound = this.getSound( id );
  sound.pause();

  return sound;
};


feng.controllers.SoundController.prototype.stop = function( id ){
  
  var sound = this.getSound( id );
  sound.stop();

  return sound;
};


feng.controllers.SoundController.prototype.onSoundLoad = function( e ){
  
  e.target.off('load', this._onSoundLoad);

  this._numSoundsLoaded ++;
  
  if(this._numSoundsLoaded === this._numSoundsToLoad) {
    this.dispatchEvent( feng.events.EventType.COMPLETE );
  }
};