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
feng.templates.captions.Caption = function(opt_data, opt_ignored) {
  return ((opt_data.type == 'change_color') ? '<div class="left"></div><div class="right"></div>' : '') + ((opt_data.type == 'change_object') ? '<div class="top"></div><div class="right"></div>' : '') + ((opt_data.type == 'change_picture') ? '<div class="right"></div>' : '') + ((opt_data.type == 'advice') ? '<div class="right"></div>' : '');
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.PictureSelector = function(opt_data, opt_ignored) {
  var output = '<div class="pictureSelector"><div class="pictureView"><ul>';
  var pictureList17 = opt_data.pictures;
  var pictureListLen17 = pictureList17.length;
  for (var pictureIndex17 = 0; pictureIndex17 < pictureListLen17; pictureIndex17++) {
    var pictureData17 = pictureList17[pictureIndex17];
    output += '<li><img src="' + pictureData17.src + '" alt="' + pictureData17.description + '" draggable="false" data-id="' + pictureIndex17 + '"></li>';
  }
  output += '</ul></div><aside><div class="prev button"></div><div class="next button"></div></aside></div>';
  return output;
};
