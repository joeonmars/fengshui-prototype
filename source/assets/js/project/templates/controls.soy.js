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
  var tipList150 = opt_data.tips;
  var tipListLen150 = tipList150.length;
  for (var tipIndex150 = 0; tipIndex150 < tipListLen150; tipIndex150++) {
    var tipData150 = tipList150[tipIndex150];
    output += '<li data-tip-id="' + tipData150.id + '">from ' + tipData150.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList158 = opt_data.tips;
  var tipListLen158 = tipList158.length;
  for (var tipIndex158 = 0; tipIndex158 < tipListLen158; tipIndex158++) {
    var tipData158 = tipList158[tipIndex158];
    output += '<li data-tip-id="' + tipData158.id + '">' + tipData158.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList166 = opt_data.tips;
  var tipListLen166 = tipList166.length;
  for (var tipIndex166 = 0; tipIndex166 < tipListLen166; tipIndex166++) {
    var tipData166 = tipList166[tipIndex166];
    output += '<li data-tip-id="' + tipData166.id + '">appreciation from ' + tipData166.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList174 = opt_data.tips;
  var tipListLen174 = tipList174.length;
  for (var tipIndex174 = 0; tipIndex174 < tipListLen174; tipIndex174++) {
    var tipData174 = tipList174[tipIndex174];
    output += '<li data-tip-id="' + tipData174.id + '">' + tipData174.response + '</li>';
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
  var tipList190 = opt_data.tips;
  var tipListLen190 = tipList190.length;
  for (var tipIndex190 = 0; tipIndex190 < tipListLen190; tipIndex190++) {
    var tipData190 = tipList190[tipIndex190];
    output += '<li class="tip" data-tip-id="' + tipData190.id + '"><div class="outline"></div><div class="dot"></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
