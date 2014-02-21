goog.provide('fengshui.controllers.NavigationController');

goog.require('goog.events.EventTarget');
goog.require('goog.events');
goog.require('goog.History');
goog.require('goog.history.Html5History');
goog.require('goog.history.EventType');
goog.require('goog.string');

/**
 * @constructor
 */
fengshui.controllers.NavigationController = function(){
  goog.base(this);

  // a toggle of whether to use history API
  this._useHistoryAPI = null;

  // the current token
  this._token = null;

  // the history object
  this._navHistory = null;
};
goog.inherits(fengshui.controllers.NavigationController, goog.events.EventTarget);
goog.addSingletonGetter(fengshui.controllers.NavigationController);


fengshui.controllers.NavigationController.prototype.init = function(){
  this._useHistoryAPI = (fengshui.controllers.NavigationController.Implementation === fengshui.controllers.NavigationController.HISTORY_API);

  if(this._useHistoryAPI) {
  	this._navHistory = new goog.history.Html5History();
  	this._navHistory.setUseFragment(false);
  }else {
  	this._navHistory = new goog.History(false);
  }

  // the current token
  // "token/token/..."
  this._token = null;

  goog.events.listen(this._navHistory, goog.history.EventType.NAVIGATE, this.onNavigate, false, this);

  this._navHistory.setEnabled(true);
};


fengshui.controllers.NavigationController.prototype.setToken = function(token, title){

	this._navHistory.setToken(token, title);
};


fengshui.controllers.NavigationController.prototype.getTokenString = function(){

	return this._token;
};


fengshui.controllers.NavigationController.prototype.getTokenArray = function(){

	var tokens = this._token.split('/');

	if(tokens.length > 0) {
		if(tokens[0] === '') tokens.shift();
	}else {
		tokens = null;
	}

	return tokens;
};


fengshui.controllers.NavigationController.prototype.replaceToken = function(token, title){

	this._navHistory.replaceToken(token ,title);
};


fengshui.controllers.NavigationController.prototype.handleToken = function(tokenString, tokenArray){

	console.log('handle token: ' + tokenString);

	this.dispatchEvent({
		type: fengshui.events.EventType.CHANGE,
		tokenString: tokenString,
		tokenArray: tokenArray
	});
};


fengshui.controllers.NavigationController.prototype.getUrlBeforeHash = function(token){
	
	var url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '') + window.location.pathname;
	return url;
};


fengshui.controllers.NavigationController.prototype.onNavigate = function(e){

	// normalize event token format between history api and hash
	// always being 'token/token...'
	var eToken = e.token;

	if(goog.string.startsWith(eToken, '#/')) {
		eToken.replace('#/', '');
	}else if(goog.string.startsWith(eToken, '/')) {
		eToken.replace('/', '');
	}

	if(this._token === eToken) return false;
	else this._token = eToken;

	this.handleToken( this.getTokenString(), this.getTokenArray() );
};


fengshui.controllers.NavigationController.HASH = 'hash';
fengshui.controllers.NavigationController.HISTORY_API = 'history_api';
fengshui.controllers.NavigationController.Implementation = (goog.history.Html5History.isSupported() ? fengshui.controllers.NavigationController.HISTORY_API : fengshui.controllers.NavigationController.HASH);