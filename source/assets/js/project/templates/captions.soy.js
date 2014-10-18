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
  var param64 = '<div class="change-color"><h2>Click on a color to change</h2><ul class="colors">';
  var colorKeyList66 = soy.$$getMapKeys(opt_data.colors);
  var colorKeyListLen66 = colorKeyList66.length;
  for (var colorKeyIndex66 = 0; colorKeyIndex66 < colorKeyListLen66; colorKeyIndex66++) {
    var colorKeyData66 = colorKeyList66[colorKeyIndex66];
    param64 += '<li><button class="color" style="background-color: ' + opt_data.colors[colorKeyData66].hex + '" data-color="' + colorKeyData66 + '"></button></li>';
  }
  param64 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param64}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.DropFruitsCaption = function(opt_data, opt_ignored) {
  var param76 = '<h2>Fill the plate with fruits</h2><div class="drop-fruits"><ul class="fruits">';
  var fruitKeyList78 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen78 = fruitKeyList78.length;
  for (var fruitKeyIndex78 = 0; fruitKeyIndex78 < fruitKeyListLen78; fruitKeyIndex78++) {
    var fruitKeyData78 = fruitKeyList78[fruitKeyIndex78];
    param76 += '<li><button data-fruit-id="' + fruitKeyData78 + '"></button></li>';
  }
  param76 += '</ul><ul class="descriptions">';
  var fruitKeyList84 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen84 = fruitKeyList84.length;
  for (var fruitKeyIndex84 = 0; fruitKeyIndex84 < fruitKeyListLen84; fruitKeyIndex84++) {
    var fruitKeyData84 = fruitKeyList84[fruitKeyIndex84];
    param76 += '<li data-fruit-id="' + fruitKeyData84 + '"><p>' + opt_data.fruits[fruitKeyData84] + '</p></li>';
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
feng.templates.captions.FloatText = function(opt_data, opt_ignored) {
  var output = '<p class="floatText">';
  var lineList95 = opt_data.lines;
  var lineListLen95 = lineList95.length;
  for (var lineIndex95 = 0; lineIndex95 < lineListLen95; lineIndex95++) {
    var lineData95 = lineList95[lineIndex95];
    output += '<span>' + lineData95 + '</span>';
  }
  output += '</p>';
  return output;
};
