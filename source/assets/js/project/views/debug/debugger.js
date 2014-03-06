goog.provide('feng.views.debug.Debugger');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('feng.views.debug.Camera');
goog.require('feng.views.debug.Pathfinding');
goog.require('feng.views.debug.PathTrack');


/**
 * @constructor
 */
feng.views.debug.Debugger = function(){
  goog.base(this);

  this.domElement = goog.dom.getElement('debugger');
  this._bodyDom = goog.dom.query('ul', this.domElement)[0];
	this._displayButton = goog.dom.query('.button.display', this.domElement)[0];

  this._eventHandler = new goog.events.EventHandler(this);
	this._eventHandler.listen(this._displayButton, 'click', this.onClick, false, this);

	// optionally create debug views
	if(feng.views.debug.Debugger.Options.CAMERA) {
		this.cameraView = new feng.views.debug.Camera();
	}
	if(feng.views.debug.Debugger.Options.PATHFINDING) {
		this.pathfindingView = new feng.views.debug.Pathfinding();
	}
	if(feng.views.debug.Debugger.Options.PATH_TRACK) {
		this.pathTrackView = new feng.views.debug.PathTrack();
	}

	//
	this.hide();
};
goog.inherits(feng.views.debug.Debugger, goog.events.EventTarget);
goog.addSingletonGetter(feng.views.debug.Debugger);


feng.views.debug.Debugger.prototype.show = function() {
	
	goog.dom.classes.remove(this._displayButton, 'invisible');
	goog.style.showElement(this._bodyDom, true);
};


feng.views.debug.Debugger.prototype.hide = function() {

	goog.dom.classes.add(this._displayButton, 'invisible');
	goog.style.showElement(this._bodyDom, false);
};


feng.views.debug.Debugger.prototype.onClick = function(e) {
	switch(e.currentTarget) {
		case this._displayButton:
		if(!goog.dom.classes.has(this._displayButton, 'invisible')) {
			this.hide();
		}else {
			this.show();
		}
		break;

		default:
		break;
	}
};


feng.views.debug.Debugger.Options = {
	CAMERA: true,
	PATHFINDING: true,
	PATH_TRACK: false
};