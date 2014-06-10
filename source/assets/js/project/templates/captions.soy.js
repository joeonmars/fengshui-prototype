// This file was automatically generated from captions.soy.
// Please don't edit this file by hand.

goog.provide('feng.templates.captions');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.AdviceCaption = function(opt_data, opt_ignored) {
  return '<div class="right"></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeColorCaption = function(opt_data, opt_ignored) {
  return '<div class="left"></div><div class="right"></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangeObjectCaption = function(opt_data, opt_ignored) {
  return '<div class="top"></div><div class="right"></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.ChangePictureCaption = function(opt_data, opt_ignored) {
  var output = '<img class="dragger" draggable="false"><div class="right"><div class="pictureSelector"><div class="pictureView"><ul>';
  var pictureList10 = opt_data.pictures;
  var pictureListLen10 = pictureList10.length;
  for (var pictureIndex10 = 0; pictureIndex10 < pictureListLen10; pictureIndex10++) {
    var pictureData10 = pictureList10[pictureIndex10];
    output += '<li><img src="' + pictureData10.src + '" alt="' + pictureData10.description + '" draggable="false" data-id="' + pictureIndex10 + '"></li>';
  }
  output += '</ul></div><aside><div class="prev button"></div><div class="next button"></div></aside></div></div>';
  return output;
};
