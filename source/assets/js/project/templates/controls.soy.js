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
  var tipList285 = opt_data.tips;
  var tipListLen285 = tipList285.length;
  for (var tipIndex285 = 0; tipIndex285 < tipListLen285; tipIndex285++) {
    var tipData285 = tipList285[tipIndex285];
    output += '<li data-tip-id="' + tipData285.id + '">from ' + tipData285.character + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList293 = opt_data.tips;
  var tipListLen293 = tipList293.length;
  for (var tipIndex293 = 0; tipIndex293 < tipListLen293; tipIndex293++) {
    var tipData293 = tipList293[tipIndex293];
    output += '<li data-tip-id="' + tipData293.id + '">' + tipData293.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList301 = opt_data.tips;
  var tipListLen301 = tipList301.length;
  for (var tipIndex301 = 0; tipIndex301 < tipListLen301; tipIndex301++) {
    var tipData301 = tipList301[tipIndex301];
    output += '<li data-tip-id="' + tipData301.id + '">appreciation from ' + tipData301.character + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList309 = opt_data.tips;
  var tipListLen309 = tipList309.length;
  for (var tipIndex309 = 0; tipIndex309 < tipListLen309; tipIndex309++) {
    var tipData309 = tipList309[tipIndex309];
    output += '<li data-tip-id="' + tipData309.id + '">' + tipData309.response + '</li>';
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
feng.templates.controls.DropButton = function(opt_data, opt_ignored) {
  return '<div class="dropButton"><div class="arrow"></div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.Tooltip = function(opt_data, opt_ignored) {
  return '<div class="tooltip fadeOut" data-id="' + opt_data.tip.id + '"><div class="content"><button class="circle"><div class="wrapper"><div class="icon"></div><a href="' + opt_data.tip.goTipToken + '"></a></div></button><p>' + opt_data.tip.name + '</p></div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.ProgressBar = function(opt_data, opt_ignored) {
  var output = '<div class="progressBar"><div class="inner"><div class="wave"><canvas class="gray"></canvas><canvas class="fill"></canvas></div><ul class="tips">';
  var tipList335 = opt_data.tips;
  var tipListLen335 = tipList335.length;
  for (var tipIndex335 = 0; tipIndex335 < tipListLen335; tipIndex335++) {
    var tipData335 = tipList335[tipIndex335];
    output += '<li class="tip" data-tip-id="' + tipData335.id + '"><div class="dot"><div class="outer"></div><div class="inner"></div></div><div class="dialog"><div class="content"><canvas data-tip-id="' + tipData335.id + '" data-view-id="' + tipData335.viewId + '" data-section-id="' + tipData335.sectionId + '"></canvas><a href="' + tipData335.goTipToken + '"><span class="icon"></span>GO</a></div></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
