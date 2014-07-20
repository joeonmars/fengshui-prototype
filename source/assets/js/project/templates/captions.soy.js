// This file was automatically generated from captions.soy.
// Please don't edit this file by hand.

goog.provide('feng.templates.captions');

goog.require('soy');
goog.require('soydata');
goog.require('feng.templates.controls');


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
  var param81 = '<div class="draggerContainer"><img class="dragger" draggable="false"></div><div class="right"><h1>Lorem Ipsum</h1><h2>LOREM IPSUM</h2></div><div class="bottom"><div class="pictureSelector">' + feng.templates.controls.RoundButton({content: '<div class="icon"></div>', classname: 'prev'}) + '<div class="pictureView"><div class="carousel"><ul>';
  var pictureList88 = opt_data.pictures;
  var pictureListLen88 = pictureList88.length;
  for (var pictureIndex88 = 0; pictureIndex88 < pictureListLen88; pictureIndex88++) {
    var pictureData88 = pictureList88[pictureIndex88];
    param81 += '<li><div class="thumbnail" style="background-image: url(' + pictureData88.src + ')" data-id="' + pictureIndex88 + '"></li>';
  }
  param81 += '</ul></div></div>' + feng.templates.controls.RoundButton({content: '<div class="icon"></div>', classname: 'next'}) + '</div></div>';
  var output = feng.templates.captions.Caption({classname: 'changepicture', content: param81});
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
  var lineList104 = opt_data.lines;
  var lineListLen104 = lineList104.length;
  for (var lineIndex104 = 0; lineIndex104 < lineListLen104; lineIndex104++) {
    var lineData104 = lineList104[lineIndex104];
    output += '<span>' + lineData104 + '</span>';
  }
  output += '</p>';
  return output;
};
