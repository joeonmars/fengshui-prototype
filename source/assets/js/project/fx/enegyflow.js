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

	var totalControlPoints = this.controlPoints.length;

	var progressT = this.spline.getUtoTmapping( progress );
	var currentControlPoint, nextControlPoint;
	var currentT = 0, nextT = 1;
	var currentTipId = '', nextTipId = '';

	var progressControlPointIndex = Math.floor( (totalControlPoints - 1) * progressT );

	goog.array.forEach(this.controlPoints, function(controlPoint, index) {

		if(controlPoint.tipId) {

			var controlPointT = index / (totalControlPoints - 1);

			if(index <= progressControlPointIndex) {

				currentT = controlPointT;
				currentTipId = controlPoint.tipId;
				currentControlPoint = controlPoint;

			}else {
			
				if(!nextTipId) {
					nextT = controlPointT;
					nextTipId = controlPoint.tipId;
					nextControlPoint = controlPoint;
				}

			}
		}
	});

	// get weight by T, which is calculated from U (progress)
	var weight = (progressT - currentT) / (nextT - currentT);

	// get tips
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