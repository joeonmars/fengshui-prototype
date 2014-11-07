goog.provide('feng.fx.Renderer');

goog.require('goog.array');


/**
 * @constructor
 */
feng.fx.Renderer = function(canvas, scene, camera){

	this._DPR = 1; //window.devicePixelRatio || 1; working weirdly

	// create default renderer
	this._renderer = new THREE.WebGLRenderer( {
		canvas: canvas,
		antialias: false,
		devicePixelRatio: this._DPR
	});

	this._renderer.gammaInput = true;
	this._renderer.gammaOutput = true;
	this._renderer.autoClear = false;
	this._renderer.setClearColor( 0xffffff, 0 );

	this._renderer.shadowMapEnabled = true; // WIP: comment this off to resolve WEBGL warnings
	this._renderer.shadowMapType = THREE.PCFSoftShadowMap;

	// callbacks
	this.onBeforeRender = null;
	this.onBeforeRenderBlur = null;
	this.onBeforeRenderMask = null;

	// postprocessing

	// create passes
	this._renderPass = new THREE.RenderPass( scene );

	this._fxaaPass = new THREE.ShaderPass( THREE.FXAAShader );
	this._fxaaPass.renderToScreen = true;

	this._vignettePass = new THREE.ShaderPass( THREE.VignetteShader );
	this._vignettePass.uniforms['offset'].value = 0.95;
	this.setVignette( 0 );

	this._blurXPass = new THREE.ShaderPass( THREE.TriangleBlurShader, 'texture' );
	this._blurXPass.uniforms[ 'delta' ].value = new THREE.Vector2( 0, 0 );

	this._blurYPass = new THREE.ShaderPass( THREE.TriangleBlurShader, 'texture' );
	this._blurYPass.uniforms[ 'delta' ].value = new THREE.Vector2( 0, 0 );

	this._brightnessContrastPass = new THREE.ShaderPass( THREE.BrightnessContrastShader );

	this._hueSaturationPass = new THREE.ShaderPass( THREE.HueSaturationShader );

	this._bloomPass = new THREE.BloomPass(.20, 25, 4);

	this._adjustmentBrightnessContrastPass = new THREE.ShaderPass( THREE.BrightnessContrastShader );
	this._adjustmentBrightnessContrastPass.uniforms['brightness'].value = 0.05;
	this._adjustmentBrightnessContrastPass.uniforms['contrast'].value = 0.05;

	this._maskPass = new THREE.MaskPass( scene );
	this._maskPass.enabled = false;

	this._clearMaskPass = new THREE.ClearMaskPass();
	this._clearMaskPass.enabled = false;

	// create composers

	// create a custom render target with a stencil buffer
	// the stencil buffer allows for masking to take place
	var renderTargetParameters = {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		format: THREE.RGBAFormat,
		stencilBuffer: true
	};

	var resolution = (new goog.math.Size( screen.width, screen.height )).scale( this._DPR ).scale( 1 );

	// create default render texture pass
	var renderTarget = new THREE.WebGLRenderTarget( resolution.width, resolution.height, renderTargetParameters );
	renderTarget.generateMipmaps = false;

	this._renderComposer = new THREE.EffectComposer( this._renderer, renderTarget );
	this._renderComposer.addPass( this._renderPass );

	this._renderTexturePass = new THREE.TexturePass( this._renderComposer.renderTarget2 );

	this._renderTextureForMaskingPass = new THREE.TexturePass( this._renderComposer.renderTarget2 );
	this._renderTextureForMaskingPass.enabled = false;

	// create blur texture pass
	var renderSize = feng.renderSettings.renderSize;
	var renderTarget = new THREE.WebGLRenderTarget( renderSize, renderSize, renderTargetParameters );
	renderTarget.generateMipmaps = false;

	this._blurComposer = new THREE.EffectComposer( this._renderer, renderTarget );
	this._blurComposer.addPass( this._renderPass );
	this._blurComposer.addPass( this._blurXPass );
	this._blurComposer.addPass( this._blurYPass );

	this._blurTexturePass = new THREE.TexturePass( this._blurComposer.renderTarget2 );
	this._blurTexturePass.enabled = false;

	// create output
	var renderTarget = new THREE.WebGLRenderTarget( resolution.width, resolution.height, renderTargetParameters );
	renderTarget.generateMipmaps = false;
	
	this._outputComposer = new THREE.EffectComposer( this._renderer, renderTarget );

	this._outputComposer.addPass( this._renderTexturePass );

	this._outputComposer.addPass( this._blurTexturePass );

	this._outputComposer.addPass( this._brightnessContrastPass );

	this._outputComposer.addPass( this._maskPass );
	this._outputComposer.addPass( this._renderTextureForMaskingPass );
	this._outputComposer.addPass( this._clearMaskPass );
	
	this._outputComposer.addPass( this._bloomPass );

	this._outputComposer.addPass( this._hueSaturationPass );

	this._outputComposer.addPass( this._adjustmentBrightnessContrastPass );

	this._outputComposer.addPass( this._vignettePass );

	this._outputComposer.addPass( this._fxaaPass );

	//
	this.setCamera( camera );
};
goog.inherits(feng.fx.Renderer, goog.events.EventTarget);


feng.fx.Renderer.prototype.getRenderer = function(){

	return this._renderer;
};


feng.fx.Renderer.prototype.getPassIndex = function( pass ){

	return goog.array.indexOf(this._outputComposer.passes, pass);
};


feng.fx.Renderer.prototype.setCamera = function( camera ){

	this._renderPass.camera = camera;
	this._maskPass.camera = camera;
};


feng.fx.Renderer.prototype.setBlur = function( x, y ){

	var blurinessX = x || 0;
	var blurinessY = y || 0;

	var blurAmountX = blurinessX / 512;
	var blurAmountY = blurinessY / 512;

	this._blurXPass.uniforms[ 'delta' ].value.x = blurAmountX;
	this._blurYPass.uniforms[ 'delta' ].value.y = blurAmountY;
};


feng.fx.Renderer.prototype.setBrightness = function( brightness ){

	this._brightnessContrastPass.uniforms['brightness'].value = brightness;
};


feng.fx.Renderer.prototype.setContrast = function( contrast ){

	this._brightnessContrastPass.uniforms['contrast'].value = contrast;
};


feng.fx.Renderer.prototype.setSaturation = function( saturation ){

	this._hueSaturationPass.uniforms['saturation'].value = saturation;
};


feng.fx.Renderer.prototype.setVignette = function( t ){

	// darkness ranges from 0 - 1
	var darkness = goog.math.lerp(0.5, 1, t);

	this._vignettePass.uniforms['darkness'].value = darkness;
};


feng.fx.Renderer.prototype.setSize = function( width, height ){

	this._renderer.setSize( width, height );

	this._fxaaPass.uniforms['resolution'].value.set( 1 / (width * this._DPR), 1 / (height * this._DPR) );
};


feng.fx.Renderer.prototype.render = function(){

	if(this.onBeforeRender) this.onBeforeRender();

	if(this.onBeforeRenderBlur) this.onBeforeRenderBlur();
	
	this._blurComposer.render();

	if(this.onBeforeRenderMask) this.onBeforeRenderMask();

	this._renderComposer.render();

	this._outputComposer.render();
};