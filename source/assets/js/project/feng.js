goog.provide('feng');

goog.require('feng.apps.Main');
goog.require('feng.apps.Demo');
goog.require('feng.apps.Spline');


feng.Config = {};


feng.init = function( config ) {

	feng.Config = config;
	
	switch(feng.Config['app']) {
		case 'main':
		feng.apps.Main.getInstance();
		break;

		case 'demo':
		feng.apps.Demo.getInstance();
		break;

		case 'spline':
		feng.apps.Spline.getInstance();
		break;
	};
};

goog.exportProperty(window, 'feng', feng);
goog.exportProperty(feng, 'init', feng.init);