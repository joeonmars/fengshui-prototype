// This file was automatically generated from book.soy.
// Please don't edit this file by hand.

goog.provide('feng.templates.book');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.book.Book = function(opt_data, opt_ignored) {
  var output = '<div id="book"><div class="shade"></div><div class="main"><nav><button class="close"></button><button class="glossary"></button><button class="tips"></button><button class="help"></button><button class="about"></button></nav><div class="pages"><section class="glossary"></section><section class="tips">';
  var tipList4 = opt_data.tips;
  var tipListLen4 = tipList4.length;
  for (var tipIndex4 = 0; tipIndex4 < tipListLen4; tipIndex4++) {
    var tipData4 = tipList4[tipIndex4];
  }
  output += '</section><section class="help"></section><section class="about"></section></div></div></div>';
  return output;
};
