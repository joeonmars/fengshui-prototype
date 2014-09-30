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
		tips: tips
	};

  goog.base(this, template, templateData);

this._viewIds = ['homeoffice'/*'boysroom' /*, 'livingroom', */];
};
goog.inherits(feng.views.sections.Townhouse, feng.views.sections.Episode);


feng.views.sections.Townhouse.prototype.init = function(){

	goog.base(this, 'init');

};


feng.views.sections.Townhouse.prototype.activate = function(){

	goog.base(this, 'activate');

};