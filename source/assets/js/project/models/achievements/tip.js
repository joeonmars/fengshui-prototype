goog.provide('feng.models.achievements.Tip');

goog.require('goog.events.EventTarget');
goog.require('feng.events');
goog.require('feng.models.Preload');
goog.require('feng.models.achievements.Achievements');
goog.require('feng.controllers.NavigationController');

/**
 * @constructor
 */
feng.models.achievements.Tip = function( tipId, viewId, sectionId, data ){

  goog.base(this);

  this.id = tipId;
  this.viewId = viewId;
  this.sectionId = sectionId;

  this.isMandatory = data['mandatory'];
  this.reminder = data['reminder'];
  this.response = data['response'];
  this.people = data['people'];
  this.name = data['name'];
  this.advice = data['advice'];
  this.quote = data['quote'];
  this.description = data['description'];

  this.iconId = data['icon'];
  this.goTipToken = feng.controllers.NavigationController.Token.GO_TIP.replace('{tipId}', this.id);
  this.readTipToken = feng.controllers.NavigationController.Token.READ_TIP.replace('{tipId}', this.id);

  this.unlocked = feng.storageController.isTipUnlocked( this.id );

  this._requiredTipId = null;
};
goog.inherits(feng.models.achievements.Tip, goog.events.EventTarget);


feng.models.achievements.Tip.prototype.getView3dObject = function() {

	var view3dController = feng.controllers.view3d.View3DController.getInstance();
	var view3d = view3dController.getView3D(this.sectionId, this.viewId);
	return view3d.interactiveObjects[ this.id ];
};


feng.models.achievements.Tip.prototype.getRequiredTip = function() {

  if(!this._requiredTipId) return null;

  var achievements = feng.models.achievements.Achievements.getInstance();
  var requiredTip = achievements.getTip( this._requiredTipId, this.viewId, this.sectionId );

  return requiredTip;
};


feng.models.achievements.Tip.prototype.require = function( tipId ) {

  this._requiredTipId = tipId;
  return this;
};


feng.models.achievements.Tip.prototype.unlock = function() {

  if(this._requiredTipId) {

    this.unlocked = this.getRequiredTip().unlocked;
  }else {

    this.unlocked = true;
  }

  if(this.unlocked) {
    
    this.dispatchEvent({
      type: feng.events.EventType.UNLOCK,
      tip: this
    });
  }

  return this.unlocked;
};


feng.models.achievements.Tip.prototype.getIcon = function(size, color, canvas, useUnlocked) {

  var preload = feng.models.Preload.getInstance();

  var tipIconsImg = preload.getAsset('global.tip-icons');
  
  var iconId = (this.unlocked || useUnlocked) ? this.iconId : 'lock';

  var tipIconData = preload.getAsset('global.tip-icons-data')['frames'][iconId + '.png']['frame'];
  var sourceIconX = tipIconData['x'];
  var sourceIconY = tipIconData['y'];
  var sourceIconW = tipIconData['w'];
  var sourceIconH = tipIconData['h'];

  var size = size || 32;
  var color = color || '#ffffff';
  var canvas = canvas || goog.dom.createDom('canvas');
  canvas.width = size;
  canvas.height = size;

  var canvasCtx = canvas.getContext('2d');
  canvasCtx.fillStyle = color;
  canvasCtx.fillRect( 0, 0, size, size );

  canvasCtx.globalCompositeOperation = 'destination-atop';
  canvasCtx.drawImage( tipIconsImg, sourceIconX, sourceIconY, sourceIconW, sourceIconH, 0, 0, size, size );

  return canvas;
};