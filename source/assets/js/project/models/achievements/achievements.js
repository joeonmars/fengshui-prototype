goog.provide('feng.models.achievements.Achievements');

goog.require('feng.models.achievements.Tip');

/**
 * @constructor
 */
feng.models.achievements.Achievements = function(){

  this._sections = {

    'twobedroom': {
      'corridor': [

      ],
      'kitchen': [
        new feng.models.achievements.Tip('refrigerator', 'kitchen', 'twobedroom'),
        new feng.models.achievements.Tip('fruits', 'kitchen', 'twobedroom').require('refrigerator'),
      ],
      'bedroom': [

      ]
    },

    'studio': {
      'corridor': [

      ],
      'interior1': [
        new feng.models.achievements.Tip('sofa', 'interior1', 'studio'),
        new feng.models.achievements.Tip('picture', 'interior1', 'studio')
      ],
      'interior2': [
        new feng.models.achievements.Tip('computer', 'interior2', 'studio'),
      ]
    },

    'townhouse': {
      'yard': [

      ],
      'sittingroom': [
        new feng.models.achievements.Tip('goldfish', 'sittingroom', 'townhouse'),
      ],
      'kidsroom': [

      ],
      'bedroom': [

      ]
    }
  };
};
goog.addSingletonGetter(feng.models.achievements.Achievements);


feng.models.achievements.Achievements.prototype.getTip = function(tipId, viewId, sectionId) {

  var tips = this.getTipsOfView( viewId, sectionId );
  var tip = goog.array.find(tips, function(t) {
    return t.id === tipId;
  });

  return tip;
};


feng.models.achievements.Achievements.prototype.getTipsOfView = function(viewId, sectionId) {

  return this._sections[ sectionId ][ viewId ];
};


feng.models.achievements.Achievements.prototype.getTipsOfSection = function(sectionId) {

  var tips = [];
  var views = this._sections[ sectionId ];
  goog.object.forEach(views, function(viewTips) {
    goog.array.extend(tips, viewTips);
  });

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