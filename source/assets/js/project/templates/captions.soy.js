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
  var param58 = '<div class="draggerContainer"><img class="dragger" draggable="false"></div><div class="top"><h1>Lorem Ipsum</h1><h2>LOREM IPSUM</h2></div><div class="right"><div class="pictureSelector"><div class="pictureView"><ul>';
  var pictureList60 = opt_data.pictures;
  var pictureListLen60 = pictureList60.length;
  for (var pictureIndex60 = 0; pictureIndex60 < pictureListLen60; pictureIndex60++) {
    var pictureData60 = pictureList60[pictureIndex60];
    param58 += '<li><img src="' + pictureData60.src + '" alt="' + pictureData60.description + '" draggable="false" data-id="' + pictureIndex60 + '"></li>';
  }
  param58 += '</ul></div><aside><div class="prev button"></div><div class="next button"></div></aside></div></div>';
  var output = feng.templates.captions.Caption({classname: 'changepicture', content: param58});
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
  var lineList73 = opt_data.lines;
  var lineListLen73 = lineList73.length;
  for (var lineIndex73 = 0; lineIndex73 < lineListLen73; lineIndex73++) {
    var lineData73 = lineList73[lineIndex73];
    output += '<span>' + lineData73 + '</span>';
  }
  output += '</p>';
  return output;
};
