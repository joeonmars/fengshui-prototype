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
  var tipList156 = opt_data.tips;
  var tipListLen156 = tipList156.length;
  for (var tipIndex156 = 0; tipIndex156 < tipListLen156; tipIndex156++) {
    var tipData156 = tipList156[tipIndex156];
    output += '<li data-tip-id="' + tipData156.id + '">from ' + tipData156.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList164 = opt_data.tips;
  var tipListLen164 = tipList164.length;
  for (var tipIndex164 = 0; tipIndex164 < tipListLen164; tipIndex164++) {
    var tipData164 = tipList164[tipIndex164];
    output += '<li data-tip-id="' + tipData164.id + '">' + tipData164.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList172 = opt_data.tips;
  var tipListLen172 = tipList172.length;
  for (var tipIndex172 = 0; tipIndex172 < tipListLen172; tipIndex172++) {
    var tipData172 = tipList172[tipIndex172];
    output += '<li data-tip-id="' + tipData172.id + '">appreciation from ' + tipData172.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList180 = opt_data.tips;
  var tipListLen180 = tipList180.length;
  for (var tipIndex180 = 0; tipIndex180 < tipListLen180; tipIndex180++) {
    var tipData180 = tipList180[tipIndex180];
    output += '<li data-tip-id="' + tipData180.id + '">' + tipData180.response + '</li>';
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
  var tipList196 = opt_data.tips;
  var tipListLen196 = tipList196.length;
  for (var tipIndex196 = 0; tipIndex196 < tipListLen196; tipIndex196++) {
    var tipData196 = tipList196[tipIndex196];
    output += '<li class="tip" data-tip-id="' + tipData196.id + '"><div class="outline"></div><div class="dot"></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
