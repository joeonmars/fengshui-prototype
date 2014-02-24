goog.provide('feng.views.sections.Studio');

goog.require('goog.dom');
goog.require('feng.events');
goog.require('feng.views.sections.Episode');


/**
 * @constructor
 */
feng.views.sections.Studio = function(){

	var domElement = goog.dom.getElement('studio');
  goog.base(this, domElement);

};
goog.inherits(feng.views.sections.Studio, feng.views.sections.Episode);


feng.views.sections.Studio.prototype.init = function(){

	goog.base(this, 'init');

};


feng.views.sections.Studio.prototype.activate = function(){

	goog.base(this, 'activate');

};