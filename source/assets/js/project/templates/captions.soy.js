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
  return '<div class="captionView ' + opt_data.classname + '"><div class="close button"></div><div class="confirm button"></div>' + opt_data.content + '</div>';
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
feng.templates.captions.ChangeColorCaption = function(opt_data, opt_ignored) {
  return feng.templates.captions.Caption({classname: 'changecolor', content: '<div class="left"></div><div class="right"></div>'});
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
  var param31 = '<div class="draggerContainer"><img class="dragger" draggable="false"></div><div class="top"><h1>Lorem Ipsum</h1><h2>LOREM IPSUM</h2></div><div class="right"><div class="pictureSelector"><div class="pictureView"><ul>';
  var pictureList33 = opt_data.pictures;
  var pictureListLen33 = pictureList33.length;
  for (var pictureIndex33 = 0; pictureIndex33 < pictureListLen33; pictureIndex33++) {
    var pictureData33 = pictureList33[pictureIndex33];
    param31 += '<li><img src="' + pictureData33.src + '" alt="' + pictureData33.description + '" draggable="false" data-id="' + pictureIndex33 + '"></li>';
  }
  param31 += '</ul></div><aside><div class="prev button"></div><div class="next button"></div></aside></div></div>';
  var output = feng.templates.captions.Caption({classname: 'changepicture', content: param31});
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
  var lineList46 = opt_data.lines;
  var lineListLen46 = lineList46.length;
  for (var lineIndex46 = 0; lineIndex46 < lineListLen46; lineIndex46++) {
    var lineData46 = lineList46[lineIndex46];
    output += '<span>' + lineData46 + '</span>';
  }
  output += '</p>';
  return output;
};
