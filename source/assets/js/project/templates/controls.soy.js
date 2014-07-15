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
  return '<button class="roundButton"><div class="outline"></div><div class="circle">' + ((opt_data.content) ? opt_data.content : '') + '</div></button>';
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
  var tipList182 = opt_data.tips;
  var tipListLen182 = tipList182.length;
  for (var tipIndex182 = 0; tipIndex182 < tipListLen182; tipIndex182++) {
    var tipData182 = tipList182[tipIndex182];
    output += '<li data-tip-id="' + tipData182.id + '">from ' + tipData182.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList190 = opt_data.tips;
  var tipListLen190 = tipList190.length;
  for (var tipIndex190 = 0; tipIndex190 < tipListLen190; tipIndex190++) {
    var tipData190 = tipList190[tipIndex190];
    output += '<li data-tip-id="' + tipData190.id + '">' + tipData190.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList198 = opt_data.tips;
  var tipListLen198 = tipList198.length;
  for (var tipIndex198 = 0; tipIndex198 < tipListLen198; tipIndex198++) {
    var tipData198 = tipList198[tipIndex198];
    output += '<li data-tip-id="' + tipData198.id + '">appreciation from ' + tipData198.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList206 = opt_data.tips;
  var tipListLen206 = tipList206.length;
  for (var tipIndex206 = 0; tipIndex206 < tipListLen206; tipIndex206++) {
    var tipData206 = tipList206[tipIndex206];
    output += '<li data-tip-id="' + tipData206.id + '">' + tipData206.response + '</li>';
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
  var tipList222 = opt_data.tips;
  var tipListLen222 = tipList222.length;
  for (var tipIndex222 = 0; tipIndex222 < tipListLen222; tipIndex222++) {
    var tipData222 = tipList222[tipIndex222];
    output += '<li class="tip" data-tip-id="' + tipData222.id + '"><div class="outline"></div><div class="dot"></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
