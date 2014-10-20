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
  return '<div class="caption ' + opt_data.position + '"><div class="popup-wrapper">' + feng.templates.common.Popup({classname: opt_data.position, content: '<h1>' + opt_data.tip.name + '</h1><div class="problem"><h2>Problem</h2><button class="icon icon-arrow-down"></button><div class="drawer"><p>' + opt_data.tip.problem + '</p></div></div><div class="hint"><p>' + opt_data.tip.hint + '</p>' + feng.templates.common.PrimaryButton({icon: 'icon-yes', classname: 'hint-button', text: 'I see'}) + '</div><div class="interaction">' + ((opt_data.interactionContent) ? opt_data.interactionContent : feng.templates.common.PrimaryButton({classname: 'interaction-button', icon: 'icon-yes', text: 'Solve the problem'})) + '</div><div class="advice"><h2>Your Tip</h2><button class="icon icon-arrow-down"></button><div class="drawer"><p>' + opt_data.tip.advice + '</p></div></div><div class="share"><h2>Share With Friends</h2><ul><li><a href="https://www.facebook.com/sharer/sharer.php?u=http://fengshuirealtime.com/assets/html/share/' + opt_data.tip.id + '.html" target="_blank" class="icon icon-facebook"></a><li><a href="https://twitter.com/intent/tweet?original_referer=http://fengshuirealtime.com/assets/html/share/' + opt_data.tip.id + '.html" target="_blank" class="icon icon-twitter"></a><li><a href="https://plus.google.com/share?url=http://fengshuirealtime.com/assets/html/share/' + opt_data.tip.id + '.html" target="_blank" class="icon icon-google"></a></ul></div>'}) + '</div></div>';
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
  var param76 = '<div class="change-color"><h2>Click on a color to change</h2><ul class="colors">';
  var colorKeyList78 = soy.$$getMapKeys(opt_data.colors);
  var colorKeyListLen78 = colorKeyList78.length;
  for (var colorKeyIndex78 = 0; colorKeyIndex78 < colorKeyListLen78; colorKeyIndex78++) {
    var colorKeyData78 = colorKeyList78[colorKeyIndex78];
    param76 += '<li><button class="color" style="background-color: ' + opt_data.colors[colorKeyData78].hex + '" data-color="' + colorKeyData78 + '"></button></li>';
  }
  param76 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param76}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.DropFruitsCaption = function(opt_data, opt_ignored) {
  var param88 = '<h2>Fill the plate with fruits</h2><div class="drop-fruits"><ul class="fruits">';
  var fruitKeyList90 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen90 = fruitKeyList90.length;
  for (var fruitKeyIndex90 = 0; fruitKeyIndex90 < fruitKeyListLen90; fruitKeyIndex90++) {
    var fruitKeyData90 = fruitKeyList90[fruitKeyIndex90];
    param88 += '<li><button data-fruit-id="' + fruitKeyData90 + '"></button></li>';
  }
  param88 += '</ul><ul class="descriptions">';
  var fruitKeyList96 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen96 = fruitKeyList96.length;
  for (var fruitKeyIndex96 = 0; fruitKeyIndex96 < fruitKeyListLen96; fruitKeyIndex96++) {
    var fruitKeyData96 = fruitKeyList96[fruitKeyIndex96];
    param88 += '<li data-fruit-id="' + fruitKeyData96 + '"><p>' + opt_data.fruits[fruitKeyData96] + '</p></li>';
  }
  param88 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param88}));
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
  var lineList107 = opt_data.lines;
  var lineListLen107 = lineList107.length;
  for (var lineIndex107 = 0; lineIndex107 < lineListLen107; lineIndex107++) {
    var lineData107 = lineList107[lineIndex107];
    output += '<span>' + lineData107 + '</span>';
  }
  output += '</p>';
  return output;
};
