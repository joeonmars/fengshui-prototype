goog.provide('feng.views.book.Book');

goog.require('goog.dom');
goog.require('feng.models.achievements.Achievements');
goog.require('feng.templates.book');


feng.views.book.Book = function() {

	goog.base(this);
	
	var glossary = feng.models.Preload.getInstance().getAsset('global.fengshui-data')['glossary'];
	var tips = feng.models.achievements.Achievements.getInstance().getAllTips();

	this.domElement = soy.renderAsFragment(feng.templates.book.Book, {
		tips: tips,
		glossary: glossary
	});

	goog.style.showElement(this.domElement, false);

	goog.dom.appendChild(document.body, this.domElement);
};
goog.inherits(feng.views.book.Book, goog.events.EventTarget);
goog.addSingletonGetter(feng.views.book.Book);