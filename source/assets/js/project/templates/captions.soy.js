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
  var pictureKeyList92 = soy.$$getMapKeys(opt_data.tip.details['pictures']);
  var pictureKeyListLen92 = pictureKeyList92.length;
  for (var pictureKeyIndex92 = 0; pictureKeyIndex92 < pictureKeyListLen92; pictureKeyIndex92++) {
    var pictureKeyData92 = pictureKeyList92[pictureKeyIndex92];
    param90 += '<li><button class="item-button" data-picture="' + pictureKeyData92 + '"></button></li>';
  }
  param90 += '</ul><ul class="info">';
  var pictureKeyList98 = soy.$$getMapKeys(opt_data.tip.details['pictures']);
  var pictureKeyListLen98 = pictureKeyList98.length;
  for (var pictureKeyIndex98 = 0; pictureKeyIndex98 < pictureKeyListLen98; pictureKeyIndex98++) {
    var pictureKeyData98 = pictureKeyList98[pictureKeyIndex98];
    param90 += '<li data-picture="' + pictureKeyData98 + '"><h3>' + opt_data.tip.details['pictures'][pictureKeyData98]['name'] + '</h3><p>' + opt_data.tip.details['pictures'][pictureKeyData98]['description'] + '</p></li>';
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
  var param110 = '<div class="change-color"><h2>Choose a better color.</h2><ul class="colors">';
  var colorKeyList112 = soy.$$getMapKeys(opt_data.tip.details['colors']);
  var colorKeyListLen112 = colorKeyList112.length;
  for (var colorKeyIndex112 = 0; colorKeyIndex112 < colorKeyListLen112; colorKeyIndex112++) {
    var colorKeyData112 = colorKeyList112[colorKeyIndex112];
    param110 += '<li><button class="item-button" style="background-color: ' + opt_data.tip.details['colors'][colorKeyData112]['hex'] + '" data-color="' + colorKeyData112 + '"></button></li>';
  }
  param110 += '</ul><ul class="info">';
  var colorKeyList120 = soy.$$getMapKeys(opt_data.tip.details['colors']);
  var colorKeyListLen120 = colorKeyList120.length;
  for (var colorKeyIndex120 = 0; colorKeyIndex120 < colorKeyListLen120; colorKeyIndex120++) {
    var colorKeyData120 = colorKeyList120[colorKeyIndex120];
    param110 += '<li data-color="' + colorKeyData120 + '"><h3>' + opt_data.tip.details['colors'][colorKeyData120]['name'] + '</h3><p>' + opt_data.tip.details['colors'][colorKeyData120]['description'] + '</p></li>';
  }
  param110 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param110}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeObjectCaption = function(opt_data, opt_ignored) {
  var param132 = '<div class="change-object"><h2>Replace with a new element.</h2><ul class="objects">';
  var objectKeyList134 = soy.$$getMapKeys(opt_data.tip.details['names']);
  var objectKeyListLen134 = objectKeyList134.length;
  for (var objectKeyIndex134 = 0; objectKeyIndex134 < objectKeyListLen134; objectKeyIndex134++) {
    var objectKeyData134 = objectKeyList134[objectKeyIndex134];
    param132 += '<li><button class="item-button" data-object="' + objectKeyData134 + '"></button></li>';
  }
  param132 += '</ul><ul class="info">';
  var objectKeyList140 = soy.$$getMapKeys(opt_data.tip.details['descriptions']);
  var objectKeyListLen140 = objectKeyList140.length;
  for (var objectKeyIndex140 = 0; objectKeyIndex140 < objectKeyListLen140; objectKeyIndex140++) {
    var objectKeyData140 = objectKeyList140[objectKeyIndex140];
    param132 += '<li data-object="' + objectKeyData140 + '"><h3>' + opt_data.tip.details['names'][objectKeyData140] + '</h3><p>' + opt_data.tip.details['descriptions'][objectKeyData140] + '</p></li>';
  }
  param132 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param132}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.DropFruitsCaption = function(opt_data, opt_ignored) {
  var param152 = '<h2>Fill the plate with fruits</h2><div class="drop-fruits"><ul class="fruits">';
  var fruitKeyList154 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen154 = fruitKeyList154.length;
  for (var fruitKeyIndex154 = 0; fruitKeyIndex154 < fruitKeyListLen154; fruitKeyIndex154++) {
    var fruitKeyData154 = fruitKeyList154[fruitKeyIndex154];
    param152 += '<li><button data-fruit-id="' + fruitKeyData154 + '"></button></li>';
  }
  param152 += '</ul><ul class="descriptions">';
  var fruitKeyList160 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen160 = fruitKeyList160.length;
  for (var fruitKeyIndex160 = 0; fruitKeyIndex160 < fruitKeyListLen160; fruitKeyIndex160++) {
    var fruitKeyData160 = fruitKeyList160[fruitKeyIndex160];
    param152 += '<li data-fruit-id="' + fruitKeyData160 + '"><p>' + opt_data.fruits[fruitKeyData160] + '</p></li>';
  }
  param152 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param152}));
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
  var lineList171 = opt_data.lines;
  var lineListLen171 = lineList171.length;
  for (var lineIndex171 = 0; lineIndex171 < lineListLen171; lineIndex171++) {
    var lineData171 = lineList171[lineIndex171];
    output += '<span>' + lineData171 + '</span>';
  }
  output += '</p>';
  return output;
};
