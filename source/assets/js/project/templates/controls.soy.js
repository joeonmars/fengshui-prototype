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
  var tipList206 = opt_data.tips;
  var tipListLen206 = tipList206.length;
  for (var tipIndex206 = 0; tipIndex206 < tipListLen206; tipIndex206++) {
    var tipData206 = tipList206[tipIndex206];
    output += '<li data-tip-id="' + tipData206.id + '">from ' + tipData206.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList214 = opt_data.tips;
  var tipListLen214 = tipList214.length;
  for (var tipIndex214 = 0; tipIndex214 < tipListLen214; tipIndex214++) {
    var tipData214 = tipList214[tipIndex214];
    output += '<li data-tip-id="' + tipData214.id + '">' + tipData214.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList222 = opt_data.tips;
  var tipListLen222 = tipList222.length;
  for (var tipIndex222 = 0; tipIndex222 < tipListLen222; tipIndex222++) {
    var tipData222 = tipList222[tipIndex222];
    output += '<li data-tip-id="' + tipData222.id + '">appreciation from ' + tipData222.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList230 = opt_data.tips;
  var tipListLen230 = tipList230.length;
  for (var tipIndex230 = 0; tipIndex230 < tipListLen230; tipIndex230++) {
    var tipData230 = tipList230[tipIndex230];
    output += '<li data-tip-id="' + tipData230.id + '">' + tipData230.response + '</li>';
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
  var tipList246 = opt_data.tips;
  var tipListLen246 = tipList246.length;
  for (var tipIndex246 = 0; tipIndex246 < tipListLen246; tipIndex246++) {
    var tipData246 = tipList246[tipIndex246];
    output += '<li class="tip" data-tip-id="' + tipData246.id + '"><div class="dot"><div class="outer"></div><div class="inner"></div></div><div class="dialog"><div class="content"><canvas data-tip-id="' + tipData246.id + '" data-view-id="' + tipData246.viewId + '" data-section-id="' + tipData246.sectionId + '"></canvas><a href="' + tipData246.goTipToken + '"><span class="icon"></span>GO</a></div></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
