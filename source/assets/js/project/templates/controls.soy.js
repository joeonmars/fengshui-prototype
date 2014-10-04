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
  var tipList284 = opt_data.tips;
  var tipListLen284 = tipList284.length;
  for (var tipIndex284 = 0; tipIndex284 < tipListLen284; tipIndex284++) {
    var tipData284 = tipList284[tipIndex284];
    output += '<li data-tip-id="' + tipData284.id + '">from ' + tipData284.character + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList292 = opt_data.tips;
  var tipListLen292 = tipList292.length;
  for (var tipIndex292 = 0; tipIndex292 < tipListLen292; tipIndex292++) {
    var tipData292 = tipList292[tipIndex292];
    output += '<li data-tip-id="' + tipData292.id + '">' + tipData292.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList300 = opt_data.tips;
  var tipListLen300 = tipList300.length;
  for (var tipIndex300 = 0; tipIndex300 < tipListLen300; tipIndex300++) {
    var tipData300 = tipList300[tipIndex300];
    output += '<li data-tip-id="' + tipData300.id + '">appreciation from ' + tipData300.character + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList308 = opt_data.tips;
  var tipListLen308 = tipList308.length;
  for (var tipIndex308 = 0; tipIndex308 < tipListLen308; tipIndex308++) {
    var tipData308 = tipList308[tipIndex308];
    output += '<li data-tip-id="' + tipData308.id + '">' + tipData308.response + '</li>';
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
  var tipList332 = opt_data.tips;
  var tipListLen332 = tipList332.length;
  for (var tipIndex332 = 0; tipIndex332 < tipListLen332; tipIndex332++) {
    var tipData332 = tipList332[tipIndex332];
    output += '<li class="tip" data-tip-id="' + tipData332.id + '"><div class="dot"><div class="outer"></div><div class="inner"></div></div><div class="dialog"><div class="content"><div class="icon icon-' + tipData332.id + '" data-tip-id="' + tipData332.id + '" data-view-id="' + tipData332.viewId + '" data-section-id="' + tipData332.sectionId + '"></div><a href="' + tipData332.goTipToken + '"><span class="icon"></span>GO</a></div></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
