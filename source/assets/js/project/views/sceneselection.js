goog.provide('feng.views.SceneSelection');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.query');


/**
 * @constructor
 */
feng.views.SceneSelection = function(domElement){

  goog.base(this);

  this.domElement = domElement;

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
  this._promptAnimateInDelay = 0;

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
goog.inherits(feng.views.SceneSelection, goog.events.EventTarget);


feng.views.SceneSelection.prototype.activate = function(){

	this._eventHandler.listen( this._studioEl, 'mouseover', this.onMouseOver, false, this );
	this._eventHandler.listen( this._townhouseEl, 'mouseover', this.onMouseOver, false, this );
	this._eventHandler.listen( this._studioEl, 'mouseout', this.onMouseOut, false, this );
	this._eventHandler.listen( this._townhouseEl, 'mouseout', this.onMouseOut, false, this );
};


feng.views.SceneSelection.prototype.deactivate = function(){

	this._eventHandler.removeAll();

	goog.Timer.clear( this._promptAnimateInDelay );
};


feng.views.SceneSelection.prototype.updateSceneStatus = function(){

	goog.style.setStyle( this._studioEl, 'width', this._studioRatio * 100 + '%' );
	goog.style.setStyle( this._townhouseEl, 'width', this._townhouseRatio * 100 + '%' );

	goog.Timer.clear( this._promptAnimateInDelay );

	var studioOpacity, townhouseOpacity;
	var innersToAnimateOut = [];
	var outersToAnimateOut = [];

	if(this._studioRatio > this._townhouseRatio) {

		studioOpacity = 0;
		townhouseOpacity = .7;

		var promptTweener = this._studioPromptAnimateInTweener;
		this._promptAnimateInDelay = goog.Timer.callOnce(promptTweener.restart, 400, promptTweener);

		this._townhousePromptAnimateInTweener.pause();

		innersToAnimateOut.push( this._townhousePromptInnerDiscEl );
	  outersToAnimateOut.push( this._townhousePromptOuterDiscEl );

	}else if(this._studioRatio < this._townhouseRatio) {

		studioOpacity = .7;
		townhouseOpacity = 0;

		var promptTweener = this._townhousePromptAnimateInTweener;
		this._promptAnimateInDelay = goog.Timer.callOnce(promptTweener.restart, 400, promptTweener);

		this._studioPromptAnimateInTweener.pause();

		innersToAnimateOut.push( this._studioPromptInnerDiscEl );
	  outersToAnimateOut.push( this._studioPromptOuterDiscEl );

	}else {

		studioOpacity = .5;
		townhouseOpacity = .5;

		this._studioPromptAnimateInTweener.pause();
		this._townhousePromptAnimateInTweener.pause();

		innersToAnimateOut.push( this._studioPromptInnerDiscEl );
		innersToAnimateOut.push( this._townhousePromptInnerDiscEl );
		outersToAnimateOut.push( this._studioPromptOuterDiscEl );
	  outersToAnimateOut.push( this._townhousePromptOuterDiscEl );
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


feng.views.SceneSelection.prototype.onMouseOver = function(e){

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


feng.views.SceneSelection.prototype.onMouseOut = function(e){

  if(!e.relatedTarget) {

  	this._hoveredSceneEl = null;
  	this._studioRatio = .5;
		this._townhouseRatio = .5;
		this.updateSceneStatus();
  }
};