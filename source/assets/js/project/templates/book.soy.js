// This file was automatically generated from book.soy.
// Please don't edit this file by hand.

goog.provide('feng.templates.book');

goog.require('soy');
goog.require('soydata');
goog.require('feng.templates.common');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.book.Book = function(opt_data, opt_ignored) {
  var output = '<div id="book">' + feng.templates.common.CloseButton(null) + '<div class="scroller-wrapper"><div class="scroller"><div class="inner"><ul>';
  var tipList6 = opt_data.tips;
  var tipListLen6 = tipList6.length;
  for (var tipIndex6 = 0; tipIndex6 < tipListLen6; tipIndex6++) {
    var tipData6 = tipList6[tipIndex6];
    output += '<li class="tip-module" data-tip-id="' + tipData6.id + '"><figure class="cover"><div class="icon icon-' + tipData6.id + '"></div><ul class="share"><li><a href="#" class="icon icon-facebook"></a></li><li><a href="#" class="icon icon-twitter"></a></li><li><a href="#" class="icon icon-google"></a></li></ul><figcaption>' + tipData6.name + '</figcaption><button>View</button></figure><div class="details"><div class="wrapper"><article><h1>' + tipData6.name + '</h1><p>' + tipData6.description + '</p></article></div></div></li>';
  }
  output += '</ul></div></div></div><div class="scrubber"><div class="handle"></div></div></div>';
  return output;
};
