goog.provide('feng.views.sections.controls.ObjectBox');

goog.require('goog.events');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.ObjectBox = function( domElement ){

  goog.base(this, domElement);

  this._dotEls = goog.dom.query('.dot', this.domElement);

  this._box = new goog.math.Box();

  this._object = null;

  this._timeline = new TimelineMax({
  	'paused': true,
  	'onReverseComplete': this.onReverseComplete,
  	'onReverseCompleteScope': this
  });

  var tweeners = goog.array.map(this._dotEls, function(el, index) {

		var iconEl = goog.dom.query('.icon', el)[0];

		var x, y;

		switch(index) {
			case 0:
			x = 20;
			y = 0;
			break;

			case 1:
			x = 0;
			y = 20;
			break;

			case 2:
			x = -20;
			y = 0;
			break;

			case 3:
			x = 0;
			y = -20;
			break;
		}

		var tweener = TweenMax.fromTo(iconEl, .25, {
			'opacity': 0,
			'x': x,
			'y': y
		}, {
			'opacity': 1,
			'x': 0,
			'y': 0
		});

		return tweener;
	});

  this._timeline.add( tweeners, '+=0', 'start', .05 );

  this.hide();
};
goog.inherits(feng.views.sections.controls.ObjectBox, feng.views.sections.controls.Controls);


feng.views.sections.controls.ObjectBox.prototype.setObject = function ( object ) {

	if(this._object === object) {
		return;
	}

	this._object = object;

	if(object) this._timeline.restart();
	else this._timeline.reverse();
};


feng.views.sections.controls.ObjectBox.prototype.activate = function ( object ) {

  var shouldActivate = goog.base(this, 'activate');

  if(!shouldActivate) return;

	this.show();

	this.setObject( object );

	goog.fx.anim.registerAnimation( this );
};


feng.views.sections.controls.ObjectBox.prototype.deactivate = function () {

  var shouldDeactivate = goog.base(this, 'deactivate');

  if(!shouldDeactivate) return;

	this._object = null;

	this._timeline.reverse();

	goog.fx.anim.unregisterAnimation( this );
};


feng.views.sections.controls.ObjectBox.prototype.onAnimationFrame = function ( now ) {

	if(!this._object) return;

	var box = this._object.updateScreenBox();

	// expand the original box by 10px
	this._box.top = box.top;
	this._box.left = box.left;
	this._box.right = box.right;
	this._box.bottom = box.bottom;
	this._box.expand(10, 10, 10, 10);

	var width = this._box.right - this._box.left;
	var height = this._box.bottom - this._box.top;

	var dot1x = 0;
	var dot1y = height / 2;

	var dot2x = width / 2;
	var dot2y = 0;

	var dot3x = width;
	var dot3y = height / 2;

	var dot4x = width / 2;
	var dot4y = height;

	goog.style.setStyle( this._dotEls[0], 'transform', 'translate(' + dot1x + 'px,' + dot1y + 'px)' );
	goog.style.setStyle( this._dotEls[1], 'transform', 'translate(' + dot2x + 'px,' + dot2y + 'px)' );
	goog.style.setStyle( this._dotEls[2], 'transform', 'translate(' + dot3x + 'px,' + dot3y + 'px)' );
	goog.style.setStyle( this._dotEls[3], 'transform', 'translate(' + dot4x + 'px,' + dot4y + 'px)' );

	goog.style.setStyle( this.domElement, 'transform', 'translate(' + this._box.left + 'px,' + this._box.top + 'px)' );
};


feng.views.sections.controls.ObjectBox.prototype.onReverseComplete = function () {

	this.hide();
};