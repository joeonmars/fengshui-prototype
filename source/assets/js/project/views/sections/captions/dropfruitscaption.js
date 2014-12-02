goog.provide('feng.views.sections.captions.DropFruitsCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.sections.captions.Caption');


/**
 * @constructor
 */
feng.views.sections.captions.DropFruitsCaption = function( object, cameraController, renderSize, controls, hud ){

  this._template = feng.templates.captions.DropFruitsCaption;
  
  this._templateData = {
    fruits: object.tip.details['descriptions'],
    tip: object.tip,
    position: 'right'
  };

  goog.base(this, object, cameraController, renderSize, controls, hud);

  this._fruitButtonEls = goog.dom.query('.drop-fruits .fruits li button', this.domElement);
  this._descriptionEls = goog.dom.query('.drop-fruits .descriptions li', this.domElement);
  this._descriptionEl = goog.dom.query('.drop-fruits .descriptions', this.domElement)[0];
};
goog.inherits(feng.views.sections.captions.DropFruitsCaption, feng.views.sections.captions.Caption);


feng.views.sections.captions.DropFruitsCaption.prototype.show = function() {

  goog.base(this, 'show');

  this._eventHandler.listen( this._object, feng.events.EventType.CHANGE, this.onFruitPlateChange, false, this );

  goog.array.forEach(this._fruitButtonEls, function(fruitButtonEl) {
    this._eventHandler.listen( fruitButtonEl, 'mousedown', this.onClickFruitButton, false, this );
  }, this);
};


feng.views.sections.captions.DropFruitsCaption.prototype.onFruitPlateChange = function(e) {

  this.setActiveFruit( e.fruit );
};


feng.views.sections.captions.DropFruitsCaption.prototype.setActiveFruit = function(fruit) {

  goog.array.forEach(this._fruitButtonEls, function(fruitButtonEl) {

    if(fruitButtonEl.getAttribute('data-fruit-id') === fruit) {
      goog.dom.classes.add(fruitButtonEl, 'active');
    }else {
      goog.dom.classes.remove(fruitButtonEl, 'active');
    }
  });

  goog.array.forEach(this._descriptionEls, function(descriptionEl) {

    if(descriptionEl.getAttribute('data-fruit-id') === fruit) {
      goog.dom.classes.add(descriptionEl, 'active');
    }else {
      goog.dom.classes.remove(descriptionEl, 'active');
    }
  });

  goog.dom.classes.add( this._descriptionEl, 'shown' );
};


feng.views.sections.captions.DropFruitsCaption.prototype.onClickFruitButton = function(e) {

  if(!this._object.isUnlocked()) return false;

  var fruit = e.currentTarget.getAttribute('data-fruit-id');
  this.setActiveFruit( fruit );
};