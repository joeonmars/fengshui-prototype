goog.provide('feng.controllers.StorageController');

goog.require('goog.storage.mechanism.HTML5LocalStorage');

/**
 * @constructor
 */
feng.controllers.StorageController = function(){

  goog.base(this);

  if(!goog.isDef(this.isSoundEnabled())) {
    this.onSoundEnabled( true );
  }
};
goog.inherits(feng.controllers.StorageController, goog.storage.mechanism.HTML5LocalStorage);
goog.addSingletonGetter(feng.controllers.StorageController);


feng.controllers.StorageController.prototype.isEpisodeVisited = function( episodeId ){
  
  if( JSON.parse( this.get( 'episode-' + episodeId + '-visited' ) ) === true ) {

    return true;

  }else {

    return false;
  }
};


feng.controllers.StorageController.prototype.isTipUnlocked = function( tipId ){

  if( JSON.parse( this.get( 'tip-' + tipId + '-unlocked' ) ) === true ) {

    return true;
    
  }else {

    return false;
  }
};


feng.controllers.StorageController.prototype.isSoundEnabled = function(){

  if( JSON.parse( this.get( 'sound' ) ) === true ) {

    return true;
    
  }else if( JSON.parse( this.get( 'sound' ) ) === false ) {

    return false;
    
  }else {

    return undefined;
  }
};


feng.controllers.StorageController.prototype.onEpisodeVisited = function( episodeId ){
  
  this.set( 'episode-' + episodeId + '-visited', true );
};


feng.controllers.StorageController.prototype.onTipUnlocked = function( tipId ){
  
  this.set( 'tip-' + tipId + '-unlocked', true );
};


feng.controllers.StorageController.prototype.onSoundEnabled = function( enabled ){
  
  this.set( 'sound', enabled );
};