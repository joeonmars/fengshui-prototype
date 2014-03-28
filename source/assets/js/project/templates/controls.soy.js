// This file was automatically generated from controls.soy.
// Please don't edit this file by hand.

goog.provide('feng.templates.controls');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.Compass = function(opt_data, opt_ignored) {
  return '<div class="compass grab"><div class="directions"><div class="n">N</div><div class="s">S</div><div class="w">W</div><div class="e">E</div></div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.Manipulator = function(opt_data, opt_ignored) {
  return '<div class="manipulator"><ul><li class="move"></li><li class="rotate"></li><li class="enter"></li><li class="place"></li><li class="change_accessory"></li><li class="close"></li></ul></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.ObjectSelector = function(opt_data, opt_ignored) {
  return '<div class="objectSelector"><div class="fill"></div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.ProgressBar = function(opt_data, opt_ignored) {
  var output = '<div class="progressBar"><div class="inner"><ul class="tips">';
  var tipList10 = opt_data.tips;
  var tipListLen10 = tipList10.length;
  for (var tipIndex10 = 0; tipIndex10 < tipListLen10; tipIndex10++) {
    var tipData10 = tipList10[tipIndex10];
    output += '<li class="tip ' + ((tipData10.unlocked != true) ? 'locked' : '') + '" data-tip-id="' + tipData10.id + '" data-view-id="' + tipData10.viewId + '" data-section-id="' + tipData10.sectionId + '">' + tipData10.id + '</li>';
  }
  output += '</ul></div></div>';
  return output;
};
