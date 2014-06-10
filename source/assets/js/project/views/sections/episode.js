goog.provide('feng.views.sections.Episode');

goog.require('goog.dom');
goog.require('goog.events.EventTarget');
goog.require('feng.events');
goog.require('feng.events.EventMediator');
goog.require('feng.views.sections.Section');
goog.require('feng.views.View3D');
goog.require('feng.views.sections.controls.Compass');
goog.require('feng.views.sections.controls.ProgressBar');


/**
 * @constructor
 */
feng.views.sections.Episode = function(template, templateData){

	var domFrag = soy.renderAsFragment(template, templateData);

	var mainElement = goog.dom.getElement('main');
  goog.dom.appendChild(mainElement, domFrag);

  var domElement = goog.dom.getElement( templateData.id );

  goog.base(this, domElement);

  // for passing events sent between view3d and controls
  this._eventMediator = new feng.events.EventMediator();

  var compassDom = goog.dom.getElementByClass('compass', this.domElement);
  this._compass = new feng.views.sections.controls.Compass( compassDom, this._eventMediator );

  var progressBarDom = goog.dom.getElementByClass('progressBar', this.domElement);
  this._progressBar = new feng.views.sections.controls.ProgressBar( progressBarDom, this._eventMediator );

  this._viewIds = [];
  this._view3ds = [];
  this._view3d = null;
};
goog.inherits(feng.views.sections.Episode, feng.views.sections.Section);


feng.views.sections.Episode.prototype.init = function(){

	goog.base(this, 'init');
};


feng.views.sections.Episode.prototype.show = function(){

	goog.base(this, 'show');

	this.showView();
};


feng.views.sections.Episode.prototype.showView = function(){

	if(this._view3d) {
		this._view3d.show();
		this._compass.show();
		this._progressBar.show();
	}
};


feng.views.sections.Episode.prototype.hide = function(){

	goog.base(this, 'hide');

	if(this._view3d) {
		this._view3d.hide();
		this._compass.hide();
		this._progressBar.hide();
	}
};


feng.views.sections.Episode.prototype.activate = function(){

	goog.base(this, 'activate');

	this.activateView();
};


feng.views.sections.Episode.prototype.activateView = function(){

	if(this._view3d) {
		this._view3d.activate();
		this._compass.activate();
		this._progressBar.activate();
	}
};


feng.views.sections.Episode.prototype.deactivate = function(){

	goog.base(this, 'deactivate');

	this._eventMediator.unlistenAll();

	if(this._view3d) {
		this._view3d.deactivate();
		this._compass.deactivate();
		this._progressBar.deactivate();
	}
};


feng.views.sections.Episode.prototype.onLoadComplete = function(e){

	goog.base(this, 'onLoadComplete', e);

	if(this._view3ds.length === 0) {

		// create view 3ds
		var view3dContainerEl = goog.dom.getElementByClass('sceneContainer', this.domElement);
		var uiEl = goog.dom.getElementByClass('sceneUI', this.domElement);

		var sectionId = this.id;

		this._view3ds = goog.array.map(this._viewIds, function(viewId) {

			var view3d = new feng.views.View3D( sectionId, viewId, view3dContainerEl, uiEl, this._eventMediator );
			view3d.init();

			return view3d;
		}, this);

		this._view3d = this._view3ds[0];

		this.showView();
		this.activateView();
	}
};


feng.views.sections.Episode.prototype.onLoadAnimationComplete = function(e){

	goog.base(this, 'onLoadAnimationComplete', e);

	this._view3d.fadeIn();
};