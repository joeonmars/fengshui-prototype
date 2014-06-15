goog.provide('feng.fx.FloatText');

goog.require('goog.events.EventTarget');
goog.require('goog.string');
goog.require('feng.templates.captions');


/**
 * @constructor
 */
feng.fx.FloatText = function(html, numCharacters, numLines){

	goog.base(this);

	var numCharacters = numCharacters || 30;
	var numLines = numLines || 10;
	var lines = [];
	var paras = html.split('<br>');
	
	for(var i = 0; i < paras.length; i++) {
		var para = paras[i];

		var a = 0, b = Math.floor(para.length / numCharacters);
		var start, end = -1;

		for(a = 0; a < b; a++) {
			start = end + 1;
			end = start + numCharacters;

			if(para.charAt(end+1) === ' ') {
				end = end + 1;
			}else {
				while(para.charAt(end) !== ' ') {
					end --;
				}
			}

			var str = para.substring( start, end );
			lines.push( str );
		}
	}

	var shouldTruncate = (lines.length > numLines);

	lines = lines.slice(0, numLines);

	if(shouldTruncate) {
		lines[lines.length - 1] = goog.string.truncate( lines[lines.length - 1], numCharacters/2 );
	}
	

	this.domElement = soy.renderAsFragment(feng.templates.captions.FloatText, {
		lines: lines
	});

	this._lineEls = goog.dom.getChildren( this.domElement );
	this._numLines = this._lineEls.length;

	this._depths = goog.array.repeat(0, this._numLines);
	this._alphas = goog.array.repeat(0, this._numLines);

	this._lineProps = goog.array.map(this._lineEls, function(lineEl) {
		return {
			el: lineEl,
			x: 0,
			z: 0,
			opacity: 0,
			opacityMultiplier: 0
		};
	});

	this._animateInTweener = new TimelineMax({
		'paused': true
	});

	var tweeners = goog.array.map(this._lineEls, function(el, index) {

		var prop = this._lineProps[index];

		this.onLineUpdate( prop );

		return TweenMax.fromTo(prop, 2, {
			x: -20,
			opacityMultiplier: 0
		}, {
			x: 0,
			opacityMultiplier: 1,
			'ease': Quad.easeOut,
			'onUpdate': this.onLineUpdate,
			'onUpdateParams': [prop],
			'onUpdateScope': this
		});
	}, this);

	this._animateInTweener.add( tweeners, "+=0", "start", .025 );

	this._animateOutTweener = new TimelineMax({
		'paused': true,
		'onComplete': this.onAnimateComplete,
		'onCompleteScope': this
	});

	var tweeners = goog.array.map(this._lineEls, function(el, index) {
		var prop = this._lineProps[index];

		return TweenMax.to(prop, 1, {
			opacityMultiplier: 0,
			'ease': Quad.easeInOut,
			'onUpdate': this.onLineUpdate,
			'onUpdateParams': [prop],
			'onUpdateScope': this
		});
	}, this);

	this._animateOutTweener.add( tweeners, "+=0", "start", .05 );

	document.body.appendChild( this.domElement );
	//console.log(html, lines, this.domElement, this._lineEls);
};
goog.inherits(feng.fx.FloatText, goog.events.EventTarget);


feng.fx.FloatText.prototype.activate = function() {

	goog.fx.anim.registerAnimation( this );
};


feng.fx.FloatText.prototype.deactivate = function() {

	goog.fx.anim.unregisterAnimation( this );
};


feng.fx.FloatText.prototype.animateIn = function() {

	if(this._animateInTweener.isActive()) return;

	goog.style.showElement(this.domElement, true);

	this._animateOutTweener.pause();

	this._animateInTweener.restart();

	this.activate();
};


feng.fx.FloatText.prototype.animateOut = function() {

	if(this._animateOutTweener.isActive()) return;

	this._animateInTweener.pause();

	this._animateOutTweener.restart();
};


feng.fx.FloatText.prototype.onAnimateComplete = function() {

	this.deactivate();

	goog.style.showElement(this.domElement, false);
};


feng.fx.FloatText.prototype.onLineUpdate = function(prop) {

	var el = prop.el;
	var x = prop.x;
	var z = prop.z;
	var opacity = prop.opacity;
	var opacityMultiplier = prop.opacityMultiplier;

	goog.style.setStyle(el, {
		'transform': 'translateX(' + x + 'px) translateZ(' + z + 'px)',
		'opacity': opacity * opacityMultiplier
	});
};


feng.fx.FloatText.prototype.onAnimationFrame = function(now) {

	var counter = 0;
	var step = 1 / this._numLines;
	var increase = Math.PI / this._numLines;

	for ( var i = 0; i < 1; i += step ) {

		var index = Math.round(i * this._numLines);

		var z = Math.sin( counter + now / 1000 ) * 50;
		this._depths[index] = z.toFixed(2);

		var alpha = goog.math.lerp(.5, 1, (Math.sin( counter + now / 1000 ) + 1) * .5);
		this._alphas[index] = alpha;

		counter += increase;
	}

	goog.array.forEach( this._lineEls, function(lineEl, index) {

		this._lineProps[index].z = this._depths[index];
		this._lineProps[index].opacity = this._alphas[index];

		this.onLineUpdate( this._lineProps[index] );

	}, this);
};