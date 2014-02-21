goog.provide('fengshui.demo.main');

goog.require('goog.fx.anim');
goog.require('goog.dom');
goog.require('goog.style');
goog.require('soy');
goog.require('fengshui.templates.main');
goog.require('fengshui.controllers.NavigationController');
goog.require('fengshui.controllers.view3d.PathfindingController');
goog.require('fengshui.controllers.view3d.View3DController');
goog.require('fengshui.controllers.SectionController');
goog.require('fengshui.views.debug.Debugger');


fengshui.demo.main = function( config ) {
	
	fengshui.Config = config;
	
	goog.fx.anim.setAnimationWindow(window);

	var debug = fengshui.Config['debug'];

	var mainFrag = soy.renderAsFragment(fengshui.templates.main.Main, {
		debug: debug
	});
	goog.dom.appendChild(document.body, mainFrag);

	if(debug) fengshui.views.debug.Debugger.getInstance();

	var navigationController = fengshui.controllers.NavigationController.getInstance();
	var sectionController = fengshui.controllers.SectionController.getInstance();
	var pathfindingController = fengshui.controllers.view3d.PathfindingController.getInstance();
	var view3dController = fengshui.controllers.view3d.View3DController.getInstance();

	fengshui.controllers.NavigationController.Implementation = fengshui.controllers.NavigationController.HASH;
	navigationController.init();
	navigationController.setToken('home');
};


fengshui.Config = {};


goog.exportProperty(window, 'fengshui', fengshui);
goog.exportProperty(fengshui, 'main', fengshui.demo.main);