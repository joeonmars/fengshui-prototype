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
  var output = '<div id="book"><div class="shade"></div><div class="main"><nav><button class="close"></button><button class="glossary"></button><button class="tips"></button><button class="help"></button><button class="about"></button></nav><div class="pages"><section class="glossary">';
  var keyList4 = soy.$$getMapKeys(opt_data.glossary);
  var keyListLen4 = keyList4.length;
  for (var keyIndex4 = 0; keyIndex4 < keyListLen4; keyIndex4++) {
    var keyData4 = keyList4[keyIndex4];
    output += '<article class="' + keyData4 + '"><h1>$glossary[$key].name.en<h1><h2>$glossary[$key].name.zh<h2><figure><canvas></canvas></figure><p>$glossary[$key].meanings<p></article>';
  }
  output += '</section><section class="tips">';
  var tipList10 = opt_data.tips;
  var tipListLen10 = tipList10.length;
  for (var tipIndex10 = 0; tipIndex10 < tipListLen10; tipIndex10++) {
    var tipData10 = tipList10[tipIndex10];
    output += '<ul><li class="' + ((tipData10.unlocked == true) ? 'unlocked' : '') + '" data-tip-id="' + tipData10.id + '"><figure><img src="' + tipData10.image.src + '" alt="' + tipData10.name + '"><figcaption><h1>' + tipData10.name + '</h1><p>' + tipData10.advice + '</p></figcaption></figure></li></ul>';
  }
  output += '<div class="scrubber"><div class="handle"></div><canvas></canvas></div></section><section class="help"></section><section class="about"><article class="aboutfengshui"><h1>about fengshui</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></article><article class="aboutproject"><h1>about fengshui-realtime</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></article><article class="credits"><h1>credits</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><ul><li><h1>UX & Visual Design<h1><p><a href="_blank">Yue Fan</a></p></li><li><h1>Web Development<h1><p><a href="_blank">Joe Zhou</a><a href="_blank">Yue Fan</a></p></li><li><h1>Special Thanks<h1><p><a href="_blank">Marla Schweppe<span>Her contributions...</span></a><a href="_blank">Chris Jackson<span>His contributions...</span></a><a href="_blank">Shaun Foster<span>His contributions...</span></a></p></li></ul></article></section></div></div></div>';
  return output;
};
