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
  var param62 = '<div class="change-color"><h2>Click on a color to change</h2><ul class="colors">';
  var colorKeyList64 = soy.$$getMapKeys(opt_data.colors);
  var colorKeyListLen64 = colorKeyList64.length;
  for (var colorKeyIndex64 = 0; colorKeyIndex64 < colorKeyListLen64; colorKeyIndex64++) {
    var colorKeyData64 = colorKeyList64[colorKeyIndex64];
    param62 += '<li><button class="color" style="background-color: ' + opt_data.colors[colorKeyData64].hex + '" data-color="' + colorKeyData64 + '"></button></li>';
  }
  param62 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param62}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.DropFruitsCaption = function(opt_data, opt_ignored) {
  var param74 = '<h2>Fill the plate with fruits</h2><div class="drop-fruits"><ul class="fruits">';
  var fruitKeyList76 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen76 = fruitKeyList76.length;
  for (var fruitKeyIndex76 = 0; fruitKeyIndex76 < fruitKeyListLen76; fruitKeyIndex76++) {
    var fruitKeyData76 = fruitKeyList76[fruitKeyIndex76];
    param74 += '<li><button data-fruit-id="' + fruitKeyData76 + '"></button></li>';
  }
  param74 += '</ul><ul class="descriptions">';
  var fruitKeyList82 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen82 = fruitKeyList82.length;
  for (var fruitKeyIndex82 = 0; fruitKeyIndex82 < fruitKeyListLen82; fruitKeyIndex82++) {
    var fruitKeyData82 = fruitKeyList82[fruitKeyIndex82];
    param74 += '<li data-fruit-id="' + fruitKeyData82 + '"><p>' + opt_data.fruits[fruitKeyData82] + '</p></li>';
  }
  param74 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param74}));
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
  var lineList93 = opt_data.lines;
  var lineListLen93 = lineList93.length;
  for (var lineIndex93 = 0; lineIndex93 < lineListLen93; lineIndex93++) {
    var lineData93 = lineList93[lineIndex93];
    output += '<span>' + lineData93 + '</span>';
  }
  output += '</p>';
  return output;
};
