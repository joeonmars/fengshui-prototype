goog.provide('feng.views.Logo');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.query');
goog.require('goog.style');
goog.require('goog.math.Size');


/**
 * @constructor
 */
feng.views.Logo = function( domElement, size ){

  goog.base(this);

  this.domElement = domElement;
  this._symbolEl = goog.dom.getElementByClass('symbol', this.domElement);
  this._frameEl = goog.dom.getElementByClass('frame', this._symbolEl);
  this._needleEl = goog.dom.getElementByClass('needle', this._symbolEl);
  
  var textEl = goog.dom.query('h1', this.domElement);
  this._hasText = (textEl.length > 0);

  this._textEl = this._hasText ? textEl[0] : null;
  this._line1El = this._hasText ? goog.dom.getElementByClass('line1', this._textEl) : null;
  this._line2El = this._hasText ? goog.dom.getElementByClass('line2', this._textEl) : null;

  var width = (this._hasText ? feng.views.Logo.Size.TEXT.width : feng.views.Logo.Size.SYMBOL.width);
  var height = feng.views.Logo.Size.SYMBOL.height + (this._hasText ? feng.views.Logo.Size.TEXT.height : 0);
  this._originalSize = new goog.math.Size(width, height);

  var size = size || goog.style.getSize( this.domElement );
  this.setSize( size );
};
goog.inherits(feng.views.Logo, goog.events.EventTarget);


feng.views.Logo.prototype.setSize = function( size ){

	var newSize = this._originalSize.clone().scaleToFit( size );
  var ratio = newSize.width / this._originalSize.width;

  var newSymbolSize = feng.views.Logo.Size.SYMBOL.clone().scale( ratio );
  goog.style.setSize( this._symbolEl, newSymbolSize );

  if(this._hasText) {
    var newTextSize = feng.views.Logo.Size.TEXT.clone().scale( ratio );
    goog.style.setSize( this._textEl, newTextSize );
  }

  goog.style.setSize( this.domElement, newSize );
};


feng.views.Logo.prototype.animateIn = function(){


};


feng.views.Logo.prototype.animateOut = function(){

	
};


feng.views.Logo.prototype.rotateNeedleTo = function( degree ){

	goog.style.setStyle(this._needleEl, 'transform', 'rotate(' + degree + 'deg)');
};


feng.views.Logo.Size = {
  SYMBOL: new goog.math.Size(112, 112),
  TEXT: new goog.math.Size(252, 80)
};