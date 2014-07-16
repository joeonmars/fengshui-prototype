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
  var tipList194 = opt_data.tips;
  var tipListLen194 = tipList194.length;
  for (var tipIndex194 = 0; tipIndex194 < tipListLen194; tipIndex194++) {
    var tipData194 = tipList194[tipIndex194];
    output += '<li data-tip-id="' + tipData194.id + '">from ' + tipData194.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList202 = opt_data.tips;
  var tipListLen202 = tipList202.length;
  for (var tipIndex202 = 0; tipIndex202 < tipListLen202; tipIndex202++) {
    var tipData202 = tipList202[tipIndex202];
    output += '<li data-tip-id="' + tipData202.id + '">' + tipData202.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList210 = opt_data.tips;
  var tipListLen210 = tipList210.length;
  for (var tipIndex210 = 0; tipIndex210 < tipListLen210; tipIndex210++) {
    var tipData210 = tipList210[tipIndex210];
    output += '<li data-tip-id="' + tipData210.id + '">appreciation from ' + tipData210.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList218 = opt_data.tips;
  var tipListLen218 = tipList218.length;
  for (var tipIndex218 = 0; tipIndex218 < tipListLen218; tipIndex218++) {
    var tipData218 = tipList218[tipIndex218];
    output += '<li data-tip-id="' + tipData218.id + '">' + tipData218.response + '</li>';
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
  var tipList234 = opt_data.tips;
  var tipListLen234 = tipList234.length;
  for (var tipIndex234 = 0; tipIndex234 < tipListLen234; tipIndex234++) {
    var tipData234 = tipList234[tipIndex234];
    output += '<li class="tip" data-tip-id="' + tipData234.id + '"><div class="dot"><div class="outer"></div><div class="inner"></div></div><div class="dialog"><canvas class="icon"></canvas><a href="' + tipData234.goTipToken + '"><span>read</span></a><a href="' + tipData234.readTipToken + '"><span>go</span></a></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
