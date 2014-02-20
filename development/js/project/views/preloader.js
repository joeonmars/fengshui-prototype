goog.provide('fengshui.views.Preloader');

goog.require('goog.dom');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.events');
goog.require('fengshui.models.Preload');


/**
 * @constructor
 */
fengshui.views.Preloader = function(domElement){

  goog.base(this);

  this._domElement = domElement;

  this._loader = new createjs.LoadQueue(true, fengshui.Config['assetsPath']);
  this._eventHandler = new goog.events.EventHandler(this);

  this._model = fengshui.models.Preload.getInstance();
};
goog.inherits(fengshui.views.Preloader, goog.events.EventTarget);


fengshui.views.Preloader.prototype.load = function(){

	this._loader.on("fileload", this.onFileLoad);
	this._loader.on("fileprogress", this.onFileProgress);
	this._loader.on("progress", this.onOverallProgress);
	this._loader.on("error", this.onFileError);
	this._loader.setMaxConnections(5);

	var manifest = this._model.getManifest( this._sectionName );
	this._loader.loadManifest( manifest );
};


fengshui.views.Preloader.prototype.onFileLoad = function(e){
	console.log(e.result);
};


fengshui.views.Preloader.prototype.onFileProgress = function(e){
	console.log(e.progress);
};


fengshui.views.Preloader.prototype.onOverallProgress = function(e){
	console.log(e.target.progress)
};


fengshui.views.Preloader.prototype.onFileError = function(e){
	console.log('load error');
};