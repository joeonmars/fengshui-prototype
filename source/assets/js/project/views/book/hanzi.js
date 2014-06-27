goog.provide('feng.views.book.Hanzi');

goog.require('feng.models.Preload');


feng.views.book.Hanzi = function(canvas, id) {

	goog.base(this);
	
	this._renderer = new THREE.WebGLRenderer( {
		canvas: canvas,
		antialias: true
	});

	this._renderer.gammaInput = true;
	this._renderer.gammaOutput = true;

	this._scene = feng.views.book.Hanzi.constructScene(id).scene;
};
goog.inherits(feng.views.book.Hanzi, goog.events.EventTarget);


feng.views.book.Hanzi.prototype.activate = function() {

	goog.fx.anim.registerAnimation( this );

	goog.events.listen(window, 'mousemove', this.onMouseMove, false, this);
};


feng.views.book.Hanzi.prototype.deactivate = function() {

	goog.fx.anim.unregisterAnimation( this );

	goog.events.unlisten(window, 'mousemove', this.onMouseMove, false, this);
};


feng.views.book.Hanzi.prototype.onMouseMove = function(e) {


};


feng.views.book.Hanzi.prototype.onAnimationFrame = function(now) {


};


feng.views.book.Hanzi.constructScene = function(id) {

	// create a threejs loader just for parsing scene data
	var loader = new THREE.ObjectLoader();

	// get scene data
	var preloadModel = feng.models.Preload.getInstance();
	var sceneData = preloadModel.getAsset('global.hanzi.'+id+'.scene');
	var scene = loader.parse( sceneData );

  return {
  	scene: scene
  };
};