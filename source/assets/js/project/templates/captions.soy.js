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
  var param86 = '<div class="change-picture"><h2>Click on a picture to change</h2><ul class="pictures">';
  var pictureKeyList88 = soy.$$getMapKeys(opt_data.pictures);
  var pictureKeyListLen88 = pictureKeyList88.length;
  for (var pictureKeyIndex88 = 0; pictureKeyIndex88 < pictureKeyListLen88; pictureKeyIndex88++) {
    var pictureKeyData88 = pictureKeyList88[pictureKeyIndex88];
    param86 += '<li><button class="picture" data-picture="' + pictureKeyData88 + '"></button></li>';
  }
  param86 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param86}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeColorCaption = function(opt_data, opt_ignored) {
  var param96 = '<div class="change-color"><h2>Click on a color to change</h2><ul class="colors">';
  var colorKeyList98 = soy.$$getMapKeys(opt_data.colors);
  var colorKeyListLen98 = colorKeyList98.length;
  for (var colorKeyIndex98 = 0; colorKeyIndex98 < colorKeyListLen98; colorKeyIndex98++) {
    var colorKeyData98 = colorKeyList98[colorKeyIndex98];
    param96 += '<li><button class="color" style="background-color: ' + opt_data.colors[colorKeyData98].hex + '" data-color="' + colorKeyData98 + '"></button></li>';
  }
  param96 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param96}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.DropFruitsCaption = function(opt_data, opt_ignored) {
  var param108 = '<h2>Fill the plate with fruits</h2><div class="drop-fruits"><ul class="fruits">';
  var fruitKeyList110 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen110 = fruitKeyList110.length;
  for (var fruitKeyIndex110 = 0; fruitKeyIndex110 < fruitKeyListLen110; fruitKeyIndex110++) {
    var fruitKeyData110 = fruitKeyList110[fruitKeyIndex110];
    param108 += '<li><button data-fruit-id="' + fruitKeyData110 + '"></button></li>';
  }
  param108 += '</ul><ul class="descriptions">';
  var fruitKeyList116 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen116 = fruitKeyList116.length;
  for (var fruitKeyIndex116 = 0; fruitKeyIndex116 < fruitKeyListLen116; fruitKeyIndex116++) {
    var fruitKeyData116 = fruitKeyList116[fruitKeyIndex116];
    param108 += '<li data-fruit-id="' + fruitKeyData116 + '"><p>' + opt_data.fruits[fruitKeyData116] + '</p></li>';
  }
  param108 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param108}));
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
  var lineList127 = opt_data.lines;
  var lineListLen127 = lineList127.length;
  for (var lineIndex127 = 0; lineIndex127 < lineListLen127; lineIndex127++) {
    var lineData127 = lineList127[lineIndex127];
    output += '<span>' + lineData127 + '</span>';
  }
  output += '</p>';
  return output;
};
