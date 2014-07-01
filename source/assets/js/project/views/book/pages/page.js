goog.provide('feng.views.book.pages.Page');

goog.require('goog.dom');
goog.require('goog.events.EventHandler');


feng.views.book.pages.Page = function( domElement ) {

	this.domElement = domElement;
	this.id = this.domElement.getAttribute('data-id');

	this._shadeEl = goog.dom.getElementByClass('shade', this.domElement);

	this._containerSize = goog.style.getSize(this.domElement.parentNode);
	this._tweener = null;
	this._eventHandler = new goog.events.EventHandler(this);
};


feng.views.book.pages.Page.prototype.isTweening = function() {

	return this._tweener.isActive();
};


feng.views.book.pages.Page.prototype.activate = function() {

	this._eventHandler.listen(window, 'resize', this.onResize, false, this);

	this.onResize();
};


feng.views.book.pages.Page.prototype.deactivate = function() {

	this._eventHandler.removeAll();
};


feng.views.book.pages.Page.prototype.animateIn = function() {

	this.activate();

	var duration = .8;

	this._tweener = TweenMax.fromTo(this.domElement, duration, {
		'clip': 'rect(0px, ' + this._containerSize.width + 'px, ' + this._containerSize.height + 'px, ' + this._containerSize.width + 'px)'
	}, {
		'display': 'block',
		'clip': 'rect(0px, ' + this._containerSize.width + 'px, ' + this._containerSize.height + 'px, 0px)',
		'ease': Strong.easeInOut
	});

	TweenMax.fromTo(this._shadeEl, duration, {
		'display': 'block',
		'opacity': 1
	}, {
		'display': 'none',
		'opacity': 0,
		'force3D': 'auto',
		'ease': Strong.easeInOut
	});
};


feng.views.book.pages.Page.prototype.animateOut = function( instant ) {

	this.deactivate();

	var duration = instant ? 0 : .8;

	this._tweener = TweenMax.to(this.domElement, duration, {
		'display': 'none',
		'clip': 'rect(0px, 0px, ' + this._containerSize.height + 'px, 0px)',
		'ease': Strong.easeInOut
	});

	TweenMax.fromTo(this._shadeEl, duration, {
		'display': 'block',
		'opacity': 0
	}, {
		'display': 'none',
		'opacity': 1,
		'force3D': 'auto',
		'ease': Strong.easeInOut
	});
};


feng.views.book.pages.Page.prototype.onResize = function( e ) {

	this._containerSize = goog.style.getSize(this.domElement.parentNode);

	TweenMax.set(this.domElement, {
		'clip': 'rect(0px, ' + this._containerSize.width + 'px, ' + this._containerSize.height + 'px, 0px)'
	});
};