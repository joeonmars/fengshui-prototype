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
  var self = this;

  var urls = function(filename, forcedFormat) {

    var result = [];

    if(forcedFormat) {

      result[0] = feng.Config['assetsPath'] + 'audio/' + filename + '.' + forcedFormat;

    }else {

      result[0] = feng.Config['assetsPath'] + 'audio/' + filename + '.mp3';
      result[1] = feng.Config['assetsPath'] + 'audio/' + filename + '.ogg';
    }

    return result;
  };

  this._data = {};

  this._data[ feng.controllers.SoundController.SoundType.SFX ] = {
    'click': {
      'urls': urls('sfx/click'),
      'onload': onSoundLoad
    },
    'door-open': {
      'urls': urls('sfx/door-open'),
      'onload': onSoundLoad
    },
    'door-close': {
      'urls': urls('sfx/door-close'),
      'onload': onSoundLoad
    },
    'entry-open': {
      'urls': urls('sfx/entry-open'),
      'onload': onSoundLoad
    },
    'entry-close': {
      'urls': urls('sfx/entry-close'),
      'onload': onSoundLoad
    },
    'footsteps': {
      'urls': urls('sfx/footsteps'),
      'onend': goog.bind(this.replaySound, self, 'footsteps', 'sfx'),
      'onload': onSoundLoad
    },
    'refrigerator-open': {
      'urls': urls('sfx/refrigerator-open'),
      'onload': onSoundLoad
    },
    'refrigerator-close': {
      'urls': urls('sfx/refrigerator-close'),
      'onload': onSoundLoad
    },
    'water-drop': {
      'urls': urls('sfx/water-drop'),
      'onload': onSoundLoad
    }
  };

  this._data[ feng.controllers.SoundController.SoundType.AMBIENT ] = {
    'studio': {
      'urls': urls('ambient/city-distant-traffic'),
      'volume': 0,
      'onend': goog.bind(this.replaySound, self, 'studio', 'ambient'),
      'onload': onSoundLoad
    },
    'house': {
      'urls': urls('ambient/subdivision'),
      'volume': 0,
      'onend': goog.bind(this.replaySound, self, 'house', 'ambient'),
      'onload': onSoundLoad
    }
  };

  this._data[ feng.controllers.SoundController.SoundType.LOOP ] = {
    'first-class': {
      'urls': urls('loop/first-class'),
      'volume': 0,
      'onend': goog.bind(this.replaySound, self, 'first-class', 'loop'),
      'onload': onSoundLoad
    },
    'optimize-loop-1': {
      'urls': urls('loop/optimize-loop-1'),
      'volume': 0,
      'onend': goog.bind(this.replaySound, self, 'optimize-loop-1', 'loop'),
      'onload': onSoundLoad
    },
    'serendipity': {
      'urls': urls('loop/serendipity'),
      'volume': 0,
      'onend': goog.bind(this.replaySound, self, 'serendipity', 'loop'),
      'onload': onSoundLoad
    },
    'closeup': {
      'urls': urls('loop/optimize-loop-7'),
      'volume': 0,
      'onend': goog.bind(this.replaySound, self, 'closeup', 'loop'),
      'onload': onSoundLoad
    },
    'book': {
      'urls': urls('loop/optimize-loop-8'),
      'volume': 0,
      'onend': goog.bind(this.replaySound, self, 'book', 'loop'),
      'onload': onSoundLoad
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
        pauseAfterComplete: false,
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
      time: 0,
      duration: 25000,
      timer: new goog.Timer(1000),
      sounds: [
        this.getLoop('optimize-loop-1'),
        this.getAmbient('studio'),
        this.getLoop('serendipity'),
        this.getAmbient('studio'),
        this.getLoop('first-class'),
        this.getAmbient('studio')
      ],
      fadeAmbient: fadeAmbient,
      fadeLoop: fadeLoop
    },
    'house': {
      position: 0,
      time: 0,
      duration: 25000,
      timer: new goog.Timer(1000),
      sounds: [
        this.getLoop('optimize-loop-1'),
        this.getAmbient('house'),
        this.getLoop('serendipity'),
        this.getAmbient('house'),
        this.getLoop('first-class'),
        this.getAmbient('house')
      ],
      fadeAmbient: fadeAmbient,
      fadeLoop: fadeLoop
    }
  };

  goog.object.forEach(this._mix, function(mix) {

    mix.timer.listen( goog.Timer.TICK, this.onMixTick, false, mix );

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


feng.controllers.SoundController.prototype.replaySound = function( soundId, soundType ){

  var sound;

  switch(soundType) {
    case feng.controllers.SoundController.SoundType.AMBIENT:
    sound = this.getAmbient( soundId );
    break;

    case feng.controllers.SoundController.SoundType.LOOP:
    sound = this.getLoop( soundId );
    break;

    case feng.controllers.SoundController.SoundType.SFX:
    sound = this.getSfx( soundId );
    break;
  }

  sound.play();
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


feng.controllers.SoundController.prototype.playMix = function( mixId, duration, reset ){
  
  var mix = this._mix[ mixId ];

  if(mix.timer.enabled) return;
  else mix.timer.start();

  mix.position = reset ? 0 : mix.position;

  var sound = mix.sounds[ mix.position ];

  var fadeDuration = goog.isNumber(duration) ? duration : 5;

  if(sound.soundType === feng.controllers.SoundController.SoundType.AMBIENT) {

    this.fadeAmbient( sound.soundId, 0, 1, fadeDuration );

  }else if(sound.soundType === feng.controllers.SoundController.SoundType.LOOP) {

    this.fadeLoop( sound.soundId, 0, 1, fadeDuration );
  }
};


feng.controllers.SoundController.prototype.stopMix = function( mixId, duration, reset ){
  
  var mix = this._mix[ mixId ];

  if(!mix.timer.enabled) return;
  else mix.timer.stop();

  var sound = mix.sounds[ mix.position ];

  var fadeDuration = goog.isNumber(duration) ? duration : 5;

  if(sound.soundType === feng.controllers.SoundController.SoundType.AMBIENT) {

    this.fadeAmbient( sound.soundId, null, 0, duration, true );

  }else if(sound.soundType === feng.controllers.SoundController.SoundType.LOOP) {

    this.fadeLoop( sound.soundId, null, 0, duration, true );
  }

  mix.position = reset ? 0 : mix.position;
};


feng.controllers.SoundController.prototype.fade = function( tweener, from, to, duration, pauseAfterComplete, stopAfterComplete ){

  tweener.volume = goog.isNumber(from) ? from : tweener.sound.volume();
  tweener.pauseAfterComplete = pauseAfterComplete;
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


feng.controllers.SoundController.prototype.fadeLoop = function( id, from, to, duration, pauseAfterComplete, stopAfterComplete ){

  var sound = this.playLoop( id );

  var tweener = this.getLoopTweener( id );

  this.fade( tweener, from, to, duration, pauseAfterComplete, stopAfterComplete );
};


feng.controllers.SoundController.prototype.fadeAmbient = function( id, from, to, duration, pauseAfterComplete, stopAfterComplete ){

  var sound = this.playAmbient( id );

  var tweener = this.getAmbientTweener( id );
  
  this.fade( tweener, from, to, duration, pauseAfterComplete, stopAfterComplete );
};


feng.controllers.SoundController.prototype.onFadeUpdate = function( param ){

  var sound = param.sound;
  var vol = param.volume;

  sound.volume( vol );
};


feng.controllers.SoundController.prototype.onFadeComplete = function( param ){

  var sound = param.sound;
  var stopAfterComplete = param.stopAfterComplete;
  var pauseAfterComplete = param.pauseAfterComplete;

  if(stopAfterComplete === true) {
    sound.stop();
  }

  if(pauseAfterComplete === true) {
    sound.pause();
  }
};


feng.controllers.SoundController.prototype.onMixTick = function( e ){

  var mix = this;

  var shouldSwitch = false;

  if(mix.time >= mix.duration) {

    shouldSwitch = true;

    mix.time = 0;

  }else {

    mix.time += 1000;
  }

  if(!shouldSwitch) {
    
    return;
  }

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