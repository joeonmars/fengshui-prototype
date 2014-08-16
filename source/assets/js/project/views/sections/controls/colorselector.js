goog.provide('feng.views.sections.controls.ColorSelector');

goog.require('goog.events');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.ColorSelector = function(domElement, lamp){

  goog.base(this, domElement);

	this._colorEls = goog.dom.getElementsByClass('color', this.domElement);

	this._lamp = lamp;
};
goog.inherits(feng.views.sections.controls.ColorSelector, feng.views.sections.controls.Controls);


feng.views.sections.controls.ColorSelector.prototype.activate = function(){

	goog.base(this, 'activate');

	goog.array.forEach(this._colorEls, function(colorEl) {
		this._eventHandler.listen(colorEl, 'click', this.onClickColor, false, this);
	}, this);

	this._lamp.startInteraction();
};


feng.views.sections.controls.ColorSelector.prototype.deactivate = function(){

	goog.base(this, 'deactivate');

	this._lamp.stopInteraction();
};


feng.views.sections.controls.ColorSelector.prototype.onClickColor = function(e) {

	var colorName = e.currentTarget.getAttribute("data-color");

	this._lamp.setColorByName( colorName );
};