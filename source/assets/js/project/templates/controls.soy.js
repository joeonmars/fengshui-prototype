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
  var tipList75 = opt_data.tips;
  var tipListLen75 = tipList75.length;
  for (var tipIndex75 = 0; tipIndex75 < tipListLen75; tipIndex75++) {
    var tipData75 = tipList75[tipIndex75];
    output += '<li data-tip-id="' + tipData75.id + '">from ' + tipData75.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList83 = opt_data.tips;
  var tipListLen83 = tipList83.length;
  for (var tipIndex83 = 0; tipIndex83 < tipListLen83; tipIndex83++) {
    var tipData83 = tipList83[tipIndex83];
    output += '<li data-tip-id="' + tipData83.id + '">' + tipData83.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList91 = opt_data.tips;
  var tipListLen91 = tipList91.length;
  for (var tipIndex91 = 0; tipIndex91 < tipListLen91; tipIndex91++) {
    var tipData91 = tipList91[tipIndex91];
    output += '<li data-tip-id="' + tipData91.id + '">appreciation from ' + tipData91.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList99 = opt_data.tips;
  var tipListLen99 = tipList99.length;
  for (var tipIndex99 = 0; tipIndex99 < tipListLen99; tipIndex99++) {
    var tipData99 = tipList99[tipIndex99];
    output += '<li data-tip-id="' + tipData99.id + '">' + tipData99.response + '</li>';
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
  var tipList115 = opt_data.tips;
  var tipListLen115 = tipList115.length;
  for (var tipIndex115 = 0; tipIndex115 < tipListLen115; tipIndex115++) {
    var tipData115 = tipList115[tipIndex115];
    output += '<li class="tip" data-tip-id="' + tipData115.id + '"><div class="outline"></div><div class="dot"></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
