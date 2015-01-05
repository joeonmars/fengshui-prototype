goog.provide('feng.views.EpisodeSelection');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.query');
goog.require('goog.testing.events');


/**
 * @constructor
 */
feng.views.EpisodeSelection = function(){

  goog.base(this);

  var templateData = {
  	token: feng.controllers.NavigationController.Token
  };

  this.domElement = soy.renderAsFragment(feng.templates.main.EpisodeSelection, templateData);

  this._isBuffering = false;

  feng.pubsub.subscribeOnce( feng.PubSub.Topic.MAIN_LOAD_COMPLETE, this.init, this );
};
goog.inherits(feng.views.EpisodeSelection, goog.events.EventTarget);
goog.addSingletonGetter(feng.views.EpisodeSelection);


feng.views.EpisodeSelection.prototype.init = function(){

	this._promptEl = goog.dom.query('> .prompt', this.domElement)[0];

  this._studioEl = goog.dom.getElementByClass('studio', this.domElement);
  this._houseEl = goog.dom.getElementByClass('house', this.domElement);

  this._studioButton = goog.dom.query('a.studio', this.domElement)[0];
  this._houseButton = goog.dom.query('a.house', this.domElement)[0];

  //
  this._activationDelay = 0;
  this._episodePromptAnimateInDelay = 0;

  this._hoveredSceneEl = null;

  this._episode = null;
  this._oldEpisode = null;

  this._eventHandler = new goog.events.EventHandler(this);

  this._hoverStudio = goog.bind(this.hoverStudio, this);
  this._hoverHouse = goog.bind(this.hoverHouse, this);
  this._onPressEnter = goog.bind(this.onPressEnter, this);

	this._hoverStudioKeyId = null;
	this._hoverHouseKeyId = null;
	this._enterKeyId = null;

	//
	this.reset();
};


feng.views.EpisodeSelection.prototype.activate = function(){

	this._eventHandler.listenOnce( this.domElement, 'mousemove', this.onMouseMoveOnce, false, this );
	this._eventHandler.listen( this._studioEl, feng.events.EventType.INPUT_OVER, this.onInputOver, false, this );
	this._eventHandler.listen( this._houseEl, feng.events.EventType.INPUT_OVER, this.onInputOver, false, this );
	this._eventHandler.listen( this._studioEl, 'mouseout', this.onMouseOut, false, this );
	this._eventHandler.listen( this._houseEl, 'mouseout', this.onMouseOut, false, this );
	this._eventHandler.listen( this._studioButton, 'click', this.onClickStartButton, false, this );
	this._eventHandler.listen( this._houseButton, 'click', this.onClickStartButton, false, this );

	feng.sectionController.listen( feng.events.EventType.START, this.onLoadStart, false, this );
	feng.sectionController.listen( feng.events.EventType.PROGRESS, this.onLoadProgress, false, this );
	feng.sectionController.listen( feng.events.EventType.COMPLETE, this.onLoadComplete, false, this );

	this._hoverStudioKeyId = feng.keyboardController.bind( this._hoverStudio, feng.keyboardController.key.LEFT );
	this._hoverHouseKeyId = feng.keyboardController.bind( this._hoverHouse, feng.keyboardController.key.RIGHT );
	this._enterKeyId = feng.keyboardController.bind( this._onPressEnter, feng.keyboardController.key.ENTER, true );
};


feng.views.EpisodeSelection.prototype.deactivate = function(){

	this._eventHandler.removeAll();

	goog.Timer.clear( this._activationDelay );
	goog.Timer.clear( this._episodePromptAnimateInDelay );

	feng.keyboardController.unbind( this._hoverStudioKeyId );
	feng.keyboardController.unbind( this._hoverHouseKeyId );
	feng.keyboardController.unbind( this._enterKeyId );
};


feng.views.EpisodeSelection.prototype.reset = function(){

	goog.dom.removeNode( feng.tutorial.domElement );

	goog.dom.classes.enable( this._promptEl, 'hidden', false );
	goog.dom.classes.enable( this._studioEl, 'active', false );
	goog.dom.classes.enable( this._studioEl, 'inactive', false );
	goog.dom.classes.enable( this._studioEl, 'loading', false );
	goog.dom.classes.enable( this._studioEl, 'hidden', false );
	goog.dom.classes.enable( this._houseEl, 'active', false );
	goog.dom.classes.enable( this._houseEl, 'inactive', false );
	goog.dom.classes.enable( this._houseEl, 'loading', false );
	goog.dom.classes.enable( this._houseEl, 'hidden', false );
	
	this._hoveredSceneEl = null;
};


feng.views.EpisodeSelection.prototype.animateIn = function(){

	this.reset();

	this._activationDelay = goog.Timer.callOnce(this.activate, 2000, this);
};


feng.views.EpisodeSelection.prototype.animateOut = function(){

	this.deactivate();

	feng.soundController.fadeAmbient( 'studio', null, 0, 4, true );
	feng.soundController.fadeAmbient( 'house', null, 0, 4, true );
};


feng.views.EpisodeSelection.prototype.animateOutOnComplete = function( episodeId ){

	this.deactivate();

	feng.soundController.fadeAmbient( 'studio', null, 0, 4, true );
	feng.soundController.fadeAmbient( 'house', null, 0, 4, true );
};


feng.views.EpisodeSelection.prototype.updateSceneStatus = function(){

	if(this._hoveredSceneEl === this._studioEl) {

		goog.dom.classes.enable( this._studioEl, 'active', true );
		goog.dom.classes.enable( this._studioEl, 'inactive', false );
		goog.dom.classes.enable( this._houseEl, 'active', false );
		goog.dom.classes.enable( this._houseEl, 'inactive', true );

		goog.dom.classes.enable( this._promptEl, 'hidden', true );
		goog.dom.classes.addRemove( this._promptEl, 'house', 'studio' );

	  feng.soundController.fadeAmbient( 'studio', null, 1, 4 );
	  feng.soundController.fadeAmbient( 'house', null, 0, 4 );

	}else if(this._hoveredSceneEl === this._houseEl) {

		goog.dom.classes.enable( this._studioEl, 'active', false );
		goog.dom.classes.enable( this._studioEl, 'inactive', true );
		goog.dom.classes.enable( this._houseEl, 'active', true );
		goog.dom.classes.enable( this._houseEl, 'inactive', false );

		goog.dom.classes.enable( this._promptEl, 'hidden', true );
		goog.dom.classes.addRemove( this._promptEl, 'studio', 'house' );

		feng.soundController.fadeAmbient( 'studio', null, 0, 4 );
	  feng.soundController.fadeAmbient( 'house', null, 1, 4 );

	}else {

		goog.dom.classes.enable( this._studioEl, 'active', false );
		goog.dom.classes.enable( this._studioEl, 'inactive', false );
		goog.dom.classes.enable( this._houseEl, 'active', false );
		goog.dom.classes.enable( this._houseEl, 'inactive', false );

		goog.dom.classes.enable( this._promptEl, 'hidden', false );
		goog.dom.classes.remove( this._promptEl, 'studio' );
		goog.dom.classes.remove( this._promptEl, 'house' );

		feng.soundController.fadeAmbient( 'studio', null, 0, 4 );
	  feng.soundController.fadeAmbient( 'house', null, 0, 4 );
	}
};


feng.views.EpisodeSelection.prototype.hoverStudio = function(){

	if(this._hoveredSceneEl === this._studioEl) return;
	else this._hoveredSceneEl = this._studioEl;

	this.updateSceneStatus();
};


feng.views.EpisodeSelection.prototype.hoverHouse = function(){

	if(this._hoveredSceneEl === this._houseEl) return;
	else this._hoveredSceneEl = this._houseEl;

	this.updateSceneStatus();
};


feng.views.EpisodeSelection.prototype.doAfterComplete = function(){

	this._episode.animateIn();
	
	this.dispatchEvent({
		type: feng.events.EventType.COMPLETE,
		episode: this._episode
	});
};


feng.views.EpisodeSelection.prototype.onPressEnter = function(){

	if(this._hoveredSceneEl === this._studioEl) {

		feng.navigationController.setToken( feng.controllers.NavigationController.Token.STUDIO );

	}else if(this._hoveredSceneEl === this._houseEl) {

		feng.navigationController.setToken( feng.controllers.NavigationController.Token.HOUSE );
	}
};


feng.views.EpisodeSelection.prototype.onInputOver = function(e){

	if(e.currentTarget === this._hoveredSceneEl) return false;

	switch(e.currentTarget) {

		case this._studioEl:
		this.hoverStudio();
		break;

		case this._houseEl:
		this.hoverHouse();
		break;
	}
};


feng.views.EpisodeSelection.prototype.onMouseOut = function(e){

  if(!e.relatedTarget || !goog.dom.contains(this.domElement, e.relatedTarget)) {

  	this._hoveredSceneEl = null;
	this.updateSceneStatus();
  }
};


feng.views.EpisodeSelection.prototype.onMouseMoveOnce = function(e){

  if(goog.dom.contains(this._studioEl, e.target)) {

  	goog.testing.events.fireMouseOverEvent( this._studioEl );

  }else if(goog.dom.contains(this._houseEl, e.target)) {

  	goog.testing.events.fireMouseOverEvent( this._houseEl );
  }
};


feng.views.EpisodeSelection.prototype.onClickStartButton = function(e){

	e.preventDefault();

	this.deactivate();

	goog.dom.classes.enable( this._promptEl, 'hidden', true );

	feng.tutorial.setProgress( 0 );
	feng.tutorial.showLoader();
	feng.tutorial.enableAutoPlay( true );
	feng.tutorial.animateIn();

	switch(e.currentTarget) {

		case this._studioButton:
		goog.dom.classes.enable( this._studioEl, 'loading', true );
		goog.dom.classes.enable( this._houseEl, 'hidden', true );
		goog.dom.appendChild( this._studioEl, feng.tutorial.domElement );
		break;

		case this._houseButton:
		goog.dom.classes.enable( this._studioEl, 'hidden', true );
		goog.dom.classes.enable( this._houseEl, 'loading', true );
		goog.dom.appendChild( this._houseEl, feng.tutorial.domElement );
		break;
	}

	goog.Timer.callOnce(function() {
		window.location.href = e.currentTarget.href;
	}, 2000);

	feng.soundController.playSfx('confirm');
};


feng.views.EpisodeSelection.prototype.onLoadStart = function(e){

	this._oldEpisode = this._episode;

	this._episode = e.target.getParentEventTarget();
	console.log(this._episode.id + ': load start');

	this._isBuffering = false;

	feng.pubsub.subscribeOnce( feng.PubSub.Topic.BUFFER_START, this.onBufferStart, this );
  	feng.pubsub.subscribeOnce( feng.PubSub.Topic.BUFFER_COMPLETE, this.onBufferComplete, this );
};


feng.views.EpisodeSelection.prototype.onLoadProgress = function(e){

	//console.log(this._episode.id + ': load progress ' + e.progress);

	feng.tutorial.setProgress( e.progress );
};


feng.views.EpisodeSelection.prototype.onLoadComplete = function(e){

	console.log(this._episode.id + ': load complete');

	feng.tutorial.setBuffering();

	if(this._oldEpisode) {
		this._oldEpisode.hide();
		this._oldEpisode = null;
	}

	feng.sectionController.unlisten( feng.events.EventType.START, this.onLoadStart, false, this );
	feng.sectionController.unlisten( feng.events.EventType.PROGRESS, this.onLoadProgress, false, this );
	feng.sectionController.unlisten( feng.events.EventType.COMPLETE, this.onLoadComplete, false, this );

	feng.tutorial.listenOnce( feng.events.EventType.CLOSE, this.doAfterComplete, false, this );
};


feng.views.EpisodeSelection.prototype.onBufferStart = function(e){

	this._isBuffering = true;
};


feng.views.EpisodeSelection.prototype.onBufferComplete = function(e){

	this._isBuffering = false;

	feng.tutorial.showSkipButton();
};