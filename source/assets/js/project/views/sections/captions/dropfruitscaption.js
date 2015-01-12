goog.provide('feng.views.sections.captions.DropFruitsCaption');

goog.require('goog.soy');
goog.require('feng.templates.captions');
goog.require('feng.views.sections.captions.Caption');


/**
 * @constructor
 */
feng.views.sections.captions.DropFruitsCaption = function( object, renderController, renderSize, controls, hud ){

  this._template = feng.templates.captions.DropFruitsCaption;
  
  this._templateData = {
    tip: object.tip,
    position: 'right'
  };

  goog.base(this, object, renderController, renderSize, controls, hud);

  this._fruitId = null;

  this._itemEls = feng.utils.Utils.createDomCollectionByAttributes( goog.dom.query('.item-button', this.domElement), 'data-fruit' );
  this._infoEls = feng.utils.Utils.createDomCollectionByAttributes( goog.dom.query('.info li', this.domElement), 'data-fruit' );
};
goog.inherits(feng.views.sections.captions.DropFruitsCaption, feng.views.sections.captions.Caption);


feng.views.sections.captions.DropFruitsCaption.prototype.show = function() {

  goog.base(this, 'show');

  //this._eventHandler.listen( this._object, feng.events.EventType.CHANGE, this.onFruitPlateChange, false, this );

  goog.object.forEach(this._itemEls, function(itemEl) {
    this._eventHandler.listen(itemEl, 'click', this.onClickItem, false, this);
  }, this);
};


feng.views.sections.captions.DropFruitsCaption.prototype.onFruitPlateChange = function(e) {

  this.setActiveFruit( e.fruit );
};


feng.views.sections.captions.DropFruitsCaption.prototype.setActiveFruit = function(fruit) {

  goog.array.forEach(this._fruitButtonEls, function(fruitButtonEl) {

    if(fruitButtonEl.getAttribute('data-fruit-id') === fruit) {
      goog.dom.classlist.add(fruitButtonEl, 'active');
    }else {
      goog.dom.classlist.remove(fruitButtonEl, 'active');
    }
  });

  goog.array.forEach(this._descriptionEls, function(descriptionEl) {

    if(descriptionEl.getAttribute('data-fruit-id') === fruit) {
      goog.dom.classlist.add(descriptionEl, 'active');
    }else {
      goog.dom.classlist.remove(descriptionEl, 'active');
    }
  });

  goog.dom.classlist.add( this._descriptionEl, 'shown' );
};


feng.views.sections.captions.DropFruitsCaption.prototype.onClickItem = function(e) {

  if(this._fruitId) {
    goog.dom.classlist.enable( this._itemEls[this._fruitId], 'active', false );
    goog.dom.classlist.enable( this._infoEls[this._fruitId], 'active', false );
  }

  this._fruitId = e.currentTarget.getAttribute("data-fruit");

  goog.dom.classlist.enable( this._itemEls[this._fruitId], 'active', true );
  goog.dom.classlist.enable( this._itemEls[this._fruitId], 'show-fruit', true );
  goog.dom.classlist.enable( this._infoEls[this._fruitId], 'active', true );

  this.scrollBar.resize();

  this._object.dropFruit( this._fruitId );

  feng.soundController.playSfx('click');
};