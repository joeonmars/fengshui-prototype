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
  var param104 = '<div class="change-picture"><h2>Click on a picture to change</h2><ul class="pictures">';
  var pictureKeyList106 = soy.$$getMapKeys(opt_data.tip.details['pictures']);
  var pictureKeyListLen106 = pictureKeyList106.length;
  for (var pictureKeyIndex106 = 0; pictureKeyIndex106 < pictureKeyListLen106; pictureKeyIndex106++) {
    var pictureKeyData106 = pictureKeyList106[pictureKeyIndex106];
    param104 += '<li><button class="item-button" data-picture="' + pictureKeyData106 + '"></button></li>';
  }
  param104 += '</ul><ul class="info">';
  var pictureKeyList112 = soy.$$getMapKeys(opt_data.tip.details['pictures']);
  var pictureKeyListLen112 = pictureKeyList112.length;
  for (var pictureKeyIndex112 = 0; pictureKeyIndex112 < pictureKeyListLen112; pictureKeyIndex112++) {
    var pictureKeyData112 = pictureKeyList112[pictureKeyIndex112];
    param104 += '<li data-picture="' + pictureKeyData112 + '"><h3>' + opt_data.tip.details['pictures'][pictureKeyData112]['name'] + '</h3><p>' + opt_data.tip.details['pictures'][pictureKeyData112]['description'] + '</p></li>';
  }
  param104 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param104}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeColorCaption = function(opt_data, opt_ignored) {
  var param124 = '<div class="change-color"><h2>Choose a better color.</h2><ul class="colors">';
  var colorKeyList126 = soy.$$getMapKeys(opt_data.tip.details['colors']);
  var colorKeyListLen126 = colorKeyList126.length;
  for (var colorKeyIndex126 = 0; colorKeyIndex126 < colorKeyListLen126; colorKeyIndex126++) {
    var colorKeyData126 = colorKeyList126[colorKeyIndex126];
    param124 += '<li><button class="item-button" style="background-color: ' + opt_data.tip.details['colors'][colorKeyData126]['hex'] + '" data-color="' + colorKeyData126 + '"></button></li>';
  }
  param124 += '</ul><ul class="info">';
  var colorKeyList134 = soy.$$getMapKeys(opt_data.tip.details['colors']);
  var colorKeyListLen134 = colorKeyList134.length;
  for (var colorKeyIndex134 = 0; colorKeyIndex134 < colorKeyListLen134; colorKeyIndex134++) {
    var colorKeyData134 = colorKeyList134[colorKeyIndex134];
    param124 += '<li data-color="' + colorKeyData134 + '"><h3>' + opt_data.tip.details['colors'][colorKeyData134]['name'] + '</h3><p>' + opt_data.tip.details['colors'][colorKeyData134]['description'] + '</p></li>';
  }
  param124 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param124}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeObjectCaption = function(opt_data, opt_ignored) {
  var param146 = '<div class="change-object"><h2>Replace with a new element.</h2><ul class="objects">';
  var objectKeyList148 = soy.$$getMapKeys(opt_data.tip.details['names']);
  var objectKeyListLen148 = objectKeyList148.length;
  for (var objectKeyIndex148 = 0; objectKeyIndex148 < objectKeyListLen148; objectKeyIndex148++) {
    var objectKeyData148 = objectKeyList148[objectKeyIndex148];
    param146 += '<li><button class="item-button" data-object="' + objectKeyData148 + '"></button></li>';
  }
  param146 += '</ul><ul class="info">';
  var objectKeyList154 = soy.$$getMapKeys(opt_data.tip.details['descriptions']);
  var objectKeyListLen154 = objectKeyList154.length;
  for (var objectKeyIndex154 = 0; objectKeyIndex154 < objectKeyListLen154; objectKeyIndex154++) {
    var objectKeyData154 = objectKeyList154[objectKeyIndex154];
    param146 += '<li data-object="' + objectKeyData154 + '"><h3>' + opt_data.tip.details['names'][objectKeyData154] + '</h3><p>' + opt_data.tip.details['descriptions'][objectKeyData154] + '</p></li>';
  }
  param146 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param146}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.DropFruitsCaption = function(opt_data, opt_ignored) {
  var param166 = '<div class="drop-fruits"><h2>Fill the plate with fruits.</h2><ul class="fruits">';
  var fruitKeyList168 = soy.$$getMapKeys(opt_data.tip.details['fruits']);
  var fruitKeyListLen168 = fruitKeyList168.length;
  for (var fruitKeyIndex168 = 0; fruitKeyIndex168 < fruitKeyListLen168; fruitKeyIndex168++) {
    var fruitKeyData168 = fruitKeyList168[fruitKeyIndex168];
    param166 += '<li><button class="item-button" data-fruit="' + fruitKeyData168 + '"></button></li>';
  }
  param166 += '</ul><ul class="info">';
  var fruitKeyList174 = soy.$$getMapKeys(opt_data.tip.details['fruits']);
  var fruitKeyListLen174 = fruitKeyList174.length;
  for (var fruitKeyIndex174 = 0; fruitKeyIndex174 < fruitKeyListLen174; fruitKeyIndex174++) {
    var fruitKeyData174 = fruitKeyList174[fruitKeyIndex174];
    param166 += '<li data-fruit="' + fruitKeyData174 + '"><h3>' + opt_data.tip.details['fruits'][fruitKeyData174]['name'] + '</h3><p>' + opt_data.tip.details['fruits'][fruitKeyData174]['description'] + '</p></li>';
  }
  param166 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param166}));
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
  var lineList187 = opt_data.lines;
  var lineListLen187 = lineList187.length;
  for (var lineIndex187 = 0; lineIndex187 < lineListLen187; lineIndex187++) {
    var lineData187 = lineList187[lineIndex187];
    output += '<span>' + lineData187 + '</span>';
  }
  output += '</p>';
  return output;
};
