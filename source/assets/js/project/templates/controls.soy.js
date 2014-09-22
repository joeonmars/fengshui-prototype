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
  var tipList315 = opt_data.tips;
  var tipListLen315 = tipList315.length;
  for (var tipIndex315 = 0; tipIndex315 < tipListLen315; tipIndex315++) {
    var tipData315 = tipList315[tipIndex315];
    output += '<li data-tip-id="' + tipData315.id + '">from ' + tipData315.character + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList323 = opt_data.tips;
  var tipListLen323 = tipList323.length;
  for (var tipIndex323 = 0; tipIndex323 < tipListLen323; tipIndex323++) {
    var tipData323 = tipList323[tipIndex323];
    output += '<li data-tip-id="' + tipData323.id + '">' + tipData323.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList331 = opt_data.tips;
  var tipListLen331 = tipList331.length;
  for (var tipIndex331 = 0; tipIndex331 < tipListLen331; tipIndex331++) {
    var tipData331 = tipList331[tipIndex331];
    output += '<li data-tip-id="' + tipData331.id + '">appreciation from ' + tipData331.character + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList339 = opt_data.tips;
  var tipListLen339 = tipList339.length;
  for (var tipIndex339 = 0; tipIndex339 < tipListLen339; tipIndex339++) {
    var tipData339 = tipList339[tipIndex339];
    output += '<li data-tip-id="' + tipData339.id + '">' + tipData339.response + '</li>';
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
