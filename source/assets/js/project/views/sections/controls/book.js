goog.provide('feng.views.sections.controls.Book');

goog.require('goog.dom');
goog.require('goog.fx.Dragger');
goog.require('feng.events');
goog.require('feng.fx.AnimatedSprite');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.Book = function(domElement){
	
  goog.base(this, domElement);

  var iconEl = goog.dom.getElementByClass('icon', this.domElement);
  var img = feng.models.Preload.getInstance().getAsset('global.book');
  this._bookSprite = new feng.fx.AnimatedSprite(iconEl, img, 10, 3, 30);

	var prop = {
		progress: 0
	};

	this._bookTweener = TweenMax.fromTo(prop, .25, {
		progress: 0
	},{
		progress: 1,
		'paused': true,
		'ease': Linear.easeNone,
		'onUpdate': function() {
			this._bookSprite.setProgress( prop.progress );
		},
		'onUpdateScope': this
	});
};
goog.inherits(feng.views.sections.controls.Book, feng.views.sections.controls.Controls);


feng.views.sections.controls.Book.prototype.activate = function(){

	goog.base(this, 'activate');

	this._eventHandler.listen(this.domElement, 'mouseover', this.onMouseOver, false, this);
	this._eventHandler.listen(this.domElement, 'mouseout', this.onMouseOut, false, this);
};


feng.views.sections.controls.Book.prototype.onMouseOver = function(e){

	this._bookTweener.play();
};


feng.views.sections.controls.Book.prototype.onMouseOut = function(e){

	this._bookTweener.reverse();
};


feng.views.sections.controls.Book.prototype.onResize = function(e){

	var viewportSize = goog.dom.getViewportSize();
	goog.style.setPosition(this.domElement, viewportSize.width - 100 - 30, 140);
};


feng.views.sections.controls.Book.prototype.onModeChange = function(e){

  goog.base(this, 'onModeChange', e);

  switch(e.mode) {

    case feng.controllers.view3d.ModeController.Mode.CLOSE_UP:
	if(this._isActivated) {
		goog.style.showElement(this.domElement, false);
		this.deactivate();
	}
    break;

    default:
    if(!this._isActivated) {
		goog.style.showElement(this.domElement, true);
		this.activate();
    }
    break;
  }
};