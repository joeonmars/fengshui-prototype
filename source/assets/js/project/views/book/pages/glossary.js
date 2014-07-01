goog.provide('feng.views.book.pages.Glossary');

goog.require('feng.views.book.pages.Page');


feng.views.book.pages.Glossary = function( domElement ) {

	goog.base(this, domElement);
};
goog.inherits(feng.views.book.pages.Glossary, feng.views.book.pages.Page);


feng.views.book.pages.Glossary.prototype.activate = function() {

	goog.base(this, 'activate');
};


feng.views.book.pages.Glossary.prototype.animateIn = function() {

	goog.base(this, 'animateIn');
};


feng.views.book.pages.Glossary.prototype.animateOut = function( instant ) {

	goog.base(this, 'animateOut', instant);
};


feng.views.book.pages.Glossary.prototype.onResize = function( e ) {

	goog.base(this, 'onResize', e);
};