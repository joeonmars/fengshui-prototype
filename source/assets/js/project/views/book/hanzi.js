goog.provide('feng.views.book.Hanzi');

goog.require('feng.models.Preload');
goog.require('feng.fx.EnergyFlow');


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

	// add energy flow
	this._energyFlow = null;

	var hanziPreset = feng.views.book.Hanzi.Preset[ this.id ];

	var controlPoints = goog.array.map(hanziPreset.points, function(point) {
		return new THREE.Vector3(point['x'], point['y'], point['z']);
	});
	var isClosed = hanziPreset.isClosed;
	var type = hanziPreset.type;
	var debug = false;
	this._energyFlow = new feng.fx.EnergyFlow(controlPoints, isClosed, type, debug);

	this._type.add( this._energyFlow );

	this._energyFlow.fadeOut( 0 );

	// render initially
	this.render();
};
goog.inherits(feng.views.book.Hanzi, goog.events.EventTarget);


feng.views.book.Hanzi.prototype.animateIn = function( duration ) {

	goog.fx.anim.registerAnimation( this );

	var duration = goog.isNumber( duration ) ? duration : 2;

	if(this._energyFlow) {
		this._energyFlow.fadeIn( duration );
	}

	TweenMax.to(this._type.rotation, duration, {
		'y': THREE.Math.degToRad( -30 ),
		'ease': Quad.easeInOut
	});
};


feng.views.book.Hanzi.prototype.animateOut = function( duration ) {

	var duration = goog.isNumber( duration ) ? duration : 2;

	if(this._energyFlow) {
		this._energyFlow.fadeOut( duration );
	}

	TweenMax.to(this._type.rotation, duration, {
		'y': 0,
		'ease': Quad.easeInOut,
		'onComplete': function() {
			goog.fx.anim.unregisterAnimation( this );
		},
		'onCompleteScope': this
	});
};


feng.views.book.Hanzi.prototype.render = function() {

	this._renderer.render( this._scene, this._camera );
};


feng.views.book.Hanzi.prototype.onAnimationFrame = function(now) {

	this.render();
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


feng.views.book.Hanzi.Preset = {
	"chi": {
		points: [
			{
				"x": 35.51094040243115,
				"y": 39.04084695547126,
				"z": -35.526056779665986
			},
			{
				"x": 54.24191346384711,
				"y": 23.715773223685055,
				"z": 1.6020312295376615
			},
			{
				"x": 42.57921806908509,
				"y": -12.889797790028359,
				"z": 39.77685255706639
			},
			{
				"x": 7.3910280456887945,
				"y": -37.77443404387676,
				"z": 54.65860722629757
			},
			{
				"x": -31.988622724898185,
				"y": -41.657446057499,
				"z": 43.85874966248103
			},
			{
				"x": -52.979028364271386,
				"y": -26.27153843357851,
				"z": 9.082913087191686
			},
			{
				"x": -44.05488354537207,
				"y": 3.5336903803773607,
				"z": -29.557432000872694
			},
			{
				"x": -8.067390917086847,
				"y": 30.0763621262047,
				"z": -48.32407109290635
			}
		],
		type: feng.fx.EnergyFlow.Preset.HANZI_CHI,
		isClosed: true
	},
	"ji": {
		points: [
			{
				"x": 35.51094040243115,
				"y": 39.04084695547126,
				"z": -35.526056779665986
			},
			{
				"x": 54.24191346384711,
				"y": 23.715773223685055,
				"z": 1.6020312295376615
			},
			{
				"x": 42.57921806908509,
				"y": -12.889797790028359,
				"z": 39.77685255706639
			},
			{
				"x": 7.3910280456887945,
				"y": -37.77443404387676,
				"z": 54.65860722629757
			},
			{
				"x": -31.988622724898185,
				"y": -41.657446057499,
				"z": 43.85874966248103
			},
			{
				"x": -52.979028364271386,
				"y": -26.27153843357851,
				"z": 9.082913087191686
			},
			{
				"x": -44.05488354537207,
				"y": 3.5336903803773607,
				"z": -29.557432000872694
			},
			{
				"x": -8.067390917086847,
				"y": 30.0763621262047,
				"z": -48.32407109290635
			}
		],
		type: feng.fx.EnergyFlow.Preset.HANZI_CHI,
		isClosed: true
	},
	"sha": {
		points: [
			{
				"x": 35.51094040243115,
				"y": 39.04084695547126,
				"z": -35.526056779665986
			},
			{
				"x": 54.24191346384711,
				"y": 23.715773223685055,
				"z": 1.6020312295376615
			},
			{
				"x": 42.57921806908509,
				"y": -12.889797790028359,
				"z": 39.77685255706639
			},
			{
				"x": 7.3910280456887945,
				"y": -37.77443404387676,
				"z": 54.65860722629757
			},
			{
				"x": -31.988622724898185,
				"y": -41.657446057499,
				"z": 43.85874966248103
			},
			{
				"x": -52.979028364271386,
				"y": -26.27153843357851,
				"z": 9.082913087191686
			},
			{
				"x": -44.05488354537207,
				"y": 3.5336903803773607,
				"z": -29.557432000872694
			},
			{
				"x": -8.067390917086847,
				"y": 30.0763621262047,
				"z": -48.32407109290635
			}
		],
		type: feng.fx.EnergyFlow.Preset.HANZI_CHI,
		isClosed: true
	},
	"wuxing": {
		points: [
			{
				"x": 35.51094040243115,
				"y": 39.04084695547126,
				"z": -35.526056779665986
			},
			{
				"x": 54.24191346384711,
				"y": 23.715773223685055,
				"z": 1.6020312295376615
			},
			{
				"x": 42.57921806908509,
				"y": -12.889797790028359,
				"z": 39.77685255706639
			},
			{
				"x": 7.3910280456887945,
				"y": -37.77443404387676,
				"z": 54.65860722629757
			},
			{
				"x": -31.988622724898185,
				"y": -41.657446057499,
				"z": 43.85874966248103
			},
			{
				"x": -52.979028364271386,
				"y": -26.27153843357851,
				"z": 9.082913087191686
			},
			{
				"x": -44.05488354537207,
				"y": 3.5336903803773607,
				"z": -29.557432000872694
			},
			{
				"x": -8.067390917086847,
				"y": 30.0763621262047,
				"z": -48.32407109290635
			}
		],
		type: feng.fx.EnergyFlow.Preset.HANZI_CHI,
		isClosed: true
	},
	"yinyang": {
		points: [
			{
				"x": 35.51094040243115,
				"y": 39.04084695547126,
				"z": -35.526056779665986
			},
			{
				"x": 54.24191346384711,
				"y": 23.715773223685055,
				"z": 1.6020312295376615
			},
			{
				"x": 42.57921806908509,
				"y": -12.889797790028359,
				"z": 39.77685255706639
			},
			{
				"x": 7.3910280456887945,
				"y": -37.77443404387676,
				"z": 54.65860722629757
			},
			{
				"x": -31.988622724898185,
				"y": -41.657446057499,
				"z": 43.85874966248103
			},
			{
				"x": -52.979028364271386,
				"y": -26.27153843357851,
				"z": 9.082913087191686
			},
			{
				"x": -44.05488354537207,
				"y": 3.5336903803773607,
				"z": -29.557432000872694
			},
			{
				"x": -8.067390917086847,
				"y": 30.0763621262047,
				"z": -48.32407109290635
			}
		],
		type: feng.fx.EnergyFlow.Preset.HANZI_CHI,
		isClosed: true
	}
};