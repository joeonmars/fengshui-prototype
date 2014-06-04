goog.provide('feng.fx.Renderer');

goog.require('goog.array');


/**
 * @constructor
 */
feng.fx.Renderer = function(canvas, scene, camera){

	// create default renderer
	this._renderer = new THREE.WebGLRenderer( {
		canvas: canvas,
		antialias: false
	});

	this._renderer.gammaInput = true;
	this._renderer.gammaOutput = true;
	this._renderer.physicallyBasedShading = true;
	this._renderer.autoClear = false;
	this._renderer.setClearColor( 0xffffff, 0 );

	this._renderer.shadowMapEnabled = true;
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

	this._blurXPass = new THREE.ShaderPass( THREE.TriangleBlurShader, 'texture' );
	this._blurXPass.uniforms[ 'delta' ].value = new THREE.Vector2( 0, 0 );

	this._blurYPass = new THREE.ShaderPass( THREE.TriangleBlurShader, 'texture' );
	this._blurYPass.uniforms[ 'delta' ].value = new THREE.Vector2( 0, 0 );

	this._brightnessContrastPass = new THREE.ShaderPass( THREE.BrightnessContrastShader );
	this._brightnessContrastPass.uniforms['brightness'].value = 0;
	this._brightnessContrastPass.uniforms['contrast'].value = 0;

	this._maskPass = new THREE.MaskPass( scene );
	this._clearMaskPass = new THREE.ClearMaskPass();

	// create composers

	// create a custom render target with a stencil buffer
	// the stencil buffer allows for masking to take place
	var renderTargetParameters = {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		format: THREE.RGBAFormat,
		stencilBuffer: true
	};

	var res = (window.screen.width < 1280) ? feng.fx.Renderer.Resolution['480p'] : feng.fx.Renderer.Resolution['720p'];

	// create default render texture pass
	var renderTarget = new THREE.WebGLRenderTarget( res.width, res.height, renderTargetParameters );

	this._renderComposer = new THREE.EffectComposer( this._renderer, renderTarget );
	this._renderComposer.addPass( this._renderPass );

	this._renderTexturePass = new THREE.TexturePass( this._renderComposer.renderTarget2 );

	// create blur texture pass
	var renderTarget = new THREE.WebGLRenderTarget( 256, 256, renderTargetParameters );

	this._blurComposer = new THREE.EffectComposer( this._renderer, renderTarget );
	this._blurComposer.addPass( this._renderPass );
	this._blurComposer.addPass( this._blurXPass );
	this._blurComposer.addPass( this._blurYPass );

	this._blurTexturePass = new THREE.TexturePass( this._blurComposer.renderTarget2 );
	this._blurTexturePass.enabled = false;

	// create output
	var renderTarget = new THREE.WebGLRenderTarget( res.width, res.height, renderTargetParameters );

	this._outputComposer = new THREE.EffectComposer( this._renderer, renderTarget );

	this._outputComposer.addPass( this._renderTexturePass );

	this._outputComposer.addPass( this._blurTexturePass );

	this._outputComposer.addPass( this._brightnessContrastPass );

	this._outputComposer.addPass( this._maskPass );
	this._outputComposer.addPass( this._renderTexturePass );
	this._outputComposer.addPass( this._clearMaskPass );

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

	blurAmountX = blurinessX / 512;
	blurAmountY = blurinessY / 512;

	this._blurXPass.uniforms[ 'delta' ].value.x = blurAmountX;
	this._blurYPass.uniforms[ 'delta' ].value.y = blurAmountY;
};


feng.fx.Renderer.prototype.setBrightness = function( brightness ){

	this._brightnessContrastPass.uniforms['brightness'].value = brightness;
};


feng.fx.Renderer.prototype.setContrast = function( contrast ){

	this._brightnessContrastPass.uniforms['contrast'].value = contrast;
};


feng.fx.Renderer.prototype.setSize = function( width, height ){

	this._renderer.setSize( width, height );

	this._fxaaPass.uniforms['resolution'].value.set( 1/width, 1/height );
};


feng.fx.Renderer.prototype.render = function(){

	if(this.onBeforeRender) this.onBeforeRender();

	if(this.onBeforeRenderBlur) this.onBeforeRenderBlur();
	this._blurComposer.render();

	if(this.onBeforeRenderMask) this.onBeforeRenderMask();

	this._renderComposer.render();

	this._outputComposer.render();
};


feng.fx.Renderer.Resolution = {
	'720p': new goog.math.Size(1280, 720),
	'480p': new goog.math.Size(640, 480)
};