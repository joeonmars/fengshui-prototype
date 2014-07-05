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
  var tipList123 = opt_data.tips;
  var tipListLen123 = tipList123.length;
  for (var tipIndex123 = 0; tipIndex123 < tipListLen123; tipIndex123++) {
    var tipData123 = tipList123[tipIndex123];
    output += '<li data-tip-id="' + tipData123.id + '">from ' + tipData123.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList131 = opt_data.tips;
  var tipListLen131 = tipList131.length;
  for (var tipIndex131 = 0; tipIndex131 < tipListLen131; tipIndex131++) {
    var tipData131 = tipList131[tipIndex131];
    output += '<li data-tip-id="' + tipData131.id + '">' + tipData131.reminder + '</li>';
  }
  output += '</ul></div><div class="right"><button></button></div></div><div class="dialogue response"><ul class="title">';
  var tipList139 = opt_data.tips;
  var tipListLen139 = tipList139.length;
  for (var tipIndex139 = 0; tipIndex139 < tipListLen139; tipIndex139++) {
    var tipData139 = tipList139[tipIndex139];
    output += '<li data-tip-id="' + tipData139.id + '">appreciation from ' + tipData139.people + '</li>';
  }
  output += '</ul><ul class="paragraph">';
  var tipList147 = opt_data.tips;
  var tipListLen147 = tipList147.length;
  for (var tipIndex147 = 0; tipIndex147 < tipListLen147; tipIndex147++) {
    var tipData147 = tipList147[tipIndex147];
    output += '<li data-tip-id="' + tipData147.id + '">' + tipData147.response + '</li>';
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
  var tipList163 = opt_data.tips;
  var tipListLen163 = tipList163.length;
  for (var tipIndex163 = 0; tipIndex163 < tipListLen163; tipIndex163++) {
    var tipData163 = tipList163[tipIndex163];
    output += '<li class="tip" data-tip-id="' + tipData163.id + '"><div class="outline"></div><div class="dot"></div></li>';
  }
  output += '</ul></div></div>';
  return output;
};
