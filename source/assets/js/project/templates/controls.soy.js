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
  return '<button class="roundButton ' + opt_data.classname + '"><div class="outline"></div><div class="circle">' + ((opt_data.content) ? opt_data.content : '') + '</div></button>';
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
  var tipList204 = opt_data.tips;
  var tipListLen204 = tipList204.length;
  for (var tipIndex204 = 0; tipIndex204 < tipListLen204; tipIndex204++) {
    var tipData204 = tipList204[tipIndex204];
    output += '<li data-tip-id="' + tipData204.id + '">from ' + tipData204.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList212 = opt_data.tips;
  var tipListLen212 = tipList212.length;
  for (var tipIndex212 = 0; tipIndex212 < tipListLen212; tipIndex212++) {
    var tipData212 = tipList212[tipIndex212];
    output += '<li data-tip-id="' + tipData212.id + '">' + tipData212.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList220 = opt_data.tips;
  var tipListLen220 = tipList220.length;
  for (var tipIndex220 = 0; tipIndex220 < tipListLen220; tipIndex220++) {
    var tipData220 = tipList220[tipIndex220];
    output += '<li data-tip-id="' + tipData220.id + '">appreciation from ' + tipData220.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList228 = opt_data.tips;
  var tipListLen228 = tipList228.length;
  for (var tipIndex228 = 0; tipIndex228 < tipListLen228; tipIndex228++) {
    var tipData228 = tipList228[tipIndex228];
    output += '<li data-tip-id="' + tipData228.id + '">' + tipData228.response + '</li>';
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
  var output = '<div class="progressBar"><div class="inner"><div class="wave"><canvas class="gray"></canvas><canvas class="fill"></canvas></div><ul class="tips">';
  var tipList244 = opt_data.tips;
  var tipListLen244 = tipList244.length;
  for (var tipIndex244 = 0; tipIndex244 < tipListLen244; tipIndex244++) {
    var tipData244 = tipList244[tipIndex244];
    output += '<li class="tip" data-tip-id="' + tipData244.id + '"><div class="dot"><div class="outer"></div><div class="inner"></div></div><div class="dialog"><div class="content"><canvas data-tip-id="' + tipData244.id + '" data-view-id="' + tipData244.viewId + '" data-section-id="' + tipData244.sectionId + '"></canvas><a href="' + tipData244.goTipToken + '"><span class="icon"></span>GO</a></div></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
