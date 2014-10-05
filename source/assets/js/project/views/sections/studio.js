goog.provide('feng.views.sections.Studio');

goog.require('goog.dom');
goog.require('feng.events');
goog.require('feng.views.sections.Episode');


/**
 * @constructor
 */
feng.views.sections.Studio = function(){

	var viewIds = ['livingroom', /*'livingroom-test',*/ 'bathroom', /*'interior2'*/];
	var sectionId = 'studio';

	var achievements = feng.models.achievements.Achievements.getInstance();
	var tips = achievements.getTipsOfSection( sectionId );

	var tipsOfViews = {};
	goog.object.forEach(viewIds, function(viewId) {
		var tips = achievements.getTipsOfView( viewId, sectionId, false, true );
		tipsOfViews[ viewId ] = tips;
	});

	var template = feng.templates.main.EpisodeSection;
	var templateData = {
		id: sectionId,
		tips: tips,
		tipsOfViews: tipsOfViews,
		token: feng.controllers.NavigationController.Token
	};

  goog.base(this, template, templateData);

  this._viewIds = viewIds;
  this._viewId = this._viewIds[0];
};
goog.inherits(feng.views.sections.Studio, feng.views.sections.Episode);