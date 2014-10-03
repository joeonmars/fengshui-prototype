goog.provide('feng.views.book.Book');

goog.require('goog.dom');
goog.require('goog.events.EventHandler');
goog.require('goog.object');
goog.require('feng.events');
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

	this._containerEl = goog.dom.getElement('main');
	goog.dom.appendChild(this._containerEl, this.domElement);

	this._closeButton = goog.dom.getElementByClass('close-button', this.domElement);

	//
	this._eventHandler = new goog.events.EventHandler( this );

	this.animateOut( true );
};
goog.inherits(feng.views.book.Book, goog.events.EventTarget);
goog.addSingletonGetter(feng.views.book.Book);


feng.views.book.Book.prototype.activate = function() {

	this._eventHandler.listen( this._closeButton, 'click', this.animateOut, false, this );
};


feng.views.book.Book.prototype.deactivate = function() {

	this._eventHandler.removeAll();
};


feng.views.book.Book.prototype.animateIn = function() {

	this.activate();

	goog.style.showElement(this.domElement, true);

	this.dispatchEvent( feng.events.EventType.OPEN );
};


feng.views.book.Book.prototype.animateOut = function( instant ) {

	this.deactivate();

	goog.style.showElement(this.domElement, false);

	//
	this.dispatchEvent( feng.events.EventType.CLOSE );
};