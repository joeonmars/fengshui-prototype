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
  var tipList346 = opt_data.tips;
  var tipListLen346 = tipList346.length;
  for (var tipIndex346 = 0; tipIndex346 < tipListLen346; tipIndex346++) {
    var tipData346 = tipList346[tipIndex346];
    output += '<li data-tip-id="' + tipData346.id + '">' + tipData346.reminder + '</li>';
  }
  var keyList353 = soy.$$getMapKeys(opt_data.copy);
  var keyListLen353 = keyList353.length;
  for (var keyIndex353 = 0; keyIndex353 < keyListLen353; keyIndex353++) {
    var keyData353 = keyList353[keyIndex353];
    output += '<li data-view-id="' + keyData353 + '">' + opt_data.copy[keyData353] + '</li>';
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
  var output = '<div class="progressBar"><div class="inner"><div class="tips-wrapper">';
  var viewIdList395 = soy.$$getMapKeys(opt_data.tipsOfViews);
  var viewIdListLen395 = viewIdList395.length;
  for (var viewIdIndex395 = 0; viewIdIndex395 < viewIdListLen395; viewIdIndex395++) {
    var viewIdData395 = viewIdList395[viewIdIndex395];
    output += '<ul class="tips" data-view-id="' + viewIdData395 + '">';
    var tipList399 = opt_data.tipsOfViews[viewIdData395];
    var tipListLen399 = tipList399.length;
    for (var tipIndex399 = 0; tipIndex399 < tipListLen399; tipIndex399++) {
      var tipData399 = tipList399[tipIndex399];
      output += '<li class="tip" data-tip-id="' + tipData399.id + '" data-view-id="' + viewIdData395 + '"><div class="dot"><div class="outer"></div><div class="inner"></div></div><div class="dialog"><a class="content"><div class="icon icon-' + tipData399.icon + '" data-tip-id="' + tipData399.id + '" data-view-id="' + tipData399.viewId + '" data-section-id="' + tipData399.sectionId + '"></div></a></div></li>';
    }
    output += '</ul>';
  }
  output += '</div></div></div>';
  return output;
};
