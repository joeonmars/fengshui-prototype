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
  var output = '<div class="section episode" id="' + opt_data.id + '"><div class="hud"><div class="overlays"><div class="tutorial-overlay"></div><div class="opening-overlay">' + feng.templates.common.Popup({classname: 'opening from-bottom', content: '<h1></h1><p></p>' + feng.templates.common.PrimaryButton({classname: 'ok', icon: 'icon-yes', text: 'I’d be glad to help!'}) + '<div class="character open"></div>'}) + '</div><div class="ending-overlay">' + feng.templates.common.Popup({classname: 'ending from-bottom', content: '<h1></h1><div class="line"></div><p></p>' + feng.templates.common.PrimaryButton({classname: 'continue', icon: 'icon-yes', text: 'Continue Investigating'}) + feng.templates.common.PrimaryButton({classname: 'visit', icon: 'icon-yes', text: 'Next Challenge'}) + '<div class="character"></div>'}) + '</div><div class="finale-overlay">' + feng.templates.common.Popup({classname: 'finale from-bottom', content: '<h1></h1><div class="line"></div><p></p>' + feng.templates.common.PrimaryButton({classname: 'ok', icon: 'icon-yes', text: 'done'})}) + '</div><div class="loader-overlay"><div class="loader"><canvas class="spinner"></canvas><p class="progress"></p></div></div></div><div class="controls">' + feng.templates.controls.HomeButton(opt_data) + feng.templates.controls.Compass(null) + feng.templates.controls.Book(null) + feng.templates.controls.ObjectSelector(null) + feng.templates.controls.DropButton(null) + feng.templates.controls.ProgressBar(opt_data) + feng.templates.controls.Reminder(opt_data) + '</div><div class="tooltips">';
  var tipList385 = opt_data.tips;
  var tipListLen385 = tipList385.length;
  for (var tipIndex385 = 0; tipIndex385 < tipListLen385; tipIndex385++) {
    var tipData385 = tipList385[tipIndex385];
    output += feng.templates.controls.Tooltip({tip: tipData385});
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
  return '<div class="episode-selection"><div class="scene studio"><div class="shade"></div><div class="prompt">' + feng.templates.common.Disc({content: '<div class="location"><p>LOCATION</p><div class="line"></div></div><h1>Ollie\'s Studio</h1><p>Ollie lives in a small, delicate studio in downtown. How could we improve it\'s energy flow?</p>' + feng.templates.common.PrimaryButton({href: opt_data.token.STUDIO, icon: 'icon-yes', text: 'start'})}) + '</div></div><div class="scene house"><div class="shade"></div><div class="prompt">' + feng.templates.common.Disc({content: '<div class="location"><p>LOCATION</p><div class="line"></div></div><h1>Scott\'s House</h1><p>Scott lives in a two story house, with his wife Joanna and son Nick. How could we improve it\'s energy flow?</p>' + feng.templates.common.PrimaryButton({href: opt_data.token.HOUSE, icon: 'icon-yes', text: 'start'})}) + '</div></div><div class="prompt">' + feng.templates.common.Disc({content: '<div class="question">' + feng.templates.common.FengshuiLogo({noText: true}) + '<h1><b>You\'ve got requests.</b>Please improve their<br>interior energy flow using<br>Feng Shui knowledge.</h1><h2><div class="arrow left"></div><span>CHOOSE ONE</span><div class="arrow right"></div></h2></div>'}) + '</div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.main.Main = function(opt_data, opt_ignored) {
  return '<div id="main"><div class="section" id="home"><div class="inner"><section id="main-preloader"><div class="content"><h1>FengShui RealTime</h1><canvas class="house-logo"></canvas><p><span>A real-time experience to practice Feng shui.</span><span>Discovering tips for creating an optimal,</span><span>balanced home environment.</span></p></div></section><section id="main-episode-selection"></section></div></div><ul id="main-options"><li><button class="howtoplay"></button></li><li><button class="sound"></button></li><li class="share"><button></button><div class="slider"><div class="buttons"><a class="facebook" href="https://www.facebook.com/sharer/sharer.php?u=http://fengshuirealtime.com/" target="_blank"></a><a class="twitter" href="https://twitter.com/intent/tweet?original_referer=http://fengshuirealtime.com/" target="_blank"></a><a class="google" href="https://plus.google.com/share?url=http://fengshuirealtime.com/" target="_blank"></a></div></div></li></ul></div>' + ((opt_data.debug != false) ? feng.templates.debug.Debugger(null) : '');
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
