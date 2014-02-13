goog.provide('fengshui.utils.MultiLinearInterpolator');

goog.require('goog.math');


/**
 * @constructor
 */
fengshui.utils.MultiLinearInterpolator = function( values, sectionDuration ){

  this._values = values;
  this._numSections = this._values.length - 1;
  this._sectionDur = sectionDuration;
  this._dur = this._numSections * this._sectionDur;
  this._value = undefined;
};


fengshui.utils.MultiLinearInterpolator.prototype.getValue = function() {

	return this._value;
};


fengshui.utils.MultiLinearInterpolator.prototype.update = function( elapsed ) {

	var elapsed = elapsed % this._dur;
	var proportion = elapsed / this._dur;
	
	this._value = fengshui.utils.MultiLinearInterpolator.getValueByProportion( this._values, this._sectionDur, proportion );
};


/**
 * Static Method, return proportional value
 */
fengshui.utils.MultiLinearInterpolator.getValueByProportion = function( values, sectionLength, proportion ){

	var numSections = values.length - 1;
	var totalLength = sectionLength * numSections;

	var elapsed = totalLength * proportion;

	var startIndex = Math.floor( numSections * (elapsed / totalLength) );
	startIndex = Math.min( numSections - 1,  startIndex );

	var endIndex = startIndex + 1;

	var startVal = values[startIndex];
	var endVal = values[endIndex];

	var sectionProp = elapsed % sectionLength / sectionLength;

	return goog.math.lerp(startVal, endVal, sectionProp);
};