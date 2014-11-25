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
  return '<div class="caption ' + opt_data.position + '"><div class="shade"></div><div class="panel"><button class="icon panel-button"></button><div class="panel-controls"><button class="icon icon-close close-button"></button><div class="share"><ul><li><a href="https://www.facebook.com/sharer/sharer.php?u=http://fengshuirealtime.com/assets/html/share/' + opt_data.tip.id + '.html" target="_blank" class="icon icon-facebook"></a></li><li><a href="https://twitter.com/intent/tweet?original_referer=http://fengshuirealtime.com/assets/html/share/' + opt_data.tip.id + '.html" target="_blank" class="icon icon-twitter"></a></li><li><a href="https://plus.google.com/share?url=http://fengshuirealtime.com/assets/html/share/' + opt_data.tip.id + '.html" target="_blank" class="icon icon-google"></a></li></ul></div></div><div class="panel-content"><div class="content"><h1>' + opt_data.tip.name + '</h1><div class="scroller"><div class="scroller-inner"><section class="hint"><p>' + opt_data.tip.hint + '</p>' + feng.templates.common.PrimaryButton({icon: 'icon-yes', classname: 'hint-button', text: 'I see'}) + '</section><section class="problem"><p>' + opt_data.tip.problem + '</p><!-- either close to interact, or scroll down to go interaction section if available -->' + feng.templates.common.PrimaryButton({classname: 'interaction-button', icon: 'icon-yes', text: 'Solve the problem'}) + '</section>' + ((opt_data.interactionContent) ? '<section class="interaction">' + opt_data.interactionContent + '</section>' : '') + '<section class="advice"><h2>Tips</h2><p>' + opt_data.tip.advice + '</p></section></div></div></div></div></div><button class="icon icon-close close-button"></button></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangePictureCaption = function(opt_data, opt_ignored) {
  var param81 = '<div class="change-picture"><h2>Click on a picture to change</h2><ul class="pictures">';
  var pictureKeyList83 = soy.$$getMapKeys(opt_data.pictures);
  var pictureKeyListLen83 = pictureKeyList83.length;
  for (var pictureKeyIndex83 = 0; pictureKeyIndex83 < pictureKeyListLen83; pictureKeyIndex83++) {
    var pictureKeyData83 = pictureKeyList83[pictureKeyIndex83];
    param81 += '<li><button class="picture" data-picture="' + pictureKeyData83 + '"></button></li>';
  }
  param81 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param81}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeColorCaption = function(opt_data, opt_ignored) {
  var param91 = '<div class="change-color"><h2>Click on a color to change</h2><ul class="colors">';
  var colorKeyList93 = soy.$$getMapKeys(opt_data.colors);
  var colorKeyListLen93 = colorKeyList93.length;
  for (var colorKeyIndex93 = 0; colorKeyIndex93 < colorKeyListLen93; colorKeyIndex93++) {
    var colorKeyData93 = colorKeyList93[colorKeyIndex93];
    param91 += '<li><button class="color" style="background-color: ' + opt_data.colors[colorKeyData93].hex + '" data-color="' + colorKeyData93 + '"></button></li>';
  }
  param91 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param91}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeObjectCaption = function(opt_data, opt_ignored) {
  var param103 = '<div class="change-object"><h2>Click on an object to change</h2><ul class="objects">';
  var objectKeyList105 = soy.$$getMapKeys(opt_data.objects);
  var objectKeyListLen105 = objectKeyList105.length;
  for (var objectKeyIndex105 = 0; objectKeyIndex105 < objectKeyListLen105; objectKeyIndex105++) {
    var objectKeyData105 = objectKeyList105[objectKeyIndex105];
    param103 += '<li><button class="object" data-object="' + objectKeyData105 + '"></button></li>';
  }
  param103 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param103}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.DropFruitsCaption = function(opt_data, opt_ignored) {
  var param113 = '<h2>Fill the plate with fruits</h2><div class="drop-fruits"><ul class="fruits">';
  var fruitKeyList115 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen115 = fruitKeyList115.length;
  for (var fruitKeyIndex115 = 0; fruitKeyIndex115 < fruitKeyListLen115; fruitKeyIndex115++) {
    var fruitKeyData115 = fruitKeyList115[fruitKeyIndex115];
    param113 += '<li><button data-fruit-id="' + fruitKeyData115 + '"></button></li>';
  }
  param113 += '</ul><ul class="descriptions">';
  var fruitKeyList121 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen121 = fruitKeyList121.length;
  for (var fruitKeyIndex121 = 0; fruitKeyIndex121 < fruitKeyListLen121; fruitKeyIndex121++) {
    var fruitKeyData121 = fruitKeyList121[fruitKeyIndex121];
    param113 += '<li data-fruit-id="' + fruitKeyData121 + '"><p>' + opt_data.fruits[fruitKeyData121] + '</p></li>';
  }
  param113 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param113}));
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
  var lineList132 = opt_data.lines;
  var lineListLen132 = lineList132.length;
  for (var lineIndex132 = 0; lineIndex132 < lineListLen132; lineIndex132++) {
    var lineData132 = lineList132[lineIndex132];
    output += '<span>' + lineData132 + '</span>';
  }
  output += '</p>';
  return output;
};
