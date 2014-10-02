goog.provide('feng.views.sections.controls.Reminder');

goog.require('goog.async.Delay');
goog.require('goog.Timer');
goog.require('feng.models.achievements.Achievements');
goog.require('feng.models.Preload');
goog.require('feng.views.sections.controls.Controls');

/**
 * @constructor
 */
feng.views.sections.controls.Reminder = function( domElement, tips ){
	
  goog.base(this, domElement);

  this._tips = tips;
  this._currentTips = [];

  this._isHintShown = false;
  this._isResponseShown = false;

  this._hintIndex = 0;
  this._numHints = 0;

  this._hintTimer = new goog.Timer( 15000 );

  this._hintDialogueEl = goog.dom.query('.dialogue.hint', this.domElement)[0];
  this._prevEl = goog.dom.query('.left button', this.domElement)[0];
  this._nextEl = goog.dom.query('.right button', this.domElement)[0];
  this._characterEl = goog.dom.getElementByClass('character', this.domElement);
  this._canvasEl = goog.dom.query('canvas', this._characterEl)[0];
  this._canvasContext = this._canvasEl.getContext('2d');

  this._responseDialogueEl = goog.dom.query('.dialogue.response', this.domElement)[0];

  this._responseTitleEls = goog.dom.query('.title li', this._responseDialogueEl);
  this._responseParagraphEls = goog.dom.query('.paragraph li', this._responseDialogueEl);

  this._hintTitleEls = null;
  this._hintParagraphEls = null;

  this._hintTitleEl = null;
  this._hintParagraphEl = null;

  this._characterAnimations = null;
  this._characterAnimation = null;

  this._hideHintDelay = new goog.async.Delay(this.hideHint, 6000, this);
  this._hideResponseDelay = new goog.async.Delay(this.hideResponse, 3000, this);
};
goog.inherits(feng.views.sections.controls.Reminder, feng.views.sections.controls.Controls);


feng.views.sections.controls.Reminder.prototype.init = function(){

	goog.base(this, 'init');

	this._characterAnimations = this.getCharacterAnimations();
};


feng.views.sections.controls.Reminder.prototype.getLockedTipsOfView = function(){

  var achievements = feng.models.achievements.Achievements.getInstance();
  this._currentTips = achievements.getTipsOfView( this._view3d.id, this._view3d.sectionId );

  this._currentTips = goog.array.filter(this._currentTips, function(tip) {
  	return (tip.unlocked === false);
  });

  this._numHints = this._currentTips.length;

  return this._currentTips;
};


feng.views.sections.controls.Reminder.prototype.setView3D = function( view3d ){

  goog.base(this, 'setView3D', view3d);

  this._currentTips = this.getLockedTipsOfView();

	this._hintTitleEls = goog.dom.query('.title li', this._hintDialogueEl);
  this._hintParagraphEls = goog.dom.query('.paragraph li', this._hintDialogueEl);

	TweenMax.set(this._hintTitleEls, {
  	'display': 'none',
  	'opacity': 0
  });

  TweenMax.set(this._hintParagraphEls, {
  	'display': 'none',
  	'opacity': 0
  });

  this._characterAnimation = goog.object.findValue(this._characterAnimations, function(data) {
  	return (data.viewId === view3d.id);
  });

  this._canvasEl.width = this._characterAnimation.size['width'];
  this._canvasEl.height = this._characterAnimation.size['height'];
  this._characterAnimation.loop.restart();
};


feng.views.sections.controls.Reminder.prototype.activate = function(){

  var shouldActivate = goog.base(this, 'activate');

  if(!shouldActivate) return;

	this._eventHandler.listen(this._prevEl, 'click', this.onClick, false, this);
	this._eventHandler.listen(this._nextEl, 'click', this.onClick, false, this);
	this._eventHandler.listen(this._characterEl, 'mousedown', this.onClick, false, this);
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


feng.views.sections.controls.Reminder.prototype.getCharacterAnimations = function(){

	// extract unique character names from tips
	var animations = {};
	var preload = feng.models.Preload.getInstance();

	goog.array.forEach(this._tips, function(tip) {

		var character = tip.character;

		if(animations[character]) return;

		var sectionId = tip.sectionId;
		var viewId = tip.viewId;

		var img = preload.getAsset( sectionId + '.global.character.' + character );
		var data = preload.getAsset( sectionId + '.global.character.' + character + '-data' );
		var frames = data['frames'];
		var size = data['size'];

		var keys = goog.object.getKeys( frames );

		var loopKeys = goog.array.filter(keys, function(key) {
			return goog.string.startsWith(key, 'loop-');
		});

		var raiseKeys = goog.array.filter(keys, function(key) {
			return goog.string.startsWith(key, 'raise-');
		});

		var loopProp = {
			frame: 0,
		};

		var numLoopFrames = loopKeys.length;

		var loopTweener = TweenMax.to(loopProp, numLoopFrames/30, {
			frame: numLoopFrames - 1,
			'ease': Linear.easeNone,
			'paused': true,
			'yoyo': true,
			'repeat': -1,
			'repeatDelay': 2,
			'onUpdate': function() {
				var frame = Math.round( loopProp.frame );
				this.drawCharacter( img, frames[ 'loop-' + frame ] );
			},
			'onUpdateScope': this
		});

		var raiseProp = {
			frame: 0,
		};

		var numRaiseFrames = raiseKeys.length;

		var raiseTweener = TweenMax.to(raiseProp, numRaiseFrames/30, {
			frame: numRaiseFrames - 1,
			'ease': Linear.easeNone,
			'paused': true,
			'onUpdate': function() {
				var frame = Math.round( raiseProp.frame );
				this.drawCharacter( img, frames[ 'raise-' + frame ] );
			},
			'onUpdateScope': this,
			'onReverseComplete': function() {
				loopTweener.restart();
			}
		});

		animations[character] = {
			viewId: tip.viewId,
			size: size,
			loop: loopTweener,
			raise: raiseTweener
		};

	}, this);

	/* data structure */
	/*
	character: {
		size: <Object>,
		loop: <TweenMax>,
		raise: <TweenMax>,
		viewId: <String>
	}
	*/

	return animations;
};


feng.views.sections.controls.Reminder.prototype.getCurrentTip = function(){

	var tip = goog.array.find(this._currentTips, function(tip) {
		return !tip.unlocked;
	});

	return tip;
};


feng.views.sections.controls.Reminder.prototype.drawCharacter = function(img, frame){

	var x = frame['x'], y = frame['y'];
	var width = this._canvasEl.width, height = this._canvasEl.height;

	this._canvasContext.clearRect( 0, 0, width, height );
	this._canvasContext.drawImage( img, x, y, width, height, 0, 0, width, height );
};


feng.views.sections.controls.Reminder.prototype.prevHint = function(){

	this._hintIndex --;
	if(this._hintIndex < 0) this._hintIndex = this._numHints - 1;

	this.gotoHintByTip( this._currentTips[this._hintIndex].id );
};


feng.views.sections.controls.Reminder.prototype.nextHint = function(){

	this._hintIndex ++;
	if(this._hintIndex > this._numHints - 1) this._hintIndex = 0;

	this.gotoHintByTip( this._currentTips[this._hintIndex].id );
};


feng.views.sections.controls.Reminder.prototype.gotoHintByTip = function( tipId ){

	var domIndex = goog.array.findIndex(this._hintParagraphEls, function(el, index) {
		if(el.getAttribute('data-tip-id') === tipId) {
			return true;
		}
	});

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

	this._hintTitleEl = this._hintTitleEls[ domIndex ];
	this._hintParagraphEl = this._hintParagraphEls[ domIndex ];

	TweenMax.to(this._hintTitleEl, .25, {
		'opacity': 1,
		'display': 'block'
	});

	TweenMax.to(this._hintParagraphEl, .25, {
		'opacity': 1,
		'display': 'block'
	});
};


feng.views.sections.controls.Reminder.prototype.showHint = function( tipId ){

	this._isHintShown = true;

	this.gotoHintByTip( tipId );

	goog.dom.classes.add(this.domElement, 'active');

	this._hideHintDelay.start();

	this._hintTimer.stop();

	this._characterAnimation.loop.pause();
	this._characterAnimation.raise.restart();
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

	goog.dom.classes.add(this.domElement, 'active');

	this._hideResponseDelay.start();

	this._hintTimer.stop();

	this._characterAnimation.loop.pause();
	this._characterAnimation.raise.restart();
};


feng.views.sections.controls.Reminder.prototype.hideHint = function( instance ){

	this._isHintShown = false;

	var duration = instance ? 0 : .4;

	goog.dom.classes.remove(this.domElement, 'active');

	this._hintTimer.start();

	this._characterAnimation.raise.reverse();
};


feng.views.sections.controls.Reminder.prototype.hideResponse = function( instance ){

	this._isResponseShown = false;

	var duration = instance ? 0 : .4;

	goog.dom.classes.remove(this.domElement, 'active');

	this._hintTimer.start();

	this._characterAnimation.raise.reverse();
};


feng.views.sections.controls.Reminder.prototype.onClick = function(e){

	switch(e.currentTarget) {
		case this._prevEl:
		this.prevHint();
		break;

		case this._nextEl:
		this.nextHint();
		break;

		case this._characterEl:

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

	this._currentTips = this.getLockedTipsOfView();

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