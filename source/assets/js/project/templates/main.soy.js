// This file was automatically generated from main.soy.
// Please don't edit this file by hand.

goog.provide('feng.templates.main');

goog.require('soy');
goog.require('soydata');
goog.require('feng.templates.common');
goog.require('feng.templates.controls');
goog.require('feng.templates.debug');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.main.EpisodeSection = function(opt_data, opt_ignored) {
  var output = '<div class="section episode" id="' + opt_data.id + '"><div class="hud"><div class="overlays"><div class="tutorial-overlay"></div><div class="opening-overlay">' + feng.templates.common.Popup({classname: 'opening', content: '<h1></h1><div class="line"></div><p></p>' + feng.templates.common.PrimaryButton({classname: 'ok', icon: 'yes', text: 'got it'}) + '<div class="character"></div>'}) + '</div><div class="ending-overlay">' + feng.templates.common.Popup({classname: 'ending', content: '<h1></h1><div class="line"></div><p></p>' + feng.templates.common.PrimaryButton({classname: 'continue', icon: 'yes', text: 'continue investigating'}) + feng.templates.common.PrimaryButton({classname: 'visit', icon: 'yes', text: 'visit another residence'}) + '<div class="character"></div>'}) + '</div><div class="finale-overlay">' + feng.templates.common.Popup({classname: 'finale', content: '<h1></h1><div class="line"></div><p></p>' + feng.templates.common.PrimaryButton({classname: 'ok', icon: 'yes', text: 'done'})}) + '</div></div><div class="controls">' + feng.templates.controls.Compass(null) + feng.templates.controls.Book(null) + feng.templates.controls.Reminder(opt_data) + feng.templates.controls.ObjectSelector(null) + feng.templates.controls.Manipulator(null) + feng.templates.controls.DropButton(null) + feng.templates.controls.ProgressBar(opt_data) + '</div><div class="tooltips">';
  var tipList501 = opt_data.tips;
  var tipListLen501 = tipList501.length;
  for (var tipIndex501 = 0; tipIndex501 < tipListLen501; tipIndex501++) {
    var tipData501 = tipList501[tipIndex501];
    output += feng.templates.controls.Tooltip({tip: tipData501});
  }
  output += '</div><div class="captions"></div></div><div class="sceneContainer"></div></div>';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.main.EpisodeSelection = function(opt_data, opt_ignored) {
  return '<div class="episode-selection"><div class="scene studio"><div class="background"></div><div class="shade"></div><div class="overlay"><div class="prompt">' + feng.templates.common.Disc({content: '<div class="location"><p>LOCATION</p><div class="line"></div></div><h1>Ollie\'s<br>Studio</h1><p>Ollie is a fashion designer.<br>She lives in a small studio in<br>the noisy downtown area.<br>Give her some Fengshui tips!</p>' + feng.templates.common.PrimaryButton({href: opt_data.token.STUDIO, icon: 'yes', text: 'start'})}) + '</div><div class="people"></div></div></div><div class="scene townhouse"><div class="background"></div><div class="shade"></div><div class="overlay"><div class="prompt">' + feng.templates.common.Disc({content: '<div class="location"><p>LOCATION</p><div class="line"></div></div><h1>Ollie\'s<br>Townhouse</h1><p>Ollie lives in a Townhouse,<br>She was married with<br>a preschool kid<br>both living at home.</p>' + feng.templates.common.PrimaryButton({href: opt_data.token.TOWNHOUSE, icon: 'yes', text: 'start'})}) + '</div><div class="people"></div></div></div><div class="prompt">' + feng.templates.common.Disc({content: feng.templates.common.FengshuiLogo({noText: true}) + '<h1><a href="#glossary/about">FENGSHUI</a> HELP<br>NEEDED!</h1><h2><div class="arrow left"></div>CHOOSE ONE<div class="arrow right"></div></h2>'}) + feng.templates.common.FengshuiLogo({noText: true}) + '</div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.main.Main = function(opt_data, opt_ignored) {
  return '<div id="main"><div class="section" id="home"><div class="inner"><section id="main-preloader">' + feng.templates.common.Disc({content: feng.templates.common.FengshuiLogo(null) + '<div class="bar"><div class="fill"></div></div><p class="counter">00</p>'}) + '</section><section id="main-intro">' + feng.templates.common.PrimaryButton({icon: 'yes', text: 'continue'}) + '</section><section id="main-episode-selection"></section></div></div><div class="section" id="outro"></div><div id="episode-selection-overlay"></div><button id="episode-button"></button><ul id="main-options"><li><button class="howtoplay"></button></li><li><button class="sound"></button></li><li class="share"><button></button><div class="slider"><div class="buttons"><a class="facebook"></a><a class="twitter"></a><a class="google"></a></div></div></li></ul></div>' + ((opt_data.debug != false) ? feng.templates.debug.Debugger(null) : '');
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.main.Spline = function(opt_data, opt_ignored) {
  return '<div id="spline">' + feng.templates.debug.Debugger(null) + '<canvas></canvas></div>';
};
