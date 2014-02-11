goog.provide('fengshui.demo.main');

goog.require('goog.fx.anim');
goog.require('goog.dom');
goog.require('goog.style');
goog.require('soy');
goog.require('fengshui.templates');
goog.require('fengshui.controllers.NavigationController');
goog.require('fengshui.controllers.PathfindingController');
goog.require('fengshui.views.View3D');

fengshui.Config = {};

fengshui.demo.main = function( config ) {
	fengshui.Config = config;
	
	goog.fx.anim.setAnimationWindow(window);

	//fengshui.controllers.NavigationController.Implementation = fengshui.controllers.NavigationController.HASH;
	fengshui.demo.main.controllers.navigationController.init();

	var mainFrag = soy.renderAsFragment(fengshui.templates.Main, {
		debug: true
	});
	goog.dom.appendChild(document.body, mainFrag);

	fengshui.demo.main.controllers.pathfindingController.init();

	// create view 3d
	var view3dContainer = goog.dom.getElementByClass('view3dContainer');
	var view3d = new fengshui.views.View3D( view3dContainer );
	view3d.init();
};

fengshui.demo.main.controllers = {
	navigationController: fengshui.controllers.NavigationController.getInstance(),
	pathfindingController: fengshui.controllers.PathfindingController.getInstance()
};

goog.exportProperty(window, 'fengshui', fengshui);
goog.exportProperty(fengshui, 'main', fengshui.demo.main);