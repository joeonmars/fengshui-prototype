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
  var output = '<div class="reminder"><div class="character">' + feng.templates.controls.RoundButton({content: '<canvas></canvas>'}) + '</div><div class="dialogue hint"><div class="wrapper"><button class="prev icon icon-prev"></button><ul class="hints">';
  var tipList210 = opt_data.tips;
  var tipListLen210 = tipList210.length;
  for (var tipIndex210 = 0; tipIndex210 < tipListLen210; tipIndex210++) {
    var tipData210 = tipList210[tipIndex210];
    output += '<li data-tip-id="' + tipData210.id + '">' + tipData210.reminder + '</li>';
  }
  output += '</ul><button class="next icon icon-next"></button></div></div></div>';
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
  var output = '<div class="progressBar"><div class="inner"><button class="prev icon icon-prev"></button><button class="next icon icon-next"></button><div class="tips-wrapper">';
  var viewIdList234 = soy.$$getMapKeys(opt_data.tipsOfViews);
  var viewIdListLen234 = viewIdList234.length;
  for (var viewIdIndex234 = 0; viewIdIndex234 < viewIdListLen234; viewIdIndex234++) {
    var viewIdData234 = viewIdList234[viewIdIndex234];
    output += '<ul class="tips" data-view-id="' + viewIdData234 + '">';
    var tipList238 = opt_data.tipsOfViews[viewIdData234];
    var tipListLen238 = tipList238.length;
    for (var tipIndex238 = 0; tipIndex238 < tipListLen238; tipIndex238++) {
      var tipData238 = tipList238[tipIndex238];
      output += '<li class="tip" data-tip-id="' + tipData238.id + '"><div class="dot"><div class="outer"></div><div class="inner"></div></div><div class="dialog"><a class="content" href="' + tipData238.goTipToken + '"><div class="icon icon-' + tipData238.id + '" data-tip-id="' + tipData238.id + '" data-view-id="' + tipData238.viewId + '" data-section-id="' + tipData238.sectionId + '"></div><h6>' + tipData238.name + '</h6></a></div></li>';
    }
    output += '</ul>';
  }
  output += '</div></div></div>';
  return output;
};
