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


/*
feng.fx.EnergyFlow.prototype.getTOfTip = function( tip ){

	var tipView3dObject = tip.getView3dObject();
};
*/