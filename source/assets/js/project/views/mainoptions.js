goog.provide('feng.views.MainOptions');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.query');
goog.require('goog.events');
goog.require('goog.dom.fullscreen');


/**
 * @constructor
 */
feng.views.MainOptions = function(){

  goog.base(this);

  this.domElement = goog.dom.getElement('main-options');

  this._howtoplayButton = goog.dom.query('.howtoplay .button', this.domElement)[0];
  this._fullscreenButton = goog.dom.query('.fullscreen .button', this.domElement)[0];
  this._soundButton = goog.dom.query('.sound .button', this.domElement)[0];
  this._shareButton = goog.dom.query('.share .button', this.domElement)[0];
  this._facebookButton = goog.dom.query('.facebook', this.domElement)[0];
  this._twitterButton = goog.dom.query('.twitter', this.domElement)[0];
  this._googleButton = goog.dom.query('.google', this.domElement)[0];

  if(!goog.dom.fullscreen.isSupported()) {
  	goog.style.showElement(this._fullscreenButton.parentNode, false);
  }

  goog.events.listen(this._howtoplayButton, 'click', this.onClick, false, this);
  goog.events.listen(this._fullscreenButton, 'click', this.onClick, false, this);
  goog.events.listen(this._soundButton, 'click', this.onClick, false, this);
  goog.events.listen(this._facebookButton, 'click', this.onClick, false, this);
  goog.events.listen(this._twitterButton, 'click', this.onClick, false, this);
  goog.events.listen(this._googleButton, 'click', this.onClick, false, this);
  goog.events.listen(this._shareButton, 'mouseover', this.onMouseOverShare, false, this);
};
goog.inherits(feng.views.MainOptions, goog.events.EventTarget);


feng.views.MainOptions.prototype.onClick = function(e){

	switch(e.currentTarget) {
		case this._howtoplayButton:

		break;

		case this._fullscreenButton:

		if(goog.dom.fullscreen.isFullScreen()) {

			goog.dom.fullscreen.exitFullScreen();

		}else {

			goog.dom.fullscreen.requestFullScreen( document.body );
		}
		break;

		case this._soundButton:

		break;

		case this._facebookButton:
		case this._twitterButton:
		case this._googleButton:

		break;
	}
};


feng.views.MainOptions.prototype.onMouseOverShare = function(e){


};