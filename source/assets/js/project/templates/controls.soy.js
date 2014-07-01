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
  var tipList102 = opt_data.tips;
  var tipListLen102 = tipList102.length;
  for (var tipIndex102 = 0; tipIndex102 < tipListLen102; tipIndex102++) {
    var tipData102 = tipList102[tipIndex102];
    output += '<li data-tip-id="' + tipData102.id + '">from ' + tipData102.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList110 = opt_data.tips;
  var tipListLen110 = tipList110.length;
  for (var tipIndex110 = 0; tipIndex110 < tipListLen110; tipIndex110++) {
    var tipData110 = tipList110[tipIndex110];
    output += '<li data-tip-id="' + tipData110.id + '">' + tipData110.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList118 = opt_data.tips;
  var tipListLen118 = tipList118.length;
  for (var tipIndex118 = 0; tipIndex118 < tipListLen118; tipIndex118++) {
    var tipData118 = tipList118[tipIndex118];
    output += '<li data-tip-id="' + tipData118.id + '">appreciation from ' + tipData118.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList126 = opt_data.tips;
  var tipListLen126 = tipList126.length;
  for (var tipIndex126 = 0; tipIndex126 < tipListLen126; tipIndex126++) {
    var tipData126 = tipList126[tipIndex126];
    output += '<li data-tip-id="' + tipData126.id + '">' + tipData126.response + '</li>';
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
  var tipList142 = opt_data.tips;
  var tipListLen142 = tipList142.length;
  for (var tipIndex142 = 0; tipIndex142 < tipListLen142; tipIndex142++) {
    var tipData142 = tipList142[tipIndex142];
    output += '<li class="tip" data-tip-id="' + tipData142.id + '"><div class="outline"></div><div class="dot"></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
