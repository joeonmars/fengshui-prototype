goog.provide('feng.apps.Demo');

goog.require('goog.dom');
goog.require('goog.fx.anim');
goog.require('goog.style');
goog.require('feng.templates.main');
goog.require('feng.views.Preloader');
goog.require('feng.controllers.NavigationController');
goog.require('feng.controllers.view3d.PathfindingController');
goog.require('feng.controllers.view3d.View3DController');
goog.require('feng.controllers.SectionController');
goog.require('feng.views.debug.Debugger');


feng.apps.Demo = function() {

	goog.base(this);
	
	goog.fx.anim.setAnimationWindow(window);

	var debug = feng.Config['debug'];

	var mainFrag = soy.renderAsFragment(feng.templates.main.Main, {
		debug: debug
	});
	goog.dom.appendChild(document.body, mainFrag);

	if(debug) feng.views.debug.Debugger.getInstance();

	var preloader = new feng.views.Preloader;
	goog.events.listenOnce(preloader, feng.events.EventType.COMPLETE, feng.apps.Demo.init);
	preloader.load('global');
};
goog.inherits(feng.apps.Demo, goog.events.EventTarget);
goog.addSingletonGetter(feng.apps.Demo);


feng.apps.Demo.init = function() {

	var navigationController = feng.controllers.NavigationController.getInstance();
	var sectionController = feng.controllers.SectionController.getInstance();
	var pathfindingController = feng.controllers.view3d.PathfindingController.getInstance();
	var view3dController = feng.controllers.view3d.View3DController.getInstance();

	feng.controllers.NavigationController.Implementation = feng.controllers.NavigationController.HASH;
	navigationController.init();
	navigationController.setToken('home');
};