// This file was automatically generated from captions.soy.
// Please don't edit this file by hand.

goog.provide('feng.templates.captions');

goog.require('soy');
goog.require('soydata');
goog.require('feng.templates.common');
goog.require('feng.templates.controls');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.Caption = function(opt_data, opt_ignored) {
  return '<div class="caption ' + opt_data.classname + '">' + opt_data.content + '</div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.HintContent = function(opt_data, opt_ignored) {
  return '<div class="hint"><p>' + opt_data.hint + '</p>' + feng.templates.common.PrimaryButton({icon: 'icon-yes', classname: 'find', text: 'Go Find It'}) + '</div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.DetailContent = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '<div class="detail">' + ((opt_data.problem) ? '<h2>Problem</h2><p>' + opt_data.problem + '</p>' : '') + ((opt_data.advice) ? '<p>' + opt_data.advice + '</p>' : '') + '</div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.Instruction = function(opt_data, opt_ignored) {
  return '<div class="instruction"></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.Unlocker = function(opt_data, opt_ignored) {
  return '<div class="unlocker"></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ShareOptions = function(opt_data, opt_ignored) {
  return '<div class="share"><ul><li><a class="facebook" target="_blank"></a></li><li><a class="twitter" target="_blank"></a></li><li><a class="google" target="_blank"></a></li></ul></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.InteractionContent = function(opt_data, opt_ignored) {
  return '<div class="interaction"><h2>' + opt_data.title + '</h2><div class="content">' + opt_data.content + '</div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.LockedContent = function(opt_data, opt_ignored) {
  return '<div class="locked">' + feng.templates.captions.Instruction(null) + feng.templates.captions.Unlocker(null) + feng.templates.captions.ShareOptions(null) + '</div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.UnlockedContent = function(opt_data, opt_ignored) {
  return '<div class="unlocked">' + feng.templates.captions.ShareOptions(null) + '</div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.AdviceCaption = function(opt_data, opt_ignored) {
  return feng.templates.captions.Caption({classname: 'advice right', content: '<div class="popup-wrapper">' + feng.templates.common.Popup({classname: 'from-right', content: '<h1>' + opt_data.tip.name + '</h1>' + feng.templates.captions.DetailContent({advice: opt_data.tip.advice}) + feng.templates.captions.UnlockedContent(null)}) + '</div>'});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeObjectCaption = function(opt_data, opt_ignored) {
  return feng.templates.captions.Caption({classname: 'changeobject right', content: '<div class="top"></div><div class="popup-wrapper">' + feng.templates.common.Popup({classname: 'from-right', content: '<h1>' + opt_data.tip.name + '</h1>' + feng.templates.captions.DetailContent({problem: opt_data.tip.problem}) + feng.templates.captions.LockedContent(null) + feng.templates.captions.UnlockedContent(null)}) + '</div>'});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangePictureCaption = function(opt_data, opt_ignored) {
  var param110 = '<div class="draggerContainer"><img class="dragger" draggable="false"></div><div class="popup-wrapper">' + feng.templates.common.Popup({classname: 'from-left', content: '<h1>' + opt_data.tip.name + '</h1>' + feng.templates.captions.DetailContent({problem: opt_data.tip.problem}) + feng.templates.captions.LockedContent(null) + feng.templates.captions.UnlockedContent(null)}) + '</div><div class="bottom"><div class="pictureSelector">' + feng.templates.controls.RoundButton({content: '<div class="icon"></div>', classname: 'prev'}) + '<div class="pictureView"><div class="carousel"><ul>';
  var pictureList128 = opt_data.pictures;
  var pictureListLen128 = pictureList128.length;
  for (var pictureIndex128 = 0; pictureIndex128 < pictureListLen128; pictureIndex128++) {
    var pictureData128 = pictureList128[pictureIndex128];
    param110 += '<li data-id="' + pictureIndex128 + '"><div class="thumbnail" style="background-image: url(' + pictureData128.src + ')" data-id="' + pictureIndex128 + '"></li>';
  }
  param110 += '</ul></div></div>' + feng.templates.controls.RoundButton({content: '<div class="icon"></div>', classname: 'next'}) + '</div></div>';
  var output = feng.templates.captions.Caption({classname: 'changepicture left', content: param110});
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeColorCaption = function(opt_data, opt_ignored) {
  var param146 = '<div class="popup-wrapper">';
  var param149 = '<h1>' + opt_data.tip.name + '</h1>' + feng.templates.captions.DetailContent({problem: opt_data.tip.problem});
  var param156 = '<ul class="color-selector">';
  var colorKeyList158 = soy.$$getMapKeys(opt_data.colors);
  var colorKeyListLen158 = colorKeyList158.length;
  for (var colorKeyIndex158 = 0; colorKeyIndex158 < colorKeyListLen158; colorKeyIndex158++) {
    var colorKeyData158 = colorKeyList158[colorKeyIndex158];
    param156 += '<li><div class="color" style="background-color: ' + opt_data.colors[colorKeyData158].hex + '" data-color="' + colorKeyData158 + '"></li>';
  }
  param156 += '</ul>';
  param149 += feng.templates.captions.InteractionContent({title: 'Click On A Color To Change', content: param156});
  param149 += feng.templates.captions.LockedContent(null) + feng.templates.captions.UnlockedContent(null);
  param146 += feng.templates.common.Popup({classname: 'from-right', content: param149});
  param146 += '</div>';
  var output = feng.templates.captions.Caption({classname: 'changecolor right', content: param146});
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.FruitsCaption = function(opt_data, opt_ignored) {
  return feng.templates.captions.Caption({classname: 'fruits right', content: '<div class="popup-wrapper">' + feng.templates.common.Popup({classname: 'from-right', content: '<h1>' + opt_data.tip.name + '</h1>' + feng.templates.captions.DetailContent({problem: opt_data.tip.problem}) + feng.templates.captions.HintContent({hint: opt_data.tip.hint}) + feng.templates.captions.LockedContent(null) + feng.templates.captions.UnlockedContent(null)}) + '</div>'});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ArrangeClosetCaption = function(opt_data, opt_ignored) {
  return feng.templates.captions.Caption({classname: 'arrangecloset left', content: '<div class="left">' + feng.templates.common.Popup({classname: 'from-left', content: '<h1>' + opt_data.tip.name + '</h1>' + feng.templates.captions.DetailContent({problem: opt_data.tip.problem}) + feng.templates.captions.HintContent({hint: opt_data.tip.hint}) + feng.templates.captions.LockedContent(null) + feng.templates.captions.UnlockedContent(null)}) + '</div>'});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.FloatText = function(opt_data, opt_ignored) {
  var output = '<p class="floatText">';
  var lineList210 = opt_data.lines;
  var lineListLen210 = lineList210.length;
  for (var lineIndex210 = 0; lineIndex210 < lineListLen210; lineIndex210++) {
    var lineData210 = lineList210[lineIndex210];
    output += '<span>' + lineData210 + '</span>';
  }
  output += '</p>';
  return output;
};
