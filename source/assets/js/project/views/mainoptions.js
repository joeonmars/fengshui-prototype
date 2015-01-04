goog.provide('feng.views.MainOptions');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.query');
goog.require('goog.events');
goog.require('feng.utils.Utils');


/**
 * @constructor
 */
feng.views.MainOptions = function(){

  goog.base(this);

  this.domElement = goog.dom.getElement('main-options');

  this._infoButton = goog.dom.query('.info', this.domElement)[0];
  this._instructionsButton = goog.dom.query('.instructions', this.domElement)[0];
  this._creditsButton = goog.dom.query('.credits', this.domElement)[0];
  this._soundButton = goog.dom.query('.sound', this.domElement)[0];
  this._soundOnButton = goog.dom.getElementByClass('on', this._soundButton);
  this._soundOffButton = goog.dom.getElementByClass('off', this._soundButton);
  this._facebookButton = goog.dom.query('.facebook', this.domElement)[0];
  this._twitterButton = goog.dom.query('.twitter', this.domElement)[0];
  this._googleButton = goog.dom.query('.google', this.domElement)[0];

  this.showHelpButton( false );

  if( !feng.storageController.isSoundEnabled() ) {
  	this.onMute();
  }

  goog.events.listen(this._instructionsButton, 'click', this.onClick, false, this);
  goog.events.listen(this._creditsButton, 'click', this.onClick, false, this);
  goog.events.listen(this._soundOnButton, 'click', this.onClick, false, this);
  goog.events.listen(this._soundOffButton, 'click', this.onClick, false, this);
  goog.events.listen(this._facebookButton, 'click', this.onClick, false, this);
  goog.events.listen(this._twitterButton, 'click', this.onClick, false, this);
  goog.events.listen(this._googleButton, 'click', this.onClick, false, this);

  feng.soundController.listen( feng.events.EventType.MUTE, this.onMute, false, this);
  feng.soundController.listen( feng.events.EventType.UNMUTE, this.onUnmute, false, this);
};
goog.inherits(feng.views.MainOptions, goog.events.EventTarget);


feng.views.MainOptions.prototype.showHelpButton = function( shouldShow ){

  goog.style.showElement( this._infoButton, shouldShow );
};


feng.views.MainOptions.prototype.onClick = function(e){

	switch(e.currentTarget) {
		case this._instructionsButton:
    feng.tutorial.toggle();
		break;

    case this._creditsButton:
    feng.credits.toggle();
    break;

		case this._soundOnButton:
		feng.soundController.unmute();
		break;

    case this._soundOffButton:
    feng.soundController.mute();
    break;

		case this._facebookButton:
		case this._twitterButton:
		case this._googleButton:
    e.preventDefault();
    feng.utils.Utils.popUp( e.currentTarget.href );
		break;
	}
};


feng.views.MainOptions.prototype.onMute = function(e){

	goog.dom.classes.add( this._soundButton, 'mute' );
};


feng.views.MainOptions.prototype.onUnmute = function(e){

	goog.dom.classes.remove( this._soundButton, 'mute' );
};