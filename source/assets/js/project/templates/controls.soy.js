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
  var output = '<div class="reminder"><div class="character">' + feng.templates.controls.RoundButton({content: '<canvas></canvas>'}) + '</div><div class="dialogue hint"><div class="left"><button></button></div><div class="middle"><ul class="title">';
  var tipList278 = opt_data.tips;
  var tipListLen278 = tipList278.length;
  for (var tipIndex278 = 0; tipIndex278 < tipListLen278; tipIndex278++) {
    var tipData278 = tipList278[tipIndex278];
    output += '<li data-tip-id="' + tipData278.id + '">from ' + tipData278.character + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList286 = opt_data.tips;
  var tipListLen286 = tipList286.length;
  for (var tipIndex286 = 0; tipIndex286 < tipListLen286; tipIndex286++) {
    var tipData286 = tipList286[tipIndex286];
    output += '<li data-tip-id="' + tipData286.id + '">' + tipData286.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList294 = opt_data.tips;
  var tipListLen294 = tipList294.length;
  for (var tipIndex294 = 0; tipIndex294 < tipListLen294; tipIndex294++) {
    var tipData294 = tipList294[tipIndex294];
    output += '<li data-tip-id="' + tipData294.id + '">appreciation from ' + tipData294.character + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList302 = opt_data.tips;
  var tipListLen302 = tipList302.length;
  for (var tipIndex302 = 0; tipIndex302 < tipListLen302; tipIndex302++) {
    var tipData302 = tipList302[tipIndex302];
    output += '<li data-tip-id="' + tipData302.id + '">' + tipData302.response + '</li>';
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
feng.templates.controls.ObjectSelector = function(opt_data, opt_ignored) {
  return '<div class="objectSelector"><div class="fill"></div></div>';
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
  return '<div class="tooltip fadeOut" data-id="' + opt_data.tip.id + '"><div class="bar"><div class="icon icon-' + opt_data.tip.id + '"></div><h6>' + opt_data.tip.name + '</h6><a class="icon icon-go" href="' + opt_data.tip.goTipToken + '"></a></div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.ProgressBar = function(opt_data, opt_ignored) {
  var output = '<div class="progressBar"><div class="inner"><div class="wave"><canvas class="gray"></canvas><canvas class="fill"></canvas></div><ul class="tips">';
  var tipList326 = opt_data.tips;
  var tipListLen326 = tipList326.length;
  for (var tipIndex326 = 0; tipIndex326 < tipListLen326; tipIndex326++) {
    var tipData326 = tipList326[tipIndex326];
    output += '<li class="tip" data-tip-id="' + tipData326.id + '"><div class="dot"><div class="outer"></div><div class="inner"></div></div><div class="dialog"><div class="content"><div class="icon icon-' + tipData326.id + '" data-tip-id="' + tipData326.id + '" data-view-id="' + tipData326.viewId + '" data-section-id="' + tipData326.sectionId + '"></div><a href="' + tipData326.goTipToken + '"><span class="icon"></span>GO</a></div></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
