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

  //
  this._blur = 0;
  this._brightness = 0;
  this._contrast = 0;
  this._vignette = 0;

  this._maxBlur = 50;
  this._minBrightness = -.5;
  this._minContrast = -.5;
  this._maxVignette = 1;

  this._blurTweener = TweenMax.fromTo(this, .5, {
  	_blur: 0,
  	_brightness: 0,
  	_contrast: 0
  }, {
  	_blur: this._maxBlur,
  	_brightness: this._minBrightness,
  	_contrast: this._minContrast,
  	'ease': Quad.easeInOut,
  	'paused': true,
  	'onStart': this.onBlurInStart,
  	'onStartScope': this,
  	'onReverseComplete': this.onBlurOutComplete,
  	'onReverseCompleteScope': this
  });

  this._vignetteTweener = TweenMax.fromTo(this, 1, {
  	_vignette: 0
  }, {
  	_vignette: this._maxVignette,
  	'paused': true
  });

  this._brightnessTweener = TweenMax.fromTo(this, .5, {
  	_brightness: 0
  }, {
  	_brightness: this._minBrightness,
  	'ease': Quad.easeInOut,
  	'paused': true
  });
};
goog.inherits(feng.controllers.view3d.RenderController, goog.events.EventTarget);


feng.controllers.view3d.RenderController.prototype.updateByMode = function(mode, nextMode, progress) {

	var progress = progress || 0;

	var modeToCloseUp = (mode === feng.controllers.view3d.ModeController.Mode.CLOSE_UP || nextMode === feng.controllers.view3d.ModeController.Mode.CLOSE_UP);
	var modeToDesign = (mode === feng.controllers.view3d.ModeController.Mode.DESIGN || nextMode === feng.controllers.view3d.ModeController.Mode.DESIGN);

	var notCloseUp = (mode !== feng.controllers.view3d.ModeController.Mode.CLOSE_UP && nextMode !== feng.controllers.view3d.ModeController.Mode.CLOSE_UP);
	var notDesign = (mode !== feng.controllers.view3d.ModeController.Mode.DESIGN && nextMode !== feng.controllers.view3d.ModeController.Mode.DESIGN);

	if(modeToCloseUp) {

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

	if(modeToCloseUp || modeToDesign) {

		if(!this._vignetteTweener.isActive() && this._vignette < 1) {
			this._vignetteTweener.play();
		}
	}

	if(notCloseUp) {

		if(!this._blurTweener.reversed() && this._blur > 0) {
			this._blurTweener.reverse();
		}
	}

	if(notCloseUp && notDesign) {

		if(!this._vignetteTweener.reversed() && this._vignette > 0) {
			this._vignetteTweener.reverse();
		}
	}
};


feng.controllers.view3d.RenderController.prototype.updateByPause = function( pause ) {

	if(pause) {

		this._brightnessTweener.restart();

	}else {

		this._brightnessTweener.reverse();
	}
};


feng.controllers.view3d.RenderController.prototype.onBlurInStart = function() {

	this._renderer._blurTexturePass.enabled = true;
	//this._renderer._maskPass.enabled = true;
	//this._renderer._renderTexturePass.enabled = true;
	//this._renderer._clearMaskPass.enabled = true;

	this._renderer.render();
};


feng.controllers.view3d.RenderController.prototype.onBlurOutComplete = function() {

	this._maskedObject = null;

	this._renderer._blurTexturePass.enabled = false;
	this._renderer.render();
};


feng.controllers.view3d.RenderController.prototype.onBeforeRender = function() {

	this._renderer.setBlur( this._blur, this._blur );
	this._renderer.setBrightness( this._brightness );
	this._renderer.setContrast( this._contrast );
	this._renderer.setVignette( this._vignette );
};


feng.controllers.view3d.RenderController.prototype.onBeforeRenderBlur = function() {

	var maskedObject = this._maskedObject;
	var view3dObjects = this._view3d.view3dObjects;

	goog.object.forEach(view3dObjects, function(view3dObject) {

		view3dObject.enableRender();
	});

	if(maskedObject) {
		
		maskedObject.disableRender();
		this._view3d.arms.disableRender();
	}
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
		this._view3d.arms.enableRender();
	}
};