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
  var output = '<div id="book"><div class="shade"></div><div class="main"><nav><button class="tab" data-id="glossary">glossary</button><button class="tab" data-id="tips">tips</button><button class="tab" data-id="about">about</button></nav>' + feng.templates.common.CloseButton(null) + '<div class="pages"><section class="glossary" data-id="glossary"><div class="shade"></div><div class="wrapper"><div class="scroller"><div class="inner">';
  var keyList6 = soy.$$getMapKeys(opt_data.glossary);
  var keyListLen6 = keyList6.length;
  for (var keyIndex6 = 0; keyIndex6 < keyListLen6; keyIndex6++) {
    var keyData6 = keyList6[keyIndex6];
    switch (keyIndex6 % 3) {
      case 0:
        output += feng.templates.book.GlossaryArticle({id: keyData6, glossary: opt_data.glossary[keyData6], color: 'red'});
        break;
      case 1:
        output += feng.templates.book.GlossaryArticle({id: keyData6, glossary: opt_data.glossary[keyData6], color: 'yellow'});
        break;
      case 2:
        output += feng.templates.book.GlossaryArticle({id: keyData6, glossary: opt_data.glossary[keyData6], color: 'black'});
        break;
    }
  }
  output += '</div></div><div class="scrubber"><div class="handle"></div></div></div></section><section class="tips" data-id="tips"><div class="shade"></div><div class="wrapper"><div class="line"></div><div class="scroller"><div class="inner"><ul>';
  var tipList25 = opt_data.tips;
  var tipListLen25 = tipList25.length;
  for (var tipIndex25 = 0; tipIndex25 < tipListLen25; tipIndex25++) {
    var tipData25 = tipList25[tipIndex25];
    output += '<li class="tip ' + ((tipData25.unlocked == true) ? 'unlocked' : 'locked') + '" data-tip-id="' + tipData25.id + '"><figure><canvas></canvas><figcaption><h1>' + tipData25.name + '<div class="share"><div class="icon"></div><ul class="slider"><li><a href="#" class="facebook"></a></li><li><a href="#" class="twitter"></a></li><li><a href="#" class="google"></a></li></ul></div></h1><p>' + tipData25.description + '</p></figcaption></figure></li>';
  }
  output += '</ul></div></div><div class="scrubber"><div class="handle"></div></div></div></section><section class="about" data-id="about"><div class="shade"></div><div class="wrapper"><div class="scroller"><div class="inner"><article class="aboutfengshui"><h1>about <br> fengshui</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></article><article class="aboutproject"><h1>the making of <br> fengshui realtime</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><ul><li><a href="http://www.blender.org/" target="_blank">Blender</a><p>3D modeling & texturing</p></li><li><a href="http://bohemiancoding.com/sketch/" target="_blank">Sketch App</a><p>UX & Graphic Design</p></li><li><a href="http://www.codeandweb.com/texturepacker" target="_blank">TexturePacker</a><p>easy spritesheet generation</p></li><li><a href="http://compass-style.org/" target="_blank">Compass & SASS</a><p>CSS authoring framework</p></li><li><a href="https://developers.google.com/closure/" target="_blank">Closure Tools</a><p>JavaScript development / HTML templates</p></li><li><a href="http://threejs.org/" target="_blank">Three.JS</a><p>library for programming 3D in browser</p></li><li><a href="http://www.greensock.com/gsap-js/" target="_blank">GSAP</a><p>JavaScript animation engine</p></li><li><a href="https://github.com/goldfire/howler.js" target="_blank">Howler.JS</a><p>Modern web audio JavaScript library</p></li></ul></article><article class="credits"><h1>credits</h1><ul><li><h1>Yue Fan (Grace)</h1><p>UX & Graphic Design / Web Development</p><a href="http://www.graceux.com" target="_blank">GraceUX.com</a></li><li><h1>Joe Zhou</h1><p>Web Development</p><a href="http://www.joeonmars.com" target="_blank">joeonmars.com</a></li><li><h1>Hsin-Lei Chen</h1><p>Sound Design</p><a href="http://www.hsinlei.com" target="_blank">HsinLei.com</a></li><li><h1>Marla Schweppe</h1><p>Chief Advisor, Thesis Committee</p><a href="http://cias.rit.edu/faculty-staff/145" target="_blank">Rochester Institute of Technology</a></li><li><h1>Chris Jackson</h1><p>Thesis Committee</p><a href="http://cias.rit.edu/faculty-staff/148" target="_blank">Rochester Institute of Technology</a></li><li><h1>Shaun Foster</h1><p>Thesis Committee</p><a href="http://cias.rit.edu/faculty-staff/146" target="_blank">Rochester Institute of Technology</a></li></ul></article></div></div><div class="scrubber"><div class="handle"></div></div></div></section></div></div></div>';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.book.GlossaryArticle = function(opt_data, opt_ignored) {
  return '<article class="' + opt_data.id + ' ' + opt_data.color + '"><h1>' + opt_data.glossary.name.en + '</h1><h2>' + opt_data.glossary.name.zh + '</h2><figure><canvas data-id="' + opt_data.id + '" data-color="' + opt_data.color + '"></canvas></figure><p>' + opt_data.glossary.meanings + '</p></article>';
};
