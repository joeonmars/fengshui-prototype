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
  return '<div class="caption ' + opt_data.position + '"><div class="popup-wrapper">' + feng.templates.common.Popup({classname: opt_data.position, content: '<h1>' + opt_data.tip.name + '</h1><div class="problem"><h2>Problem</h2><button class="icon icon-arrow-down"></button><div class="drawer"><p>' + opt_data.tip.problem + '</p></div></div><div class="hint"><p>' + opt_data.tip.hint + '</p>' + feng.templates.common.PrimaryButton({icon: 'icon-yes', classname: 'hint-button', text: 'I see'}) + '</div><div class="interaction">' + ((opt_data.interactionContent) ? opt_data.interactionContent : feng.templates.common.PrimaryButton({classname: 'interaction-button', icon: 'icon-yes', text: 'Solve the problem'})) + '</div><div class="advice"><h2>Tips</h2><button class="icon icon-arrow-down"></button><div class="drawer"><p>' + opt_data.tip.advice + '</p></div></div><div class="share"><h2>Share With Friends</h2><ul><li><a href="https://www.facebook.com/sharer/sharer.php?u=http://fengshuirealtime.com/assets/html/share/' + opt_data.tip.id + '.html" target="_blank" class="icon icon-facebook"></a><li><a href="https://twitter.com/intent/tweet?original_referer=http://fengshuirealtime.com/assets/html/share/' + opt_data.tip.id + '.html" target="_blank" class="icon icon-twitter"></a><li><a href="https://plus.google.com/share?url=http://fengshuirealtime.com/assets/html/share/' + opt_data.tip.id + '.html" target="_blank" class="icon icon-google"></a></ul></div>'}) + '</div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangePictureCaption = function(opt_data, opt_ignored) {
  var param84 = '<div class="change-picture"><h2>Click on a picture to change</h2><ul class="pictures">';
  var pictureKeyList86 = soy.$$getMapKeys(opt_data.pictures);
  var pictureKeyListLen86 = pictureKeyList86.length;
  for (var pictureKeyIndex86 = 0; pictureKeyIndex86 < pictureKeyListLen86; pictureKeyIndex86++) {
    var pictureKeyData86 = pictureKeyList86[pictureKeyIndex86];
    param84 += '<li><button class="picture" data-picture="' + pictureKeyData86 + '"></button></li>';
  }
  param84 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param84}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeColorCaption = function(opt_data, opt_ignored) {
  var param94 = '<div class="change-color"><h2>Click on a color to change</h2><ul class="colors">';
  var colorKeyList96 = soy.$$getMapKeys(opt_data.colors);
  var colorKeyListLen96 = colorKeyList96.length;
  for (var colorKeyIndex96 = 0; colorKeyIndex96 < colorKeyListLen96; colorKeyIndex96++) {
    var colorKeyData96 = colorKeyList96[colorKeyIndex96];
    param94 += '<li><button class="color" style="background-color: ' + opt_data.colors[colorKeyData96].hex + '" data-color="' + colorKeyData96 + '"></button></li>';
  }
  param94 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param94}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.DropFruitsCaption = function(opt_data, opt_ignored) {
  var param106 = '<h2>Fill the plate with fruits</h2><div class="drop-fruits"><ul class="fruits">';
  var fruitKeyList108 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen108 = fruitKeyList108.length;
  for (var fruitKeyIndex108 = 0; fruitKeyIndex108 < fruitKeyListLen108; fruitKeyIndex108++) {
    var fruitKeyData108 = fruitKeyList108[fruitKeyIndex108];
    param106 += '<li><button data-fruit-id="' + fruitKeyData108 + '"></button></li>';
  }
  param106 += '</ul><ul class="descriptions">';
  var fruitKeyList114 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen114 = fruitKeyList114.length;
  for (var fruitKeyIndex114 = 0; fruitKeyIndex114 < fruitKeyListLen114; fruitKeyIndex114++) {
    var fruitKeyData114 = fruitKeyList114[fruitKeyIndex114];
    param106 += '<li data-fruit-id="' + fruitKeyData114 + '"><p>' + opt_data.fruits[fruitKeyData114] + '</p></li>';
  }
  param106 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param106}));
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
  var lineList125 = opt_data.lines;
  var lineListLen125 = lineList125.length;
  for (var lineIndex125 = 0; lineIndex125 < lineListLen125; lineIndex125++) {
    var lineData125 = lineList125[lineIndex125];
    output += '<span>' + lineData125 + '</span>';
  }
  output += '</p>';
  return output;
};
