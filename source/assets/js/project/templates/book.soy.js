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
  var output = '<div id="book"><div class="shade"></div><div class="main"><nav><button class="close" data-id="close"></button><button class="tab" data-id="glossary">glossary</button><button class="tab" data-id="tips">tips</button><button class="tab" data-id="help">help</button><button class="tab" data-id="about">about</button></nav><div class="pages"><section class="glossary" data-id="glossary"><div class="shade"></div><div class="wrapper"><div class="scroller"><div class="inner">';
  var keyList4 = soy.$$getMapKeys(opt_data.glossary);
  var keyListLen4 = keyList4.length;
  for (var keyIndex4 = 0; keyIndex4 < keyListLen4; keyIndex4++) {
    var keyData4 = keyList4[keyIndex4];
    output += '<article class="' + keyData4 + '"><h1>' + opt_data.glossary[keyData4].name.en + '</h1><h2>' + opt_data.glossary[keyData4].name.zh + '</h2><figure><canvas></canvas></figure><p>' + opt_data.glossary[keyData4].meanings + '</p></article>';
  }
  output += '</div></div><div class="scrubber"><div class="handle"></div></div></div></section><section class="tips" data-id="tips"><div class="shade"></div><div class="wrapper"><div class="line"></div><div class="scroller"><div class="inner"><ul>';
  var tipList16 = opt_data.tips;
  var tipListLen16 = tipList16.length;
  for (var tipIndex16 = 0; tipIndex16 < tipListLen16; tipIndex16++) {
    var tipData16 = tipList16[tipIndex16];
    output += '<li class="tip ' + ((tipData16.unlocked == true) ? 'unlocked' : 'locked') + '" data-tip-id="' + tipData16.id + '"><figure><canvas></canvas><figcaption><h1>' + tipData16.name + '<div class="share"><div class="icon"></div><ul class="slider"><li><a href="#" class="facebook"></a></li><li><a href="#" class="twitter"></a></li><li><a href="#" class="google"></a></li></ul></div></h1><p>' + tipData16.advice + '</p></figcaption></figure></li>';
  }
  output += '</ul></div></div><div class="scrubber"><div class="handle"></div></div></div></section><section class="help" data-id="help"><div class="shade"></div><div class="wrapper"></div></section><section class="about" data-id="about"><div class="shade"></div><div class="wrapper"><div class="inner"><article class="aboutfengshui"><h1>about fengshui</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></article><article class="aboutproject"><h1>about fengshui-realtime</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></article><article class="credits"><h1>credits</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><ul><li><h1>UX & Visual Design<h1><p><a href="_blank">Yue Fan</a></p></li><li><h1>Web Development<h1><p><a href="_blank">Joe Zhou</a><a href="_blank">Yue Fan</a></p></li><li><h1>Special Thanks<h1><p><a href="_blank">Marla Schweppe</a><span>Her contributions...</span><a href="_blank">Chris Jackson</a><span>His contributions...</span><a href="_blank">Shaun Foster</a><span>His contributions...</span></p></li></ul></article></div></div></section></div></div></div>';
  return output;
};
