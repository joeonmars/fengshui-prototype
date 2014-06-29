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
feng.templates.controls.Reminder = function(opt_data, opt_ignored) {
  var output = '<div class="reminder"><div class="avatar">' + feng.templates.controls.RoundButton(null) + '</div><div class="dialogue hint"><div class="left"><button></button></div><div class="middle"><ul class="title">';
  var tipList63 = opt_data.tips;
  var tipListLen63 = tipList63.length;
  for (var tipIndex63 = 0; tipIndex63 < tipListLen63; tipIndex63++) {
    var tipData63 = tipList63[tipIndex63];
    output += '<li data-tip-id="' + tipData63.id + '">from ' + tipData63.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList71 = opt_data.tips;
  var tipListLen71 = tipList71.length;
  for (var tipIndex71 = 0; tipIndex71 < tipListLen71; tipIndex71++) {
    var tipData71 = tipList71[tipIndex71];
    output += '<li data-tip-id="' + tipData71.id + '">' + tipData71.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList79 = opt_data.tips;
  var tipListLen79 = tipList79.length;
  for (var tipIndex79 = 0; tipIndex79 < tipListLen79; tipIndex79++) {
    var tipData79 = tipList79[tipIndex79];
    output += '<li data-tip-id="' + tipData79.id + '">appreciation from ' + tipData79.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList87 = opt_data.tips;
  var tipListLen87 = tipList87.length;
  for (var tipIndex87 = 0; tipIndex87 < tipListLen87; tipIndex87++) {
    var tipData87 = tipList87[tipIndex87];
    output += '<li data-tip-id="' + tipData87.id + '">' + tipData87.response + '</li>';
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
  var tipList103 = opt_data.tips;
  var tipListLen103 = tipList103.length;
  for (var tipIndex103 = 0; tipIndex103 < tipListLen103; tipIndex103++) {
    var tipData103 = tipList103[tipIndex103];
    output += '<li class="tip" data-tip-id="' + tipData103.id + '"><div class="outline"></div><div class="dot"></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
