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
  return '<div class="caption ' + opt_data.position + '"><div class="shade"></div><div class="panel"><div class="panel-button"><button class="icon"></button><h3>Learn<br>More</h3></div><div class="panel-controls"><div class="share"><ul><li><a href="https://www.facebook.com/sharer/sharer.php?u=http://fengshuirealtime.com/assets/html/share/' + opt_data.tip.id + '.html" target="_blank" class="icon icon-facebook"></a></li><li><a href="https://twitter.com/intent/tweet?original_referer=http://fengshuirealtime.com/assets/html/share/' + opt_data.tip.id + '.html" target="_blank" class="icon icon-twitter"></a></li><li><a href="https://plus.google.com/share?url=http://fengshuirealtime.com/assets/html/share/' + opt_data.tip.id + '.html" target="_blank" class="icon icon-google"></a></li></ul></div></div><div class="panel-content"><div class="content"><h1>' + opt_data.tip.name + '</h1><div class="scroller"><div class="scroller-inner">' + ((opt_data.tip.hint) ? '<section class="hint"><div class="inner"><p>' + opt_data.tip.hint + '</p>' + feng.templates.common.PrimaryButton({icon: 'icon-yes', classname: 'hint-button', text: 'I see'}) + '</div></section>' : '') + ((opt_data.tip.problem) ? '<section class="problem"><div class="inner"><p>' + opt_data.tip.problem + '</p><!-- either close to interact, or scroll down to go interaction section if available -->' + feng.templates.common.PrimaryButton({classname: 'prompt-button', icon: 'icon-yes', text: opt_data.tip.prompt}) + '</div></section>' : '') + ((opt_data.interactionContent) ? '<section class="interaction"><div class="inner">' + opt_data.interactionContent + '</div></section>' : '') + ((opt_data.tip.advice) ? '<section class="advice"><div class="inner"><h2>Tips</h2><p>' + opt_data.tip.advice + '</p></div></section>' : '') + '</div></div></div></div></div>' + feng.templates.common.CloseButton(null) + '</div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangePictureCaption = function(opt_data, opt_ignored) {
  var param92 = '<div class="change-picture"><h2>Click on a picture to change</h2><ul class="pictures">';
  var pictureKeyList94 = soy.$$getMapKeys(opt_data.tip.details['pictures']);
  var pictureKeyListLen94 = pictureKeyList94.length;
  for (var pictureKeyIndex94 = 0; pictureKeyIndex94 < pictureKeyListLen94; pictureKeyIndex94++) {
    var pictureKeyData94 = pictureKeyList94[pictureKeyIndex94];
    param92 += '<li><button class="item-button" data-picture="' + pictureKeyData94 + '"></button></li>';
  }
  param92 += '</ul><ul class="info">';
  var pictureKeyList100 = soy.$$getMapKeys(opt_data.tip.details['pictures']);
  var pictureKeyListLen100 = pictureKeyList100.length;
  for (var pictureKeyIndex100 = 0; pictureKeyIndex100 < pictureKeyListLen100; pictureKeyIndex100++) {
    var pictureKeyData100 = pictureKeyList100[pictureKeyIndex100];
    param92 += '<li data-picture="' + pictureKeyData100 + '"><h3>' + opt_data.tip.details['pictures'][pictureKeyData100]['name'] + '</h3><p>' + opt_data.tip.details['pictures'][pictureKeyData100]['description'] + '</p></li>';
  }
  param92 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param92}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeColorCaption = function(opt_data, opt_ignored) {
  var param112 = '<div class="change-color"><h2>Choose a better color.</h2><ul class="colors">';
  var colorKeyList114 = soy.$$getMapKeys(opt_data.tip.details['colors']);
  var colorKeyListLen114 = colorKeyList114.length;
  for (var colorKeyIndex114 = 0; colorKeyIndex114 < colorKeyListLen114; colorKeyIndex114++) {
    var colorKeyData114 = colorKeyList114[colorKeyIndex114];
    param112 += '<li><button class="item-button" style="background-color: ' + opt_data.tip.details['colors'][colorKeyData114]['hex'] + '" data-color="' + colorKeyData114 + '"></button></li>';
  }
  param112 += '</ul><ul class="info">';
  var colorKeyList122 = soy.$$getMapKeys(opt_data.tip.details['colors']);
  var colorKeyListLen122 = colorKeyList122.length;
  for (var colorKeyIndex122 = 0; colorKeyIndex122 < colorKeyListLen122; colorKeyIndex122++) {
    var colorKeyData122 = colorKeyList122[colorKeyIndex122];
    param112 += '<li data-color="' + colorKeyData122 + '"><h3>' + opt_data.tip.details['colors'][colorKeyData122]['name'] + '</h3><p>' + opt_data.tip.details['colors'][colorKeyData122]['description'] + '</p></li>';
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
feng.templates.captions.ChangeObjectCaption = function(opt_data, opt_ignored) {
  var param134 = '<div class="change-object"><h2>Replace with a new element.</h2><ul class="objects">';
  var objectKeyList136 = soy.$$getMapKeys(opt_data.tip.details['names']);
  var objectKeyListLen136 = objectKeyList136.length;
  for (var objectKeyIndex136 = 0; objectKeyIndex136 < objectKeyListLen136; objectKeyIndex136++) {
    var objectKeyData136 = objectKeyList136[objectKeyIndex136];
    param134 += '<li><button class="item-button" data-object="' + objectKeyData136 + '"></button></li>';
  }
  param134 += '</ul><ul class="info">';
  var objectKeyList142 = soy.$$getMapKeys(opt_data.tip.details['descriptions']);
  var objectKeyListLen142 = objectKeyList142.length;
  for (var objectKeyIndex142 = 0; objectKeyIndex142 < objectKeyListLen142; objectKeyIndex142++) {
    var objectKeyData142 = objectKeyList142[objectKeyIndex142];
    param134 += '<li data-object="' + objectKeyData142 + '"><h3>' + opt_data.tip.details['names'][objectKeyData142] + '</h3><p>' + opt_data.tip.details['descriptions'][objectKeyData142] + '</p></li>';
  }
  param134 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param134}));
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.DropFruitsCaption = function(opt_data, opt_ignored) {
  var param154 = '<h2>Fill the plate with fruits</h2><div class="drop-fruits"><ul class="fruits">';
  var fruitKeyList156 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen156 = fruitKeyList156.length;
  for (var fruitKeyIndex156 = 0; fruitKeyIndex156 < fruitKeyListLen156; fruitKeyIndex156++) {
    var fruitKeyData156 = fruitKeyList156[fruitKeyIndex156];
    param154 += '<li><button data-fruit-id="' + fruitKeyData156 + '"></button></li>';
  }
  param154 += '</ul><ul class="descriptions">';
  var fruitKeyList162 = soy.$$getMapKeys(opt_data.fruits);
  var fruitKeyListLen162 = fruitKeyList162.length;
  for (var fruitKeyIndex162 = 0; fruitKeyIndex162 < fruitKeyListLen162; fruitKeyIndex162++) {
    var fruitKeyData162 = fruitKeyList162[fruitKeyIndex162];
    param154 += '<li data-fruit-id="' + fruitKeyData162 + '"><p>' + opt_data.fruits[fruitKeyData162] + '</p></li>';
  }
  param154 += '</ul></div>';
  var output = feng.templates.captions.Caption(soy.$$augmentMap(opt_data, {interactionContent: param154}));
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
  var lineList173 = opt_data.lines;
  var lineListLen173 = lineList173.length;
  for (var lineIndex173 = 0; lineIndex173 < lineListLen173; lineIndex173++) {
    var lineData173 = lineList173[lineIndex173];
    output += '<span>' + lineData173 + '</span>';
  }
  output += '</p>';
  return output;
};
