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
  return '<a class="book" href="' + opt_data.token.BOOK + '">' + feng.templates.controls.RoundButton({content: '<div class="icon"></div>'}) + '</a>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.Reminder = function(opt_data, opt_ignored) {
  var output = '<div class="reminder"><div class="character">' + feng.templates.controls.RoundButton({content: '<canvas></canvas>'}) + '</div><div class="dialogue hint"><div class="wrapper"><button class="prev icon icon-prev"></button><ul class="hints">';
  var tipList248 = opt_data.tips;
  var tipListLen248 = tipList248.length;
  for (var tipIndex248 = 0; tipIndex248 < tipListLen248; tipIndex248++) {
    var tipData248 = tipList248[tipIndex248];
    output += '<li data-tip-id="' + tipData248.id + '">' + tipData248.reminder + '</li>';
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
feng.templates.controls.TipTooltip = function(opt_data, opt_ignored) {
  return '<a class="tooltip fadeOut tip locked" data-id="' + opt_data.tip.id + '" href="' + opt_data.tip.goTipToken + '"><div class="bar"><div class="symbol"><div class="inner"><div class="icon icon-eye-open"></div><div class="icon icon-' + opt_data.tip.icon + '"></div></div></div><h6>' + opt_data.tip.name + '</h6></div></a>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.GatewayTooltip = function(opt_data, opt_ignored) {
  return '<a class="tooltip fadeOut gateway" data-id="' + opt_data.gateway.gatewayId + '"><div class="bar"><div class="symbol"><div class="inner"><div class="icon icon-eye-open"></div><div class="loader"></div></div></div><h6>To ' + opt_data.gateway.viewId + '</h6></div></a>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.ProgressBar = function(opt_data, opt_ignored) {
  var output = '<div class="progressBar"><div class="inner"><button class="prev icon icon-prev"></button><button class="next icon icon-next"></button><div class="tips-wrapper">';
  var viewIdList278 = soy.$$getMapKeys(opt_data.tipsOfViews);
  var viewIdListLen278 = viewIdList278.length;
  for (var viewIdIndex278 = 0; viewIdIndex278 < viewIdListLen278; viewIdIndex278++) {
    var viewIdData278 = viewIdList278[viewIdIndex278];
    output += '<ul class="tips" data-view-id="' + viewIdData278 + '">';
    var tipList282 = opt_data.tipsOfViews[viewIdData278];
    var tipListLen282 = tipList282.length;
    for (var tipIndex282 = 0; tipIndex282 < tipListLen282; tipIndex282++) {
      var tipData282 = tipList282[tipIndex282];
      output += '<li class="tip" data-tip-id="' + tipData282.id + '"><div class="dot"><div class="outer"></div><div class="inner"></div></div><div class="dialog"><a class="content" href="' + tipData282.readTipToken + '"><div class="icon icon-' + tipData282.icon + '" data-tip-id="' + tipData282.id + '" data-view-id="' + tipData282.viewId + '" data-section-id="' + tipData282.sectionId + '"></div><h6>' + tipData282.name + '</h6></a></div></li>';
    }
    output += '</ul>';
  }
  output += '</div></div></div>';
  return output;
};
