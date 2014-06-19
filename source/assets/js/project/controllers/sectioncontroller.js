goog.provide('feng.controllers.SectionController');

goog.require('goog.events.EventTarget');
goog.require('goog.events');
goog.require('feng.views.sections.Home');
goog.require('feng.views.sections.Studio');

/**
 * @constructor
 */
feng.controllers.SectionController = function(){
  goog.base(this);

  this._sections = {};
  this._section = null;

  var homeSection = this.addSection('home');

  this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.controllers.SectionController, goog.events.EventTarget);
goog.addSingletonGetter(feng.controllers.SectionController);


feng.controllers.SectionController.prototype.init = function(){
  
  this.addSection('studio');
  
  this._eventHandler.listen(this, feng.events.EventType.ANIMATE_IN, this.onSectionAnimateIn, false, this);
  this._eventHandler.listen(this, feng.events.EventType.ANIMATE_OUT, this.onSectionAnimateOut, false, this);
  this._eventHandler.listen(this, feng.events.EventType.ANIMATED_IN, this.onSectionAnimatedIn, false, this);
  this._eventHandler.listen(this, feng.events.EventType.ANIMATED_OUT, this.onSectionAnimatedOut, false, this);
};


feng.controllers.SectionController.prototype.getSection = function(id){
  
  return this._sections[id];
};


feng.controllers.SectionController.prototype.addSection = function(id){
  
	var section;

  switch(id) {
  	case 'home':
  	section = new feng.views.sections.Home;
  	break;

    case 'studio':
    section = new feng.views.sections.Studio;
    break;
  }

  section.setParentEventTarget(this);
  section.init();

  return section;
};


feng.controllers.SectionController.prototype.onSectionAnimateIn = function(e){
  
	if(this._section) {
		this._section.animateOut();
	}

	this._section = e.target;
};


feng.controllers.SectionController.prototype.onSectionAnimateOut = function(e){
  
  
};


feng.controllers.SectionController.prototype.onSectionAnimatedIn = function(e){
  

};


feng.controllers.SectionController.prototype.onSectionAnimatedOut = function(e){

	if(this._section === e.target) {
		this._section = null;
	}
};