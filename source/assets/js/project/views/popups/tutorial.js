goog.provide('feng.views.popups.Tutorial');

goog.require('feng.views.popups.Popup');
goog.require('feng.templates.common');


/**
 * @constructor
 */
feng.views.popups.Tutorial = function(){

	var data = {
		assetsPath: feng.Config['assetsPath']
	};

	var domElement = soy.renderAsFragment(feng.templates.common.TutorialPopup, data);
	
	goog.base( this, domElement );

	// steps
	this._stepButtonEls = goog.dom.query('.navigator button', this.domElement);
	this._videoEls = goog.dom.query('video', this.domElement);
	this._stepEls = goog.dom.query('.steps li', this.domElement);
	this._descriptionEls = goog.dom.query('.steps p', this.domElement);

	this._step = 0;
	this._totalSteps = this._stepEls.length;

	this._loopCount = 0;
	this._videoEl = null;
	this._stepEl = null;
	this._stepButtonEl = null;

	this._isAutoPlayEnabled = false;

	this._numLoaded = 0;
	this._isLoaded = false;

	goog.array.forEach(this._stepEls, function(stepEl) {
		TweenMax.set(stepEl, {
			'display': 'none'
		});
	});

	// loader
	this._loaderEl = goog.dom.getElementByClass('loader', this.domElement);
	this._fillEl = goog.dom.getElementByClass('fill', this.domElement);
	this._counterEl = goog.dom.getElementByClass('counter', this.domElement);

	this._skipButton = goog.dom.getElementByClass('skip', this.domElement);

	this.hideCloseButton();
};
goog.inherits(feng.views.popups.Tutorial, feng.views.popups.Popup);
goog.addSingletonGetter(feng.views.popups.Tutorial);


feng.views.popups.Tutorial.prototype.enableAutoPlay = function( enabled ){

	this._isAutoPlayEnabled = ( enabled === false ) ? false : true;
};


feng.views.popups.Tutorial.prototype.nextStep = function(){

	this._videoEl.pause();
	this._eventHandler.unlisten( this._videoEl, 'ended', this.onVideoEnded, false, this );

	this._step ++;

	if(this._step < this._totalSteps) {

		this.gotoStep( this._step );

	}else {

		this.animateOut();
	}
};


feng.views.popups.Tutorial.prototype.gotoStep = function( step ){

	// handle last step
	if(this._videoEl && this._stepEl) {

		this._videoEl.pause();
		this._eventHandler.unlisten( this._videoEl, 'ended', this.onVideoEnded, false, this );
	
		var stepSize = goog.style.getSize( this._stepEl );

		TweenMax.fromTo(this._stepEl, .65, {
			'clip': 'rect(0px, ' + stepSize.width + 'px, ' + stepSize.height + 'px, 0px)',
			'opacity': 1,
		},{
			'clip': 'rect(0px, 0px, ' + stepSize.height + 'px, 0px)',
			'opacity': 0,
			'display': 'none',
			'ease': Power4.easeOut
		});
	}

	// handle next step
	this._step = step;

	this._loopCount = 0;

	this._videoEl = this._videoEls[ this._step ];
	this._videoEl.currentTime = 0;

	this._eventHandler.listen( this._videoEl, 'ended', this.onVideoEnded, false, this );

	this._stepEl = this._stepEls[ this._step ];

	var stepSize = goog.style.getSize( this._stepEl );

	TweenMax.fromTo(this._stepEl, .65, {
		'clip': 'rect(0px, ' + stepSize.width + 'px, ' + stepSize.height + 'px, ' + stepSize.width + 'px)',
		'opacity': 0
	},{
		'clip': 'rect(0px, ' + stepSize.width + 'px, ' + stepSize.height + 'px, 0px)',
		'opacity': 1,
		'display': 'block',
		'clearProps': 'all',
		'ease': Power4.easeOut,
		'onComplete': function() {
			this._videoEl.play();
		},
		'onCompleteScope': this
	});

	var descriptionEl = this._descriptionEls[ this._step ];

	TweenMax.fromTo(descriptionEl, .5, {
		'opacity': 0,
	},{
		'delay': .4,
		'opacity': 1
	});

	// handle navigator
	if(this._stepButtonEl) {
		goog.dom.classes.remove( this._stepButtonEl, 'active' );
	}

	this._stepButtonEl = this._stepButtonEls[ this._step ];
	goog.dom.classes.add( this._stepButtonEl, 'active' );
};


feng.views.popups.Tutorial.prototype.activate = function(){

	goog.base(this, 'activate');

	this._eventHandler.listen( this._skipButton, 'click', this.animateOut, false, this );

	goog.array.forEach(this._stepButtonEls, function(stepButtonEl) {
		this._eventHandler.listen( stepButtonEl, 'mousedown', this.onClickNavigator, false, this );
	}, this);
};


feng.views.popups.Tutorial.prototype.deactivate = function(){

	goog.base(this, 'deactivate');

	this._videoEl.pause();
};


feng.views.popups.Tutorial.prototype.animateIn = function(){

	goog.base(this, 'animateIn');

	if(!this._isLoaded) {

		goog.array.forEach(this._videoEls, function(videoEl) {
			videoEl.load();
			goog.events.listenOnce( videoEl, 'canplay', this.onVideoCanPlay, false, this );
		}, this);

	}else {

		this.gotoStep( 0 );
	}
};


feng.views.popups.Tutorial.prototype.showLoader = function(){

	TweenMax.fromTo(this._loaderEl, .25, {
		'opacity': 0,
		'y': 20,
	}, {
		'opacity': 1,
		'y': 0,
		'display': 'block',
		'ease': Strong.easeInOut
	});

	TweenMax.set(this._skipButton, {
		'display': 'none'
	});
};


feng.views.popups.Tutorial.prototype.showSkipButton = function(){

	TweenMax.to(this._loaderEl, .25, {
		'opacity': 0,
		'y': 20,
		'display': 'none',
		'ease': Strong.easeInOut
	});

	TweenMax.fromTo(this._skipButton, .25, {
		'display': 'none',
		'opacity': 0,
		'y': 20
	}, {
		'delay': .6,
		'opacity': 1,
		'y': 0,
		'display': 'block',
		'ease': Strong.easeInOut
	});
};


feng.views.popups.Tutorial.prototype.setProgress = function(progress){

	var progress = Math.round( progress * 100 );

	goog.style.setStyle( this._fillEl, 'width', progress + '%' );

	this._counterEl.innerHTML = (progress > 9) ? progress : ('0' + progress);
};


feng.views.popups.Tutorial.prototype.onVideoCanPlay = function(e){

	this._numLoaded ++;

	if(this._numLoaded >= this._totalSteps) {

		this._isLoaded = true;

		if(this._isShown) {

			this.gotoStep( 0 );
		}
	}
};


feng.views.popups.Tutorial.prototype.onVideoEnded = function(e){

	if(!this._isAutoPlayEnabled) {

		e.currentTarget.play();

	}else {

		this._loopCount ++;

		if(this._loopCount < 2) {

			e.currentTarget.play();

		}else {

			this.nextStep();
		}
	}
};


feng.views.popups.Tutorial.prototype.onClickNavigator = function(e){

	var index = goog.array.indexOf( this._stepButtonEls, e.currentTarget );
	this.gotoStep( index );

	this.enableAutoPlay( false );
};