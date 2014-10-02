goog.provide('feng.views.sections.Studio');

goog.require('goog.dom');
goog.require('feng.events');
goog.require('feng.views.sections.Episode');


/**
 * @constructor
 */
feng.views.sections.Studio = function(){

	var achievements = feng.models.achievements.Achievements.getInstance();
	var tips = achievements.getTipsOfSection( 'studio' );
	
	var template = feng.templates.main.EpisodeSection;
	var templateData = {
		id: 'studio',
		tips: tips
	};

  goog.base(this, template, templateData);

  this._viewIds = ['livingroom', 'livingroom-test', 'bathroom', 'interior2'];
  this._viewId = this._viewIds[0];
};
goog.inherits(feng.views.sections.Studio, feng.views.sections.Episode);