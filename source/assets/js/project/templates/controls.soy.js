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
feng.templates.controls.RoundButton = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '<div class="roundButton"><div class="outline"></div><div class="circle">' + ((opt_data.content) ? opt_data.content : '') + '</div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.Compass = function(opt_data, opt_ignored) {
  return '<div class="compass grab">' + feng.templates.controls.RoundButton({content: '<div class="cube"><div><div class="browse"></div><div class="design"></div></div></div>'}) + '</div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.Book = function(opt_data, opt_ignored) {
  return '<div class="book">' + feng.templates.controls.RoundButton({content: '<div class="icon"></div>'}) + '</div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.Reminder = function(opt_data, opt_ignored) {
  var output = '<div class="reminder"><div class="avatar">' + feng.templates.controls.RoundButton(null) + '</div><div class="dialogue hint"><div class="left"><button></button></div><div class="middle"><ul class="title">';
  var tipList69 = opt_data.tips;
  var tipListLen69 = tipList69.length;
  for (var tipIndex69 = 0; tipIndex69 < tipListLen69; tipIndex69++) {
    var tipData69 = tipList69[tipIndex69];
    output += '<li data-tip-id="' + tipData69.id + '">from ' + tipData69.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList77 = opt_data.tips;
  var tipListLen77 = tipList77.length;
  for (var tipIndex77 = 0; tipIndex77 < tipListLen77; tipIndex77++) {
    var tipData77 = tipList77[tipIndex77];
    output += '<li data-tip-id="' + tipData77.id + '">' + tipData77.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList85 = opt_data.tips;
  var tipListLen85 = tipList85.length;
  for (var tipIndex85 = 0; tipIndex85 < tipListLen85; tipIndex85++) {
    var tipData85 = tipList85[tipIndex85];
    output += '<li data-tip-id="' + tipData85.id + '">appreciation from ' + tipData85.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList93 = opt_data.tips;
  var tipListLen93 = tipList93.length;
  for (var tipIndex93 = 0; tipIndex93 < tipListLen93; tipIndex93++) {
    var tipData93 = tipList93[tipIndex93];
    output += '<li data-tip-id="' + tipData93.id + '">' + tipData93.response + '</li>';
  }
  output += '</ul></div></div>';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.Manipulator = function(opt_data, opt_ignored) {
  return '<div class="manipulator"><ul><li class="move"></li><li class="rotate"></li><li class="place"></li><li class="change_picture"></li><li class="change_accessory"></li><li class="close"></li></ul></div>';
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
feng.templates.controls.ObjectBox = function(opt_data, opt_ignored) {
  return '<div class="objectBox"><div class="dot"><div class="icon"></div></div><div class="dot"><div class="icon"></div></div><div class="dot"><div class="icon"></div></div><div class="dot"><div class="icon"></div></div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.ProgressBar = function(opt_data, opt_ignored) {
  var output = '<div class="progressBar"><div class="inner"><div class="wave"><canvas class="gray"></canvas><canvas class="blue"></canvas></div><ul class="tips">';
  var tipList109 = opt_data.tips;
  var tipListLen109 = tipList109.length;
  for (var tipIndex109 = 0; tipIndex109 < tipListLen109; tipIndex109++) {
    var tipData109 = tipList109[tipIndex109];
    output += '<li class="tip" data-tip-id="' + tipData109.id + '"><div class="outline"></div><div class="dot"></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
