goog.provide('feng.views.sections.controls.ProgressBar');

goog.require('goog.async.Throttle');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.ProgressBar = function(domElement, tips){

  goog.base(this, domElement);

  this._tipsWrapperEl = goog.dom.query('.tips-wrapper', this.domElement)[0];
  this._tipsEls = goog.dom.query('.tips', this.domElement);
  this._allTipEls = goog.dom.query('.tips > li', this.domElement);
  this._dotEls = goog.dom.query('.tips .dot', this.domElement);
  this._prevButtonEl = goog.dom.getElementByClass('prev', this.domElement);
  this._nextButtonEl = goog.dom.getElementByClass('next', this.domElement);

  this._tipsEl = this._tipsEls[0];
  this._tipEls = goog.dom.query( 'li', this._tipsEl );

  this._viewIds = goog.array.map( this._tipsEls, function(tipsEl) {
    return tipsEl.getAttribute('data-view-id');
  });

  this._viewId = this._viewIds[0];

  this._tips = {};
  
  goog.array.forEach(tips, function(tip) {
		this._tips[ tip.id ] = tip;
  }, this);

  this._nearbyTipEl = null;

  //
  this._detectNearbyThrottle = new goog.async.Throttle(this.detectNearbyObjects, 1000/5, this);
  
  this._nearbyObjects = [];

  this._tipsWidthViewportRatio = 0.5;
  this._maxTipMargin = 50;

  this._tweener = new TimelineMax();
};
goog.inherits(feng.views.sections.controls.ProgressBar, feng.views.sections.controls.Controls);


feng.views.sections.controls.ProgressBar.prototype.setView3D = function( view3d ){

  goog.base(this, 'setView3D', view3d);

  this._viewId = view3d.id;

  var tipsEl = goog.array.find(this._tipsEls, function(tipsEl) {
    return (tipsEl.getAttribute('data-view-id') === view3d.id);
  });

  this.calculateTipsLayout( tipsEl );
  this.goTipsOfView( view3d.id );
};


feng.views.sections.controls.ProgressBar.prototype.calculateTipsLayout = function( tipsEl ){

  this._tipEls = goog.dom.query( 'li', tipsEl );

  // arrange tip dots
  var numDots = this._tipEls.length;
  var dotsWidth = numDots * this._maxTipMargin * 2;
  var actualWidth = Math.min( dotsWidth, this._tipsWidthViewportRatio * feng.viewportSize.width );
  var dotWidth = actualWidth / numDots;
  var margin = dotWidth / 2;

  goog.array.forEach(this._tipEls, function(tipEl) {
    goog.style.setStyle( tipEl, 'margin', '0 ' + margin + 'px' );
  });

  return actualWidth;
};


feng.views.sections.controls.ProgressBar.prototype.activate = function() {

  var shouldActivate = goog.base(this, 'activate');

  if(!shouldActivate) return;

  this._eventHandler.listen(this._prevButtonEl, 'click', this.goPrevTips, false, this);
  this._eventHandler.listen(this._nextButtonEl, 'click', this.goNextTips, false, this);

  goog.array.forEach(this._allTipEls, function(tipEl) {
    this._eventHandler.listen(tipEl, goog.events.EventType.MOUSEOVER, this.onTipMouseOver, false, this);
    this._eventHandler.listen(tipEl, goog.events.EventType.MOUSEOUT, this.onTipMouseOut, false, this);
  }, this);

  goog.object.forEach(this._tips, function(tip) {

    tip.listen(feng.events.EventType.UNLOCK, this.onTipUnlock, false, this);
    if(tip.unlocked) this.unlockTip( tip.id );
  }, this);

  this._detectNearbyThrottle.fire();

  goog.dom.classes.enable(this.domElement, 'hidden', false);
};


feng.views.sections.controls.ProgressBar.prototype.deactivate = function() {

  var shouldDeactivate = goog.base(this, 'deactivate');

  if(!shouldDeactivate) return;

  goog.object.forEach(this._tips, function(tip) {
    tip.unlisten(feng.events.EventType.UNLOCK, this.onTipUnlock, false, this);
  }, this);

  this._detectNearbyThrottle.stop();

  this._tweener.kill();

  goog.dom.classes.enable(this.domElement, 'hidden', true);
};


feng.views.sections.controls.ProgressBar.prototype.goTipsOfView = function( viewId ) {

  this._viewId = viewId;

  // get tips element of the view id
  var tipsEl = goog.array.find(this._tipsEls, function(tipsEl) {
    return (tipsEl.getAttribute('data-view-id') === viewId);
  });

  // calculate new tips layout before set display none
  var tipsWrapperWidth = this.calculateTipsLayout( tipsEl );

  // animate tips
  var tweener = TweenMax.to(this._tipsEls, 0, {
    'display': 'none'
  });

  // assign new tips el
  this._tipsEl = tipsEl;

  var tweener2 = TweenMax.to( this._tipsWrapperEl, .5, {
    'width': tipsWrapperWidth,
    'ease': Strong.easeOut
  });

  //
  var tweener3 = new TimelineMax();

  var tweeners = goog.array.map( this._tipEls, function(tipEl) {

    var t = TweenMax.fromTo(tipEl, .25, {
      'opacity': 0,
      'y': 20
    }, {
      'opacity': 1,
      'y': 0
    });

    return t;
  });

  tweener3.add( tweeners, '+=0', 'start', .05 );

  var tweener4 = TweenMax.to(this._tipsEl, .25, {
    'opacity': 1,
    'display': 'block'
  });

  this._tweener.clear();
  this._tweener.add([tweener, tweener2, tweener3, tweener4]);
};


feng.views.sections.controls.ProgressBar.prototype.goPrevTips = function() {

  var currentTipsIndex = goog.array.indexOf(this._viewIds, this._tipsEl.getAttribute('data-view-id'));

  currentTipsIndex --;

  if(currentTipsIndex < 0) currentTipsIndex = this._viewIds.length - 1;

  this.goTipsOfView( this._viewIds[currentTipsIndex] );
};


feng.views.sections.controls.ProgressBar.prototype.goNextTips = function() {

  var currentTipsIndex = goog.array.indexOf(this._viewIds, this._tipsEl.getAttribute('data-view-id'));

  currentTipsIndex ++;

  if(currentTipsIndex > this._viewIds.length - 1) currentTipsIndex = 0;

  this.goTipsOfView( this._viewIds[currentTipsIndex] );
};


feng.views.sections.controls.ProgressBar.prototype.setNearbyObjects = function( objects ){

  this._nearbyObjects = objects;

  if(this._nearbyObjects && this._nearbyObjects.length > 0) {

    this._detectNearbyThrottle.fire();
  }
};


feng.views.sections.controls.ProgressBar.prototype.detectNearbyObjects = function(){

  if(!this._nearbyObjects || this._nearbyObjects.length === 0) {

    this._detectNearbyThrottle.stop();
    return;

  }else {

    this._detectNearbyThrottle.fire();
  }

  var control = this._view3d.modeController.control;
  var cameraPosition = control.getPosition();
  var cameraDirection = control.getForwardVector( true );
  var highestDot = Math.cos( THREE.Math.degToRad(45) );
  var nearestObject;

  goog.array.forEach(this._nearbyObjects, function(object) {
    
    var objectDirection = object.getCenter().clone().sub( cameraPosition ).normalize();
    var dot = objectDirection.dot( cameraDirection );
    //console.log(dot, object.name)
    if(dot >= highestDot) {
      highestDot = dot;
      nearestObject = object;
    }
  });

  if(nearestObject) {

    //console.log(nearestObject.name);
    var tip = nearestObject.tip;
    var providedTip = tip.getProvidedTip();

    var tipId = providedTip ? providedTip.id : tip.id;

    var tipEl = goog.array.find(this._allTipEls, function(tipEl) {
      return (tipEl.getAttribute('data-tip-id') === tipId);
    });
    
    if(this._nearbyTipEl !== tipEl) {

      if(this._nearbyTipEl) {
        goog.dom.classes.remove(this._nearbyTipEl, 'nearby');
      }

      //console.log(this._nearbyTipEl, tipEl, tipId, providedTip);

      this._nearbyTipEl = tipEl;
      goog.dom.classes.add(this._nearbyTipEl, 'nearby');

      var viewId = tipEl.getAttribute('data-view-id');

      if(viewId !== this._viewId) {
        this.goTipsOfView( viewId );
      }
    }

  }else {

    if(this._nearbyTipEl) {
      goog.dom.classes.remove(this._nearbyTipEl, 'nearby');
      this._nearbyTipEl = null;
    }
  }
};


feng.views.sections.controls.ProgressBar.prototype.unlockTip = function( tipId ){
  
  var unlockedTipEl = goog.array.find(this._tipEls, function(tipEl) {
    return tipEl.getAttribute('data-tip-id') === tipId;
  });

  if(!unlockedTipEl) return;

  // assign url to book
  goog.dom.query('a', unlockedTipEl)[0].href = this._tips[tipId].readTipToken;

  goog.dom.classes.add( unlockedTipEl, 'unlocked' );
};


feng.views.sections.controls.ProgressBar.prototype.onTipMouseOver = function(e){

  if(goog.dom.classes.has(e.currentTarget, 'hover')) {

    return false;

  }else {

    goog.dom.classes.add(e.currentTarget, 'hover');

    feng.pubsub.publish( feng.PubSub.Topic.SHOW_WIDGET, this );
  }
};


feng.views.sections.controls.ProgressBar.prototype.onTipMouseOut = function(e){

  if(!e.relatedTarget || !goog.dom.contains(e.currentTarget, e.relatedTarget)) {

    goog.dom.classes.remove(e.currentTarget, 'hover');

    feng.pubsub.publish( feng.PubSub.Topic.HIDE_WIDGET, this );
  }
};


feng.views.sections.controls.ProgressBar.prototype.onTipUnlock = function(e){

  var tipId = e.tip.id;
  this.unlockTip( tipId );
};


feng.views.sections.controls.ProgressBar.prototype.onModeChange = function(e){

  goog.base(this, 'onModeChange', e);

  var mode = e.nextMode || e.mode;

  switch(mode) {

    case feng.controllers.view3d.ModeController.Mode.BROWSE:
    case feng.controllers.view3d.ModeController.Mode.WALK:
    this.activate();
    break;

    default:
    this.deactivate();
    break;
  }
};


feng.views.sections.controls.ProgressBar.prototype.onResize = function(e){

	goog.base(this, 'onResize', e);

  var domSize = goog.style.getSize( this.domElement );

  var y = feng.viewportSize.height - 115;
	goog.style.setStyle( this.domElement, 'top', y + 'px' );

  this.calculateTipsLayout( this._tipsEl );
  this.goTipsOfView( this._viewId );
};