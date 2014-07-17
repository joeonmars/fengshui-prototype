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

  var hudEl = goog.dom.getElementByClass('hud', this.domElement);
  var tips = templateData.tips;
  this._hud = new feng.views.View3DHud( hudEl, this._view3dController, tips );

  this._viewIds = [];
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
};


feng.views.sections.Episode.prototype.onLoadComplete = function(e){

	goog.base(this, 'onLoadComplete', e);

	if(this._view3ds.length === 0) {

		// create view 3ds
		var view3dContainerEl = goog.dom.getElementByClass('sceneContainer', this.domElement);

		var sectionId = this.id;

		this._view3ds = goog.array.map(this._viewIds, function(viewId) {

			var view3d = new feng.views.View3D( sectionId, viewId, view3dContainerEl, this._hud );
			this._view3dController.registerView3D( view3d );

			view3d.init();

			return view3d;
		}, this);

		this._view3d = this._view3ds[0];

		this.activateView();
	}
};


feng.views.sections.Episode.prototype.onShowView3D = function(e){

	var view3d = e.target;

	var position = view3d.origin;
	var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
  var lookAtPosition = new THREE.Vector3(0, feng.controllers.controls.Controls.Default.STANCE_HEIGHT, 0);
  var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(position, lookAtPosition);
  rotation.setFromQuaternion( quaternion );

  // set initial mode
	view3d.modeController.setMode({
		mode: feng.controllers.view3d.ModeController.Mode.BROWSE,
		fromPosition: position,
		fromRotation: rotation,
		fromFov: 40
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