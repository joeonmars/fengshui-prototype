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

  feng.pubsub.subscribeOnce( feng.PubSub.Topic.MAIN_LOAD_COMPLETE, this.init, this );
};
goog.inherits(feng.views.EpisodeSelection, goog.events.EventTarget);
goog.addSingletonGetter(feng.views.EpisodeSelection);


feng.views.EpisodeSelection.prototype.init = function(){

	this._promptEl = goog.dom.query('> .prompt', this.domElement)[0];
  this._promptInnerDiscEl = goog.dom.getElementByClass('inner', this._promptEl);
  this._promptOuterDiscEl = goog.dom.getElementByClass('outer', this._promptEl);
  this._promptContentEl = goog.dom.getElementByClass('content', this._promptEl);

  this._studioEl = goog.dom.getElementByClass('studio', this.domElement);
  this._houseEl = goog.dom.getElementByClass('house', this.domElement);

  this._studioEnterButton = goog.dom.getElementByClass('primary-button', this._studioEl);
  this._houseEnterButton = goog.dom.getElementByClass('primary-button', this._houseEl);

  this._promptEl = goog.dom.query('> .prompt', this.domElement)[0];

  this._studioPromptEl = goog.dom.getElementByClass('prompt', this._studioEl);
  this._housePromptEl = goog.dom.getElementByClass('prompt', this._houseEl);

  this._studioPromptInnerDiscEl = goog.dom.getElementByClass('inner', this._studioPromptEl);
  this._studioPromptOuterDiscEl = goog.dom.getElementByClass('outer', this._studioPromptEl);
  this._studioPromptLocationEl = goog.dom.query('.location', this._studioPromptInnerDiscEl)[0];
  this._studioPromptLineEl = goog.dom.query('.location .line', this._studioPromptInnerDiscEl)[0];
  this._studioPromptTitleEl = goog.dom.query('.content h1', this._studioPromptInnerDiscEl)[0];
  this._studioPromptParaEl = goog.dom.query('.content > p', this._studioPromptInnerDiscEl)[0];

  this._housePromptInnerDiscEl = goog.dom.getElementByClass('inner', this._housePromptEl);
  this._housePromptOuterDiscEl = goog.dom.getElementByClass('outer', this._housePromptEl);
  this._housePromptLocationEl = goog.dom.query('.location', this._housePromptInnerDiscEl)[0];
  this._housePromptLineEl = goog.dom.query('.location .line', this._housePromptInnerDiscEl)[0];
  this._housePromptTitleEl = goog.dom.query('.content h1', this._housePromptInnerDiscEl)[0];
  this._housePromptParaEl = goog.dom.query('.content > p', this._housePromptInnerDiscEl)[0];

  //
  this._activationDelay = 0;
  this._episodePromptAnimateInDelay = 0;

  this._isAnimatedToMessage = false;
	this._isAnimatedToCompass = false;

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
	this._eventHandler.listen( this._studioEl, 'mouseover', this.onMouseOver, false, this );
	this._eventHandler.listen( this._houseEl, 'mouseover', this.onMouseOver, false, this );
	this._eventHandler.listen( this._studioEl, 'mouseout', this.onMouseOut, false, this );
	this._eventHandler.listen( this._houseEl, 'mouseout', this.onMouseOut, false, this );

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

	goog.dom.classes.enable( this._studioEl, 'active', false );
	goog.dom.classes.enable( this._studioEl, 'inactive', false );
	goog.dom.classes.enable( this._houseEl, 'active', false );
	goog.dom.classes.enable( this._houseEl, 'inactive', false );

  	this._isAnimatedToMessage = false;
	this._isAnimatedToCompass = false;
	this._hoveredSceneEl = null;
};


feng.views.EpisodeSelection.prototype.animateIn = function(){

	this.reset();

	this.animatePromptToMessage();

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


feng.views.EpisodeSelection.prototype.animatePromptToMessage = function(){

	this._isAnimatedToCompass = false;

	if(this._isAnimatedToMessage) return;
	else this._isAnimatedToMessage = true;

	TweenMax.to(this._promptOuterDiscEl, 1, {
		'scale': 1,
		'ease': Power4.easeInOut
	});

	TweenMax.to(this._promptInnerDiscEl, 1, {
		'delay': .1,
		'scale': 1,
		'ease': Power4.easeInOut
	});

	TweenMax.to(this._promptContentEl, .5, {
		'delay': .1,
		'autoAlpha': 1
	});
};


feng.views.EpisodeSelection.prototype.animatePromptToCompass = function(){

	this._isAnimatedToMessage = false;

	if(this._isAnimatedToCompass) return;
	else this._isAnimatedToCompass = true;

	TweenMax.to(this._promptInnerDiscEl, 1, {
		'scale': .43,
		'ease': Power4.easeInOut
	});

	TweenMax.to(this._promptOuterDiscEl, 1, {
		'delay': .1,
		'scale': .45,
		'ease': Power4.easeInOut
	});

	TweenMax.to(this._promptContentEl, .5, {
		'autoAlpha': 0
	});
};


feng.views.EpisodeSelection.prototype.updateSceneStatus = function(){

	if(this._hoveredSceneEl === this._studioEl) {

		goog.dom.classes.enable( this._studioEl, 'active', true );
		goog.dom.classes.enable( this._studioEl, 'inactive', false );
		goog.dom.classes.enable( this._houseEl, 'active', false );
		goog.dom.classes.enable( this._houseEl, 'inactive', true );

		goog.dom.classes.enable( this._promptEl, 'active', true );
		goog.dom.classes.addRemove( this._promptEl, 'house', 'studio' );

	  	feng.soundController.fadeAmbient( 'studio', null, 1, 4 );
	  	feng.soundController.fadeAmbient( 'house', null, 0, 4 );

	}else if(this._hoveredSceneEl === this._houseEl) {

		goog.dom.classes.enable( this._studioEl, 'active', false );
		goog.dom.classes.enable( this._studioEl, 'inactive', true );
		goog.dom.classes.enable( this._houseEl, 'active', true );
		goog.dom.classes.enable( this._houseEl, 'inactive', false );

		goog.dom.classes.enable( this._promptEl, 'active', true );
		goog.dom.classes.addRemove( this._promptEl, 'studio', 'house' );

		feng.soundController.fadeAmbient( 'studio', null, 0, 4 );
	  	feng.soundController.fadeAmbient( 'house', null, 1, 4 );

	}else {

		goog.dom.classes.enable( this._studioEl, 'active', false );
		goog.dom.classes.enable( this._studioEl, 'inactive', false );
		goog.dom.classes.enable( this._houseEl, 'active', false );
		goog.dom.classes.enable( this._houseEl, 'inactive', false );

		goog.dom.classes.enable( this._promptEl, 'active', false );
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


feng.views.EpisodeSelection.prototype.onPressEnter = function(){

	if(this._hoveredSceneEl === this._studioEl) {

		feng.navigationController.setToken( feng.controllers.NavigationController.Token.STUDIO );

	}else if(this._hoveredSceneEl === this._houseEl) {

		feng.navigationController.setToken( feng.controllers.NavigationController.Token.HOUSE );
	}
};


feng.views.EpisodeSelection.prototype.onMouseOver = function(e){

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


feng.views.EpisodeSelection.prototype.onLoadStart = function(e){

	this._oldEpisode = this._episode;

	this._episode = e.target.getParentEventTarget();
	console.log(this._episode.id + ': load start');

	this.deactivate();

	TweenMax.to(this._promptInnerDiscEl, 1, {
		'scale': 0,
		'ease': Power4.easeInOut
	});

	TweenMax.to(this._promptOuterDiscEl, 1, {
		'delay': .1,
		'scale': 0,
		'ease': Power4.easeInOut
	});

	feng.tutorial.showLoader();
	feng.tutorial.enableAutoPlay( true );
	feng.tutorial.animateIn();

	if(this._episode.id === 'studio') {

		goog.style.setStyle( this._studioEl, 'width', '100%' );
		goog.style.setStyle( this._houseEl, 'width', '0%' );
		goog.style.setStyle( this._promptEl, 'left', '100%' );

		TweenMax.set(this._studioPromptEl, {
			'display': 'none'
		});

		goog.dom.appendChild( this._studioEl, feng.tutorial.domElement );

	}else if(this._episode.id === 'house') {

		goog.style.setStyle( this._studioEl, 'width', '0%' );
		goog.style.setStyle( this._houseEl, 'width', '100%' );
		goog.style.setStyle( this._promptEl, 'left', '0%' );

		TweenMax.set(this._housePromptEl, {
			'display': 'none'
		});

		goog.dom.appendChild( this._houseEl, feng.tutorial.domElement );
	}
};


feng.views.EpisodeSelection.prototype.onLoadProgress = function(e){

  //console.log(this._episode.id + ': load progress ' + e.progress);

  feng.tutorial.setProgress( e.progress );
};


feng.views.EpisodeSelection.prototype.onLoadComplete = function(e){

	console.log(this._episode.id + ': load complete');

	if(this._oldEpisode) {
		this._oldEpisode.hide();
		this._oldEpisode = null;
	}

	feng.sectionController.unlisten( feng.events.EventType.START, this.onLoadStart, false, this );
	feng.sectionController.unlisten( feng.events.EventType.PROGRESS, this.onLoadProgress, false, this );
	feng.sectionController.unlisten( feng.events.EventType.COMPLETE, this.onLoadComplete, false, this );

	feng.tutorial.showSkipButton();

	feng.tutorial.listenOnce( feng.events.EventType.CLOSE, function(e) {

		this._episode.animateIn();
		
		this.dispatchEvent({
			type: feng.events.EventType.COMPLETE,
			episode: this._episode
		});

	}, false, this );
};