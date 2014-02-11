goog.provide('fengshui.views.debug.Debugger');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');


/**
 * @constructor
 */
fengshui.views.debug.Debugger = function(){
  goog.base(this);

  this._hasInitiated = false;
};
goog.inherits(fengshui.views.debug.Debugger, goog.events.EventTarget);
goog.addSingletonGetter(fengshui.views.debug.Debugger);


fengshui.views.debug.Debugger.prototype.init = function() {
	
	if(this._hasInitiated) return;
	else this._hasInitiated = true;

  this.domElement = goog.dom.getElement('debugger');
  this._bodyDom = goog.dom.query('ul', this.domElement)[0];
	this._displayButton = goog.dom.query('.button.display', this.domElement)[0];

  this._eventHandler = new goog.events.EventHandler(this);
	this._eventHandler.listen(this._displayButton, 'click', this.onClick, false, this);
};


fengshui.views.debug.Debugger.prototype.show = function() {
	
	goog.dom.classes.addRemove(this._displayButton, 'fa-eye-slash', 'fa-eye');
	goog.style.showElement(this._bodyDom, true);
};


fengshui.views.debug.Debugger.prototype.hide = function() {

	goog.dom.classes.addRemove(this._displayButton, 'fa-eye', 'fa-eye-slash');
	goog.style.showElement(this._bodyDom, false);
};


fengshui.views.debug.Debugger.prototype.onClick = function(e) {
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