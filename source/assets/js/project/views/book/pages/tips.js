goog.provide('feng.views.book.pages.Tips');

goog.require('feng.views.book.pages.Page');


feng.views.book.pages.Tips = function( domElement ) {

	goog.base(this, domElement);
};
goog.inherits(feng.views.book.pages.Tips, feng.views.book.pages.Page);


feng.views.book.pages.Tips.prototype.activate = function() {

	goog.base(this, 'activate');
};


feng.views.book.pages.Tips.prototype.animateIn = function() {

	goog.base(this, 'animateIn');
};


feng.views.book.pages.Tips.prototype.animateOut = function( instant ) {

	goog.base(this, 'animateOut', instant);
};


feng.views.book.pages.Tips.prototype.onResize = function( e ) {

	goog.base(this, 'onResize', e);
};