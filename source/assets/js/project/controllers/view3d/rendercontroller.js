goog.provide('feng.controllers.view3d.RenderController');

goog.require('goog.events.EventTarget');


/**
 * @constructor
 */
feng.controllers.view3d.RenderController = function( view3d ){

  goog.base(this);

  this._view3d = view3d;

  this._renderer = this._view3d._renderer;
  this._renderer.onBeforeRender = goog.bind(this.onBeforeRender, this);
  this._renderer.onBeforeRenderBlur = goog.bind(this.onBeforeRenderBlur, this);
  this._renderer.onBeforeRenderMask = goog.bind(this.onBeforeRenderMask, this);

  this._maskedObject = null;

  this._blur = 0;
  this._maxBlur = 50;

  this._blurTweener = TweenMax.fromTo(this, .5, {
  	_blur: 0
  }, {
  	_blur: this._maxBlur,
  	'ease': Quad.easeInOut,
  	'paused': true,
  	'onStart': this.onBlurInStart,
  	'onStartScope': this,
  	'onReverseComplete': this.onBlurOutComplete,
  	'onReverseCompleteScope': this
  });
};
goog.inherits(feng.controllers.view3d.RenderController, goog.events.EventTarget);


feng.controllers.view3d.RenderController.prototype.updateByMode = function(mode, nextMode, progress) {

	var progress = progress || 0;

	if(mode === feng.controllers.view3d.ModeController.Mode.CLOSE_UP || nextMode === feng.controllers.view3d.ModeController.Mode.CLOSE_UP) {

		var modeControl;

		if(mode === feng.controllers.view3d.ModeController.Mode.CLOSE_UP) {

			modeControl = this._view3d.modeController.getModeControl( mode );

		}else {
			modeControl = this._view3d.modeController.getModeControl( nextMode );
		}

		this._maskedObject = modeControl._activeObject;

		if(!this._blurTweener.isActive() && this._blur < this._maxBlur) {
			this._blurTweener.play();
		}
	}

	if(mode !== feng.controllers.view3d.ModeController.Mode.CLOSE_UP) {

		if(!this._blurTweener.reversed() && this._blur > 0) {
			this._blurTweener.reverse();
		}
	}
};


feng.controllers.view3d.RenderController.prototype.onBlurInStart = function() {

	this._renderer._blurTexturePass.enabled = true;
	this._renderer.render();
};


feng.controllers.view3d.RenderController.prototype.onBlurOutComplete = function() {

	this._maskedObject = null;

	this._renderer._blurTexturePass.enabled = false;
	this._renderer.render();
};


feng.controllers.view3d.RenderController.prototype.onBeforeRender = function() {

	this._renderer.setBlur( this._blur, this._blur );

	var brightness = this._blurTweener.progress() * -.5;
	this._renderer.setBrightness( brightness );

	var contrast = this._blurTweener.progress() * -.5;
	this._renderer.setContrast( contrast );
};


feng.controllers.view3d.RenderController.prototype.onBeforeRenderBlur = function() {

	var maskedObject = this._maskedObject;
	var view3dObjects = this._view3d.view3dObjects;

	goog.object.forEach(view3dObjects, function(view3dObject) {

		view3dObject.enableRender();
	});

	if(maskedObject) maskedObject.disableRender();
};


feng.controllers.view3d.RenderController.prototype.onBeforeRenderMask = function() {

	if(!this._maskedObject) return;

	var maskedObject = this._maskedObject;
	var view3dObjects = this._view3d.view3dObjects;

	goog.object.forEach(view3dObjects, function(view3dObject) {

		view3dObject.disableRender();
	});

	if(maskedObject) {
		
		maskedObject.enableRender();
	}
};