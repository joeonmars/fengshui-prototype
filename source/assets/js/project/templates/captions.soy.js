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
  var param79 = '<div class="draggerContainer"><img class="dragger" draggable="false"></div><div class="top"><h1>Lorem Ipsum</h1><h2>LOREM IPSUM</h2></div><div class="right"><div class="pictureSelector"><div class="pictureView"><ul>';
  var pictureList81 = opt_data.pictures;
  var pictureListLen81 = pictureList81.length;
  for (var pictureIndex81 = 0; pictureIndex81 < pictureListLen81; pictureIndex81++) {
    var pictureData81 = pictureList81[pictureIndex81];
    param79 += '<li><img src="' + pictureData81.src + '" alt="' + pictureData81.description + '" draggable="false" data-id="' + pictureIndex81 + '"></li>';
  }
  param79 += '</ul></div><aside><div class="prev button"></div><div class="next button"></div></aside></div></div>';
  var output = feng.templates.captions.Caption({classname: 'changepicture', content: param79});
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
  var lineList94 = opt_data.lines;
  var lineListLen94 = lineList94.length;
  for (var lineIndex94 = 0; lineIndex94 < lineListLen94; lineIndex94++) {
    var lineData94 = lineList94[lineIndex94];
    output += '<span>' + lineData94 + '</span>';
  }
  output += '</p>';
  return output;
};
