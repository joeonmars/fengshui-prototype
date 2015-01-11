// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

goog.provide('feng.templates.common');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.common.Disc = function(opt_data, opt_ignored) {
  return '<div class="disc"><div class="outer"></div><div class="inner"><div class="content">' + opt_data.content + '</div></div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.common.PrimaryButton = function(opt_data, opt_ignored) {
  return (opt_data.href) ? '<a class="primary-button ' + opt_data.classname + '" href="' + opt_data.href + '">' + ((opt_data.icon) ? '<span class="icon ' + opt_data.icon + '"></span>' : '') + opt_data.text + '</a>' : '<button class="primary-button ' + opt_data.classname + '">' + ((opt_data.icon) ? '<span class="icon ' + opt_data.icon + '"></span>' : '') + opt_data.text + '</button>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.common.CloseButton = function(opt_data, opt_ignored) {
  return '<button class="icon icon-close close-button"></button>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.common.ScrollBar = function(opt_data, opt_ignored) {
  return '<div class="scrollbar"><button class="handle"></button></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.common.FengshuiLogo = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '<div class="fengshui-logo"><div class="symbol"><div class="needle"></div><div class="frame"></div></div>' + ((opt_data.noText != true) ? '<h1><div class="line1">FENGSHUI</div><div class="line2">REALTIME</div></h1>' : '') + '</div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.common.Popup = function(opt_data, opt_ignored) {
  return '<div class="popup ' + ((opt_data.classname) ? opt_data.classname : '') + '"><div class="content">' + opt_data.content + '</div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.common.TutorialPopup = function(opt_data, opt_ignored) {
  return feng.templates.common.Popup({classname: 'tutorial from-bottom', content: '<h1>Control Instructions</h1><ul class="steps"><li><h6>1. Explore the environment</h6><div class="video-wrapper"><video preload="metadata"><source src="' + opt_data.assetsPath + 'video/tutorial-1.mp4" type="video/mp4"><source src="' + opt_data.assetsPath + 'video/tutorial-1.ogv" type="video/ogg"></video></div></li><li><h6>2. Inspect objects for tips</h6><div class="video-wrapper"><video preload="metadata"><source src="' + opt_data.assetsPath + 'video/tutorial-2.mp4" type="video/mp4"><source src="' + opt_data.assetsPath + 'video/tutorial-2.ogv" type="video/ogg"></video></div></li><li><h6>3. Ask the client for clues</h6><div class="video-wrapper"><video preload="metadata"><source src="' + opt_data.assetsPath + 'video/tutorial-3.mp4" type="video/mp4"><source src="' + opt_data.assetsPath + 'video/tutorial-3.ogv" type="video/ogg"></video></div></li></ul><div class="controls"><div class="loader"><div class="bar"><div class="fill"></div></div><p class="counter">00</p></div>' + feng.templates.common.PrimaryButton({classname: 'skip', icon: 'icon-yes', text: 'OK'}) + '</div>'});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.common.CreditsPopup = function(opt_data, opt_ignored) {
  return feng.templates.common.Popup({classname: 'credits from-bottom', content: '<h1>Credits and References</h1><div class="scroller"><div class="content"></div>' + feng.templates.common.ScrollBar(null) + '</div>' + feng.templates.common.PrimaryButton({classname: 'skip', icon: 'icon-yes', text: 'OK'})});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.common.Helper = function(opt_data, opt_ignored) {
  return '<div class="helper ' + opt_data.classname + '"><div class="content">' + opt_data.content + '</div>' + feng.templates.common.CloseButton(null) + '</div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.common.Helpers = function(opt_data, opt_ignored) {
  return '<div class="helpers">' + feng.templates.common.Helper({classname: 'compass', content: '<p class="top">View from <b>top</b>.</p><p class="normal">Back to <b>normal view</b>.</p>'}) + feng.templates.common.Helper({classname: 'selector', content: '<p><b>Pressing down</b> the mouse button for<br><b>one second</b> to investigate this item.</p>'}) + feng.templates.common.Helper({classname: 'walk', content: '<p class="mousewheel">You can also <b>scroll</b> the mousewheel<br>to move forward or backward.</p><p class="click">You can also <b>click</b><br>to move around in the scene.</p>'}) + '</div>';
};
