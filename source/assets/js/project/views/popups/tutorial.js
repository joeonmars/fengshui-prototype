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

	this._step = 0;
	this._totalSteps = this._stepEls.length;

	this._videoEl = null;
	this._stepEl = null;

	this._isAutoPlayEnabled = false;

	this._numLoaded = 0;
	this._isLoaded = false;

	// loader
	this._loaderEl = goog.dom.getElementByClass('loader', this.domElement);
	this._fillEl = goog.dom.getElementByClass('fill', this.domElement);
	this._counterEl = goog.dom.getElementByClass('counter', this.domElement);

	this._skipButton = goog.dom.getElementByClass('skip', this.domElement);
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
		
		goog.dom.classes.remove( this._stepEl, 'active' );
	}

	// handle next step
	this._step = step;

	this._videoEl = this._videoEls[ this._step ];
	this._videoEl.play();

	this._stepEl = this._stepEls[ this._step ];

	goog.dom.classes.add( this._stepEl, 'active' );

	this._eventHandler.listenOnce( this._videoEl, 'ended', this.onVideoEnded, false, this );
};


feng.views.popups.Tutorial.prototype.activate = function(){

	goog.base(this, 'activate');

	goog.array.forEach(this._stepEls, function(stepEl) {
		this._eventHandler.listen( stepEl, 'mousedown', this.onMouseDownStep, false, this );
	}, this);

	this._eventHandler.listen( this._skipButton, 'click', this.animateOut, false, this );

	if(!this._isLoaded) {

		goog.array.forEach(this._videoEls, function(videoEl) {
			videoEl.load();
			goog.events.listenOnce( videoEl, 'canplay', this.onVideoCanPlay, false, this );
		}, this);

	}else {

		this.gotoStep( 0 );
	}
};


feng.views.popups.Tutorial.prototype.deactivate = function(){

	goog.base(this, 'deactivate');

	this._videoEl.pause();

	this._eventHandler.removeAll();
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

		this.nextStep();
	}
};


feng.views.popups.Tutorial.prototype.onMouseDownStep = function(e){

	this.enableAutoPlay( false );

	var step = goog.array.indexOf(this._stepEls, e.currentTarget);
	this.gotoStep( step );
};