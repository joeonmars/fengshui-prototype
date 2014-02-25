// This file was automatically generated from main.soy.
// Please don't edit this file by hand.

goog.provide('feng.templates.main');

goog.require('soy');
goog.require('soydata');
goog.require('feng.templates.debug');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.main.HelloWorld = function(opt_data, opt_ignored) {
  return '<div>Hello World!</div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.main.SectionEpisodeContent = function(opt_data, opt_ignored) {
  return '<div class="preloader"></div><div class="sceneUI"><div class="controls"><div class="inner"><div class="compass grab"><div class="directions"><div class="n">N</div><div class="s">S</div><div class="w">W</div><div class="e">E</div></div></div></div></div></div><div class="sceneContainer"></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.main.Main = function(opt_data, opt_ignored) {
  return '<div id="main"><div class="section" id="home"><div class="preloader"><div class="fill"></div></div></div><div class="section episode" id="studio">' + feng.templates.main.SectionEpisodeContent(null) + '</div><!--<div class="section episode" id="twobedroom">' + feng.templates.main.SectionEpisodeContent(null) + '</div><div class="section episode" id="townhouse">' + feng.templates.main.SectionEpisodeContent(null) + '</div>-->' + ((opt_data.debug != false) ? feng.templates.debug.Debugger(null) : '') + '</div>';
};
