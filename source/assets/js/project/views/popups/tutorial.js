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
	this._videoEls = goog.dom.query('video', this.domElement);
	this._stepEls = goog.dom.query('.steps li', this.domElement);
	this._titleEls = goog.dom.query('.title li', this.domElement);

	goog.array.forEach(this._videoEls, function(videoEl) {
		goog.style.setStyle( videoEl, 'visibility', 'hidden' );
	}, this);

	this._step = -1;
	this._totalSteps = this._stepEls.length;

	this._videoEl = null;
	this._stepEl = null;

	this._numLoaded = 0;
	this._isLoaded = false;

	this._enterKeyId = null;
	this._escKeyId = null;
	this._animateOut = goog.bind(this.animateOut, this);

	// buttons
	this._prevButton = goog.dom.query('.prev', this.domElement)[0];
	this._nextButton = goog.dom.query('.next', this.domElement)[0];

	// loader
	this._controlsEl = goog.dom.getElementByClass('controls', this.domElement);
	this._loaderEl = goog.dom.getElementByClass('loader', this.domElement);
	this._fillEl = goog.dom.getElementByClass('fill', this.domElement);
	this._counterEl = goog.dom.getElementByClass('counter', this.domElement);

	this._skipButton = goog.dom.getElementByClass('skip', this.domElement);
};
goog.inherits(feng.views.popups.Tutorial, feng.views.popups.Popup);
goog.addSingletonGetter(feng.views.popups.Tutorial);


feng.views.popups.Tutorial.prototype.prevStep = function(){

	var step = Math.max(0, this._step - 1);

	if(this._step !== step) {

		this.gotoStep( step );
	}
};


feng.views.popups.Tutorial.prototype.nextStep = function(){

	var step = Math.min(this._totalSteps - 1, this._step + 1);

	if(this._step !== step) {

		this.gotoStep( step );
	}
};


feng.views.popups.Tutorial.prototype.gotoStep = function( step ){

	this._step = step;

	// handle last step
	if(this._videoEl && this._stepEl && this._titleEl) {

		this._videoEl.pause();
		this._eventHandler.unlisten( this._videoEl, 'ended', this.onVideoEnded, false, this );
		
		goog.dom.classlist.remove( this._titleEl, 'active' );
		goog.dom.classlist.remove( this._stepEl, 'active' );
	}

	this._prevButton.disabled = false;
	this._nextButton.disabled = false;

	if(this._step === 0) {

		this._prevButton.disabled = true;

	}else if(this._step === this._totalSteps - 1) {

		this._nextButton.disabled = true;

		goog.dom.classlist.enable( this._controlsEl, 'hidden', false );
	}

	this._titleEl = this._titleEls[ this._step ];
	this._stepEl = this._stepEls[ this._step ];

	goog.dom.classlist.add( this._titleEl, 'active' );
	goog.dom.classlist.add( this._stepEl, 'active' );

	this._videoEl = this._videoEls[ this._step ];
	this._videoEl.currentTime = 0;
	this._videoEl.play();
	
	this._eventHandler.listenOnce( this._videoEl, 'ended', this.onVideoEnded, false, this );
};


feng.views.popups.Tutorial.prototype.animateIn = function(){

	goog.base(this, 'animateIn', 200);
};


feng.views.popups.Tutorial.prototype.activate = function(){

	goog.base(this, 'activate');

	this._eventHandler.listen( this._skipButton, 'click', this.animateOut, false, this );
	this._eventHandler.listen( this._prevButton, 'click', this.prevStep, false, this );
	this._eventHandler.listen( this._nextButton, 'click', this.nextStep, false, this );

	this._enterKeyId = feng.keyboardController.bind( this._animateOut, feng.keyboardController.key.ENTER, true );
	this._escKeyId = feng.keyboardController.bind( this._animateOut, feng.keyboardController.key.ESC, true );

	if(!this._isLoaded) {

		goog.array.forEach(this._videoEls, function(videoEl) {
			videoEl.load();
			this._eventHandler.listenOnce( videoEl, 'canplay', this.onVideoCanPlay, false, this );
		}, this);

	}else {

		this.gotoStep( 0 );
	}
};


feng.views.popups.Tutorial.prototype.deactivate = function(){

	goog.base(this, 'deactivate');

	this._videoEl.pause();

	feng.keyboardController.unbind( this._enterKeyId );
	feng.keyboardController.unbind( this._escKeyId );
};


feng.views.popups.Tutorial.prototype.showLoader = function(){

	TweenMax.fromTo(this._loaderEl, .25, {
		'opacity': 0,
		'y': 20
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

	this._counterEl.innerHTML = ((progress > 9) ? progress : ('0' + progress)) + '%';
};


feng.views.popups.Tutorial.prototype.setBuffering = function(){

	this._counterEl.innerHTML = "Preparing for your visit";
};


feng.views.popups.Tutorial.prototype.onVideoCanPlay = function(e){

	this._numLoaded ++;

	if(this._numLoaded >= this._totalSteps) {

		this._isLoaded = true;

		if(this._isShown) {

			this.gotoStep( 0 );
		}
	}

	goog.style.setStyle( e.currentTarget, 'visibility', 'visible' );
};


feng.views.popups.Tutorial.prototype.onVideoEnded = function(e){

	e.currentTarget.play();
};


feng.views.popups.Tutorial.prototype.onAnimatedOut = function() {

	goog.base(this, 'onAnimatedOut');

	this.gotoStep( 0 );
};