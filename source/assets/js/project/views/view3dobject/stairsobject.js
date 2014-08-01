goog.provide('feng.views.view3dobject.StairsObject');

goog.require('feng.views.view3dobject.InteractiveObject');

/**
 * @constructor
 * An interactive object that leads between lower floor to upper floor
 * Structure illustrated as below
 * 
 * ☻ 'upper'
 *  \
 *   \
 *    \
 *     \
 *      \☻ 'lower'
 *
 * speed 0.48m/s
 * step size 0.2m by 0.2m
 */
feng.views.view3dobject.StairsObject = function( object3d, data, view3d ){

  goog.base(this, object3d, data, view3d);

  // lower / upper global position in view3d
  this.lowerPosition = feng.utils.ThreeUtils.getWorldPosition( this.object3d.getObjectByName('lower') );
  this.upperPosition = feng.utils.ThreeUtils.getWorldPosition( this.object3d.getObjectByName('upper') );

  // distance of walk
  this.distance = this.lowerPosition.distanceTo( this.upperPosition );

  // time duration of walk, in milliseconds
  this.duration = this.distance / (0.48 * 100 / 2) * 1000;

  // number of steps
  var stepLength = Math.sqrt( Math.pow(0.2 * 100, 2) + Math.pow(0.2 * 100, 2) );
  this.numSteps = this.distance / stepLength;
};
goog.inherits(feng.views.view3dobject.StairsObject, feng.views.view3dobject.InteractiveObject);


feng.views.view3dobject.StairsObject.prototype.getPositionByT = function(t, descending) {

  var start = descending ? this.upperPosition : this.lowerPosition;
  var end = descending ? this.lowerPosition : this.upperPosition;

  var stepL = 1 / this.numSteps;
  var endSegment = Math.ceil( t / stepL );
  var startSegment = endSegment - 1;

  var endT = endSegment * stepL;
  var startT = startSegment * stepL;

  var stepT = (t - stepStartT) / (endT - startT);

  // for easing functions, https://gist.github.com/gre/1650294
  stepT = Math.pow(stepT, 2);

  var position = start.lerp(end, stepT);

  return position;
};