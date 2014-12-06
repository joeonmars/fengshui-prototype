goog.provide('feng.views.sections.controls.HomeButton');

goog.require('goog.dom');
goog.require('feng.events');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.HomeButton = function(domElement){
	
  goog.base(this, domElement);

  this._promptShown = false;
  this._promptEl = goog.dom.getElementByClass('home-button-prompt', this.domElement.parentNode);

  this._yesButtonEl = goog.dom.getElementByClass('yes', this._promptEl);
  this._noButtonEl = goog.dom.getElementByClass('no', this._promptEl);
};
goog.inherits(feng.views.sections.controls.HomeButton, feng.views.sections.controls.Controls);


feng.views.sections.controls.HomeButton.prototype.activate = function(){

  var shouldActivate = goog.base(this, 'activate');

  if(!shouldActivate) return;

  this._eventHandler.listen( document.body, 'mousedown', this.onMouseDown, false, this );
  this._eventHandler.listen( this._noButtonEl, 'click', this.hidePrompt, false, this );
};


feng.views.sections.controls.HomeButton.prototype.deactivate = function(){

  var shouldDeactivate = goog.base(this, 'deactivate');
  
  if(!shouldDeactivate) return;

  this.hidePrompt();
};


feng.views.sections.controls.HomeButton.prototype.showPrompt = function(){

	this._promptShown = true;

	goog.dom.classes.add( this.domElement, 'pending' );
	goog.dom.classes.add( this._promptEl, 'shown' );

	feng.pubsub.publish( feng.PubSub.Topic.SHOW_WIDGET, this );
};


feng.views.sections.controls.HomeButton.prototype.hidePrompt = function(){

	this._promptShown = false;

	goog.dom.classes.remove( this.domElement, 'pending' );
	goog.dom.classes.remove( this._promptEl, 'shown' );

	feng.pubsub.publish( feng.PubSub.Topic.HIDE_WIDGET, this );
};


feng.views.sections.controls.HomeButton.prototype.onMouseDown = function(e){

	var isClickedOnHomeButton = goog.dom.contains( this.domElement, e.target );
	var isClickedOnPrompt = goog.dom.contains( this._promptEl, e.target );

	var isClickedOutside = (!isClickedOnHomeButton && !isClickedOnPrompt);
	
	if(isClickedOutside && this._promptShown) {

		this.hidePrompt();
		return false;
	}

	if(isClickedOnHomeButton) {
		
		if(this._promptShown) {

			this.hidePrompt();

		}else {

			this.showPrompt();
		}
	}
};