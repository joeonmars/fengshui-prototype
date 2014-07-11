goog.provide('feng.apps.Demo');

goog.require('goog.dom');
goog.require('goog.fx.anim');
goog.require('goog.style');
goog.require('feng.templates.main');
goog.require('feng.controllers.NavigationController');
goog.require('feng.controllers.SectionController');
goog.require('feng.controllers.StorageController');
goog.require('feng.views.debug.Debugger');
goog.require('feng.views.MainOptions');
goog.require('feng.PubSub');


feng.apps.Demo = function() {

	goog.base(this);
	
	goog.fx.anim.setAnimationWindow(window);

	var debug = feng.Config['debug'];
	var office = feng.Config['office'];

	var mainFrag = soy.renderAsFragment(feng.templates.main.Main, {
		debug: debug
	});
	goog.dom.appendChild(document.body, mainFrag);

	feng.pubsub = feng.PubSub.getInstance();

	if(debug) feng.views.debug.Debugger.getInstance();
	if(office) goog.style.setOpacity(document.body, .1);

	feng.mainOptions = new feng.views.MainOptions;

	feng.navigationController = feng.controllers.NavigationController.getInstance();
	feng.sectionController = feng.controllers.SectionController.getInstance();

	feng.storageController = feng.controllers.StorageController.getInstance();

	feng.controllers.NavigationController.Implementation = feng.controllers.NavigationController.HASH;
	feng.navigationController.init();
	feng.navigationController.setToken('home');
};
goog.inherits(feng.apps.Demo, goog.events.EventTarget);
goog.addSingletonGetter(feng.apps.Demo);