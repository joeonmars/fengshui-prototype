goog.provide('feng.views.Preloader');

goog.require('goog.events.EventTarget');
goog.require('feng.models.Preload');
goog.require('feng.events');


/**
 * @constructor
 */
feng.views.Preloader = function(domElement, duration){

  goog.base(this);

  this._domElement = domElement;

  this._loader = new createjs.LoadQueue(true, feng.Config['assetsPath']);
  this._model = feng.models.Preload.getInstance();
  
  this._isCompleted = false;

  var fps = 30;
  this._ticker = new goog.Timer(1000/fps);
  goog.events.listen(this._ticker, goog.Timer.TICK, this.onTick, false, this);

  this._ticked = 0;
  this._progress = 0;
  this._duration = duration || 1000;
  this._durationPerTick = this._duration / (this._duration / (1000/fps));
};
goog.inherits(feng.views.Preloader, goog.events.EventTarget);


feng.views.Preloader.prototype.load = function( keys ){

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


feng.views.Preloader.prototype.onLoadStart = function(e){

	console.log('load start');

	this.dispatchEvent({
		type: feng.events.EventType.START
	});
};


feng.views.Preloader.prototype.onFileLoad = function(e){

	this._model.setAsset(e.item.id, e.result);
};


feng.views.Preloader.prototype.onComplete = function(e){

	if(this._progress < 1) {

		console.log('preloader files load complete');

		// register loaded assets to model


		//
		this._loader.removeAllEventListeners();

		this.dispatchEvent({
			type: feng.events.EventType.LOAD_COMPLETE
		});

	}else {

		console.log('preloader animation progress complete');

		this._ticker.stop();

		this._isCompleted = true;

		this.dispatchEvent({
			type: feng.events.EventType.COMPLETE
		});

	}
};


feng.views.Preloader.prototype.onError = function(e){

	console.log('load error');

	this._loader.reset();

	this._ticker.stop();

	this.dispatchEvent({
		type: feng.events.EventType.ERROR
	});
};


feng.views.Preloader.prototype.onTick = function(e){

	var progress = this._durationPerTick * this._ticked / this._duration;
	progress = Math.min(progress, this._loader.progress, 1);

	if(progress === this._progress) {

		return;

	}else {

		this._progress = progress;
		this._ticked ++;

		this.dispatchEvent({
			type: feng.events.EventType.PROGRESS,
			progress: this._progress
		});

	}

	if(this._progress === 1) {

		this.onComplete();
	}
};