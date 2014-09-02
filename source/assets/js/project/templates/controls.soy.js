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
  var tipList287 = opt_data.tips;
  var tipListLen287 = tipList287.length;
  for (var tipIndex287 = 0; tipIndex287 < tipListLen287; tipIndex287++) {
    var tipData287 = tipList287[tipIndex287];
    output += '<li data-tip-id="' + tipData287.id + '">from ' + tipData287.character + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList295 = opt_data.tips;
  var tipListLen295 = tipList295.length;
  for (var tipIndex295 = 0; tipIndex295 < tipListLen295; tipIndex295++) {
    var tipData295 = tipList295[tipIndex295];
    output += '<li data-tip-id="' + tipData295.id + '">' + tipData295.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList303 = opt_data.tips;
  var tipListLen303 = tipList303.length;
  for (var tipIndex303 = 0; tipIndex303 < tipListLen303; tipIndex303++) {
    var tipData303 = tipList303[tipIndex303];
    output += '<li data-tip-id="' + tipData303.id + '">appreciation from ' + tipData303.character + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList311 = opt_data.tips;
  var tipListLen311 = tipList311.length;
  for (var tipIndex311 = 0; tipIndex311 < tipListLen311; tipIndex311++) {
    var tipData311 = tipList311[tipIndex311];
    output += '<li data-tip-id="' + tipData311.id + '">' + tipData311.response + '</li>';
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
  return '<div class="tooltip fadeOut" data-id="' + opt_data.tip.id + '"><div class="content"><button class="circle"><div class="wrapper"><div class="icon"></div><a href="' + opt_data.tip.goTipToken + '"></a></div></button><p>' + opt_data.tip.name + '</p></div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.ProgressBar = function(opt_data, opt_ignored) {
  var output = '<div class="progressBar"><div class="inner"><div class="wave"><canvas class="gray"></canvas><canvas class="fill"></canvas></div><ul class="tips">';
  var tipList337 = opt_data.tips;
  var tipListLen337 = tipList337.length;
  for (var tipIndex337 = 0; tipIndex337 < tipListLen337; tipIndex337++) {
    var tipData337 = tipList337[tipIndex337];
    output += '<li class="tip" data-tip-id="' + tipData337.id + '"><div class="dot"><div class="outer"></div><div class="inner"></div></div><div class="dialog"><div class="content"><div class="icon icon-' + tipData337.id + '" data-tip-id="' + tipData337.id + '" data-view-id="' + tipData337.viewId + '" data-section-id="' + tipData337.sectionId + '"></div><a href="' + tipData337.goTipToken + '"><span class="icon"></span>GO</a></div></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
