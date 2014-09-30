goog.provide('feng.views.sections.controls.ProgressBar');

goog.require('goog.async.Throttle');
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
  this._detectNearbyThrottle = new goog.async.Throttle(this.detectNearbyObjects, 1000/5, this);
  
  this._nearbyObjects = [];

  //
  this.setProgress( 0 );
};
goog.inherits(feng.views.sections.controls.ProgressBar, feng.views.sections.controls.Controls);


feng.views.sections.controls.ProgressBar.prototype.activate = function() {

  var shouldActivate = goog.base(this, 'activate');

  if(!shouldActivate) return;

  this._detectNearbyThrottle.fire();
};


feng.views.sections.controls.ProgressBar.prototype.deactivate = function() {

  var shouldDeactivate = goog.base(this, 'deactivate');

  if(!shouldDeactivate) return;

  this._detectNearbyThrottle.stop();
};


feng.views.sections.controls.ProgressBar.prototype.setProgress = function( progress ){

  goog.style.setStyle(this._fillCanvas, 'clip', 'rect(0px,' + this._canvasWidth * progress + 'px,30px,0px)');
};


feng.views.sections.controls.ProgressBar.prototype.setNearbyObjects = function( objects ){

  this._nearbyObjects = objects;

  if(this._nearbyObjects && this._nearbyObjects.length > 0) {

    this._detectNearbyThrottle.fire();
  }
};


feng.views.sections.controls.ProgressBar.prototype.detectNearbyObjects = function(){

  if(!this._nearbyObjects || this._nearbyObjects.length === 0) {

    this._detectNearbyThrottle.stop();
    return;

  }else {

    this._detectNearbyThrottle.fire();
  }

  var control = this._view3d.modeController.control;
  var cameraPosition = control.getPosition();
  var cameraDirection = control.getForwardVector( true );
  var highestDot = Math.cos( THREE.Math.degToRad(45) );
  var nearestObject;

  goog.array.forEach(this._nearbyObjects, function(object) {
    var objectDirection = object.getCenter().clone().sub( cameraPosition ).normalize();
    var dot = objectDirection.dot( cameraDirection );
    //console.log(dot, object.name)
    if(dot >= highestDot) {
      highestDot = dot;
      nearestObject = object;
    }
  });

  if(nearestObject) {
    //console.log(nearestObject.name);
  }

  /* test */
  if(!this.line) {
    var material = new THREE.LineBasicMaterial({
      color: 0xff0000,
      linewidth: 10
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3( 0, 0, 0 ),
      new THREE.Vector3( 0, 0, 0 )
    );

    this.line = new THREE.Line( geometry, material );
    this._view3d.scene.add( this.line );
  }

  var pos = new THREE.Vector3().addVectors(cameraPosition, cameraDirection.multiplyScalar(100));
  this.line.geometry.vertices[0].copy( cameraPosition );
  this.line.geometry.vertices[1].copy( pos );
  this.line.geometry.verticesNeedUpdate = true;

  console.log(cameraPosition, pos, cameraDirection);
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