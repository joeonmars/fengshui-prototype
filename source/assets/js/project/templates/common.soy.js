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
  return (opt_data.href) ? '<a class="primary-button ' + opt_data.classname + '" href="' + opt_data.href + '">' + ((opt_data.icon) ? '<div class="icon ' + opt_data.icon + '"></div>' : '') + opt_data.text + '</a>' : '<button class="primary-button ' + opt_data.classname + '">' + ((opt_data.icon) ? '<div class="icon ' + opt_data.icon + '"></div>' : '') + opt_data.text + '</button>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.common.CloseButton = function(opt_data, opt_ignored) {
  return '<button class="close-button"><div class="circle"></div><div class="icon"><div></div><div class="lighter"></div></div></button>';
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
  return '<div class="popup ' + opt_data.classname + '">' + feng.templates.common.CloseButton(null) + '<div class="content">' + opt_data.content + '</div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.common.TutorialPopup = function(opt_data, opt_ignored) {
  return feng.templates.common.Popup({classname: 'tutorial', content: '<h1>how to play</h1><div class="line"></div><div class="carousel"><ul><li></li><li></li><li></li></ul></div><div><div class="loader"><div class="bar"><div class="fill"></div></div><p class="counter">00</p></div>' + feng.templates.common.PrimaryButton({classname: 'skip', icon: 'skip', text: 'skip'}) + '</div>'});
};
