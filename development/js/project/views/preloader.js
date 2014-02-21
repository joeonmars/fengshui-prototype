goog.provide('fengshui.views.Preloader');

goog.require('goog.events.EventTarget');
goog.require('fengshui.models.Preload');
goog.require('fengshui.events');


/**
 * @constructor
 */
fengshui.views.Preloader = function(domElement, duration){

  goog.base(this);

  this._domElement = domElement;

  this._loader = new createjs.LoadQueue(true, fengshui.Config['assetsPath']);
  this._model = fengshui.models.Preload.getInstance();
  
  this._isCompleted = false;

  var fps = 30;
  this._ticker = new goog.Timer(1000/fps);
  goog.events.listen(this._ticker, goog.Timer.TICK, this.onTick, false, this);

  this._ticked = 0;
  this._progress = 0;
  this._duration = duration || 1000;
  this._durationPerTick = this._duration / (this._duration / (1000/fps));
};
goog.inherits(fengshui.views.Preloader, goog.events.EventTarget);


fengshui.views.Preloader.prototype.load = function( keys ){

	if(this._isCompleted) return false;

	this._loader.on("loadstart", goog.bind(this.onLoadStart, this));
	this._loader.on("fileload", goog.bind(this.onFileLoad, this));
	this._loader.on("complete", goog.bind(this.onComplete, this));
	this._loader.on("error", goog.bind(this.onError, this));
	this._loader.setMaxConnections(5);

	var manifest = [];

	if(goog.isString(keys)) {

		manifest = manifest.concat( this._model.getManifest( keys ) );

	}else if(goog.isArray(keys)) {

		goog.array.forEach(keys, function(key) {
			manifest = manifest.concat( this._model.getManifest( key ) );
		}, this);
	}

	this._loader.loadManifest( manifest );

	this._ticked = 1;
	this._ticker.start();
};


fengshui.views.Preloader.prototype.onLoadStart = function(e){

	console.log('load start');

	this.dispatchEvent({
		type: fengshui.events.EventType.START
	});
};


fengshui.views.Preloader.prototype.onFileLoad = function(e){

	this._model.setAsset(e.item.id, e.result);
};


fengshui.views.Preloader.prototype.onComplete = function(e){

	if(this._progress < 1) {

		console.log('preloader files load complete');

		// register loaded assets to model


		//
		this._loader.removeAllEventListeners();

		this.dispatchEvent({
			type: fengshui.events.EventType.LOAD_COMPLETE
		});

	}else {

		console.log('preloader animation progress complete');

		this._ticker.stop();

		this._isCompleted = true;

		this.dispatchEvent({
			type: fengshui.events.EventType.COMPLETE
		});

	}
};


fengshui.views.Preloader.prototype.onError = function(e){

	console.log('load error');

	this._loader.reset();

	this._ticker.stop();

	this.dispatchEvent({
		type: fengshui.events.EventType.ERROR
	});
};


fengshui.views.Preloader.prototype.onTick = function(e){

	var progress = this._durationPerTick * this._ticked / this._duration;
	progress = Math.min(progress, this._loader.progress, 1);

	if(progress === this._progress) {

		return;

	}else {

		this._progress = progress;
		this._ticked ++;

		this.dispatchEvent({
			type: fengshui.events.EventType.PROGRESS,
			progress: this._progress
		});

	}

	if(this._progress === 1) {

		this.onComplete();
	}
};