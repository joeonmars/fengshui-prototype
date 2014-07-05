goog.provide('feng.views.book.Hanzi');

goog.require('feng.models.Preload');


feng.views.book.Hanzi = function(canvas) {

	goog.base(this);
	
	this.id = canvas.getAttribute('data-id');
	this._color = feng.Color[ canvas.getAttribute('data-color').toUpperCase() ];

	this._size = new goog.math.Size(360, 280);

	canvas.width = this._size.width;
	canvas.height = this._size.height;

	this._renderer = new THREE.WebGLRenderer( {
		canvas: canvas,
		antialias: true
	});

	this._renderer.setClearColor( feng.Color.CREAM, 1 );
	this._renderer.gammaInput = true;
	this._renderer.gammaOutput = true;

	this._scene = feng.views.book.Hanzi.constructScene( this.id ).scene;
	this._camera = new THREE.PerspectiveCamera( 20, this._size.aspectRatio(), 1, 1000 );
	this._camera.position.z = 450;
	this._scene.add( this._camera );

	this._type = this._scene.getObjectByName('type');
	this._type.material.color.set( this._color );
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

	this._renderer.render( this._scene, this._camera );
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