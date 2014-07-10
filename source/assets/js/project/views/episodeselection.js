goog.provide('feng.views.EpisodeSelection');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.query');
goog.require('goog.testing.events');
goog.require('feng.views.Logo');


/**
 * @constructor
 */
feng.views.EpisodeSelection = function(domElement){

  goog.base(this);

  this.domElement = domElement;

	this._promptEl = goog.dom.query('> .prompt', this.domElement)[0];
  this._promptInnerDiscEl = goog.dom.getElementByClass('inner', this._promptEl);
  this._promptOuterDiscEl = goog.dom.getElementByClass('outer', this._promptEl);
  this._promptContentEl = goog.dom.getElementByClass('content', this._promptEl);

	var promptSmallLogoEl = goog.dom.query('.disc .fengshui-logo', this._promptEl)[0];
	this._promptSmallLogo = new feng.views.Logo( promptSmallLogoEl );

	var promptLargeLogoEl = goog.dom.query('> .fengshui-logo', this._promptEl)[0];
	this._promptLargeLogo = new feng.views.Logo( promptLargeLogoEl );

  this._studioEl = goog.dom.getElementByClass('studio', this.domElement);
  this._townhouseEl = goog.dom.getElementByClass('townhouse', this.domElement);

  this._studioPromptEl = goog.dom.getElementByClass('prompt', this._studioEl);
  this._townhousePromptEl = goog.dom.getElementByClass('prompt', this._townhouseEl);

  this._studioPromptInnerDiscEl = goog.dom.getElementByClass('inner', this._studioPromptEl);
  this._studioPromptOuterDiscEl = goog.dom.getElementByClass('outer', this._studioPromptEl);
  this._studioPromptLocationEl = goog.dom.query('.location', this._studioPromptInnerDiscEl)[0];
  this._studioPromptLineEl = goog.dom.query('.location .line', this._studioPromptInnerDiscEl)[0];
  this._studioPromptTitleEl = goog.dom.query('.content h1', this._studioPromptInnerDiscEl)[0];
  this._studioPromptParaEl = goog.dom.query('.content > p', this._studioPromptInnerDiscEl)[0];
  this._studioPromptButtonEl = goog.dom.query('.content > a', this._studioPromptInnerDiscEl)[0];

  this._townhousePromptInnerDiscEl = goog.dom.getElementByClass('inner', this._townhousePromptEl);
  this._townhousePromptOuterDiscEl = goog.dom.getElementByClass('outer', this._townhousePromptEl);
  this._townhousePromptLocationEl = goog.dom.query('.location', this._townhousePromptInnerDiscEl)[0];
  this._townhousePromptLineEl = goog.dom.query('.location .line', this._townhousePromptInnerDiscEl)[0];
  this._townhousePromptTitleEl = goog.dom.query('.content h1', this._townhousePromptInnerDiscEl)[0];
  this._townhousePromptParaEl = goog.dom.query('.content > p', this._townhousePromptInnerDiscEl)[0];
  this._townhousePromptButtonEl = goog.dom.query('.content > a', this._townhousePromptInnerDiscEl)[0];

  var els = [
  {
  	outer: this._studioPromptOuterDiscEl,
  	inner: this._studioPromptInnerDiscEl,
  	location: this._studioPromptLocationEl,
  	line: this._studioPromptLineEl,
  	title: this._studioPromptTitleEl,
  	para: this._studioPromptParaEl,
  	button: this._studioPromptButtonEl
  },
  {
  	outer: this._townhousePromptOuterDiscEl,
  	inner: this._townhousePromptInnerDiscEl,
  	location: this._townhousePromptLocationEl,
  	line: this._townhousePromptLineEl,
  	title: this._townhousePromptTitleEl,
  	para: this._townhousePromptParaEl,
  	button: this._townhousePromptButtonEl
  }];

  this._studioPromptAnimateInTweener = new TimelineMax({
  	'paused': true
  });

  this._townhousePromptAnimateInTweener = new TimelineMax({
  	'paused': true
  });

  this._studioPromptAnimateOutTweener = new TimelineMax({
  	'paused': true
  });

  this._townhousePromptAnimateOutTweener = new TimelineMax({
  	'paused': true
  });

  for(var i = 0; i < 2; i++) {

  	var el = els[i];
  	var outer = el.outer;
  	var inner = el.inner;
  	var location = el.location;
  	var line = el.line;
  	var title = el.title;
  	var para = el.para;
  	var button = el.button;

  	var animateInTweener = (i === 0) ? this._studioPromptAnimateInTweener : this._townhousePromptAnimateInTweener;

		var scaleUpOuter = TweenMax.fromTo(outer, 1, {
	  	'scale': 0,
	  	'autoAlpha': 0
	  }, {
	  	'scale': 1,
	  	'autoAlpha': 1,
	  	'clearProps': 'all',
	  	'ease': Power4.easeInOut
	  });

	  var scaleUpInner = TweenMax.fromTo(inner, 1, {
	  	'scale': 0,
	  	'autoAlpha': 0
	  }, {
	  	'delay': .1,
	  	'scale': 1,
	  	'autoAlpha': 1,
	  	'clearProps': 'all',
	  	'ease': Power4.easeInOut
	  });

	  var fadeInLocation = TweenMax.fromTo(location, .8, {
	  	'opacity': 0
	  }, {
	  	'delay': .5,
	  	'opacity': 1
	  });

	  var expandLine = TweenMax.fromTo(line, .8, {
	  	'width': 0
	  }, {
	  	'delay': .75,
	  	'width': 100,
	  	'ease': Strong.easeInOut
	  });

	  var fadeInTitle = TweenMax.fromTo(title, .8, {
	  	'opacity': 0
	  }, {
	  	'delay': .75,
	  	'opacity': 1,
	  	'ease': Sine.easeInOut
	  });

	  var fadeInPara = TweenMax.fromTo(para, .8, {
	  	'opacity': 0
	  }, {
	  	'delay': 1,
	  	'opacity': 1,
	  	'ease': Sine.easeInOut
	  });

	  var fadeInButton = TweenMax.fromTo(button, .8, {
	  	'opacity': 0
	  }, {
	  	'delay': 1.25,
	  	'opacity': 1,
	  	'ease': Sine.easeInOut
	  });

	  animateInTweener.add([
	  	scaleUpOuter,
	  	scaleUpInner,
	  	fadeInLocation,
	  	expandLine,
	  	fadeInTitle,
	  	fadeInPara,
	  	fadeInButton
	  	]);
  };

  //
  this._activationDelay = 0;
  this._episodePromptAnimateInDelay = 0;

  this._isAnimatedToMessage = false;
	this._isAnimatedToCompass = false;

  this._promptEl = goog.dom.query('> .prompt', this.domElement)[0];

  this._studioBackgroundEl = goog.dom.getElementByClass('shade', this._studioEl);
  this._townhouseBackgroundEl = goog.dom.getElementByClass('shade', this._townhouseEl);

  this._studioRatio = .5;
  this._townhouseRatio = .5;

  this._hoveredSceneEl = null;

  this._eventHandler = new goog.events.EventHandler(this);

	goog.style.setStyle( this._studioEl, 'width', '50%' );
	goog.style.setStyle( this._townhouseEl, 'width', '50%' );
	goog.style.setStyle( this._studioBackgroundEl, 'opacity', .5 );
	goog.style.setStyle( this._townhouseBackgroundEl, 'opacity', .5 );
};
goog.inherits(feng.views.EpisodeSelection, goog.events.EventTarget);


feng.views.EpisodeSelection.prototype.activate = function(){

	this._eventHandler.listenOnce( this.domElement, 'mousemove', this.onMouseMoveOnce, false, this );
	this._eventHandler.listen( this._studioEl, 'mouseover', this.onMouseOver, false, this );
	this._eventHandler.listen( this._townhouseEl, 'mouseover', this.onMouseOver, false, this );
	this._eventHandler.listen( this._studioEl, 'mouseout', this.onMouseOut, false, this );
	this._eventHandler.listen( this._townhouseEl, 'mouseout', this.onMouseOut, false, this );
};


feng.views.EpisodeSelection.prototype.deactivate = function(){

	this._eventHandler.removeAll();

	goog.Timer.clear( this._activationDelay );
	goog.Timer.clear( this._episodePromptAnimateInDelay );
};


feng.views.EpisodeSelection.prototype.animateIn = function(){

	TweenMax.set(this._promptOuterDiscEl, {
		'scale': 0
	});

	TweenMax.set(this._promptInnerDiscEl, {
		'scale': 0
	});

	TweenMax.set(this._promptContentEl, {
		'autoAlpha': 0
	});

	TweenMax.set(this._promptLargeLogo.domElement, {
		'display': 'none',
		'alpha': 0
	});

  this._isAnimatedToMessage = false;
	this._isAnimatedToCompass = false;

	this.animatePromptToMessage();

	this._activationDelay = goog.Timer.callOnce(this.activate, 2000, this);
};


feng.views.EpisodeSelection.prototype.animateOut = function(){

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

	TweenMax.to(this._promptLargeLogo.domElement, .5, {
		'display': 'none',
		'alpha': 0
	});
};


feng.views.EpisodeSelection.prototype.animatePromptToCompass = function(){

	this._isAnimatedToMessage = false;

	if(this._isAnimatedToCompass) return;
	else this._isAnimatedToCompass = true;

	TweenMax.to(this._promptInnerDiscEl, 1, {
		'scale': .48,
		'ease': Power4.easeInOut
	});

	TweenMax.to(this._promptOuterDiscEl, 1, {
		'delay': .1,
		'scale': .5,
		'ease': Power4.easeInOut
	});

	TweenMax.to(this._promptContentEl, .5, {
		'autoAlpha': 0
	});

	TweenMax.to(this._promptLargeLogo.domElement, .5, {
		'delay': .1,
		'display': 'block',
		'alpha': 1
	});
};


feng.views.EpisodeSelection.prototype.updateSceneStatus = function(){

	goog.style.setStyle( this._studioEl, 'width', this._studioRatio * 100 + '%' );
	goog.style.setStyle( this._townhouseEl, 'width', this._townhouseRatio * 100 + '%' );

	goog.style.setStyle( this._promptEl, 'left', this._studioRatio * 100 + '%' );

	goog.Timer.clear( this._episodePromptAnimateInDelay );

	var studioOpacity, townhouseOpacity;
	var innersToAnimateOut = [];
	var outersToAnimateOut = [];

	if(this._studioRatio > this._townhouseRatio) {

		studioOpacity = 0;
		townhouseOpacity = .7;

		var promptTweener = this._studioPromptAnimateInTweener;
		this._episodePromptAnimateInDelay = goog.Timer.callOnce(promptTweener.restart, 400, promptTweener);

		this._townhousePromptAnimateInTweener.pause();

		innersToAnimateOut.push( this._townhousePromptInnerDiscEl );
	  outersToAnimateOut.push( this._townhousePromptOuterDiscEl );

	  this.animatePromptToCompass();
	  this._promptLargeLogo.rotateNeedleTo( -45 );

	}else if(this._studioRatio < this._townhouseRatio) {

		studioOpacity = .7;
		townhouseOpacity = 0;

		var promptTweener = this._townhousePromptAnimateInTweener;
		this._episodePromptAnimateInDelay = goog.Timer.callOnce(promptTweener.restart, 400, promptTweener);

		this._studioPromptAnimateInTweener.pause();

		innersToAnimateOut.push( this._studioPromptInnerDiscEl );
	  outersToAnimateOut.push( this._studioPromptOuterDiscEl );

	  this.animatePromptToCompass();
	  this._promptLargeLogo.rotateNeedleTo( 45 );

	}else {

		studioOpacity = .5;
		townhouseOpacity = .5;

		this._studioPromptAnimateInTweener.pause();
		this._townhousePromptAnimateInTweener.pause();

		innersToAnimateOut.push( this._studioPromptInnerDiscEl );
		innersToAnimateOut.push( this._townhousePromptInnerDiscEl );
		outersToAnimateOut.push( this._studioPromptOuterDiscEl );
	  outersToAnimateOut.push( this._townhousePromptOuterDiscEl );

	  this.animatePromptToMessage();
	  this._promptLargeLogo.rotateNeedleTo( 0 );
	}

  TweenMax.to(innersToAnimateOut, 1, {
  	'scale': 0,
  	'autoAlpha': 0,
  	'ease': Power4.easeInOut
  });

	TweenMax.to(outersToAnimateOut, 1, {
  	'scale': 0,
  	'autoAlpha': 0,
  	'ease': Power4.easeInOut
  });

	goog.style.setStyle( this._studioBackgroundEl, 'opacity', studioOpacity );
	goog.style.setStyle( this._townhouseBackgroundEl, 'opacity', townhouseOpacity );
};


feng.views.EpisodeSelection.prototype.onMouseOver = function(e){

	if(e.currentTarget === this._hoveredSceneEl) return false;
	else this._hoveredSceneEl = e.currentTarget;

	switch(e.currentTarget) {

		case this._studioEl:
		this._studioRatio = .8;
		this._townhouseRatio = .2;
		this.updateSceneStatus();
		break;

		case this._townhouseEl:
		this._studioRatio = .2;
		this._townhouseRatio = .8;
		this.updateSceneStatus();
		break;
	}
};


feng.views.EpisodeSelection.prototype.onMouseOut = function(e){

  if(!e.relatedTarget || !goog.dom.contains(this.domElement, e.relatedTarget)) {

  	this._hoveredSceneEl = null;
  	this._studioRatio = .5;
		this._townhouseRatio = .5;
		this.updateSceneStatus();
  }
};


feng.views.EpisodeSelection.prototype.onMouseMoveOnce = function(e){

  if(goog.dom.contains(this._studioEl, e.target)) {

  	goog.testing.events.fireMouseOverEvent( this._studioEl );

  }else if(goog.dom.contains(this._townhouseEl, e.target)) {

  	goog.testing.events.fireMouseOverEvent( this._townhouseEl );
  }
};