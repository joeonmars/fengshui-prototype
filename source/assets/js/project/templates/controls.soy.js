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
  return '<button class="roundButton ' + opt_data.classname + '"><div class="outline"></div><div class="circle"><div class="circle-content">' + ((opt_data.content) ? opt_data.content : '') + '</div></div></button>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.HomeButton = function(opt_data, opt_ignored) {
  return feng.templates.controls.RoundButton({classname: 'home-button', content: '<div class="icon"></div>'}) + '<div class="home-button-prompt"><h3>Are you sure you want to leave?</h3><div class="button-group"><a class="primary-button small no"><span class="icon icon-no"></span>No</a><a class="primary-button small yes" href="' + opt_data.token.HOME + '"><span class="icon icon-yes"></span>Yes</a></div></div>';
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
  var tipList293 = opt_data.tips;
  var tipListLen293 = tipList293.length;
  for (var tipIndex293 = 0; tipIndex293 < tipListLen293; tipIndex293++) {
    var tipData293 = tipList293[tipIndex293];
    output += '<li data-tip-id="' + tipData293.id + '">from ' + tipData293.character + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList301 = opt_data.tips;
  var tipListLen301 = tipList301.length;
  for (var tipIndex301 = 0; tipIndex301 < tipListLen301; tipIndex301++) {
    var tipData301 = tipList301[tipIndex301];
    output += '<li data-tip-id="' + tipData301.id + '">' + tipData301.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList309 = opt_data.tips;
  var tipListLen309 = tipList309.length;
  for (var tipIndex309 = 0; tipIndex309 < tipListLen309; tipIndex309++) {
    var tipData309 = tipList309[tipIndex309];
    output += '<li data-tip-id="' + tipData309.id + '">appreciation from ' + tipData309.character + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList317 = opt_data.tips;
  var tipListLen317 = tipList317.length;
  for (var tipIndex317 = 0; tipIndex317 < tipListLen317; tipIndex317++) {
    var tipData317 = tipList317[tipIndex317];
    output += '<li data-tip-id="' + tipData317.id + '">' + tipData317.response + '</li>';
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
  var tipList341 = opt_data.tips;
  var tipListLen341 = tipList341.length;
  for (var tipIndex341 = 0; tipIndex341 < tipListLen341; tipIndex341++) {
    var tipData341 = tipList341[tipIndex341];
    output += '<li class="tip" data-tip-id="' + tipData341.id + '"><div class="dot"><div class="outer"></div><div class="inner"></div></div><div class="dialog"><div class="content"><div class="icon icon-' + tipData341.id + '" data-tip-id="' + tipData341.id + '" data-view-id="' + tipData341.viewId + '" data-section-id="' + tipData341.sectionId + '"></div><a href="' + tipData341.goTipToken + '"><span class="icon"></span>GO</a></div></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
