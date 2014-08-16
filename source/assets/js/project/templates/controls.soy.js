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
  var tipList248 = opt_data.tips;
  var tipListLen248 = tipList248.length;
  for (var tipIndex248 = 0; tipIndex248 < tipListLen248; tipIndex248++) {
    var tipData248 = tipList248[tipIndex248];
    output += '<li data-tip-id="' + tipData248.id + '">from ' + tipData248.character + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList256 = opt_data.tips;
  var tipListLen256 = tipList256.length;
  for (var tipIndex256 = 0; tipIndex256 < tipListLen256; tipIndex256++) {
    var tipData256 = tipList256[tipIndex256];
    output += '<li data-tip-id="' + tipData256.id + '">' + tipData256.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList264 = opt_data.tips;
  var tipListLen264 = tipList264.length;
  for (var tipIndex264 = 0; tipIndex264 < tipListLen264; tipIndex264++) {
    var tipData264 = tipList264[tipIndex264];
    output += '<li data-tip-id="' + tipData264.id + '">appreciation from ' + tipData264.character + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList272 = opt_data.tips;
  var tipListLen272 = tipList272.length;
  for (var tipIndex272 = 0; tipIndex272 < tipListLen272; tipIndex272++) {
    var tipData272 = tipList272[tipIndex272];
    output += '<li data-tip-id="' + tipData272.id + '">' + tipData272.response + '</li>';
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
  var tipList288 = opt_data.tips;
  var tipListLen288 = tipList288.length;
  for (var tipIndex288 = 0; tipIndex288 < tipListLen288; tipIndex288++) {
    var tipData288 = tipList288[tipIndex288];
    output += '<li class="tip" data-tip-id="' + tipData288.id + '"><div class="dot"><div class="outer"></div><div class="inner"></div></div><div class="dialog"><div class="content"><canvas data-tip-id="' + tipData288.id + '" data-view-id="' + tipData288.viewId + '" data-section-id="' + tipData288.sectionId + '"></canvas><a href="' + tipData288.goTipToken + '"><span class="icon"></span>GO</a></div></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
