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
  this._sounds[ feng.controllers.SoundController.SoundType.SFX ] = {};
  this._sounds[ feng.controllers.SoundController.SoundType.AMBIENT ] = {};
  this._sounds[ feng.controllers.SoundController.SoundType.LOOP ] = {};

  this._tweeners = {};
  this._tweeners[ feng.controllers.SoundController.SoundType.SFX ] = {};
  this._tweeners[ feng.controllers.SoundController.SoundType.AMBIENT ] = {};
  this._tweeners[ feng.controllers.SoundController.SoundType.LOOP ] = {};

  var onSoundLoad = goog.bind(this.onSoundLoad, this);

  var urls = function(filename) {
    var result = [
      feng.Config['assetsPath'] + 'audio/' + filename + '.mp3',
      feng.Config['assetsPath'] + 'audio/' + filename + '.ogg',
      feng.Config['assetsPath'] + 'audio/' + filename + '.wav'
    ];

    return result;
  };

  this._data = {};

  this._data[ feng.controllers.SoundController.SoundType.SFX ] = {
    'click': {
      urls: urls('sfx/click'),
      onload: onSoundLoad
    }
  };

  this._data[ feng.controllers.SoundController.SoundType.AMBIENT ] = {
    'studio': {
      urls: urls('ambient/city-distant-traffic'),
      volume: 0,
      onload: onSoundLoad
    },
    'townhouse': {
      urls: urls('ambient/subdivision'),
      volume: 0,
      onload: onSoundLoad
    }
  };

  this._data[ feng.controllers.SoundController.SoundType.LOOP ] = {
    'family-breakfast': {
      urls: urls('loop/family-breakfast'),
      volume: 0,
      onload: onSoundLoad
    },
    'first-class': {
      urls: urls('loop/first-class'),
      volume: 0,
      onload: onSoundLoad
    },
    'optimize-loop-1': {
      urls: urls('loop/optimize-loop-1'),
      volume: 0,
      onload: onSoundLoad
    },
    'serendipity': {
      urls: urls('loop/serendipity'),
      volume: 0,
      onload: onSoundLoad
    },
    'trees': {
      urls: urls('loop/trees'),
      volume: 0,
      onload: onSoundLoad
    }
  };

  this._ambient = null;
  this._loop = null;

  this._numSoundsToLoad = 0;
  this._numSoundsLoaded = 0;
  this._isLoaded = false;
  this._isMuted = false;

  if(feng.storageController.isSoundEnabled()) {
    this.unmute();
  }else {
    this.mute();
  }
};
goog.inherits(feng.controllers.SoundController, goog.events.EventTarget);
goog.addSingletonGetter(feng.controllers.SoundController);


feng.controllers.SoundController.prototype.load = function(){

  this._numSoundsLoaded = 0;

  goog.object.forEach(this._data, function(soundDatas, soundType) {

    goog.object.forEach(soundDatas, function(soundData, soundId) {

      var sound = new Howl(soundData);
      this._sounds[ soundType ][ soundId ] = sound;

      var tweener = {
        sound: sound,
        volume: sound.volume(),
        stopAfterComplete: false
      };
      this._tweeners[ soundType ][ soundId ] = tweener;

      this._numSoundsToLoad ++;
    }, this);

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


feng.controllers.SoundController.prototype.getSfx = function( id ){
  
  return this._sounds[ feng.controllers.SoundController.SoundType.SFX ][ id ];
};


feng.controllers.SoundController.prototype.getAmbient = function( id ){
  
  return this._sounds[ feng.controllers.SoundController.SoundType.AMBIENT ][ id ];
};


feng.controllers.SoundController.prototype.getLoop = function( id ){
  
  return this._sounds[ feng.controllers.SoundController.SoundType.LOOP ][ id ];
};


feng.controllers.SoundController.prototype.getSfxTweener = function( id ){
  
  return this._tweeners[ feng.controllers.SoundController.SoundType.SFX ][ id ];
};


feng.controllers.SoundController.prototype.getAmbientTweener = function( id ){
  
  return this._tweeners[ feng.controllers.SoundController.SoundType.AMBIENT ][ id ];
};


feng.controllers.SoundController.prototype.getLoopTweener = function( id ){
  
  return this._tweeners[ feng.controllers.SoundController.SoundType.LOOP ][ id ];
};


feng.controllers.SoundController.prototype.playSfx = function( id ){

  var sound = this.getSfx( id );

  if(!this._isLoaded) {
    return sound;
  }

  sound.play();

  return sound;
};


feng.controllers.SoundController.prototype.playAmbient = function( id ){
  
  var sound = this.getAmbient( id );

  if(this._ambient) {

    if(this._isLoaded) {
      this._ambient.stop();
    }

    this._ambient = null;
  }

  if(!this._isLoaded) {

    this._ambient = sound;
    return sound;
  }

  sound.pause();
  sound.play();

  return sound;
};


feng.controllers.SoundController.prototype.playLoop = function( id ){
  
  var sound = this.getLoop( id );

  if(this._loop) {

    if(this._isLoaded) {
      this._loop.stop();
    }

    this._loop = null;
  }

  if(!this._isLoaded) {

    this._loop = sound;
    return sound;
  }

  sound.pause();
  sound.play();

  return sound;
};


feng.controllers.SoundController.prototype.fadeLoop = function( id, from, to, duration, stopAfterComplete ){

  var sound = this.playLoop( id );

  var tweener = this.getLoopTweener( id );
  tweener.volume = from || sound.volume();
  tweener.stopAfterComplete = stopAfterComplete;

  var duration = duration || 1;

  TweenMax.to(tweener, duration, {
    volume: to,
    'onUpdate': this.onFadeUpdate,
    'onUpdateParams': [ tweener ],
    'onUpdateScope': this,
    'onComplete': this.onFadeComplete,
    'onCompleteParams': [ tweener ],
    'onCompleteScope': this
  });
};


feng.controllers.SoundController.prototype.fadeAmbient = function( id, from, to, duration, stopAfterComplete ){

  var sound = this.playAmbient( id );

  var tweener = this.getAmbientTweener( id );
  tweener.volume = from || sound.volume();
  tweener.stopAfterComplete = stopAfterComplete;

  var duration = duration || 1;

  TweenMax.to(tweener, duration, {
    volume: to,
    'onUpdate': this.onFadeUpdate,
    'onUpdateParams': [ tweener ],
    'onUpdateScope': this,
    'onComplete': this.onFadeComplete,
    'onCompleteParams': [ tweener ],
    'onCompleteScope': this
  });
};


feng.controllers.SoundController.prototype.onFadeUpdate = function( param ){

  var sound = param.sound;
  var vol = param.volume;

  sound.volume( vol );
};


feng.controllers.SoundController.prototype.onFadeComplete = function( param ){

  var sound = param.sound;
  var stopAfterComplete = param.stopAfterComplete;

  if(stopAfterComplete === true) {
    sound.stop();
  }
};


feng.controllers.SoundController.prototype.onSoundLoad = function(){

  this._numSoundsLoaded ++;
  
  if(this._numSoundsLoaded === this._numSoundsToLoad) {
    this.onLoadComplete();
  }
};


feng.controllers.SoundController.prototype.onLoadComplete = function(){
  
  this._isLoaded = true;

  console.log('all sounds loaded: ', this._sounds);
};


feng.controllers.SoundController.SoundType = {
  SFX: 'sfx',
  AMBIENT: 'ambient',
  LOOP: 'loop'
};