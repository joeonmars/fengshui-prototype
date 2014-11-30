goog.provide('feng.views.debug.DebugView');

goog.require('soy');
goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');


/**
 * @constructor
 */
feng.views.debug.DebugView = function(template, templateData){
  goog.base(this);

  this.parentDom = goog.dom.query('#debugger > ul')[0];

  var placeholderDom = goog.dom.createDom('div');
	var frag = soy.renderAsFragment(template, templateData);
	goog.dom.appendChild(placeholderDom, frag);

	this.domElement = goog.dom.getFirstElementChild(placeholderDom);
	goog.dom.appendChild(this.parentDom, this.domElement);

	this._bodyDom = goog.dom.getElementByClass('body', this.domElement);
	this._displayButton = goog.dom.query('.button.display', this.domElement)[0];

  this._eventHandler = new goog.events.EventHandler(this);
	this._eventHandler.listen(this._displayButton, 'click', this.onClick, false, this);

	feng.pubsub.subscribe(feng.PubSub.Topic.SHOW_VIEW3D, this.onView3DShow, this);
	feng.pubsub.subscribe(feng.PubSub.Topic.HIDE_VIEW3D, this.onView3DHide, this);
};
goog.inherits(feng.views.debug.DebugView, goog.events.EventTarget);


feng.views.debug.DebugView.prototype.show = function() {

	goog.dom.classes.remove(this._displayButton, 'invisible');
	goog.style.showElement(this._bodyDom, true);
};


feng.views.debug.DebugView.prototype.hide = function() {

	goog.dom.classes.add(this._displayButton, 'invisible');
	goog.style.showElement(this._bodyDom, false);
};


feng.views.debug.DebugView.prototype.onView3DShow = function(view3d) {

};


feng.views.debug.DebugView.prototype.onView3DHide = function(view3d) {

};


feng.views.debug.DebugView.prototype.onClick = function(e) {
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