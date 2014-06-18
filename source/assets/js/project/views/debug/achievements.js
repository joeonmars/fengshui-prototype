goog.provide('feng.views.debug.Achievements');

goog.require('feng.events');
goog.require('feng.views.debug.DebugView');
goog.require('feng.templates.debug');
goog.require('feng.models.achievements.Achievements');


/**
 * @constructor
 */
feng.views.debug.Achievements = function(){

  this._achievementsModel = feng.models.achievements.Achievements.getInstance();

  var tips = this._achievementsModel.getAllTips();

  var templateData = {
    tips: tips
  };

  goog.base(this, feng.templates.debug.AchievementsDebugView, templateData);

  this._tipEls = goog.dom.query('.tips li', this.domElement);

  goog.array.forEach(this._tipEls, function(tipEl) {
    this._eventHandler.listen(tipEl, 'click', this.onClickTip, false, this);
  }, this);

  goog.array.forEach(tips, function(tip) {
    this._eventHandler.listen(tip, feng.events.EventType.UNLOCK, this.onUnlock, false, this);
  }, this);
};
goog.inherits(feng.views.debug.Achievements, feng.views.debug.DebugView);


feng.views.debug.Achievements.prototype.getTipByAttributes = function(tipId, viewId, sectionId){

  return goog.dom.query('.tips li[data-tip-id='+tipId+'][data-view-id='+viewId+'][data-section-id='+sectionId+']', this.domElement)[0];
};


feng.views.debug.Achievements.prototype.onUnlock = function(e){

  var tipId = e.currentTarget.id;
  var viewId = e.currentTarget.viewId;
  var sectionId = e.currentTarget.sectionId;

  var tipEl = this.getTipByAttributes(tipId, viewId, sectionId);
  goog.dom.classes.add(tipEl, 'unlocked');
};


feng.views.debug.Achievements.prototype.onClickTip = function(e){

  goog.array.forEach(this._tipEls, function(tipEl) {
    goog.dom.classes.remove(tipEl, 'clicked');
    goog.dom.classes.remove(tipEl, 'required');
  });

  var tipId = e.currentTarget.getAttribute('data-tip-id');
  var viewId = e.currentTarget.getAttribute('data-view-id');
  var sectionId = e.currentTarget.getAttribute('data-section-id');

  var clickedTip = this._achievementsModel.getTip(tipId, viewId, sectionId);
  var requiredTip = clickedTip.getRequiredTip();

  goog.dom.classes.add(e.currentTarget, 'clicked');

  if(requiredTip) {
    var requireTipEl = goog.dom.query('.tips li[data-tip-id="' + requiredTip.id + '"]')[0];
    goog.dom.classes.add(requireTipEl, 'required');
  }
};