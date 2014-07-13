goog.provide('feng.views.sections.Section');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('feng.events');
goog.require('feng.views.Preloader');


/**
 * @constructor
 */
feng.views.sections.Section = function(domElement){
	
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

  // section loader
  this.assetKeys = [this.id];

  this._preloaderDom = goog.dom.query('.preloader', this.domElement)[0];
  this._preloader = new feng.views.Preloader( this._preloaderDom, 2000 );
  this._preloader.setParentEventTarget(this);

  // permanent events
  goog.events.listen( feng.navigationController, feng.events.EventType.CHANGE, this.onNavigationChange, false, this );

  // activatable events
  this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.views.sections.Section, goog.events.EventTarget);


feng.views.sections.Section.prototype.init = function(){

  // hide section by default
  this.hide();
  
	this.setAnimations();
};


feng.views.sections.Section.prototype.show = function(){

	goog.style.showElement(this.domElement, true);

	this.dispatchEvent({
		type: feng.events.EventType.SHOW
	});
};


feng.views.sections.Section.prototype.hide = function(){

	goog.style.showElement(this.domElement, false);

	this.dispatchEvent({
		type: feng.events.EventType.HIDE
	});
};


feng.views.sections.Section.prototype.isShown = function(){

	return goog.style.isElementShown(this.domElement);
};


feng.views.sections.Section.prototype.activate = function(){

};


feng.views.sections.Section.prototype.deactivate = function(){

	this._eventHandler.removeAll();
};


feng.views.sections.Section.prototype.setAnimations = function(){

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


feng.views.sections.Section.prototype.animateIn = function(){

	if(this.isShown()) return;

	this.show();
	this.activate();
	this._animateInTweener.restart();

	this.dispatchEvent({
		type: feng.events.EventType.ANIMATE_IN
	});
};


feng.views.sections.Section.prototype.animateOut = function(){

	if(!this.isShown()) return;

	this.deactivate();
	this._animateOutTweener.restart();

	this.dispatchEvent({
		type: feng.events.EventType.ANIMATE_OUT
	});
};


feng.views.sections.Section.prototype.doNavigate = function(){

	if(!this._preloader.isCompleted) {

		this.listen(feng.events.EventType.START, this.onLoadStart, false, this);
		this.listen(feng.events.EventType.PROGRESS, this.onLoadProgress, false, this);
		this.listen(feng.events.EventType.LOAD_COMPLETE, this.onLoadComplete, false, this);
		this.listen(feng.events.EventType.COMPLETE, this.onLoadAnimationComplete, false, this);

		this._preloader.load( this.assetKeys );

	}else {

	}
};


feng.views.sections.Section.prototype.onAnimatedIn = function(e){

	this.dispatchEvent({
		type: feng.events.EventType.ANIMATED_IN
	});
};


feng.views.sections.Section.prototype.onAnimatedOut = function(e){

	this.hide();

	this.dispatchEvent({
		type: feng.events.EventType.ANIMATED_OUT
	});
};


feng.views.sections.Section.prototype.onLoadStart = function(e){

	//console.log("section load start");
};


feng.views.sections.Section.prototype.onLoadProgress = function(e){

	//console.log("section load progress: " + e.progress);
};


feng.views.sections.Section.prototype.onLoadComplete = function(e){
	
	//console.log("section load complete")
};


feng.views.sections.Section.prototype.onLoadAnimationComplete = function(e){
	
	this.unlisten(feng.events.EventType.START, this.onLoadStart, false, this);
	this.unlisten(feng.events.EventType.PROGRESS, this.onLoadProgress, false, this);
	this.unlisten(feng.events.EventType.LOAD_COMPLETE, this.onLoadComplete, false, this);
	this.unlisten(feng.events.EventType.COMPLETE, this.onLoadAnimationComplete, false, this);
};


feng.views.sections.Section.prototype.onNavigationChange = function(e){

	var shouldNavigate = (e.tokenArray && e.tokenArray[0] === this.id);

	if(shouldNavigate) this.doNavigate();
};