goog.provide('feng.models.achievements.Tip');

goog.require('goog.events.EventTarget');
goog.require('feng.events');
goog.require('feng.models.achievements.Achievements');

/**
 * @constructor
 */
feng.models.achievements.Tip = function( tipId, viewId, sectionId, data ){

  goog.base(this);

  this.id = tipId;
  this.viewId = viewId;
  this.sectionId = sectionId;

  this.isMandatory = data['mandatory'];
  this.reminder = data['reminder'];
  this.response = data['response'];
  this.people = data['people'];

  this.image = new Image;
  this.image.src = feng.Config['assetsPath'] + 'images/tip-icons/' + tipId + 'png';

  this.unlocked = false;

  this._requiredTipId = null;
};
goog.inherits(feng.models.achievements.Tip, goog.events.EventTarget);


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

  if(this.unlocked) {
    
    this.dispatchEvent({
      type: feng.events.EventType.UNLOCK,
      tip: this
    });
  }

  return this.unlocked;
};