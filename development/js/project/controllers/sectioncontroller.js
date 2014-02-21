goog.provide('fengshui.controllers.SectionController');

goog.require('goog.events.EventTarget');
goog.require('goog.events');
goog.require('fengshui.views.sections.Home');
goog.require('fengshui.views.sections.Studio');

/**
 * @constructor
 */
fengshui.controllers.SectionController = function(){
  goog.base(this);

  this._sections = {};
  this._section = null;

  var homeSection = this.addSection('home');

  this._eventHandler = new goog.events.EventHandler(this);
  this._eventHandler.listenOnce(homeSection, fengshui.events.EventType.LOAD_COMPLETE, this.init, false, this);
};
goog.inherits(fengshui.controllers.SectionController, goog.events.EventTarget);
goog.addSingletonGetter(fengshui.controllers.SectionController);


fengshui.controllers.SectionController.prototype.init = function(){
  
  this.addSection('studio');
  
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

    case 'studio':
    section = new fengshui.views.sections.Studio;
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