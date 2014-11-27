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
  return '<div class="caption ' + opt_data.position + '"><div class="shade"></div><div class="panel"><button class="icon panel-button"></button><div class="panel-controls"><button class="icon icon-close close-button"></button><div class="share"><ul><li><a href="https://www.facebook.com/sharer/sharer.php?u=http://fengshuirealtime.com/assets/html/share/' + opt_data.tip.id + '.html" target="_blank" class="icon icon-facebook"></a></li><li><a href="https://twitter.com/intent/tweet?original_referer=http://fengshuirealtime.com/assets/html/share/' + opt_data.tip.id + '.html" target="_blank" class="icon icon-twitter"></a></li><li><a href="https://plus.google.com/share?url=http://fengshuirealtime.com/assets/html/share/' + opt_data.tip.id + '.html" target="_blank" class="icon icon-google"></a></li></ul></div></div><div class="panel-content"><div class="content"><h1>' + opt_data.tip.name + '</h1><div class="scroller"><div class="scroller-inner">' + ((opt_data.tip.hint) ? '<section class="hint"><div class="inner"><p>' + opt_data.tip.hint + '</p>' + feng.templates.common.PrimaryButton({icon: 'icon-yes', classname: 'hint-button', text: 'I see'}) + '</div></section>' : '') + ((opt_data.tip.problem) ? '<section class="problem"><div class="inner"><p>' + opt_data.tip.problem + '</p><!-- either close to interact, or scroll down to go interaction section if available -->' + feng.templates.common.PrimaryButton({classname: 'prompt-button', icon: 'icon-yes', text: opt_data.tip.prompt}) + '</div></section>' : '') + ((opt_data.interactionContent) ? '<section class="interaction"><div class="inner">' + opt_data.interactionContent + '</div></section>' : '') + ((opt_data.tip.advice) ? '<section class="advice"><div class="inner"><h2>Tips</h2><p>' + opt_data.tip.advice + '</p></div></section>' : '') + '</div></div></div></div></div><button class="icon icon-close close-button"></button></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangePictureCaption = function(opt_data, opt_ignored) {
  var param90 = '<div class="change-picture"><h2>Click on a picture to change</h2><ul class="pictures">';
  var pictureKeyList92 = soy.$$getMapKeys(opt_data.pictures);
  var pictureKeyListLen92 = pictureKeyList92.length;
  for (var pictureKeyIndex92 = 0; pictureKeyIndex92 < pictureKeyListLen92; pictureKeyIndex92++) {
    var pictureKeyData92 = pictureKeyList92[pictureKeyIndex92];
    param90 += '<li><button class="picture" data-picture="' + pictureKeyData92 + '"></button></li>';
  }
  param90 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param90}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeColorCaption = function(opt_data, opt_ignored) {
  var param100 = '<div class="change-color"><h2>Click on a color to change</h2><ul class="colors">';
  var colorKeyList102 = soy.$$getMapKeys(opt_data.colors);
  var colorKeyListLen102 = colorKeyList102.length;
  for (var colorKeyIndex102 = 0; colorKeyIndex102 < colorKeyListLen102; colorKeyIndex102++) {
    var colorKeyData102 = colorKeyList102[colorKeyIndex102];
    param100 += '<li><button class="color" style="background-color: ' + opt_data.colors[colorKeyData102].hex + '" data-color="' + colorKeyData102 + '"></button></li>';
  }
  param100 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param100}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeObjectCaption = function(opt_data, opt_ignored) {
  var param112 = '<div class="change-object"><h2>Click on an object to change</h2><ul class="objects">';
  var objectKeyList114 = soy.$$getMapKeys(opt_data.tip.details['names']);
  var objectKeyListLen114 = objectKeyList114.length;
  for (var objectKeyIndex114 = 0; objectKeyIndex114 < objectKeyListLen114; objectKeyIndex114++) {
    var objectKeyData114 = objectKeyList114[objectKeyIndex114];
    param112 += '<li><button class="object" data-object="' + objectKeyData114 + '"></button></li>';
  }
  param112 += '</ul><ul class="info">';
  var objectKeyList120 = soy.$$getMapKeys(opt_data.tip.details['descriptions']);
  var objectKeyListLen120 = objectKeyList120.length;
  for (var objectKeyIndex120 = 0; objectKeyIndex120 < objectKeyListLen120; objectKeyIndex120++) {
    var objectKeyData120 = objectKeyList120[objectKeyIndex120];
    param112 += '<li><h3>' + opt_data.tip.details['names'][objectKeyData120] + '</h3><p>' + opt_data.tip.details['descriptions'][objectKeyData120] + '</p></li>';
  }
  param112 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param112}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.DropFruitsCaption = function(opt_data, opt_ignored) {
  var param130 = '<h2>Fill the plate with fruits</h2><div class="drop-fruits"><ul class="fruits">';
  var fruitKeyList132 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen132 = fruitKeyList132.length;
  for (var fruitKeyIndex132 = 0; fruitKeyIndex132 < fruitKeyListLen132; fruitKeyIndex132++) {
    var fruitKeyData132 = fruitKeyList132[fruitKeyIndex132];
    param130 += '<li><button data-fruit-id="' + fruitKeyData132 + '"></button></li>';
  }
  param130 += '</ul><ul class="descriptions">';
  var fruitKeyList138 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen138 = fruitKeyList138.length;
  for (var fruitKeyIndex138 = 0; fruitKeyIndex138 < fruitKeyListLen138; fruitKeyIndex138++) {
    var fruitKeyData138 = fruitKeyList138[fruitKeyIndex138];
    param130 += '<li data-fruit-id="' + fruitKeyData138 + '"><p>' + opt_data.fruits[fruitKeyData138] + '</p></li>';
  }
  param130 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param130}));
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
  var lineList149 = opt_data.lines;
  var lineListLen149 = lineList149.length;
  for (var lineIndex149 = 0; lineIndex149 < lineListLen149; lineIndex149++) {
    var lineData149 = lineList149[lineIndex149];
    output += '<span>' + lineData149 + '</span>';
  }
  output += '</p>';
  return output;
};
