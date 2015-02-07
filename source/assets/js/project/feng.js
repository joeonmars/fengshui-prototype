goog.provide('feng');

goog.require('goog.Uri');
goog.require('feng.apps.Main');
goog.require('feng.apps.Test');
goog.require('feng.apps.PathEdit');


/**
 * @expose
 */
feng.version = '2.7.15';


feng.Config = {};


feng.init = function( config ) {

	feng.Config = config;
	
	// parse queries
	var uri = new goog.Uri( window.location.href );
	var queryData = uri.getQueryData();

	// apply queries to config
	if(queryData.get('debug') === 'true') {

		feng.Config['debug'] = true;
	}

	if(queryData.get('office') === 'true') {

		feng.Config['office'] = true;
	}

	if(queryData.get('console')) {

		feng.Config['escapeConsole'] = (queryData.get('console') === 'false');

	}else {

		feng.Config['escapeConsole'] = (feng.Config['escapeConsole'] === 'true');
	}

	// execute app
	var app = queryData.get('app') || feng.Config['app'];

	switch(app) {
		case 'main':
		feng.apps.Main.getInstance();
		break;

		case 'pathedit':
		feng.apps.PathEdit.getInstance();
		break;

		case 'test':
		feng.apps.Test.getInstance();
		break;
	};
};


goog.exportProperty(window, 'feng', feng);
goog.exportProperty(feng, 'init', feng.init);