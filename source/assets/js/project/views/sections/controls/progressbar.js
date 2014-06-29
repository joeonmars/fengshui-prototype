goog.provide('feng.views.sections.controls.ProgressBar');

goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.ProgressBar = function(domElement, tips){

  goog.base(this, domElement);

  this._innerEl = goog.dom.query('.inner', this.domElement)[0];
  this._tipEls = goog.dom.query('.tips > li', this.domElement);

  this._tips = {};
  
  goog.array.forEach(tips, function(tip) {
		this._tips[ tip.id ] = tip;
  }, this);

  // create sine waves on canvas
  var numWaves = this._tipEls.length - 1;
  this._canvasWidth = 75 * numWaves;
  this._canvasHeight = 30;

  var numWavePoints = 20;
  var numPoints = numWaves * numWavePoints;

  this._waveEl = goog.dom.getElementByClass('wave', this.domElement);
  goog.style.setSize(this._waveEl, this._canvasWidth, this._canvasHeight);

  this._grayCanvas = goog.dom.query('canvas.gray', this.domElement)[0];
  this._grayCanvas.width = this._canvasWidth;
  this._grayCanvas.height = this._canvasHeight;

  this._blueCanvas = goog.dom.query('canvas.blue', this.domElement)[0];
  this._blueCanvas.width = this._canvasWidth;
  this._blueCanvas.height = this._canvasHeight;

  var grayCtx = this._grayCanvas.getContext('2d');
  grayCtx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
  grayCtx.lineWidth = 1;
  grayCtx.beginPath();

  var blueCtx = this._blueCanvas.getContext('2d');
  blueCtx.strokeStyle = '#76caec';
  blueCtx.lineWidth = 3;
  blueCtx.beginPath();

  var halfHeight = this._canvasHeight / 2;

  for(var i = 0; i <= numPoints; i ++) {

    var x = this._canvasWidth / numPoints * i;
    var y = halfHeight + halfHeight * Math.sin( i/numPoints * Math.PI * numWaves ) * .5;

    if(i === 0) {
      grayCtx.moveTo(x, y);
      blueCtx.moveTo(x, y);
    }else {
      grayCtx.lineTo(x, y);
      blueCtx.lineTo(x, y);
    }
  }

  grayCtx.stroke();
  blueCtx.stroke();

  goog.array.forEach(this._tipEls, function(tipEl, index) {
    var x = index * this._canvasWidth / numWaves;
    var y = halfHeight;
    goog.style.setPosition(tipEl, x, y);
  }, this);

  //
  this.setProgress( 0 );
};
goog.inherits(feng.views.sections.controls.ProgressBar, feng.views.sections.controls.Controls);


feng.views.sections.controls.ProgressBar.prototype.activate = function(){

	goog.base(this, 'activate');

	goog.array.forEach(this._tipEls, function(tipEl) {
		this._eventHandler.listen(tipEl, 'click', this.onClickTip, false, this);
	}, this);
};


feng.views.sections.controls.ProgressBar.prototype.show = function(){

	goog.base(this, 'show');
};


feng.views.sections.controls.ProgressBar.prototype.hide = function(){

	goog.base(this, 'hide');
};


feng.views.sections.controls.ProgressBar.prototype.setProgress = function( progress ){

  goog.style.setStyle(this._blueCanvas, 'clip', 'rect(0px,' + this._canvasWidth * progress + 'px,30px,0px)');
};


feng.views.sections.controls.ProgressBar.prototype.onClickTip = function(e){

	var tipId = e.currentTarget.getAttribute('data-tip-id');
	var tip = this._tips[tipId];
	
	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		tip: tip
	});
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