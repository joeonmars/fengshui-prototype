goog.provide('fengshui.views.sections.Studio');

goog.require('goog.dom');
goog.require('fengshui.events');
goog.require('fengshui.views.sections.Episode');


/**
 * @constructor
 */
fengshui.views.sections.Studio = function(){

	var domElement = goog.dom.getElement('studio');
  goog.base(this, domElement);

};
goog.inherits(fengshui.views.sections.Studio, fengshui.views.sections.Episode);


fengshui.views.sections.Studio.prototype.init = function(){

	goog.base(this, 'init');

};


fengshui.views.sections.Studio.prototype.activate = function(){

	goog.base(this, 'activate');

};