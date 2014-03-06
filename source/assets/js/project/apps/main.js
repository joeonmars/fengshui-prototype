goog.provide('feng.apps.Main');

goog.require('goog.dom');
goog.require('goog.fx');
goog.require('feng.templates.main');


feng.apps.Main = function() {

	goog.base(this);
	
	goog.fx.anim.setAnimationWindow(window);
	
};
goog.inherits(feng.apps.Main, goog.events.EventTarget);
goog.addSingletonGetter(feng.apps.Main);