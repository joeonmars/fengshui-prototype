goog.provide('feng.apps.Test');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.fx.anim');
goog.require('goog.text.LoremIpsum');
goog.require('feng.fx.FloatText');


feng.apps.Test = function() {

	goog.base(this);
	
	goog.fx.anim.setAnimationWindow(window);

	var lorem = new goog.text.LoremIpsum().generateParagraph();
	var floatText = new feng.fx.FloatText( lorem, 40, 10 );
	floatText.animateIn();

	goog.events.listenOnce(document.body, 'click', function() {
		floatText.animateOut();
	});

};
goog.inherits(feng.apps.Test, goog.events.EventTarget);
goog.addSingletonGetter(feng.apps.Test);