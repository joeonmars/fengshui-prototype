goog.provide('fengshui.views.sections.Episode');

goog.require('goog.dom');
goog.require('goog.events.EventTarget');
goog.require('fengshui.events');
goog.require('fengshui.views.sections.Section');
goog.require('fengshui.views.View3D');


/**
 * @constructor
 */
fengshui.views.sections.Episode = function(domElement){

  goog.base(this, domElement);

	// create view 3d
	var view3dContainer = goog.dom.query('.sceneContainer', this.domElement)[0];
	this._view3d = new fengshui.views.View3D( view3dContainer );
};
goog.inherits(fengshui.views.sections.Episode, fengshui.views.sections.Section);


fengshui.views.sections.Episode.prototype.init = function(){

	goog.base(this, 'init');

	this._view3d.init();
};


fengshui.views.sections.Episode.prototype.show = function(){

	goog.base(this, 'show');

	this._view3d.show();
};


fengshui.views.sections.Episode.prototype.hide = function(){

	goog.base(this, 'hide');

	this._view3d.hide();
};