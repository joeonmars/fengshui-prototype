goog.provide('feng.views.sections.Episode');

goog.require('goog.dom');
goog.require('goog.events.EventTarget');
goog.require('feng.controllers.view3d.View3DController');
goog.require('feng.events');
goog.require('feng.views.sections.Section');
goog.require('feng.views.View3D');
goog.require('feng.views.View3DHud');


/**
 * @constructor
 */
feng.views.sections.Episode = function(template, templateData){

	var domFrag = soy.renderAsFragment(template, templateData);

	var mainElement = goog.dom.getElement('main');
  goog.dom.appendChild(mainElement, domFrag);

  var domElement = goog.dom.getElement( templateData.id );

  goog.base(this, domElement);

  this._view3dController = new feng.controllers.view3d.View3DController;

  this._view3dContainerEl = goog.dom.getElementByClass('sceneContainer', this.domElement);

  var hudEl = goog.dom.getElementByClass('hud', this.domElement);
  var tips = templateData.tips;
  this._hud = new feng.views.View3DHud( hudEl, this._view3dController, tips, this );

  this._viewIds = [];
  this._viewId = null;

  this._view3ds = [];
  this._view3d = null;
};
goog.inherits(feng.views.sections.Episode, feng.views.sections.Section);


feng.views.sections.Episode.prototype.init = function(){

	goog.base(this, 'init');
};


feng.views.sections.Episode.prototype.activate = function(){

	goog.base(this, 'activate');

	this._view3dController.activate();

	this._hud.activate();

	this._view3dController.listen(feng.events.EventType.SHOW, this.onShowView3D, false, this);

	this.activateView();
};


feng.views.sections.Episode.prototype.activateView = function(){

	if(this._view3d) {
		this._view3d.activate();
	}
};


feng.views.sections.Episode.prototype.deactivate = function(){

	goog.base(this, 'deactivate');

	this._view3dController.deactivate();

	this._hud.deactivate();
	
	this._view3dController.unlisten(feng.events.EventType.SHOW, this.onShowView3D, false, this);

	if(this._view3d) {
		this._view3d.deactivate();
	}
};


feng.views.sections.Episode.prototype.load = function( viewId ){

	this._viewId = viewId || this._viewIds[0];

	var globalAssetsKey = this.id + '.global';
	var view3dAssetsKey = this.id + '.' + this._viewId;

	this._assetKeys = [globalAssetsKey, view3dAssetsKey];
	
	goog.base(this, 'load');
};


feng.views.sections.Episode.prototype.animateIn = function(){

	var shouldDo = goog.base(this, 'animateIn');

	if(!shouldDo) return false;
	
	this._view3d.fadeIn();

	feng.soundController.playMix( this.id );
};


feng.views.sections.Episode.prototype.animateOut = function(){

	var shouldDo = goog.base(this, 'animateOut');

	if(!shouldDo) return false;

	feng.soundController.stopMix( this.id );

	this._viewId = null;
	this._view3d = null;
};


feng.views.sections.Episode.prototype.onLoadComplete = function(e){

	goog.base(this, 'onLoadComplete', e);

	if(this._view3ds.length === 0) {

		// create hud
		this._hud.init();
	}

	// register loaded view3d
	var sectionId = this.id;
	var viewId = this._viewId;

	var alreadyRegistered = this._view3dController.isRegisteredViewID( sectionId, this._viewId );

	if(!alreadyRegistered) {

		var view3d = new feng.views.View3D( sectionId, viewId, this._view3dContainerEl, this._hud, this );
		this._view3dController.registerView3D( view3d );
		
		view3d.init();

		this._view3ds.push( view3d );
	}

	if(!this._view3d) {

		this._view3d = this._view3dController.getView3D( sectionId, viewId );
		this.activateView();
	}
};


feng.views.sections.Episode.prototype.onShowView3D = function(e){

	var view3d = e.target;

	var gatewayObject = view3d.getEntry();
	var position = gatewayObject.origin.position;
	var rotation = gatewayObject.origin.rotation;
  
  // set initial mode
	view3d.modeController.setMode({
		mode: feng.controllers.view3d.ModeController.Mode.BROWSE,
		fromPosition: position,
		fromRotation: rotation,
		fromFov: feng.controllers.controls.Controls.Default.FOV
	});
	
	// test mode
	if(feng.utils.Utils.hasQuery('interaction', 'true')) {

		var objectName = feng.utils.Utils.getQuery('object');

		var object = view3d.getInteractiveObject( objectName );
		var cameraSettings = object.specialCameraSettings;

		view3d.modeController.onModeChange({
			type: feng.events.EventType.CHANGE,
			mode: feng.controllers.view3d.ModeController.Mode.TRANSITION,
			nextMode: feng.controllers.view3d.ModeController.Mode.CLOSE_UP,
			toPosition: cameraSettings.position,
			toRotation: cameraSettings.rotation,
			toFov: cameraSettings.fov,
			object: object
		});
	}
};