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
  return '\t' + feng.templates.debug.DebugView({id: 'debug-camera', title: 'Camera Controls', body: '<div class="viewPanel"><div><select></select><button type="button" class="button use"></button><div class="button visible"></div></div><ul><li><label>fov</label><input name="fov" type="number"></li><li><label>position x</label><input name="position-x" type="number"></li><li><label>position y</label><input name="position-y" type="number"></li><li><label>position z</label><input name="position-z" type="number"></li><li><label>rotation x</label><input name="rotation-x" type="number"></li><li><label>rotation y</label><input name="rotation-y" type="number"></li><li><label>rotation z</label><input name="rotation-z" type="number"></li><li><input class="degrees" type="checkbox">in degrees</li><li><input class="helpers" type="checkbox" checked>show helpers</li></ul></div>'});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.debug.ManipulateDebugView = function(opt_data, opt_ignored) {
  return '\t' + feng.templates.debug.DebugView({id: 'debug-manipulate', title: 'Manipulate', body: '<div class="viewPanel"></div>'});
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
feng.templates.debug.AchievementsDebugView = function(opt_data, opt_ignored) {
  var output = '\t';
  var param398 = '<div class="tipsPanel"><button class="unlock-all">Unlock All</button><ul class="tips">';
  var tipList400 = opt_data.tips;
  var tipListLen400 = tipList400.length;
  for (var tipIndex400 = 0; tipIndex400 < tipListLen400; tipIndex400++) {
    var tipData400 = tipList400[tipIndex400];
    param398 += '<li data-tip-id="' + tipData400.id + '" data-view-id="' + tipData400.view + '" data-section-id="' + tipData400.section + '"><div class="icon icon-' + tipData400.icon + '"></div><div class="caption"><p>' + tipData400.id + '</p><p>' + tipData400.view + '</p><p>' + tipData400.section + '</p></div></li>';
  }
  param398 += '</ul></div>';
  output += feng.templates.debug.DebugView({id: 'debug-achievements', title: 'Achievements', body: param398});
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
feng.templates.debug.PathTrackDebugView = function(opt_data, opt_ignored) {
  return '\t' + feng.templates.debug.DebugView({id: 'debug-pathtrack', title: 'Path Track', body: '<div class="editPanel"><div class="scene"><label>Scene</label><select></select></div><button type="button" class="button output"></button><input type="file" class="button import"><textarea rows="10"></textarea></div><div class="pointPanel"><label>Control Point</label><button type="button" class="button add"></button><button type="button" class="button remove"></button><ul><li><label>x</label><input name="x" type="number"></li><li><label>y</label><input name="y" type="number"></li><li><label>z</label><input name="z" type="number"></li><li><label>tipid</label><input name="tipid" type="text"></li></ul></div><div class="playbackPanel"><label>Playback</label><div class="controls"><button type="button" class="button play"></button><button type="button" class="button camera fly"></button><input type="range" min="0" max="100" value="0"></div></div>'});
};
