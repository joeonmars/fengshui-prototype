goog.provide('feng.controllers.view3d.RenderController');

goog.require('goog.events.EventTarget');


/**
 * @constructor
 */
feng.controllers.view3d.RenderController = function( view3d ){

  goog.base(this);

  this._view3d = view3d;

  this._renderer = this._view3d.renderer;
  this._renderer.onBeforeRender = goog.bind(this.onBeforeRender, this);
  this._renderer.onBeforeRenderBlur = goog.bind(this.onBeforeRenderBlur, this);
  this._renderer.onBeforeRenderMask = goog.bind(this.onBeforeRenderMask, this);

  this._maskedObject = null;

  //
  this._maxBlur = 20;
  this._minBrightness = -.20;
  this._minContrast = -.35;
  this._minVignette = 1;
  this._maxVignette = 3;

  this.blur = 0;
  this.brightness = 0;
  this.globalBrightness = 0;
  this.globalContrast = 0;
  this.contrast = 0;
  this.saturation = 0;
  this.vignette = this._minVignette;

  this._closeUpTweener = TweenMax.fromTo(this, .5, {
  	blur: 0,
  	brightness: 0,
  	contrast: 0
  }, {
  	blur: this._maxBlur,
  	brightness: this._minBrightness,
  	contrast: this._minContrast,
  	'ease': Quad.easeInOut,
  	'paused': true,
  	'onStart': this.onCloseUpStart,
  	'onStartScope': this,
  	'onReverseComplete': this.onCloseUpComplete,
  	'onReverseCompleteScope': this
  });

  this._vignetteTweener = TweenMax.fromTo(this, 1, {
  	vignette: this._minVignette
  }, {
  	vignette: this._maxVignette,
  	'paused': true
  });

  this._brightnessTweener = TweenMax.fromTo(this, .5, {
  	brightness: 0,
  	contrast: 0,
  	blur: this.blur,
  	saturation: 0
  }, {
  	brightness: -.65,
  	contrast: -.2,
  	blur: 6,
  	saturation: -.65,
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

		if(!this._closeUpTweener.isActive() && this.blur < this._maxBlur) {
			this._closeUpTweener.play();
		}
	}

	if(modeToCloseUp || modeToDesign) {

		if(!this._vignetteTweener.isActive() && this.vignette < this._maxVignette) {
			this._vignetteTweener.play();
		}
	}

	if(notCloseUp) {

		if(!this._closeUpTweener.reversed() && this.blur > 0) {
			this._closeUpTweener.reverse();
		}
	}

	if(notCloseUp && notDesign) {

		if(!this._vignetteTweener.reversed() && this.vignette > this._minVignette) {
			this._vignetteTweener.reverse();
		}
	}
};


feng.controllers.view3d.RenderController.prototype.updateByPause = function( pause ) {

	if(pause) {

		if(this._brightnessTweener.isActive()) {
			this._brightnessTweener.play();
		}else {
			this._brightnessTweener.restart();
		}

	}else {

		this._brightnessTweener.reverse();
	}
};


feng.controllers.view3d.RenderController.prototype.onCloseUpStart = function() {

	this._renderer._maskPass.enabled = true;
	this._renderer._renderTextureForMaskingPass.enabled = true;
	this._renderer._clearMaskPass.enabled = true;

	this.onBlurInStart();

	this._renderer.render();
};


feng.controllers.view3d.RenderController.prototype.onCloseUpComplete = function() {

	this._maskedObject = null;

	this._renderer._maskPass.enabled = false;
	this._renderer._renderTextureForMaskingPass.enabled = false;
	this._renderer._clearMaskPass.enabled = false;

	this.onBlurOutComplete();

	this._renderer.render();
};


feng.controllers.view3d.RenderController.prototype.onBlurInStart = function() {

	this._renderer._blurTexturePass.enabled = true;
};


feng.controllers.view3d.RenderController.prototype.onBlurOutComplete = function() {

	if(this.blur === 0) {
		this._renderer._blurTexturePass.enabled = false;
	}
};


feng.controllers.view3d.RenderController.prototype.onBeforeRender = function() {

	this._renderer.setBlur( this.blur, this.blur );
	this._renderer.setBrightness( this.brightness );
	this._renderer.setContrast( this.contrast );
	this._renderer.setGlobalBrightnessContrast( this.globalBrightness, this.globalContrast );
	this._renderer.setSaturation( this.saturation );
	this._renderer.setVignette( this.vignette );
};


feng.controllers.view3d.RenderController.prototype.onBeforeRenderBlur = function() {

	var maskedObject = this._maskedObject;
	var view3dObjects = this._view3d.view3dObjects;

	for(var name in view3dObjects) {

		view3dObjects[ name ].enableRender();
	}

	this._view3d.fx.onBeforeRenderBlur();

	if(maskedObject) {
		
		maskedObject.disableRender();
		this._view3d.arms.disableRender();
	}
};


feng.controllers.view3d.RenderController.prototype.onBeforeRenderMask = function() {

	if(!this._maskedObject) return;

	var maskedObject = this._maskedObject;
	var view3dObjects = this._view3d.view3dObjects;

	for(var name in view3dObjects) {

		view3dObjects[ name ].disableRender();
	}

	this._view3d.fx.onBeforeRenderMask();

	if(maskedObject) {

		maskedObject.enableRender();

		// force arms to render
		this._view3d.arms.enableRender();
		
		// force skybox to render with wall when enabled
		if(this._view3d.getView3dObject('wall').isRenderEnabled) {
			this._view3d.skybox.enableRender();
		}

		if(maskedObject.hasPicked && maskedObject.dropParent && maskedObject.dropParent.view3dObject) {
			maskedObject.dropParent.view3dObject.enableRender();
		}
	}
};