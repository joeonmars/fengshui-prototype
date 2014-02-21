goog.provide('fengshui.controllers.SectionController');

goog.require('goog.events.EventTarget');
goog.require('goog.events');
goog.require('fengshui.views.sections.Home');

/**
 * @constructor
 */
fengshui.controllers.SectionController = function(){
  goog.base(this);

  this._sections = {};
  this._section = null;

  this._eventHandler = new goog.events.EventHandler(this);

  this.addSection('home');
};
goog.inherits(fengshui.controllers.SectionController, goog.events.EventTarget);
goog.addSingletonGetter(fengshui.controllers.SectionController);


fengshui.controllers.SectionController.prototype.init = function(){
  
  this.addSection('test');

  this._eventHandler.listen(this, fengshui.events.EventType.ANIMATE_IN, this.onSectionAnimateIn, false, this);
  this._eventHandler.listen(this, fengshui.events.EventType.ANIMATE_OUT, this.onSectionAnimateOut, false, this);
  this._eventHandler.listen(this, fengshui.events.EventType.ANIMATED_IN, this.onSectionAnimatedIn, false, this);
  this._eventHandler.listen(this, fengshui.events.EventType.ANIMATED_OUT, this.onSectionAnimatedOut, false, this);
};


fengshui.controllers.SectionController.prototype.getSection = function(id){
  
  return this._sections[id];
};


fengshui.controllers.SectionController.prototype.addSection = function(id){
  
	var section;

  switch(id) {
  	case 'home':
  	section = new fengshui.views.sections.Home;
  	break;
  }

  section.setParentEventTarget(this);
  section.init();

  return section;
};


fengshui.controllers.SectionController.prototype.onSectionAnimateIn = function(e){
  
	if(this._section) {
		this._section.animateOut();
	}

	this._section = e.target;
};


fengshui.controllers.SectionController.prototype.onSectionAnimateOut = function(e){
  
  
};


fengshui.controllers.SectionController.prototype.onSectionAnimatedIn = function(e){
  

};


fengshui.controllers.SectionController.prototype.onSectionAnimatedOut = function(e){

	if(this._section === e.target) {
		this._section = null;
	}
};