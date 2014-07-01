goog.provide('feng.views.book.pages.Help');

goog.require('feng.views.book.pages.Page');


feng.views.book.pages.Help = function( domElement ) {

	goog.base(this, domElement);
};
goog.inherits(feng.views.book.pages.Help, feng.views.book.pages.Page);


feng.views.book.pages.Help.prototype.activate = function() {

	goog.base(this, 'activate');
};


feng.views.book.pages.Help.prototype.animateIn = function() {

	goog.base(this, 'animateIn');
};


feng.views.book.pages.Help.prototype.animateOut = function( instant ) {

	goog.base(this, 'animateOut', instant);
};


feng.views.book.pages.Help.prototype.onResize = function( e ) {

	goog.base(this, 'onResize', e);
};