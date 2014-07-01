goog.provide('feng.views.book.Book');

goog.require('goog.dom');
goog.require('goog.events.EventHandler');
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

	this._mainEl = goog.dom.getElementByClass('main', this.domElement);
	this._shadeEl = goog.dom.getElementByClass('shade', this.domElement);

	this._navButtons = goog.dom.query('nav button', this.domElement);

	this._eventHandler = new goog.events.EventHandler( this );

	this.animateOut( true );

	this.animateIn();
};
goog.inherits(feng.views.book.Book, goog.events.EventTarget);
goog.addSingletonGetter(feng.views.book.Book);


feng.views.book.Book.prototype.activate = function() {

	goog.array.forEach(this._navButtons, function(navButton) {
		this._eventHandler.listen( navButton, 'click', this.onClickNavButton, false, this );
	}, this);
};


feng.views.book.Book.prototype.deactivate = function() {

	this._eventHandler.removeAll();
};


feng.views.book.Book.prototype.animateIn = function( instant ) {

	this.activate();

	goog.style.showElement(this.domElement, true);

	var duration = instant ? 0 : 1;

	TweenMax.to(this._shadeEl, duration, {
		'opacity': .8,
		'ease': Power3.easeInOut
	});

	TweenMax.to(this._mainEl, duration, {
		'y': 0,
		'rotationX': 0,
		'transformPerspective': 600,
		'ease': Power3.easeInOut
	});
};


feng.views.book.Book.prototype.animateOut = function( instant ) {

	this.deactivate();

	var duration = instant ? 0 : 1;

	TweenMax.to(this._shadeEl, duration, {
		'opacity': 0,
		'ease': Power4.easeInOut
	});

	var mainHeight = goog.style.getSize(this._containerEl).height * 1.2;

	TweenMax.to(this._mainEl, duration, {
		'y': mainHeight,
		'rotationX': 15,
		'transformPerspective': 600,
		'ease': Power4.easeInOut,
		'onComplete': function() {
			goog.style.showElement(this.domElement, false);
		},
		'onCompleteScope': this
	});
};


feng.views.book.Book.prototype.onClickNavButton = function( e ) {

	switch(e.currentTarget.getAttribute('data-id')) {
		case 'close':
		this.animateOut();
		break;

		case 'glossary':

		break;

		case 'tips':

		break;

		case 'help':

		break;

		case 'about':

		break;
	}
};