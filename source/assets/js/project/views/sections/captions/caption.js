goog.provide('feng.views.sections.captions.Caption');

goog.require('goog.events.EventHandler');
goog.require('goog.async.Delay');
goog.require('feng.templates.captions');
goog.require('feng.utils.Utils');


/**
 * @constructor
 */
feng.views.sections.captions.Caption = function( object, cameraController, renderSize, controls, hud ){

  goog.base(this);

  this._object = object;
  this._cameraController = cameraController;
  this._renderSize = renderSize;
  this._controls = controls;
  this._hud = hud;

  this._eventHandler = new goog.events.EventHandler(this);

  this._template = this._template || feng.templates.captions.Caption;
  
  this._templateData = this._templateData || {
    tip: object.tip,
    position: 'right'
  };

  this._closeKeyId = null;

  this._close = goog.bind( this.close, this );

  // render HTML template
  this.domElement = soy.renderAsFragment(this._template, this._templateData);

  this._shadeEl = goog.dom.getElementByClass('shade', this.domElement);
  this._panelEl = goog.dom.getElementByClass('panel', this.domElement);

  this._closeButton = goog.dom.getElementByClass('close-button', this.domElement);
  this._panelButton = goog.dom.getElementByClass('panel-button', this.domElement);
  this._hintButton = goog.dom.getElementByClass('hint-button', this.domElement);
  this._interactionButton = goog.dom.getElementByClass('interaction-button', this.domElement);

  this._problemEl = goog.dom.getElementByClass('problem', this.domElement);
  this._hintEl = goog.dom.getElementByClass('hint', this.domElement);
  this._interactionEl = goog.dom.getElementByClass('interaction', this.domElement);
  this._adviceEl = goog.dom.getElementByClass('advice', this.domElement);
  this._shareEl = goog.dom.getElementByClass('share', this.domElement);
  this._shareButtons = goog.dom.query('a', this._shareEl);

  this._showPanelDelay = new goog.async.Delay(this.animateInPanel, 600, this);

  // set default status
  this._hasShownPanelOnce = false;
  this._isPanelAnimatedOut = true;
  goog.dom.classes.enable( this.domElement, 'hide-panel', this._isPanelAnimatedOut );

  // set elements status by tip
  this.updateStatus();
};
goog.inherits(feng.views.sections.captions.Caption, goog.events.EventTarget);


feng.views.sections.captions.Caption.prototype.show = function() {

  this.activate();

  goog.style.showElement( this.domElement, true );

  this.onResize();
};


feng.views.sections.captions.Caption.prototype.hide = function() {

  this.deactivate();

  goog.style.showElement( this.domElement, false );
};


feng.views.sections.captions.Caption.prototype.activate = function() {

  this._eventHandler.listen( this._closeButton, 'click', this.close, false, this );
  this._eventHandler.listen( this._panelButton, 'click', this.togglePanel, false, this );

  this._eventHandler.listen( this._hintButton, 'click', this.close, false, this );

  if(this._interactionButton) {
    this._eventHandler.listen( this._interactionButton, 'click', this.onClick, false, this );
  }
  
  // listen for unlock ready event from view3d object
  this._eventHandler.listen( this._object, feng.events.EventType.UNLOCK, this.updateStatus, false, this );
  this._eventHandler.listen( window, 'resize', this.onResize, false, this );

  // listen for share button click events
  goog.array.forEach(this._shareButtons, function(shareButton) {
    this._eventHandler.listen( shareButton, 'click', this.onClickShareButton, false, this );
  }, this);

  //
  this._closeKeyId = feng.keyboardController.bind( this._close, feng.keyboardController.key.ESC, true );

  this.updateStatus();

  if(!this._hasShownPanelOnce) {
    this._showPanelDelay.start();
  }
};


feng.views.sections.captions.Caption.prototype.deactivate = function() {

  this._showPanelDelay.stop();

  this._eventHandler.removeAll();

  feng.keyboardController.unbind( this._closeKeyId );

  this._object.stopInteraction();
};


feng.views.sections.captions.Caption.prototype.animateInPanel = function() {

  if(this._isPanelAnimatedOut) {

    this._isPanelAnimatedOut = false;
    this._hasShownPanelOnce = true;

  }else {

    return;
  }

  goog.dom.classes.enable(this.domElement, 'hide-panel', false);

  TweenMax.to( this._renderSize, .5, {
    ratioX: .7,
    'ease': Sine.easeInOut,
    'onUpdate': this._renderSize.update,
    'onUpdateScope': this._renderSize
  });
};


feng.views.sections.captions.Caption.prototype.animateOutPanel = function( shouldDoCloseWhenComplete ) {

  if(this._isPanelAnimatedOut) {

    return;
  }

  goog.dom.classes.enable(this.domElement, 'hide-panel', true);

  TweenMax.to( this._renderSize, .5, {
    ratioX: 1,
    'ease': Sine.easeInOut,
    'onUpdate': this._renderSize.update,
    'onUpdateScope': this._renderSize,
    'onComplete': this.onPanelAnimatedOut,
    'onCompleteParams': [shouldDoCloseWhenComplete],
    'onCompleteScope': this
  });
};


feng.views.sections.captions.Caption.prototype.togglePanel = function() {

  if(this._isPanelAnimatedOut) {
    this.animateInPanel();
  }else {
    this.animateOutPanel();
  }
};


feng.views.sections.captions.Caption.prototype.close = function() {

  this.doClose();
};


feng.views.sections.captions.Caption.prototype.doClose = function() {

  if(this._isPanelAnimatedOut) {

    this.onPanelAnimatedOut( true );

  }else {
    
    this.animateOutPanel( true );
  }
};


feng.views.sections.captions.Caption.prototype.unlock = function() {

  // trigger tip object to unlock
  this._object.unlock();
};


feng.views.sections.captions.Caption.prototype.updateStatus = function() {

  var tip = this._object.tip;

  var requiredTip = tip.getRequiredTip();
  var hasLockedRequiredTip = (requiredTip && !requiredTip.unlocked);
  goog.style.showElement( this._hintEl, hasLockedRequiredTip );

  if(this._interactionEl) {
    goog.style.showElement( this._interactionEl, !hasLockedRequiredTip );
  }

  if(!tip.problem || hasLockedRequiredTip) {
    goog.style.showElement( this._problemEl, false );
  }

  if(this._interactionButton) {
    goog.style.showElement( this._interactionButton, !tip.unlocked );
  }
  
  goog.style.showElement( this._adviceEl, tip.unlocked );
  goog.style.showElement( this._shareEl, tip.unlocked );

  if(tip.unlocked) {
    
    if(tip.problem) {
      goog.dom.classes.add( this._problemEl, 'closed' );
    }

    goog.dom.classes.remove( this._adviceEl, 'closed' );

    if(this._interactionEl) {
      goog.dom.classes.add( this._interactionEl, 'unlocked' );
    }
  }
};


feng.views.sections.captions.Caption.prototype.onPanelAnimatedOut = function( shouldDoClose ) {

  this._isPanelAnimatedOut = true;

  if(shouldDoClose) {

    this.dispatchEvent({
      type: feng.events.EventType.CLOSE
    });
  }
};


feng.views.sections.captions.Caption.prototype.onClick = function( e ) {

  switch(e.currentTarget) {
    case this._interactionButton:
    this._object.startInteraction();
    goog.dom.classes.add( this.domElement, 'minimized' );
    break;

    /*
    case this._changeButton:
    this._object.tip.unlock();
    break;

    case this._unlockButton:
    this.unlock();
    break;
    */
  }
};


feng.views.sections.captions.Caption.prototype.onClickShareButton = function( e ) {

  e.preventDefault();

  feng.utils.Utils.popUp( e.currentTarget.href );
};


feng.views.sections.captions.Caption.prototype.onResize = function( e ) {

  goog.style.setStyle( this._shadeEl, 'height', this._renderSize.height + 'px' );
  goog.style.setStyle( this._panelEl, 'height', this._renderSize.height + 'px' );
};