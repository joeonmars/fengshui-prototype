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
  return '<div class="section episode" id="' + opt_data.id + '"><div class="preloader"></div><div class="hud"><div class="controls">' + feng.templates.controls.Compass(null) + feng.templates.controls.Book(null) + feng.templates.controls.Reminder(opt_data) + feng.templates.controls.ObjectSelector(null) + feng.templates.controls.ObjectBox(null) + feng.templates.controls.Manipulator(null) + feng.templates.controls.ProgressBar(opt_data) + '</div><div class="captions"></div></div><div class="sceneContainer"></div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.main.EpisodeSelection = function(opt_data, opt_ignored) {
  return '<div class="episode-selection"><div class="scene studio"><div class="shade"></div><div class="overlay"><div class="prompt">' + feng.templates.common.Disc({content: '<div class="location"><p>LOCATION</p><div class="line"></div></div><h1>Ollie\'s<br>Studio</h1><p>Ollie is a fashion designer.<br>She lives in a small studio in<br>the noisy downtown area.<br>Give her some Fengshui tips!</p>' + feng.templates.common.PrimaryButton({href: '#studio', icon: 'yes', text: 'start'})}) + '</div><div class="people"></div></div></div><div class="scene townhouse"><div class="shade"></div><div class="overlay"><div class="prompt">' + feng.templates.common.Disc({content: '<div class="location"><p>LOCATION</p><div class="line"></div></div><h1>Joanna\'s<br>Townhouse</h1><p>Joanna lives in a Townhouse,<br>She was married with<br>a preschool kid<br>both living at home.</p>' + feng.templates.common.PrimaryButton({href: '#studio', icon: 'yes', text: 'start'})}) + '</div><div class="people"></div></div></div><div class="prompt">' + feng.templates.common.Disc({content: feng.templates.common.FengshuiLogo({noText: true})}) + feng.templates.common.FengshuiLogo({noText: true}) + '</div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.main.Main = function(opt_data, opt_ignored) {
  return '<div id="main"><div class="section" id="home"><div class="inner"><section id="main-preloader">' + feng.templates.common.FengshuiLogo({noText: true}) + '<div class="preloader"><div class="fill"></div></div></section><section id="main-intro"></section><section id="main-episode-selection">' + feng.templates.main.EpisodeSelection(null) + '</section></div></div><ul id="main-options"><li><button class="howtoplay"><div class="fill"></div><div class="icon"><div></div><div></div></div></button></li><li><button class="fullscreen"><div class="fill"></div><div class="icon"><div></div><div></div></div></button></li><li><button class="sound"><div class="fill"></div><div class="icon"><div></div><div></div></div></button></li><li class="share"><button><div class="fill"></div><div class="icon"><div></div><div></div></div></button><div class="slider"><div class="buttons"><a class="facebook"></a><a class="twitter"></a><a class="google"></a></div></div></li></ul>' + ((opt_data.debug != false) ? feng.templates.debug.Debugger(null) : '') + '</div>';
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
