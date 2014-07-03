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
  var tipList100 = opt_data.tips;
  var tipListLen100 = tipList100.length;
  for (var tipIndex100 = 0; tipIndex100 < tipListLen100; tipIndex100++) {
    var tipData100 = tipList100[tipIndex100];
    output += '<li data-tip-id="' + tipData100.id + '">from ' + tipData100.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList108 = opt_data.tips;
  var tipListLen108 = tipList108.length;
  for (var tipIndex108 = 0; tipIndex108 < tipListLen108; tipIndex108++) {
    var tipData108 = tipList108[tipIndex108];
    output += '<li data-tip-id="' + tipData108.id + '">' + tipData108.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList116 = opt_data.tips;
  var tipListLen116 = tipList116.length;
  for (var tipIndex116 = 0; tipIndex116 < tipListLen116; tipIndex116++) {
    var tipData116 = tipList116[tipIndex116];
    output += '<li data-tip-id="' + tipData116.id + '">appreciation from ' + tipData116.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList124 = opt_data.tips;
  var tipListLen124 = tipList124.length;
  for (var tipIndex124 = 0; tipIndex124 < tipListLen124; tipIndex124++) {
    var tipData124 = tipList124[tipIndex124];
    output += '<li data-tip-id="' + tipData124.id + '">' + tipData124.response + '</li>';
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
  var tipList140 = opt_data.tips;
  var tipListLen140 = tipList140.length;
  for (var tipIndex140 = 0; tipIndex140 < tipListLen140; tipIndex140++) {
    var tipData140 = tipList140[tipIndex140];
    output += '<li class="tip" data-tip-id="' + tipData140.id + '"><div class="outline"></div><div class="dot"></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
