goog.provide('feng.models.achievements.Tip');

goog.require('feng.models.achievements.Achievements');

/**
 * @constructor
 */
feng.models.achievements.Tip = function( tipId, viewId, sectionId ){

  this.id = tipId;
  this.viewId = viewId;
  this.sectionId = sectionId;

  this.image = '';
  this.sprite = '';

  this.unlocked = false;

  this._requiredTipId = null;
};


feng.models.achievements.Tip.prototype.getView3dObject = function() {

	var view3dController = feng.controllers.view3d.View3DController.getInstance();
	var view3d = view3dController.getView3D(this.sectionId, this.viewId);
	return view3d.interactiveObjects[ this.id ];
};


feng.models.achievements.Tip.prototype.getRequiredTip = function() {

  if(!this._requiredTipId) return null;

  var achievements = feng.models.achievements.Achievements.getInstance();
  var requiredTip = achievements.getTip( this._requiredTipId, this.viewId, this.sectionId );

  return requiredTip;
};


feng.models.achievements.Tip.prototype.require = function( tipId ) {

  this._requiredTipId = tipId;
  return this;
};


feng.models.achievements.Tip.prototype.unlock = function() {

  if(this._requiredTipId) {

    this.unlocked = this.getRequiredTip().unlocked;
  }else {

    this.unlocked = true;
  }

  return this.unlocked;
};