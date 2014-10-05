// This file was automatically generated from controls.soy.
// Please don't edit this file by hand.

goog.provide('feng.templates.controls');

goog.require('soy');
goog.require('soydata');
goog.require('feng.templates.common');


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
  return feng.templates.controls.RoundButton({classname: 'home-button', content: '<div class="icon"></div>'}) + '<div class="home-button-prompt"><h3>Are you sure you want to leave?</h3><div class="button-group">' + feng.templates.common.PrimaryButton({classname: 'small no', icon: 'icon-no', text: 'No'}) + feng.templates.common.PrimaryButton({classname: 'small yes', icon: 'icon-yes', text: 'Yes', href: opt_data.token.HOME}) + '</div></div>';
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
  var tipList301 = opt_data.tips;
  var tipListLen301 = tipList301.length;
  for (var tipIndex301 = 0; tipIndex301 < tipListLen301; tipIndex301++) {
    var tipData301 = tipList301[tipIndex301];
    output += '<li data-tip-id="' + tipData301.id + '">from ' + tipData301.character + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList309 = opt_data.tips;
  var tipListLen309 = tipList309.length;
  for (var tipIndex309 = 0; tipIndex309 < tipListLen309; tipIndex309++) {
    var tipData309 = tipList309[tipIndex309];
    output += '<li data-tip-id="' + tipData309.id + '">' + tipData309.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList317 = opt_data.tips;
  var tipListLen317 = tipList317.length;
  for (var tipIndex317 = 0; tipIndex317 < tipListLen317; tipIndex317++) {
    var tipData317 = tipList317[tipIndex317];
    output += '<li data-tip-id="' + tipData317.id + '">appreciation from ' + tipData317.character + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList325 = opt_data.tips;
  var tipListLen325 = tipList325.length;
  for (var tipIndex325 = 0; tipIndex325 < tipListLen325; tipIndex325++) {
    var tipData325 = tipList325[tipIndex325];
    output += '<li data-tip-id="' + tipData325.id + '">' + tipData325.response + '</li>';
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
  var tipList349 = opt_data.tips;
  var tipListLen349 = tipList349.length;
  for (var tipIndex349 = 0; tipIndex349 < tipListLen349; tipIndex349++) {
    var tipData349 = tipList349[tipIndex349];
    output += '<li class="tip" data-tip-id="' + tipData349.id + '"><div class="dot"><div class="outer"></div><div class="inner"></div></div><div class="dialog"><div class="content"><div class="icon icon-' + tipData349.id + '" data-tip-id="' + tipData349.id + '" data-view-id="' + tipData349.viewId + '" data-section-id="' + tipData349.sectionId + '"></div><a href="' + tipData349.goTipToken + '"><span class="icon"></span>GO</a></div></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
