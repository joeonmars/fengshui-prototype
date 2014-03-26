goog.provide('feng.views.sections.controls.ProgressBar');

goog.require('goog.events');
goog.require('feng.models.achievements.Achievements');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.ProgressBar = function(domElement, eventMediator){

  goog.base(this, domElement);

  this._eventMediator = eventMediator;

  this._innerEl = goog.dom.query('.inner', this.domElement)[0];
  this._tipEls = goog.dom.query('.tips > li', this.domElement);

  // fetch tip models
  this._tips = {};
  
  var achievements = feng.models.achievements.Achievements.getInstance();

  goog.array.forEach(this._tipEls, function(tipEl) {

		var tipId = tipEl.getAttribute('data-tip-id');
		var viewId = tipEl.getAttribute('data-view-id');
		var sectionId = tipEl.getAttribute('data-section-id');
		
		this._tips[ tipId ] = achievements.getTip(tipId, viewId, sectionId);
  }, this);

  // arrange tips positions
  var numTips = this._tipEls.length;
  var tipHalfWidth = goog.style.getSize(this._tipEls[0]).width / 2;
  var distance = goog.style.getSize(this._innerEl).width / (numTips + 1);

  for(var i = 0; i < numTips; ++i) {
  	goog.style.setStyle(this._tipEls[i], 'left', distance * (i + 1) - tipHalfWidth + 'px');
  }
};
goog.inherits(feng.views.sections.controls.ProgressBar, feng.views.sections.controls.Controls);


feng.views.sections.controls.ProgressBar.prototype.activate = function(){

	goog.base(this, 'activate');

	this._eventMediator.listen(this, feng.events.EventType.CHANGE);
	//this._eventHandler.listen(this._eventMediator.getEventTarget(), feng.events.EventType.PROGRESS, this.onMediatorEvent, false, this);

	goog.array.forEach(this._tipEls, function(tipEl) {
		this._eventHandler.listen(tipEl, 'click', this.onClickTip, false, this);
	}, this);
};


feng.views.sections.controls.ProgressBar.prototype.onClickTip = function(e){

	var tipId = e.currentTarget.getAttribute('data-tip-id');
	var tip = this._tips[tipId];
	
	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		tip: tip
	});
};


feng.views.sections.controls.ProgressBar.prototype.onMediatorEvent = function(e){

	switch(e.type) {
		case feng.events.EventType.PROGRESS:
		break;
	};
};


feng.views.sections.controls.ProgressBar.prototype.onResize = function(e){

	goog.base(this, 'onResize', e);

	var mainSize = goog.style.getSize( goog.dom.getElement('main') );
	var innerElSize = goog.style.getSize( this._innerEl );

	goog.style.setStyle(this.domElement, 'top', mainSize.height - innerElSize.height - 60 + 'px');
};