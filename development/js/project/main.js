goog.provide('fengshui.main');

goog.require('goog.fx.anim');
goog.require('goog.dom');
goog.require('goog.style');
goog.require('soy');
goog.require('fengshui.templates.main');
goog.require('fengshui.controllers.NavigationController');

fengshui.Config = {};

fengshui.main = function( config ) {
	fengshui.Config = config;
	
	goog.fx.anim.setAnimationWindow(window);

	//fengshui.controllers.NavigationController.Implementation = fengshui.controllers.NavigationController.HASH;
	fengshui.main.controllers.navigationController.init();

	var helloWorld = soy.renderAsFragment(fengshui.templates.main.helloWorld);
	goog.dom.appendChild(document.body, helloWorld);
};

fengshui.main.controllers = {
	navigationController: fengshui.controllers.NavigationController.getInstance()
};

goog.exportProperty(window, 'fengshui', fengshui);
goog.exportProperty(fengshui, 'main', fengshui.main);