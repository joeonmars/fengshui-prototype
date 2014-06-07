// This file was automatically generated from captions.soy.
// Please don't edit this file by hand.

goog.provide('feng.templates.captions');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.captions.Caption = function(opt_data, opt_ignored) {
  return ((opt_data.type == 'select_color') ? '<div class="left"></div><div class="right"></div>' : '') + ((opt_data.type == 'change_object') ? '<div class="top"></div><div class="right"></div>' : '') + ((opt_data.type == 'advice') ? '<div class="right"></div>' : '');
};
