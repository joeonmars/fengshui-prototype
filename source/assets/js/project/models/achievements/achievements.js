goog.provide('feng.models.achievements.Achievements');

goog.require('goog.array');
goog.require('goog.object');
goog.require('feng.models.achievements.Tip');

/**
 * @constructor
 */
feng.models.achievements.Achievements = function(){

  this._sections = {
    /*
    'sectionId': {
      'viewId': [
        new feng.models.achievements.Tip('tipId', 'viewId', 'sectionId').require('requireId')
      ]
    }*/
  };
};
goog.addSingletonGetter(feng.models.achievements.Achievements);


feng.models.achievements.Achievements.prototype.init = function( tipsData ) {

  goog.array.forEach(tipsData, function(tipData) {

    var viewId = tipData['view'];
    var sectionId = tipData['section'];
    var tipId = tipData['id'];
    var requireId = tipData['require'];
    var provideId = tipData['provide'];

    this._sections[sectionId] = this._sections[sectionId] || {};
    this._sections[sectionId][viewId] = this._sections[sectionId][viewId] || [];

    var tip = new feng.models.achievements.Tip( tipId, viewId, sectionId, tipData ).provide( provideId ).require( requireId );
    this._sections[sectionId][viewId].push( tip );

  }, this);
};


feng.models.achievements.Achievements.prototype.getTip = function(tipId, viewId, sectionId) {

  var tips = this.getTipsOfView( viewId, sectionId );
  var tip = goog.array.find(tips, function(t) {
    return t.id === tipId;
  });

  return tip;
};


feng.models.achievements.Achievements.prototype.getTipsOfView = function(viewId, sectionId, onlyMandatory, onlyFinal) {

  var tips = this._sections[ sectionId ][ viewId ];
  
  tips = goog.array.filter(tips, function(tip) {

    if(onlyMandatory && onlyFinal) {

      return (tip.isMandatory && tip.isFinal);

    }else if(onlyMandatory && !onlyFinal) {

      return tip.isMandatory;

    }else if(!onlyMandatory && onlyFinal) {

      return tip.isFinal;
    }

    return true;
  });

  return tips;
};


feng.models.achievements.Achievements.prototype.getTipsOfSection = function(sectionId, onlyMandatory) {

  var tips = [];
  var views = this._sections[ sectionId ];
  goog.object.forEach(views, function(viewTips) {
    goog.array.extend(tips, viewTips);
  });

  if(onlyMandatory) {
    tips = goog.array.filter(tips, function(tip) {
      return tip.isMandatory;
    });
  }

  return tips;
};


feng.models.achievements.Achievements.prototype.getAllTips = function() {

  var tips = [];

  goog.object.forEach(this._sections, function(section) {
    goog.object.forEach(section, function(view) {
      goog.array.forEach(view, function(tip) {
        tips.push(tip);
      });
    });
  });

  return tips;
};