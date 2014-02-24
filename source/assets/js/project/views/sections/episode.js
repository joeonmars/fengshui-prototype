goog.provide('feng.views.sections.Episode');

goog.require('goog.dom');
goog.require('goog.events.EventTarget');
goog.require('feng.events');
goog.require('feng.views.sections.Section');
goog.require('feng.views.View3D');


/**
 * @constructor
 */
feng.views.sections.Episode = function(domElement){

  goog.base(this, domElement);

	// create view 3d
	var view3dContainer = goog.dom.query('.sceneContainer', this.domElement)[0];
	this._view3d = new feng.views.View3D( view3dContainer );
};
goog.inherits(feng.views.sections.Episode, feng.views.sections.Section);


feng.views.sections.Episode.prototype.init = function(){

	goog.base(this, 'init');

	this._view3d.init();
};


feng.views.sections.Episode.prototype.show = function(){

	goog.base(this, 'show');

	this._view3d.show();
};


feng.views.sections.Episode.prototype.hide = function(){

	goog.base(this, 'hide');

	this._view3d.hide();
};