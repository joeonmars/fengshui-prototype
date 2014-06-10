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
  return ((opt_data.type == 'select_color') ? '<div class="left"></div><div class="right"></div>' : '') + ((opt_data.type == 'change_object') ? '<div class="top"></div><div class="right"></div>' : '') + ((opt_data.type == 'advice') ? '<div class="right"></div>' : '');
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.PictureSelector = function(opt_data, opt_ignored) {
  var output = '<div class="pictureSelector"><div class="pictureView"><ul>';
  var pictureList14 = opt_data.pictures;
  var pictureListLen14 = pictureList14.length;
  for (var pictureIndex14 = 0; pictureIndex14 < pictureListLen14; pictureIndex14++) {
    var pictureData14 = pictureList14[pictureIndex14];
    output += '<li><img src="' + pictureData14.src + '" alt="' + pictureData14.description + '" draggable="false" data-id="' + pictureIndex14 + '"></li>';
  }
  output += '</ul></div><aside><div class="prev button"></div><div class="next button"></div></aside></div>';
  return output;
};
