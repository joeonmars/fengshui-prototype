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
  	'paused': true,
  	'onComplete': this.onAnimatedIn,
  	'onCompleteScope': this
  });

  this._animateOutTweener = new TimelineMax({
  	'paused': true,
  	'onComplete': this.onAnimatedOut,
  	'onCompleteScope': this
  });

  // section loader
  this._preloaderDom = goog.dom.query('.preloader', this.domElement)[0];
  this._preloader = new feng.views.Preloader( this._preloaderDom, 2000 );
  this._preloader.setParentEventTarget(this);

  // permanent events
  goog.events.listen( feng.navigationController, feng.events.EventType.CHANGE, this.onNavigationChange, false, this );

  // activatable events
  this._eventHandler = new goog.events.EventHandler(this);

  // asset keys
  this._assetKeys = [];
  this._loadedAssetKeys = [];
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


feng.views.sections.Section.prototype.addPreloadListeners = function(){

	this.listen(feng.events.EventType.START, this.onLoadStart, false, this);
	this.listen(feng.events.EventType.PROGRESS, this.onLoadProgress, false, this);
	this.listen(feng.events.EventType.LOAD_COMPLETE, this.onLoadComplete, false, this);
	this.listen(feng.events.EventType.COMPLETE, this.onLoadAnimationComplete, false, this);
};


feng.views.sections.Section.prototype.load = function(){

	this.addPreloadListeners();

	this._assetKeys = goog.array.filter( this._assetKeys, function(key) {
		return !goog.array.contains(this._loadedAssetKeys, key);
	}, this);

	this._preloader.load( this._assetKeys );
};


feng.views.sections.Section.prototype.setAnimations = function(){

	var fadeInTweener = TweenMax.fromTo(this.domElement, .5, {
		'opacity': 0
	}, {
		'opacity': 1
	});

	this._animateInTweener.add( fadeInTweener );

	var fadeOutTweener = TweenMax.fromTo(this.domElement, .5, {
		'opacity': 1
	}, {
		'opacity': 0
	});

	this._animateOutTweener.add( fadeOutTweener );
};


feng.views.sections.Section.prototype.animateIn = function(){

	if(this.isShown()) return false;

	this.show();
	this.activate();
	this._animateInTweener.restart();

	this.dispatchEvent({
		type: feng.events.EventType.ANIMATE_IN
	});

	return true;
};


feng.views.sections.Section.prototype.animateOut = function(){

	if(!this.isShown()) return false;

	this.deactivate();
	this._animateOutTweener.restart();

	this.dispatchEvent({
		type: feng.events.EventType.ANIMATE_OUT
	});

	return true;
};


feng.views.sections.Section.prototype.doNavigate = function(){

	this.load();
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
	
	//console.log("section load complete");

	goog.array.forEach( this._assetKeys, function(key) {
		goog.array.insert(this._loadedAssetKeys, key);
	}, this);

	goog.array.clear( this._assetKeys );
};


feng.views.sections.Section.prototype.onLoadAnimationComplete = function(e){
	
	//console.log("section load animation complete");
};


feng.views.sections.Section.prototype.onNavigationChange = function(e){

	var shouldNavigate = (e.tokenArray && e.tokenArray[0] === this.id);

	if(shouldNavigate) this.doNavigate();
};