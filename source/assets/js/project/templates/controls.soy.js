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
  return '<button class="roundButton ' + ((opt_data.classname) ? opt_data.classname : '') + '"><div class="outline"></div><div class="circle"><div class="circle-content">' + ((opt_data.content) ? opt_data.content : '') + '</div></div></button>';
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
  var tipList344 = opt_data.tips;
  var tipListLen344 = tipList344.length;
  for (var tipIndex344 = 0; tipIndex344 < tipListLen344; tipIndex344++) {
    var tipData344 = tipList344[tipIndex344];
    output += '<li data-tip-id="' + tipData344.id + '">' + tipData344.reminder + '</li>';
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
  return '<div class="dropButton"><div class="circle"></div>' + feng.templates.common.PrimaryButton({icon: 'icon-yes', text: 'Drop'}) + '</div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.TipTooltip = function(opt_data, opt_ignored) {
  return '<a class="tooltip fadeOut tip locked" data-id="' + opt_data.object.id + '" data-tip-id="' + opt_data.object.tip.id + '" href="' + opt_data.goTipToken + '"><div class="bar"><div class="symbol"><div class="inner"><div class="icon icon-magnifier"></div><div class="icon icon-' + opt_data.object.tip.icon + '"></div></div></div><h6>' + opt_data.object.tip.name + '</h6></div></a>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.GatewayTooltip = function(opt_data, opt_ignored) {
  return '<a class="tooltip fadeOut gateway" data-id="' + opt_data.gateway.gatewayId + '"><div class="bar"><div class="symbol"><div class="inner"><div class="icon icon-magnifier"></div><div class="icon ' + ((opt_data.gateway.isStairs == true) ? 'icon-stairs' : 'icon-door') + '"></div></div></div><h6>To ' + opt_data.gateway.viewId + '</h6></div></a>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.controls.ProgressBar = function(opt_data, opt_ignored) {
  var output = '<div class="progressBar"><div class="inner"><button class="prev icon icon-prev"></button><button class="next icon icon-next"></button><div class="tips-wrapper">';
  var viewIdList386 = soy.$$getMapKeys(opt_data.tipsOfViews);
  var viewIdListLen386 = viewIdList386.length;
  for (var viewIdIndex386 = 0; viewIdIndex386 < viewIdListLen386; viewIdIndex386++) {
    var viewIdData386 = viewIdList386[viewIdIndex386];
    output += '<ul class="tips" data-view-id="' + viewIdData386 + '">';
    var tipList390 = opt_data.tipsOfViews[viewIdData386];
    var tipListLen390 = tipList390.length;
    for (var tipIndex390 = 0; tipIndex390 < tipListLen390; tipIndex390++) {
      var tipData390 = tipList390[tipIndex390];
      output += '<li class="tip" data-tip-id="' + tipData390.id + '" data-view-id="' + viewIdData386 + '"><div class="dot"><div class="outer"></div><div class="inner"></div></div><div class="dialog"><a class="content"><div class="icon icon-' + tipData390.icon + '" data-tip-id="' + tipData390.id + '" data-view-id="' + tipData390.viewId + '" data-section-id="' + tipData390.sectionId + '"></div><h6>' + tipData390.name + '</h6></a></div></li>';
    }
    output += '</ul>';
  }
  output += '</div></div></div>';
  return output;
};
