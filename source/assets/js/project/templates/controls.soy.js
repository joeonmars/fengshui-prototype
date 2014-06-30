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
  var tipList96 = opt_data.tips;
  var tipListLen96 = tipList96.length;
  for (var tipIndex96 = 0; tipIndex96 < tipListLen96; tipIndex96++) {
    var tipData96 = tipList96[tipIndex96];
    output += '<li data-tip-id="' + tipData96.id + '">from ' + tipData96.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList104 = opt_data.tips;
  var tipListLen104 = tipList104.length;
  for (var tipIndex104 = 0; tipIndex104 < tipListLen104; tipIndex104++) {
    var tipData104 = tipList104[tipIndex104];
    output += '<li data-tip-id="' + tipData104.id + '">' + tipData104.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList112 = opt_data.tips;
  var tipListLen112 = tipList112.length;
  for (var tipIndex112 = 0; tipIndex112 < tipListLen112; tipIndex112++) {
    var tipData112 = tipList112[tipIndex112];
    output += '<li data-tip-id="' + tipData112.id + '">appreciation from ' + tipData112.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList120 = opt_data.tips;
  var tipListLen120 = tipList120.length;
  for (var tipIndex120 = 0; tipIndex120 < tipListLen120; tipIndex120++) {
    var tipData120 = tipList120[tipIndex120];
    output += '<li data-tip-id="' + tipData120.id + '">' + tipData120.response + '</li>';
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
  var tipList136 = opt_data.tips;
  var tipListLen136 = tipList136.length;
  for (var tipIndex136 = 0; tipIndex136 < tipListLen136; tipIndex136++) {
    var tipData136 = tipList136[tipIndex136];
    output += '<li class="tip" data-tip-id="' + tipData136.id + '"><div class="outline"></div><div class="dot"></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
