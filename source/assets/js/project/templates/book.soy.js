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
  var output = '<div id="book">' + feng.templates.common.CloseButton(null) + '<h2>Feng Shui Tips Collected <span class="tip-counter"></span></h2><div class="scroller-wrapper"><div class="scroller"><div class="inner"><ul>';
  var tipList6 = opt_data.tips;
  var tipListLen6 = tipList6.length;
  for (var tipIndex6 = 0; tipIndex6 < tipListLen6; tipIndex6++) {
    var tipData6 = tipList6[tipIndex6];
    output += '<li class="tip-module" data-tip-id="' + tipData6.id + '"><div class="card"><div class="curtain"><div class="wrapper"><div class="icon icon-' + tipData6.icon + '"></div><h1>' + tipData6.name + '</h1><h2><span>Found in</span> ' + tipData6.character + '\'s ' + tipData6.sectionId + '</h2></div></div><div class="detail"><div class="screen" data-src="' + tipData6.shareImageUrl + '"><div class="loader"></div></div><div class="advice"><h3>' + tipData6.name + '</h3><div class="scroller"><div class="content"><p>' + ((tipData6.problem) ? tipData6.problem + '<br>' : '') + ((tipData6.advice) ? tipData6.advice + '<br>' : '');
    if (tipData6.details['descriptions']) {
      var keyList32 = soy.$$getMapKeys(tipData6.details['descriptions']);
      var keyListLen32 = keyList32.length;
      for (var keyIndex32 = 0; keyIndex32 < keyListLen32; keyIndex32++) {
        var keyData32 = keyList32[keyIndex32];
        output += tipData6.details['descriptions'][keyData32] + '</br>';
      }
    }
    output += '</p></div>' + feng.templates.common.ScrollBar(null) + '</div><ul class="share"><li><a href="https://www.facebook.com/sharer/sharer.php?u=http://fengshuirealtime.com/assets/html/share/' + tipData6.id + '.html" target="_blank" class="icon icon-facebook"></a></li><li><a href="https://twitter.com/intent/tweet?original_referer=http://fengshuirealtime.com/assets/html/share/' + tipData6.id + '.html" target="_blank" class="icon icon-twitter"></a></li><li><a href="https://plus.google.com/share?url=http://fengshuirealtime.com/assets/html/share/' + tipData6.id + '.html" target="_blank" class="icon icon-google"></a></li></ul></div></div></div></li>';
  }
  output += '</ul></div></div></div><div class="scrubber"><div class="handle"></div></div></div>';
  return output;
};
