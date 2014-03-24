goog.provide('feng.views.debug.Achievements');

goog.require('feng.views.debug.DebugView');
goog.require('feng.templates.debug');
goog.require('feng.models.achievements.Achievements');


/**
 * @constructor
 */
feng.views.debug.Achievements = function(){

  this._achievementsModel = feng.models.achievements.Achievements.getInstance();

  var templateData = {
    tips: this._achievementsModel.getAllTips()
  };

  goog.base(this, feng.templates.debug.AchievementsDebugView, templateData);

  this._tipDoms = goog.dom.query('.tips li', this.domElement);

  goog.array.forEach(this._tipDoms, function(tipDom) {
    this._eventHandler.listen(tipDom, 'click', this.onClickTip, false, this);
  }, this);
};
goog.inherits(feng.views.debug.Achievements, feng.views.debug.DebugView);


feng.views.debug.Achievements.prototype.onClickTip = function(e){

  goog.array.forEach(this._tipDoms, function(tipDom) {
    goog.dom.classes.remove(tipDom, 'clicked');
    goog.dom.classes.remove(tipDom, 'required');
  });

  var tipId = e.currentTarget.getAttribute('data-tip-id');
  var viewId = e.currentTarget.getAttribute('data-view-id');
  var sectionId = e.currentTarget.getAttribute('data-section-id');

  var clickedTip = this._achievementsModel.getTip(tipId, viewId, sectionId);
  var requiredTip = clickedTip.getRequiredTip();

  goog.dom.classes.add(e.currentTarget, 'clicked');

  if(requiredTip) {
    var requireTipDom = goog.dom.query('.tips li[data-tip-id="' + requiredTip.id + '"]')[0];
    goog.dom.classes.add(requireTipDom, 'required');
  }
};