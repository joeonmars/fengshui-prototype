goog.provide('fengshui.views.debug.DebugView');

goog.require('soy');
goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('fengshui.views.debug.Debugger');


/**
 * @constructor
 */
fengshui.views.debug.DebugView = function(template){
  goog.base(this);

  fengshui.views.debug.DebugView.DEBUGGER.init();

  this.parentDom = goog.dom.query('#debugger > ul')[0];

  var placeholderDom = goog.dom.createDom('div');
	var frag = soy.renderAsFragment(template);
	goog.dom.appendChild(placeholderDom, frag);

	this.domElement = goog.dom.getFirstElementChild(placeholderDom);
	goog.dom.appendChild(this.parentDom, this.domElement);

	this._bodyDom = goog.dom.getElementByClass('body', this.domElement);
	this._displayButton = goog.dom.query('.button.display', this.domElement)[0];

  this._eventHandler = new goog.events.EventHandler(this);
	this._eventHandler.listen(this._displayButton, 'click', this.onClick, false, this);
};
goog.inherits(fengshui.views.debug.DebugView, goog.events.EventTarget);


fengshui.views.debug.DebugView.prototype.show = function() {
	
	goog.dom.classes.addRemove(this._displayButton, 'fa-eye-slash', 'fa-eye');
	goog.style.showElement(this._bodyDom, true);
};


fengshui.views.debug.DebugView.prototype.hide = function() {

	goog.dom.classes.addRemove(this._displayButton, 'fa-eye', 'fa-eye-slash');
	goog.style.showElement(this._bodyDom, false);
};


fengshui.views.debug.DebugView.prototype.onClick = function(e) {
	switch(e.currentTarget) {
		case this._displayButton:
		if(goog.dom.classes.has(this._displayButton, 'fa-eye')) {
			this.hide();
		}else {
			this.show();
		}
		break;

		default:
		break;
	}
};


fengshui.views.debug.DebugView.DEBUGGER = fengshui.views.debug.Debugger.getInstance();