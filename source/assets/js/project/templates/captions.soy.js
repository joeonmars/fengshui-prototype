// This file was automatically generated from captions.soy.
// Please don't edit this file by hand.

goog.provide('feng.templates.captions');

goog.require('soy');
goog.require('soydata');
goog.require('feng.templates.common');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.Caption = function(opt_data, opt_ignored) {
  return '<div class="caption ' + opt_data.position + '"><div class="popup-wrapper">' + feng.templates.common.Popup({classname: opt_data.position, content: '<h1>' + opt_data.tip.name + '</h1><div class="problem"><h2>Problem</h2><button class="icon icon-arrow-down"></button><div class="drawer"><p>' + opt_data.tip.problem + '</p></div></div><div class="hint"><p>' + opt_data.tip.hint + '</p>' + feng.templates.common.PrimaryButton({icon: 'icon-yes', classname: 'hint-button', text: 'I see'}) + '</div><div class="interaction">' + ((opt_data.interactionContent) ? opt_data.interactionContent : feng.templates.common.PrimaryButton({classname: 'interaction-button', icon: 'icon-yes', text: 'Solve the problem'})) + '</div><div class="advice"><h2>Your Tip</h2><button class="icon icon-arrow-down"></button><div class="drawer"><p>' + opt_data.tip.advice + '</p></div></div><div class="share"><h2>Share With Friends</h2><ul><li><a href="" target="_blank" class="icon icon-facebook"></a><li><a href="" target="_blank" class="icon icon-twitter"></a><li><a href="" target="_blank" class="icon icon-google"></a></ul></div>'}) + '</div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangePictureCaption = function(opt_data, opt_ignored) {
  return feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: ''}));
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeColorCaption = function(opt_data, opt_ignored) {
  var param58 = '<div class="change-color"><h2>Click on a color to change</h2><ul class="colors">';
  var colorKeyList60 = soy.$$getMapKeys(opt_data.colors);
  var colorKeyListLen60 = colorKeyList60.length;
  for (var colorKeyIndex60 = 0; colorKeyIndex60 < colorKeyListLen60; colorKeyIndex60++) {
    var colorKeyData60 = colorKeyList60[colorKeyIndex60];
    param58 += '<li><button class="color" style="background-color: ' + opt_data.colors[colorKeyData60].hex + '" data-color="' + colorKeyData60 + '"></button></li>';
  }
  param58 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param58}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.DropFruitsCaption = function(opt_data, opt_ignored) {
  var param70 = '<h2>Fill the plate with fruits</h2><div class="drop-fruits"><ul class="fruits">';
  var fruitKeyList72 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen72 = fruitKeyList72.length;
  for (var fruitKeyIndex72 = 0; fruitKeyIndex72 < fruitKeyListLen72; fruitKeyIndex72++) {
    var fruitKeyData72 = fruitKeyList72[fruitKeyIndex72];
    param70 += '<li><button data-fruit-id="' + fruitKeyData72 + '"></button></li>';
  }
  param70 += '</ul><ul class="descriptions">';
  var fruitKeyList78 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen78 = fruitKeyList78.length;
  for (var fruitKeyIndex78 = 0; fruitKeyIndex78 < fruitKeyListLen78; fruitKeyIndex78++) {
    var fruitKeyData78 = fruitKeyList78[fruitKeyIndex78];
    param70 += '<li data-fruit-id="' + fruitKeyData78 + '"><p>' + opt_data.fruits[fruitKeyData78] + '</p></li>';
  }
  param70 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param70}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.FloatText = function(opt_data, opt_ignored) {
  var output = '<p class="floatText">';
  var lineList89 = opt_data.lines;
  var lineListLen89 = lineList89.length;
  for (var lineIndex89 = 0; lineIndex89 < lineListLen89; lineIndex89++) {
    var lineData89 = lineList89[lineIndex89];
    output += '<span>' + lineData89 + '</span>';
  }
  output += '</p>';
  return output;
};
