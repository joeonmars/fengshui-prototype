goog.provide('feng.views.sections.Episode');

goog.require('goog.dom');
goog.require('goog.events.EventTarget');
goog.require('feng.events');
goog.require('feng.events.EventMediator');
goog.require('feng.views.sections.Section');
goog.require('feng.views.View3D');
goog.require('feng.views.sections.controls.Compass');


/**
 * @constructor
 */
feng.views.sections.Episode = function(domElement){

  goog.base(this, domElement);

  // for passing events sent between view3d and controls
  this._eventMediator = new feng.events.EventMediator();

  var compassDom = goog.dom.getElementByClass('compass', this.domElement);
  this._compass = new feng.views.sections.controls.Compass( compassDom, this._eventMediator );

  this._view3d = null;
};
goog.inherits(feng.views.sections.Episode, feng.views.sections.Section);


feng.views.sections.Episode.prototype.init = function(){

	goog.base(this, 'init');
};


feng.views.sections.Episode.prototype.show = function(){

	goog.base(this, 'show');

	if(this._view3d) {
		this._view3d.show();
	}
};


feng.views.sections.Episode.prototype.hide = function(){

	goog.base(this, 'hide');

	if(this._view3d) {
		this._view3d.hide();
	}
};


feng.views.sections.Episode.prototype.activate = function(){

	goog.base(this, 'activate');

	if(this._view3d) {
		this._view3d.activate();
	}

	this._compass.activate();
};


feng.views.sections.Episode.prototype.deactivate = function(){

	goog.base(this, 'deactivate');

	this._eventMediator.unlistenAll();

	if(this._view3d) {
		this._view3d.deactivate();
	}

	this._compass.deactivate();
};


feng.views.sections.Episode.prototype.onLoadComplete = function(e){

	goog.base(this, 'onLoadComplete', e);

	if(!this._view3d) {
		// create view 3d
		var view3dElement = goog.dom.getElementByClass('sceneContainer', this.domElement);
		var uiElement = goog.dom.getElementByClass('sceneUI', this.domElement);
		this._view3d = new feng.views.View3D( view3dElement, uiElement, this.id, this._eventMediator );
		this._view3d.init();
		this._view3d.show();
		this._view3d.activate();
	}
};