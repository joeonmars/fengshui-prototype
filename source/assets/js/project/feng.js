goog.provide('feng');

goog.require('feng.apps.Main');
goog.require('feng.apps.Demo');


feng.Config = {};


feng.init = function( config ) {

	feng.Config = config;
	
	switch(feng.Config['app']) {
		case 'main':
		feng.apps.Main();
		break;

		case 'demo':
		feng.apps.Demo();
		break;
	};
};

goog.exportProperty(window, 'feng', feng);
goog.exportProperty(feng, 'init', feng.init);