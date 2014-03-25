goog.provide('feng.fx.EnergyFlow');

goog.require('feng.fx.PathTrack');

/**
 * @constructor
 */
feng.fx.EnergyFlow = function(controlPoints){

	var offset = null;
	var isClosed = false;
	var color = '#48D1CC';

  goog.base(this, controlPoints, offset, isClosed, color);

};
goog.inherits(feng.fx.EnergyFlow, feng.fx.PathTrack);


feng.fx.EnergyFlow.prototype.getNearest = function( position ){

	// find the closest point on path from given position
	var minDistance = Number.MAX_VALUE;
	var closest = null;
	var closestIndex = null;
	var pathPoints = this.getSpacedPoints();

	goog.array.forEach(pathPoints, function(point, index) {

		var distance = position.distanceTo( point );
		if( distance < minDistance ) {
			minDistance = distance;
			closest = point;
			closestIndex = index;
		}
	});

	// get camera position of t
	var t = closestIndex / pathPoints.length;
	var pathCamera = this.getCameraAt(t);

	var nearest = {
		position: pathCamera.position.clone(),
		rotation: pathCamera.rotation.clone(),
		t: t,
		distance: minDistance
	};

	return nearest;
};


feng.fx.EnergyFlow.prototype.getTipsOfProgress = function( progress ){

	var currentControlPointIndex = Math.floor( (this.controlPoints.length - 1) * progress );
	var nextControlPointIndex = Math.min( currentControlPointIndex + 1, this.controlPoints.length - 1 );

	// get weight by T, calculated T by U (progress)
	var progressT = this.spline.getUtoTmapping( progress );
	var currentT = currentControlPointIndex / (this.controlPoints.length - 1);
	var nextT = nextControlPointIndex / (this.controlPoints.length - 1);
	var weight = (progressT - currentT) / (nextT - currentT);

	// get tips
	var currentControlPoint = this.controlPoints[ currentControlPointIndex ];
	var nextControlPoint = this.controlPoints[ nextControlPointIndex ];

	var currentTipId = currentControlPoint.tipId || '';
	var nextTipId = nextControlPoint.tipId || '';

	var currentTip = currentTipId;
	var nextTip = nextTipId;

	return {
		current: currentTip,
		next: nextTip,
		weight: weight
	};
};


feng.fx.EnergyFlow.prototype.updateTrack = function(){

	goog.base(this, 'updateTrack');

};