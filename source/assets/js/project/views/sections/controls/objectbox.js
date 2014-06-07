goog.provide('feng.views.sections.controls.ObjectBox');

goog.require('goog.events');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.ObjectBox = function( domElement, cameraController, viewSize ){

  goog.base(this, domElement);

  this._dotEls = goog.dom.query('.dot', this.domElement);

  this._cameraController = cameraController;
  this._viewSize = viewSize;

  this._box = new goog.math.Box();

  this._object = null;

  this.hide();
};
goog.inherits(feng.views.sections.controls.ObjectBox, feng.views.sections.controls.Controls);


feng.views.sections.controls.ObjectBox.prototype.activate = function ( object ) {

	goog.base(this, 'activate');

	this.show();

	this._object = object;

	goog.fx.anim.registerAnimation( this );
};


feng.views.sections.controls.ObjectBox.prototype.deactivate = function () {

	goog.base(this, 'deactivate');

	this.hide();

	this._object = null;

	goog.fx.anim.unregisterAnimation( this );
};


feng.views.sections.controls.ObjectBox.prototype.onAnimationFrame = function ( now ) {

	var box = this._object.updateScreenBox( this._cameraController.activeCamera, this._viewSize );

	// expand the original box by 10px
	this._box.top = box.top;
	this._box.left = box.left;
	this._box.right = box.right;
	this._box.bottom = box.bottom;
	this._box.expand(10, 10, 10, 10);

	var width = this._box.right - this._box.left;
	var height = this._box.bottom - this._box.top;

	var dot1x = width / 2;
	var dot1y = 0;

	var dot2x = 0;
	var dot2y = height / 2;

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