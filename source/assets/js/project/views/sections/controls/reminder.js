goog.provide('feng.views.sections.controls.Reminder');

goog.require('goog.async.Delay');
goog.require('goog.Timer');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.Reminder = function( domElement, tips ){
	
  goog.base(this, domElement);

  this._tips = tips;

  this._isHintShown = false;
  this._isResponseShown = false;

  this._hintIndex = 0;
  this._numHints = 0;

  this._hintTimer = new goog.Timer( 15000 );

  this._hintDialogueEl = goog.dom.query('.dialogue.hint', this.domElement)[0];
  this._prevEl = goog.dom.query('.left button', this.domElement)[0];
  this._nextEl = goog.dom.query('.right button', this.domElement)[0];
  this._avatarEl = goog.dom.getElementByClass('avatar', this.domElement);

  this._responseDialogueEl = goog.dom.query('.dialogue.response', this.domElement)[0];

  this._responseTitleEls = goog.dom.query('.title li', this._responseDialogueEl);
  this._responseParagraphEls = goog.dom.query('.paragraph li', this._responseDialogueEl);

  this._hintTitleEls = null;
  this._hintParagraphEls = null;

  this._hintTitleEl = null;
  this._hintParagraphEl = null;

  this.updateHints();

  this._hideHintDelay = new goog.async.Delay(this.hideHint, 6000, this);
  this._hideResponseDelay = new goog.async.Delay(this.hideResponse, 3000, this);

  TweenMax.set(this._hintTitleEls, {
  	'display': 'none',
  	'opacity': 0
  });

  TweenMax.set(this._hintParagraphEls, {
  	'display': 'none',
  	'opacity': 0
  });

  this.hideHint( true );
  this.hideResponse( true );
};
goog.inherits(feng.views.sections.controls.Reminder, feng.views.sections.controls.Controls);


feng.views.sections.controls.Reminder.prototype.activate = function(){

  var shouldActivate = goog.base(this, 'activate');

  if(!shouldActivate) return;

	this._eventHandler.listen(this._prevEl, 'click', this.onClick, false, this);
	this._eventHandler.listen(this._nextEl, 'click', this.onClick, false, this);
	this._eventHandler.listen(this._avatarEl, 'mousedown', this.onClick, false, this);
	this._eventHandler.listen(this._hintDialogueEl, 'mouseover', this.onMouseOver, false, this);
	this._eventHandler.listen(this._responseDialogueEl, 'mouseover', this.onMouseOver, false, this);
	this._eventHandler.listen(this._hintDialogueEl, 'mouseout', this.onMouseOut, false, this);
	this._eventHandler.listen(this._responseDialogueEl, 'mouseout', this.onMouseOut, false, this);
	this._eventHandler.listen(this._hintTimer, 'tick', this.onHintTick, false, this);

	goog.array.forEach(this._tips, function(tip) {
		tip.listen(feng.events.EventType.UNLOCK, this.onTipUnlock, false, this);
	}, this);

	this._hintTimer.start();
};


feng.views.sections.controls.Reminder.prototype.getCurrentTip = function(){

	var tip = goog.array.find(this._tips, function(tip) {
		return !tip.unlocked;
	});

	return tip;
};


feng.views.sections.controls.Reminder.prototype.updateHints = function(){

	this._hintTitleEls = goog.dom.query('.title li', this._hintDialogueEl);
  	this._hintParagraphEls = goog.dom.query('.paragraph li', this._hintDialogueEl);

	this._numHints = this._hintParagraphEls.length;

	this.gotoHint( this._hintIndex );
};


feng.views.sections.controls.Reminder.prototype.prevHint = function(){

	this._hintIndex --;
	if(this._hintIndex < 0) this._hintIndex = this._numHints - 1;

	this.gotoHint( this._hintIndex );
};


feng.views.sections.controls.Reminder.prototype.nextHint = function(){

	this._hintIndex ++;
	if(this._hintIndex > this._numHints - 1) this._hintIndex = 0;

	this.gotoHint( this._hintIndex );
};


feng.views.sections.controls.Reminder.prototype.gotoHint = function( hintIndex ){

	this._hintIndex = hintIndex;

	if(this._hintTitleEl) {
		TweenMax.to(this._hintTitleEl, .25, {
			'opacity': 0,
			'display': 'none'
		});
	}

	if(this._hintParagraphEl) {
		TweenMax.to(this._hintParagraphEl, .25, {
			'opacity': 0,
			'display': 'none'
		});
	}

	this._hintTitleEl = this._hintTitleEls[ this._hintIndex ];
	this._hintParagraphEl = this._hintParagraphEls[ this._hintIndex ];

	TweenMax.to(this._hintTitleEl, .25, {
		'opacity': 1,
		'display': 'block'
	});

	TweenMax.to(this._hintParagraphEl, .25, {
		'opacity': 1,
		'display': 'block'
	});
};


feng.views.sections.controls.Reminder.prototype.gotoHintByTip = function( tipId ){

	var hintIndex;

	goog.array.forEach(this._hintParagraphEls, function(el, index) {
		if(el.getAttribute('data-tip-id') === tipId) {
			hintIndex = index;
		}
	});

	this.gotoHint( hintIndex );
};


feng.views.sections.controls.Reminder.prototype.showHint = function( tipId ){

	this._isHintShown = true;

	this.gotoHintByTip( tipId );

	TweenMax.fromTo(this._hintDialogueEl, .4, {
		'y': 20,
		'opacity': 0,
		'display': 'none'
	}, {
		'y': 0,
		'opacity': 1,
		'display': 'block',
		'ease': Back.easeInOut
	});

	goog.dom.classes.add(this.domElement, 'active');

	this._hideHintDelay.start();

	this._hintTimer.stop();
};


feng.views.sections.controls.Reminder.prototype.showResponse = function( tipId ){

	this._isResponseShown = true;

	TweenMax.set(this._responseTitleEls, {
		'display': 'none'
	});

	TweenMax.set(this._responseParagraphEls, {
		'display': 'none'
	});

	var titleEl = goog.array.find(this._responseTitleEls, function(el) {
		return (el.getAttribute('data-tip-id') === tipId);
	});

	var paragraphEl = goog.array.find(this._responseParagraphEls, function(el) {
		return (el.getAttribute('data-tip-id') === tipId);
	});

	TweenMax.set(titleEl, {
		'display': 'block'
	});

	TweenMax.set(paragraphEl, {
		'display': 'block'
	});

	TweenMax.fromTo(this._responseDialogueEl, .4, {
		'y': 20,
		'opacity': 0,
		'display': 'none'
	}, {
		'y': 0,
		'opacity': 1,
		'display': 'block',
		'ease': Back.easeInOut
	});

	goog.dom.classes.add(this.domElement, 'active');

	this._hideResponseDelay.start();

	this._hintTimer.stop();
};


feng.views.sections.controls.Reminder.prototype.hideHint = function( instance ){

	this._isHintShown = false;

	var duration = instance ? 0 : .4;

	TweenMax.to(this._hintDialogueEl, duration, {
		'y': 20,
		'opacity': 0,
		'display': 'none',
		'ease': Back.easeInOut
	});

	goog.dom.classes.remove(this.domElement, 'active');

	this._hintTimer.start();
};


feng.views.sections.controls.Reminder.prototype.hideResponse = function( instance ){

	this._isResponseShown = false;

	var duration = instance ? 0 : .4;

	TweenMax.to(this._responseDialogueEl, duration, {
		'y': 20,
		'opacity': 0,
		'display': 'none',
		'ease': Back.easeInOut
	});

	goog.dom.classes.remove(this.domElement, 'active');

	this._hintTimer.start();
};


feng.views.sections.controls.Reminder.prototype.onClick = function(e){

	switch(e.currentTarget) {
		case this._prevEl:
		this.prevHint();
		break;

		case this._nextEl:
		this.nextHint();
		break;

		case this._avatarEl:

		if(this._isHintShown) {

			this.hideHint();

		}else {

			var tip = this.getCurrentTip();
			this.showHint( tip.id );
		}

		if(this._isResponseShown) {

			this.hideResponse();
		}
		break;
	}
};


feng.views.sections.controls.Reminder.prototype.onMouseOver = function(e){

	if(e.currentTarget === this._hintDialogueEl) {

		this._hideHintDelay.stop();

	}else if(e.currentTarget === this._responseDialogueEl) {
		
		this._hideResponseDelay.stop();
	}
};


feng.views.sections.controls.Reminder.prototype.onMouseOut = function(e){

	if(e.currentTarget === this._hintDialogueEl) {

		if(!e.relatedTarget || !goog.dom.contains(e.currentTarget, e.relatedTarget)) {
			this._hideHintDelay.start();
		}

	}else if(e.currentTarget === this._responseDialogueEl) {
		
		if(!e.relatedTarget || !goog.dom.contains(e.currentTarget, e.relatedTarget)) {
			this._hideResponseDelay.start();
		}
	}
};


feng.views.sections.controls.Reminder.prototype.onHintTick = function(e){

	var tip = this.getCurrentTip();
	this.showHint( tip.id );
};


feng.views.sections.controls.Reminder.prototype.onTipUnlock = function(e){

	var tipId = e.tip.id;

	var titleEl = goog.dom.query('.title li[data-tip-id="' + tipId + '"]', this._hintDialogueEl)[0];
	goog.dom.removeNode( titleEl );

	var paragraphEl = goog.dom.query('.paragraph li[data-tip-id="' + tipId + '"]', this._hintDialogueEl)[0];
	goog.dom.removeNode( paragraphEl );

	this.updateHints();

	this.showResponse( tipId );
};


feng.views.sections.controls.Reminder.prototype.onModeChange = function(e){

	goog.base(this, 'onModeChange', e);
	
	switch(e.mode) {

		case feng.controllers.view3d.ModeController.Mode.BROWSE:
		case feng.controllers.view3d.ModeController.Mode.WALK:
		if(!this._isActivated) {
			goog.style.showElement(this.domElement, true);
			this.activate();
		}
		break;

		default:
		if(this._isActivated) {
			goog.style.showElement(this.domElement, false);
			this.deactivate();
		}
		break;
	}
};


feng.views.sections.controls.Reminder.prototype.onResize = function(e){

	var viewportSize = goog.dom.getViewportSize();
	goog.style.setPosition(this.domElement, viewportSize.width - 100 - 30, viewportSize.height - 100 - 30);
};