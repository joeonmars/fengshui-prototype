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

  this._studioBackgroundEl = goog.dom.getElementByClass('background', this._studioEl);
  this._townhouseBackgroundEl = goog.dom.getElementByClass('background', this._townhouseEl);

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
};


feng.views.SceneSelection.prototype.updateSceneStatus = function(){

	goog.style.setStyle( this._studioEl, 'width', this._studioRatio * 100 + '%' );
	goog.style.setStyle( this._townhouseEl, 'width', this._townhouseRatio * 100 + '%' );

	var studioOpacity, townhouseOpacity;

	if(this._studioRatio > this._townhouseRatio) {

		studioOpacity = 1;
		townhouseOpacity = .3;

	}else if(this._studioRatio < this._townhouseRatio) {

		studioOpacity = .3;
		townhouseOpacity = 1;

	}else {

		studioOpacity = .5;
		townhouseOpacity = .5;
	}

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