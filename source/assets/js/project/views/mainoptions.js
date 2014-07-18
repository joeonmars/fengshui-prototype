goog.provide('feng.views.MainOptions');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.query');
goog.require('goog.events');


/**
 * @constructor
 */
feng.views.MainOptions = function(){

  goog.base(this);

  this.domElement = goog.dom.getElement('main-options');

  this._howtoplayButton = goog.dom.query('.howtoplay', this.domElement)[0];
  this._soundButton = goog.dom.query('.sound', this.domElement)[0];
  this._facebookButton = goog.dom.query('.facebook', this.domElement)[0];
  this._twitterButton = goog.dom.query('.twitter', this.domElement)[0];
  this._googleButton = goog.dom.query('.google', this.domElement)[0];

  if( !feng.storageController.isSoundEnabled() ) {
  	this.onMute();
  }

  goog.events.listen(this._howtoplayButton, 'click', this.onClick, false, this);
  goog.events.listen(this._soundButton, 'click', this.onClick, false, this);
  goog.events.listen(this._facebookButton, 'click', this.onClick, false, this);
  goog.events.listen(this._twitterButton, 'click', this.onClick, false, this);
  goog.events.listen(this._googleButton, 'click', this.onClick, false, this);

  feng.soundController.listen( feng.events.EventType.MUTE, this.onMute, false, this);
  feng.soundController.listen( feng.events.EventType.UNMUTE, this.onUnmute, false, this);
};
goog.inherits(feng.views.MainOptions, goog.events.EventTarget);


feng.views.MainOptions.prototype.onClick = function(e){

	switch(e.currentTarget) {
		case this._howtoplayButton:
    feng.tutorial.toggle();
		break;

		case this._soundButton:
		feng.soundController.toggle();
		break;

		case this._facebookButton:
		case this._twitterButton:
		case this._googleButton:

		break;
	}
};


feng.views.MainOptions.prototype.onMute = function(e){

	goog.dom.classes.add( this._soundButton, 'mute' );
};


feng.views.MainOptions.prototype.onUnmute = function(e){

	goog.dom.classes.remove( this._soundButton, 'mute' );
};