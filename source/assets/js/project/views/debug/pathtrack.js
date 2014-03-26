goog.provide('feng.views.debug.PathTrack');

goog.require('feng.views.debug.DebugView');
goog.require('feng.templates.debug');


/**
 * @constructor
 */
feng.views.debug.PathTrack = function(){

  goog.base(this, feng.templates.debug.PathTrackDebugView);

  this._pathEditApp = feng.apps.PathEdit.getInstance();
  this._selectDom = goog.dom.query('select', this.domElement)[0];
  this._addButton = goog.dom.query('.button.add', this.domElement)[0];
  this._removeButton = goog.dom.query('.button.remove', this.domElement)[0];
  this._outputButton = goog.dom.query('.button.output', this.domElement)[0];
  this._textarea = goog.dom.query('textarea', this.domElement)[0];
  this._playButton = goog.dom.query('.button.play', this.domElement)[0];
  this._cameraButton = goog.dom.query('.button.camera', this.domElement)[0];
  this._range = goog.dom.query('input[type="range"]', this.domElement)[0];
  this._importInput = goog.dom.query('.button.import', this.domElement)[0];
  this._xInput = goog.dom.query('input[name="x"]', this.domElement)[0];
  this._yInput = goog.dom.query('input[name="y"]', this.domElement)[0];
  this._zInput = goog.dom.query('input[name="z"]', this.domElement)[0];
  this._tipIdInput = goog.dom.query('input[name="tipid"]', this.domElement)[0];

  this._pathTrack = null;
  this._controlPoint = null;

  this._eventHandler.listen(this._selectDom, feng.events.EventType.CHANGE, this.setScene, false, this);
  this._eventHandler.listen(this._addButton, 'click', this.onClick, false, this);
  this._eventHandler.listen(this._removeButton, 'click', this.onClick, false, this);
  this._eventHandler.listen(this._outputButton, 'click', this.onClick, false, this);
  this._eventHandler.listen(this._playButton, 'click', this.onClick, false, this);
  this._eventHandler.listen(this._cameraButton, 'click', this.onClick, false, this);
  this._eventHandler.listen(this._range, feng.events.EventType.CHANGE, this.onProgressChange, false, this);

  this._eventHandler.listen(this._importInput, feng.events.EventType.CHANGE, this.onFileImport, false, this);
  this._eventHandler.listen(this._xInput, feng.events.EventType.CHANGE, this.onPointPropertyChange, false, this);
  this._eventHandler.listen(this._yInput, feng.events.EventType.CHANGE, this.onPointPropertyChange, false, this);
  this._eventHandler.listen(this._zInput, feng.events.EventType.CHANGE, this.onPointPropertyChange, false, this);
  this._eventHandler.listen(this._tipIdInput, feng.events.EventType.CHANGE, this.onPointPropertyChange, false, this);

  this._eventHandler.listen(this._pathEditApp, feng.events.EventType.CHANGE, this.onPathEditChange, false, this);
  this._eventHandler.listenOnce(this._pathEditApp, feng.events.EventType.LOAD_COMPLETE, this.onScenesLoadComplete, false, this);

  this.show();
};
goog.inherits(feng.views.debug.PathTrack, feng.views.debug.DebugView);


feng.views.debug.PathTrack.prototype.setScene = function(){

  this._pathEditApp.dispatchEvent({
    type: feng.events.EventType.CHANGE,
    sceneName: this._selectDom.value
  });
};


feng.views.debug.PathTrack.prototype.updatePointFields = function(){

  if(this._controlPoint) {
    this._xInput.value = this._controlPoint.x;
    this._yInput.value = this._controlPoint.y;
    this._zInput.value = this._controlPoint.z;
    this._tipIdInput.value = this._controlPoint.tipId || '';
  }

  var shouldDisable = this._controlPoint ? false : true;
  this._xInput.disabled = shouldDisable;
  this._yInput.disabled = shouldDisable;
  this._zInput.disabled = shouldDisable;
  this._tipIdInput.disabled = shouldDisable;
};


feng.views.debug.PathTrack.prototype.onScenesLoadComplete = function(e){

  goog.array.forEach(e.scenes, function(scene) {

    var optionDom = goog.dom.createDom('option', {
      'value': scene.name
    }, scene.name);

    this._selectDom.add( optionDom );

  }, this);
};


feng.views.debug.PathTrack.prototype.onClick = function(e){

  goog.base(this, 'onClick', e);

  switch(e.currentTarget) {

    case this._addButton:
    this._pathEditApp.dispatchEvent({
      type: feng.events.EventType.ADD
    });
    break;

    case this._removeButton:
    this._pathEditApp.dispatchEvent({
      type: feng.events.EventType.REMOVE
    });
    break;

    case this._outputButton:
    var output = {
      controlPoints: []
    };

    goog.array.forEach(this._pathTrack.controlPoints, function(controlPoint) {
      var pointData = {
        'x': controlPoint.x,
        'y': controlPoint.y,
        'z': controlPoint.z,
        'tipid': controlPoint.tipId || ''
      };
      output.controlPoints.push(pointData);
    });

    this._textarea.value = JSON.stringify(output, null, '\t');
    break;

    case this._playButton:
    if(goog.dom.classes.has(this._playButton, 'paused')) {
      goog.dom.classes.remove(this._playButton, 'paused');

      this._pathEditApp.dispatchEvent({
        type: feng.events.EventType.PAUSE
      });
    }else {
      goog.dom.classes.add(this._playButton, 'paused');

      this._pathEditApp.dispatchEvent({
        type: feng.events.EventType.PLAY
      });
    }
    break;

    case this._cameraButton:
    if(goog.dom.classes.has(this._cameraButton, 'fly')) {
      goog.dom.classes.remove(this._cameraButton, 'fly');

      this._pathEditApp.dispatchEvent({
        type: feng.events.EventType.CHANGE,
        fly: true
      });
    }else {
      goog.dom.classes.add(this._cameraButton, 'fly');

      this._pathEditApp.dispatchEvent({
        type: feng.events.EventType.CHANGE,
        fly: false
      });
    }
    break;
  }
};


feng.views.debug.PathTrack.prototype.onPointPropertyChange = function(e){

  var x = parseFloat(this._xInput.value);
  var y = parseFloat(this._yInput.value);
  var z = parseFloat(this._zInput.value);
  var tipId = this._tipIdInput.value;

  this._controlPoint.set(x, y, z);
  this._controlPoint.tipId = tipId;

  this._pathTrack.updateTrack();
};


feng.views.debug.PathTrack.prototype.onProgressChange = function(e){

  this._pathEditApp.dispatchEvent({
    type: feng.events.EventType.PROGRESS,
    progress: this._range.value / 100
  });
};


feng.views.debug.PathTrack.prototype.onPathEditChange = function(e){

  if(goog.isDef(e.controlPoint)) {
    var disabled = !goog.isDefAndNotNull(e.controlPoint);
    this._addButton.disabled = disabled;
    this._removeButton.disabled = disabled;
    this._outputButton.disabled = disabled;
    this._controlPoint = e.controlPoint;

    this.updatePointFields();
  }

  if(goog.isDef(e.pathTrack)) {
    this._pathTrack = e.pathTrack;
  }

  if(goog.isNumber(e.progress)) {
    this._range.value = Math.round(e.progress * 100);
  }

  if(e.complete === true) {
    goog.dom.classes.remove(this._playButton, 'paused');
  }
};


feng.views.debug.PathTrack.prototype.onFileImport = function(e){

  var file = e.target.files[0];

  var reader = new FileReader();

  reader.onload = goog.bind(function(e) {

    var parsedJSON = JSON.parse( e.target.result );
    var controlPointsData = parsedJSON['controlPoints'];
    var controlPoints = goog.array.map(controlPointsData, function(data) {
      var point = new THREE.Vector3(data['x'], data['y'], data['z']);
      point['tipid'] = data['tipid'];
      return point;
    });

    this._pathTrack.create( controlPoints );
    
  }, this);

  reader.readAsText(file);
};