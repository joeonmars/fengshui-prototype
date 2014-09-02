goog.provide('feng.views.sections.controls.ProgressBar');

goog.require('feng.views.sections.controls.Controls');
goog.require('feng.models.achievements.Achievements');


/**
 * @constructor
 */
feng.views.sections.controls.ProgressBar = function(domElement, tips){

  goog.base(this, domElement);

  this._innerEl = goog.dom.query('.inner', this.domElement)[0];
  this._tipEls = goog.dom.query('.tips > li', this.domElement);
  this._dotEls = goog.dom.query('.tips .dot', this.domElement);
  this._dialogEls = goog.dom.query('.tips .dialog', this.domElement);

  var achievements = feng.models.achievements.Achievements.getInstance();

  this._tips = {};
  
  goog.array.forEach(tips, function(tip) {
		this._tips[ tip.id ] = tip;
  }, this);

  // create sine waves on canvas
  var numWaves = this._tipEls.length - 1;
  this._canvasWidth = 60 * numWaves;
  this._canvasHeight = 30;

  var numWavePoints = 20;
  var numPoints = numWaves * numWavePoints;

  this._waveEl = goog.dom.getElementByClass('wave', this.domElement);
  goog.style.setSize(this._waveEl, this._canvasWidth, this._canvasHeight);

  this._grayCanvas = goog.dom.query('canvas.gray', this.domElement)[0];
  this._grayCanvas.width = this._canvasWidth;
  this._grayCanvas.height = this._canvasHeight;

  this._fillCanvas = goog.dom.query('canvas.fill', this.domElement)[0];
  this._fillCanvas.width = this._canvasWidth;
  this._fillCanvas.height = this._canvasHeight;

  var grayCtx = this._grayCanvas.getContext('2d');
  grayCtx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  grayCtx.lineWidth = 4;
  grayCtx.beginPath();

  var fillCtx = this._fillCanvas.getContext('2d');
  fillCtx.strokeStyle = '#ffffff';
  fillCtx.lineWidth = 4;
  fillCtx.beginPath();

  var halfHeight = this._canvasHeight / 2;

  for(var i = 0; i <= numPoints; i ++) {

    var x = this._canvasWidth / numPoints * i;
    var y = halfHeight + halfHeight * Math.sin( i/numPoints * Math.PI * numWaves ) * .5;

    if(i === 0) {
      grayCtx.moveTo(x, y);
      fillCtx.moveTo(x, y);
    }else {
      grayCtx.lineTo(x, y);
      fillCtx.lineTo(x, y);
    }
  }

  grayCtx.stroke();
  fillCtx.stroke();

  goog.array.forEach(this._tipEls, function(tipEl, index) {
    var x = index * this._canvasWidth / numWaves;
    var y = halfHeight;
    goog.style.setPosition(tipEl, x, y);
  }, this);

  //
  this.setProgress( 0 );
};
goog.inherits(feng.views.sections.controls.ProgressBar, feng.views.sections.controls.Controls);


feng.views.sections.controls.ProgressBar.prototype.show = function(){

	goog.base(this, 'show');
};


feng.views.sections.controls.ProgressBar.prototype.hide = function(){

	goog.base(this, 'hide');
};


feng.views.sections.controls.ProgressBar.prototype.setProgress = function( progress ){

  goog.style.setStyle(this._fillCanvas, 'clip', 'rect(0px,' + this._canvasWidth * progress + 'px,30px,0px)');
};


feng.views.sections.controls.ProgressBar.prototype.onModeChange = function(e){

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


feng.views.sections.controls.ProgressBar.prototype.onResize = function(e){

	goog.base(this, 'onResize', e);

	var mainSize = goog.style.getSize( goog.dom.getElement('main') );
  var domSize = goog.style.getSize( this.domElement );

  var x = (mainSize.width - domSize.width) / 2;
  var y = mainSize.height - domSize.height - 40;
	goog.style.setPosition(this.domElement, x, y);
};