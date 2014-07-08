goog.provide('feng.views.Logo');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.query');
goog.require('goog.style');


/**
 * @constructor
 */
feng.views.Logo = function( domElement, size ){

  goog.base(this);

  this.domElement = domElement;
  this._symbolEl = goog.dom.getElementByClass('symbol', this.domElement);
  this._frameEl = goog.dom.getElementByClass('frame', this._symbolEl);
  this._compassEl = goog.dom.getElementByClass('compass', this._symbolEl);
  
  var textEl = goog.dom.query('h1', this.domElement);
  this._hasText = (textEl.length > 0);

  this._textEl = this._hasText ? textEl[0] : null;
  this._line1El = this._hasText ? goog.dom.getElementByClass('line1', this._textEl) : null;
  this._line2El = this._hasText ? goog.dom.getElementByClass('line2', this._textEl) : null;

  this.size = new goog.math.Size();

  var size = size || goog.style.getSize( this.domElement );
  this.setSize( size );
};
goog.inherits(feng.views.Logo, goog.events.EventTarget);


feng.views.Logo.prototype.setSize = function( size ){

	this.size.scaleToFit( size );
};


feng.views.Logo.prototype.animateIn = function(){


};


feng.views.Logo.prototype.animateOut = function(){

	
};


feng.views.Logo.prototype.rotateCompassTo = function( degree ){

	goog.style.setStyle(this._compassEl, 'transform', 'rotate(' + degree + 'deg)'));
};