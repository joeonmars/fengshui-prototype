goog.provide('fengshui.models.object3d.FengshuiObject');


/**
 * @constructor
 */
fengshui.models.object3d.FengshuiObject = function( mesh ){

  goog.base(this, mesh);

};
goog.inherits("fengshui.models.object3d.FengshuiObject", "fengshui.models.object3d.Object3D");


fengshui.models.object3d.FengshuiObject.prototype.getRequirement = function() {

	return this.getData('requirement');
};


fengshui.models.object3d.FengshuiObject.prototype.getRequirementState = function() {

	// send data to resolver...
	// and return a result object

	return {};
};


fengshui.models.object3d.FengshuiObject.Requirement = {
	COLOR: 'color',
	ACCESSORY: 'accessory',
	LET_FLOW: 'let_flow',
	NOT_TOP_OF: 'not_top_of',
	NOT_BOTTOM_OF: 'not_bottom_of',
	NOT_BACK_OF: 'not_back_of',
	NOT_FRONT_OF: 'not_front_of',
	NOT_FACING: 'not_facing'
};