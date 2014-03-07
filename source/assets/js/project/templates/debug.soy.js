// This file was automatically generated from debug.soy.
// Please don't edit this file by hand.

goog.provide('feng.templates.debug');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.debug.Debugger = function(opt_data, opt_ignored) {
  return '<div id="debugger"><div class="header"><h4>Debugger</h4><div class="button display"></div></div><ul></ul></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.debug.DebugView = function(opt_data, opt_ignored) {
  return '<li class="debugView" id="' + opt_data.id + '"><div class="header"><h5>' + opt_data.title + '</h5><div class="button display"></div></div><div class="body">' + opt_data.body + '</div></li>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.debug.CameraDebugView = function(opt_data, opt_ignored) {
  return '\t' + feng.templates.debug.DebugView({id: 'debug-camera', title: 'Camera', body: '<div class="viewPanel"><div><select></select><button type="button" class="button use"></button><div class="button visible"></div></div><ul><li data-prop="fov"></li><li data-prop="position-x"></li><li data-prop="position-y"></li><li data-prop="position-z"></li><li data-prop="rotation-x"></li><li data-prop="rotation-y"></li><li data-prop="rotation-z"></li></ul><label><input class="inDegrees" type="checkbox">in degrees</label></div><div class="controlPanel"><textarea rows="10"></textarea><button type="button" class="button input"></button><button type="button" class="button output"></button></div>'});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.debug.PathfindingDebugView = function(opt_data, opt_ignored) {
  return '\t' + feng.templates.debug.DebugView({id: 'debug-pathfinding', title: 'Pathfinding', body: '<div class="canvasContainer"></div>'});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.debug.PathTrackDebugView = function(opt_data, opt_ignored) {
  return '\t' + feng.templates.debug.DebugView({id: 'debug-pathtrack', title: 'Path Track', body: '<div class="editPanel"><div class="scene"><label>Scene</label><select></select></div><button type="button" class="button add"></button><button type="button" class="button remove"></button><button type="button" class="button output"></button><textarea rows="10"></textarea></div><div class="playbackPanel"><label>Playback</label><div class="controls"><button type="button" class="button play"></button><button type="button" class="button stop"></button><input type="range" min="0" max="100" value="0"></div></div>'});
};
