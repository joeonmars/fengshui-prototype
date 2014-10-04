goog.provide('feng.views.sections.Townhouse');

goog.require('goog.dom');
goog.require('feng.events');
goog.require('feng.views.sections.Episode');


/**
 * @constructor
 */
feng.views.sections.Townhouse = function(){

	var achievements = feng.models.achievements.Achievements.getInstance();
	var tips = achievements.getTipsOfSection( 'townhouse' );
	
	var template = feng.templates.main.EpisodeSection;
	var templateData = {
		id: 'townhouse',
		tips: tips,
		token: feng.controllers.NavigationController.Token
	};

  goog.base(this, template, templateData);

	this._viewIds = ['boysroom', 'homeoffice', 'livingroom'];
	this._viewId = this._viewIds[0];
};
goog.inherits(feng.views.sections.Townhouse, feng.views.sections.Episode);