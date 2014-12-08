goog.provide('feng.views.sections.captions.Caption');

goog.require('goog.events.EventHandler');
goog.require('feng.templates.captions');
goog.require('feng.utils.Utils');
goog.require('feng.fx.ScrollBar');


/**
 * @constructor
 */
feng.views.sections.captions.Caption = function( object, renderController, renderSize, controls, hud ){

  goog.base(this);

  this._object = object;
  this._renderController = renderController;
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

  this._panelEl = goog.dom.getElementByClass('panel', this.domElement);
  this._scrollerInnerEl = goog.dom.getElementByClass('scroller-inner', this.domElement);

  this._closeButton = goog.dom.getElementByClass('close-button', this.domElement);
  this._panelButton = goog.dom.getElementByClass('panel-button', this.domElement);
  this._hintButton = goog.dom.getElementByClass('hint-button', this.domElement);
  this._promptButton = goog.dom.getElementByClass('prompt-button', this.domElement);

  this._problemSection = goog.dom.getElementByClass('problem', this.domElement);
  this._hintSection = goog.dom.getElementByClass('hint', this.domElement);
  this._interactionSection = goog.dom.getElementByClass('interaction', this.domElement);
  this._adviceSection = goog.dom.getElementByClass('advice', this.domElement);

  this._sections = goog.array.filter([
      this._hintSection,
      this._problemSection,
      this._interactionSection,
      this._adviceSection
    ], function(section) {
      return goog.isDefAndNotNull(section);
    });

  this._section = null;

  this.scrollBars = goog.array.map(this._sections, function(section) {
    var scrollerEl = goog.dom.getElementByClass('inner-scroller', section);
    var scrollBarEl = goog.dom.getElementByClass('scrollbar', section);
    var scrollBar = new feng.fx.ScrollBar( scrollBarEl, scrollerEl );
    return scrollBar;
  });

  this.scrollBar = null;

  this._shareEl = goog.dom.getElementByClass('share', this.domElement);
  this._shareButtons = goog.dom.query('a', this._shareEl);

  this._sectionTweener = null;

  // set default status
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

  this._section = null;

  if(this._isPanelAnimatedOut) {

    goog.style.showElement( this.domElement, false );

  }else {

    this.animateOutPanel( false, true );
  }
};


feng.views.sections.captions.Caption.prototype.activate = function() {

  this._eventHandler.listen( this._closeButton, 'click', this.close, false, this );
  this._eventHandler.listen( this._panelButton, 'click', this.togglePanel, false, this );
  
  // listen for unlock ready event from view3d object
  this._eventHandler.listen( this._object, feng.events.EventType.UNLOCK, this.updateStatus, false, this );
  this._eventHandler.listen( window, 'resize', this.onResize, false, this );

  // listen for object camera animated in event to animate in panel
  this._eventHandler.listen( this._object, feng.events.EventType.ANIMATED_IN, this.animateInPanel, false, this );

  // listen for object interaction start/end
  this._eventHandler.listen( this._object, feng.events.EventType.START, this.onInteractionStart, false, this );
  this._eventHandler.listen( this._object, feng.events.EventType.END, this.onInteractionEnd, false, this );

  // listen for share button click events
  goog.array.forEach(this._shareButtons, function(shareButton) {
    this._eventHandler.listen( shareButton, 'click', this.onClickShareButton, false, this );
  }, this);

  //
  this._closeKeyId = feng.keyboardController.bind( this._close, feng.keyboardController.key.ESC, true );

  goog.style.showElement(this._panelButton, false);

  this.enableCloseButton( false );

  this.updateStatus();
};


feng.views.sections.captions.Caption.prototype.deactivate = function() {

  this._eventHandler.removeAll();

  feng.keyboardController.unbind( this._closeKeyId );

  this._object.stopInteraction();

  goog.array.forEach(this.scrollBars, function(scrollBar) {
    scrollBar.deactivate();
  });
};


feng.views.sections.captions.Caption.prototype.enableCloseButton = function( enabled ) {

  this._closeButton.disabled = goog.isBoolean(enabled) ? !enabled : false;
};


feng.views.sections.captions.Caption.prototype.enableHintSection = function( shouldEnable ) {

  if(shouldEnable) {

    this._eventHandler.listen( this._hintButton, 'click', this.close, false, this );

  }else {

    this._eventHandler.unlisten( this._hintButton, 'click', this.close, false, this );
  }
};


feng.views.sections.captions.Caption.prototype.enableProblemSection = function( shouldEnable ) {

  if(shouldEnable) {

    this._eventHandler.listen( this._promptButton, 'click', this.onClick, false, this );

  }else {

    this._eventHandler.unlisten( this._promptButton, 'click', this.onClick, false, this );
  }
};


feng.views.sections.captions.Caption.prototype.enableInteractionSection = function( shouldEnable ) {

  this._object.startInteraction();
};


feng.views.sections.captions.Caption.prototype.enableAdviceSection = function( shouldEnable ) {

};


feng.views.sections.captions.Caption.prototype.getSectionX = function( section ) {

  return goog.array.indexOf( this._sections, section ) * goog.style.getSize(this._scrollerInnerEl).width;
};


feng.views.sections.captions.Caption.prototype.gotoSection = function( section, instant ) {

  if(this._section === section) {
    return;
  }else {
    this._section = section;
  }

  if(this.scrollBar) {
    this.scrollBar.deactivate();
  }

  this.scrollBar = this.scrollBars[ goog.array.indexOf(this._sections, section) ];
  this.scrollBar.activate();

  var fromSection = this._section;
  var toSection = section;

  var duration = instant ? 0 : .25;

  this._sectionTweener = TweenMax.to(this._scrollerInnerEl, duration, {
    'x': - this.getSectionX( toSection ),
    'ease': Quad.easeOut,
    'onStart': this.onScrollFromSection,
    'onStartParams': [fromSection],
    'onStartScope': this,
    'onComplete': this.onScrolledToSection,
    'onCompleteParams': [toSection],
    'onCompleteScope': this
  });
};


feng.views.sections.captions.Caption.prototype.onScrollFromSection = function( fromSection ) {

  if(!fromSection) {

    return;
  }

  goog.dom.classes.addRemove( fromSection, 'animate-in', 'animate-out' );

  switch(fromSection) {

    case this._interactionSection:
    this.enableInteractionSection( false );
    break;

    case this._hintSection:
    this.enableHintSection( false );
    break;

    case this._problemSection:
    this.enableProblemSection( false );
    break;

    case this._adviceSection:
    this.enableAdviceSection( false );
    break;
  }
};


feng.views.sections.captions.Caption.prototype.onScrolledToSection = function( toSection ) {

  if(!this._isPanelAnimatedOut) {
    goog.dom.classes.addRemove( toSection, 'animate-out', 'animate-in' );
  }

  switch(toSection) {

    case this._interactionSection:
    this.enableInteractionSection( true );
    break;

    case this._hintSection:
    this.enableHintSection( true );
    break;

    case this._problemSection:
    this.enableProblemSection( true );
    break;

    case this._adviceSection:
    this.enableAdviceSection( true );
    break;
  }
};


feng.views.sections.captions.Caption.prototype.animateInPanel = function() {

  if(this._isPanelAnimatedOut) {

    this._isPanelAnimatedOut = false;

  }else {

    return;
  }

  goog.style.showElement(this._panelButton, true);

  this.enableCloseButton( true );

  goog.dom.classes.enable(this.domElement, 'hide-panel', false);

  goog.dom.classes.addRemove(this._panelEl, 'animate-out', 'animate-in' );

  if(this._section) {
    goog.dom.classes.addRemove( this._section, 'animate-out', 'animate-in' );
  } 

  TweenMax.to( this._renderController, .5, {
    globalBrightness: -.15,
    globalContrast: -.15,
    'ease': Sine.easeInOut
  });

  TweenMax.to( this._renderSize, .5, {
    ratioX: .7,
    'ease': Sine.easeInOut,
    'onUpdate': this._renderSize.update,
    'onUpdateScope': this._renderSize
  });
};


feng.views.sections.captions.Caption.prototype.animateOutPanel = function( shouldDoCloseWhenComplete, shouldHideWhenComplete ) {

  if(this._isPanelAnimatedOut) {

    return;
  }

  goog.dom.classes.enable(this.domElement, 'hide-panel', true);

  goog.dom.classes.addRemove(this._panelEl, 'animate-in', 'animate-out' );

  if(this._section) {
    goog.dom.classes.addRemove( this._section, 'animate-in', 'animate-out' );
  } 

  TweenMax.to( this._renderController, .5, {
    globalBrightness: 0,
    globalContrast: 0,
    'ease': Sine.easeInOut
  });

  TweenMax.to( this._renderSize, .5, {
    ratioX: 1,
    'ease': Sine.easeInOut,
    'onUpdate': this._renderSize.update,
    'onUpdateScope': this._renderSize,
    'onComplete': this.onPanelAnimatedOut,
    'onCompleteParams': [shouldDoCloseWhenComplete, shouldHideWhenComplete],
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

  this.animateInPanel();
};


feng.views.sections.captions.Caption.prototype.updateStatus = function() {

  // check if should go hint section
  var tip = this._object.tip;

  var requiredTip = tip.getRequiredTip();
  var hasLockedRequiredTip = (requiredTip && !requiredTip.unlocked);

  if(hasLockedRequiredTip) {

    this.gotoSection( this._hintSection );
    return;
  }

  // check if should go problem section
  if(this._promptButton) {
    goog.style.showElement( this._promptButton, !tip.unlocked );
  }

  if(!tip.unlocked) {

    if(this._problemSection) {
      
      this.gotoSection( this._problemSection );
      return;
    }
  }
  
  //
  goog.style.showElement( this._shareEl, tip.unlocked );
  
  if(this._interactionSection) {
    goog.dom.classes.add( this._interactionSection, 'unlocked' );
  }

  // check if should go advice section
  if(tip.unlocked) {

    if(this._adviceSection) {
      
      this.gotoSection( this._adviceSection );
      return;
    }

    if(this._interactionSection){

      this.gotoSection( this._interactionSection );
      return;
    }
  }
};


feng.views.sections.captions.Caption.prototype.onPanelAnimatedOut = function( shouldDoClose, shouldHide ) {

  this._isPanelAnimatedOut = true;

  if(shouldDoClose) {

    this.dispatchEvent({
      type: feng.events.EventType.CLOSE
    });
  }

  if(shouldHide) {
    this.hide();
  }
};


feng.views.sections.captions.Caption.prototype.onInteractionStart = function( e ) {

  if(this._interactionSection) {

    this.gotoSection( this._interactionSection );

  }else {

    this.enableCloseButton( false );

    this.animateOutPanel();
  }
};


feng.views.sections.captions.Caption.prototype.onInteractionEnd = function( e ) {

  if(this._object.tip.isFinal) {

    this.animateInPanel();

  }else {

    this.close();
  }
};


feng.views.sections.captions.Caption.prototype.onClick = function( e ) {

  switch(e.currentTarget) {
    case this._promptButton:
    this._object.startInteraction();
    break;
  }
};


feng.views.sections.captions.Caption.prototype.onClickShareButton = function( e ) {

  e.preventDefault();

  feng.utils.Utils.popUp( e.currentTarget.href );
};


feng.views.sections.captions.Caption.prototype.onResize = function( e ) {

  goog.style.setStyle( this._panelEl, 'height', this._renderSize.height + 'px' );

  if(this.scrollBar) {
    this.scrollBar.resize();
  }

  if(this._sectionTweener) {

    var sectionX = this.getSectionX( this._section );

    if(this._sectionTweener.isActive()) {

      this._sectionTweener.updateTo({
        'x': - sectionX
      });

    }else {

      TweenMax.set(this._scrollerInnerEl, {
        'x': - sectionX
      });
    }
  }
};