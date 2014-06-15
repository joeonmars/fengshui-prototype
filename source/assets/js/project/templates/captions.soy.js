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
  var param25 = '<div class="draggerContainer"><img class="dragger" draggable="false"></div><div class="top"><h1>Lorem Ipsum</h1><h2>LOREM IPSUM</h2></div><div class="right"><div class="pictureSelector"><div class="pictureView"><ul>';
  var pictureList27 = opt_data.pictures;
  var pictureListLen27 = pictureList27.length;
  for (var pictureIndex27 = 0; pictureIndex27 < pictureListLen27; pictureIndex27++) {
    var pictureData27 = pictureList27[pictureIndex27];
    param25 += '<li><img src="' + pictureData27.src + '" alt="' + pictureData27.description + '" draggable="false" data-id="' + pictureIndex27 + '"></li>';
  }
  param25 += '</ul></div><aside><div class="prev button"></div><div class="next button"></div></aside></div></div>';
  var output = feng.templates.captions.Caption({classname: 'changepicture', content: param25});
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
  var lineList40 = opt_data.lines;
  var lineListLen40 = lineList40.length;
  for (var lineIndex40 = 0; lineIndex40 < lineListLen40; lineIndex40++) {
    var lineData40 = lineList40[lineIndex40];
    output += '<span>' + lineData40 + '</span>';
  }
  output += '</p>';
  return output;
};
