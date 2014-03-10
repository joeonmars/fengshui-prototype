goog.provide('feng.fx.PostProcessing');


/**
 * @constructor
 */
feng.fx.PostProcessing = function( renderer, options ){

	this._dpr = window.devicePixelRatio;

	this._renderer = renderer;
	this._composer = new THREE.EffectComposer( this._renderer );
	this._renderPass = null;
	this._copyPass = null;
	this._fxaaPass = null;
	this._bloomPass = null;

	this.setOptions( options );
};
goog.inherits(feng.fx.PostProcessing, goog.events.EventTarget);


feng.fx.PostProcessing.prototype.activate = function(){

	goog.events.listen(window, 'resize', this.onResize, false, this);
};


feng.fx.PostProcessing.prototype.deactivate = function(){

	goog.events.unlisten(window, 'resize', this.onResize, false, this);
};


feng.fx.PostProcessing.prototype.updateComposer = function(){

	var rendererSize = goog.style.getSize( this._renderer.domElement );
	this._composer.setSize(rendererSize.width * this._dpr, rendererSize.height * this._dpr);
};


feng.fx.PostProcessing.prototype.updateFXAAPass = function(){

	var rendererSize = goog.style.getSize( this._renderer.domElement );
	this._fxaaPass.uniforms['resolution'].value.set(1 / (rendererSize.width * this._dpr), 1 / (rendererSize.height * this._dpr));
};


feng.fx.PostProcessing.prototype.updateRenderPass = function(scene, camera){

	this._renderPass.scene = scene;
	this._renderPass.camera = camera;
};


feng.fx.PostProcessing.prototype.setOptions = function( options ){

	var options = {
	  enableFXAA: goog.isBoolean(options.enableFXAA) ? options.enableFXAA : false,
	  enableBloom: goog.isBoolean(options.enableBloom) ? options.enableBloom : false,
	  bloomStrength: options.bloomStrength || 0.3,
	  enableFilm: goog.isBoolean(options.enableFilm) ? options.enableFilm : false,
	  enableTiltShift: goog.isBoolean(options.enableTiltShift) ? options.enableTiltShift : false,
	  tiltBlur: goog.isNumber(options.tiltBlur) ? options.tiltBlur : 3.5,
	  enableVignette: goog.isBoolean(options.enableVignette) ? options.enableVignette : false
	};

	if(options.enableFXAA || options.enableBloom || options.enableFilm || options.enableTiltShift || options.enableVignette) {
		this._renderPass = new THREE.RenderPass();
		this._composer.addPass( this._renderPass );
	}

	if(options.enableFXAA) {

		this._fxaaPass = new THREE.ShaderPass( THREE.FXAAShader );
		this.updateFXAAPass();
		this._composer.addPass( this._fxaaPass );
	}

	if(options.enableBloom) {

		this._bloomPass = new THREE.BloomPass( options.bloomStrength );
		this._composer.addPass( this._bloomPass );
	}

	this._copyPass = new THREE.ShaderPass( THREE.CopyShader );
	this._copyPass.renderToScreen = true;
	this._composer.addPass( this._copyPass );
};


feng.fx.PostProcessing.prototype.render = function(scene, camera){

	this.updateRenderPass(scene, camera);
	this._composer.render();
};


feng.fx.PostProcessing.prototype.onResize = function(e){

	if(this._fxaaPass) this.updateFXAAPass();

	this.updateComposer();
};