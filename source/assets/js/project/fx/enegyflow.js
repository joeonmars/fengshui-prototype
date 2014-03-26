goog.provide('feng.fx.EnergyFlow');

goog.require('feng.fx.PathTrack');
goog.require('feng.models.achievements.Achievements');


/**
 * @constructor
 */
feng.fx.EnergyFlow = function(controlPoints, viewId, sectionId){

	var offset = null;
	var isClosed = false;
	var color = '#48D1CC';

  goog.base(this, controlPoints, offset, isClosed, color);

  this._viewId = viewId;
  this._sectionId = sectionId;

  this._achievements = feng.models.achievements.Achievements.getInstance();
};
goog.inherits(feng.fx.EnergyFlow, feng.fx.PathTrack);


feng.fx.EnergyFlow.prototype.create = function(controlPoints, offset, isClosed, color){

	goog.base(this, 'create', controlPoints, offset, isClosed, color);

	// convert external data for js compilation
  goog.array.forEach(this.controlPoints, function(controlPoint) {
  	controlPoint.tipId = controlPoint['tipid'];
  });
};


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

	// get camera position of u
	var u = closestIndex / pathPoints.length;
	var pathCamera = this.getCameraAt( u );

	var nearest = {
		position: pathCamera.position.clone(),
		rotation: pathCamera.rotation.clone(),
		u: u,
		distance: minDistance
	};

	return nearest;
};


feng.fx.EnergyFlow.prototype.getTipIdsAndWeightOfProgress = function( progress ){

	var totalControlPoints = this.controlPoints.length;

	var progressT = this.spline.getUtoTmapping( progress );
	var currentControlPoint, nextControlPoint;
	var currentT = 0, nextT = 1;
	var currentTipId = '', nextTipId = '';

	var progressControlPointIndex = Math.floor( (totalControlPoints - 1) * progressT );

	goog.array.forEach(this.controlPoints, function(controlPoint, index) {

		if(controlPoint.tipid) {

			var controlPointT = index / (totalControlPoints - 1);

			if(index <= progressControlPointIndex) {

				currentT = controlPointT;
				currentTipId = controlPoint.tipid;
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

	return {
		current: currentTipId,
		next: nextTipId,
		weight: weight
	};
};


feng.fx.EnergyFlow.prototype.getTipsAndWeightOfProgress = function( progress ){

	var tipIdsAndWeight = this.getTipIdsAndWeightOfProgress( progress );

	var weight = tipIdsAndWeight.weight;
	var currentTipId = tipIdsAndWeight.current;
	var nextTipId = tipIdsAndWeight.next;

	// get tips
	var currentTip = this._achievements.getTip( currentTipId, this._viewId, this._sectionId );
	var nextTip = this._achievements.getTip( nextTipId, this._viewId, this._sectionId );

	return {
		current: currentTip,
		next: nextTip,
		weight: weight
	};
};


feng.fx.EnergyFlow.prototype.getLookAt = function(object3d){

	if(!object3d) {
		return this._pathCamera.rotation;
	}

	var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
	var cameraPosition = this._pathCamera.position;

	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(cameraPosition, object3d.position);
	rotation.setFromQuaternion( quaternion );

	return rotation;
};


feng.fx.EnergyFlow.prototype.interpolateLookAt = function(fromObject3d, toObject3d, weight){

	var fromRotation = this.getLookAt(fromObject3d);
	var toRotation = this.getLookAt(toObject3d);

	var rotation = feng.utils.ThreeUtils.lerpBetween( fromRotation, toRotation, weight );

	return rotation;
};


feng.fx.EnergyFlow.prototype.updateTrack = function(){

	goog.base(this, 'updateTrack');

};