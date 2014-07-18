goog.provide('feng.controllers.SoundController');

goog.require('goog.events.EventTarget');
goog.require('goog.object');
goog.require('goog.Timer');
goog.require('goog.labs.dom.PageVisibilityMonitor');
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

  this._numSoundsToLoad = 0;
  this._numSoundsLoaded = 0;
  this._isLoaded = false;
  this._isMuted = false;

  // define sound data to load
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
    },
    'page-flip': {
      urls: urls('sfx/page-flip'),
      onload: onSoundLoad
    }
  };

  this._data[ feng.controllers.SoundController.SoundType.AMBIENT ] = {
    'studio': {
      urls: urls('ambient/city-distant-traffic'),
      volume: 0,
      loop: true,
      onload: onSoundLoad
    },
    'townhouse': {
      urls: urls('ambient/subdivision'),
      volume: 0,
      loop: true,
      onload: onSoundLoad
    }
  };

  this._data[ feng.controllers.SoundController.SoundType.LOOP ] = {
    'family-breakfast': {
      urls: urls('loop/family-breakfast'),
      volume: 0,
      loop: true,
      onload: onSoundLoad
    },
    'first-class': {
      urls: urls('loop/first-class'),
      volume: 0,
      loop: true,
      onload: onSoundLoad
    },
    'optimize-loop-1': {
      urls: urls('loop/optimize-loop-1'),
      volume: 0,
      loop: true,
      onload: onSoundLoad
    },
    'serendipity': {
      urls: urls('loop/serendipity'),
      volume: 0,
      loop: true,
      onload: onSoundLoad
    },
    'trees': {
      urls: urls('loop/trees'),
      volume: 0,
      loop: true,
      onload: onSoundLoad
    }
  };

  // create sound from data
  goog.object.forEach(this._data, function(soundDatas, soundType) {

    goog.object.forEach(soundDatas, function(soundData, soundId) {

      var sound = new Howl(soundData);
      sound.soundId = soundId;
      sound.soundType = soundType;

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

  // create sound mixes
  var fadeAmbient = goog.bind(this.fadeAmbient, this);
  var fadeLoop = goog.bind(this.fadeLoop, this);

  this._mix = {
    'studio': {
      position: 0,
      timer: new goog.Timer(25000),
      sounds: [
        this.getAmbient('studio'),
        this.getLoop('optimize-loop-1'),
        this.getAmbient('studio'),
        this.getLoop('trees'),
        this.getAmbient('studio'),
        this.getLoop('serendipity'),
        this.getAmbient('studio'),
        this.getLoop('first-class'),
        this.getAmbient('studio'),
        this.getLoop('family-breakfast')
      ],
      fadeAmbient: fadeAmbient,
      fadeLoop: fadeLoop
    },
    'townhouse': {
      position: 0,
      timer: new goog.Timer(25000),
      sounds: [
        this.getAmbient('townhouse'),
        this.getLoop('optimize-loop-1'),
        this.getAmbient('townhouse'),
        this.getLoop('trees'),
        this.getAmbient('townhouse'),
        this.getLoop('serendipity'),
        this.getAmbient('townhouse'),
        this.getLoop('first-class'),
        this.getAmbient('townhouse'),
        this.getLoop('family-breakfast')
      ],
      fadeAmbient: fadeAmbient,
      fadeLoop: fadeLoop
    }
  };

  goog.object.forEach(this._mix, function(mix) {

    var onMixTick = goog.bind(this.onMixTick, mix);
    mix.timer.listen( goog.Timer.TICK, onMixTick );

  }, this);

  if(feng.storageController.isSoundEnabled()) {
    this.unmute();
  }else {
    this.mute();
  }

  // page visibility events
  var pageVisibilityMonitor = new goog.labs.dom.PageVisibilityMonitor;
  if( pageVisibilityMonitor.isSupported() ) {
    var eventType = pageVisibilityMonitor.getBrowserEventType_();
    goog.events.listen(pageVisibilityMonitor, eventType, this.onPageVisible);
  }
};
goog.inherits(feng.controllers.SoundController, goog.events.EventTarget);
goog.addSingletonGetter(feng.controllers.SoundController);


feng.controllers.SoundController.prototype.getSound = function( id ){
  
  return this._sounds[ id ];
};


feng.controllers.SoundController.prototype.mute = function(){
  
  Howler.mute();

  this._isMuted = true;

  feng.storageController.onSoundEnabled( false );

  this.dispatchEvent( feng.events.EventType.MUTE );
};


feng.controllers.SoundController.prototype.unmute = function(){
  
  Howler.unmute();

  this._isMuted = false;

  feng.storageController.onSoundEnabled( true );

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

  if(!this._isLoaded) {

    return sound;
  }

  sound.pause();
  sound.play();

  return sound;
};


feng.controllers.SoundController.prototype.playLoop = function( id ){
  
  var sound = this.getLoop( id );

  if(!this._isLoaded) {

    return sound;
  }

  sound.pause();
  sound.play();

  return sound;
};


feng.controllers.SoundController.prototype.playMix = function( mixId ){
  
  var mix = this._mix[ mixId ];
  mix.timer.start();

  mix.position = 0;

  var sound = mix.sounds[ mix.position ];
  this.fadeAmbient( sound.soundId, 0, 1, 5 );
};


feng.controllers.SoundController.prototype.stopMix = function( mixId ){
  
  var mix = this._mix[ mixId ];
  mix.timer.stop();

  var sound = mix.sounds[ mix.position ];

  if(sound.soundType === feng.controllers.SoundController.SoundType.AMBIENT) {

    this.fadeAmbient( sound.soundId, null, 0, 5, true );

  }else if(sound.soundType === feng.controllers.SoundController.SoundType.LOOP) {

    this.fadeLoop( sound.soundId, null, 0, 5, true );
  }

  mix.position = 0;
};


feng.controllers.SoundController.prototype.fade = function( tweener, from, to, duration, stopAfterComplete ){

  tweener.volume = from || tweener.sound.volume();
  tweener.stopAfterComplete = stopAfterComplete;

  var duration = duration || 1;

  TweenMax.to(tweener, duration, {
    volume: to,
    'ease': Linear.easeNone,
    'onUpdate': this.onFadeUpdate,
    'onUpdateParams': [ tweener ],
    'onUpdateScope': this,
    'onComplete': this.onFadeComplete,
    'onCompleteParams': [ tweener ],
    'onCompleteScope': this
  });
};


feng.controllers.SoundController.prototype.fadeLoop = function( id, from, to, duration, stopAfterComplete ){

  var sound = this.playLoop( id );

  var tweener = this.getLoopTweener( id );

  this.fade( tweener, from, to, duration, stopAfterComplete );
};


feng.controllers.SoundController.prototype.fadeAmbient = function( id, from, to, duration, stopAfterComplete ){

  var sound = this.playAmbient( id );

  var tweener = this.getAmbientTweener( id );
  
  this.fade( tweener, from, to, duration, stopAfterComplete );
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


feng.controllers.SoundController.prototype.onMixTick = function( e ){

  var mix = this;
  var sounds = mix.sounds;

  var lastSound = sounds[ mix.position ];

  if(lastSound.soundType === feng.controllers.SoundController.SoundType.AMBIENT) {

    this.fadeAmbient( lastSound.soundId, null, .4, 10 );

  }else if(lastSound.soundType === feng.controllers.SoundController.SoundType.LOOP) {

    this.fadeLoop( lastSound.soundId, null, 0, 10, true );
  }

  mix.position ++;

  if(mix.position >= mix.sounds.length) {
    mix.position = 0;
  }

  var nextSound = sounds[ mix.position ];

  if(nextSound.soundType === feng.controllers.SoundController.SoundType.AMBIENT) {

    this.fadeAmbient( nextSound.soundId, 0, 1, 10 );

  }else if(nextSound.soundType === feng.controllers.SoundController.SoundType.LOOP) {

    this.fadeLoop( nextSound.soundId, 0, .5, 10 );
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


feng.controllers.SoundController.prototype.onPageVisible = function(e){

  if(e.hidden) {

    if(!Howler._muted) {

      Howler.volume( 0 );
    }

  }else {

    if(!Howler._muted) {

      Howler.volume( 1 );
    }
  }
};


feng.controllers.SoundController.SoundType = {
  SFX: 'sfx',
  AMBIENT: 'ambient',
  LOOP: 'loop'
};