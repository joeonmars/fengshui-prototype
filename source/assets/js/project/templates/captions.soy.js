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
  return '<div class="caption ' + opt_data.position + '"><div class="panel"><div class="panel-button"><button class="icon"></button><h3>Learn<br>More</h3></div><div class="panel-controls"><div class="share"><ul><li><a href="https://www.facebook.com/sharer/sharer.php?u=http://fengshuirealtime.com/assets/html/share/' + opt_data.tip.id + '.html" target="_blank" class="icon icon-facebook"></a></li><li><a href="https://twitter.com/intent/tweet?original_referer=http://fengshuirealtime.com/assets/html/share/' + opt_data.tip.id + '.html" target="_blank" class="icon icon-twitter"></a></li><li><a href="https://plus.google.com/share?url=http://fengshuirealtime.com/assets/html/share/' + opt_data.tip.id + '.html" target="_blank" class="icon icon-google"></a></li></ul></div></div><div class="panel-content"><div class="content"><h1>' + opt_data.tip.name + '</h1><div class="scroller"><div class="scroller-inner">' + ((opt_data.tip.hint) ? '<section class="hint"><div class="inner"><div class="inner-scroller"><p>' + opt_data.tip.hint + '</p>' + feng.templates.common.PrimaryButton({icon: 'icon-yes', classname: 'hint-button', text: 'I see'}) + '</div></div>' + feng.templates.common.ScrollBar(null) + '</section>' : '') + ((opt_data.tip.problem) ? '<section class="problem"><div class="inner"><div class="inner-scroller"><p>' + opt_data.tip.problem + '</p><!-- either close to interact, or scroll down to go interaction section if available -->' + feng.templates.common.PrimaryButton({classname: 'prompt-button', icon: 'icon-yes', text: opt_data.tip.prompt}) + '</div></div>' + feng.templates.common.ScrollBar(null) + '</section>' : '') + ((opt_data.interactionContent) ? '<section class="interaction"><div class="inner"><div class="inner-scroller">' + opt_data.interactionContent + '</div></div>' + feng.templates.common.ScrollBar(null) + '</section>' : '') + ((opt_data.tip.advice) ? '<section class="advice"><div class="inner"><div class="inner-scroller"><h3>Feng Shui Tips</h3><p>' + opt_data.tip.advice + '</p></div></div>' + feng.templates.common.ScrollBar(null) + '</section>' : '') + '</div></div></div></div></div>' + feng.templates.common.CloseButton(null) + '</div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangePictureCaption = function(opt_data, opt_ignored) {
  var param102 = '<div class="change-picture"><h2>Click on a picture to change</h2><ul class="pictures">';
  var pictureKeyList104 = soy.$$getMapKeys(opt_data.tip.details['pictures']);
  var pictureKeyListLen104 = pictureKeyList104.length;
  for (var pictureKeyIndex104 = 0; pictureKeyIndex104 < pictureKeyListLen104; pictureKeyIndex104++) {
    var pictureKeyData104 = pictureKeyList104[pictureKeyIndex104];
    param102 += '<li><button class="item-button" data-picture="' + pictureKeyData104 + '"></button></li>';
  }
  param102 += '</ul><ul class="info">';
  var pictureKeyList110 = soy.$$getMapKeys(opt_data.tip.details['pictures']);
  var pictureKeyListLen110 = pictureKeyList110.length;
  for (var pictureKeyIndex110 = 0; pictureKeyIndex110 < pictureKeyListLen110; pictureKeyIndex110++) {
    var pictureKeyData110 = pictureKeyList110[pictureKeyIndex110];
    param102 += '<li data-picture="' + pictureKeyData110 + '"><h3>' + opt_data.tip.details['pictures'][pictureKeyData110]['name'] + '</h3><p>' + opt_data.tip.details['pictures'][pictureKeyData110]['description'] + '</p></li>';
  }
  param102 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param102}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeColorCaption = function(opt_data, opt_ignored) {
  var param122 = '<div class="change-color"><h2>Choose a better color.</h2><ul class="colors">';
  var colorKeyList124 = soy.$$getMapKeys(opt_data.tip.details['colors']);
  var colorKeyListLen124 = colorKeyList124.length;
  for (var colorKeyIndex124 = 0; colorKeyIndex124 < colorKeyListLen124; colorKeyIndex124++) {
    var colorKeyData124 = colorKeyList124[colorKeyIndex124];
    param122 += '<li><button class="item-button" style="background-color: ' + opt_data.tip.details['colors'][colorKeyData124]['hex'] + '" data-color="' + colorKeyData124 + '"></button></li>';
  }
  param122 += '</ul><ul class="info">';
  var colorKeyList132 = soy.$$getMapKeys(opt_data.tip.details['colors']);
  var colorKeyListLen132 = colorKeyList132.length;
  for (var colorKeyIndex132 = 0; colorKeyIndex132 < colorKeyListLen132; colorKeyIndex132++) {
    var colorKeyData132 = colorKeyList132[colorKeyIndex132];
    param122 += '<li data-color="' + colorKeyData132 + '"><h3>' + opt_data.tip.details['colors'][colorKeyData132]['name'] + '</h3><p>' + opt_data.tip.details['colors'][colorKeyData132]['description'] + '</p></li>';
  }
  param122 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param122}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeObjectCaption = function(opt_data, opt_ignored) {
  var param144 = '<div class="change-object"><h2>Replace with a new element.</h2><ul class="objects">';
  var objectKeyList146 = soy.$$getMapKeys(opt_data.tip.details['names']);
  var objectKeyListLen146 = objectKeyList146.length;
  for (var objectKeyIndex146 = 0; objectKeyIndex146 < objectKeyListLen146; objectKeyIndex146++) {
    var objectKeyData146 = objectKeyList146[objectKeyIndex146];
    param144 += '<li><button class="item-button" data-object="' + objectKeyData146 + '"></button></li>';
  }
  param144 += '</ul><ul class="info">';
  var objectKeyList152 = soy.$$getMapKeys(opt_data.tip.details['descriptions']);
  var objectKeyListLen152 = objectKeyList152.length;
  for (var objectKeyIndex152 = 0; objectKeyIndex152 < objectKeyListLen152; objectKeyIndex152++) {
    var objectKeyData152 = objectKeyList152[objectKeyIndex152];
    param144 += '<li data-object="' + objectKeyData152 + '"><h3>' + opt_data.tip.details['names'][objectKeyData152] + '</h3><p>' + opt_data.tip.details['descriptions'][objectKeyData152] + '</p></li>';
  }
  param144 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param144}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.DropFruitsCaption = function(opt_data, opt_ignored) {
  var param164 = '<div class="drop-fruits"><h2>Fill the plate with fruits.</h2><ul class="fruits">';
  var fruitKeyList166 = soy.$$getMapKeys(opt_data.tip.details['fruits']);
  var fruitKeyListLen166 = fruitKeyList166.length;
  for (var fruitKeyIndex166 = 0; fruitKeyIndex166 < fruitKeyListLen166; fruitKeyIndex166++) {
    var fruitKeyData166 = fruitKeyList166[fruitKeyIndex166];
    param164 += '<li><button class="item-button" data-fruit="' + fruitKeyData166 + '"></button></li>';
  }
  param164 += '</ul><ul class="info">';
  var fruitKeyList172 = soy.$$getMapKeys(opt_data.tip.details['fruits']);
  var fruitKeyListLen172 = fruitKeyList172.length;
  for (var fruitKeyIndex172 = 0; fruitKeyIndex172 < fruitKeyListLen172; fruitKeyIndex172++) {
    var fruitKeyData172 = fruitKeyList172[fruitKeyIndex172];
    param164 += '<li data-fruit="' + fruitKeyData172 + '"><h3>' + opt_data.tip.details['fruits'][fruitKeyData172]['name'] + '</h3><p>' + opt_data.tip.details['fruits'][fruitKeyData172]['description'] + '</p></li>';
  }
  param164 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param164}));
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
  var lineList185 = opt_data.lines;
  var lineListLen185 = lineList185.length;
  for (var lineIndex185 = 0; lineIndex185 < lineListLen185; lineIndex185++) {
    var lineData185 = lineList185[lineIndex185];
    output += '<span>' + lineData185 + '</span>';
  }
  output += '</p>';
  return output;
};
