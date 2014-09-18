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
  return '<div class="hint"><p>' + opt_data.hint + '</p>' + feng.templates.common.PrimaryButton({icon: 'change', classname: 'find', text: 'Go Find It'}) + '</div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.DetailContent = function(opt_data, opt_ignored) {
  return '<div class="detail"><h2>' + opt_data.advice + '</h2><q>"' + opt_data.quote + '"</q><p>' + opt_data.description + '</p></div>';
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
  return feng.templates.captions.Caption({classname: 'advice', content: '<div class="right">' + feng.templates.captions.ShareOptions(null) + '</div>'});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeObjectCaption = function(opt_data, opt_ignored) {
  return feng.templates.captions.Caption({classname: 'changeobject', content: '<div class="top"></div><div class="right"></div>'});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangePictureCaption = function(opt_data, opt_ignored) {
  var param113 = '<div class="draggerContainer"><img class="dragger" draggable="false"></div><div class="right">' + feng.templates.common.Popup({content: '<h1>' + opt_data.tip.name + '</h1>' + feng.templates.captions.DetailContent({advice: opt_data.tip.advice, quote: opt_data.tip.quote, description: opt_data.tip.description}) + feng.templates.captions.LockedContent(null) + feng.templates.captions.UnlockedContent(null)}) + '</div><div class="bottom"><div class="pictureSelector">' + feng.templates.controls.RoundButton({content: '<div class="icon"></div>', classname: 'prev'}) + '<div class="pictureView"><div class="carousel"><ul>';
  var pictureList132 = opt_data.pictures;
  var pictureListLen132 = pictureList132.length;
  for (var pictureIndex132 = 0; pictureIndex132 < pictureListLen132; pictureIndex132++) {
    var pictureData132 = pictureList132[pictureIndex132];
    param113 += '<li data-id="' + pictureIndex132 + '"><div class="thumbnail" style="background-image: url(' + pictureData132.src + ')" data-id="' + pictureIndex132 + '"></li>';
  }
  param113 += '</ul></div></div>' + feng.templates.controls.RoundButton({content: '<div class="icon"></div>', classname: 'next'}) + '</div></div>';
  var output = feng.templates.captions.Caption({classname: 'changepicture', content: param113});
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeColorCaption = function(opt_data, opt_ignored) {
  var param150 = '<div class="right">' + feng.templates.common.Popup({content: '<h1>' + opt_data.tip.name + '</h1>' + feng.templates.captions.DetailContent({advice: opt_data.tip.advice, quote: opt_data.tip.quote, description: opt_data.tip.description}) + feng.templates.captions.LockedContent(null) + feng.templates.captions.UnlockedContent(null)}) + '</div><div class="bottom"><div class="colorSelector"><div class="colorView"><div class="carousel"><ul>';
  var colorKeyList164 = soy.$$getMapKeys(opt_data.colors);
  var colorKeyListLen164 = colorKeyList164.length;
  for (var colorKeyIndex164 = 0; colorKeyIndex164 < colorKeyListLen164; colorKeyIndex164++) {
    var colorKeyData164 = colorKeyList164[colorKeyIndex164];
    param150 += '<li><div class="color" style="background-color: ' + opt_data.colors[colorKeyData164].hex + '" data-color="' + colorKeyData164 + '"></li>';
  }
  param150 += '</ul></div></div></div></div>';
  var output = feng.templates.captions.Caption({classname: 'changecolor', content: param150});
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.FruitsCaption = function(opt_data, opt_ignored) {
  return feng.templates.captions.Caption({classname: 'fruits', content: '<div class="right">' + feng.templates.common.Popup({content: '<h1>' + opt_data.tip.name + '</h1>' + feng.templates.captions.HintContent({hint: opt_data.tip.hint}) + feng.templates.captions.DetailContent({advice: opt_data.tip.advice, quote: opt_data.tip.quote, description: opt_data.tip.description}) + feng.templates.captions.LockedContent(null) + feng.templates.captions.UnlockedContent(null)}) + '</div>'});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.FloatText = function(opt_data, opt_ignored) {
  var output = '<p class="floatText">';
  var lineList194 = opt_data.lines;
  var lineListLen194 = lineList194.length;
  for (var lineIndex194 = 0; lineIndex194 < lineListLen194; lineIndex194++) {
    var lineData194 = lineList194[lineIndex194];
    output += '<span>' + lineData194 + '</span>';
  }
  output += '</p>';
  return output;
};
