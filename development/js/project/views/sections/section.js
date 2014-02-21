goog.provide('fengshui.views.sections.Section');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('fengshui.events');
goog.require('fengshui.controllers.NavigationController');


/**
 * @constructor
 */
fengshui.views.sections.Section = function(domElement){
  goog.base(this);

  this.domElement = domElement;
  this.id = this.domElement.id;

  this._animateInTweener = new TimelineMax({
  	paused: true,
  	onComplete: this.onAnimatedIn,
  	onCompleteScope: this
  });

  this._animateOutTweener = new TimelineMax({
  	paused: true,
  	onComplete: this.onAnimatedOut,
  	onCompleteScope: this
  });

  // permanent events
  goog.events.listen(fengshui.controllers.NavigationController.getInstance(), fengshui.events.EventType.CHANGE, this.onNavigationChange, false, this);

  // activatable events
  this._eventHandler = new goog.events.EventHandler(this);

  // hide section by default
  this.hide();
};
goog.inherits(fengshui.views.sections.Section, goog.events.EventTarget);


fengshui.views.sections.Section.prototype.init = function(){

	this.setAnimations();
};


fengshui.views.sections.Section.prototype.show = function(){

	goog.style.showElement(this.domElement, true);

	this.dispatchEvent({
		type: fengshui.events.EventType.SHOW
	});
};


fengshui.views.sections.Section.prototype.hide = function(){

	goog.style.showElement(this.domElement, false);

	this.dispatchEvent({
		type: fengshui.events.EventType.HIDE
	});
};


fengshui.views.sections.Section.prototype.isShown = function(){

	return goog.style.isElementShown(this.domElement);
};


fengshui.views.sections.Section.prototype.activate = function(){

};


fengshui.views.sections.Section.prototype.deactivate = function(){

	this._eventHandler.removeAll();
};


fengshui.views.sections.Section.prototype.setAnimations = function(){

	var fadeInTweener = TweenMax.fromTo(this.domElement, .5, {
		opacity: 0
	}, {
		opacity: 1
	});

	this._animateInTweener.add( fadeInTweener );

	var fadeOutTweener = TweenMax.fromTo(this.domElement, .5, {
		opacity: 1
	}, {
		opacity: 0
	});

	this._animateOutTweener.add( fadeOutTweener );
};


fengshui.views.sections.Section.prototype.animateIn = function(){

	if(this.isShown()) return;

	this.show();
	this.deactivate();
	this._animateInTweener.restart();

	this.dispatchEvent({
		type: fengshui.events.EventType.ANIMATE_IN
	});
};


fengshui.views.sections.Section.prototype.animateOut = function(){

	if(!this.isShown()) return;

	this.deactivate();
	this._animateOutTweener.restart();

	this.dispatchEvent({
		type: fengshui.events.EventType.ANIMATE_OUT
	});
};


fengshui.views.sections.Section.prototype.onAnimatedIn = function(e){

	this.activate();

	this.dispatchEvent({
		type: fengshui.events.EventType.ANIMATED_IN
	});
};


fengshui.views.sections.Section.prototype.onAnimatedOut = function(e){

	this.hide();

	this.dispatchEvent({
		type: fengshui.events.EventType.ANIMATED_OUT
	});
};


fengshui.views.sections.Section.prototype.onNavigationChange = function(e){

	var shouldAnimateIn = (e.tokenArray && e.tokenArray[0] === this.id);

  if(shouldAnimateIn) {
  	this.animateIn();
  }else {
  	this.animateOut();
  }
};