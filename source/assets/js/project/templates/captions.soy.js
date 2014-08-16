// This file was automatically generated from captions.soy.
// Please don't edit this file by hand.

goog.provide('feng.templates.captions');

goog.require('soy');
goog.require('soydata');
goog.require('feng.templates.common');
goog.require('feng.templates.controls');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.Caption = function(opt_data, opt_ignored) {
  return '<div class="captionView ' + opt_data.classname + '">' + opt_data.content + '</div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.AdviceCaption = function(opt_data, opt_ignored) {
  return feng.templates.captions.Caption({classname: 'advice', content: '<div class="right"></div>'});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeObjectCaption = function(opt_data, opt_ignored) {
  return feng.templates.captions.Caption({classname: 'changeobject', content: '<div class="top"></div><div class="right"></div>'});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangePictureCaption = function(opt_data, opt_ignored) {
  var param76 = '<div class="draggerContainer"><img class="dragger" draggable="false"></div><div class="right">' + feng.templates.common.Popup({content: '<h1>' + opt_data.tip.name + '</h1><h2>' + opt_data.tip.advice + '</h2><q>"' + opt_data.tip.quote + '"</q><p>' + opt_data.tip.description + '</p>' + feng.templates.common.PrimaryButton({icon: 'change', classname: 'change', text: 'change'})}) + '</div><div class="bottom"><div class="pictureSelector">' + feng.templates.controls.RoundButton({content: '<div class="icon"></div>', classname: 'prev'}) + '<div class="pictureView"><div class="carousel"><ul>';
  var pictureList99 = opt_data.pictures;
  var pictureListLen99 = pictureList99.length;
  for (var pictureIndex99 = 0; pictureIndex99 < pictureListLen99; pictureIndex99++) {
    var pictureData99 = pictureList99[pictureIndex99];
    param76 += '<li data-id="' + pictureIndex99 + '"><div class="thumbnail" style="background-image: url(' + pictureData99.src + ')" data-id="' + pictureIndex99 + '"></li>';
  }
  param76 += '</ul></div></div>' + feng.templates.controls.RoundButton({content: '<div class="icon"></div>', classname: 'next'}) + '</div></div>';
  var output = feng.templates.captions.Caption({classname: 'changepicture', content: param76});
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeColorCaption = function(opt_data, opt_ignored) {
  var param117 = '<div class="right">' + feng.templates.common.Popup({content: '<h1>' + opt_data.tip.name + '</h1><h2>' + opt_data.tip.advice + '</h2><q>"' + opt_data.tip.quote + '"</q><p>' + opt_data.tip.description + '</p>' + feng.templates.common.PrimaryButton({icon: 'change', classname: 'change', text: 'change'})}) + '</div><div class="bottom"><div class="colorSelector"><div class="colorView"><div class="carousel"><ul>';
  var colorKeyList135 = soy.$$getMapKeys(opt_data.colors);
  var colorKeyListLen135 = colorKeyList135.length;
  for (var colorKeyIndex135 = 0; colorKeyIndex135 < colorKeyListLen135; colorKeyIndex135++) {
    var colorKeyData135 = colorKeyList135[colorKeyIndex135];
    param117 += '<li><div class="color" style="background-color: ' + opt_data.colors[colorKeyData135].hex + '" data-color="' + colorKeyData135 + '"></li>';
  }
  param117 += '</ul></div></div></div></div>';
  var output = feng.templates.captions.Caption({classname: 'changecolor', content: param117});
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
  var lineList146 = opt_data.lines;
  var lineListLen146 = lineList146.length;
  for (var lineIndex146 = 0; lineIndex146 < lineListLen146; lineIndex146++) {
    var lineData146 = lineList146[lineIndex146];
    output += '<span>' + lineData146 + '</span>';
  }
  output += '</p>';
  return output;
};
