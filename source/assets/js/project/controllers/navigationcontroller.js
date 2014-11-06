goog.provide('feng.controllers.NavigationController');

goog.require('goog.events.EventTarget');
goog.require('goog.events');
goog.require('goog.History');
goog.require('goog.history.Html5History');
goog.require('goog.history.EventType');
goog.require('goog.string');

/**
 * @constructor
 */
feng.controllers.NavigationController = function(){
	
  goog.base(this);

  // a toggle of whether to use history API
  this._useHistoryAPI = (feng.controllers.NavigationController.Implementation === feng.controllers.NavigationController.HISTORY_API);

  if(this._useHistoryAPI) {
  	this._navHistory = new goog.history.Html5History();
  	this._navHistory.setUseFragment(false);
  }else {
  	var input = goog.dom.createDom('input');
  	var iframe = goog.dom.createDom('iframe');
  	this._navHistory = new goog.History(false, null, input, iframe);
  }

  // the current token
  // "token/token/..."
  this._token = null;

  goog.events.listen(this._navHistory, goog.history.EventType.NAVIGATE, this.onNavigate, false, this);
};
goog.inherits(feng.controllers.NavigationController, goog.events.EventTarget);
goog.addSingletonGetter(feng.controllers.NavigationController);


feng.controllers.NavigationController.prototype.init = function(){

  this._navHistory.setEnabled(true);
};


feng.controllers.NavigationController.prototype.testToken = function( token, tokenToTest ){

  var tokenArr = goog.isArray( token ) ? token : token.split('/');
  var tokenToTestArr = tokenToTest.replace('#/', '').split('/');

  var result;

  if(tokenArr.length !== tokenToTestArr.length) {

  	result = null;

  }else {

  	var result = {};

  	var i, l = tokenArr.length;
  	var regex = /{(.*?)}/;

  	for(i = 0; i < l; i++) {

  		var tokenStr = tokenArr[i];
  		var tokenToTestStr = tokenToTestArr[i];

  		var isVariable = regex.test( tokenToTestStr );

  		if(isVariable) {

  			var key = tokenToTestStr.replace(/{|}/g, '');
  			result[ key ] = tokenStr;

  		}else if( tokenStr != tokenToTestStr ){

  			result = null;
  			break;
  		}
  	}
  }

  return result;
};


feng.controllers.NavigationController.prototype.setToken = function(token, title){

	var token = goog.isArray(token) ? this.getTokenFromArray( token ) : token;
	token = token.replace('#', '');
	
	this._navHistory.setToken(token, title);
};


feng.controllers.NavigationController.prototype.replaceToken = function(token, title){

	var token = goog.isArray(token) ? this.getTokenFromArray( token ) : token;
	token = token.replace('#', '');

	this._navHistory.replaceToken(token ,title);
};


feng.controllers.NavigationController.prototype.getTokenFromArray = function(tokens){

  var token = tokens.join('/');
  return token;
};


feng.controllers.NavigationController.prototype.getTokenString = function(){

	return this._token || this._navHistory.getToken();
};


feng.controllers.NavigationController.prototype.getTokenArray = function(){

	var tokens = (this._token || this._navHistory.getToken()).split('/');

	if(tokens.length > 0) {
		if(tokens[0] === '') tokens.shift();
	}else {
		tokens = null;
	}

	return tokens;
};


feng.controllers.NavigationController.prototype.handleToken = function(tokenString, tokenArray){

	console.log('handle token: ' + tokenString);

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		tokenString: tokenString,
		tokenArray: tokenArray
	});
};


feng.controllers.NavigationController.prototype.getUrlBeforeHash = function(token){
	
	var url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '') + window.location.pathname;
	return url;
};


feng.controllers.NavigationController.prototype.onNavigate = function(e){

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


feng.controllers.NavigationController.HASH = 'hash';
feng.controllers.NavigationController.HISTORY_API = 'history_api';
feng.controllers.NavigationController.Implementation = (goog.history.Html5History.isSupported() ? feng.controllers.NavigationController.HISTORY_API : feng.controllers.NavigationController.HASH);

feng.controllers.NavigationController.Token = {
	HOME: '#/home',
	STUDIO: '#/studio',
	HOUSE: '#/house',
	BOOK: '#/book',
	SECTION: '#/{sectionId}',
	VIEW: '#/{sectionId}/{viewId}',
	READ_TIP: '#/book/{tipId}',
	GO_TIP: '#/{sectionId}/{viewId}/{tipId}',
	TEST_TIP: '#/testtip/{sectionId}/{viewId}/{tipId}'
};