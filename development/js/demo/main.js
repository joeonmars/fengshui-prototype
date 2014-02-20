goog.provide('fengshui.demo.main');

goog.require('goog.fx.anim');
goog.require('goog.dom');
goog.require('goog.style');
goog.require('soy');
goog.require('fengshui.templates.main');
goog.require('fengshui.controllers.NavigationController');
goog.require('fengshui.controllers.view3d.PathfindingController');
goog.require('fengshui.controllers.view3d.View3DController');
goog.require('fengshui.views.View3D');
goog.require('fengshui.views.debug.Debugger');

fengshui.Config = {};

fengshui.demo.main = function( config ) {
	fengshui.Config = config;
	
	goog.fx.anim.setAnimationWindow(window);

	var debug = fengshui.Config['debug'];

	var mainFrag = soy.renderAsFragment(fengshui.templates.main.Main, {
		debug: debug
	});
	goog.dom.appendChild(document.body, mainFrag);

	if(debug) {
		fengshui.views.debugger = fengshui.views.debug.Debugger.getInstance();
	}

	// create view 3d
	var view3dContainer = goog.dom.getElementByClass('view3dContainer');
	var view3d = new fengshui.views.View3D( view3dContainer );
	view3d.init();
	view3d.show();

	//fengshui.controllers.NavigationController.Implementation = fengshui.controllers.NavigationController.HASH;
	fengshui.demo.main.controllers.navigationController.init();
};

fengshui.demo.main.views = {
};

fengshui.demo.main.controllers = {
	navigationController: fengshui.controllers.NavigationController.getInstance(),
	pathfindingController: fengshui.controllers.view3d.PathfindingController.getInstance(),
	view3dContainer: fengshui.controllers.view3d.View3DController.getInstance()
};

goog.exportProperty(window, 'fengshui', fengshui);
goog.exportProperty(fengshui, 'main', fengshui.demo.main);