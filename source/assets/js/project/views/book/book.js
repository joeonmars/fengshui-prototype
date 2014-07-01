goog.provide('feng.views.book.Book');

goog.require('goog.dom');
goog.require('goog.events.EventHandler');
goog.require('feng.events');
goog.require('feng.models.achievements.Achievements');
goog.require('feng.templates.book');
goog.require('feng.views.book.pages.About');
goog.require('feng.views.book.pages.Glossary');
goog.require('feng.views.book.pages.Help');
goog.require('feng.views.book.pages.Tips');


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

	// create pages from elements
	this._pages = {};

	var pageEls = goog.dom.query('.pages section', this.domElement);
	
	var pageClass = {
		'about': feng.views.book.pages.About,
		'glossary': feng.views.book.pages.Glossary,
		'help': feng.views.book.pages.Help,
		'tips': feng.views.book.pages.Tips
	};

	goog.array.forEach(pageEls, function(pageEl) {
		var id = pageEl.getAttribute('data-id');
		var page = new pageClass[id]( pageEl );
		page.animateOut( true );
		this._pages[page.id] = page;
	}, this);

	this._page = this._pages['glossary'];

	this._animateInPageDelay = new goog.async.Delay(goog.bind(function() {
		this._page.animateIn();
	}, this), 800, this);

	//
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


feng.views.book.Book.prototype.animateIn = function() {

	this.activate();

	goog.style.showElement(this.domElement, true);

	var duration = 1;

	TweenMax.to(this._shadeEl, duration, {
		'opacity': .8,
		'ease': Power3.easeInOut
	});

	TweenMax.to(this._mainEl, duration, {
		'y': 0,
		'rotationX': 0,
		'rotationY': 0,
		'transformPerspective': 600,
		'ease': Power3.easeInOut
	});

	// animate in page
	this._page.animateOut( true );
	this._animateInPageDelay.start();

	//
	this.dispatchEvent( feng.events.EventType.OPEN );
};


feng.views.book.Book.prototype.animateOut = function( instant ) {

	this.deactivate();

	var duration = instant ? 0 : 1;

	TweenMax.to(this._shadeEl, duration, {
		'opacity': 0,
		'ease': Power3.easeInOut
	});

	var mainHeight = goog.style.getSize(this._containerEl).height * 1.2;

	TweenMax.to(this._mainEl, duration, {
		'y': mainHeight,
		'rotationX': 15,
		'rotationY': -5,
		'transformPerspective': 600,
		'ease': Power3.easeInOut,
		'onComplete': function() {
			goog.style.showElement(this.domElement, false);
		},
		'onCompleteScope': this
	});

	// animate out page
	this._animateInPageDelay.stop();

	//
	this.dispatchEvent( feng.events.EventType.CLOSE );
};


feng.views.book.Book.prototype.gotoPage = function( id ) {

	var lastPage = this._page;
	lastPage.animateOut();

	this._page = this._pages[ id ];
	this._page.animateIn();
};


feng.views.book.Book.prototype.onClickNavButton = function( e ) {

	var id = e.currentTarget.getAttribute('data-id');
	switch(id) {
		case 'close':
		this.animateOut();
		break;

		default:
		if(this._page.isTweening() || id === this._page.id) {
			return false;
		}else {
			this.gotoPage( id );
		}
		break;
	}
};