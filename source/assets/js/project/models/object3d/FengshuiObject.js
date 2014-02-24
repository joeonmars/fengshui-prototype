goog.provide('feng.models.object3d.FengshuiObject');

goog.require('feng.models.object3d.Object3D');


/**
 * @constructor
 */
feng.models.object3d.FengshuiObject = function( mesh ){

  goog.base(this, mesh);

};
goog.inherits(feng.models.object3d.FengshuiObject, feng.models.object3d.Object3D);


feng.models.object3d.FengshuiObject.prototype.getRequirement = function() {

	return this.getData('requirement');
};


feng.models.object3d.FengshuiObject.prototype.getRequirementState = function() {

	// send data to resolver...
	// and return a result object

	return {};
};


feng.models.object3d.FengshuiObject.Requirement = {
	COLOR: 'color',
	ACCESSORY: 'accessory',
	LET_FLOW: 'let_flow',
	NOT_TOP_OF: 'not_top_of',
	NOT_BOTTOM_OF: 'not_bottom_of',
	NOT_BACK_OF: 'not_back_of',
	NOT_FRONT_OF: 'not_front_of',
	NOT_FACING: 'not_facing'
};