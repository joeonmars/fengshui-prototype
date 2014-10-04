goog.provide('feng.models.achievements.Tip');

goog.require('goog.events.EventTarget');
goog.require('feng.events');
goog.require('feng.models.achievements.Achievements');
goog.require('feng.controllers.NavigationController');

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
  this.character = data['character'];
  this.name = data['name'];
  this.advice = data['advice'];
  this.quote = data['quote'];
  this.description = data['description'];
  this.hint = data['hint'];

  this.cover = feng.Config['assetsPath'] + 'images/tip-covers/' + data['cover'];

  this.iconId = data['icon'];
  this.goTipToken = feng.controllers.NavigationController.Token.GO_TIP.replace('{sectionId}', this.sectionId).replace('{viewId}', this.viewId).replace('{tipId}', this.id);
  this.readTipToken = feng.controllers.NavigationController.Token.READ_TIP.replace('{tipId}', this.id);

  this.unlocked = feng.storageController.isTipUnlocked( this.id );

  this._requiredTipId = null;
};
goog.inherits(feng.models.achievements.Tip, goog.events.EventTarget);


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