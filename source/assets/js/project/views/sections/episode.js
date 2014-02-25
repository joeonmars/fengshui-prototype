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

  this._view3d = null;
};
goog.inherits(feng.views.sections.Episode, feng.views.sections.Section);


feng.views.sections.Episode.prototype.init = function(){

	goog.base(this, 'init');
};


feng.views.sections.Episode.prototype.show = function(){

	goog.base(this, 'show');

	if(this._view3d) {
		this._view3d.show();
	}
};


feng.views.sections.Episode.prototype.hide = function(){

	goog.base(this, 'hide');

	if(this._view3d) {
		this._view3d.hide();
	}
};


feng.views.sections.Episode.prototype.onLoadComplete = function(e){

	goog.base(this, 'onLoadComplete', e);

	if(!this._view3d) {
		// create view 3d
		var view3dContainer = goog.dom.query('.sceneContainer', this.domElement)[0];
		this._view3d = new feng.views.View3D( view3dContainer, this.id );
		this._view3d.init();
		this._view3d.show();
	}
};