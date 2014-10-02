goog.provide('feng.views.sections.Outro');

goog.require('goog.dom');
goog.require('feng.events');
goog.require('feng.views.sections.Section');
goog.require('feng.controllers.SectionController');


/**
 * @constructor
 */
feng.views.sections.Outro = function(){

	var domElement = goog.dom.getElement('outro');
  goog.base(this, domElement);
  
};
goog.inherits(feng.views.sections.Outro, feng.views.sections.Section);


feng.views.sections.Outro.prototype.init = function(){

	goog.base(this, 'init');
};


feng.views.sections.Outro.prototype.activate = function(){

	goog.base(this, 'activate');

};


feng.views.sections.Outro.prototype.deactivate = function(){

	goog.base(this, 'deactivate');

};