goog.provide('feng');

goog.require('goog.Uri');
goog.require('feng.apps.Main');
goog.require('feng.apps.Demo');
goog.require('feng.apps.PathEdit');


feng.Config = {};


feng.init = function( config ) {

	feng.Config = config;
	
	// parse queries
	var uri = new goog.Uri( window.location.href );
	var queryData = uri.getQueryData();

	// execute app
	var app = queryData.get('app') || feng.Config['app'];

	switch(app) {
		case 'main':
		feng.apps.Main.getInstance();
		break;

		case 'demo':
		feng.apps.Demo.getInstance();
		break;

		case 'pathedit':
		feng.apps.PathEdit.getInstance();
		break;
	};
};

goog.exportProperty(window, 'feng', feng);
goog.exportProperty(feng, 'init', feng.init);