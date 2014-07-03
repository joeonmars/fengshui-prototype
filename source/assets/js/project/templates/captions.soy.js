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
  var param56 = '<div class="draggerContainer"><img class="dragger" draggable="false"></div><div class="top"><h1>Lorem Ipsum</h1><h2>LOREM IPSUM</h2></div><div class="right"><div class="pictureSelector"><div class="pictureView"><ul>';
  var pictureList58 = opt_data.pictures;
  var pictureListLen58 = pictureList58.length;
  for (var pictureIndex58 = 0; pictureIndex58 < pictureListLen58; pictureIndex58++) {
    var pictureData58 = pictureList58[pictureIndex58];
    param56 += '<li><img src="' + pictureData58.src + '" alt="' + pictureData58.description + '" draggable="false" data-id="' + pictureIndex58 + '"></li>';
  }
  param56 += '</ul></div><aside><div class="prev button"></div><div class="next button"></div></aside></div></div>';
  var output = feng.templates.captions.Caption({classname: 'changepicture', content: param56});
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
  var lineList71 = opt_data.lines;
  var lineListLen71 = lineList71.length;
  for (var lineIndex71 = 0; lineIndex71 < lineListLen71; lineIndex71++) {
    var lineData71 = lineList71[lineIndex71];
    output += '<span>' + lineData71 + '</span>';
  }
  output += '</p>';
  return output;
};
