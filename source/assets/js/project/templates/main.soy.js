// This file was automatically generated from main.soy.
// Please don't edit this file by hand.

goog.provide('feng.templates.main');

goog.require('soy');
goog.require('soydata');
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
feng.templates.main.Main = function(opt_data, opt_ignored) {
  return '<div id="main"><div class="section" id="home"><div class="preloader"><div class="fill"></div></div></div><ul id="main-options"><li class="howtoplay"><div class="button"><div class="fill"></div><div class="icon"><div></div><div></div></div></div></li><li class="fullscreen"><div class="button"><div class="fill"></div><div class="icon"><div></div><div></div></div></div></li><li class="sound"><div class="button"><div class="fill"></div><div class="icon"><div></div><div></div></div></div></li><li class="share"><div class="button"><div class="fill"></div><div class="icon"><div></div><div></div></div></div><div class="slider"><div class="buttons"><a class="facebook"></a><a class="twitter"></a><a class="google"></a></div></div></li></ul>' + ((opt_data.debug != false) ? feng.templates.debug.Debugger(null) : '') + '</div>';
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
