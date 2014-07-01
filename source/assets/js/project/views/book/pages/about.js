goog.provide('feng.views.book.pages.About');

goog.require('feng.views.book.pages.Page');


feng.views.book.pages.About = function( domElement ) {

	goog.base(this, domElement);
};
goog.inherits(feng.views.book.pages.About, feng.views.book.pages.Page);


feng.views.book.pages.About.prototype.activate = function() {

	goog.base(this, 'activate');
};


feng.views.book.pages.About.prototype.animateIn = function() {

	goog.base(this, 'animateIn');
};


feng.views.book.pages.About.prototype.animateOut = function( instant ) {

	goog.base(this, 'animateOut', instant);
};


feng.views.book.pages.About.prototype.onResize = function( e ) {

	goog.base(this, 'onResize', e);
};