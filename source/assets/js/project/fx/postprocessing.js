goog.provide('feng.fx.PostProcessing');


/**
 * @constructor
 */
feng.fx.PostProcessing = function( renderer, options ){

	this._renderer = renderer;
	this._renderer.autoClear = false;

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

	this.onResize();
};


feng.fx.PostProcessing.prototype.deactivate = function(){

	goog.events.unlisten(window, 'resize', this.onResize, false, this);
};


feng.fx.PostProcessing.prototype.resizeFXAAPass = function(){

	var rendererSize = goog.style.getSize( this._renderer.domElement );
	this._fxaaPass.uniforms['resolution'].value.set(1 / rendererSize.width, 1 / rendererSize.height);
};


feng.fx.PostProcessing.prototype.resizeComposer = function(){

	var rendererSize = goog.style.getSize( this._renderer.domElement );
	this._composer.setSize(rendererSize.width, rendererSize.height);
};


feng.fx.PostProcessing.prototype.updateRenderPass = function(scene, camera){

	this._renderPass.scene = scene;
	this._renderPass.camera = camera;
};


feng.fx.PostProcessing.prototype.setOptions = function( options ){

	var options = {
	  enableBloom: goog.isBoolean(options.enableBloom) ? options.enableBloom : false,
	  enableTiltShift: goog.isBoolean(options.enableTiltShift) ? options.enableTiltShift : false,
	  enableVignette: goog.isBoolean(options.enableVignette) ? options.enableVignette : false
	};

	this._renderPass = new THREE.RenderPass();
	this._composer.addPass( this._renderPass );

	this._fxaaPass = new THREE.ShaderPass( THREE.FXAAShader );
	//this._fxaaPass.renderToScreen = true;
	this._composer.addPass( this._fxaaPass );
	this.resizeFXAAPass();

	if(options.enableBloom) {
		this._bloomPass = new THREE.BloomPass( 0.3 );
		this._composer.addPass( this._bloomPass );
	}

	this._copyPass = new THREE.ShaderPass( THREE.CopyShader );
	this._copyPass.renderToScreen = true;
	this._composer.addPass( this._copyPass );

	this.onResize();
};


feng.fx.PostProcessing.prototype.render = function(scene, camera){

	this.updateRenderPass(scene, camera);
	this._composer.render();
};


feng.fx.PostProcessing.prototype.onResize = function(e){

	this.resizeFXAAPass();
	this.resizeComposer();
};