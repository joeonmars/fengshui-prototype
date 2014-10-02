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
  var tipList317 = opt_data.tips;
  var tipListLen317 = tipList317.length;
  for (var tipIndex317 = 0; tipIndex317 < tipListLen317; tipIndex317++) {
    var tipData317 = tipList317[tipIndex317];
    output += '<li data-tip-id="' + tipData317.id + '">from ' + tipData317.character + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList325 = opt_data.tips;
  var tipListLen325 = tipList325.length;
  for (var tipIndex325 = 0; tipIndex325 < tipListLen325; tipIndex325++) {
    var tipData325 = tipList325[tipIndex325];
    output += '<li data-tip-id="' + tipData325.id + '">' + tipData325.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList333 = opt_data.tips;
  var tipListLen333 = tipList333.length;
  for (var tipIndex333 = 0; tipIndex333 < tipListLen333; tipIndex333++) {
    var tipData333 = tipList333[tipIndex333];
    output += '<li data-tip-id="' + tipData333.id + '">appreciation from ' + tipData333.character + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList341 = opt_data.tips;
  var tipListLen341 = tipList341.length;
  for (var tipIndex341 = 0; tipIndex341 < tipListLen341; tipIndex341++) {
    var tipData341 = tipList341[tipIndex341];
    output += '<li data-tip-id="' + tipData341.id + '">' + tipData341.response + '</li>';
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
  var tipList365 = opt_data.tips;
  var tipListLen365 = tipList365.length;
  for (var tipIndex365 = 0; tipIndex365 < tipListLen365; tipIndex365++) {
    var tipData365 = tipList365[tipIndex365];
    output += '<li class="tip" data-tip-id="' + tipData365.id + '"><div class="dot"><div class="outer"></div><div class="inner"></div></div><div class="dialog"><div class="content"><div class="icon icon-' + tipData365.id + '" data-tip-id="' + tipData365.id + '" data-view-id="' + tipData365.viewId + '" data-section-id="' + tipData365.sectionId + '"></div><a href="' + tipData365.goTipToken + '"><span class="icon"></span>GO</a></div></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
