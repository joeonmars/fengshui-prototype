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
feng.templates.captions.LockedContent = function(opt_data, opt_ignored) {
  return '<div class="locked">' + feng.templates.common.PrimaryButton({icon: 'change', classname: 'change', text: 'change'}) + '</div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.UnlockedContent = function(opt_data, opt_ignored) {
  return '<div class="unlocked"><ul class="share"><li><a class="facebook" target="_blank"></a></li><li><a class="twitter" target="_blank"></a></li><li><a class="google" target="_blank"></a></li></ul></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.AdviceCaption = function(opt_data, opt_ignored) {
  return feng.templates.captions.Caption({classname: 'advice', content: '<div class="right"></div>'});
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
  var param104 = '<div class="draggerContainer"><img class="dragger" draggable="false"></div><div class="right">' + feng.templates.common.Popup({content: '<h1>' + opt_data.tip.name + '</h1>' + feng.templates.captions.DetailContent({advice: opt_data.tip.advice, quote: opt_data.tip.quote, description: opt_data.tip.description}) + feng.templates.captions.LockedContent(null) + feng.templates.captions.UnlockedContent(null)}) + '</div><div class="bottom"><div class="pictureSelector">' + feng.templates.controls.RoundButton({content: '<div class="icon"></div>', classname: 'prev'}) + '<div class="pictureView"><div class="carousel"><ul>';
  var pictureList123 = opt_data.pictures;
  var pictureListLen123 = pictureList123.length;
  for (var pictureIndex123 = 0; pictureIndex123 < pictureListLen123; pictureIndex123++) {
    var pictureData123 = pictureList123[pictureIndex123];
    param104 += '<li data-id="' + pictureIndex123 + '"><div class="thumbnail" style="background-image: url(' + pictureData123.src + ')" data-id="' + pictureIndex123 + '"></li>';
  }
  param104 += '</ul></div></div>' + feng.templates.controls.RoundButton({content: '<div class="icon"></div>', classname: 'next'}) + '</div></div>';
  var output = feng.templates.captions.Caption({classname: 'changepicture', content: param104});
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeColorCaption = function(opt_data, opt_ignored) {
  var param141 = '<div class="right">' + feng.templates.common.Popup({content: '<h1>' + opt_data.tip.name + '</h1>' + feng.templates.captions.DetailContent({advice: opt_data.tip.advice, quote: opt_data.tip.quote, description: opt_data.tip.description}) + feng.templates.captions.LockedContent(null) + feng.templates.captions.UnlockedContent(null)}) + '</div><div class="bottom"><div class="colorSelector"><div class="colorView"><div class="carousel"><ul>';
  var colorKeyList155 = soy.$$getMapKeys(opt_data.colors);
  var colorKeyListLen155 = colorKeyList155.length;
  for (var colorKeyIndex155 = 0; colorKeyIndex155 < colorKeyListLen155; colorKeyIndex155++) {
    var colorKeyData155 = colorKeyList155[colorKeyIndex155];
    param141 += '<li><div class="color" style="background-color: ' + opt_data.colors[colorKeyData155].hex + '" data-color="' + colorKeyData155 + '"></li>';
  }
  param141 += '</ul></div></div></div></div>';
  var output = feng.templates.captions.Caption({classname: 'changecolor', content: param141});
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
  var lineList185 = opt_data.lines;
  var lineListLen185 = lineList185.length;
  for (var lineIndex185 = 0; lineIndex185 < lineListLen185; lineIndex185++) {
    var lineData185 = lineList185[lineIndex185];
    output += '<span>' + lineData185 + '</span>';
  }
  output += '</p>';
  return output;
};
