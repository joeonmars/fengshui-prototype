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
feng.templates.controls.EpisodeButton = function(opt_data, opt_ignored) {
  return '<button class="episode-button"></button>';
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
  var tipList184 = opt_data.tips;
  var tipListLen184 = tipList184.length;
  for (var tipIndex184 = 0; tipIndex184 < tipListLen184; tipIndex184++) {
    var tipData184 = tipList184[tipIndex184];
    output += '<li data-tip-id="' + tipData184.id + '">from ' + tipData184.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList192 = opt_data.tips;
  var tipListLen192 = tipList192.length;
  for (var tipIndex192 = 0; tipIndex192 < tipListLen192; tipIndex192++) {
    var tipData192 = tipList192[tipIndex192];
    output += '<li data-tip-id="' + tipData192.id + '">' + tipData192.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList200 = opt_data.tips;
  var tipListLen200 = tipList200.length;
  for (var tipIndex200 = 0; tipIndex200 < tipListLen200; tipIndex200++) {
    var tipData200 = tipList200[tipIndex200];
    output += '<li data-tip-id="' + tipData200.id + '">appreciation from ' + tipData200.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList208 = opt_data.tips;
  var tipListLen208 = tipList208.length;
  for (var tipIndex208 = 0; tipIndex208 < tipListLen208; tipIndex208++) {
    var tipData208 = tipList208[tipIndex208];
    output += '<li data-tip-id="' + tipData208.id + '">' + tipData208.response + '</li>';
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
  var tipList224 = opt_data.tips;
  var tipListLen224 = tipList224.length;
  for (var tipIndex224 = 0; tipIndex224 < tipListLen224; tipIndex224++) {
    var tipData224 = tipList224[tipIndex224];
    output += '<li class="tip" data-tip-id="' + tipData224.id + '"><div class="outline"></div><div class="dot"></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
