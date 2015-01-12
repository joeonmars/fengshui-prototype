goog.provide('feng.views.helpers.Helpers');

goog.require('feng.templates.common');
goog.require('feng.views.helpers.CompassHelper');
goog.require('feng.views.helpers.SelectorHelper');
goog.require('feng.views.helpers.WalkHelper');

/**
 * @constructor
 */
feng.views.helpers.Helpers = function(){

  goog.base(this);

  this.domElement = soy.renderAsFragment(feng.templates.common.Helpers);

  var compassHelperEl = goog.dom.getElementByClass('compass', this.domElement);
  this._compassHelper = new feng.views.helpers.CompassHelper( compassHelperEl );
  this._compassHelper.setParentEventTarget( this );

  var selectorHelperEl = goog.dom.getElementByClass('selector', this.domElement);
  this._selectorHelper = new feng.views.helpers.SelectorHelper( selectorHelperEl );
  this._selectorHelper.setParentEventTarget( this );

  var walkHelperEl = goog.dom.getElementByClass('walk', this.domElement);
  this._walkHelper = new feng.views.helpers.WalkHelper( walkHelperEl );
  this._walkHelper.setParentEventTarget( this );

  this._numCompletedHelpers = 0;
  this._totalHelpers = 3;

  this._isActivated = false;
};
goog.inherits(feng.views.helpers.Helpers, goog.events.EventTarget);
goog.addSingletonGetter(feng.views.helpers.Helpers);


feng.views.helpers.Helpers.prototype.disposeInternal = function() {

  goog.base(this, 'disposeInternal');

  this.deactivate();

  this._compassHelper.dispose();
  this._selectorHelper.dispose();
  this._walkHelper.dispose();

  this._compassHelper = null;
  this._selectorHelper = null;
  this._walkHelper = null;

  if(this.domElement.parentNode) {
    goog.dom.removeNode( this.domElement );
  }

  this.domElement = null;
};


feng.views.helpers.Helpers.prototype.activate = function() {

  if(this.isDisposed()) {
    return;
  }

  if(this._isActivated) {
    return;
  }else {
    this._isActivated = true;
  }

  goog.events.listen( this, feng.events.EventType.COMPLETE, this.onHelperComplete, false, this );

  if(!this._compassHelper.isCompleted) {
    this._compassHelper.activate();
  }

  if(!this._selectorHelper.isCompleted) {
    this._selectorHelper.activate();
  }

  if(!this._walkHelper.isCompleted) {
    this._walkHelper.activate();
  }
};


feng.views.helpers.Helpers.prototype.deactivate = function() {

  if(this.isDisposed()) {
    return;
  }
  
  if(!this._isActivated) {
    return;
  }else {
    this._isActivated = false;
  }

  goog.events.unlisten( this, feng.events.EventType.COMPLETE, this.onHelperComplete, false, this );

  this._compassHelper.deactivate();
  this._selectorHelper.deactivate();
  this._walkHelper.deactivate();
};


feng.views.helpers.Helpers.prototype.show = function( shouldShow ){

  var shouldShow = goog.isBoolean(shouldShow) ? shouldShow : true;

  goog.dom.classlist.enable( this.domElement, 'hidden', !shouldShow );
  
  if(!shouldShow) {

    this._compassHelper.hide();
    this._selectorHelper.hide();
    this._walkHelper.hide();
  }
};


feng.views.helpers.Helpers.prototype.onHelperComplete = function(e) {

  this._numCompletedHelpers ++;

  if(this._numCompletedHelpers === this._totalHelpers) {
    this.dispose();
  }
};