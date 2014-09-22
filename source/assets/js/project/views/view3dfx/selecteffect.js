goog.provide('feng.views.view3dfx.SelectEffect');

goog.require('goog.fx.anim.Animated');


/**
 * @constructor
 */
feng.views.view3dfx.SelectEffect = function(){

	THREE.Object3D.call( this );

	// create texture
	var texture;

	if(!feng.views.view3dfx.SelectEffect.Texture) {

		var canvas = document.createElement('canvas');
		canvas.width = canvas.height = 32;

		var context = canvas.getContext('2d');
		var centerX = canvas.width / 2;
		var centerY = canvas.height / 2;
		var radius = 12;

		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		context.fillStyle = 'rgba(255, 255, 255, 1)';
		context.fill();

		texture = new THREE.Texture( canvas );
		texture.needsUpdate = true;

		feng.views.view3dfx.SelectEffect.Texture = texture;

	}else {

		texture = feng.views.view3dfx.SelectEffect.Texture;
	}

	// shader attributes
	var dotAttributes = {

	     alpha: { type: 'f', value: [] }
	};

	for( var i = 0; i < 12; i++ ) {

	     dotAttributes.alpha.value[ i ] = .1 + Math.random() * (.9 - .1);
	}

	var lineAttributes = {

		alpha: { type: 'f', value: null }
    };

	var lineAlphas = new Float32Array( 60 );
           
    for( var i = 0; i < 60; i++ ) {
  
		lineAlphas[ i ] = 0 + Math.random() * (.25 - 0);
    }

	// shader uniforms
	this._uniforms = {
        color: { type: "c", value: new THREE.Color( 0xffffff ) },
        texture: { type: 't', value: texture },
        time: { type: "f", value: 0 },
        pulse: { type: "f", value: 1 },
        globalAlpha: { type: "f", value: 0 }
    };

	// shader materials
	var dotMaterial = new THREE.ShaderMaterial( {
		uniforms:       this._uniforms,
		attributes:     dotAttributes,
		vertexShader:   feng.shaders.getShader( 'dotsVertexShader' ),
		fragmentShader: feng.shaders.getShader( 'dotsFragmentShader' ),
		blending: THREE.AdditiveBlending,
		depthTest: false,
		transparent: true
	});

	var lineMaterial = new THREE.ShaderMaterial( {
		uniforms:       this._uniforms,
		attributes:     lineAttributes,
		vertexShader:   feng.shaders.getShader( 'linesVertexShader' ),
		fragmentShader: feng.shaders.getShader( 'linesFragmentShader' ),
		blending: THREE.AdditiveBlending,
		depthTest: false,
		transparent: true
	});

	// create geometry
	var dotsGeometry = new THREE.IcosahedronGeometry(1, 0);

	var dots = new THREE.PointCloud(dotsGeometry, dotMaterial);
    this.add( dots );

    var lineGeometry = (new THREE.WireframeHelper(dots)).geometry;
    lineGeometry.addAttribute( 'alpha', new THREE.BufferAttribute( lineAlphas, 1 ) );

	var lines = new THREE.Line( lineGeometry, lineMaterial, THREE.LinePieces );
    this.add( lines );

    // tweener
    this._animateInTweener = null;
    this._animateOutTweener = null;

    this._animTarget = new goog.fx.anim.Animated();
    this._animTarget.onAnimationFrame = goog.bind(this.onAnimationFrame, this);
};
goog.inherits(feng.views.view3dfx.SelectEffect, THREE.Object3D);


feng.views.view3dfx.SelectEffect.prototype.activate = function() {

	this._uniforms.globalAlpha.value = 0;
	goog.fx.anim.registerAnimation( this._animTarget );
};


feng.views.view3dfx.SelectEffect.prototype.deactivate = function() {

	this._uniforms.globalAlpha.value = 0;
	goog.fx.anim.unregisterAnimation( this._animTarget );
};


feng.views.view3dfx.SelectEffect.prototype.animateIn = function( object ) {

	var boundingSphere = object.getBoundingSphere();

	var position = boundingSphere.center;
	var scale = boundingSphere.radius;

	this.position.copy( position );

	if(this._animateOutTweener) {
		this._animateOutTweener.kill();
	}

	this._animateInTweener = TweenMax.fromTo(this.scale, 2, {
		'x': scale * .5,
		'y': scale * .5,
		'z': scale * .5
	}, {
		'x': scale,
		'y': scale,
		'z': scale,
		'ease': Elastic.easeOut,
		'onStart': this.activate,
		'onStartScope': this
	});

	TweenMax.to(this._uniforms.globalAlpha, 2, {
		'value': 1,
		'ease': Elastic.easeOut
	});
};


feng.views.view3dfx.SelectEffect.prototype.animateOut = function( delay ) {

	if(this._animateOutTweener && this._animateOutTweener.isActive()) {
		return;
	}

	this._animateOutTweener = TweenMax.to(this.scale, .5, {
		'x': 1,
		'y': 1,
		'z': 1,
		'delay': delay || 0,
		'ease': Strong.easeOut,
		'onComplete': this.deactivate,
		'onCompleteScope': this
	});

	TweenMax.to(this._uniforms.globalAlpha, .5, {
		'value': 0,
		'delay': delay || 0,
		'ease': Strong.easeOut
	});
};


feng.views.view3dfx.SelectEffect.prototype.onAnimationFrame = function(now) {

	this.rotation.x = now * 0.0005;
	this.rotation.y = now * 0.0002;

	this._uniforms.time.value = Math.sin(now * 0.001) * .5 + .5;
    this._uniforms.pulse.value = goog.math.lerp(.8, 1, Math.sin(now * 0.001) * .5 + .5);
};


feng.views.view3dfx.SelectEffect.Texture = null;