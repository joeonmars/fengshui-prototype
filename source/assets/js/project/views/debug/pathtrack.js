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
  this._stopButton = goog.dom.query('.button.stop', this.domElement)[0];
  this._range = goog.dom.query('input', this.domElement)[0];

  this._pathTrack = null;

  this._eventHandler.listen(this._selectDom, feng.events.EventType.CHANGE, this.setScene, false, this);
  this._eventHandler.listen(this._addButton, 'click', this.onClick, false, this);
  this._eventHandler.listen(this._removeButton, 'click', this.onClick, false, this);
  this._eventHandler.listen(this._outputButton, 'click', this.onClick, false, this);
  this._eventHandler.listen(this._playButton, 'click', this.onClick, false, this);
  this._eventHandler.listen(this._stopButton, 'click', this.onClick, false, this);
  this._eventHandler.listen(this._range, feng.events.EventType.CHANGE, this.onProgressChange, false, this);
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
      output.controlPoints.push([controlPoint.x, controlPoint.y, controlPoint.z]);
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

    case this._stopButton:
    this._pathEditApp.dispatchEvent({
      type: feng.events.EventType.STOP
    });
    break;
  }
};


feng.views.debug.PathTrack.prototype.onProgressChange = function(e){

  //this._range.value
};


feng.views.debug.PathTrack.prototype.onPathEditChange = function(e){

  if(goog.isDef(e.controlPoint)) {
    var disabled = !goog.isDefAndNotNull(e.controlPoint);
    this._addButton.disabled = disabled;
    this._removeButton.disabled = disabled;
    this._outputButton.disabled = disabled;
  }

  this._pathTrack = e.pathTrack;
};